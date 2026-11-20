#!/usr/bin/env python3
"""
DARSHAN SETU - Live Darshan Automatic Feed Discovery & Verification System
Scans official temple websites via Playwright, extracts HLS (.m3u8), DASH (.mpd),
and YouTube Live feeds, verifies live availability, and syncs with Firebase RTDB.
"""

import json
import os
import re
import time
from datetime import datetime, timezone
from urllib.parse import urljoin, urlparse, parse_qs

import firebase_admin
from firebase_admin import credentials, db
import requests
from playwright.sync_api import sync_playwright, TimeoutError as PlaywrightTimeout

DEFAULT_DB_URL = "https://livedarshan-204ed-default-rtdb.asia-southeast1.firebasedatabase.app"
USER_AGENT = (
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 "
    "(KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36"
)

M3U8_RE = re.compile(r"https?://[^\s\"'<>\\]+\.m3u8(?:\?[^\s\"'<>\\]*)?", re.I)
MPD_RE = re.compile(r"https?://[^\s\"'<>\\]+\.mpd(?:\?[^\s\"'<>\\]*)?", re.I)
YT_RE = re.compile(
    r"https?://(?:www\.)?(?:youtube\.com/(?:watch\?v=|embed/|live/|channel/[^\"'<>\\s]+/live)|youtube-nocookie\.com/embed/|youtu\.be/)[^\s\"'<>\\]+",
    re.I,
)


def now_iso() -> str:
    return datetime.now(timezone.utc).isoformat()


def init_firebase():
    sa_raw = os.environ.get("FIREBASE_SERVICE_ACCOUNT_JSON", "").strip()
    db_url = os.environ.get("FIREBASE_DB_URL", DEFAULT_DB_URL).strip() or DEFAULT_DB_URL
    if not sa_raw:
        raise RuntimeError("FIREBASE_SERVICE_ACCOUNT_JSON environment variable is missing.")

    if sa_raw.startswith("{"):
        cred_obj = credentials.Certificate(json.loads(sa_raw))
    else:
        cred_obj = credentials.Certificate(sa_raw)

    if not firebase_admin._apps:
        firebase_admin.initialize_app(cred_obj, {"databaseURL": db_url})
    return db


def extract_youtube_id(url: str) -> str:
    try:
        parsed = urlparse(url)
        host = parsed.netloc.lower()
        path = parsed.path.strip("/")
        if "youtu.be" in host and path:
            return path.split("/")[0]
        if "youtube.com" in host or "youtube-nocookie.com" in host:
            if path.startswith("embed/"):
                return path.split("/")[1].split("?")[0]
            if path.startswith("live/"):
                return path.split("/")[1].split("?")[0]
            qs = parse_qs(parsed.query)
            if "v" in qs and qs["v"]:
                return qs["v"][0]
    except Exception:
        pass
    return ""


def verify_feed(feed_url: str, feed_type: str, referer: str = "") -> tuple[bool, str]:
    headers = {"User-Agent": USER_AGENT}
    if referer:
        headers["Referer"] = referer

    try:
        if feed_type == "hls":
            r = requests.get(feed_url, headers=headers, timeout=12, allow_redirects=True)
            if r.status_code == 200 and ("#EXTM3U" in r.text or "#EXT-X-" in r.text):
                return True, f"HLS OK (HTTP {r.status_code})"
            return False, f"HLS invalid (HTTP {r.status_code})"

        if feed_type == "dash":
            r = requests.get(feed_url, headers=headers, timeout=12, allow_redirects=True)
            if r.status_code == 200 and "<MPD" in r.text.upper():
                return True, f"DASH OK (HTTP {r.status_code})"
            return False, f"DASH invalid (HTTP {r.status_code})"

        if feed_type == "youtube":
            vid = extract_youtube_id(feed_url)
            if vid and len(vid) == 11:
                oembed = f"https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v={vid}&format=json"
                r = requests.get(oembed, headers={"User-Agent": USER_AGENT}, timeout=10)
                if r.status_code == 200:
                    return True, f"YouTube OK ({vid})"
                return False, f"YouTube unavailable (HTTP {r.status_code})"
            r = requests.get(feed_url, headers={"User-Agent": USER_AGENT}, timeout=10, allow_redirects=True)
            if r.status_code == 200:
                return True, "YouTube URL reachable"
            return False, f"YouTube unreachable (HTTP {r.status_code})"
    except Exception as exc:
        return False, f"Verify error: {str(exc)[:120]}"

    return False, "Unsupported feed type"


def extract_feeds_with_playwright(browser, website_url: str) -> list[dict]:
    found = {}

    def add_candidate(url: str, ftype: str, via: str):
        if not url or not url.startswith("http"):
            return
        clean = url.strip().rstrip("\\'\"")
        if clean not in found:
            found[clean] = {"url": clean, "type": ftype, "via": via}

    context = browser.new_context(
        user_agent=USER_AGENT,
        viewport={"width": 1280, "height": 800},
        ignore_https_errors=True,
    )
    page = context.new_page()

    def on_request(req):
        u = req.url
        if ".m3u8" in u.lower():
            add_candidate(u, "hls", "network")
        elif ".mpd" in u.lower():
            add_candidate(u, "dash", "network")
        elif "youtube.com/embed/" in u.lower() or "youtube-nocookie.com/embed/" in u.lower():
            add_candidate(u, "youtube", "network")

    page.on("request", on_request)

    try:
        page.goto(website_url, wait_until="domcontentloaded", timeout=25000)
        page.wait_for_timeout(6000)
    except PlaywrightTimeout:
        pass
    except Exception as exc:
        context.close()
        raise RuntimeError(f"Page load failed: {str(exc)[:140]}")

    try:
        html = page.content()
        for m in M3U8_RE.findall(html):
            add_candidate(m, "hls", "html")
        for m in MPD_RE.findall(html):
            add_candidate(m, "dash", "html")
        for m in YT_RE.findall(html):
            add_candidate(m, "youtube", "html")

        # Inspect video/source/iframe elements across main frame & child frames
        for frame in page.frames:
            try:
                f_url = frame.url or ""
                if "youtube.com/embed/" in f_url or "youtube-nocookie.com/embed/" in f_url:
                    add_candidate(f_url, "youtube", "iframe")
                srcs = frame.evaluate(
                    """() => {
                        const out = [];
                        document.querySelectorAll('video, source, iframe').forEach(el => {
                            if (el.src) out.push(el.src);
                            if (el.getAttribute('data-src')) out.push(el.getAttribute('data-src'));
                        });
                        return out;
                    }"""
                )
                for s in srcs or []:
                    abs_u = urljoin(website_url, s)
                    low = abs_u.lower()
                    if ".m3u8" in low:
                        add_candidate(abs_u, "hls", "dom")
                    elif ".mpd" in low:
                        add_candidate(abs_u, "dash", "dom")
                    elif "youtube.com" in low or "youtu.be" in low or "youtube-nocookie.com" in low:
                        add_candidate(abs_u, "youtube", "dom")
            except Exception:
                continue
    finally:
        context.close()

    # Prioritize: HLS -> DASH -> YouTube
    priority = {"hls": 0, "dash": 1, "youtube": 2}
    return sorted(found.values(), key=lambda x: priority.get(x["type"], 9))


def append_history(rtdb, entry: dict, max_items: int = 50):
    hist_ref = rtdb.reference("feedDiscovery/history")
    hist_ref.push(entry)
    snap = hist_ref.order_by_key().get() or {}
    if isinstance(snap, dict) and len(snap) > max_items:
        keys = sorted(snap.keys())
        for old_k in keys[: len(keys) - max_items]:
            hist_ref.child(old_k).delete()


def run_scan():
    t0 = time.time()
    rtdb = init_firebase()
    sources = rtdb.reference("feedDiscovery/sources").get() or {}
    if not isinstance(sources, dict) or not sources:
        print("No sources configured under feedDiscovery/sources.")
        rtdb.reference("feedDiscovery/meta").set({
            "lastRunAt": now_iso(),
            "totalSources": 0,
            "onlineCount": 0,
            "offlineCount": 0,
            "runDurationSec": round(time.time() - t0, 2),
        })
        return

    status_ref = rtdb.reference("feedDiscovery/status")
    existing_statuses = status_ref.get() or {}
    online_count = 0
    offline_count = 0
    total_enabled = 0

    with sync_playwright() as pw:
        browser = pw.chromium.launch(headless=True, args=["--no-sandbox", "--disable-dev-shm-usage"])
        try:
            for sid, src in sources.items():
                if not isinstance(src, dict) or src.get("enabled") is False:
                    continue
                total_enabled += 1
                website_url = (src.get("websiteUrl") or "").strip()
                temple_id = (src.get("templeId") or "").strip()
                temple_name = (src.get("templeName") or temple_id or sid).strip()
                auto_publish = bool(src.get("autoPublish", True))
                manual_lock = bool(src.get("manualLock", False))
                unpublish_on_fail = bool(src.get("unpublishOnFail", True))
                fail_threshold = max(1, int(src.get("failThreshold") or 3))

                prev = existing_statuses.get(sid) or {}
                prev_fail = int(prev.get("failCount") or 0)

                if not website_url:
                    continue

                verified_feed = None
                diag_msg = "No playable feed found"

                try:
                    candidates = extract_feeds_with_playwright(browser, website_url)
                    for cand in candidates:
                        ok, msg = verify_feed(cand["url"], cand["type"], referer=website_url)
                        if ok:
                            verified_feed = cand
                            diag_msg = msg
                            break
                        diag_msg = msg
                except Exception as exc:
                    diag_msg = str(exc)[:140]

                ts = now_iso()

                if verified_feed:
                    online_count += 1
                    ftype = verified_feed["type"]
                    furl = verified_feed["url"]
                    yt_id = extract_youtube_id(furl) if ftype == "youtube" else ""
                    published = False

                    if auto_publish and not manual_lock and temple_id:
                        t_ref = rtdb.reference(f"temples/{temple_id}")
                        update_payload = {
                            "streamType": "youtube" if ftype == "youtube" else ("hls" if ftype == "hls" else "auto"),
                            "streamUrl": f"https://www.youtube.com/watch?v={yt_id}" if yt_id else furl,
                            "hidden": False,
                            "autoUpdatedAt": ts,
                        }
                        t_ref.update(update_payload)
                        published = True

                    status_ref.child(sid).set({
                        "templeId": temple_id,
                        "templeName": temple_name,
                        "websiteUrl": website_url,
                        "status": "online",
                        "feedUrl": furl,
                        "feedType": ftype,
                        "youtubeId": yt_id,
                        "via": verified_feed["via"],
                        "lastCheckedAt": ts,
                        "lastOnlineAt": ts,
                        "failCount": 0,
                        "published": published,
                        "message": diag_msg,
                    })

                    if prev.get("status") != "online" or prev.get("feedUrl") != furl:
                        append_history(rtdb, {
                            "ts": ts,
                            "sourceId": sid,
                            "templeId": temple_id,
                            "templeName": temple_name,
                            "event": "published" if published else "verified",
                            "feedType": ftype,
                            "feedUrl": furl,
                            "message": diag_msg,
                        })
                    print(f"[ONLINE] {temple_name}: {ftype} -> {furl} (published={published})")

                else:
                    offline_count += 1
                    new_fail = prev_fail + 1
                    unpublished_now = False

                    if (
                        new_fail >= fail_threshold
                        and auto_publish
                        and unpublish_on_fail
                        and not manual_lock
                        and temple_id
                    ):
                        rtdb.reference(f"temples/{temple_id}").update({
                            "hidden": True,
                            "autoUpdatedAt": ts,
                        })
                        unpublished_now = True

                    status_ref.child(sid).set({
                        "templeId": temple_id,
                        "templeName": temple_name,
                        "websiteUrl": website_url,
                        "status": "offline",
                        "feedUrl": prev.get("feedUrl", ""),
                        "feedType": prev.get("feedType", ""),
                        "youtubeId": prev.get("youtubeId", ""),
                        "lastCheckedAt": ts,
                        "lastOnlineAt": prev.get("lastOnlineAt", ""),
                        "failCount": new_fail,
                        "published": False if unpublished_now else bool(prev.get("published", False)),
                        "message": diag_msg,
                    })

                    if unpublished_now or prev.get("status") == "online":
                        append_history(rtdb, {
                            "ts": ts,
                            "sourceId": sid,
                            "templeId": temple_id,
                            "templeName": temple_name,
                            "event": "unpublished" if unpublished_now else "offline",
                            "failCount": new_fail,
                            "message": diag_msg,
                        })
                    print(f"[OFFLINE #{new_fail}] {temple_name}: {diag_msg}")
        finally:
            browser.close()

    rtdb.reference("feedDiscovery/meta").set({
        "lastRunAt": now_iso(),
        "totalSources": total_enabled,
        "onlineCount": online_count,
        "offlineCount": offline_count,
        "runDurationSec": round(time.time() - t0, 2),
    })
    print(f"Scan complete in {round(time.time() - t0, 2)}s (online={online_count}, offline={offline_count})")


if __name__ == "__main__":
    run_scan()

/* Shared Live Darshan OTT Popup Module — Auto-Synced across reels.html & temple-profile.html */
(function () {
  if (window.DSLivePopup) return;

  const DEFAULT_DISCLAIMER = 'अस्वीकरण: या पोर्टलवरील सर्व लाईव्ह दर्शनाचे प्रक्षेपण संबंधित देवस्थान व अधिकृत तृतीय-पक्ष माध्यमांच्या माध्यमातून दाखवले जात आहे. आम्ही केवळ भक्तांच्या सोयीसाठी ते एकाच ठिकाणी एकत्रित केले आहेत. देवस्थान संदर्भात कुठल्याही अडचणीसाठी संबंधित देवस्थानाशी संपर्क साधावा.';
  const DEFAULT_UNAVAIL = '🙏 माफ करा, सदर देवस्थानचे लाईव्ह दर्शन सध्या उपलब्ध नाही.<br>✨ लवकरच दर्शन उपलब्ध करून देण्याचा आम्ही प्रयत्न करत आहोत.';
  const DEFAULT_TEMP_OFFLINE = '<div style="font-size:clamp(20px,5.2vw,24px);margin-bottom:6px;">🙏 सध्या लाईव्ह दर्शन तात्पुरते बंद आहे</div><div style="font-size:14.5px;font-weight:500;color:#e2e8f0;line-height:1.45;">मंदिराची दैनंदिन पूजा/नैवेद्य वेळ किंवा तांत्रिक कारणास्तव प्रक्षेपण थांबलेले असू शकते. कृपया थोड्या वेळाने पुन्हा प्रयत्न करा.</div>';

  let liveCfg = {
    watermarkText: 'Anil Tormal',
    disclaimer: DEFAULT_DISCLAIMER,
    timeoutMs: 8000
  };
  let hlsInst = null;
  let clockTimer = null;
  let timeoutTimer = null;
  let onCloseCb = null;
  let curTitle = 'लाईव्ह दर्शन';

  function injectStyles() {
    if (document.getElementById('dsLivePopupStyles')) return;
    const st = document.createElement('style');
    st.id = 'dsLivePopupStyles';
    st.textContent = `
      .ds-live-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.85); backdrop-filter: blur(7px); z-index: 95; display: flex; align-items: center; justify-content: center; padding: 8px; opacity: 0; pointer-events: none; transition: opacity 0.25s ease; }
      .ds-live-overlay.open { opacity: 1; pointer-events: auto; }
      .ds-live-box { width: 100%; max-width: 418px; margin: 0 auto; padding: 2.5px; background: linear-gradient(90deg,#fbbf24,#f97316,#f43f5e); border-radius: 16px; box-shadow: 0 0 32px rgba(245,158,11,0.45), 0 22px 55px rgba(0,0,0,0.92); overflow: hidden; }
      .ds-live-inner { width: 100%; display: flex; flex-direction: column; background: #000; border-radius: 13.5px; overflow: hidden; }
      .ds-ott-hdr { background: linear-gradient(90deg,#031926,#063854,#031926); padding: 8px 10px; display: flex; flex-direction: column; gap: 7px; border-bottom: 2px solid rgba(251,191,36,0.7); }
      .ds-ott-r1 { display: flex; align-items: center; justify-content: flex-start; gap: 8px; min-width: 0; width: 100%; }
      .ds-ott-r2 { display: flex; align-items: center; justify-content: flex-end; gap: 7px; width: 100%; }
      .ds-ott-tw { display: flex; align-items: center; gap: 7px; min-width: 0; flex: 1; }
      @keyframes dsOttPulse { 0%,100%{opacity:1;} 50%{opacity:0.35;} }
      .ds-ott-badge { background: #dc2626; color: #fff; font-size: 10px; font-weight: 800; padding: 2px 7px; border-radius: 999px; display: inline-flex; align-items: center; gap: 4px; flex-shrink: 0; }
      .ds-ott-dot { width: 6px; height: 6px; border-radius: 999px; background: #fff; animation: dsOttPulse 1.5s infinite; }
      .ds-ott-tname { font-family: 'Khand',sans-serif; font-size: 19px; line-height: 1.2; font-weight: 700; color: #fff; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
      .ds-ott-dt { font-size: 11px; font-weight: 700; color: #FDE68A; border: 1px solid rgba(253,230,138,0.35); background: rgba(255,255,255,0.1); border-radius: 8px; padding: 3px 8px; white-space: nowrap; flex-shrink: 0; }
      .ds-ott-btns { display: flex; align-items: center; gap: 6px; flex-shrink: 0; }
      .ds-ico-btn { width: 30px; height: 30px; border-radius: 10px; background: rgba(255,255,255,0.15); border: 1px solid rgba(255,255,255,0.25); color: #fff; display: flex; align-items: center; justify-content: center; cursor: pointer; }
      .ds-close-red { background: #f43f5e; border-color: #fb7185; color: #fff; }
      .ds-live-stage { position: relative; width: 100%; aspect-ratio: 16/9; background: linear-gradient(135deg,#02121c,#05344E,#02121c); overflow: hidden; display: flex; align-items: center; justify-content: center; }
      @keyframes dsShimmerSweep { 0%{transform:translateX(-100%) skewX(-18deg);} 100%{transform:translateX(250%) skewX(-18deg);} }
      .ds-shimmer-wrap { position: absolute; inset: 0; z-index: 8; background: rgba(8,12,20,0.92); overflow: hidden; display: flex; align-items: center; justify-content: center; padding: 0 18px 34px; pointer-events: none; user-select: none; }
      .ds-shimmer-beam { position: absolute; top: 0; bottom: 0; left: 0; width: 50%; background: linear-gradient(90deg,transparent,rgba(253,230,138,0.18),transparent); animation: dsShimmerSweep 1.6s ease-in-out infinite; }
      .ds-shimmer-txt { position: relative; z-index: 2; color: #FDE68A; font-size: 14.5px; font-weight: 700; text-align: center; line-height: 1.45; }
      .ds-wm-outer { position: absolute; top: 50%; left: 0; right: 0; transform: translateY(-50%); z-index: 6; overflow: hidden; pointer-events: none; user-select: none; }
      @keyframes dsWmMarquee { 0%{transform:translateX(0);} 100%{transform:translateX(-50%);} }
      .ds-center-wm { display: flex; width: max-content; white-space: nowrap; will-change: transform; font-size: 16px; font-weight: 600; letter-spacing: 0.1em; color: rgba(209,213,219,0.48); text-shadow: 0 1px 2px rgba(0,0,0,0.65); animation: dsWmMarquee 16s linear infinite; }
      .ds-wm-item { padding: 0 72px; flex-shrink: 0; }
      @keyframes dsTickerScroll { 0%{transform:translateX(0%);} 100%{transform:translateX(-100%);} }
      .ds-wm-bar { position: absolute; bottom: 0; left: 0; right: 0; z-index: 7; background: #05344E; border-top: 1px solid rgba(255,255,255,0.18); padding: 4px 0; overflow: hidden; pointer-events: none; }
      .ds-wm-ticker { display: inline-block; padding-left: 100%; font-size: 12.5px; line-height: 1.3; font-weight: 600; color: #FDE68A; white-space: nowrap; animation: dsTickerScroll 24s linear infinite; }
      .ds-hidden { display: none !important; }
    `;
    document.head.appendChild(st);
  }

  function ensureModal() {
    injectStyles();
    if (document.getElementById('dsLiveOverlay')) return;
    const div = document.createElement('div');
    div.className = 'ds-live-overlay';
    div.id = 'dsLiveOverlay';
    div.onclick = (e) => { if (e.target === div) close(); };
    div.innerHTML = `
      <div class="ds-live-box">
        <div class="ds-live-inner">
          <div class="ds-ott-hdr">
            <div class="ds-ott-r1">
              <div class="ds-ott-tw">
                <span class="ds-ott-badge"><span class="ds-ott-dot"></span>LIVE</span>
                <span class="ds-ott-tname" id="dsOttTitle">लाईव्ह दर्शन</span>
              </div>
            </div>
            <div class="ds-ott-r2">
              <span class="ds-ott-dt" id="dsOttClock">--/--/----</span>
              <div class="ds-ott-btns">
                <button type="button" class="ds-ico-btn" id="dsOttShareBtn" aria-label="शेअर करा">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 2L11 13"/><path d="M22 2l-7 20-4-9-9-4 20-7z"/></svg>
                </button>
                <button type="button" class="ds-ico-btn" id="dsOttMuteBtn" aria-label="आवाज चालू किंवा बंद करा">
                  <svg id="dsOttMuteOn" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14"/></svg>
                  <svg id="dsOttMuteOff" class="ds-hidden" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#FDE68A" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><line x1="23" y1="9" x2="17" y2="15"/><line x1="17" y1="9" x2="23" y2="15"/></svg>
                </button>
                <button type="button" class="ds-ico-btn ds-close-red" id="dsOttCloseBtn" aria-label="बंद करा">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                </button>
              </div>
            </div>
          </div>
          <div class="ds-live-stage">
            <div class="ds-shimmer-wrap" id="dsLiveShimmer">
              <div class="ds-shimmer-beam"></div>
              <span class="ds-shimmer-txt">🙏 लाईव्ह दर्शन सुरू होत आहे, कृपया प्रतीक्षा करा.</span>
            </div>
            <div id="dsLiveOfflineCard" class="ds-hidden" style="position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;padding:18px 20px 44px;color:#FDE68A;font-family:'Khand',sans-serif;font-weight:700;font-size:clamp(16px,4.2vw,19px);line-height:1.45;z-index:9;background:radial-gradient(circle at center,rgba(3,25,38,0.92),rgba(2,18,28,0.98));"></div>
            <video id="dsLiveVideo" style="position:relative;z-index:3;width:100%;height:100%;object-fit:fill;display:none;" playsinline autoplay></video>
            <iframe id="dsLiveIframe" style="position:relative;z-index:3;width:100%;height:100%;border:0;display:none;" allow="autoplay; encrypted-media" allowfullscreen></iframe>
            <div class="ds-wm-outer"><div class="ds-center-wm" id="dsOttWm"></div></div>
            <div class="ds-wm-bar"><div class="ds-wm-ticker" id="dsOttDisclaimer"></div></div>
          </div>
        </div>
      </div>`;
    document.body.appendChild(div);

    const vid = document.getElementById('dsLiveVideo');
    const ifr = document.getElementById('dsLiveIframe');
    vid.onplaying = onPlaying;
    vid.oncanplay = () => { if (!vid.paused) onPlaying(); };
    ifr.onload = () => {
      if (ifr.getAttribute('src') && ifr.getAttribute('src') !== 'about:blank') {
        const s = document.getElementById('dsLiveShimmer');
        if (s) s.style.display = 'none';
      }
    };
    document.getElementById('dsOttCloseBtn').onclick = close;
    document.getElementById('dsOttMuteBtn').onclick = toggleMute;
    document.getElementById('dsOttShareBtn').onclick = share;
  }

  function extractYouTubeId(input) {
    const trimmed = (input || '').trim();
    if (!trimmed) return null;
    if (/^[a-zA-Z0-9_-]{11}$/.test(trimmed)) return trimmed;
    try {
      const url = new URL(trimmed);
      if (url.hostname.includes('youtu.be')) return url.pathname.replace('/', '').split('/')[0] || null;
      if (url.searchParams.has('v')) return url.searchParams.get('v');
      const parts = url.pathname.split('/').filter(Boolean);
      for (const seg of ['live', 'embed', 'shorts']) {
        const idx = parts.indexOf(seg);
        if (idx !== -1 && parts[idx + 1]) return parts[idx + 1];
      }
    } catch (e) { return null; }
    return null;
  }

  function detectType(url, cfgType) {
    const u = (url || '').trim();
    if (!u) return 'none';
    if (cfgType && cfgType !== 'auto') return cfgType;
    if (extractYouTubeId(u)) return 'youtube';
    if (/facebook\.com|fb\.watch/i.test(u)) return 'facebook';
    if (u.toLowerCase().includes('.m3u8')) return 'hls';
    if (/\.(mp4|webm|mov)(\?|$)/i.test(u)) return 'mp4';
    return 'iframe';
  }

  function syncMuteIcon() {
    const vid = document.getElementById('dsLiveVideo');
    const onEl = document.getElementById('dsOttMuteOn');
    const offEl = document.getElementById('dsOttMuteOff');
    if (!onEl || !offEl) return;
    const isMuted = Boolean(vid && vid.muted);
    onEl.classList.toggle('ds-hidden', isMuted);
    offEl.classList.toggle('ds-hidden', !isMuted);
  }

  function toggleMute() {
    const vid = document.getElementById('dsLiveVideo');
    if (!vid) return;
    vid.muted = !vid.muted;
    syncMuteIcon();
  }

  async function share() {
    const url = 'https://darshansetu.live/';
    const shareText = `🙏 ${curTitle} — घरबसल्या अखंड लाईव्ह दर्शन घ्या: ${url}`;
    if (navigator.share) { try { await navigator.share({ title: curTitle, text: `🙏 ${curTitle} — लाईव्ह दर्शन घ्या`, url }); return; } catch (_) {} }
    window.open('https://wa.me/?text=' + encodeURIComponent(shareText), '_blank', 'noopener,noreferrer');
  }

  function onPlaying() {
    if (timeoutTimer) { clearTimeout(timeoutTimer); timeoutTimer = null; }
    const s = document.getElementById('dsLiveShimmer');
    const o = document.getElementById('dsLiveOfflineCard');
    const vid = document.getElementById('dsLiveVideo');
    if (s) s.style.display = 'none';
    if (o) o.classList.add('ds-hidden');
    if (vid && (vid.getAttribute('src') || hlsInst)) vid.style.display = 'block';
  }

  function syncSettingsFromFirebase() {
    try {
      if (window.firebase && firebase.apps && firebase.apps.length) {
        firebase.database().ref('siteConfig/shortsConfig/livePopup').on('value', (snap) => {
          const val = snap.val();
          if (val && typeof val === 'object') {
            liveCfg = Object.assign({}, liveCfg, val);
          }
        });
      }
    } catch (e) {}
  }

  function open(opts) {
    ensureModal();
    if (timeoutTimer) { clearTimeout(timeoutTimer); timeoutTimer = null; }
    onCloseCb = opts && typeof opts.onClose === 'function' ? opts.onClose : null;
    curTitle = (opts && opts.name) || 'लाईव्ह दर्शन';
    const streamUrl = ((opts && opts.streamUrl) || '').trim();
    const sType = detectType(streamUrl, opts && opts.streamType);

    document.getElementById('dsOttTitle').textContent = curTitle;
    const wmTxt = liveCfg.watermarkText || 'Anil Tormal';
    document.getElementById('dsOttWm').innerHTML = `<span class="ds-wm-item">${wmTxt}</span><span class="ds-wm-item" aria-hidden="true">${wmTxt}</span><span class="ds-wm-item" aria-hidden="true">${wmTxt}</span><span class="ds-wm-item" aria-hidden="true">${wmTxt}</span>`;
    document.getElementById('dsOttDisclaimer').textContent = liveCfg.disclaimer || DEFAULT_DISCLAIMER;

    const shimmerEl = document.getElementById('dsLiveShimmer');
    const offlineEl = document.getElementById('dsLiveOfflineCard');
    offlineEl.innerHTML = sType === 'none' ? DEFAULT_UNAVAIL : DEFAULT_TEMP_OFFLINE;
    shimmerEl.style.display = sType !== 'none' ? 'flex' : 'none';
    offlineEl.classList.toggle('ds-hidden', sType !== 'none');

    const vid = document.getElementById('dsLiveVideo');
    const ifr = document.getElementById('dsLiveIframe');
    vid.pause(); vid.removeAttribute('src'); vid.load(); vid.muted = false; vid.style.display = 'none';
    ifr.src = 'about:blank'; ifr.style.display = 'none';
    if (hlsInst) { hlsInst.destroy(); hlsInst = null; }

    const overlay = document.getElementById('dsLiveOverlay');
    overlay.classList.add('open');

    const showOffline = (isFatal) => {
      if (timeoutTimer) { clearTimeout(timeoutTimer); timeoutTimer = null; }
      shimmerEl.style.display = 'none';
      offlineEl.innerHTML = DEFAULT_TEMP_OFFLINE;
      offlineEl.classList.remove('ds-hidden');
      if (isFatal) vid.style.display = 'none';
      ifr.style.display = 'none';
    };

    vid.onerror = () => { if (overlay.classList.contains('open') && vid.getAttribute('src')) showOffline(true); };
    ifr.onerror = () => { if (overlay.classList.contains('open') && ifr.getAttribute('src') !== 'about:blank') showOffline(true); };
    syncMuteIcon();

    const tryPlay = () => {
      vid.play().then(() => syncMuteIcon()).catch(() => {
        vid.muted = true; syncMuteIcon();
        vid.play().catch(() => {});
      });
    };

    if (sType === 'youtube') {
      const ytId = extractYouTubeId(streamUrl);
      if (ytId) {
        ifr.src = `https://www.youtube-nocookie.com/embed/${ytId}?autoplay=1&playsinline=1&controls=0&disablekb=1&fs=0&rel=0&modestbranding=1`;
        ifr.style.display = 'block';
      } else { showOffline(true); }
    } else if (sType === 'facebook') {
      ifr.src = streamUrl.includes('facebook.com/plugins/video.php') ? streamUrl : `https://www.facebook.com/plugins/video.php?href=${encodeURIComponent(streamUrl)}&show_text=false&autoplay=1&mute=0`;
      ifr.style.display = 'block';
    } else if (sType === 'iframe') {
      ifr.src = streamUrl; ifr.style.display = 'block';
    } else if (sType === 'hls') {
      vid.style.display = 'block';
      timeoutTimer = setTimeout(() => { if (vid.readyState < 2 && overlay.classList.contains('open')) showOffline(false); }, liveCfg.timeoutMs || 8000);
      if (window.Hls && Hls.isSupported()) {
        hlsInst = new Hls({ enableWorker: true, manifestLoadingMaxRetry: 1, levelLoadingMaxRetry: 1 });
        hlsInst.loadSource(streamUrl); hlsInst.attachMedia(vid);
        hlsInst.on(Hls.Events.MANIFEST_PARSED, () => tryPlay());
        hlsInst.on(Hls.Events.ERROR, (ev, data) => {
          if (data && data.fatal) {
            if (hlsInst) { hlsInst.destroy(); hlsInst = null; }
            if (data.type !== Hls.ErrorTypes.NETWORK_ERROR && vid.canPlayType('application/vnd.apple.mpegurl')) {
              vid.src = streamUrl; tryPlay();
            } else { showOffline(true); }
          }
        });
      } else if (vid.canPlayType('application/vnd.apple.mpegurl')) {
        vid.src = streamUrl; tryPlay();
      } else { showOffline(true); }
    } else if (sType === 'mp4') {
      vid.style.display = 'block'; vid.src = streamUrl; tryPlay();
    }

    if (clockTimer) clearInterval(clockTimer);
    const MR_DAYS = ['रविवार', 'सोमवार', 'मंगळवार', 'बुधवार', 'गुरुवार', 'शुक्रवार', 'शनिवार'];
    const tick = () => {
      const now = new Date();
      const dd = String(now.getDate()).padStart(2, '0');
      const mm = String(now.getMonth() + 1).padStart(2, '0');
      const yyyy = now.getFullYear();
      const dayName = MR_DAYS[now.getDay()];
      let hrs = now.getHours();
      const mins = String(now.getMinutes()).padStart(2, '0');
      const secs = String(now.getSeconds()).padStart(2, '0');
      const ampm = hrs >= 12 ? 'PM' : 'AM';
      hrs = hrs % 12 || 12;
      const cEl = document.getElementById('dsOttClock');
      if (cEl) cEl.textContent = `${dd}/${mm}/${yyyy} (${dayName}) ${String(hrs).padStart(2, '0')}:${mins}:${secs} ${ampm}`;
    };
    tick(); clockTimer = setInterval(tick, 1000);
  }

  function close() {
    if (timeoutTimer) { clearTimeout(timeoutTimer); timeoutTimer = null; }
    if (clockTimer) { clearInterval(clockTimer); clockTimer = null; }
    if (hlsInst) { hlsInst.destroy(); hlsInst = null; }
    const vid = document.getElementById('dsLiveVideo');
    const ifr = document.getElementById('dsLiveIframe');
    if (vid) { vid.pause(); vid.removeAttribute('src'); vid.load(); }
    if (ifr) ifr.src = 'about:blank';
    const overlay = document.getElementById('dsLiveOverlay');
    if (overlay) overlay.classList.remove('open');
    if (onCloseCb) { try { onCloseCb(); } catch (e) {} }
  }

  syncSettingsFromFirebase();
  window.DSLivePopup = { open, close };
})();

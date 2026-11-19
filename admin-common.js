const FIREBASE_CONFIG = {
  apiKey: 'AIzaSyCI1oILspru4DCLuUQvNohtKArFVVMy4Xc',
  authDomain: 'livedarshan-204ed.firebaseapp.com',
  databaseURL: 'https://livedarshan-204ed-default-rtdb.asia-southeast1.firebasedatabase.app',
  projectId: 'livedarshan-204ed',
  storageBucket: 'livedarshan-204ed.firebasestorage.app',
  messagingSenderId: '76847755872',
  appId: '1:76847755872:web:5de22983493926bb8bc905',
  measurementId: 'G-QRLH076VMZ'
};

const TOP_50_DEVANAGARI_FONTS = [
  ["'Noto Sans Devanagari', sans-serif", "१. Noto Sans Devanagari (आधुनिक व स्वच्छ)"],
  ["'Noto Serif Devanagari', serif", "२. Noto Serif Devanagari (पारंपरिक सेरिफ)"],
  ["'Mukta', sans-serif", "३. Mukta (लोकप्रिय मराठी वेब फॉन्ट)"],
  ["'Tiro Devanagari Marathi', serif", "४. Tiro Devanagari Marathi (भक्तिमय मराठी)"],
  ["'Tiro Devanagari Hindi', serif", "५. Tiro Devanagari Hindi (ग्रंथ स्टाईल)"],
  ["'Tiro Devanagari Sanskrit', serif", "६. Tiro Devanagari Sanskrit (संस्कृत स्टाईल)"],
  ["'Poppins', 'Noto Sans Devanagari', sans-serif", "७. Poppins (आकर्षक गोलाकार)"],
  ["'Hind', sans-serif", "८. Hind (स्पष्ट व वाचायला सोपा)"],
  ["'Khand', sans-serif", "९. Khand (जाड व ठळक मथळे)"],
  ["'Teko', sans-serif", "१०. Teko (उंच व प्रभावी हेडलाईन)"],
  ["'Yatra One', cursive", "११. Yatra One (उत्सवी / मंदिर स्टाईल)"],
  ["'Rozha One', serif", "१२. Rozha One (शाही व भव्य मथळे)"],
  ["'Kalam', cursive", "१३. Kalam (हस्तलिखित देवनागरी)"],
  ["'Tillana', cursive", "१४. Tillana (वळणदार हस्तलिखित)"],
  ["'Anek Devanagari', sans-serif", "१५. Anek Devanagari (अनेक स्टाईल्स)"],
  ["'Martel', serif", "१६. Martel (साहित्यिक व सुंदर)"],
  ["'Martel Sans', sans-serif", "१७. Martel Sans (स्वच्छ सॅन्स)"],
  ["'Karma', serif", "१८. Karma (मृदू व वाचनीय)"],
  ["'Laila', serif", "१९. Laila (आकर्षक व वक्र)"],
  ["'Sahitya', serif", "२०. Sahitya (पारंपरिक पुस्तक स्टाईल)"],
  ["'Eczar', serif", "२१. Eczar (ठळक व दमदार)"],
  ["'Rajdhani', sans-serif", "२२. Rajdhani (तांत्रिक व आधुनिक)"],
  ["'Amiko', sans-serif", "२३. Amiko (संतुलित व सोपा)"],
  ["'Jaldi', sans-serif", "२४. Jaldi (वेब फ्रेंडली)"],
  ["'Sarala', sans-serif", "२५. Sarala (साधा व सरळ)"],
  ["'Pragati Narrow', sans-serif", "२६. Pragati Narrow (आटोपशीर)"],
  ["'Khula', sans-serif", "२७. Khula (मोकळा व स्पष्ट)"],
  ["'Halant', serif", "२८. Halant (अभिजात सेरिफ)"],
  ["'Palanquin', sans-serif", "२९. Palanquin (सुबक सॅन्स)"],
  ["'Palanquin Dark', sans-serif", "३०. Palanquin Dark (गडद व ठळक)"],
  ["'Kurale', serif", "३१. Kurale (कलात्मक देवनागरी)"],
  ["'Cambay', sans-serif", "३२. Cambay (वाचनीय वेब फॉन्ट)"],
  ["'Rhodium Libre', serif", "३३. Rhodium Libre (क्लासिक सेरिफ)"],
  ["'Arya', sans-serif", "३४. Arya (सुंदर मथळे)"],
  ["'Asar', serif", "३५. Asar (असरदार व स्पष्ट)"],
  ["'Sumana', serif", "३६. Sumana (सौम्य व पारंपरिक)"],
  ["'Sura', sans-serif", "३७. Sura (मजबूत व स्वच्छ)"],
  ["'Vesper Libre', serif", "३८. Vesper Libre (शास्त्रीय सेरिफ)"],
  ["'Kadwa', serif", "३९. Kadwa (संपादकीय फॉन्ट)"],
  ["'Glegoo', serif", "४०. Glegoo (चौरस सेरिफ)"],
  ["'Inknut Antiqua', serif", "४१. Inknut Antiqua (ऐतिहासिक व भव्य)"],
  ["'Gotu', sans-serif", "४२. Gotu (सुंदर डेकोरेटिव्ह)"],
  ["'Modak', cursive", "४३. Modak (जाड व आकर्षक)"],
  ["'Baloo 2', sans-serif", "४४. Baloo 2 (गोलाकार व ठळक)"],
  ["'Amita', cursive", "४५. Amita (सुलेखन / कॅलिग्राफी)"],
  ["'Dekko', cursive", "४६. Dekko (हस्तलिखित स्टाईल)"],
  ["'Biryani', sans-serif", "४७. Biryani (आधुनिक डिस्प्ले)"],
  ["'Bakbak One', cursive", "४८. Bakbak One (भव्य हेडलाईन)"],
  ["'Akshar', sans-serif", "४९. Akshar (संतुलित देवनागरी)"],
  ["'Playpen Sans Deva', cursive", "५०. Playpen Sans Deva (नैसर्गिक हस्तलिखित)"]
];

const fbApp = firebase.apps.length ? firebase.app() : firebase.initializeApp(FIREBASE_CONFIG);
const fbAuth = firebase.auth();
const fbDb = firebase.database();

(function injectModernAdminStyles() {
  if (document.getElementById('modernAdminCss')) return;
  const st = document.createElement('style');
  st.id = 'modernAdminCss';
  st.textContent = `
    html, body { font-family: 'Noto Sans Devanagari', 'Poppins', sans-serif; -webkit-tap-highlight-color: transparent; overflow-x: clip; max-width: 100%; }
    @keyframes fadeSlideUp { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
    .fade-in-up { animation: fadeSlideUp 0.28s cubic-bezier(0.16, 1, 0.3, 1) both; }
    .no-scrollbar::-webkit-scrollbar { display: none; }
    .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
    .toggle-pill { position: relative; display: inline-flex; align-items: center; width: 44px; height: 24px; border-radius: 9999px; flex-shrink: 0; cursor: pointer; }
    .toggle-pill input { -webkit-appearance: none; appearance: none; position: absolute; inset: 0; width: 100%; height: 100%; margin: 0; border-radius: 9999px; background: #cbd5e1; transition: background .2s ease; cursor: pointer; z-index: 1; }
    .toggle-pill input:checked { background: #059669; }
    .toggle-pill .knob { position: relative; z-index: 2; pointer-events: none; width: 18px; height: 18px; border-radius: 9999px; background: #fff; box-shadow: 0 1px 3px rgba(0,0,0,0.28); transform: translateX(3px); transition: transform .2s ease; }
    .toggle-pill input:checked + .knob { transform: translateX(23px); }
    .hsv-popover { position: fixed; z-index: 9999; width: 236px; background: #fff; border-radius: 16px; border: 1px solid #e2e8f0; box-shadow: 0 20px 40px rgba(15,23,42,0.22); padding: 12px; }
  `;
  document.head.appendChild(st);
})();

function renderAdminShell(activeKey, pageTitle) {
  const navItems = [
    { key: 'temples', href: 'admin-temples.html', icon: '🛕', label: 'मंदिरे' },
    { key: 'templeinfo', href: 'admin-temple-info.html', icon: '📝', label: 'मंदिर माहिती' },
    { key: 'header', href: 'admin-header.html', icon: '🎨', label: 'हेडर व फुटर' },
    { key: 'player', href: 'admin-player.html', icon: '📺', label: 'प्लेयर' },
    { key: 'layout', href: 'admin-layout.html', icon: '🧩', label: 'लेआउट व बटणे' },
    { key: 'ads', href: 'admin-ads.html', icon: '📢', label: 'जाहिराती' },
    { key: 'visitors', href: 'admin-visitors-links.html', icon: '🔗', label: 'भाविक व लिंक्स' }
  ];

  const header = document.getElementById('adminTopHeader');
  if (!header) return;

  const pillsHtml = activeKey === 'dashboard' ? '' : `
    <nav class="bg-white/95 backdrop-blur border-b border-slate-200 sticky top-[60px] z-30">
      <div class="max-w-7xl mx-auto px-3 py-2 flex items-center gap-1.5 overflow-x-auto no-scrollbar">
        ${navItems.map(item => {
          const isAct = item.key === activeKey;
          return `<a href="${item.href}" class="shrink-0 px-3 py-1.5 rounded-full text-xs font-bold transition flex items-center gap-1.5 ${isAct ? 'bg-[#05344E] text-white shadow-sm' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'}"><span>${item.icon}</span><span>${item.label}</span></a>`;
        }).join('')}
      </div>
    </nav>
  `;

  const homeIconSvg = `<svg class="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.1" stroke-linecap="round" stroke-linejoin="round"><path d="M3 10.5L12 3l9 7.5"/><path d="M5 9.5V20a1 1 0 001 1h4v-6h4v6h4a1 1 0 001-1V9.5"/></svg>`;
  const logoutIconSvg = `<svg class="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.1" stroke-linecap="round" stroke-linejoin="round"><path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>`;
  const dashIconSvg = `<svg class="w-5 h-5 text-amber-300 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="9" rx="1.5"/><rect x="14" y="3" width="7" height="5" rx="1.5"/><rect x="14" y="12" width="7" height="9" rx="1.5"/><rect x="3" y="16" width="7" height="5" rx="1.5"/></svg>`;

  header.outerHTML = `
    <header class="bg-gradient-to-r from-[#04283d] via-[#05344E] to-[#0a4d70] text-white shadow-md sticky top-0 z-50">
      <div class="max-w-7xl mx-auto px-3 sm:px-5 h-15 py-2.5 flex items-center justify-between gap-2">
        <div class="flex items-center gap-2.5 min-w-0">
          ${activeKey !== 'dashboard'
            ? `<a href="admin.html" class="px-2.5 sm:px-3 py-1.5 rounded-xl bg-white/20 hover:bg-white/30 text-white text-xs sm:text-sm font-extrabold transition flex items-center gap-1 shrink-0 shadow-sm" title="डॅशबोर्डवर जा"><span>←</span><span>डॅशबोर्ड</span></a>`
            : `<div class="w-9 h-9 rounded-xl bg-amber-400/15 border border-amber-300/35 flex items-center justify-center shrink-0">${dashIconSvg}</div>`
          }
          <div class="min-w-0">
            <h1 class="text-base sm:text-xl font-extrabold tracking-tight truncate leading-tight">${pageTitle}</h1>
          </div>
        </div>
        <div class="flex items-center gap-1.5 sm:gap-2 shrink-0">
          <a href="index.html" target="_blank" class="px-2.5 sm:px-3.5 py-1.5 sm:py-2 rounded-xl bg-white/15 hover:bg-white/25 text-white text-xs sm:text-sm font-bold transition flex items-center gap-1.5 whitespace-nowrap" title="मुख्य पेज">
            ${homeIconSvg}<span>मुख्य पेज</span>
          </a>
          <button id="adminLogoutBtn" type="button" class="hidden px-2.5 sm:px-3.5 py-1.5 sm:py-2 rounded-xl bg-rose-500 hover:bg-rose-600 text-white text-xs sm:text-sm font-bold cursor-pointer transition flex items-center gap-1.5 shadow-sm whitespace-nowrap" title="लॉगआऊट">
            ${logoutIconSvg}<span>लॉगआऊट</span>
          </button>
        </div>
      </div>
    </header>
    ${pillsHtml}
  `;


}

function populateFontSelect(id, previewId = null) {
  const sel = document.getElementById(id);
  if (!sel) return;
  sel.innerHTML = TOP_50_DEVANAGARI_FONTS
    .map(([v, l]) => `<option value="${v.replace(/"/g, '&quot;')}">${l}</option>`)
    .join('');
  if (previewId) {
    const prev = document.getElementById(previewId);
    const updatePrev = () => { if (prev) prev.style.fontFamily = sel.value; };
    sel.addEventListener('change', updatePrev);
    setTimeout(updatePrev, 50);
  }
}

function showToast(msg, isError = false) {
  const t = document.getElementById('toastBox');
  if (!t) return;
  t.textContent = msg;
  t.className = `fixed bottom-5 left-1/2 -translate-x-1/2 z-50 px-4 py-2.5 rounded-full text-white text-xs font-bold shadow-xl transition-all ${isError ? 'bg-rose-600' : 'bg-slate-900'}`;
  clearTimeout(window.__toastTimer);
  window.__toastTimer = setTimeout(() => t.classList.add('hidden'), 2600);
}

function compressImageFile(file, maxW = 900, maxH = 900, quality = 0.8) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (ev) => {
      const img = new Image();
      img.onload = () => {
        const scale = Math.min(1, maxW / img.width, maxH / img.height);
        const canvas = document.createElement('canvas');
        canvas.width = Math.max(1, Math.round(img.width * scale));
        canvas.height = Math.max(1, Math.round(img.height * scale));
        canvas.getContext('2d').drawImage(img, 0, 0, canvas.width, canvas.height);
        resolve(canvas.toDataURL('image/jpeg', quality));
      };
      img.onerror = reject;
      img.src = ev.target.result;
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

// Universal HSV Canvas Color Picker
(function setupUniversalColorPicker() {
  let popover = null;
  let activeInput = null;
  let activeSwatch = null;
  let curH = 0, curS = 1, curV = 1;

  function hsvToHex(h, s, v) {
    const f = (n, k = (n + h / 60) % 6) => v - v * s * Math.max(Math.min(k, 4 - k, 1), 0);
    const toHex = x => Math.round(x * 255).toString(16).padStart(2, '0');
    return `#${toHex(f(5))}${toHex(f(3))}${toHex(f(1))}`.toUpperCase();
  }

  function hexToHsv(hex) {
    let m = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec((hex || '').trim());
    if (!m) return [200, 0.8, 0.5];
    let r = parseInt(m[1], 16) / 255, g = parseInt(m[2], 16) / 255, b = parseInt(m[3], 16) / 255;
    let max = Math.max(r, g, b), min = Math.min(r, g, b), d = max - min;
    let h = d === 0 ? 0 : max === r ? ((g - b) / d) % 6 : max === g ? (b - r) / d + 2 : (r - g) / d + 4;
    h = Math.round(h * 60);
    if (h < 0) h += 360;
    return [h, max === 0 ? 0 : d / max, max];
  }

  function ensurePopover() {
    if (popover) return popover;
    popover = document.createElement('div');
    popover.className = 'hsv-popover hidden';
    popover.innerHTML = `
      <canvas class="w-full h-36 rounded-xl cursor-crosshair block border border-slate-200" width="212" height="144"></canvas>
      <input type="range" min="0" max="360" value="0" class="w-full mt-2.5 accent-[#05344E] cursor-pointer" style="height:10px;border-radius:999px;background:linear-gradient(to right,#f00,#ff0,#0f0,#0ff,#00f,#f0f,#f00);" />
      <div class="flex items-center justify-between gap-2 mt-2.5">
        <span class="text-xs font-mono font-bold text-slate-700 hsv-hex">#000000</span>
        <button type="button" class="px-3 py-1 rounded-lg bg-[#05344E] text-white text-xs font-bold cursor-pointer hsv-done">ठिक आहे</button>
      </div>
    `;
    document.body.appendChild(popover);

    const canvas = popover.querySelector('canvas');
    const ctx = canvas.getContext('2d');
    const hueSlider = popover.querySelector('input[type="range"]');
    const hexLabel = popover.querySelector('.hsv-hex');

    function drawCanvas() {
      ctx.fillStyle = `hsl(${curH}, 100%, 50%)`;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      const wg = ctx.createLinearGradient(0, 0, canvas.width, 0);
      wg.addColorStop(0, '#fff'); wg.addColorStop(1, 'rgba(255,255,255,0)');
      ctx.fillStyle = wg; ctx.fillRect(0, 0, canvas.width, canvas.height);
      const bg = ctx.createLinearGradient(0, 0, 0, canvas.height);
      bg.addColorStop(0, 'rgba(0,0,0,0)'); bg.addColorStop(1, '#000');
      ctx.fillStyle = bg; ctx.fillRect(0, 0, canvas.width, canvas.height);
      const x = curS * canvas.width, y = (1 - curV) * canvas.height;
      ctx.beginPath(); ctx.arc(x, y, 6, 0, Math.PI * 2);
      ctx.strokeStyle = '#fff'; ctx.lineWidth = 2; ctx.stroke();
    }

    function applyColor() {
      const hex = hsvToHex(curH, curS, curV);
      hexLabel.textContent = hex;
      if (activeInput) {
        activeInput.value = hex;
        activeInput.dispatchEvent(new Event('input', { bubbles: true }));
      }
      if (activeSwatch) activeSwatch.style.backgroundColor = hex;
      drawCanvas();
    }

    let dragging = false;
    function pickAt(e) {
      const rect = canvas.getBoundingClientRect();
      const cx = (e.touches ? e.touches[0].clientX : e.clientX) - rect.left;
      const cy = (e.touches ? e.touches[0].clientY : e.clientY) - rect.top;
      curS = Math.max(0, Math.min(1, cx / rect.width));
      curV = Math.max(0, Math.min(1, 1 - cy / rect.height));
      applyColor();
    }
    canvas.addEventListener('mousedown', (e) => { dragging = true; pickAt(e); });
    canvas.addEventListener('touchstart', (e) => { dragging = true; pickAt(e); }, { passive: true });
    window.addEventListener('mousemove', (e) => { if (dragging) pickAt(e); });
    window.addEventListener('touchmove', (e) => { if (dragging) pickAt(e); }, { passive: true });
    window.addEventListener('mouseup', () => { dragging = false; });
    window.addEventListener('touchend', () => { dragging = false; });

    hueSlider.addEventListener('input', () => {
      curH = Number(hueSlider.value);
      applyColor();
    });

    popover.querySelector('.hsv-done').addEventListener('click', () => popover.classList.add('hidden'));
    document.addEventListener('click', (e) => {
      if (!popover.classList.contains('hidden') && !popover.contains(e.target) && e.target !== activeSwatch && e.target !== activeInput) {
        popover.classList.add('hidden');
      }
    });

    popover._openFor = (inputEl, swatchEl) => {
      activeInput = inputEl;
      activeSwatch = swatchEl;
      [curH, curS, curV] = hexToHsv(inputEl.value);
      hueSlider.value = curH;
      hexLabel.textContent = hsvToHex(curH, curS, curV);
      drawCanvas();
      const rect = swatchEl.getBoundingClientRect();
      const top = Math.min(window.innerHeight - 240, rect.bottom + 8);
      const left = Math.max(12, Math.min(window.innerWidth - 248, rect.left));
      popover.style.top = top + 'px';
      popover.style.left = left + 'px';
      popover.classList.remove('hidden');
    };
    return popover;
  }

  window.bindColorPicker = function(inputId, swatchId, defaultHex = '#05344E') {
    const inp = document.getElementById(inputId);
    const sw = document.getElementById(swatchId);
    if (!inp || !sw) return;
    if (!inp.value) inp.value = defaultHex;
    sw.style.backgroundColor = inp.value;
    const pop = ensurePopover();
    sw.addEventListener('click', (e) => { e.stopPropagation(); pop._openFor(inp, sw); });
    inp.addEventListener('input', () => { sw.style.backgroundColor = inp.value.trim(); });
  };
})();

function initAdminGuard(onAuthed, isLoginPage = false) {
  const gate = document.getElementById('authGateMsg');
  const content = document.getElementById('pageContent');
  const logoutBtn = document.getElementById('adminLogoutBtn');

  if (logoutBtn) {
    logoutBtn.addEventListener('click', async () => {
      await fbAuth.signOut();
      window.location.href = 'admin.html';
    });
  }

  fbAuth.onAuthStateChanged((user) => {
    if (user) {
      if (gate) gate.classList.add('hidden');
      if (content) content.classList.remove('hidden');
      if (logoutBtn) logoutBtn.classList.remove('hidden');
      onAuthed(user);
    } else if (isLoginPage) {
      if (gate) gate.classList.add('hidden');
      if (content) content.classList.remove('hidden');
      if (logoutBtn) logoutBtn.classList.add('hidden');
      onAuthed(null);
    } else {
      window.location.href = 'admin.html';
    }
  });
}


// Modern Custom Dropdown Menu for all <select> elements
(function setupModernDropdowns() {
  const st = document.createElement('style');
  st.textContent = `
    .mdrop-wrap { position: relative; width: 100%; }
    .mdrop-btn { width: 100%; display: flex; align-items: center; justify-content: space-between; gap: 8px; padding: 9px 12px; border-radius: 12px; border: 1.5px solid #cbd5e1; background: linear-gradient(to bottom, #ffffff, #f8fafc); color: #0f172a; font-size: 13px; font-weight: 700; cursor: pointer; text-align: left; transition: all .18s ease; box-shadow: 0 1px 2px rgba(15,23,42,0.04); }
    .mdrop-btn:hover { border-color: #05344E; background: #fff; }
    .mdrop-btn.open { border-color: #05344E; box-shadow: 0 0 0 3px rgba(5,52,78,0.12); background: #fff; }
    .mdrop-menu { position: fixed; z-index: 9998; background: #fff; border-radius: 16px; border: 1px solid #e2e8f0; box-shadow: 0 20px 45px rgba(15,23,42,0.18); overflow: hidden; display: none; flex-direction: column; }
    .mdrop-menu.open { display: flex; animation: fadeSlideUp .16s ease-out; }
    .mdrop-search { padding: 8px 10px; border-bottom: 1px solid #f1f5f9; background: #f8fafc; }
    .mdrop-search input { width: 100%; padding: 7px 10px; border-radius: 10px; border: 1px solid #cbd5e1; font-size: 12px; outline: none; background: #fff; }
    .mdrop-search input:focus { border-color: #05344E; }
    .mdrop-list { max-height: 240px; overflow-y: auto; padding: 6px; }
    .mdrop-item { width: 100%; display: flex; align-items: center; justify-content: space-between; gap: 8px; padding: 8px 10px; border-radius: 10px; font-size: 13px; font-weight: 600; color: #334155; cursor: pointer; text-align: left; transition: background .12s ease; }
    .mdrop-item:hover { background: #f1f5f9; color: #05344E; }
    .mdrop-item.active { background: #e0f2fe; color: #05344E; font-weight: 800; }
  `;
  document.head.appendChild(st);

  let activeMenu = null;
  let activeBtn = null;

  function closeActive() {
    if (activeMenu) activeMenu.classList.remove('open');
    if (activeBtn) activeBtn.classList.remove('open');
    activeMenu = null;
    activeBtn = null;
  }

  document.addEventListener('click', (e) => {
    if (activeMenu && !activeMenu.contains(e.target) && activeBtn && !activeBtn.contains(e.target)) {
      closeActive();
    }
  });
  window.addEventListener('scroll', () => { if (activeMenu) closeActive(); }, true);

  window.upgradeSelectToModern = function(sel) {
    if (!sel || sel.dataset.modernUpgraded) return;
    sel.dataset.modernUpgraded = '1';
    sel.style.display = 'none';

    const wrap = document.createElement('div');
    wrap.className = 'mdrop-wrap';
    sel.parentNode.insertBefore(wrap, sel);
    wrap.appendChild(sel);

    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'mdrop-btn';
    btn.innerHTML = `<span class="mdrop-label truncate"></span><svg class="w-4 h-4 text-slate-500 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"/></svg>`;
    wrap.appendChild(btn);

    const menu = document.createElement('div');
    menu.className = 'mdrop-menu';
    document.body.appendChild(menu);

    function syncLabel() {
      const opt = sel.options[sel.selectedIndex];
      btn.querySelector('.mdrop-label').textContent = opt ? opt.textContent : 'निवडा...';
    }

    function buildItems(filter = '') {
      const q = filter.trim().toLowerCase();
      const list = menu.querySelector('.mdrop-list');
      list.innerHTML = '';
      Array.from(sel.options).forEach((opt, idx) => {
        if (q && !opt.textContent.toLowerCase().includes(q)) return;
        const item = document.createElement('button');
        item.type = 'button';
        const isSel = idx === sel.selectedIndex;
        item.className = 'mdrop-item' + (isSel ? ' active' : '');
        if (opt.value && opt.value.includes("'")) item.style.fontFamily = opt.value;
        item.innerHTML = `<span class="truncate">${opt.textContent}</span>${isSel ? '<span class="text-xs font-extrabold">✓</span>' : ''}`;
        item.addEventListener('click', () => {
          sel.selectedIndex = idx;
          sel.dispatchEvent(new Event('change', { bubbles: true }));
          syncLabel();
          closeActive();
        });
        list.appendChild(item);
      });
    }

    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const wasOpen = menu.classList.contains('open');
      closeActive();
      if (wasOpen) return;

      const hasMany = sel.options.length > 7;
      menu.innerHTML = (hasMany ? '<div class="mdrop-search"><input type="text" placeholder="🔍 शोधा..." /></div>' : '') + '<div class="mdrop-list"></div>';
      buildItems();

      const rect = btn.getBoundingClientRect();
      menu.style.width = Math.max(220, rect.width) + 'px';
      const spaceBelow = window.innerHeight - rect.bottom - 12;
      menu.style.left = Math.max(10, Math.min(window.innerWidth - Math.max(220, rect.width) - 10, rect.left)) + 'px';
      if (spaceBelow < 220 && rect.top > 240) {
        menu.style.top = 'auto';
        menu.style.bottom = (window.innerHeight - rect.top + 6) + 'px';
      } else {
        menu.style.bottom = 'auto';
        menu.style.top = (rect.bottom + 6) + 'px';
      }

      menu.classList.add('open');
      btn.classList.add('open');
      activeMenu = menu;
      activeBtn = btn;

      const sInp = menu.querySelector('.mdrop-search input');
      if (sInp) {
        sInp.addEventListener('input', () => buildItems(sInp.value));
        setTimeout(() => sInp.focus(), 30);
      }
    });

    // Keep label synced when JS sets sel.value programmatically
    const obs = new MutationObserver(syncLabel);
    obs.observe(sel, { childList: true });
    const origDesc = Object.getOwnPropertyDescriptor(HTMLSelectElement.prototype, 'value');
    Object.defineProperty(sel, 'value', {
      get() { return origDesc.get.call(this); },
      set(v) { origDesc.set.call(this, v); syncLabel(); }
    });
    syncLabel();
  };

  window.upgradeAllSelects = function(root = document) {
    root.querySelectorAll('select').forEach(window.upgradeSelectToModern);
  };

  document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => window.upgradeAllSelects(), 80);
    const mo = new MutationObserver((muts) => {
      muts.forEach(m => m.addedNodes.forEach(n => {
        if (n.nodeType === 1) {
          if (n.tagName === 'SELECT') window.upgradeSelectToModern(n);
          else if (n.querySelectorAll) window.upgradeAllSelects(n);
        }
      }));
    });
    mo.observe(document.body, { childList: true, subtree: true });
  });
})();

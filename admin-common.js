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

function populateFontSelect(id) {
  const sel = document.getElementById(id);
  if (!sel) return;
  sel.innerHTML = TOP_50_DEVANAGARI_FONTS
    .map(([v, l]) => `<option value="${v.replace(/"/g, '&quot;')}">${l}</option>`)
    .join('');
}

function showToast(msg) {
  const t = document.getElementById('toastBox');
  if (!t) return;
  t.textContent = msg;
  t.classList.remove('hidden');
  clearTimeout(window.__toastTimer);
  window.__toastTimer = setTimeout(() => t.classList.add('hidden'), 2400);
}

function compressImageFile(file, maxW = 900, quality = 0.78) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (ev) => {
      const img = new Image();
      img.onload = () => {
        const scale = Math.min(1, maxW / img.width);
        const canvas = document.createElement('canvas');
        canvas.width = Math.round(img.width * scale);
        canvas.height = Math.round(img.height * scale);
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

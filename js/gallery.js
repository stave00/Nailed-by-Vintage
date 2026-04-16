// ============= GALLERY 2.0 JS =============

const pills = document.querySelectorAll('.fpill');
const items = document.querySelectorAll('.gi');
const fsCount = document.getElementById('fsCount');

// Filtering
function filterGallery(cat) {
  let count = 0;
  items.forEach(item => {
    const match = cat === 'all' || item.dataset.cat === cat;
    item.classList.toggle('hidden', !match);
    if (match) count++;
  });
  if (fsCount) fsCount.textContent = count + ' works';
}

pills.forEach(pill => {
  pill.addEventListener('click', () => {
    pills.forEach(p => p.classList.remove('active'));
    pill.classList.add('active');
    filterGallery(pill.dataset.filter);
  });
});

// Lightbox
const backdrop = document.getElementById('lbBackdrop');
const lbImg    = document.getElementById('lbImg');
const lbTitle  = document.getElementById('lbTitle');
const lbDesc   = document.getElementById('lbDesc');
const lbTag    = document.getElementById('lbTag');
const lbNum    = document.getElementById('lbNum');
const lbClose  = document.getElementById('lbClose');
const lbPrev   = document.getElementById('lbPrev');
const lbNext   = document.getElementById('lbNext');

let currentIdx = 0;

function getVisible() {
  return [...items].filter(i => !i.classList.contains('hidden'));
}

function showLb(idx) {
  const visible = getVisible();
  if (!visible.length) return;
  currentIdx = (idx + visible.length) % visible.length;
  const item = visible[currentIdx];
  const img  = item.querySelector('img');

  // Fade out
  lbImg.style.opacity = '0';
  setTimeout(() => {
    lbImg.src = img ? img.src : '';
    lbImg.alt = img ? img.alt : '';
    lbImg.style.cssText = img ? img.style.cssText : '';
    lbImg.style.opacity = '1';
  }, 150);

  lbTitle.textContent = item.dataset.title || '';
  lbDesc.textContent  = item.dataset.desc  || '';
  lbTag.textContent   = (item.dataset.cat || '').replace(/\b\w/g, c => c.toUpperCase());
  lbNum.textContent   = `${currentIdx + 1} / ${visible.length}`;
}

function openLb(idx) {
  showLb(idx);
  backdrop.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeLb() {
  backdrop.classList.remove('open');
  document.body.style.overflow = '';
}

// Click items or zoom buttons
items.forEach((item, i) => {
  item.addEventListener('click', (e) => {
    const visible = getVisible();
    const vIdx = visible.indexOf(item);
    if (vIdx >= 0) openLb(vIdx);
  });
});

lbClose.addEventListener('click', closeLb);
backdrop.addEventListener('click', (e) => { if (e.target === backdrop) closeLb(); });

lbPrev.addEventListener('click', (e) => { e.stopPropagation(); showLb(currentIdx - 1); });
lbNext.addEventListener('click', (e) => { e.stopPropagation(); showLb(currentIdx + 1); });

document.addEventListener('keydown', (e) => {
  if (!backdrop.classList.contains('open')) return;
  if (e.key === 'Escape') closeLb();
  if (e.key === 'ArrowLeft') showLb(currentIdx - 1);
  if (e.key === 'ArrowRight') showLb(currentIdx + 1);
});

// Touch swipe in lightbox
let tsX = 0;
backdrop.addEventListener('touchstart', e => { tsX = e.touches[0].clientX; }, { passive: true });
backdrop.addEventListener('touchend', e => {
  const dx = e.changedTouches[0].clientX - tsX;
  if (Math.abs(dx) > 50) { dx < 0 ? showLb(currentIdx + 1) : showLb(currentIdx - 1); }
});

// Initial count
filterGallery('all');
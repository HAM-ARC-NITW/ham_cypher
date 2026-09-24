const NUM_RINGS = 5;
const TARGET_HASH = "582969a27a84f2b65970db6cb1907706e6518405ced1876352f6627d794b430e";
const STATIONS = [
  { label: "Question 1", url: "q1/q1.html" },
  { label: "Question 2", url: "https://idyllic-figolla-8799a8.netlify.app/" },
  { label: "Question 3", url: "cypher3/cypher_3.html" },
  { label: "Question 4", url: "https://mafia-cipher.netlify.app" },
  { label: "Question 5", url: "final/final.html" }
];

const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const LETTER_H = 46;
const LOOPS = 3;
const state = new Array(NUM_RINGS).fill(26);

let cipherStartTime = localStorage.getItem('cipher_start_time');
if (!cipherStartTime || isNaN(cipherStartTime)) {
    cipherStartTime = Date.now();
    localStorage.setItem('cipher_start_time', cipherStartTime);
} else {
    cipherStartTime = parseInt(cipherStartTime);
}

let isCipherSolved = localStorage.getItem('cipher_solved') === 'true';

function updateBackgroundTimer() {
    const timerEl = document.getElementById('persistent-timer');
    if (!timerEl) return;

    if (isCipherSolved) {
        // Keep final solved time displayed or static
        return;
    }

    const elapsed = Date.now() - cipherStartTime;
    const minutes = Math.floor(elapsed / 60000);
    const seconds = Math.floor((elapsed % 60000) / 1000);
    
    timerEl.textContent = `Time Elapsed: ${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    requestAnimationFrame(updateBackgroundTimer);
}

function renderStations(){
  const list = document.getElementById('stationsList');
  list.innerHTML = '';
  STATIONS.forEach(s => {
    const a = document.createElement('a');
    a.className = 'station-link';
    a.href = s.url;
    a.innerHTML = `<span>${s.label}</span><span class="chev">&rsaquo;</span>`;
    list.appendChild(a);
  });
}

function buildRings(){
  const container = document.getElementById('rings');
  container.innerHTML = '';
  container.style.display = 'flex';
  for (let i = 0; i < NUM_RINGS; i++){
    const ring = document.createElement('div');
    ring.className = 'ring';
    ring.tabIndex = 0;
    ring.dataset.i = i;

    const up = document.createElement('div');
    up.className = 'tri tri-up';
    up.addEventListener('click', () => step(i, -1));

    const win = document.createElement('div');
    win.className = 'letter-window';
    const reel = document.createElement('div');
    reel.className = 'reel';
    reel.id = 'reel-' + i;
    let letters = '';
    for (let l = 0; l < LOOPS; l++) letters += ALPHABET;
    reel.innerHTML = letters.split('').map(ch => `<span>${ch}</span>`).join('');
    reel.style.transform = `translateY(-${state[i] * LETTER_H}px)`;
    win.appendChild(reel);

    const down = document.createElement('div');
    down.className = 'tri tri-down';
    down.addEventListener('click', () => step(i, 1));

    ring.addEventListener('wheel', (e) => {
      e.preventDefault();
      step(i, e.deltaY > 0 ? 1 : -1);
    }, { passive:false });

    ring.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowDown'){ e.preventDefault(); step(i, 1); }
      if (e.key === 'ArrowUp'){ e.preventDefault(); step(i, -1); }
    });

    ring.appendChild(up);
    ring.appendChild(win);
    ring.appendChild(down);
    container.appendChild(ring);
  }
}

function step(i, dir){
  state[i] += dir;
  const reel = document.getElementById('reel-' + i);
  reel.style.transition = 'transform .28s cubic-bezier(.2,.7,.3,1)';
  reel.style.transform = `translateY(-${state[i] * LETTER_H}px)`;

  clearTimeout(reel._settleTimer);
  reel._settleTimer = setTimeout(() => {
    const mid = ALPHABET.length; 
    if (state[i] < ALPHABET.length || state[i] > ALPHABET.length * (LOOPS - 1)){
      const letterIndex = ((state[i] % ALPHABET.length) + ALPHABET.length) % ALPHABET.length;
      state[i] = mid + letterIndex;
      reel.style.transition = 'none';
      reel.style.transform = `translateY(-${state[i] * LETTER_H}px)`;
      void reel.offsetWidth;
    }
  }, 300);
}

function currentWord(){
  return state.map(v => ALPHABET[((v % ALPHABET.length) + ALPHABET.length) % ALPHABET.length]).join('');
}

async function sha256(text){
  const enc = new TextEncoder().encode(text);
  const digest = await crypto.subtle.digest('SHA-256', enc);
  return Array.from(new Uint8Array(digest)).map(b => b.toString(16).padStart(2, '0')).join('');
}

async function attemptOpen(){
  const hash = await sha256(currentWord());
  const indicator = document.getElementById('indicator');
  const resist = document.getElementById('resist');
  const row = document.querySelector('.cryptex-row');

  if (hash === TARGET_HASH){
    isCipherSolved = true;
    localStorage.setItem('cipher_solved', 'true');

    indicator.classList.add('open');
    resist.classList.remove('show');
    document.querySelectorAll('.ring').forEach((r, idx) => {
      r.style.transform = `translateY(${idx % 2 === 0 ? '-' : ''}14px)`;
      r.style.opacity = '0.55';
    });
    document.getElementById('reveal').classList.add('open');
  } else {
    row.classList.remove('shaking');
    void row.offsetWidth;
    row.classList.add('shaking');
    resist.classList.add('show');
    setTimeout(() => resist.classList.remove('show'), 1800);
  }
}

buildRings();
renderStations();
updateBackgroundTimer();
document.getElementById('pullBtn').addEventListener('click', attemptOpen);
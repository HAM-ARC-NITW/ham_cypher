
const ANSWER_HASH = "559aead08264d5795d3909718cdd05abd49572e84fe55590eef31a88a08fdffd"; // hash of "A"

const HINTS = [
  { at: 0,  text: "A photograph carries more than what's on screen -- quiet details about how and when it was made travel inside the file itself (metadata)." },
  { at: 30, text: "There are free tools online built just for reading what's hidden inside a file (metadata) like this. Search for one of those sites" },
  { at: 60, text: "try exifdata.com or jimpl.com or metadata2go.com" },  
  { at: 90, text: "look for the author and copyright field" },  
  { at: 120, text: "one of the letters of the acronym this building is popularly referred to as" }
];

let startTime = null;
let timerInterval = null;

async function sha256(text){
  const enc = new TextEncoder().encode(text);
  const digest = await crypto.subtle.digest('SHA-256', enc);
  return Array.from(new Uint8Array(digest)).map(b => b.toString(16).padStart(2, '0')).join('');
}

function openFile(){
  document.getElementById('cover').style.display = 'none';
  document.getElementById('file').classList.add('open');
  buildHintList();
  startTime = Date.now();
  timerInterval = setInterval(tick, 1000);
  tick();
}

function buildHintList(){
  const list = document.getElementById('hintList');
  list.innerHTML = '';
  HINTS.forEach((h, i) => {
    const row = document.createElement('div');
    row.className = 'hint';
    row.id = 'hint-' + i;
    row.innerHTML = '<span class="mark">--</span><span class="txt">Nothing yet. Keep looking.</span>';
    list.appendChild(row);
  });
}

function fmt(sec){
  const m = Math.floor(sec / 60).toString().padStart(2, '0');
  const s = (sec % 60).toString().padStart(2, '0');
  return m + ':' + s;
}

function tick(){
  const elapsed = Math.floor((Date.now() - startTime) / 1000);
  document.getElementById('clockTag').textContent = fmt(elapsed);

  HINTS.forEach((h, i) => {
    const row = document.getElementById('hint-' + i);
    if (!row) return;
    if (elapsed >= h.at && !row.classList.contains('unlocked')){
      row.classList.add('unlocked');
      row.innerHTML = '<span class="mark">' + (i + 1) + '</span><span class="txt">' + h.text + '</span>';
    }
  });
}

async function checkAnswer(){
  const val = document.getElementById('letterInput').value.trim().toUpperCase();
  const fb = document.getElementById('feedback');
  fb.className = '';
  if (!val) return;
  const hash = await sha256(val);
  if (hash === ANSWER_HASH){
    fb.textContent = 'Confirmed. This is the final letter you need for your cypher.';
    fb.className = 'ok';
  } else {
    fb.textContent = 'Not it. Check the location again.';
    fb.className = 'bad';
  }
}

document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('cover').addEventListener('click', openFile);
  document.getElementById('submitBtn').addEventListener('click', checkAnswer);
  document.getElementById('letterInput').addEventListener('keydown', (e) => {
    if (e.key === 'Enter') checkAnswer();
  });
});

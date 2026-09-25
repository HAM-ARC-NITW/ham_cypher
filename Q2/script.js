// ============================================================
//  GAME DATA
// ============================================================

const EVIDENCE = [
    {
        number:  "EVIDENCE 01",
        title:   "The Don's Note",
        body:    `"The Don never trusted short messages.\n\nAnything worth saying took at least eight marks of ink."`,
        hint:    "Password must be at least 8 characters long."
    },
    {
        number:  "EVIDENCE 02",
        title:   "The Boss's Letterhead",
        body:    `"Every order that leaves this office carries the Boss's name.\n\nA message without it means nothing."\n\n\u2014 DON`,
        hint:    'Password must contain "DON" (not case-sensitive: don, Don, or DON).'
    },
    {
        number:  "EVIDENCE 03",
        title:   "The Accountant's Ledger",
        body:    `"The books were balanced before midnight.\n\nThe numbers on this page always came back to the same figure."\n\n    1    9\n\n  BALANCE: 10`,
        hint:    "The digits in your password must add up to exactly 10."
    },
    {
        number:  "EVIDENCE 04",
        title:   "The Red Seal",
        body:    `"One seal opens the door.\n\nA second seal tells the guards something is wrong."\n\n    \u2709  @`,
        hint:    'Password must contain exactly one "@" symbol.'
    },
    {
        number:  "EVIDENCE 05",
        title:   "The Typewritten Message",
        body:    `THE BOSS\n\n"He signs his orders loudly.\nHis men answer quietly."\n\n  BOSS\n  family`,
        hint:    "Password must contain both uppercase and lowercase letters."
    },
    {
        number:  "EVIDENCE 06",
        title:   "The Don's Ring",
        body:    `"Every man in the family knows the mark.\n\nWithout it, the door stays closed."\n\n  \u25ce  O  \u25ce`,
        hint:    'Password must contain the letter "O". The forbidden name must never appear.'
    }
];

// Each rule has:
//   validate  — boolean check
//   msgs[0]   — 1st failure (atmospheric, minimal)
//   msgs[1]   — 2nd failure (narrative, longer cryptic clue)
//   msgs[2]   — 3rd+ failure (direct explicit hint)
const RULES = [
    {
        validate: p => p.length >= 8,
        msgs: [
            `ACCESS DENIED\n\nThe terminal rejects your entry.\n\nExamine the Don's note more carefully.`,
            `ACCESS DENIED\n\n"The Don never trusted short messages.\nAnything worth saying took at least eight marks of ink."\n\nCount what you have written.`,
            `ACCESS DENIED\n\nHINT: Your password must be at least 8 characters long.`
        ]
    },
    {
        validate: p => /don/i.test(p),
        msgs: [
            `ACCESS DENIED\n\nThe terminal does not recognise the authority behind this message.`,
            `ACCESS DENIED\n\n"Every order that leaves this office carries the Boss's name.\nA message without it means nothing."\n\n— DON\n\nThe Boss's name must be included in your password.`,
            `ACCESS DENIED\n\nHINT: Your password must contain the word "DON" (not case-sensitive: don, Don, or DON).`
        ]
    },
    {
        validate: p => {
            const digits = p.match(/\d/g);
            if (!digits) return false;
            return digits.reduce((sum, d) => sum + parseInt(d), 0) === 10;
        },
        msgs: [
            `ACCESS DENIED\n\nThe Accountant's record does not balance.\n\nReview the ledger.`,
            `ACCESS DENIED\n\n"The books were balanced before midnight.\nThe numbers on this page always came back to the same figure."\n\n    1    9\n\n  BALANCE: 10\n\nYour digits are telling a different story.`,
            `ACCESS DENIED\n\nHINT: All the digits in your password must add up to exactly 10.\n(e.g. 1 and 9, or 5 and 5, etc.)`
        ]
    },
    {
        validate: p => (p.match(/@/g) || []).length === 1,
        msgs: [
            `ACCESS DENIED\n\nThe seal is not in order.\n\nConsult the Red Seal evidence.`,
            `ACCESS DENIED\n\n"One seal opens the door.\nA second seal tells the guards something is wrong."\n\n    \u2709  @\n\nEither the seal is absent — or there are too many.`,
            `ACCESS DENIED\n\nHINT: Your password must contain exactly one "@" character. Not zero. Not two.`
        ]
    },
    {
        validate: p => /[a-z]/.test(p) && /[A-Z]/.test(p),
        msgs: [
            `ACCESS DENIED\n\nThe terminal detects an imbalance in the message.`,
            `ACCESS DENIED\n\nTHE BOSS\n\n"He signs his orders loudly.\nHis men answer quietly."\n\n  BOSS\n  family\n\nYour message speaks in only one voice.`,
            `ACCESS DENIED\n\nHINT: Your password must contain at least one UPPERCASE letter and at least one lowercase letter.`
        ]
    },
    {
        validate: p => !p.toUpperCase().includes("MAFIA"),
        msgs: [
            `ACCESS DENIED\n\nThe terminal flags a forbidden word.\n\nThe family has rules about what may be written.`,
            `ACCESS DENIED\n\n"There is one word the family never writes down.\nToo many eyes have been searching for it."\n\n  M A F I A\n\n  \u2612 FORBIDDEN\n\nRemove what must not be named.`,
            `ACCESS DENIED\n\nHINT: Your password must NOT contain the word "MAFIA" in any form.`
        ]
    },
    {
        validate: p => p.includes("O"),
        msgs: [
            `ACCESS DENIED\n\nThe final mark is absent.\n\nEvery man in the family knows what is missing.`,
            `ACCESS DENIED\n\n"Every man in the family knows the mark.\nWithout it, the door stays closed."\n\n  \u25ce  O  \u25ce\n\nThe Don's ring has a meaning. Find it.`,
            `ACCESS DENIED\n\nHINT: Your password must contain the letter "O".`
        ]
    }
];

// ============================================================
//  STATE
// ============================================================
let currentLevel    = 0;
let failureCounts   = new Array(RULES.length).fill(0);
let caseTime        = 0;   // counts UP in seconds
let timerInterval   = null;
let finalElapsed    = '';  // stores formatted time for the final screen

// ============================================================
//  AUDIO
// ============================================================
let audioCtx = null;

function ensureAudio() {
    if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    if (audioCtx.state === 'suspended') audioCtx.resume();
}

function beep(freq = 440, type = 'sine', dur = 0.08, vol = 0.08) {
    if (!audioCtx) return;
    try {
        const osc  = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.type = type;
        osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
        gain.gain.setValueAtTime(vol, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + dur);
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.start();
        osc.stop(audioCtx.currentTime + dur);
    } catch(e) {}
}

// ============================================================
//  TYPEWRITER
// ============================================================
function typewriter(el, text, speed = 28, done) {
    el.textContent = '';
    let i = 0;
    const iv = setInterval(() => {
        el.textContent += text[i];
        if (text[i] !== ' ' && text[i] !== '\n' && i % 4 === 0) beep(700, 'square', 0.03, 0.015);
        i++;
        if (i >= text.length) {
            clearInterval(iv);
            if (done) done();
        }
    }, speed);
    return iv;
}

// ============================================================
//  SCREENS
// ============================================================
function showScreen(id) {
    document.querySelectorAll('.screen').forEach(s => {
        s.classList.remove('active');
        s.style.display = 'none';
    });
    const el = document.getElementById(id);
    el.style.display = 'flex';
    el.classList.add('active');
}

// ============================================================
//  TIMER  (counts up)
// ============================================================
function startTimer() {
    caseTime = 0;
    updateTimer();
    timerInterval = setInterval(() => {
        caseTime++;
        updateTimer();
    }, 1000);
}

function updateTimer() {
    const h = Math.floor(caseTime / 3600);
    const m = Math.floor((caseTime % 3600) / 60);
    const s = caseTime % 60;
    const display = h > 0
        ? `${String(h).padStart(2,'0')}:${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}`
        : `${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}`;
    document.getElementById('timer').textContent = display;
    return display;
}

// ============================================================
//  EVIDENCE CARDS
// ============================================================
function renderEvidence(index, isNew = false) {
    const e    = EVIDENCE[index];
    const card = document.createElement('div');
    card.className   = 'evidence-card' + (isNew ? ' new-card' : '');
    card.id          = `ev-card-${index}`;
    card.innerHTML   = `
        <div class="ev-number">${e.number}</div>
        <div class="ev-title">${e.title}</div>
        <div class="ev-body">${e.body}</div>
    `;
    document.getElementById('evidence-stack').appendChild(card);
    card.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

function markEvidenceSolved(index) {
    const card = document.getElementById(`ev-card-${index}`);
    if (card && !card.querySelector('.ev-solved')) {
        const badge = document.createElement('div');
        badge.className   = 'ev-solved';
        badge.textContent = '✓ CLUE DECIPHERED';
        card.appendChild(badge);
    }
}

// ============================================================
//  GAME LOGIC
// ============================================================
function attemptDecrypt() {
    ensureAudio();
    const pwd = document.getElementById('password-input').value;

    // On the last evidence card, check ALL rules so none are skipped.
    // Otherwise check rules 0..currentLevel only.
    const maxRule = (currentLevel >= EVIDENCE.length - 1) ? RULES.length - 1 : currentLevel;

    for (let i = 0; i <= maxRule; i++) {
        if (!RULES[i].validate(pwd)) {
            failureCounts[i]++;
            const msgIndex = Math.min(failureCounts[i] - 1, RULES[i].msgs.length - 1);
            showDenied(RULES[i].msgs[msgIndex], failureCounts[i]);
            return;
        }
    }

    // All checked rules pass
    if (currentLevel < EVIDENCE.length - 1) {
        // Unlock next evidence card
        markEvidenceSolved(currentLevel);
        currentLevel++;
        document.getElementById('level-num').textContent = String(currentLevel + 1).padStart(2, '0');
        renderEvidence(currentLevel, true);
        showClueUnlocked(EVIDENCE[currentLevel]);
    } else {
        // All evidence shown and all rules satisfied — victory!
        markEvidenceSolved(currentLevel);
        triggerFinalSequence();
    }
}

function showDenied(msg, failCount) {
    beep(120, 'sawtooth', 0.35, 0.18);
    setTimeout(() => beep(100, 'sawtooth', 0.45, 0.18), 180);

    const box     = document.getElementById('terminal-response');
    const msgEl   = document.getElementById('response-msg');
    const hintBadge = document.getElementById('response-hint-badge');

    msgEl.textContent = msg;

    // Show the "2nd attempt" badge to cue the player that a hint is coming / arrived
    if (failCount === 2) {
        hintBadge.textContent = '⚠ SECOND ATTEMPT — CRYPTIC CLUE REVEALED';
        hintBadge.className   = 'hint-badge hint-warn';
        hintBadge.style.display = 'block';
    } else if (failCount >= 3) {
        hintBadge.textContent = '⚠ THIRD ATTEMPT — DIRECT HINT UNLOCKED';
        hintBadge.className   = 'hint-badge hint-alert';
        hintBadge.style.display = 'block';
    } else {
        hintBadge.style.display = 'none';
    }

    box.classList.remove('hidden');
}

function showClueUnlocked(ev) {
    beep(600, 'sine', 0.12, 0.1);
    setTimeout(() => beep(750, 'sine', 0.18, 0.1), 150);

    const box = document.getElementById('clue-unlocked');
    document.getElementById('clue-msg').textContent =
        `New security layer activated:\n\n${ev.hint}\n\nThe evidence card has been added to the case file.`;
    box.classList.remove('hidden');
}

// ============================================================
//  FINAL SEQUENCE
// ============================================================
function triggerFinalSequence() {
    clearInterval(timerInterval);
    // Capture and format the elapsed time before switching screens
    const h = Math.floor(caseTime / 3600);
    const m = Math.floor((caseTime % 3600) / 60);
    const s = caseTime % 60;
    finalElapsed = h > 0
        ? `${String(h).padStart(2,'0')}h ${String(m).padStart(2,'0')}m ${String(s).padStart(2,'0')}s`
        : `${String(m).padStart(2,'0')}m ${String(s).padStart(2,'0')}s`;
    showScreen('screen-final');
    runStep1();
}

function runStep1() {
    const fill  = document.getElementById('progress-fill');
    const pct   = document.getElementById('progress-pct');
    const grant = document.getElementById('access-granted-text');
    let p = 0;

    const iv = setInterval(() => {
        p = Math.min(p + 1.4, 100);
        fill.style.width = p + '%';
        pct.textContent  = Math.round(p) + '%';
        beep(200 + p * 3, 'square', 0.04, 0.015);

        if (p >= 100) {
            clearInterval(iv);
            setTimeout(() => {
                grant.classList.remove('hidden');
                beep(880, 'sine', 0.5, 0.15);
                setTimeout(runStep2, 2200);
            }, 500);
        }
    }, 40);
}

function runStep2() {
    document.getElementById('final-step-1').classList.add('hidden');
    document.getElementById('final-step-2').classList.remove('hidden');

    const lines = [
        "If you're reading this...",
        "Then you solved the code.",
        "But the password was never meant to open the terminal.",
        "It was meant to identify the traitor."
    ];

    const container = document.getElementById('audio-lines');
    let i = 0;

    function nextLine() {
        if (i >= lines.length) { setTimeout(runStep3, 1800); return; }
        const p = document.createElement('p');
        container.appendChild(p);
        typewriter(p, `"${lines[i]}"`, 38, () => {
            i++;
            setTimeout(nextLine, 900);
        });
    }
    nextLine();
}

function runStep3() {
    document.getElementById('final-step-2').classList.add('hidden');
    document.getElementById('final-step-3').classList.remove('hidden');

    const fill = document.getElementById('decrypt-fill');
    const pct  = document.getElementById('decrypt-pct');
    let p = 0;

    const iv = setInterval(() => {
        p = Math.min(p + 2, 100);
        fill.style.width = p + '%';
        pct.textContent  = p + '%';
        beep(250 + p * 4, 'sawtooth', 0.03, 0.01);

        if (p >= 100) {
            clearInterval(iv);
            setTimeout(runStep4, 1000);
        }
    }, 50);
}

function runStep4() {
    document.getElementById('final-step-3').classList.add('hidden');
    const step4 = document.getElementById('final-step-4');
    step4.classList.remove('hidden');

    // Inject the recorded elapsed time
    document.getElementById('time-result-value').textContent = finalElapsed || '00m 00s';

    // Hide sub-elements initially, reveal them one by one
    const ring      = step4.querySelector('.reveal-ring');
    const narrative = step4.querySelector('.reveal-narrative');
    const hintCard  = step4.querySelector('.hint-carry');
    const timeCard  = step4.querySelector('.time-result');
    const btn       = step4.querySelector('.btn-primary');

    ring.style.opacity      = '0';
    narrative.style.opacity = '0';
    hintCard.style.opacity  = '0';
    timeCard.style.opacity  = '0';
    btn.style.opacity       = '0';

    beep(180, 'triangle', 1.5, 0.15);

    // Reveal ring with the O
    setTimeout(() => {
        ring.style.transition = 'opacity 1.2s ease';
        ring.style.opacity    = '1';
        beep(440, 'sine', 0.6, 0.12);
        setTimeout(() => beep(550, 'sine', 0.8, 0.12), 300);
    }, 600);

    // Narrative text
    setTimeout(() => {
        narrative.style.transition = 'opacity 1s ease';
        narrative.style.opacity    = '1';
    }, 2000);

    // Hint card
    setTimeout(() => {
        hintCard.style.transition = 'opacity 1s ease';
        hintCard.style.opacity    = '1';
        beep(660, 'sine', 0.4, 0.15);
        setTimeout(() => beep(770, 'sine', 0.6, 0.12), 250);
        setTimeout(() => beep(880, 'sine', 0.8, 0.10), 500);
    }, 3400);

    // Time result card
    setTimeout(() => {
        timeCard.style.transition = 'opacity 0.8s ease';
        timeCard.style.opacity    = '1';
    }, 4400);

    // Button
    setTimeout(() => {
        btn.style.transition = 'opacity 0.8s ease';
        btn.style.opacity    = '1';
    }, 5000);
}

// ============================================================
//  INIT
// ============================================================
document.addEventListener('DOMContentLoaded', () => {

    document.getElementById('begin-btn').addEventListener('click', () => {
        ensureAudio();
        showScreen('screen-game');
        renderEvidence(0);
        startTimer();
        document.getElementById('password-input').focus();
    });

    document.getElementById('decrypt-btn').addEventListener('click', attemptDecrypt);
    document.getElementById('password-input').addEventListener('keydown', e => {
        if (e.key === 'Enter') attemptDecrypt();
    });

    document.getElementById('return-btn').addEventListener('click', () => {
        document.getElementById('terminal-response').classList.add('hidden');
        document.getElementById('password-input').focus();
    });

    document.getElementById('clue-continue-btn').addEventListener('click', () => {
        document.getElementById('clue-unlocked').classList.add('hidden');
        // Keep the existing password so the player can build on it
        document.getElementById('password-input').focus();
        // Move cursor to end of existing text
        const inp = document.getElementById('password-input');
        inp.selectionStart = inp.selectionEnd = inp.value.length;
    });

    document.body.addEventListener('click', ensureAudio, { once: true });
});

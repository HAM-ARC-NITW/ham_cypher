const chatDatabase = {
    F: {
        code: "1100110",
        messages: [
            { sender: "Time", text: "4:00 PM" },
            { sender: "Boss", text: "Are you ready to go to the docks now? Have you brought all your men?" },
            { sender: "Soldier", text: "Yes capo, all ready for tonight, capisce?" },
            { sender: "Boss", text: "Good. Have you located the \"Gift\" brought to be given to the godfather?" },
            { sender: "Soldier", text: "Yes capo, it is done. Tony is out there guarding it with his life till our arrival. Do we make noise?" },
            { sender: "Boss", text: "NO, no noise will be made; all will be handled quietly." },
            { sender: "Soldier", text: "Is the dock worker our man for tonight?" },
            { sender: "Boss", text: "No; our man was caught in the raid last week, manage something." },
            { sender: "Soldier", text: "Va bene, ok boss." },
            { sender: "Time", text: "5:00 PM (One hour later)" },
            { sender: "Boss", text: "Is the cash ready?" },
            { sender: "Soldier", text: "Yes capo; all ready, clean and counted." },
            { sender: "Boss", text: "All in used 50s right?" },
            { sender: "Soldier", text: "Yes boss. Listen, is Luca gonna come for the pickup?" },
            { sender: "Boss", text: "No, Luca is busy picking up our shipment for New York. Matteo will be coming instead." },
            { sender: "Soldier", text: "Ok boss; we will be there at the meetup point at 3 AM sharp." }
        ]
    },
    M: {
        code: "01101101",
        messages: [
            { sender: "Boss", text: "We're moving to the second phase. Listen close, because I only want to say this once. Is the warehouse cleared out yet?" },
            { sender: "Soldier", text: "No. The dockers left a few crates behind the loading bay, boss." },
            { sender: "Boss", text: "Damn slackers. Whatever, leave 'em. Are the overhead lights killed inside?" },
            { sender: "Soldier", text: "Yes. Pitch black in here, just how we like it." },
            { sender: "Boss", text: "Good. Did the accountant drop the ledger where I told him to?" },
            { sender: "Soldier", text: "Yes. It's sitting right on the main desk under the coffee mug." },
            { sender: "Boss", text: "Perfect. Is the back alley locked tight so nobody wanders in?" },
            { sender: "Soldier", text: "No. The latch is busted rusted shut, but I'm wedging a crate against it right now." },
            { sender: "Boss", text: "Make sure it holds. Did you bring the master keys for the inner office?" },
            { sender: "Soldier", text: "Yes. Got 'em right here on my heavy ring." },
            { sender: "Boss", text: "Anyone else waiting inside with you, or are you flying solo?" },
            { sender: "Soldier", text: "Yes. Frankie's pacing by the north stairwell, sweating through his jacket." },
            { sender: "Boss", text: "Tell him to calm his nerves. Did you park your ride in the blind spot of the security camera?" },
            { sender: "Soldier", text: "No. I had to leave it half a block down under a streetlight because of road work." },
            { sender: "Boss", text: "Risk-taker... watch yourself. Are you ready to crack the safe now?" },
            { sender: "Soldier", text: "Yes. Tools are out, dials are set." },
            { sender: "Boss", text: "Make it clean. Don't leave a single trace." },
            { sender: "Soldier", text: "Going dark." }
        ]
    },
    T: {
        code: "01110100",
        messages: [
            { sender: "Boss", text: "Pick up. We're running out of daylight. Is the informant talking yet, or is he still playing games?" },
            { sender: "Soldier", text: "No. Guy's got a jaw like an anvil, boss. Not a peep since we hauled him in." },
            { sender: "Boss", text: "Keep the pressure on him, but don't break anything permanent until I get eyes on him. Are the boys stationed at the bridge approach like I ordered?" },
            { sender: "Soldier", text: "Yes. Paulie and the crew are dug in behind the concrete barriers." },
            { sender: "Boss", text: "Good. Did the main contraband shipment clear customs at the harbor?" },
            { sender: "Soldier", text: "Yes. Pulled right through Gate 4 without a single secondary inspection." },
            { sender: "Boss", text: "Beautiful. Is the harbor inspector still securely on our payroll?" },
            { sender: "Soldier", text: "Yes. Handed him the envelope myself about twenty minutes ago." },
            { sender: "Boss", text: "Excellent. Did anyone spot the drop-off or trail your vehicle?" },
            { sender: "Soldier", text: "No. Streets were completely dead except for a stray dog." },
            { sender: "Boss", text: "That's how I like it. Are you holding the master encrypted radio?" },
            { sender: "Soldier", text: "Yes. Channel 3 is locked in, crystal clear." },
            { sender: "Boss", text: "Is the frequency scrambled on your end?" },
            { sender: "Soldier", text: "No. Wait—let me flip the toggle switch... okay, scrambled now." },
            { sender: "Boss", text: "Pay attention! Do you need any immediate backup sent your way?" },
            { sender: "Soldier", text: "No. We've got total control of the sector, boss. No sweat." },
            { sender: "Boss", text: "Stay sharp out there. One mistake and we're all swimming with the fishes." },
            { sender: "Soldier", text: "Holding position." }
        ]
    },
    X: {
        code: "01111000",
        messages: [
            { sender: "Boss", text: "Talk to me. Is the perimeter compromised yet?" },
            { sender: "Soldier", text: "No. Not a soul has crossed the fence line, boss. Total ghost town out here." },
            { sender: "Boss", text: "Perfect. Keep it that way. Are the snipers locked into position on the rooftop?" },
            { sender: "Soldier", text: "Yes. Crosshairs are right on target, overlooking the main loading doors." },
            { sender: "Boss", text: "Good. Did the target finally walk right into the trap?" },
            { sender: "Soldier", text: "Yes. Just stepped out of his black town car, walking right toward the central warehouse." },
            { sender: "Boss", text: "Excellent. Is his escape route blocked off by the second team?" },
            { sender: "Soldier", text: "Yes. Vinnie and the boys parked the semi right across the exit lane. Nowhere for him to run." },
            { sender: "Boss", text: "Beautiful. Can we take him alive for questioning?" },
            { sender: "Soldier", text: "Yes. Orders are to bag him, not drop him. We'll grab him the second he crosses the threshold." },
            { sender: "Boss", text: "Did he manage to call for reinforcements on his way in?" },
            { sender: "Soldier", text: "No. Jammer's blocking all cellular traffic in a three-block radius. He's completely isolated." },
            { sender: "Boss", text: "Is your personal comms channel secure from feedback?" },
            { sender: "Soldier", text: "No. Getting a bit of static from the power lines overhead, but I can still hear you fine." },
            { sender: "Boss", text: "Fix your headset! Do we wait for my explicit signal before you close the trap?" },
            { sender: "Soldier", text: "No. Wait—did you say yes or no? Ah, screw it, we're moving in now while he's distracted!" },
            { sender: "Boss", text: "Wait, you idiot—! Hit him hard, make it fast, and don't let him breathe!" },
            { sender: "Soldier", text: "Engaging target now!" }
        ]
    },
    U: {
        code: "01110101",
        messages: [
            { sender: "Boss", text: "Pick up! Report to me immediately. Is the primary safehouse completely secure?" },
            { sender: "Soldier", text: "No. Smoke is clearing from the back room, boss, it's a bit of a mess." },
            { sender: "Boss", text: "Never mind the mess, just pack what matters. Are the windows boarded up properly?" },
            { sender: "Soldier", text: "Yes. Thick oak planks are nailed down tight. Nobody's peeking in or seeing out." },
            { sender: "Boss", text: "Good. Did the courier finally arrive with the suitcase of cash?" },
            { sender: "Soldier", text: "Yes. He slipped through the side alley just in the nick of time with the heavy bag." },
            { sender: "Boss", text: "Fantastic. Is the front gate chained and padlocked?" },
            { sender: "Soldier", text: "Yes. Heavy steel chain wrapped twice through the bars." },
            { sender: "Boss", text: "Are any cops lingering outside on the street?" },
            { sender: "Soldier", text: "No. Coast is totally clear, just patrol cars zooming down the main avenue three blocks over." },
            { sender: "Boss", text: "Excellent. Did you remember to burn all the physical documents in the fireplace?" },
            { sender: "Soldier", text: "Yes. Nothing left of the ledgers except a pile of black ash." },
            { sender: "Boss", text: "Perfect. Is the getaway van waiting right out front for you?" },
            { sender: "Soldier", text: "No. We had to ditch the van two blocks down because of a flat, but we're hoofing it to the secondary ride." },
            { sender: "Boss", text: "Watch your step, then. Ready to ghost?" },
            { sender: "Soldier", text: "Yes. We're fading into the shadows right now, boss." },
            { sender: "Boss", text: "Disappear. And don't ever use this frequency again." },
            { sender: "Soldier", text: "Signal terminating. Going off the grid." }
        ]
    },
    B: {
        code: "01100010",
        messages: [
            { sender: "Boss", text: "Let's run through the checklist for the backup plan. Is the second car fueled up?" },
            { sender: "Soldier", text: "No. The gas gauge is sitting right on empty, boss. I totally forgot to top it off last night." },
            { sender: "Boss", text: "What do you mean, no? Get it filled right now before we're stranded. Are the fake plates attached to it?" },
            { sender: "Soldier", text: "Yes. Slapped them on five minutes ago, looks completely legit from a distance." },
            { sender: "Boss", text: "Good. Did you stash the extra duffel bags in the trunk?" },
            { sender: "Soldier", text: "Yes. Packed them tight with the hardware and the extra cash, ready to roll." },
            { sender: "Boss", text: "Is the route through the south tunnel clear of patrol units?" },
            { sender: "Soldier", text: "No. Squad car just parked right near the entrance, flashing its lights. We can't go that way." },
            { sender: "Boss", text: "Damn it. Is the alternate bridge open instead?" },
            { sender: "Soldier", text: "No. Road crew has it blocked off with cones for emergency paving until dawn." },
            { sender: "Boss", text: "Unbelievable. Are you carrying the burner phone with the new encrypted frequencies?" },
            { sender: "Soldier", text: "Yes. Channel 9 is locked in and humming right here in my breast pocket." },
            { sender: "Soldier", text: "Yes. Hand on the ignition, waiting on your final green light." },
            { sender: "Boss", text: "Move fast. Do not draw any attention to yourself." },
            { sender: "Soldier", text: "Got it. Wiping the wheel and heading out." }
        ]
    }
};

let activeChatKey = localStorage.getItem('mafia_active_chat');
let startTime = localStorage.getItem('mafia_start_time');
let isCompleted = localStorage.getItem('mafia_completed') === 'true';

// Initialize or restore active chat
if (!activeChatKey || !chatDatabase[activeChatKey]) {
    const keys = Object.keys(chatDatabase);
    activeChatKey = keys[Math.floor(Math.random() * keys.length)];
    localStorage.setItem('mafia_active_chat', activeChatKey);
}

const activeChat = chatDatabase[activeChatKey];

// Initialize or restore stopwatch start time
if (!startTime || isNaN(startTime)) {
    startTime = Date.now();
    localStorage.setItem('mafia_start_time', startTime);
} else {
    startTime = parseInt(startTime);
}

function renderChat() {
    const container = document.getElementById('chat-container');
    container.innerHTML = '';
    
    activeChat.messages.forEach(msg => {
        const bubble = document.createElement('div');
        
        if (msg.sender === 'Time') {
            bubble.className = 'system-bubble';
            bubble.textContent = `[ ${msg.text} ]`;
        } else if (msg.sender === 'Boss') {
            bubble.className = 'chat-bubble boss-bubble p-3 font-semibold text-gray-200';
            bubble.innerHTML = `<span class="text-[#d4af37] text-xs font-bold uppercase block mb-1">Capo</span>${msg.text}`;
        } else {
            bubble.className = 'chat-bubble soldier-bubble p-3 text-gray-300';
            bubble.innerHTML = `<span class="text-[#8a0303] text-xs font-bold uppercase block mb-1 text-right">Associate</span>${msg.text}`;
        }
        
        container.appendChild(bubble);
    });
    
    container.scrollTop = 0;
}

function updateTimer() {
    if (isCompleted) return;

    let elapsed = Date.now() - startTime;

    let minutes = Math.floor(elapsed / 60000);
    let seconds = Math.floor((elapsed % 60000) / 1000);
    
    document.getElementById('timer').textContent = 
        `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

    // Handle Hint Unlocks based on elapsed time
    if (elapsed >= 1 * 60 * 1000) unlockHint('hint-1');
    if (elapsed >= 2 * 60 * 1000) unlockHint('hint-2');
    if (elapsed >= 3 * 60 * 1000) unlockHint('hint-3');

    requestAnimationFrame(updateTimer);
}

function unlockHint(hintId) {
    const el = document.getElementById(hintId);
    if (el && el.classList.contains('hint-locked')) {
        el.classList.remove('hint-locked');
        el.classList.add('hint-unlocked');
    }
}

function verifyInput() {
    const inputVal = document.getElementById('binary-input').value.trim();
    const errorMsg = document.getElementById('error-msg');
    
    if (inputVal === activeChat.code) {
        // Success!
        isCompleted = true;
        localStorage.setItem('mafia_completed', 'true');
        
        let finalElapsed = Date.now() - startTime;
        let minutes = Math.floor(finalElapsed / 60000);
        let seconds = Math.floor((finalElapsed % 60000) / 1000);
        let formattedTime = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        
        showSuccessScreen(formattedTime);
    } else {
        errorMsg.classList.remove('hidden');
        setTimeout(() => errorMsg.classList.add('hidden'), 3000);
    }
}

function showSuccessScreen(timeString) {
    document.getElementById('input-section').style.display = 'none';
    document.getElementById('timer').classList.remove('glitch-text');
    document.getElementById('timer').style.color = '#333';
    document.getElementById('timer').textContent = timeString;
    
    const successSection = document.getElementById('success-section');
    successSection.classList.remove('hidden');
    document.getElementById('final-time').textContent = timeString;
}

// Event Listeners
document.getElementById('submit-btn').addEventListener('click', verifyInput);
document.getElementById('binary-input').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') verifyInput();
});

// Init
renderChat();
if (isCompleted) {
    showSuccessScreen("02:15"); 
    unlockHint('hint-1'); unlockHint('hint-2'); unlockHint('hint-3');
} else {
    updateTimer();
}
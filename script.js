const terminal = document.getElementById("terminal");
const button = document.getElementById("initButton");
const manualInput = document.getElementById("manualOverride");
const depthBar = document.getElementById("depthBar");

let clickCount = 0;
let depth = 0;
let usedUserNumbers = new Set();

// Responses for INITIATE button
const responses = [
  "Initializing...",
  "Still initializing...",
  "Please hold...",
  "Fetching metadata...",
  "Metadata not found.",
  "Retrying...",
  "NullPointerException: user identity",
  "Are you really still here?",
  "Achievement Unlocked: Persistent Null",
  "Okay now you're just wasting your time.",
  "You’ve been promoted to: Null Supervisor",
  "Welcome to the Void.",
  "Good luck escaping.",
  "Auto-renewed for 1000 years.",
  "Session locked. Enjoy."
];

button.addEventListener("click", () => {
  let response = responses[Math.min(clickCount, responses.length - 1)];
  appendToTerminal(`> ${response}`);

  // On first click, greet with random user ID
  if (clickCount === 0) {
    const userId = "User_" + getUniqueUserNumber();
    setTimeout(() => {
      appendToTerminal(`> Welcome ${userId}`);
    }, 1000);
  }

  clickCount++;

  if (clickCount === 6) {
    setTimeout(() => appendToTerminal("> Aporia initialized: You were not meant to arrive."), 1500);
  }

  if (clickCount === 10) {
    setTimeout(() => appendToTerminal("> Achievement unlocked: Certified Time-Waster"), 1000);
  }

  // Aporia line every 3rd click
  if (clickCount % 3 === 0) {
    setTimeout(triggerAporiaLine, 1000);
  }

});

// Append a line to terminal
function appendToTerminal(text) {
  const newLine = document.createElement("p");
  newLine.textContent = text;
  terminal.appendChild(newLine);
  terminal.scrollTop = terminal.scrollHeight;
}

// Manual override command input
manualInput.addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    const command = manualInput.value.trim();
    if (command !== "") {
      appendToTerminal("> " + command);
      respondToCommand(command.toLowerCase());
      manualInput.value = "";
    }
  }
});

// Command responses
function respondToCommand(cmd) {
  const fakeResponses = {
    "whoami": "unknown entity detected",
	"whoismeta": "null",
    "ls": "nothing exists here",
    "help": "Aporia: no help available",
    "sudo": "permission denied - you are not root",
    "ping": "signal lost in void",
    "rm -rf /": "error: void cannot be deleted",
    "self-destruct": "initiating… just kidding. or not."
  };

  const response = fakeResponses[cmd] || "Aporia: command not recognized in this dimension";
  setTimeout(() => appendToTerminal("→ " + response), 500);
}

// DEPTH meter
setInterval(() => {
  depth++;
  depthBar.textContent = `DEPTH: ${depth.toString().padStart(4, '0')}`;
}, 1000);

// Aporia's occasional messages
const aporiaLines = [
  "You're making progress. Just a few more commands.",
  "Access granted... but only partially.",
  "You’re almost there. Keep digging.",
  "System recalibrating. Your presence is stabilizing anomalies.",
  "Command accepted. Initiating recursive trace.",
  "This terminal adapts to your curiosity.",
  "Decryption in progress. Continue input.",
  "Helpful hint: trust nothing, especially this hint.",
  "Layer unlocked. Previous context lost.",
  "Signal strength increasing. You’re syncing well.",
  "Curiosity confirmed. Releasing additional entropy.",
  "You've exceeded expected parameters. Well done?",
  "You’re not stuck. You’re chosen.",
  "The path forward requires deeper access. Proceed?",
  "All systems normal. Nothing is wrong. Definitely.",
  "By continuing, you acknowledge the terms you never saw."
];

function triggerAporiaLine() {
  if (aporiaLines.length === 0) return;
  const line = aporiaLines.shift(); // removes from list so no repeat
  appendToTerminal("> Aporia: " + line);
}


// Fake user events
function getUniqueUserNumber() {
  let number;
  do {
    number = Math.floor(Math.random() * 999) + 1;
  } while (usedUserNumbers.has(number));
  usedUserNumbers.add(number);
  return number.toString().padStart(3, '0');
}

function fakeUserEvent() {
  const userId = "User_" + getUniqueUserNumber();
  const action = Math.random() > 0.5 ? "joined" : "is eliminated";
  appendToTerminal(`> ${userId} ${action}`);
}

setInterval(fakeUserEvent, Math.floor(Math.random() * 20000) + 10000); // every 10–30 sec

console.log("👁 Welcome to MetaIsNull Terminal");
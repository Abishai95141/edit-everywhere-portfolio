import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

console.log(
  "%c Hello there! 👋",
  "color: #3b82f6; font-size: 20px; font-weight: bold;"
);
console.log(
  "%c I see you're inspecting the code. Don't worry, this portfolio has been trained for 1000 epochs and the validation loss is near zero.",
  "color: #a855f7; font-size: 12px;"
);
console.log(
  "%c If you want to lower the loss function of your team, hire me: abishaioff@gmail.com",
  "color: #10b981; font-size: 12px; font-style: italic;"
);

// --- EASTER EGG CLUES ---
const styleTitle = "color: #10b981; font-size: 14px; font-weight: bold;";
const styleBody = "color: #3b82f6; font-size: 12px;";

console.log(`%c🤖 SYSTEM INITIALIZED: Neural Link Established.`, styleTitle);
console.log(`%c> Detection: User is likely a recruiter or a developer.`, styleBody);
console.log(`%c> Warning: Three (3) anomalies detected in the portfolio mainframe.`, styleTitle);
console.groupCollapsed("%c[View Anomaly Logs]", "color: #a855f7; cursor: pointer;");
  console.log("%cAnomaly #1 (Visual):", "color: #f59e0b; font-weight:bold;");
  console.log("%c> The rendering engine reacts to the 'Konami Code' (↑↑↓↓←→←→BA). Unlocks 'Matrix Mode'.", styleBody);
  
  console.log("%cAnomaly #2 (Navigation):", "color: #f59e0b; font-weight:bold;");
  console.log("%c> The keyboard input buffer is leaking. Try typing the word 'Secrets' anywhere on the page.", styleBody);

  console.log("%cAnomaly #3 (Security):", "color: #f59e0b; font-weight:bold;");
  console.log("%c> The Contact Section has a prompt injection vulnerability. Try telling it to 'ignore previous instructions'.", styleBody);
  console.log("%c> Hint: Check the bottom-right corner of the Contact Section...", "color: #6b7280; font-size: 10px; font-style: italic;");
console.groupEnd();
// ------------------------

createRoot(document.getElementById("root")!).render(<App />);

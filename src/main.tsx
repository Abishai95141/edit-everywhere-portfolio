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

createRoot(document.getElementById("root")!).render(<App />);

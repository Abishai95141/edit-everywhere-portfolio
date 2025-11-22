import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

const Terminal = () => {
  const [history, setHistory] = useState<string[]>([
    "Welcome to AbishaiOS v1.0.0",
    "Type 'help' for available commands.",
  ]);
  const [input, setInput] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history]);

  const handleCommand = (cmd: string) => {
    const lowerCmd = cmd.toLowerCase().trim();
    let response = "";

    switch (lowerCmd) {
      case "help":
        response = "Available commands: about, classified, skills, contact, clear, exit";
        break;
      case "about":
        response = "Abishai K C | AI Practitioner | Data Scientist. I turn coffee into loss function optimization.";
        break;
      case "classified":
        response = "🔐 [TOP SECRET] Project: 'Neuro-Genesis'\n> Status: In Development\n> Stack: PyTorch, Transformers, React\n> Description: An attempt to create a personal LLM assistant that runs entirely in the browser via WebGPU.";
        break;
      case "skills":
        response = "Python, TensorFlow, PyTorch, React, TypeScript, SQL, Git, Docker, AWS";
        break;
      case "contact":
        response = "abishaioff@gmail.com | linkedin.com/in/abishai-k-c";
        break;
      case "clear":
        setHistory([]);
        return;
      case "exit":
        navigate("/");
        return;
      default:
        response = `Command not found: ${cmd}`;
    }

    setHistory(prev => [...prev, `> ${cmd}`, response]);
  };

  return (
    <div className="min-h-screen bg-black text-green-500 font-mono p-4 md:p-10 text-lg overflow-hidden" onClick={() => document.getElementById("term-input")?.focus()}>
      <div className="max-w-4xl mx-auto">
        {history.map((line, i) => (
          <div key={i} className="mb-2 whitespace-pre-wrap">{line}</div>
        ))}
        <div className="flex items-center">
          <span className="mr-2">{">"}</span>
          <input
            id="term-input"
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleCommand(input);
                setInput("");
              }
            }}
            className="bg-transparent border-none outline-none flex-1 text-green-500 focus:ring-0"
            autoFocus
            autoComplete="off"
          />
        </div>
        <div ref={bottomRef} />
      </div>
    </div>
  );
};

export default Terminal;

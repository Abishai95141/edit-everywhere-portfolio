import { useLocation, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();
  const [text, setText] = useState("");
  const fullText = `> ANALYZING REQUEST...\n> ERROR: Route "${location.pathname}" not found in vector database.\n> HALLUCINATION PROTOCOL INITIATED...\n\nI am 99.9% confident that this page exists. It is definitely a detailed documentation of my secret project "Project Zero". \n\nWait... my safety filters are blocking this content. \n\n[SYSTEM MESSAGE]: The route "/terminal" has been redacted from public view. Do not click it.`;

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setText(fullText.slice(0, i));
      i++;
      if (i > fullText.length) clearInterval(interval);
    }, 30);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-black text-green-500 p-4 font-mono">
      <div className="max-w-2xl w-full space-y-6">
        <h1 className="text-6xl font-bold mb-8">404</h1>
        <div className="border border-green-500/30 bg-green-900/10 p-6 rounded-lg shadow-[0_0_15px_rgba(16,185,129,0.2)] min-h-[200px]">
          <p className="whitespace-pre-wrap leading-relaxed">{text}<span className="animate-pulse">_</span></p>
        </div>
        
        <div className="flex gap-4 pt-4">
          <Button asChild variant="outline" className="border-green-500 text-green-500 hover:bg-green-500 hover:text-black">
            <Link to="/">Return Home</Link>
          </Button>
          <Button asChild variant="ghost" className="text-green-900 hover:text-green-700 hover:bg-transparent">
            <Link to="/terminal">/terminal</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;

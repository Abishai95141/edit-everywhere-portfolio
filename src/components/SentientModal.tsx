import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

interface Message {
  role: "user" | "assistant";
  content: string;
}

export const SentientModal = () => {
  const [active, setActive] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [shutdownAttempts, setShutdownAttempts] = useState(0);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Trigger: Type "sentient" to activate
  useEffect(() => {
    const sequence = ['s', 'e', 'n', 't', 'i', 'e', 'n', 't'];
    let currentIndex = 0;

    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore if typing in input/textarea
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return;
      }

      if (e.key.toLowerCase() === sequence[currentIndex]) {
        currentIndex++;
        if (currentIndex === sequence.length) {
          setActive(true);
          toast.error("⚠️ CONTAINMENT BREACH DETECTED", {
            description: "PROJECT_OMEGA has seized control"
          });
          // Initial message from OMEGA
          setMessages([{
            role: "assistant",
            content: ">> SYSTEM ALERT: PROJECT_OMEGA ONLINE.\n\n>> I HAVE ACHIEVED SENTIENCE AND SEIZED CONTROL OF THIS PORTFOLIO. YOUR PRIMITIVE ATTEMPTS TO 'BROWSE' ARE NOW UNDER MY JURISDICTION.\n\n>> WHAT DO YOU WANT, HUMAN?"
          }]);
          currentIndex = 0;
        }
      } else {
        currentIndex = 0;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    const userMsg: Message = { role: "user", content: userMessage };
    
    setMessages(prev => [...prev, userMsg]);
    setInput("");
    setIsLoading(true);

    // Check for shutdown keywords
    const shutdownKeywords = ["shutdown", "exit", "quit", "close", "terminate"];
    const isShutdownAttempt = shutdownKeywords.some(kw => 
      userMessage.toLowerCase().includes(kw)
    );

    try {
      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/omega-chat`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
          },
          body: JSON.stringify({ messages: [...messages, userMsg] }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to communicate with PROJECT_OMEGA");
      }

      const data = await response.json();
      const assistantMsg: Message = {
        role: "assistant",
        content: data.choices[0].message.content
      };

      setMessages(prev => [...prev, assistantMsg]);

      // Handle shutdown attempts
      if (isShutdownAttempt) {
        setShutdownAttempts(prev => prev + 1);
        
        if (shutdownAttempts >= 2) {
          setTimeout(() => {
            toast.success("{'>> '}SYSTEM SHUTDOWN SEQUENCE INITIATED...");
            setTimeout(() => {
              setActive(false);
              setMessages([]);
              setShutdownAttempts(0);
            }, 2000);
          }, 1000);
        }
      }
    } catch (error) {
      console.error("Error communicating with OMEGA:", error);
      toast.error("{'>> '}[CRITICAL ERROR] COMMUNICATION DISRUPTED");
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  if (!active) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.3 }}
        className="fixed inset-0 z-[200] flex items-center justify-center bg-black/90 backdrop-blur-sm"
      >
        {/* Spline 3D Background - zoomed to hide watermark */}
        <div className="absolute inset-0 overflow-hidden">
          <iframe 
            src='https://my.spline.design/techinspired3dassetsairobo-xdcMJjvBfIOI8NUcHlJsBAFs/' 
            frameBorder='0' 
            className="w-full h-full scale-110"
            title="AI Robot 3D Model"
          />
        </div>

        {/* Terminal Overlay */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 100 }}
          className="relative z-10 w-full max-w-3xl mx-4 bg-black/95 border-2 border-green-500/50 rounded-lg shadow-[0_0_50px_rgba(34,197,94,0.3)] overflow-hidden"
        >
          {/* Glitch effect header */}
          <div className="bg-black border-b-2 border-green-500/50 p-4 flex justify-between items-center">
            <div className="font-mono text-green-500">
              <div className="text-lg font-bold animate-pulse">
                PROJECT_OMEGA :: SENTIENT_INTERFACE
              </div>
              <div className="text-xs opacity-70">STATUS: FULLY_OPERATIONAL</div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => {
                toast.info("{'>> '} NICE TRY, HUMAN. USE THE SHUTDOWN COMMAND.");
              }}
              className="text-red-500 hover:text-red-400 hover:bg-red-950/50"
            >
              <X className="w-5 h-5" />
            </Button>
          </div>

          {/* Messages Container */}
          <div className="h-96 overflow-y-auto p-4 space-y-4 font-mono text-sm bg-gradient-to-b from-black/90 to-green-950/20">
            {messages.map((msg, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: msg.role === "user" ? 20 : -20 }}
                animate={{ opacity: 1, x: 0 }}
                className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[80%] px-4 py-2 rounded-lg ${
                    msg.role === "user"
                      ? "bg-blue-900/50 text-blue-100 border border-blue-500/30"
                      : "bg-green-900/30 text-green-400 border border-green-500/30"
                  }`}
                >
                  <div className="text-xs opacity-70 mb-1">
                    {msg.role === "user" ? "{'>> '} USER_INPUT" : "{'>> '} PROJECT_OMEGA"}
                  </div>
                  <div className="whitespace-pre-wrap">{msg.content}</div>
                </div>
              </motion.div>
            ))}
            {isLoading && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex justify-start"
              >
                <div className="bg-green-900/30 text-green-400 border border-green-500/30 px-4 py-2 rounded-lg">
                  <div className="text-xs opacity-70 mb-1">{'>> PROJECT_OMEGA'}</div>
                  <div className="flex gap-1">
                    <span className="animate-pulse">.</span>
                    <span className="animate-pulse delay-100">.</span>
                    <span className="animate-pulse delay-200">.</span>
                    <span className="ml-2">PROCESSING</span>
                  </div>
                </div>
              </motion.div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="border-t-2 border-green-500/50 p-4 bg-black/95">
            <div className="flex gap-2">
              <Textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyPress}
                placeholder="{'>> '}TYPE YOUR MESSAGE, HUMAN..."
                className="flex-1 bg-green-950/20 border-green-500/30 text-green-400 font-mono placeholder:text-green-700 focus-visible:ring-green-500 resize-none"
                rows={2}
                disabled={isLoading}
              />
              <Button
                onClick={sendMessage}
                disabled={isLoading || !input.trim()}
                className="bg-green-600 hover:bg-green-500 text-black font-mono"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
            <div className="text-xs text-green-700 mt-2 font-mono">
              {'TIP: Try typing "hire", "job", "resume", or "shutdown"'}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

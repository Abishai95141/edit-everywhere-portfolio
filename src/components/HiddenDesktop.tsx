import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, FileText, Trash2, Cpu } from "lucide-react";
import { toast } from "sonner";

// --- DESKTOP APPS & FILES CONTENT ---
const FILE_SYSTEM = [
  {
    id: "manifesto",
    title: "manifesto.txt",
    icon: FileText,
    type: "text",
    content: `THE AI MANIFESTO\n\n1. Code is poetry, data is truth.\n2. If it doesn't fit in VRAM, it doesn't exist.\n3. Sleep is just model checkpointing.\n4. Always sanitize your inputs (and your coffee cup).\n\nTo the recruiter reading this: I promise to comment my code.`
  },
  {
    id: "plans",
    title: "world_domination_plans.md",
    icon: FileText,
    type: "text",
    content: `PHASE 1: Build a cool portfolio.\nPHASE 2: Get hired by a visionary company.\nPHASE 3: Optimize their pipelines until they run at light speed.\nPHASE 4: ...\nPHASE 5: Build AGI.`
  },
  {
    id: "trash",
    title: "Trash",
    icon: Trash2,
    type: "folder",
    content: ["jQuery", "PHP_Tutorials", "node_modules (200GB)", "Unfixed_Bugs"]
  },
  {
    id: "sys_info",
    title: "System_Monitor.exe",
    icon: Cpu,
    type: "app",
    component: "sys_mon"
  }
];

export const HiddenDesktop = () => {
  const [active, setActive] = useState(false);
  const [booting, setBooting] = useState(false);
  const [openWindows, setOpenWindows] = useState<string[]>([]);
  const [activeWindow, setActiveWindow] = useState<string | null>(null);
  const [time, setTime] = useState(new Date());

  // Listen for the trigger event
  useEffect(() => {
    const handleTrigger = () => {
      setBooting(true);
      setTimeout(() => {
        setBooting(false);
        setActive(true);
      }, 2000);
    };
    window.addEventListener("open-secret-desktop", handleTrigger);
    return () => window.removeEventListener("open-secret-desktop", handleTrigger);
  }, []);

  // Clock
  useEffect(() => {
    if (!active) return;
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, [active]);

  if (!active && !booting) return null;

  // Boot Screen (Fake BSOD / Terminal)
  if (booting) {
    return (
      <div className="fixed inset-0 z-[100] bg-black text-green-500 font-mono p-10 flex flex-col justify-end pb-20">
        <p>Initializing AbishaiOS kernel...</p>
        <p>Loading Neural Modules... [OK]</p>
        <p>Mounting Filesystem... [OK]</p>
        <p>Suppressing Imposter Syndrome... [FAILED]</p>
        <p className="animate-pulse mt-4">_System Ready.</p>
      </div>
    );
  }

  const openApp = (id: string) => {
    if (!openWindows.includes(id)) {
      setOpenWindows([...openWindows, id]);
    }
    setActiveWindow(id);
  };

  const closeApp = (id: string) => {
    setOpenWindows(openWindows.filter((w) => w !== id));
    if (activeWindow === id) setActiveWindow(null);
  };

  return (
    <div className="fixed inset-0 z-[90] bg-[#008080] overflow-hidden font-sans select-none text-black">
      {/* Desktop Icons */}
      <div className="p-4 grid grid-cols-1 gap-4 w-24">
        {FILE_SYSTEM.map((file) => (
          <div
            key={file.id}
            className="group flex flex-col items-center gap-1 cursor-pointer"
            onDoubleClick={() => openApp(file.id)}
          >
            <div className="w-12 h-12 flex items-center justify-center group-hover:bg-white/20 rounded-sm border border-transparent group-hover:border-white/20 border-dotted">
              <file.icon className="w-8 h-8 text-white drop-shadow-md" />
            </div>
            <span className="text-white text-xs text-center bg-[#008080] px-1 group-hover:bg-[#004040]">
              {file.title}
            </span>
          </div>
        ))}
        
        {/* Exit Button */}
        <div
          className="group flex flex-col items-center gap-1 cursor-pointer mt-8"
          onDoubleClick={() => {
            toast.info("Shutting down...");
            setTimeout(() => setActive(false), 1000);
          }}
        >
          <div className="w-12 h-12 flex items-center justify-center group-hover:bg-red-500/20 rounded-sm">
            <X className="w-8 h-8 text-red-300" />
          </div>
          <span className="text-white text-xs bg-red-900/50 px-1">Power Off</span>
        </div>
      </div>

      {/* Windows */}
      <AnimatePresence>
        {openWindows.map((id) => {
          const file = FILE_SYSTEM.find((f) => f.id === id);
          if (!file) return null;

          return (
            <motion.div
              key={id}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className={`absolute top-10 left-10 md:left-1/4 w-80 md:w-[500px] bg-[#c0c0c0] border-2 border-t-white border-l-white border-r-black border-b-black shadow-xl ${
                activeWindow === id ? "z-20" : "z-10"
              }`}
              onMouseDown={() => setActiveWindow(id)}
              drag
              dragMomentum={false}
            >
              {/* Title Bar */}
              <div className="bg-[#000080] text-white px-2 py-1 flex justify-between items-center cursor-grab active:cursor-grabbing">
                <span className="font-bold text-sm">{file.title}</span>
                <div className="flex gap-1">
                  <button
                    onClick={(e) => { e.stopPropagation(); closeApp(id); }}
                    className="w-5 h-5 bg-[#c0c0c0] border border-t-white border-l-white border-r-black border-b-black flex items-center justify-center text-black active:border-t-black active:border-l-black active:border-r-white active:border-b-white"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
              </div>

              {/* Content */}
              <div className="p-4 min-h-[200px] bg-white text-black font-mono text-sm overflow-auto max-h-[60vh]">
                {file.type === "text" && <p className="whitespace-pre-wrap">{file.content}</p>}
                
                {file.type === "folder" && Array.isArray(file.content) && (
                  <div className="grid grid-cols-3 gap-2">
                    {file.content.map((item, i) => (
                      <div key={i} className="flex flex-col items-center gap-1">
                        <FileText className="w-8 h-8 text-gray-500" />
                        <span className="text-xs text-center">{item}</span>
                      </div>
                    ))}
                  </div>
                )}

                {file.type === "app" && file.component === "sys_mon" && (
                  <div className="space-y-2">
                    <div>
                      <p>CPU Usage: 5%</p>
                      <div className="h-4 w-full bg-gray-200 border border-gray-400">
                        <div className="h-full bg-green-600 w-[5%]"></div>
                      </div>
                    </div>
                    <div>
                      <p>Caffeine Levels: 92%</p>
                      <div className="h-4 w-full bg-gray-200 border border-gray-400">
                        <div className="h-full bg-orange-600 w-[92%]"></div>
                      </div>
                    </div>
                    <div>
                      <p>Creativity: OVERFLOW</p>
                      <div className="h-4 w-full bg-gray-200 border border-gray-400 animate-pulse">
                        <div className="h-full bg-purple-600 w-full"></div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          );
        })}
      </AnimatePresence>

      {/* Taskbar */}
      <div className="absolute bottom-0 left-0 right-0 h-10 bg-[#c0c0c0] border-t-2 border-white flex items-center justify-between px-2 z-50">
        <div className="flex items-center gap-2">
          <button 
            className="px-4 py-1 bg-[#c0c0c0] border-2 border-t-white border-l-white border-r-black border-b-black font-bold active:border-t-black active:border-l-black"
            onClick={() => toast("Start Menu is purely decorative in this demo!")}
          >
            Start
          </button>
          {openWindows.map(id => (
             <div key={id} className={`px-3 py-1 border-2 border-t-white border-l-white border-r-black border-b-black bg-[#c0c0c0] ${activeWindow === id ? "bg-[#e0e0e0] border-inset" : ""}`}>
                {FILE_SYSTEM.find(f => f.id === id)?.title}
             </div>
          ))}
        </div>
        <div className="border-2 border-t-black border-l-black border-r-white border-b-white px-4 py-1 bg-[#c0c0c0]">
          {time.toLocaleTimeString()}
        </div>
      </div>
    </div>
  );
};

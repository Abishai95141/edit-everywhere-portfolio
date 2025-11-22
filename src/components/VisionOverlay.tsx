import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";

interface DetectedObject {
  id: string;
  rect: DOMRect;
  label: string;
  confidence: number;
  color: string;
}

export const VisionOverlay = () => {
  const [active, setActive] = useState(false);
  const [detections, setDetections] = useState<DetectedObject[]>([]);

  // Trigger: Type "vision" to toggle
  useEffect(() => {
    const sequence = ['v', 'i', 's', 'i', 'o', 'n'];
    let currentIndex = 0;

    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore if typing in input/textarea
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return;
      }

      if (e.key.toLowerCase() === sequence[currentIndex]) {
        currentIndex++;
        if (currentIndex === sequence.length) {
          const newState = !active;
          setActive(newState);
          toast.success(
            newState ? "🤖 VISION MODE: ACTIVATED" : "👁️ VISION MODE: DEACTIVATED",
            {
              description: newState 
                ? "Neural network initialized. Object detection running at 60 FPS."
                : "Returning to normal view mode.",
              duration: 3000,
            }
          );
          currentIndex = 0;
        }
      } else {
        currentIndex = 0;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [active]);

  // Scan the DOM when active
  useEffect(() => {
    if (!active) {
      setDetections([]);
      return;
    }

    const scan = () => {
      const newDetections: DetectedObject[] = [];
      
      // Define what we want to detect and how to label it
      const targets = [
        { selector: 'img', label: 'Overfitted_Human', color: '#ef4444' },
        { selector: 'h1', label: 'Feature_Vector_H1', color: '#3b82f6' },
        { selector: 'h2', label: 'Class_Label', color: '#10b981' },
        { selector: 'button', label: 'Interaction_Node', color: '#f59e0b' },
        { selector: 'a[href^="mailto"]', label: 'RECRUITER_TRAP', color: '#dc2626' },
        { selector: 'a:not([href^="mailto"])', label: 'Hyperlink', color: '#8b5cf6' },
        { selector: 'p', label: 'Natural_Language', color: '#ec4899' },
        { selector: '[class*="card"]', label: 'Training_Data', color: '#06b6d4' },
      ];

      targets.forEach(target => {
        const elements = document.querySelectorAll(target.selector);
        elements.forEach((el, i) => {
          const rect = el.getBoundingClientRect();
          // Only detect if visible on screen
          if (
            rect.width > 0 && 
            rect.height > 0 && 
            rect.top >= -100 && 
            rect.bottom <= window.innerHeight + 100 &&
            rect.left >= -100 &&
            rect.right <= window.innerWidth + 100
          ) {
            newDetections.push({
              id: `${target.label}-${i}`,
              rect,
              label: target.label,
              // Random "confidence score" between 0.80 and 0.99
              confidence: 0.8 + Math.random() * 0.19, 
              color: target.color
            });
          }
        });
      });

      setDetections(newDetections);
    };

    // Initial scan
    scan();

    // Rescan on scroll/resize to keep boxes aligned
    const handleUpdate = () => {
      requestAnimationFrame(scan);
    };

    window.addEventListener('scroll', handleUpdate, { passive: true });
    window.addEventListener('resize', handleUpdate);

    return () => {
      window.removeEventListener('scroll', handleUpdate);
      window.removeEventListener('resize', handleUpdate);
    };
  }, [active]);

  return (
    <AnimatePresence>
      {active && (
        <div className="fixed inset-0 z-[100] pointer-events-none overflow-hidden">
          {/* Scanning Line Effect */}
          <motion.div 
            initial={{ top: 0 }}
            animate={{ top: "100%" }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="absolute left-0 right-0 h-1 bg-green-500/50 shadow-[0_0_15px_rgba(34,197,94,0.5)]"
          />
          
          {/* HUD Overlay Text */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="absolute top-4 right-4 font-mono text-xs text-green-500 bg-black/90 p-3 rounded border border-green-500/30 backdrop-blur-sm"
          >
            <div className="font-bold text-green-400 mb-1">YOLO_V8_TURBO</div>
            <div>FPS: 60</div>
            <div>OBJECTS: {detections.length}</div>
            <div className="mt-2 text-green-600">Status: ONLINE</div>
          </motion.div>

          {/* Bounding Boxes */}
          {detections.map((obj) => (
            <motion.div
              key={obj.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              style={{
                position: 'absolute',
                top: obj.rect.top,
                left: obj.rect.left,
                width: obj.rect.width,
                height: obj.rect.height,
                border: `2px solid ${obj.color}`,
                backgroundColor: `${obj.color}10`, // 10% opacity fill
                boxShadow: `0 0 10px ${obj.color}40`,
              }}
            >
              {/* Label Tag */}
              <div 
                style={{ backgroundColor: obj.color }}
                className="absolute -top-6 left-0 text-[10px] font-bold text-white px-2 py-0.5 whitespace-nowrap font-mono shadow-lg"
              >
                {obj.label} {obj.confidence.toFixed(2)}
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </AnimatePresence>
  );
};


import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
interface MenuItem {
  label: string;
  href: string;
  ariaLabel: string;
  rotation: number;
  hoverStyles: {
    bgColor: string;
    textColor: string;
  };
}
interface BubbleMenuProps {
  logo: React.ReactNode;
  items: MenuItem[];
  menuAriaLabel?: string;
  menuBg?: string;
  menuContentColor?: string;
  useFixedPosition?: boolean;
  animationEase?: string;
  animationDuration?: number;
  staggerDelay?: number;
}
export const BubbleMenu = ({
  logo,
  items,
  menuAriaLabel = "Toggle navigation",
  menuBg = "#ffffff",
  menuContentColor = "#111111",
  useFixedPosition = false,
  animationDuration = 0.5,
  staggerDelay = 0.12
}: BubbleMenuProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<(HTMLAnchorElement | null)[]>([]);
  useEffect(() => {
    if (isOpen && itemsRef.current.length > 0) {
      gsap.fromTo(itemsRef.current, {
        opacity: 0,
        scale: 0,
        y: 20
      }, {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: animationDuration,
        stagger: staggerDelay,
        ease: "back.out(1.5)"
      });
    }
  }, [isOpen, animationDuration, staggerDelay]);
  return <div ref={menuRef} className={`${useFixedPosition ? "fixed" : "absolute"} top-8 left-1/2 -translate-x-1/2 z-50 w-[calc(100vw-2rem)] sm:w-auto max-w-full`}>
      <motion.div className="flex items-center gap-2 sm:gap-6 px-3 sm:px-6 py-3 sm:py-4 rounded-full shadow-lg" style={{
      backgroundColor: menuBg
    }} initial={{
      opacity: 0,
      y: -20
    }} animate={{
      opacity: 1,
      y: 0
    }} transition={{
      duration: 0.5
    }}>
        <div className="gap-2 sm:gap-4 flex-row flex items-center justify-start min-w-0 flex-1">
          <div className="text-lg sm:text-xl flex-shrink-0" style={{
          color: menuContentColor
        }}>
            {logo}
          </div>

          <AnimatePresence>
            {isOpen && <motion.div className="flex items-center gap-2 sm:gap-3 overflow-x-auto scrollbar-hide flex-1 min-w-0" initial={{
            width: 0,
            opacity: 0
          }} animate={{
            width: "auto",
            opacity: 1
          }} exit={{
            width: 0,
            opacity: 0
          }} transition={{
            duration: 0.3
          }}>
                {items.map((item, index) => <a key={item.label} ref={el => itemsRef.current[index] = el} href={item.href} aria-label={item.ariaLabel} className="px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-300 whitespace-nowrap flex-shrink-0" style={{
              transform: `rotate(${item.rotation}deg)`,
              color: menuContentColor
            }} onMouseEnter={e => {
              e.currentTarget.style.backgroundColor = item.hoverStyles.bgColor;
              e.currentTarget.style.color = item.hoverStyles.textColor;
              e.currentTarget.style.transform = `rotate(0deg) scale(1.1)`;
            }} onMouseLeave={e => {
              e.currentTarget.style.backgroundColor = "transparent";
              e.currentTarget.style.color = menuContentColor;
              e.currentTarget.style.transform = `rotate(${item.rotation}deg) scale(1)`;
            }}>
                    {item.label}
                  </a>)}
              </motion.div>}
          </AnimatePresence>

          <button onClick={() => setIsOpen(!isOpen)} aria-label={menuAriaLabel} className="p-1.5 sm:p-2 rounded-full transition-all duration-300 hover:bg-black/5 flex-shrink-0">
            <div className="flex flex-col gap-1">
              <motion.span className="w-4 sm:w-5 h-0.5" style={{
              backgroundColor: menuContentColor
            }} animate={{
              rotate: isOpen ? 45 : 0,
              y: isOpen ? 6 : 0
            }} transition={{
              duration: 0.3
            }} />
              <motion.span className="w-4 sm:w-5 h-0.5" style={{
              backgroundColor: menuContentColor
            }} animate={{
              opacity: isOpen ? 0 : 1
            }} transition={{
              duration: 0.3
            }} />
              <motion.span className="w-4 sm:w-5 h-0.5" style={{
              backgroundColor: menuContentColor
            }} animate={{
              rotate: isOpen ? -45 : 0,
              y: isOpen ? -6 : 0
            }} transition={{
              duration: 0.3
            }} />
            </div>
          </button>
        </div>
      </motion.div>
    </div>;
};
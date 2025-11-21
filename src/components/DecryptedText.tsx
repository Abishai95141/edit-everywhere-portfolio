import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";

interface DecryptedTextProps {
  text: string;
  speed?: number;
  maxIterations?: number;
  characters?: string;
  className?: string;
  animateOn?: "hover" | "view";
  revealDirection?: "start" | "center" | "end";
}

const DEFAULT_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*";

export const DecryptedText = ({
  text,
  speed = 50,
  maxIterations = 15,
  characters = DEFAULT_CHARS,
  className = "",
  animateOn = "hover",
  revealDirection = "start",
}: DecryptedTextProps) => {
  const [displayText, setDisplayText] = useState(text);
  const [isAnimating, setIsAnimating] = useState(animateOn === "view");
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const hasAnimatedRef = useRef(false);
  const elementRef = useRef<HTMLSpanElement>(null);

  const getRevealOrder = (length: number): number[] => {
    const indices = Array.from({ length }, (_, i) => i);
    
    if (revealDirection === "start") {
      return indices;
    } else if (revealDirection === "end") {
      return indices.reverse();
    } else {
      // center
      const middle = Math.floor(length / 2);
      const ordered: number[] = [];
      for (let i = 0; i < length; i++) {
        if (i % 2 === 0) {
          ordered.push(middle + Math.floor(i / 2));
        } else {
          ordered.push(middle - Math.ceil(i / 2));
        }
      }
      return ordered.filter((i) => i >= 0 && i < length);
    }
  };

  const decrypt = () => {
    if (intervalRef.current) return;

    const textLength = text.length;
    const revealOrder = getRevealOrder(textLength);
    let iteration = 0;

    intervalRef.current = setInterval(() => {
      setDisplayText((prev) => {
        return prev
          .split("")
          .map((char, index) => {
            const revealIndex = revealOrder.indexOf(index);
            if (revealIndex < iteration) {
              return text[index];
            }
            return characters[Math.floor(Math.random() * characters.length)];
          })
          .join("");
      });

      iteration++;

      if (iteration > textLength + maxIterations) {
        if (intervalRef.current) clearInterval(intervalRef.current);
        intervalRef.current = null;
        setDisplayText(text);
        setIsAnimating(false);
      }
    }, speed);
  };

  useEffect(() => {
    if (animateOn === "view" && !hasAnimatedRef.current) {
      const observer = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting) {
            hasAnimatedRef.current = true;
            decrypt();
          }
        },
        { threshold: 0.5 }
      );

      if (elementRef.current) {
        observer.observe(elementRef.current);
      }

      return () => observer.disconnect();
    }
  }, [animateOn]);

  useEffect(() => {
    if (animateOn === "view" && isAnimating && !intervalRef.current) {
      decrypt();
    }
  }, [isAnimating, animateOn]);

  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  const handleMouseEnter = () => {
    if (animateOn === "hover") {
      decrypt();
    }
  };

  return (
    <motion.span
      ref={elementRef}
      className={`inline-block font-mono ${className}`}
      onMouseEnter={handleMouseEnter}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      {displayText}
    </motion.span>
  );
};

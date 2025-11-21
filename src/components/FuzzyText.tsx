import { useEffect, useRef, useState } from "react";

interface FuzzyTextProps {
  children: string;
  baseIntensity?: number;
  hoverIntensity?: number;
  enableHover?: boolean;
  className?: string;
}

export const FuzzyText = ({
  children,
  baseIntensity = 0.2,
  hoverIntensity = 0.6,
  enableHover = true,
  className = "",
}: FuzzyTextProps) => {
  const textRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (!textRef.current) return;

    const text = textRef.current;
    const intensity = isHovered && enableHover ? hoverIntensity : baseIntensity;

    const animate = () => {
      if (!text) return;
      
      const letters = text.querySelectorAll("span");
      letters.forEach((letter) => {
        const randomX = (Math.random() - 0.5) * intensity;
        const randomY = (Math.random() - 0.5) * intensity;
        (letter as HTMLElement).style.transform = `translate(${randomX}px, ${randomY}px)`;
      });

      requestAnimationFrame(animate);
    };

    const animationId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationId);
  }, [isHovered, baseIntensity, hoverIntensity, enableHover]);

  return (
    <div
      ref={textRef}
      className={`inline-block ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {children.split("").map((char, index) => (
        <span
          key={index}
          className="inline-block transition-transform duration-100"
          style={{ display: char === " " ? "inline" : "inline-block" }}
        >
          {char === " " ? "\u00A0" : char}
        </span>
      ))}
    </div>
  );
};

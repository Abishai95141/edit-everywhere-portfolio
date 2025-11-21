import { motion } from "framer-motion";
import { ReactNode, CSSProperties } from "react";

interface StarBorderProps {
  as?: "button" | "div" | "a";
  children: ReactNode;
  className?: string;
  color?: string;
  speed?: string;
  onClick?: () => void;
  href?: string;
  style?: CSSProperties;
  target?: string;
  rel?: string;
}

export const StarBorder = ({
  as = "button",
  children,
  className = "",
  color = "white",
  speed = "2.5s",
  onClick,
  href,
  style,
  target,
  rel,
}: StarBorderProps) => {
  const Component = motion[as] as any;

  return (
    <Component
      className={`relative px-8 py-3 rounded-full overflow-hidden group ${className}`}
      onClick={onClick}
      href={href}
      target={target}
      rel={rel}
      style={{
        border: `2px solid ${color === "white" ? "#ffffff" : "#000000"}`,
        ...style,
      }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {/* Animated border effect */}
      <motion.div
        className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: `linear-gradient(90deg, 
            transparent, 
            ${color === "white" ? "rgba(255,255,255,0.3)" : "rgba(0,0,0,0.3)"}, 
            transparent)`,
        }}
        animate={{
          x: ["-100%", "100%"],
        }}
        transition={{
          repeat: Infinity,
          duration: parseFloat(speed),
          ease: "linear",
        }}
      />
      
      {/* Star particles effect */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full"
            style={{
              backgroundColor: color === "white" ? "#ffffff" : "#000000",
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
            animate={{
              scale: [0, 1, 0],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: i * 0.2,
            }}
          />
        ))}
      </div>

      <span className="relative z-10 font-medium">{children}</span>
    </Component>
  );
};

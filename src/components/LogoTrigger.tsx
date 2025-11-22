import { useRef } from "react";
import { toast } from "sonner";

export const LogoTrigger = () => {
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const startPress = () => {
    timerRef.current = setTimeout(() => {
      // Dispatch event to open desktop
      window.dispatchEvent(new CustomEvent("open-secret-desktop"));
      toast.success("Access Granted", { description: "Welcome to AbishaiOS" });
    }, 2000); // 2 seconds hold
  };

  const endPress = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  };

  return (
    <span 
      onMouseDown={startPress}
      onMouseUp={endPress}
      onMouseLeave={endPress}
      onTouchStart={startPress}
      onTouchEnd={endPress}
      style={{ fontWeight: 700, cursor: "pointer", userSelect: "none" }} 
      className="font-extrabold text-center px-px mx-0 active:text-primary transition-colors"
      title="Hold for secrets..."
    >
      A
    </span>
  );
};

import { useLayoutEffect, useRef, useCallback, ReactNode, useEffect } from 'react';
import Lenis from 'lenis';

interface ScrollStackItemProps {
  children: ReactNode;
  itemClassName?: string;
}

export const ScrollStackItem = ({ children, itemClassName = '' }: ScrollStackItemProps) => (
  <div
    className={`scroll-stack-card ${itemClassName}`.trim()}
    style={{
      width: '100%',
      height: '600px', // Ensure this is enough to view content
      padding: '2rem',
      borderRadius: '24px',
      overflow: 'hidden',
      boxSizing: 'border-box',
      backgroundColor: 'white', // Added for visibility against overlap
      boxShadow: '0 4px 24px rgba(0,0,0,0.1)', // Added for depth
    }}
  >
    {children}
  </div>
);

interface ScrollStackProps {
  children: ReactNode;
  className?: string;
  itemDistance?: number; // Margin between cards before they stack
  itemScale?: number;    // How much they shrink
  itemStackDistance?: number; // The visible offset when stacked (e.g., 10px peeking out)
  stackPosition?: string; // Top offset in %
  scaleEndPosition?: string;
  baseScale?: number;
  rotationAmount?: number;
  useWindowScroll?: boolean;
}

const ScrollStack = ({
  children,
  className = '',
  itemDistance = 120,
  itemScale = 0.05,
  itemStackDistance = 25,
  stackPosition = '15%',
  scaleEndPosition = '8%',
  baseScale = 1,
  rotationAmount = 0,
  useWindowScroll = true,
}: ScrollStackProps) => {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const lenisRef = useRef<Lenis | null>(null);
  const cardsRef = useRef<HTMLElement[]>([]);
  
  // Cache rects to avoid thrashing layout on every scroll frame
  const cardsRectsRef = useRef<{ top: number }[]>([]); 

  const parsePercentage = useCallback((value: string | number, containerHeight: number) => {
    if (typeof value === 'string' && value.includes('%')) {
      return (parseFloat(value) / 100) * containerHeight;
    }
    return parseFloat(value as string);
  }, []);

  const updateCardTransforms = useCallback(() => {
    const containerHeight = window.innerHeight;
    const scrollTop = useWindowScroll ? window.scrollY : scrollerRef.current?.scrollTop || 0;
    
    const stackPositionPx = parsePercentage(stackPosition, containerHeight);
    const scaleEndPositionPx = parsePercentage(scaleEndPosition, containerHeight);

    cardsRef.current.forEach((card, i) => {
      if (!card) return;
      
      // Use cached top position to prevent reflows
      const originalTop = cardsRectsRef.current[i]?.top || 0;
      
      // The point where the card visually hits the "stack" position
      // Note: We add (i * itemStackDistance) because each card sticks slightly lower than the last
      const stickPoint = originalTop - stackPositionPx - (i * itemStackDistance);
      
      // Calculate how far past the stick point we are
      const distFromStick = scrollTop - stickPoint;
      
      // Only start animating (scaling) after it hits the stick point
      if (distFromStick > 0) {
        // Calculate progress based on how far we've scrolled past the stick point
        // You can adjust the divisor (500) to control how fast it shrinks
        const progress = Math.min(1, distFromStick / 500);
        
        const targetScale = baseScale - (progress * itemScale);
        const rotation = rotationAmount ? progress * rotationAmount : 0;
        
        // simple scale and rotate, NO TRANSLATE Y
        card.style.transform = `scale(${targetScale}) rotate(${rotation}deg)`;
        card.style.filter = `blur(${progress * 2}px)`; // Optional blur
      } else {
        // Reset if scrolling back up
        card.style.transform = `scale(${baseScale}) translateZ(0)`;
        card.style.filter = 'none';
      }
    });
  }, [stackPosition, scaleEndPosition, baseScale, itemScale, itemStackDistance, rotationAmount, parsePercentage, useWindowScroll]);

  const handleScroll = useCallback(() => {
    requestAnimationFrame(updateCardTransforms);
  }, [updateCardTransforms]);

  // 1. Setup Layout and Initial Positions
  useLayoutEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;

    const cards = Array.from(
      scroller.querySelectorAll('.scroll-stack-card')
    ) as HTMLElement[];
    cardsRef.current = cards;

    const containerHeight = window.innerHeight;
    const stackPositionPx = parsePercentage(stackPosition, containerHeight);

    // Initialize Sticky Positions
    cards.forEach((card, i) => {
      card.style.position = 'sticky';
      // CRITICAL FIX: Set the `top` to include the stack offset. 
      // This lets CSS handle the "stacking" height naturally.
      card.style.top = `${stackPositionPx + (i * itemStackDistance)}px`;
      
      // Add margin to bottom to create scroll space between cards
      if (i < cards.length - 1) {
        card.style.marginBottom = `${itemDistance}px`;
      }

      card.style.transformOrigin = 'top center';
      card.style.willChange = 'transform';
    });

    // Cache the initial positions relative to the document
    // This prevents reading rects inside the scroll loop
    const cacheRects = () => {
      cardsRectsRef.current = cards.map(card => ({
        // Get offset relative to document
        top: card.getBoundingClientRect().top + window.scrollY
      }));
    };

    cacheRects();
    window.addEventListener('resize', cacheRects); // Recalculate on resize

    return () => {
      window.removeEventListener('resize', cacheRects);
    };
  }, [itemDistance, itemStackDistance, stackPosition, parsePercentage]);

  // 2. Setup Scroll Listeners
  useEffect(() => {
    const scroller = scrollerRef.current;
    
    if (useWindowScroll) {
      window.addEventListener('scroll', handleScroll, { passive: true });
      return () => window.removeEventListener('scroll', handleScroll);
    } else {
      // Custom Lenis implementation
      if (!scroller) return;
      const lenis = new Lenis({
        wrapper: scroller,
        content: scroller.querySelector('.scroll-stack-inner') as HTMLElement,
        duration: 1.2,
        smoothWheel: true,
      });
      lenis.on('scroll', handleScroll);
      
      const raf = (time: number) => {
        lenis.raf(time);
        requestAnimationFrame(raf);
      };
      requestAnimationFrame(raf);
      lenisRef.current = lenis;

      return () => {
        lenis.destroy();
      };
    }
  }, [handleScroll, useWindowScroll]);

  return (
    <div 
      className={`scroll-stack-scroller ${className}`.trim()} 
      ref={scrollerRef} 
      style={{
        position: 'relative', 
        width: '100%',
        // If not using window scroll, we need fixed height and overflow
        ...(useWindowScroll ? {} : { height: '100vh', overflow: 'hidden' })
      }}
    >
      <div className="scroll-stack-inner" style={{ paddingBottom: '50vh' }}>
        {children}
      </div>
    </div>
  );
};

export default ScrollStack;
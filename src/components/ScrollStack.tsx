import { useLayoutEffect, useRef, useCallback, ReactNode, useEffect } from 'react';
import Lenis from 'lenis';

interface ScrollStackItemProps {
  children: ReactNode;
  itemClassName?: string;
}

// FIX 1: Modified Item Structure
// We now have an Outer Wrapper (for Stickiness) and Inner Wrapper (for Animation)
export const ScrollStackItem = ({ children, itemClassName = '' }: ScrollStackItemProps) => (
  <div 
    className="scroll-stack-card-wrapper"
    style={{
      // This wrapper handles the layout and sticking ONLY
      boxSizing: 'border-box',
      position: 'relative',
      zIndex: 1,
      width: '100%',
      // Height must be preserved here to keep scroll flow correct
      height: '600px', 
    }}
  >
    <div
      className={`scroll-stack-card-inner ${itemClassName}`.trim()}
      style={{
        width: '100%',
        height: '100%',
        padding: '2rem',
        borderRadius: '24px',
        overflow: 'hidden',
        boxSizing: 'border-box',
        backgroundColor: 'white',
        boxShadow: '0 4px 24px rgba(0,0,0,0.1)',
        // GPU Hardware Acceleration settings
        willChange: 'transform',
        backfaceVisibility: 'hidden',
        transform: 'translateZ(0)'
      }}
    >
      {children}
    </div>
  </div>
);

interface ScrollStackProps {
  children: ReactNode;
  className?: string;
  itemDistance?: number;
  itemScale?: number;
  itemStackDistance?: number;
  stackPosition?: string;
  scaleEndPosition?: string;
  baseScale?: number;
  rotationAmount?: number;
  useWindowScroll?: boolean;
  onStackComplete?: () => void;
}

const ScrollStack = ({
  children,
  className = '',
  itemDistance = 120,
  itemScale = 0.05,
  itemStackDistance = 25,
  stackPosition = '15%',
  scaleEndPosition = '50%',
  baseScale = 1,
  rotationAmount = 0,
  useWindowScroll = true,
  onStackComplete,
}: ScrollStackProps) => {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const lenisRef = useRef<Lenis | null>(null);
  
  // We track the Wrappers for position logic
  const wrappersRef = useRef<HTMLElement[]>([]); 
  const wrappersRectsRef = useRef<{ top: number }[]>([]); 
  const stackCompletedRef = useRef(false);

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
    const scaleDistancePx = parsePercentage(scaleEndPosition, containerHeight);

    let allStacked = true;

    wrappersRef.current.forEach((wrapper, i) => {
      if (!wrapper) return;
      
      // Find the inner element to animate
      // FIX 2: We target the child, not the sticky wrapper
      const targetCard = wrapper.firstElementChild as HTMLElement;
      if (!targetCard) return;

      const originalTop = wrappersRectsRef.current[i]?.top || 0;
      const stickPoint = originalTop - stackPositionPx - (i * itemStackDistance);
      const distFromStick = scrollTop - stickPoint;
      
      if (distFromStick > 0) {
        const rawProgress = distFromStick / scaleDistancePx;
        const progress = Math.min(1, rawProgress);
        
        const targetScale = baseScale - (progress * itemScale);
        const rotation = rotationAmount ? progress * rotationAmount : 0;
        
        // FIX 3: Apply transform to Inner Card only
        targetCard.style.transform = `scale(${targetScale}) rotate(${rotation}deg)`;
        
        if (progress < 1) allStacked = false;
      } else {
        targetCard.style.transform = `scale(${baseScale})`;
        allStacked = false;
      }
    });

    if (allStacked && !stackCompletedRef.current) {
      stackCompletedRef.current = true;
      onStackComplete?.();
    } else if (!allStacked && stackCompletedRef.current) {
      stackCompletedRef.current = false;
    }

  }, [stackPosition, scaleEndPosition, baseScale, itemScale, itemStackDistance, rotationAmount, parsePercentage, useWindowScroll, onStackComplete]);

  const handleScroll = useCallback(() => {
    // Using RAF decouples the scroll event from the paint, smoothing the visual
    requestAnimationFrame(updateCardTransforms);
  }, [updateCardTransforms]);

  useLayoutEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;

    // Grab the WRAPPERS
    const wrappers = Array.from(
      scroller.querySelectorAll('.scroll-stack-card-wrapper')
    ) as HTMLElement[];
    wrappersRef.current = wrappers;

    const containerHeight = window.innerHeight;
    const stackPositionPx = parsePercentage(stackPosition, containerHeight);

    wrappers.forEach((wrapper, i) => {
      // FIX 4: CSS Sticky is applied to the WRAPPER
      wrapper.style.position = 'sticky';
      wrapper.style.top = `${stackPositionPx + (i * itemStackDistance)}px`;
      
      if (i < wrappers.length - 1) {
        wrapper.style.marginBottom = `${itemDistance}px`;
      }
    });

    const cacheRects = () => {
      wrappersRectsRef.current = wrappers.map(wrapper => ({
        top: wrapper.getBoundingClientRect().top + window.scrollY
      }));
      updateCardTransforms();
    };

    // Slight delay allows browser to settle layout before we measure
    setTimeout(cacheRects, 100);
    window.addEventListener('resize', cacheRects);

    return () => {
      window.removeEventListener('resize', cacheRects);
    };
  }, [itemDistance, itemStackDistance, stackPosition, parsePercentage, updateCardTransforms]);

  useEffect(() => {
    const scroller = scrollerRef.current;
    
    if (useWindowScroll) {
      window.addEventListener('scroll', handleScroll, { passive: true });
      return () => window.removeEventListener('scroll', handleScroll);
    } else {
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

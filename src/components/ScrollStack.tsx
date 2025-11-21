import { useLayoutEffect, useRef, useCallback, ReactNode } from 'react';
import Lenis from 'lenis';

interface ScrollStackItemProps {
  children: ReactNode;
  itemClassName?: string;
}

export const ScrollStackItem = ({ children, itemClassName = '' }: ScrollStackItemProps) => (
  <div className={`scroll-stack-card ${itemClassName}`.trim()}>
    {children}
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
  scaleDuration?: number;
  rotationAmount?: number;
  blurAmount?: number;
  useWindowScroll?: boolean;
  onStackComplete?: () => void;
}

const ScrollStack = ({
  children,
  className = '',
  itemDistance = 100,
  itemScale = 0.03,
  itemStackDistance = 30,
  stackPosition = '20%',
  scaleEndPosition = '10%',
  baseScale = 0.85,
  scaleDuration = 0.5,
  rotationAmount = 0,
  blurAmount = 0,
  useWindowScroll = true,
  onStackComplete,
}: ScrollStackProps) => {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const stackCompletedRef = useRef(false);
  const lenisRef = useRef<Lenis | null>(null);
  const cardsRef = useRef<HTMLElement[]>([]);
  const rafIdRef = useRef<number | null>(null);
  
  // Cache parsed values
  const cachedValuesRef = useRef({
    stackPositionPx: 0,
    scaleEndPositionPx: 0,
    endElementTop: 0,
  });

  const parsePercentage = useCallback((value: string | number, containerHeight: number) => {
    if (typeof value === 'string' && value.includes('%')) {
      return (parseFloat(value) / 100) * containerHeight;
    }
    return parseFloat(value as string);
  }, []);

  const getScrollData = useCallback(() => {
    if (useWindowScroll) {
      return {
        scrollTop: window.scrollY,
        containerHeight: window.innerHeight,
        scrollContainer: document.documentElement
      };
    } else {
      const scroller = scrollerRef.current;
      return {
        scrollTop: scroller!.scrollTop,
        containerHeight: scroller!.clientHeight,
        scrollContainer: scroller!
      };
    }
  }, [useWindowScroll]);

  const getElementOffset = useCallback(
    (element: HTMLElement) => {
      if (useWindowScroll) {
        const rect = element.getBoundingClientRect();
        return rect.top + window.scrollY;
      } else {
        return element.offsetTop;
      }
    },
    [useWindowScroll]
  );

  const updateCardTransforms = useCallback(() => {
    if (!cardsRef.current.length) return;

    const { scrollTop, containerHeight } = getScrollData();
    
    // Use cached values if container height hasn't changed
    const cache = cachedValuesRef.current;
    
    cardsRef.current.forEach((card, i) => {
      if (!card) return;

      const cardTop = getElementOffset(card);
      const triggerStart = cardTop - cache.stackPositionPx - itemStackDistance * i;
      const triggerEnd = cardTop - cache.scaleEndPositionPx;
      const pinStart = triggerStart;
      const pinEnd = cache.endElementTop - containerHeight / 2;

      // Calculate progress (0 to 1)
      let scaleProgress = 0;
      if (scrollTop < triggerStart) {
        scaleProgress = 0;
      } else if (scrollTop > triggerEnd) {
        scaleProgress = 1;
      } else {
        scaleProgress = (scrollTop - triggerStart) / (triggerEnd - triggerStart);
      }

      const targetScale = baseScale + i * itemScale;
      const scale = 1 - scaleProgress * (1 - targetScale);
      const rotation = rotationAmount ? i * rotationAmount * scaleProgress : 0;

      let blur = 0;
      if (blurAmount) {
        let topCardIndex = 0;
        for (let j = 0; j < cardsRef.current.length; j++) {
          const jCardTop = getElementOffset(cardsRef.current[j]);
          const jTriggerStart = jCardTop - cache.stackPositionPx - itemStackDistance * j;
          if (scrollTop >= jTriggerStart) {
            topCardIndex = j;
          }
        }

        if (i < topCardIndex) {
          const depthInStack = topCardIndex - i;
          blur = Math.max(0, depthInStack * blurAmount);
        }
      }

      let translateY = 0;
      const isPinned = scrollTop >= pinStart && scrollTop <= pinEnd;

      if (isPinned) {
        translateY = scrollTop - cardTop + cache.stackPositionPx + itemStackDistance * i;
      } else if (scrollTop > pinEnd) {
        translateY = pinEnd - cardTop + cache.stackPositionPx + itemStackDistance * i;
      }

      // Use will-change and transform3d for GPU acceleration
      const transformValue = `translate3d(0, ${translateY.toFixed(2)}px, 0) scale(${scale.toFixed(4)}) rotateZ(${rotation.toFixed(2)}deg)`;
      
      // Batch DOM updates
      if (card.style.transform !== transformValue) {
        card.style.transform = transformValue;
      }
      
      if (blur > 0) {
        const filterValue = `blur(${blur.toFixed(2)}px)`;
        if (card.style.filter !== filterValue) {
          card.style.filter = filterValue;
        }
      } else if (card.style.filter) {
        card.style.filter = '';
      }

      // Check completion only for last card
      if (i === cardsRef.current.length - 1) {
        const isInView = scrollTop >= pinStart && scrollTop <= pinEnd;
        if (isInView && !stackCompletedRef.current) {
          stackCompletedRef.current = true;
          onStackComplete?.();
        } else if (!isInView && stackCompletedRef.current) {
          stackCompletedRef.current = false;
        }
      }
    });
  }, [
    itemScale,
    itemStackDistance,
    baseScale,
    rotationAmount,
    blurAmount,
    onStackComplete,
    getScrollData,
    getElementOffset
  ]);

  const setupLenis = useCallback(() => {
    if (useWindowScroll) {
      const lenis = new Lenis({
        duration: 1.2,
        easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
        touchMultiplier: 2,
        infinite: false,
        wheelMultiplier: 1,
        lerp: 0.1,
        syncTouch: true,
        syncTouchLerp: 0.075
      });

      // Use Lenis scroll event instead of creating RAF loop
      lenis.on('scroll', () => {
        if (!rafIdRef.current) {
          rafIdRef.current = requestAnimationFrame(() => {
            updateCardTransforms();
            rafIdRef.current = null;
          });
        }
      });

      lenisRef.current = lenis;
      return lenis;
    } else {
      const scroller = scrollerRef.current;
      if (!scroller) return;

      const lenis = new Lenis({
        wrapper: scroller,
        content: scroller.querySelector('.scroll-stack-inner') as HTMLElement,
        duration: 1.2,
        easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
        touchMultiplier: 2,
        infinite: false,
        gestureOrientation: 'vertical',
        wheelMultiplier: 1,
        lerp: 0.1,
        syncTouch: true,
        syncTouchLerp: 0.075
      });

      lenis.on('scroll', () => {
        if (!rafIdRef.current) {
          rafIdRef.current = requestAnimationFrame(() => {
            updateCardTransforms();
            rafIdRef.current = null;
          });
        }
      });

      lenisRef.current = lenis;
      return lenis;
    }
  }, [updateCardTransforms, useWindowScroll]);

  useLayoutEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;

    const cards = Array.from(
      useWindowScroll
        ? document.querySelectorAll('.scroll-stack-card')
        : scroller.querySelectorAll('.scroll-stack-card')
    ) as HTMLElement[];

    cardsRef.current = cards;

    // Cache parsed values
    const { containerHeight } = getScrollData();
    cachedValuesRef.current.stackPositionPx = parsePercentage(stackPosition, containerHeight);
    cachedValuesRef.current.scaleEndPositionPx = parsePercentage(scaleEndPosition, containerHeight);
    
    const endElement = useWindowScroll
      ? (document.querySelector('.scroll-stack-end') as HTMLElement)
      : (scroller.querySelector('.scroll-stack-end') as HTMLElement);
    
    if (endElement) {
      cachedValuesRef.current.endElementTop = getElementOffset(endElement);
    }

    // Setup cards with optimized styles
    cards.forEach((card, i) => {
      if (i < cards.length - 1) {
        card.style.marginBottom = `${itemDistance}px`;
      }
      card.style.willChange = 'transform';
      card.style.transformOrigin = 'top center';
      card.style.backfaceVisibility = 'hidden';
      card.style.transform = 'translateZ(0)';
    });

    const lenis = setupLenis();

    // Lenis RAF loop
    function raf(time: number) {
      lenis?.raf(time);
      requestAnimationFrame(raf);
    }
    
    const rafId = requestAnimationFrame(raf);
    
    // Initial update
    updateCardTransforms();

    // Update cached values on resize
    const handleResize = () => {
      const { containerHeight } = getScrollData();
      cachedValuesRef.current.stackPositionPx = parsePercentage(stackPosition, containerHeight);
      cachedValuesRef.current.scaleEndPositionPx = parsePercentage(scaleEndPosition, containerHeight);
      
      const endElement = useWindowScroll
        ? (document.querySelector('.scroll-stack-end') as HTMLElement)
        : (scroller.querySelector('.scroll-stack-end') as HTMLElement);
      
      if (endElement) {
        cachedValuesRef.current.endElementTop = getElementOffset(endElement);
      }
      
      updateCardTransforms();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      if (lenisRef.current) {
        lenisRef.current.destroy();
      }
      if (rafIdRef.current) {
        cancelAnimationFrame(rafIdRef.current);
      }
      cancelAnimationFrame(rafId);
      window.removeEventListener('resize', handleResize);
      stackCompletedRef.current = false;
      cardsRef.current = [];
    };
  }, [
    itemDistance,
    itemScale,
    itemStackDistance,
    stackPosition,
    scaleEndPosition,
    baseScale,
    scaleDuration,
    rotationAmount,
    blurAmount,
    useWindowScroll,
    onStackComplete,
    setupLenis,
    updateCardTransforms,
    getScrollData,
    getElementOffset,
    parsePercentage
  ]);

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
      <div className="scroll-stack-inner">
        {children}
        <div className="scroll-stack-end" style={{ height: '50vh' }} />
      </div>
    </div>
  );
};

export default ScrollStack;

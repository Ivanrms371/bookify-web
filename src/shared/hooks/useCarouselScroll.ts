import { useCallback, useEffect, useRef, useState } from 'react';

interface UseCarouselScrollOptions {
  itemTotalWidth: number;
}

export const useCarouselScroll = <T extends HTMLElement = HTMLDivElement>({
  itemTotalWidth,
}: UseCarouselScrollOptions) => {
  const containerRef = useRef<T>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScrollLimits = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;

    const { scrollLeft, scrollWidth, clientWidth } = container;
    setCanScrollLeft(scrollLeft > 2);
    setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 2);
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    checkScrollLimits();

    container.addEventListener('scroll', checkScrollLimits, { passive: true });
    window.addEventListener('resize', checkScrollLimits);

    return () => {
      container.removeEventListener('scroll', checkScrollLimits);
      window.removeEventListener('resize', checkScrollLimits);
    };
  }, [checkScrollLimits]);

  const scroll = useCallback(
    (direction: 'left' | 'right') => {
      const container = containerRef.current;
      if (!container) return;

      const visibleItems = Math.max(
        1,
        Math.floor(container.clientWidth / itemTotalWidth)
      );

      const currentItemIndex = Math.round(
        container.scrollLeft / itemTotalWidth
      );

      const targetIndex =
        direction === 'left'
          ? Math.max(0, currentItemIndex - visibleItems)
          : currentItemIndex + visibleItems;

      container.scrollTo({
        left: targetIndex * itemTotalWidth,
        behavior: 'smooth',
      });
    },
    [itemTotalWidth]
  );

  return {
    containerRef,
    canScrollLeft,
    canScrollRight,
    scroll,
    checkScrollLimits,
  };
};

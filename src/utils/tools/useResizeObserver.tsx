import { useEffect, useState } from "react";

export function useResizeObserver(parentRef: React.RefObject<HTMLElement>, maxWidth: number = 600) {
  const [isSmall, setIsSmall] = useState(false);

  useEffect(() => {
    const parentElement = parentRef.current;

    if (!parentElement) return;

    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const width = entry.contentRect.width;
        setIsSmall(width <= maxWidth);
      }
    });

    resizeObserver.observe(parentElement);

    return () => resizeObserver.disconnect();
  }, [parentRef, maxWidth]);

  return isSmall;
}

export function useHeightObserver(parentRef: React.RefObject<HTMLElement>) {
  const [height, setHeight] = useState<number | null>(null);

  useEffect(() => {
    const parentElement = parentRef.current;

    if (!parentElement) return;

    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const height = entry.contentRect.height;
        setHeight(height);
      }
    });

    resizeObserver.observe(parentElement);

    return () => resizeObserver.disconnect();
  }, [parentRef]);

  return height;
}
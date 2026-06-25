import { useState, useEffect } from 'react';

/**
 * Animated count-up hook.
 * Counts from 0 to `endVal` over `durationMs` milliseconds with ease-out.
 */
export function useCountUp(
  endVal: any,
  durationMs: number = 1400,
  formatNumber: boolean = false
): string | number {
  const [count, setCount] = useState<string | number>(0);
  const endNum = parseFloat(String(endVal).replace(/[^\d.-]/g, ''));
  const isNumeric = !isNaN(endNum);

  useEffect(() => {
    if (!isNumeric) { setCount(endVal); return; }
    let startTime: number | null = null;
    const parts = String(endVal).split('.');
    const decimalPlaces = parts[1] ? parts[1].length : 0;

    const fmt = (n: number): string | number => {
      const s = n.toFixed(decimalPlaces);
      if (formatNumber) return parseFloat(s).toLocaleString(undefined, { minimumFractionDigits: decimalPlaces, maximumFractionDigits: decimalPlaces });
      return s;
    };

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      const t = Math.min(progress / durationMs, 1);
      const ease = t * (2 - t);
      setCount(fmt(ease * endNum));
      if (progress < durationMs) requestAnimationFrame(animate);
      else setCount(fmt(endNum));
    };

    const af = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(af);
  }, [endVal, durationMs, isNumeric, formatNumber]);

  return count;
}

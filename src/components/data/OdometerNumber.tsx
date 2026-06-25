import React, { useEffect, useState } from 'react';

// ─────────────────────────────────────────────────────────────────────────────
// OdometerDigit — a single digit slot that scrolls vertically like an odometer
// ─────────────────────────────────────────────────────────────────────────────
interface OdometerDigitProps {
  digit: string;          // '0'–'9'
  delay: number;          // animation delay in seconds
  duration: number;       // total animation duration in seconds
  isPlaying: boolean;
}

const OdometerDigit: React.FC<OdometerDigitProps> = ({ digit, delay, duration, isPlaying }) => {
  const targetIndex = parseInt(digit, 10); // 0–9

  // Digits scroll from 9 → 0 → targetIndex (i.e. they always roll forward)
  // We render [0,1,2,...,9,0,1,...,targetIndex] — a strip of 10+targetIndex+1 items
  // then translate Y to land on targetIndex
  const STRIP = ['0','1','2','3','4','5','6','7','8','9'];

  // We animate translateY from 0 (showing '0' at top) down to targetIndex
  const [translate, setTranslate] = useState<number>(0);

  useEffect(() => {
    if (!isPlaying) {
      setTranslate(0);
      return;
    }
    const timer = setTimeout(() => {
      setTranslate(targetIndex);
    }, delay * 1000);
    return () => clearTimeout(timer);
  }, [isPlaying, targetIndex, delay]);

  return (
    <span
      className="odometer-digit-slot"
      aria-hidden="true"
    >
      <span
        className="odometer-digit-strip"
        style={{
          transform: `translateY(calc(-${translate} * 1em))`,
          transition: isPlaying
            ? `transform ${duration}s cubic-bezier(0.22, 1, 0.36, 1) ${delay}s`
            : 'none',
        }}
      >
        {STRIP.map((d, i) => (
          <span key={i} className="odometer-digit-cell">{d}</span>
        ))}
      </span>
    </span>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// OdometerNumber — splits any formatted string into digit/non-digit tokens
// and animates each digit slot independently
// ─────────────────────────────────────────────────────────────────────────────
interface OdometerNumberProps {
  value: string | number;
  isPlaying: boolean;
  duration?: number;     // total roll animation duration, default 1.4s
  baseDelay?: number;    // base start delay before digits begin, default 0s
  className?: string;
  style?: React.CSSProperties;
}

export const OdometerNumber: React.FC<OdometerNumberProps> = ({
  value,
  isPlaying,
  duration = 1.4,
  baseDelay = 0,
  className = '',
  style,
}) => {
  const str = String(value);

  // Split into tokens: digits and non-digits
  const tokens: { type: 'digit' | 'char'; char: string }[] = [];
  for (const ch of str) {
    if (/\d/.test(ch)) {
      tokens.push({ type: 'digit', char: ch });
    } else {
      tokens.push({ type: 'char', char: ch });
    }
  }

  // Count digit positions for stagger
  const digitCount = tokens.filter(t => t.type === 'digit').length;
  let digitIdx = 0;

  return (
    <span
      className={`odometer-number ${className}`}
      style={style}
      aria-label={str}
    >
      {tokens.map((token, i) => {
        if (token.type === 'char') {
          return (
            <span key={i} className="odometer-static-char">
              {token.char}
            </span>
          );
        }
        // Stagger: earlier (leftmost) digits animate slightly later
        // so digits reveal right-to-left like a real odometer
        const currentIdx = digitIdx++;
        const staggerDelay = baseDelay + (digitCount - 1 - currentIdx) * 0.06;
        return (
          <OdometerDigit
            key={i}
            digit={token.char}
            delay={staggerDelay}
            duration={duration}
            isPlaying={isPlaying}
          />
        );
      })}
    </span>
  );
};

import React, { useState, useEffect, useRef } from 'react';
import type { ComponentDefinition } from '../../types';
import { resolveProp } from '../../utils/resolve';
import { getLayoutStyles } from '../layout/LayoutWrapper';
import { OdometerNumber } from './OdometerNumber';

interface DataProps {
  component: ComponentDefinition;
  variables: Record<string, any>;
}

// ─── Hook: watch for .play class on ancestor .dash-slide-frame ────────────────
function useSlidePlay(ref: React.RefObject<HTMLElement | null>): boolean {
  const [isPlaying, setIsPlaying] = useState(() => {
    if (typeof document !== 'undefined') {
      return !document.querySelector('.dash-slide-frame');
    }
    return false;
  });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const frame = el.closest('.dash-slide-frame') as HTMLElement | null;
    if (!frame) {
      setIsPlaying(true);
      return;
    }

    setIsPlaying(frame.classList.contains('play'));

    const observer = new MutationObserver(() => {
      setIsPlaying(frame.classList.contains('play'));
    });

    observer.observe(frame, { attributes: true, attributeFilter: ['class'] });
    return () => observer.disconnect();
  }, [ref]);

  return isPlaying;
}

// ════════════════════════════════════════════════════════════════════════════
// 1. KPI Card
// ════════════════════════════════════════════════════════════════════════════
export const KPICard: React.FC<DataProps> = ({ component, variables }) => {
  const rawValue   = resolveProp('value',  component.dataBindings, variables, component.localProps);
  const suffix     = resolveProp('suffix', component.dataBindings, variables, component.localProps) || '';
  const prefix     = resolveProp('prefix', component.dataBindings, variables, component.localProps) || '';
  const label      = resolveProp('label',  component.dataBindings, variables, component.localProps) || 'Metric';
  const trend      = component.localProps?.trend || '';
  const trendDirection = component.localProps?.trendDirection || 'up';
  const formatNumber   = component.localProps?.formatNumber || false;
  const stagger = component.localProps?.stagger !== undefined ? component.localProps.stagger : 6.0;
  const style = getLayoutStyles(component.layout);

  const rootRef = useRef<HTMLDivElement>(null);
  const isPlaying = useSlidePlay(rootRef as React.RefObject<HTMLElement | null>);

  // Format the raw value into a display string
  const displayValue = (() => {
    const num = parseFloat(String(rawValue).replace(/[^\d.-]/g, ''));
    if (!isNaN(num) && formatNumber) {
      const parts = String(rawValue).split('.');
      const dec = parts[1] ? parts[1].length : 0;
      return num.toLocaleString(undefined, { minimumFractionDigits: dec, maximumFractionDigits: dec });
    }
    return String(rawValue);
  })();

  return (
    <div
      id={component.id}
      ref={rootRef}
      className="dash-kpi-card animate-fade-up"
      style={{ ...style, '--stagger-delay': stagger } as React.CSSProperties}
    >
      <span className="kpi-label">{label}</span>
      <div className="kpi-value-container">
        {prefix && <span className="kpi-prefix">{prefix}</span>}
        <OdometerNumber
          value={displayValue}
          isPlaying={isPlaying}
          duration={1.6}
          baseDelay={stagger * 0.1}
          className="kpi-value"
        />
        {suffix && <span className="kpi-suffix">{suffix}</span>}
      </div>
      {trend && (
        <div className={`kpi-trend trend-${trendDirection}`}>
          {trendDirection === 'up' && '↑'}
          {trendDirection === 'down' && '↓'}
          <span> {trend}</span>
        </div>
      )}
    </div>
  );
};

// ════════════════════════════════════════════════════════════════════════════
// 2. Bar Chart
// ════════════════════════════════════════════════════════════════════════════
export const BarChart: React.FC<DataProps> = ({ component, variables: _variables }) => {
  const data       = component.localProps?.data || [];
  const unit       = component.localProps?.unit || '';
  const maxValue   = component.localProps?.maxValue || 100;
  const layoutType = component.localProps?.layoutType || 'horizontal';
  const style      = getLayoutStyles(component.layout);

  if (data.length === 0) {
    return (
      <div className="dash-bar-chart animate-fade-up" style={{ ...style, alignItems: 'center', justifyContent: 'center' }}>
        <span style={{ color: 'var(--t3)', fontSize: 'var(--font-size-body)', fontFamily: 'var(--font-body)' }}>No data</span>
      </div>
    );
  }

  const values = data.map((item: any) => item.value ?? 0);
  const minVal = Math.min(0, ...values);
  const maxVal = Math.max(0, ...values, maxValue);
  const range  = maxVal - minVal || 1; // prevent division-by-zero when all values are identical
  const zeroPercent = (Math.abs(minVal) / range) * 100;

  // ── Root ref to detect .play ──────────────────────────────────────────────
  const rootRef = useRef<HTMLDivElement>(null);
  const isPlaying = useSlidePlay(rootRef as React.RefObject<HTMLElement | null>);

  const stagger = component.localProps?.stagger !== undefined ? component.localProps.stagger : 7.5;

  // ─ Vertical bar chart ──────────────────────────────────────────────────────
  if (layoutType === 'vertical') {
    return (
      <div
        ref={rootRef}
        className="dash-bar-chart bar-chart-vertical animate-fade-up"
        style={{ ...style, '--stagger-delay': stagger, '--chart-stagger': stagger } as React.CSSProperties}
      >
        <div className="bar-chart-columns-wrapper">
          {data.map((item: any, index: number) => {
            const valPercent = range === 0 ? 0 : (Math.abs(item.value) / range) * 100;
            const isNegative = item.value < 0;
            const animatedH  = isPlaying ? `${valPercent}%` : '0%';
            const bottomPos  = isNegative
              ? `${zeroPercent - valPercent}%`
              : `${zeroPercent}%`;
            const delay = 0.08 + index * 0.1;

            return (
              <div
                key={index}
                className={`bar-column-wrapper ${item.highlight ? 'bar-highlighted' : ''}`}
                style={{ overflow: 'visible' }}
              >
                {/* Value label above bar */}
                <div
                  className="bar-value-top animate-fade-up"
                  style={{
                    position: 'relative',
                    textAlign: 'center',
                    marginBottom: '6px',
                    whiteSpace: 'nowrap',
                    zIndex: 10,
                    color: item.textColor || (isNegative
                      ? 'var(--color-negative, #EF9A9A)'
                      : (item.highlight ? 'var(--gold-l)' : 'var(--t1)')),
                    '--stagger-delay': `calc(var(--chart-stagger, ${stagger}) + ${index + 2})`,
                  } as React.CSSProperties}
                >
                  {item.prefix || component.localProps?.prefix || ''}{item.value}{unit}
                </div>

                {/* Bar track */}
                <div className="bar-column-track" style={{ flex: 1, position: 'relative' }}>
                  <div className="bar-column-axis-line" style={{ bottom: `${zeroPercent}%` }} />
                  <div
                    className="bar-column-fill"
                    style={{
                      height: animatedH,
                      bottom: bottomPos,
                      position: 'absolute',
                      width: '100%',
                      left: 0,
                      transformOrigin: isNegative ? 'top' : 'bottom',
                      background: item.color || (isNegative
                        ? (item.highlight
                          ? 'linear-gradient(to bottom, var(--color-negative, #ef9a9a), #ffcdd2)'
                          : 'linear-gradient(to bottom, var(--color-negative-strong, #e57373), var(--color-negative, #ef9a9a))')
                        : (item.highlight
                          ? 'linear-gradient(to top, var(--gold-dim), var(--gold-l))'
                          : 'linear-gradient(to top, var(--gold-dim), var(--gold))')),
                      boxShadow: item.shadow || (isNegative
                        ? (item.highlight ? '0 4px 16px rgba(229,115,115,0.45)' : 'none')
                        : (item.highlight ? '0 -6px 24px rgba(201,168,76,0.35)' : 'none')),
                      borderRadius: isNegative ? '0 0 8px 8px' : '8px 8px 0 0',
                      transition: `height 1.1s cubic-bezier(0.25,1,0.5,1) calc(var(--chart-stagger, ${stagger}) * 0.1s + ${delay}s), opacity 0.4s ease calc(var(--chart-stagger, ${stagger}) * 0.1s + ${delay}s)`,
                      opacity: isPlaying ? 1 : 0,
                    }}
                  />
                </div>

                <div className="bar-column-label">{item.label}</div>
                {item.subLabel && (
                  <div
                    className="bar-column-sublabel animate-fade-up"
                    style={{
                      fontWeight: 800,
                      fontSize: 'calc(var(--font-size-body) * 0.95)',
                      color: item.highlight ? 'var(--gold-l)' : 'var(--t1)',
                      marginTop: '4px',
                      textAlign: 'center',
                      fontFamily: 'Inter Tight, sans-serif',
                      '--stagger-delay': `calc(var(--chart-stagger, ${stagger}) + ${index + 3})`,
                    } as React.CSSProperties}
                  >
                    {item.subLabel}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  // ─ Horizontal bar chart ────────────────────────────────────────────────────
  return (
    <div
      ref={rootRef}
      className="dash-bar-chart bar-chart-horizontal animate-fade-up"
      style={{ ...style, '--stagger-delay': stagger, '--chart-stagger': stagger } as React.CSSProperties}
    >
      <div className="bar-chart-bars">
        {data.map((item: any, index: number) => {
          const valPercent = range === 0 ? 0 : (Math.abs(item.value) / range) * 100;
          const isNegative = item.value < 0;
          const zeroLeft   = range === 0 ? 50 : (Math.abs(minVal) / range) * 100;
          const delay      = 0.08 + index * 0.12;

          const animatedW  = isPlaying ? `${valPercent}%` : '0%';

          return (
            <div
              key={index}
              className={`bar-row ${item.highlight ? 'bar-highlighted' : ''}`}
              style={{ display: 'flex', alignItems: 'center', gap: '12px', width: '100%' }}
            >
              <div
                className="bar-label animate-fade-up"
                style={{
                  width: '36%',
                  flexShrink: 0,
                  lineHeight: 1.3,
                  '--stagger-delay': `calc(var(--chart-stagger, ${stagger}) + ${index})`,
                } as React.CSSProperties}
              >
                {item.label}
              </div>

              <div style={{ flex: 1, position: 'relative', height: '40px' }}>
                {/* Background track */}
                <div style={{
                  position: 'absolute', inset: 0,
                  background: 'rgba(201,168,76,0.18)',
                  borderRadius: '20px',
                }} />
                {/* Zero axis line */}
                <div style={{
                  left: `${zeroLeft}%`,
                  position: 'absolute', top: 0, bottom: 0,
                  width: '1px',
                  background: 'rgba(201,168,76,0.25)',
                  zIndex: 3,
                }} />
                {/* Animated fill */}
                <div
                  className="bar-fill"
                  style={{
                    width: animatedW,
                    left: isNegative
                      ? `calc(${zeroLeft}% - ${animatedW})`
                      : `${zeroLeft}%`,
                    position: 'absolute',
                    height: '100%',
                    top: 0,
                    borderRadius: '20px',
                    background: isNegative
                      ? (item.highlight
                        ? 'linear-gradient(to left, var(--color-negative, #ef9a9a), #ffcdd2)'
                        : 'linear-gradient(to left, var(--color-negative-strong, #e57373), var(--color-negative, #ef9a9a))')
                      : (item.highlight
                        ? 'linear-gradient(to right, var(--gold-dim), var(--gold-l))'
                        : 'linear-gradient(to right, var(--gold-dim), var(--gold))'),
                    boxShadow: isNegative
                      ? (item.highlight ? '0 0 18px rgba(229,115,115,0.4)' : 'none')
                      : (item.highlight ? '0 0 18px rgba(201,168,76,0.3)' : 'none'),
                    transition: `width 1.2s cubic-bezier(0.25,1,0.5,1) calc(var(--chart-stagger, ${stagger}) * 0.1s + ${delay}s), opacity 0.3s ease calc(var(--chart-stagger, ${stagger}) * 0.1s + ${delay}s)`,
                    opacity: isPlaying ? 1 : 0,
                  }}
                />
              </div>

              {/* Value label — always outside bar, never clipped */}
              <div
                className="bar-value animate-fade-up"
                style={{
                  minWidth: '64px',
                  textAlign: 'left',
                  flexShrink: 0,
                  fontWeight: 700,
                  color: isNegative
                    ? 'var(--color-negative, #EF9A9A)'
                    : (item.highlight ? 'var(--gold-l)' : 'var(--t1)'),
                  fontFamily: "'Inter Tight', sans-serif",
                  fontSize: 'var(--font-size-body)',
                  whiteSpace: 'nowrap',
                  '--stagger-delay': `calc(var(--chart-stagger, ${stagger}) + ${index + 1})`,
                } as React.CSSProperties}
              >
                {item.prefix || component.localProps?.prefix || ''}{item.value}{unit}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

// ════════════════════════════════════════════════════════════════════════════
// 3. Donut Chart — large thick ring style (matches reference image)
// ════════════════════════════════════════════════════════════════════════════
export const DonutChart: React.FC<DataProps> = ({ component, variables: _variables }) => {
  const data        = component.localProps?.data || [];
  const showLegend  = component.localProps?.showLegend !== false;
  const style       = getLayoutStyles(component.layout);

  const rootRef  = useRef<HTMLDivElement>(null);
  const isPlaying = useSlidePlay(rootRef as React.RefObject<HTMLElement | null>);

  // SVG donut parameters
  const cx = 100, cy = 100, r = 70;
  const strokeWidth = 42;
  const circumference = 2 * Math.PI * r;

  const total = data.reduce((acc: number, cur: any) => acc + (cur.value || 0), 0);
  const DEFAULT_COLORS = ['#C9A84C', '#D0CFCE', '#8A8A8A', '#444444'];

  if (total === 0 || data.length === 0) {
    return (
      <div className="dash-donut-chart animate-fade-up" style={{ ...style, alignItems: 'center', justifyContent: 'center' }}>
        <span style={{ color: 'var(--t3)', fontSize: 'var(--font-size-body)', fontFamily: 'var(--font-body)' }}>
          No data
        </span>
      </div>
    );
  }

  /*
   * Correct SVG donut segment rendering using strokeDasharray positioning:
   *   strokeDasharray  = "segLen  (circumference - segLen)"  — segment length + gap to fill rest
   *   strokeDashoffset = circumference - startLen             — shifts segment to correct start position
   *
   * The SVG ring starts at 3 o'clock by default. We rotate the entire group by -90°
   * so segments start at 12 o'clock (top).
   *
   * Animation: dashoffset moves from circumference (0 visible) → positionedOffset (segment visible).
   */
  let cumulativeLen = 0;
  const segments = data.map((item: any, i: number) => {
    const segLen = (item.value / total) * circumference;
    const startLen = cumulativeLen;
    cumulativeLen += segLen;

    const color = item.color || DEFAULT_COLORS[i % DEFAULT_COLORS.length];
    const positionedOffset = circumference - startLen; // places segment at its correct arc position

    return { segLen, startLen, color, positionedOffset, label: item.label, value: item.value };
  });

  const stagger = component.localProps?.stagger !== undefined ? component.localProps.stagger : 7.5;

  return (
    <div
      ref={rootRef}
      className="dash-donut-chart animate-fade-up"
      style={{ ...style, '--stagger-delay': stagger, '--chart-stagger': stagger } as React.CSSProperties}
    >
      {/* SVG ring */}
      <div className="donut-svg-container">
        <svg viewBox="0 0 200 200" width="100%" height="100%" className="donut-svg">
          {/* Background track */}
          <circle
            cx={cx} cy={cy} r={r}
            fill="transparent"
            stroke="rgba(201,168,76,0.06)"
            strokeWidth={strokeWidth}
          />

          {/* Rotate group so segments start at 12 o'clock */}
          <g transform={`rotate(-90 ${cx} ${cy})`}>
            {segments.map((seg: any, i: number) => {
              const delay = 0.15 + i * 0.18;
              // When playing: offset = positioned value (segment visible at correct arc)
              // When not playing: offset = circumference (entire segment hidden)
              const dashOffset = isPlaying ? seg.positionedOffset : circumference;

              return (
                <circle
                  key={i}
                  cx={cx} cy={cy} r={r}
                  fill="transparent"
                  stroke={seg.color}
                  strokeWidth={strokeWidth}
                  strokeDasharray={`${seg.segLen} ${circumference - seg.segLen}`}
                  strokeDashoffset={dashOffset}
                  strokeLinecap="butt"
                  style={{
                    transition: `stroke-dashoffset 1.3s cubic-bezier(0.25,1,0.5,1) calc(var(--chart-stagger, ${stagger}) * 0.1s + ${delay}s)`,
                  }}
                />
              );
            })}
          </g>
        </svg>
      </div>

      {/* Legend */}
      {showLegend && (
        <div className="donut-legend">
          {segments.map((seg: any, i: number) => (
            <div
              key={i}
              className="legend-item animate-fade-up"
              style={{ '--stagger-delay': `calc(var(--chart-stagger, ${stagger}) + ${i + 2})` } as React.CSSProperties}
            >
              <span className="legend-dot" style={{ backgroundColor: seg.color }} />
              <span className="legend-lbl">{seg.label}</span>
              <span className="legend-val" style={{ color: seg.color === '#C9A84C' ? 'var(--gold-l)' : 'var(--t2)' }}>
                {seg.value}%
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// ════════════════════════════════════════════════════════════════════════════
// 4. Line Chart
// ════════════════════════════════════════════════════════════════════════════
export const LineChart: React.FC<DataProps> = ({ component, variables: _variables }) => {
  const points      = component.localProps?.points || [];
  const labels      = component.localProps?.labels || [];
  const accentColor = component.localProps?.accentColor || '#C9A84C';
  const yAxisLabel  = component.localProps?.yAxisLabel || '';
  const style       = getLayoutStyles(component.layout);

  const width = 500, height = 220, paddingX = 40, paddingY = 30;

  // Guard: need at least 2 points to draw a line
  if (points.length < 2) {
    return (
      <div className="dash-line-chart animate-fade-up" style={{ ...style, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <span style={{ color: 'var(--t3)', fontSize: 'var(--font-size-body)', fontFamily: 'var(--font-body)' }}>
          Add at least 2 data points to render chart
        </span>
      </div>
    );
  }

  const maxVal = Math.max(...points) * 1.15;
  const minVal = 0;
  const valRange = maxVal - minVal || 1; // prevent division by zero when all points are 0

  const svgPoints = points.map((val: number, idx: number) => {
    const x = paddingX + (idx / (points.length - 1)) * (width - 2 * paddingX);
    const y = height - paddingY - ((val - minVal) / valRange) * (height - 2 * paddingY);
    return { x, y, value: val };
  });

  const linePath = svgPoints.reduce((acc: string, pt: any, idx: number) =>
    acc + `${idx === 0 ? 'M' : 'L'} ${pt.x} ${pt.y}`, '');

  const fillPath = linePath
    ? `${linePath} L ${svgPoints[svgPoints.length - 1].x} ${height - paddingY} L ${svgPoints[0].x} ${height - paddingY} Z`
    : '';

  const stagger = component.localProps?.stagger !== undefined ? component.localProps.stagger : 7.5;

  return (
    <div
      className="dash-line-chart animate-fade-up"
      style={{ ...style, '--stagger-delay': stagger, '--chart-stagger': stagger } as React.CSSProperties}
    >
      <svg viewBox={`0 0 ${width} ${height}`} width="100%" height="100%" className="line-chart-svg">
        <defs>
          <linearGradient id="lineGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%"   stopColor={accentColor} stopOpacity="0.35" />
            <stop offset="100%" stopColor={accentColor} stopOpacity="0.0" />
          </linearGradient>
        </defs>
        {yAxisLabel && (
          <text x={paddingX} y={paddingY - 10} fill="rgba(237,232,223,0.3)" fontSize="10px"
            fontFamily="'Inter Tight',sans-serif" fontWeight="600">{yAxisLabel}</text>
        )}
        {[0, 0.25, 0.5, 0.75, 1].map((ratio, gIdx) => {
          const gy = paddingY + ratio * (height - 2 * paddingY);
          return <line key={gIdx} x1={paddingX} y1={gy} x2={width - paddingX} y2={gy}
            stroke="rgba(201,168,76,0.08)" strokeDasharray="4,4" />;
        })}
        {fillPath && (
          <path
            d={fillPath}
            fill="url(#lineGrad)"
            className="chart-fill animate-fade-up"
            style={{ '--stagger-delay': `calc(var(--chart-stagger, ${stagger}) + 0)` } as React.CSSProperties}
          />
        )}
        {linePath && (
          <path d={linePath} fill="none" stroke={accentColor} strokeWidth="5"
            strokeLinecap="round" strokeLinejoin="round"
            className="chart-line animate-draw"
            style={{ '--stagger-delay': `calc(var(--chart-stagger, ${stagger}) + 1)` } as React.CSSProperties}
          />
        )}
        {svgPoints.map((pt: any, idx: number) => (
          <g key={idx} className="chart-node-group">
            <circle cx={pt.x} cy={pt.y} r="8" fill="#05080F" stroke={accentColor} strokeWidth="2.5"
              className="chart-node animate-fade-up"
              style={{ '--stagger-delay': `calc(var(--chart-stagger, ${stagger}) + ${idx + 2})` } as React.CSSProperties}
            />
            <text x={pt.x} y={pt.y - 12} textAnchor="middle"
              fill="rgba(255,255,255,0.8)" fontSize="10px" fontWeight="bold" fontFamily="sans-serif"
              className="chart-node-value"
            >{pt.value}</text>
          </g>
        ))}
        {labels.length > 0 && labels.map((lbl: string, idx: number) => {
          const labelX = labels.length === 1
            ? paddingX + (width - 2 * paddingX) / 2
            : paddingX + (idx / (labels.length - 1)) * (width - 2 * paddingX);
          return (
            <text key={idx} x={labelX} y={height - 8} textAnchor="middle"
              fill="rgba(237,232,223,0.3)" fontSize="11px" fontFamily="'Inter Tight',sans-serif">
              {lbl}
            </text>
          );
        })}
      </svg>
    </div>
  );
};

// ════════════════════════════════════════════════════════════════════════════
// 5. Comparison Chart
// ════════════════════════════════════════════════════════════════════════════
const BriefcaseIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
    <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
  </svg>
);

const CalendarIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
    <line x1="16" y1="2" x2="16" y2="6" />
    <line x1="8" y1="2" x2="8" y2="6" />
    <line x1="3" y1="10" x2="21" y2="10" />
    <circle cx="8" cy="14" r="1.2" fill="currentColor" />
    <circle cx="12" cy="14" r="1.2" fill="currentColor" />
    <circle cx="16" cy="14" r="1.2" fill="currentColor" />
    <circle cx="8" cy="18" r="1.2" fill="currentColor" />
    <circle cx="12" cy="18" r="1.2" fill="currentColor" />
    <circle cx="16" cy="18" r="1.2" fill="currentColor" />
  </svg>
);

const ExplodedPieChart: React.FC = () => {
  return (
    <svg width="38" height="38" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ flexShrink: 0 }}>
      {/* Large left/bottom slice */}
      <path d="M46 52 L46 12 A40 40 0 1 0 81.3 69.5 Z" fill="#D4AF37" />
      {/* Top-right slice */}
      <path d="M54 46 L88.6 60 A40 40 0 0 0 54 6" fill="#F5E3A0" stroke="#05080F" strokeWidth="2" strokeLinejoin="round" />
      {/* Small bottom-right slice */}
      <path d="M54 54 L82.8 72 A40 40 0 0 1 54 94" fill="#997315" stroke="#05080F" strokeWidth="2" strokeLinejoin="round" />
    </svg>
  );
};

const Nifty500Logo: React.FC = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
        <svg width="24" height="24" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Left curve (blue-indigo) */}
          <path d="M25 75C25 55 35 35 55 35C68 35 75 42 75 50C75 58 68 65 58 65C48 65 41 55 41 45" stroke="#4F46E5" strokeWidth="11" strokeLinecap="round" strokeLinejoin="round" />
          {/* Right curve (orange-red) */}
          <path d="M75 25C75 45 65 65 45 65C32 65 25 58 25 50C25 42 32 35 42 35C52 35 59 45 59 55" stroke="#EF4444" strokeWidth="11" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <span style={{ fontFamily: 'Inter, sans-serif', fontWeight: 800, fontSize: '15px', letterSpacing: '-0.3px' }}>
          <span style={{ color: '#E2E8F0' }}>Nifty</span>
          <span style={{ color: '#EF4444' }}>500</span>
        </span>
      </div>
      <div style={{ display: 'flex', width: '70px', height: '3px', marginTop: '3px', borderRadius: '1.5px', overflow: 'hidden' }}>
        <div style={{ flex: 1, backgroundColor: '#4F46E5' }} />
        <div style={{ flex: 1, backgroundColor: '#F59E0B' }} />
        <div style={{ flex: 1, backgroundColor: '#EF4444' }} />
        <div style={{ flex: 1, backgroundColor: '#10B981' }} />
      </div>
    </div>
  );
};

export const ComparisonChart: React.FC<DataProps> = ({ component, variables }) => {
  const leftTitle    = resolveProp('leftTitle',    component.dataBindings, variables, component.localProps) || 'Your friend';
  const leftValue    = resolveProp('leftValue',    component.dataBindings, variables, component.localProps) || '';
  const leftUnit     = resolveProp('leftUnit',     component.dataBindings, variables, component.localProps) || '';
  const leftList     = component.localProps?.leftList || [];

  const rightTitle    = resolveProp('rightTitle',    component.dataBindings, variables, component.localProps) || 'You';
  const rightValue    = resolveProp('rightValue',    component.dataBindings, variables, component.localProps) || '';
  const rightUnit     = resolveProp('rightUnit',     component.dataBindings, variables, component.localProps) || '';
  const rightList     = component.localProps?.rightList || [];

  const stagger = component.localProps?.stagger !== undefined ? component.localProps.stagger : 6.0;
  const style = getLayoutStyles(component.layout);

  const rootRef = useRef<HTMLDivElement>(null);
  const isPlaying = useSlidePlay(rootRef as React.RefObject<HTMLElement | null>);

  return (
    <div ref={rootRef} className="dash-comparison-chart" style={{ ...style, '--chart-stagger': stagger } as React.CSSProperties}>
      {/* Left Panel - Your Friend */}
      <div className="comp-panel panel-left animate-fade-up" style={{ '--stagger-delay': `calc(var(--chart-stagger, ${stagger}) + 0)` } as React.CSSProperties}>
        {/* Row 1: Profile & Quote */}
        <div className="comp-row-profile">
          <div className="comp-avatar-circle">
            <svg viewBox="0 0 32 32" className="comp-avatar">
              <path d="M16 8a4.5 4.5 0 1 0 0 9 4.5 4.5 0 0 0 0-9zm0 10.5c-4.67 0-9 2.33-9 5.5v1h18v-1c0-3.17-4.33-5.5-9-5.5z" fill="#9CA3AF" />
            </svg>
          </div>
          <div className="comp-profile-text">
            <span className="comp-profile-name">{leftTitle}:</span>
            <span className="comp-profile-quote">"{leftList[0] || ''}"</span>
          </div>
        </div>

        <hr className="comp-divider" />

        {/* Section Header: What your friend did */}
        <div className="comp-section-header">
          <div className="comp-header-icon-box">
            <BriefcaseIcon />
          </div>
          <span className="comp-section-title">What your friend did</span>
        </div>

        {/* Row 2: Action & Product */}
        <div className="comp-row-middle">
          <div className="comp-middle-left">
            Your friend buys Equity Index ETF (a.k.a Benchmark)
          </div>
          <div className="comp-middle-divider" />
          <div className="comp-middle-right">
            <Nifty500Logo />
          </div>
        </div>

        {/* Row 3: Callout Value Box at the Bottom */}
        <div className="comp-row-bottom-box">
          <div className="comp-bottom-left-sec">
            <CalendarIcon />
            <span className="comp-bottom-left-text">5Y Later:</span>
          </div>
          <div className="comp-bottom-divider" />
          <div className="comp-bottom-right-sec">
            <span className="comp-value-label">Current Value:</span>
            <span className="comp-value-amount">
              {leftValue && (
                <OdometerNumber
                  value={`${leftValue}${leftUnit}`}
                  isPlaying={isPlaying}
                  duration={1.5}
                  baseDelay={stagger * 0.1}
                />
              )}
            </span>
          </div>
        </div>
      </div>

      {/* Right Panel - You */}
      <div className="comp-panel panel-right animate-fade-up" style={{ '--stagger-delay': `calc(var(--chart-stagger, ${stagger}) + 0.3)` } as React.CSSProperties}>
        {/* Row 1: Profile & Quote */}
        <div className="comp-row-profile">
          <div className="comp-avatar-circle">
            <svg viewBox="0 0 32 32" className="comp-avatar">
              <path d="M16 8a4.5 4.5 0 1 0 0 9 4.5 4.5 0 0 0 0-9zm0 10.5c-4.67 0-9 2.33-9 5.5v1h18v-1c0-3.17-4.33-5.5-9-5.5z" fill="#D4AF37" />
            </svg>
          </div>
          <div className="comp-profile-text">
            <span className="comp-profile-name accent">{rightTitle}:</span>
            <span className="comp-profile-quote">"{rightList[0] || ''}"</span>
          </div>
        </div>

        <hr className="comp-divider" />

        {/* Section Header: What you did */}
        <div className="comp-section-header">
          <div className="comp-header-icon-box">
            <BriefcaseIcon />
          </div>
          <span className="comp-section-title">What you did</span>
        </div>

        {/* Row 2: Action & Product */}
        <div className="comp-row-middle">
          <div className="comp-middle-left">
            You create an actively managed portfolio
          </div>
          <div className="comp-middle-divider" />
          <div className="comp-middle-right">
            <ExplodedPieChart />
            <span>{rightList[1] || ''}</span>
          </div>
        </div>

        {/* Row 3: Callout Value Box at the Bottom */}
        <div className="comp-row-bottom-box">
          <div className="comp-bottom-left-sec">
            <CalendarIcon />
            <span className="comp-bottom-left-text">5Y Later:</span>
          </div>
          <div className="comp-bottom-divider" />
          <div className="comp-bottom-right-sec">
            <span className="comp-value-label">Current Value:</span>
            <span className="comp-value-amount">
              {rightValue && (
                <OdometerNumber
                  value={`${rightValue}${rightUnit}`}
                  isPlaying={isPlaying}
                  duration={1.5}
                  baseDelay={stagger * 0.1 + 0.15}
                />
              )}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

// ════════════════════════════════════════════════════════════════════════════
// 6. Timeline
// ════════════════════════════════════════════════════════════════════════════
export const Timeline: React.FC<DataProps> = ({ component, variables: _variables }) => {
  const milestones = component.localProps?.milestones || [];
  const layoutType = component.localProps?.layoutType || 'horizontal';
  const style = getLayoutStyles(component.layout);

  const stagger = component.localProps?.stagger !== undefined ? component.localProps.stagger : 6.0;

  return (
    <div className={`dash-timeline timeline-${layoutType}`} style={{ ...style, '--chart-stagger': stagger } as React.CSSProperties}>
      <div className="timeline-connector animate-draw" style={{ '--stagger-delay': `calc(var(--chart-stagger, ${stagger}) + 0)` } as React.CSSProperties} />
      <div className="timeline-nodes-wrapper">
        {milestones.map((node: any, index: number) => (
          <div
            key={index}
            className={`timeline-node ${node.active ? 'node-active' : ''} animate-fade-up`}
            style={{ '--stagger-delay': `calc(var(--chart-stagger, ${stagger}) + 1.2 + ${index * 1.2})` } as React.CSSProperties}
          >
            <div className="node-marker-container">
              <span className="node-marker" />
            </div>
            <div className="node-content">
              <span className="node-time">{node.time}</span>
              <h4 className="node-title">{node.title}</h4>
              <p className="node-desc">{node.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// ════════════════════════════════════════════════════════════════════════════
// 7. Dispersion Chart
// ════════════════════════════════════════════════════════════════════════════
export const DispersionChart: React.FC<DataProps> = ({ component, variables: _variables }) => {
  const categories = component.localProps?.categories || [];
  const style = getLayoutStyles(component.layout);
  const stagger = component.localProps?.stagger !== undefined ? component.localProps.stagger : 6.0;

  const rootRef = useRef<HTMLDivElement>(null);
  const isPlaying = useSlidePlay(rootRef as React.RefObject<HTMLElement | null>);

  return (
    <div
      ref={rootRef}
      className="dash-dispersion-chart animate-fade-up"
      style={{ ...style, '--stagger-delay': stagger, '--chart-stagger': stagger } as React.CSSProperties}
    >
      <div className="dispersion-legend animate-fade-up" style={{ '--stagger-delay': stagger + 1 } as React.CSSProperties}>
        <span className="legend-label label-bottom">Bottom</span>
        <span className="legend-label label-top">Top</span>
      </div>

      <div className="dispersion-rows">
        {categories.map((cat: any, index: number) => {
          const delay = 0.15 + index * 0.15;
          const arrowWidth = isPlaying ? '100%' : '0%';

          return (
            <div key={index} className="dispersion-row">
              <div
                className="dispersion-label animate-fade-up"
                style={{ '--stagger-delay': `calc(var(--chart-stagger, ${stagger}) + ${index * 1.5})` } as React.CSSProperties}
              >
                {cat.label}
              </div>

              <div className="dispersion-track-wrapper">
                <div
                  className="dispersion-val val-left animate-fade-up"
                  style={{ '--stagger-delay': `calc(var(--chart-stagger, ${stagger}) + ${index * 1.5} + 0.5)` } as React.CSSProperties}
                >
                  {cat.bottomVal}
                </div>

                <div className="dispersion-arrow-container">
                  <div
                    className="dispersion-arrow-line"
                    style={{
                      width: arrowWidth,
                      transition: `width 1.2s cubic-bezier(0.25,1,0.5,1) calc(var(--chart-stagger, ${stagger}) * 0.1s + ${delay}s)`
                    }}
                  >
                    <div className="arrow-head head-left" />
                    <div className="dispersion-diff-badge">
                      {cat.diff}
                    </div>
                    <div className="arrow-head head-right" />
                  </div>
                </div>

                <div
                  className="dispersion-val val-right animate-fade-up"
                  style={{ '--stagger-delay': `calc(var(--chart-stagger, ${stagger}) + ${index * 1.5} + 1)` } as React.CSSProperties}
                >
                  {cat.topVal}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

// ════════════════════════════════════════════════════════════════════════════
// 8. Scatter Plot
// ════════════════════════════════════════════════════════════════════════════
export const ScatterPlot: React.FC<DataProps> = ({ component, variables: _variables }) => {
  const points = component.localProps?.points || [
    { label: "Mutual funds", x: 15, y: 15, color: "#007BFF" },
    { label: "Stocks", x: 30, y: 30, color: "#007BFF" },
    { label: "Bonds", x: 42, y: 45, color: "#E07A5F" },
    { label: "PMS", x: 55, y: 60, color: "#C9A84C" },
    { label: "AIF (Hedged equity, Real estate, Global)", x: 68, y: 75, color: "#C9A84C" },
    { label: "Structured Products, AIF (PE/VC), Co-investments", x: 82, y: 90, color: "#8A8A8A" }
  ];

  const style = getLayoutStyles(component.layout);
  const stagger = component.localProps?.stagger !== undefined ? component.localProps.stagger : 6.0;

  const rootRef = useRef<HTMLDivElement>(null);
  const isPlaying = useSlidePlay(rootRef as React.RefObject<HTMLElement | null>);

  const width = 800;
  const height = 400;
  const paddingLeft = 110;
  const paddingRight = 100;
  const paddingBottom = 80;
  const paddingTop = 40;

  const chartW = width - paddingLeft - paddingRight;
  const chartH = height - paddingTop - paddingBottom;

  return (
    <div
      ref={rootRef}
      className="dash-scatter-plot animate-fade-up"
      style={{ ...style, '--stagger-delay': stagger, '--chart-stagger': stagger } as React.CSSProperties}
    >
      <svg viewBox={`0 0 ${width} ${height}`} width="100%" height="100%" style={{ overflow: 'visible' }}>
        {/* Gridlines */}
        {[0.25, 0.5, 0.75].map((ratio, idx) => {
          const x = paddingLeft + ratio * chartW;
          const y = paddingTop + ratio * chartH;
          return (
            <React.Fragment key={idx}>
              <line x1={x} y1={paddingTop} x2={x} y2={height - paddingBottom} stroke="rgba(201,168,76,0.04)" strokeDasharray="4,4" />
              <line x1={paddingLeft} y1={y} x2={width - paddingRight} y2={y} stroke="rgba(201,168,76,0.04)" strokeDasharray="4,4" />
            </React.Fragment>
          );
        })}

        {/* Axes */}
        <line
          x1={paddingLeft}
          y1={height - paddingBottom}
          x2={paddingLeft}
          y2={paddingTop - 10}
          stroke="var(--gold-dim)"
          strokeWidth="1.5"
        />
        <path d={`M ${paddingLeft - 4} ${paddingTop - 6} L ${paddingLeft} ${paddingTop - 14} L ${paddingLeft + 4} ${paddingTop - 6} Z`} fill="var(--gold-dim)" />

        <line
          x1={paddingLeft}
          y1={height - paddingBottom}
          x2={width - paddingRight + 20}
          y2={height - paddingBottom}
          stroke="var(--gold-dim)"
          strokeWidth="1.5"
        />
        <path d={`M ${width - paddingRight + 16} ${height - paddingBottom - 4} L ${width - paddingRight + 24} ${height - paddingBottom} L ${width - paddingRight + 16} ${height - paddingBottom + 4} Z`} fill="var(--gold-dim)" />

        {/* Axis Labels */}
        <text
          x={paddingLeft - 60}
          y={paddingTop + chartH / 2}
          transform={`rotate(-90 ${paddingLeft - 60} ${paddingTop + chartH / 2})`}
          textAnchor="middle"
          fill="var(--t2)"
          fontSize="13px"
          fontWeight="600"
          fontFamily="'Inter Tight', sans-serif"
          letterSpacing="0.05em"
        >
          Alpha access
        </text>
        <text x={paddingLeft - 25} y={paddingTop + 10} textAnchor="end" fill="var(--t3)" fontSize="11px" fontFamily="'Inter Tight', sans-serif">High</text>
        <text x={paddingLeft - 25} y={height - paddingBottom - 5} textAnchor="end" fill="var(--t3)" fontSize="11px" fontFamily="'Inter Tight', sans-serif">Low</text>

        <text
          x={paddingLeft + chartW / 2}
          y={height - paddingBottom + 45}
          textAnchor="middle"
          fill="var(--t2)"
          fontSize="13px"
          fontWeight="600"
          fontFamily="'Inter Tight', sans-serif"
          letterSpacing="0.05em"
        >
          Individual net worth
        </text>
        <text x={paddingLeft + 10} y={height - paddingBottom + 20} textAnchor="start" fill="var(--t3)" fontSize="11px" fontFamily="'Inter Tight', sans-serif">Low</text>
        <text x={width - paddingRight - 10} y={height - paddingBottom + 20} textAnchor="end" fill="var(--t3)" fontSize="11px" fontFamily="'Inter Tight', sans-serif">High</text>

        {/* Plot points */}
        {points.map((pt: any, idx: number) => {
          const cx = paddingLeft + (pt.x / 100) * chartW;
          const cy = height - paddingBottom - (pt.y / 100) * chartH;
          const delay = 0.2 + idx * 0.15;
          const labelDelay = delay + 0.1;

          const scale = isPlaying ? 1 : 0;
          const opacity = isPlaying ? 1 : 0;

          const isGold = pt.color === '#C9A84C' || pt.color === 'var(--gold)';

          return (
            <g key={idx} className="scatter-point-group">
              {isGold && (
                <circle
                  cx={cx}
                  cy={cy}
                  r="14"
                  fill="none"
                  stroke={pt.color}
                  strokeWidth="1.5"
                  opacity={opacity * 0.3}
                  style={{
                    transform: `scale(${scale})`,
                    transformOrigin: `${cx}px ${cy}px`,
                    transition: `transform 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) calc(var(--chart-stagger, ${stagger}) * 0.1s + ${delay}s), opacity 0.4s ease calc(var(--chart-stagger, ${stagger}) * 0.1s + ${delay}s)`
                  }}
                />
              )}

              <circle
                cx={cx}
                cy={cy}
                r="7"
                fill={pt.color}
                style={{
                  transform: `scale(${scale})`,
                  transformOrigin: `${cx}px ${cy}px`,
                  transition: `transform 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) calc(var(--chart-stagger, ${stagger}) * 0.1s + ${delay}s)`
                }}
              />

              <g
                opacity={opacity}
                style={{
                  transition: `opacity 0.6s ease calc(var(--chart-stagger, ${stagger}) * 0.1s + ${labelDelay}s)`
                }}
              >
                {pt.label.includes('\n') ? (
                  <>
                    <text
                      x={cx + 16}
                      y={cy - 4}
                      fill="var(--t1)"
                      fontSize="12px"
                      fontWeight="600"
                      fontFamily="'Inter Tight', sans-serif"
                    >
                      {pt.label.split('\n')[0]}
                    </text>
                    <text
                      x={cx + 16}
                      y={cy + 10}
                      fill="var(--t1)"
                      fontSize="12px"
                      fontWeight="600"
                      fontFamily="'Inter Tight', sans-serif"
                    >
                      {pt.label.split('\n')[1]}
                    </text>
                  </>
                ) : pt.label.includes(',') ? (
                  <>
                    <text
                      x={cx + 16}
                      y={cy - 4}
                      fill="var(--t1)"
                      fontSize="12px"
                      fontWeight="600"
                      fontFamily="'Inter Tight', sans-serif"
                    >
                      {pt.label.split(',')[0]}
                    </text>
                    <text
                      x={cx + 16}
                      y={cy + 10}
                      fill="var(--t3)"
                      fontSize="10px"
                      fontFamily="'Inter Tight', sans-serif"
                    >
                      {pt.label.substring(pt.label.indexOf(',') + 1).trim()}
                    </text>
                  </>
                ) : (
                  <text
                    x={cx + 16}
                    y={cy + 4}
                    fill={isGold ? 'var(--gold-l)' : 'var(--t1)'}
                    fontSize="12px"
                    fontWeight="600"
                    fontFamily="'Inter Tight', sans-serif"
                  >
                    {pt.label}
                  </text>
                )}
              </g>
            </g>
          );
        })}
      </svg>
    </div>
  );
};

// ════════════════════════════════════════════════════════════════════════════
// 9. Grouped Bar Chart
// ════════════════════════════════════════════════════════════════════════════
export const GroupedBarChart: React.FC<DataProps> = ({ component, variables: _variables }) => {
  const groups = component.localProps?.groups || [];
  const maxValue = component.localProps?.maxValue || 20;
  const unit = component.localProps?.unit || '%';
  const showAlpha = component.localProps?.showAlpha !== false;
  const style = getLayoutStyles(component.layout);
  const stagger = component.localProps?.stagger !== undefined ? component.localProps.stagger : 6.0;

  const rootRef = useRef<HTMLDivElement>(null);
  const isPlaying = useSlidePlay(rootRef as React.RefObject<HTMLElement | null>);

  const allValues = groups.flatMap((g: any) => g.values ?? []);
  const minVal = allValues.length ? Math.min(0, ...allValues) : 0;
  const maxVal = allValues.length ? Math.max(0, ...allValues, maxValue) : maxValue;
  const range = (maxVal - minVal) || 1; // prevent division-by-zero
  const zeroPercent = (Math.abs(minVal) / range) * 100;

  const COLOR_PMS = '#C9A84C'; // Gold
  const COLOR_BSE = '#4B5563'; // Gray

  const legend = component.localProps?.legend || [
    { label: 'Wealth Edge PMS', color: COLOR_PMS },
    { label: 'BSE 500 TRI', color: COLOR_BSE }
  ];

  const legendAlign = component.localProps?.legendAlign || 'flex-end';

  return (
    <div
      ref={rootRef}
      className="dash-grouped-bar-chart animate-fade-up"
      style={{ ...style, '--stagger-delay': stagger, '--chart-stagger': stagger } as React.CSSProperties}
    >
      <div className="grouped-chart-legend" style={{ justifyContent: legendAlign }}>
        {legend.map((item: any, idx: number) => (
          <div key={idx} className="legend-item">
            <span
              className="legend-dot"
              style={{
                background: item.color
              }}
            />
            <span>{item.label}</span>
          </div>
        ))}
      </div>

      <div className="grouped-bars-container">
        {groups.map((group: any, idx: number) => {
          const delayBase = 0.1 + idx * 0.08;

          return (
            <div key={idx} className="grouped-bar-group">
              {showAlpha && group.alpha && (
                <div
                  className={`grouped-alpha animate-fade-up ${group.alpha.startsWith('-') ? 'alpha-negative' : 'alpha-positive'}`}
                  style={{ '--stagger-delay': `calc(var(--chart-stagger, ${stagger}) + ${idx} + 1)` } as React.CSSProperties}
                >
                  {group.alpha}
                </div>
              )}

              <div className="grouped-bars-track">
                <div className="grouped-axis-line" style={{ bottom: `${zeroPercent}%` }} />

                {group.values.map((val: number, valIdx: number) => {
                  const legendItem = legend[valIdx] || { label: '', color: '#CCCCCC' };
                  const barColor = legendItem.color;
                  const isGold = barColor === COLOR_PMS || barColor.includes('var(--gold)');
                  const valPercent = (Math.abs(val) / range) * 100;
                  const animatedH = isPlaying ? `${valPercent}%` : '0%';
                  const isNegative = val < 0;

                  return (
                    <div key={valIdx} className="bar-fill-wrapper">
                      <div
                        className={`bar-value-top ${isGold ? 'label-pms' : 'label-bse'}`}
                        style={{
                          opacity: isPlaying ? 1 : 0,
                          bottom: !isNegative
                            ? `calc(${zeroPercent + valPercent}% + 4px)`
                            : 'auto',
                          top: isNegative
                            ? `calc(${100 - zeroPercent + valPercent}% + 4px)`
                            : 'auto',
                          color: legendItem.textColor || (isGold ? 'var(--gold-l)' : 'var(--t1)'),
                          transition: 'opacity 0.4s ease 0.8s'
                        }}
                      >
                        {component.localProps?.prefix || ''}{val}{unit}
                      </div>
                      <div
                        className={`grouped-bar-fill ${isGold ? 'pms-fill' : 'bse-fill'}`}
                        style={{
                          height: animatedH,
                          bottom: !isNegative ? `${zeroPercent}%` : 'auto',
                          top: isNegative ? `${100 - zeroPercent}%` : 'auto',
                          background: barColor,
                          boxShadow: isGold ? '0 -6px 24px rgba(201, 168, 76, 0.35)' : 'none',
                          transformOrigin: !isNegative ? 'bottom' : 'top',
                          transition: `height 1s cubic-bezier(0.25,1,0.5,1) calc(var(--chart-stagger, ${stagger}) * 0.1s + ${delayBase}s)`
                        }}
                      />
                    </div>
                  );
                })}
              </div>

              <div
                className="grouped-label animate-fade-up"
                style={{ '--stagger-delay': `calc(var(--chart-stagger, ${stagger}) + ${idx})` } as React.CSSProperties}
              >
                {group.label}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

// ════════════════════════════════════════════════════════════════════════════
// 10. Venn Diagram
// ════════════════════════════════════════════════════════════════════════════
export const VennDiagram: React.FC<DataProps> = ({ component, variables: _variables }) => {
  const style = getLayoutStyles(component.layout);
  const stagger = component.localProps?.stagger !== undefined ? component.localProps.stagger : 6.0;

  const rootRef = useRef<HTMLDivElement>(null);
  return (
    <div
      ref={rootRef}
      id={component.id}
      className="dash-venn-diagram animate-fade-up"
      style={{ ...style, '--stagger-delay': stagger, '--chart-stagger': stagger } as React.CSSProperties}
    >
      <img
        src="/alpha-trinity-venn.png"
        alt="Alpha Trinity Venn Diagram"
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'contain',
          display: 'block'
        }}
      />
    </div>
  );
};

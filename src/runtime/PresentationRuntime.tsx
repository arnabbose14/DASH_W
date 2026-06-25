import React, { useState, useEffect, useRef, useCallback } from 'react';
import type { Presentation, VenueProfile } from '../types';
import { ComponentRenderer } from '../components/ComponentRenderer';
import { X, BookOpen } from 'lucide-react';

interface PresentationRuntimeProps {
  presentation: Presentation;
  activeSlideIndex: number;
  setActiveSlideIndex: (idx: number) => void;
  activeVenue: VenueProfile;
  onExit: () => void;
}

const TRANS_MS = 1100; // vertical push transition duration

export const PresentationRuntime: React.FC<PresentationRuntimeProps> = ({
  presentation,
  activeSlideIndex,
  setActiveSlideIndex,
  activeVenue,
  onExit,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const [isLoading, setIsLoading] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [showChrome, setShowChrome] = useState(true);
  const [showNotes, setShowNotes] = useState(false);
  const [autoAdvance, setAutoAdvance] = useState(false);
  const [autoAdvanceSeconds, setAutoAdvanceSeconds] = useState(12);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [playStates, setPlayStates] = useState<Record<number, boolean>>({});
  const [timerBarWidth, setTimerBarWidth] = useState(0);
  const [timerBarTransition, setTimerBarTransition] = useState('none');
  // Track previous index for direction
  const prevIndexRef = useRef(activeSlideIndex);
  // Scale for slide fitting
  const [scale, setScale] = useState(1);
  const stageRef = useRef<HTMLDivElement>(null);

  const slides = presentation.slides;
  const total = slides.length;

  // --- Scale calculation (from VenueAdapter logic) ---
  useEffect(() => {
    const handleResize = () => {
      if (!stageRef.current) return;
      const { clientWidth, clientHeight } = stageRef.current;
      const scaleX = clientWidth / activeVenue.width;
      const scaleY = clientHeight / activeVenue.height;
      setScale(Math.min(scaleX, scaleY) * 0.95);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    const ro = new ResizeObserver(handleResize);
    if (stageRef.current) ro.observe(stageRef.current);
    return () => { window.removeEventListener('resize', handleResize); ro.disconnect(); };
  }, [activeVenue]);

  // --- Loading Screen ---
  useEffect(() => {
    const t1 = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(t1);
  }, []);

  // Kick off play state for first slide after loading clears
  useEffect(() => {
    if (!isLoading) {
      setTimeout(() => {
        setPlayStates({ 0: true });
      }, 600);
    }
  }, [isLoading]);

  // --- Timer Bar ---
  const startTimerBar = useCallback((dur: number) => {
    setTimerBarWidth(0);
    setTimerBarTransition('none');
    requestAnimationFrame(() => requestAnimationFrame(() => {
      setTimerBarTransition(`width ${dur}ms linear`);
      setTimerBarWidth(100);
    }));
  }, []);

  const resetTimerBar = useCallback(() => {
    setTimerBarWidth(0);
    setTimerBarTransition('none');
  }, []);

  // Start bar when slide becomes active
  useEffect(() => {
    if (!isLoading && autoAdvance) {
      startTimerBar(autoAdvanceSeconds * 1000);
    } else {
      resetTimerBar();
    }
  }, [activeSlideIndex, isLoading, autoAdvance, autoAdvanceSeconds, startTimerBar, resetTimerBar]);

  // --- Slide Transition Engine ---
  const goTo = useCallback((next: number) => {
    if (isTransitioning || next < 0 || next >= total) return;
    setIsTransitioning(true);
    resetTimerBar();
    prevIndexRef.current = activeSlideIndex;
    setActiveSlideIndex(next);

    setTimeout(() => {
      setIsTransitioning(false);
      setPlayStates(prev => ({ ...prev, [next]: true }));
      if (autoAdvance) startTimerBar(autoAdvanceSeconds * 1000);
    }, TRANS_MS + 60);
  }, [isTransitioning, total, activeSlideIndex, setActiveSlideIndex, autoAdvance, autoAdvanceSeconds, resetTimerBar, startTimerBar]);

  // Reset play state when leaving a slide
  useEffect(() => {
    // When active slide changes, reset old slide's play state after transition
    const prev = prevIndexRef.current;
    if (prev !== activeSlideIndex) {
      setTimeout(() => {
        setPlayStates(ps => {
          const next = { ...ps };
          delete next[prev];
          return next;
        });
      }, TRANS_MS + 100);
    }
  }, [activeSlideIndex]);

  // --- Keyboard Navigation ---
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowRight':
        case 'ArrowDown':
        case ' ':
          e.preventDefault();
          goTo(activeSlideIndex < total - 1 ? activeSlideIndex + 1 : 0);
          break;
        case 'ArrowLeft':
        case 'ArrowUp':
          e.preventDefault();
          goTo(activeSlideIndex > 0 ? activeSlideIndex - 1 : total - 1);
          break;
        case 'Home':
          e.preventDefault();
          goTo(0);
          break;
        case 'End':
          e.preventDefault();
          goTo(total - 1);
          break;
        case 'Escape':
          if (!document.fullscreenElement) onExit();
          break;
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeSlideIndex, total, goTo, onExit]);

  // --- Auto Advance ---
  useEffect(() => {
    if (!autoAdvance) return;
    const t = setTimeout(() => {
      goTo(activeSlideIndex < total - 1 ? activeSlideIndex + 1 : 0);
    }, autoAdvanceSeconds * 1000);
    return () => clearTimeout(t);
  }, [autoAdvance, activeSlideIndex, autoAdvanceSeconds, total, goTo]);

  // --- Autohiding Chrome ---
  useEffect(() => {
    let hideTimeout: number;
    const handleMouseMove = () => {
      setShowChrome(true);
      clearTimeout(hideTimeout);
      hideTimeout = window.setTimeout(() => {
        if (!showNotes) setShowChrome(false);
      }, 3000);
    };
    window.addEventListener('mousemove', handleMouseMove);
    handleMouseMove();
    return () => { window.removeEventListener('mousemove', handleMouseMove); clearTimeout(hideTimeout); };
  }, [showNotes]);

  // --- Elapsed Timer ---
  useEffect(() => {
    const iv = setInterval(() => setElapsedSeconds(s => s + 1), 1000);
    return () => clearInterval(iv);
  }, []);

  const formatTime = (s: number) =>
    `${Math.floor(s / 60).toString().padStart(2, '0')}:${(s % 60).toString().padStart(2, '0')}`;

  // Determine transform for each slide
  const getSlideTransform = (idx: number): React.CSSProperties => {
    const dir = activeSlideIndex > prevIndexRef.current ? 1 : -1;
    if (idx === activeSlideIndex) {
      return {
        transform: 'translateY(0)',
        opacity: 1,
        zIndex: 2,
        transition: isTransitioning
          ? `transform ${TRANS_MS}ms cubic-bezier(0.25,0.46,0.45,0.94), opacity ${TRANS_MS}ms ease`
          : 'none',
        pointerEvents: 'all',
      };
    }
    if (idx === prevIndexRef.current && isTransitioning) {
      return {
        transform: `translateY(${-dir * 100}vh)`,
        opacity: 0,
        zIndex: 1,
        transition: `transform ${TRANS_MS}ms cubic-bezier(0.25,0.46,0.45,0.94), opacity ${TRANS_MS}ms ease`,
        pointerEvents: 'none',
      };
    }
    // Off-screen (not active, not transitioning out)
    const offDir = idx > activeSlideIndex ? 1 : -1;
    return {
      transform: `translateY(${offDir * 100}vh)`,
      opacity: 0,
      zIndex: 0,
      transition: 'none',
      pointerEvents: 'none',
    };
  };

  const getSlideBackground = (slide: typeof slides[0]): React.CSSProperties => {
    const bg = slide.background;
    const style: React.CSSProperties = { opacity: bg.opacity };
    if (bg.type === 'color') style.backgroundColor = bg.value;
    else if (bg.type === 'gradient') style.background = bg.value;
    else if (bg.type === 'image') {
      style.backgroundImage = `url(${bg.value})`;
      style.backgroundSize = bg.cropMode;
      style.backgroundPosition = `${bg.focalPointX}% ${bg.focalPointY}%`;
      style.backgroundRepeat = 'no-repeat';
    }
    return style;
  };

  return (
    <div ref={containerRef} className="dash-runtime-viewport">

      {/* ── LOADING SCREEN ── */}
      <div className={`dash-loading-screen${isLoading ? '' : ' loading-out'}`}>
        <div className="dash-load-logo">DASH <span className="dash-load-dot">·</span> W</div>
        <div className="dash-load-track"><div className="dash-load-fill" /></div>
      </div>

      {/* ── TIMER BAR (top edge) ── */}
      <div className="dash-timer-track">
        <div
          className="dash-timer-fill"
          style={{ width: `${timerBarWidth}%`, transition: timerBarTransition }}
        />
      </div>

      {/* ── LOGO (top-left) ── */}
      <div className={`dash-chrome-logo${isLoading ? '' : ' chrome-logo-visible'}`}>
        DASH<span className="dash-load-dot">·</span>W
      </div>

      {/* ── SLIDE INFO (top-right) ── */}
      <div className={`dash-chrome-slide-info${isLoading ? '' : ' chrome-logo-visible'}`}>
        <div className="dash-slide-num">{activeSlideIndex + 1} / {total}</div>
        <div className="dash-slide-lbl">{slides[activeSlideIndex]?.title}</div>
      </div>

      {/* ── EXIT BUTTON (shown on hover) ── */}
      <button
        className={`dash-chrome-exit${showChrome ? ' chrome-visible' : ' chrome-hidden'}`}
        onClick={onExit}
        title="Exit (Esc)"
      >
        <X size={14} />
      </button>

      {/* ── STAGE ── */}
      <div ref={stageRef} className="dash-runtime-stage">
        {slides.map((slide, idx) => {
          const isPlay = !!playStates[idx];
          return (
            <section
              key={slide.id}
              className={`dash-slide-frame ${isPlay ? 'play slide-active' : ''} motion-${slide.motionPreset || 'premium'}`}
              style={getSlideTransform(idx)}
            >
              {/* Grid background */}
              <div className="dash-slide-grid-bg" />

              {/* Radial ambient glow */}
              <div className="dash-slide-ambient" />

              {/* Content — scaled to venue profile */}
              <div className="dash-slide-scale-root" style={{
                width: `${activeVenue.width}px`,
                height: `${activeVenue.height}px`,
                transform: `translate(-50%, -50%) scale(${scale})`,
                overflow: 'hidden',
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
                border: '1px solid rgba(255, 255, 255, 0.05)',
              }}>
                {/* Slide background confined to stage bounds */}
                <div className="dash-slide-bg" style={getSlideBackground(slide)} />

                {/* Overlay tint confined to stage bounds */}
                {slide.background.overlayOpacity > 0 && (
                  <div className="dash-slide-overlay" style={{
                    backgroundColor: slide.background.overlayTint,
                    opacity: slide.background.overlayOpacity,
                  }} />
                )}

                {/* Branding Logo (top-right corner of slide) */}
                {slide.id !== 'slide_35_groww_outro' && slide.id !== 'slide_10_groww_debt_aif' && (
                  <div className="dash-slide-branding-logo" style={{
                    position: 'absolute',
                    top: '5%',
                    right: '5%',
                    width: '73px',
                    height: '73px',
                    backgroundImage: 'url(/groww-logo.png)',
                    backgroundSize: 'contain',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    zIndex: 100,
                    pointerEvents: 'none',
                  }} />
                )}

                <div className="dash-slide-content-container" style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', position: 'relative', zIndex: 2, padding: '5%', boxSizing: 'border-box' }}>
                  <div className={isPlay ? "slide-active" : ""} style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column' }}>
                    {slide.components.map((c) => (
                      <ComponentRenderer key={c.id} component={c} variables={presentation.variables} />
                    ))}
                  </div>
                </div>
              </div>
            </section>
          );
        })}
      </div>

      {/* ── DOT NAVIGATION (bottom-center, pill) ── */}
      <nav className={`dash-dot-nav${isLoading ? '' : ' dot-nav-visible'}${showChrome ? '' : ' dot-nav-hidden'}`}>
        {slides.map((_, idx) => (
          <React.Fragment key={idx}>
            {idx > 0 && <div className={`dash-dot-line${idx <= activeSlideIndex ? ' done' : ''}`} />}
            <button
              className={`dash-dot${idx === activeSlideIndex ? ' now' : idx < activeSlideIndex ? ' done' : ''}`}
              onClick={() => goTo(idx)}
              title={slides[idx].title}
            />
          </React.Fragment>
        ))}
      </nav>

      {/* ── CONTROLS (bottom-right) ── */}
      <div className={`dash-chrome-controls${isLoading ? '' : ' chrome-logo-visible'}${showChrome ? '' : ' chrome-controls-hidden'}`}>
        <button className="dash-ctrl-btn" onClick={() => goTo(activeSlideIndex > 0 ? activeSlideIndex - 1 : total - 1)} title="Previous (←)">‹</button>
        <button
          className={`dash-ctrl-btn${autoAdvance ? ' active' : ''}`}
          onClick={() => setAutoAdvance(a => !a)}
          title="Toggle Auto-Advance"
        >
          {autoAdvance ? '⏸' : '▶'}
        </button>
        <button className="dash-ctrl-btn" onClick={() => goTo(activeSlideIndex < total - 1 ? activeSlideIndex + 1 : 0)} title="Next (→)">›</button>
      </div>

      {/* ── BOTTOM SESSION INFO (bottom-left) ── */}
      <div className={`dash-chrome-session${showChrome ? ' chrome-visible' : ' chrome-hidden'}`}>
        <div className="dash-session-timer">⏱ {formatTime(elapsedSeconds)}</div>
        {autoAdvance && (
          <div className="dash-auto-advance-pill">
            AUTO · <input
              type="number" min="3" max="60" value={autoAdvanceSeconds}
              onChange={e => setAutoAdvanceSeconds(Math.max(3, parseInt(e.target.value) || 12))}
            />s
          </div>
        )}
        <button className={`dash-ctrl-btn sm${showNotes ? ' active' : ''}`} onClick={() => setShowNotes(n => !n)}>
          <BookOpen size={13} /> Notes
        </button>
      </div>

      {/* ── SPEAKER NOTES PANEL ── */}
      {showNotes && slides[activeSlideIndex] && (
        <aside className="runtime-notes-panel">
          <div className="notes-panel-header">
            <BookOpen size={16} className="accent-text" />
            <span>Speaker Notes</span>
            <button className="btn-close-notes" onClick={() => setShowNotes(false)}>
              <X size={14} />
            </button>
          </div>
          <div className="notes-panel-content">
            <div className="notes-slide-title">Slide {activeSlideIndex + 1}: {slides[activeSlideIndex].title}</div>
            <p className="notes-body">
              {slides[activeSlideIndex].speakerNotes || "No speaker notes for this slide."}
            </p>
          </div>
        </aside>
      )}
    </div>
  );
};

export default PresentationRuntime;

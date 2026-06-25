import { useState, useRef, useEffect, useCallback } from 'react';
import { defaultPresentation } from './data/defaultPresentation';
import { AdminDashboard } from './dashboard/AdminDashboard';
import { PresentationRuntime } from './runtime/PresentationRuntime';
import { VENUE_PROFILES, type VenueProfile, type Presentation } from './types';

const HISTORY_LIMIT = 50;

function App() {
  const [presentation, setPresentation] = useState<Presentation>(defaultPresentation);
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);
  const [activeVenue, setActiveVenue] = useState<VenueProfile>(VENUE_PROFILES['16_9']);
  const [showSafeAreas, setShowSafeAreas] = useState(false);
  const [viewMode, setViewMode] = useState<'editor' | 'present'>('editor');

  // Undo/redo history stacks — kept in refs so they don't trigger re-renders
  const pastRef   = useRef<Presentation[]>([]);
  const futureRef = useRef<Presentation[]>([]);
  // Track stack sizes as state so header buttons update reactively
  const [historySize, setHistorySize] = useState({ past: 0, future: 0 });

  const refreshHistorySizes = () =>
    setHistorySize({ past: pastRef.current.length, future: futureRef.current.length });

  /** Use this instead of setPresentation everywhere in the editor */
  const setPresentationWithHistory = useCallback((next: Presentation) => {
    setPresentation(prev => {
      pastRef.current = [...pastRef.current.slice(-HISTORY_LIMIT + 1), prev];
      futureRef.current = [];
      refreshHistorySizes();
      return next;
    });
  }, []);

  const undo = useCallback(() => {
    if (!pastRef.current.length) return;
    setPresentation(prev => {
      const previous = pastRef.current[pastRef.current.length - 1];
      pastRef.current = pastRef.current.slice(0, -1);
      futureRef.current = [prev, ...futureRef.current.slice(0, HISTORY_LIMIT - 1)];
      refreshHistorySizes();
      return previous;
    });
  }, []);

  const redo = useCallback(() => {
    if (!futureRef.current.length) return;
    setPresentation(prev => {
      const next = futureRef.current[0];
      futureRef.current = futureRef.current.slice(1);
      pastRef.current = [...pastRef.current.slice(-HISTORY_LIMIT + 1), prev];
      refreshHistorySizes();
      return next;
    });
  }, []);

  /** Reset to the hard-coded default — clears all history */
  const handleReset = useCallback(() => {
    pastRef.current = [];
    futureRef.current = [];
    setPresentation(defaultPresentation);
    setActiveSlideIndex(0);
    refreshHistorySizes();
  }, []);

  // Keyboard shortcuts: Cmd/Ctrl+Z = undo, Cmd/Ctrl+Shift+Z = redo
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const mod = e.metaKey || e.ctrlKey;
      if (!mod) return;
      if (e.key === 'z' && !e.shiftKey) { e.preventDefault(); undo(); }
      if ((e.key === 'z' && e.shiftKey) || e.key === 'y') { e.preventDefault(); redo(); }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [undo, redo]);

  const handleLaunchPresenter = () => setViewMode('present');
  const handleExitPresenter   = () => setViewMode('editor');

  return (
    <div className="dash-app-container">
      {viewMode === 'editor' ? (
        <AdminDashboard
          presentation={presentation}
          onChangePresentation={setPresentationWithHistory}
          onChangePresentationDraft={setPresentation}
          activeSlideIndex={activeSlideIndex}
          setActiveSlideIndex={setActiveSlideIndex}
          activeVenue={activeVenue}
          setActiveVenue={setActiveVenue}
          showSafeAreas={showSafeAreas}
          setShowSafeAreas={setShowSafeAreas}
          onLaunchPresenter={handleLaunchPresenter}
          onUndo={undo}
          onRedo={redo}
          canUndo={historySize.past > 0}
          canRedo={historySize.future > 0}
          onReset={handleReset}
        />
      ) : (
        <PresentationRuntime
          presentation={presentation}
          activeSlideIndex={activeSlideIndex}
          setActiveSlideIndex={setActiveSlideIndex}
          activeVenue={activeVenue}
          onExit={handleExitPresenter}
        />
      )}
    </div>
  );
}

export default App;

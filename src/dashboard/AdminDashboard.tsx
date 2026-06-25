import React, { useState, useEffect } from 'react';
import { VENUE_PROFILES, type Presentation, type Slide, type VenueProfile, type SlideType } from '../types';
import { VenueAdapter } from '../engine/VenueAdapter';
import { ComponentRenderer } from '../components/ComponentRenderer';
import { DataEditor } from './DataEditor';
import { Trash, Play, Layers, Eye, EyeOff, ArrowUp, ArrowDown, RefreshCw, Save, Undo2, Redo2, RotateCcw, AlertTriangle } from 'lucide-react';

interface AdminDashboardProps {
  presentation: Presentation;
  onChangePresentation: (p: Presentation) => void;
  /** Raw setter — updates state without pushing to undo history */
  onChangePresentationDraft: (p: Presentation) => void;
  activeSlideIndex: number;
  setActiveSlideIndex: (idx: number) => void;
  activeVenue: VenueProfile;
  setActiveVenue: (p: VenueProfile) => void;
  showSafeAreas: boolean;
  setShowSafeAreas: (b: boolean) => void;
  onLaunchPresenter: () => void;
  onUndo: () => void;
  onRedo: () => void;
  canUndo: boolean;
  canRedo: boolean;
  onReset: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  presentation,
  onChangePresentation,
  onChangePresentationDraft,
  activeSlideIndex,
  setActiveSlideIndex,
  activeVenue,
  setActiveVenue,
  showSafeAreas,
  setShowSafeAreas,
  onLaunchPresenter,
  onUndo,
  onRedo,
  canUndo,
  canRedo,
  onReset,
}) => {
  const [animKey, setAnimKey] = useState(0);
  const [selectedComponentId, setSelectedComponentId] = useState<string | null>(null);
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  // Toast state — replaces alert()
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  const showToast = (message: string, type: 'success' | 'error' = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3500);
  };

  const activeSlide = presentation.slides[activeSlideIndex] || presentation.slides[0];

  useEffect(() => {
    setAnimKey(prev => prev + 1);
    setSelectedComponentId(null);
  }, [activeSlideIndex, activeSlide?.motionPreset]);

  const replayMotion = () => setAnimKey(prev => prev + 1);

  const [isSaving, setIsSaving] = useState(false);

  const handleSaveSession = async () => {
    setIsSaving(true);
    try {
      const response = await fetch('/api/save-presentation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(presentation),
      });
      const result = await response.json();
      result.success
        ? showToast('Saved to defaultPresentation.ts')
        : showToast(`Save failed: ${result.error}`, 'error');
    } catch (err: any) {
      showToast(`Network error: ${err.message}`, 'error');
    } finally {
      setIsSaving(false);
    }
  };

  // ── Component tree helpers ────────────────────────────────────────────────

  const updateComponentInList = (
    components: any[],
    id: string,
    updater: (c: any) => any
  ): any[] =>
    components.map((c) => {
      if (c.id === id) return updater(c);
      if (c.children) return { ...c, children: updateComponentInList(c.children, id, updater) };
      return c;
    });

  const deleteComponentFromList = (components: any[], id: string): any[] =>
    components
      .filter((c) => c.id !== id)
      .map((c) => c.children
        ? { ...c, children: deleteComponentFromList(c.children, id) }
        : c
      );

  const duplicateComponentInList = (components: any[], id: string): any[] => {
    const result: any[] = [];
    for (const c of components) {
      result.push(c.children ? { ...c, children: duplicateComponentInList(c.children, id) } : c);
      if (c.id === id) {
        const clone = JSON.parse(JSON.stringify(c));
        const restamp = (node: any): any => ({
          ...node,
          id: `${node.id}_copy_${Date.now()}`,
          ...(node.layout?.position === 'absolute' ? {
            layout: {
              ...node.layout,
              left: `${Math.min(90, parseFloat(node.layout.left || '0') + 3)}%`,
              top:  `${Math.min(90, parseFloat(node.layout.top  || '0') + 3)}%`,
            }
          } : {}),
          children: node.children?.map(restamp),
        });
        result.push(restamp(clone));
      }
    }
    return result;
  };

  /** Commits to undo history — use for inspector edits */
  const handleUpdateComponent = (componentId: string, updater: (c: any) => any) => {
    const updatedSlides = presentation.slides.map((s, idx) =>
      idx !== activeSlideIndex ? s : { ...s, components: updateComponentInList(s.components, componentId, updater) }
    );
    onChangePresentation({ ...presentation, slides: updatedSlides });
  };

  /** Live update during drag/resize — NO history entry per frame */
  const handleUpdateComponentDraft = (componentId: string, updater: (c: any) => any) => {
    const updatedSlides = presentation.slides.map((s, idx) =>
      idx !== activeSlideIndex ? s : { ...s, components: updateComponentInList(s.components, componentId, updater) }
    );
    onChangePresentationDraft({ ...presentation, slides: updatedSlides });
  };

  const handleDeleteComponent = (id: string) => {
    const updatedSlides = presentation.slides.map((s, idx) =>
      idx !== activeSlideIndex ? s : { ...s, components: deleteComponentFromList(s.components, id) }
    );
    onChangePresentation({ ...presentation, slides: updatedSlides });
    setSelectedComponentId(null);
  };

  const handleDuplicateComponent = (id: string) => {
    const updatedSlides = presentation.slides.map((s, idx) =>
      idx !== activeSlideIndex ? s : { ...s, components: duplicateComponentInList(s.components, id) }
    );
    onChangePresentation({ ...presentation, slides: updatedSlides });
  };

  // ── Keyboard shortcuts (Delete, Cmd+D) ───────────────────────────────────
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore when focus is inside a text field
      const tag = (e.target as HTMLElement).tagName;
      if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT') return;

      if (selectedComponentId) {
        if (e.key === 'Delete' || e.key === 'Backspace') {
          e.preventDefault();
          handleDeleteComponent(selectedComponentId);
        }
        if ((e.metaKey || e.ctrlKey) && e.key === 'd') {
          e.preventDefault();
          handleDuplicateComponent(selectedComponentId);
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedComponentId, presentation, activeSlideIndex]);

  // Add slide helper
  const addSlide = (type: SlideType) => {
    const newId = `slide_${Date.now()}`;
    const newSlide: Slide = {
      id: newId,
      title: `New ${type.toUpperCase()} Slide`,
      slideType: type,
      motionPreset: 'premium',
      background: {
        type: 'color',
        value: '#05080F',
        opacity: 1,
        blur: 0,
        overlayTint: '#000000',
        overlayOpacity: 0,
        focalPointX: 50,
        focalPointY: 50,
        cropMode: 'cover',
      },
      components: [],
    };

    // Pre-populate slide components based on slide type
    if (type === 'hero') {
      newSlide.components = [
        {
          id: `hero_stack_${Date.now()}`,
          type: 'stack',
          layout: {
            width: 'fill',
            height: 'fill',
            direction: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '2cqmin',
            padding: '8cqmin',
          },
          dataBindings: {},
          children: [
            {
              id: `headline_${Date.now()}_1`,
              type: 'headline',
              dataBindings: {},
              layout: { width: 'fit', height: 'fit' },
              localProps: { tag: 'h1', text: 'ENTER HERO TITLE HERE' },
            },
            {
              id: `paragraph_${Date.now()}_2`,
              type: 'paragraph',
              dataBindings: {},
              layout: { width: 'fill', height: 'fit', maxWidth: '70%' },
              localProps: { text: 'Insert a short descriptive subtitle about this slide.' },
            },
          ],
        },
      ];
    } else if (type === 'kpi') {
      newSlide.components = [
        {
          id: `kpi_grid_${Date.now()}`,
          type: 'grid',
          layout: {
            width: 'fill',
            height: 'fill',
            gap: '3cqmin',
            padding: '8cqmin',
            alignItems: 'center',
          },
          dataBindings: {},
          localProps: { columns: 2 },
          children: [
            {
              id: `kpi_1_${Date.now()}`,
              type: 'kpi',
              dataBindings: {},
              layout: { width: 'fill', height: 'fit' },
              localProps: { label: 'Metric One', value: 85, suffix: '%' },
            },
            {
              id: `kpi_2_${Date.now()}`,
              type: 'kpi',
              dataBindings: {},
              layout: { width: 'fill', height: 'fit' },
              localProps: { label: 'Metric Two', value: 1240, prefix: '$' },
            },
          ],
        },
      ];
    } else if (type === 'quote') {
      newSlide.components = [
        {
          id: `quote_container_${Date.now()}`,
          type: 'container',
          layout: {
            width: 'fill',
            height: 'fill',
            padding: '8cqmin',
          },
          dataBindings: {},
          children: [
            {
              id: `quote_${Date.now()}`,
              type: 'quote',
              dataBindings: {},
              layout: { width: 'fill', height: 'fit', maxWidth: '80%' },
              localProps: { text: 'This is a premium quote placeholder.', author: 'Speaker Name' },
            },
          ],
        },
      ];
    } else {
      // Default placeholder text component
      newSlide.components = [
        {
          id: `text_${Date.now()}`,
          type: 'container',
          layout: { width: 'fill', height: 'fill', padding: '6cqmin' },
          dataBindings: {},
          children: [
            {
              id: `headline_${Date.now()}`,
              type: 'headline',
              dataBindings: {},
              layout: { width: 'fill', height: 'fit' },
              localProps: { tag: 'h2', text: 'Custom Composition' },
            },
          ],
        },
      ];
    }

    const updatedSlides = [...presentation.slides];
    updatedSlides.splice(activeSlideIndex + 1, 0, newSlide);

    onChangePresentation({
      ...presentation,
      slides: updatedSlides,
    });
    setActiveSlideIndex(activeSlideIndex + 1);
  };

  // Delete slide helper
  const deleteSlide = (idx: number, e: React.MouseEvent) => {
    e.stopPropagation();
    if (presentation.slides.length <= 1) {
      alert("A presentation must contain at least one slide.");
      return;
    }
    const updatedSlides = presentation.slides.filter((_, sIdx) => sIdx !== idx);
    onChangePresentation({
      ...presentation,
      slides: updatedSlides,
    });
    
    // Adjust active index
    if (activeSlideIndex >= updatedSlides.length) {
      setActiveSlideIndex(updatedSlides.length - 1);
    }
  };

  // Reordering helpers
  const moveSlide = (idx: number, direction: 'up' | 'down', e: React.MouseEvent) => {
    e.stopPropagation();
    if (direction === 'up' && idx === 0) return;
    if (direction === 'down' && idx === presentation.slides.length - 1) return;

    const updatedSlides = [...presentation.slides];
    const targetIdx = direction === 'up' ? idx - 1 : idx + 1;
    
    // Swap
    const temp = updatedSlides[idx];
    updatedSlides[idx] = updatedSlides[targetIdx];
    updatedSlides[targetIdx] = temp;

    onChangePresentation({
      ...presentation,
      slides: updatedSlides,
    });
    setActiveSlideIndex(targetIdx);
  };

  return (
    <div className="dash-workspace">
      
      {/* 1. EDITOR HEADER */}
      <header className="dash-editor-header">
        <div className="header-logo-group">
          <Layers className="icon-logo" />
          <div className="header-titles">
            <h1 className="proj-title">{presentation.title}</h1>
            <span className="badge-live-connection">DYNAMIC STAGE SYNC</span>
          </div>
        </div>

        <div className="header-controls">
          {/* Aspect Ratio / Venue Picker */}
          <div className="control-group">
            <span className="control-label">Venue Aspect Ratio:</span>
            <select
              className="header-select"
              value={activeVenue.id}
              onChange={(e) => {
                const targetProfile = VENUE_PROFILES[e.target.value];
                if (targetProfile) setActiveVenue({ ...targetProfile });
              }}
            >
              {Object.values(VENUE_PROFILES).map((v) => (
                <option key={v.id} value={v.id}>
                  {v.label} ({v.ratio.toFixed(2)}:1)
                </option>
              ))}
            </select>
          </div>

          {/* Custom Width & Height Inputs */}
          {activeVenue.id === 'custom' && (
            <div className="control-group" style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
              <span className="control-label">Resolution:</span>
              <input
                type="number"
                min="200"
                max="8000"
                className="header-select"
                style={{ width: '80px', padding: '4px 8px' }}
                value={activeVenue.width}
                onChange={(e) => {
                  const newW = Math.max(200, parseInt(e.target.value) || 1800);
                  setActiveVenue({
                    ...activeVenue,
                    width: newW,
                    ratio: newW / activeVenue.height,
                  });
                }}
              />
              <span style={{ color: 'var(--t3)', fontSize: '12px' }}>×</span>
              <input
                type="number"
                min="200"
                max="8000"
                className="header-select"
                style={{ width: '80px', padding: '4px 8px' }}
                value={activeVenue.height}
                onChange={(e) => {
                  const newH = Math.max(200, parseInt(e.target.value) || 1200);
                  setActiveVenue({
                    ...activeVenue,
                    height: newH,
                    ratio: activeVenue.width / newH,
                  });
                }}
              />
              <span style={{ color: 'var(--t3)', fontSize: '11px' }}>px</span>
            </div>
          )}

          {/* Safe Area guides toggle */}
          <button
            className={`btn-action ${showSafeAreas ? 'btn-active' : ''}`}
            onClick={() => setShowSafeAreas(!showSafeAreas)}
            title="Toggle Safe Area (Layer 5 guidelines)"
          >
            {showSafeAreas ? <EyeOff size={16} /> : <Eye size={16} />}
            <span>{showSafeAreas ? 'Hide Safe Area' : 'Show Safe Area'}</span>
          </button>

          {/* Undo / Redo */}
          <div className="control-group" style={{ display: 'flex', gap: '4px' }}>
            <button
              className="btn-action"
              onClick={onUndo}
              disabled={!canUndo}
              title="Undo (⌘Z)"
              style={{ opacity: canUndo ? 1 : 0.35 }}
            >
              <Undo2 size={16} />
              <span>Undo</span>
            </button>
            <button
              className="btn-action"
              onClick={onRedo}
              disabled={!canRedo}
              title="Redo (⌘⇧Z)"
              style={{ opacity: canRedo ? 1 : 0.35 }}
            >
              <Redo2 size={16} />
              <span>Redo</span>
            </button>
          </div>

          <button className="btn-action" onClick={replayMotion} title="Replay active slide motion preset">
            <RefreshCw size={16} />
            <span>Replay</span>
          </button>

          <button 
            className="btn-action" 
            onClick={handleSaveSession} 
            disabled={isSaving}
            title="Save changes to local defaultPresentation.ts file"
          >
            <Save size={16} />
            <span>{isSaving ? 'Saving...' : 'Save Session'}</span>
          </button>

          {/* Reset to Default */}
          <button
            className="btn-reset"
            onClick={() => setShowResetConfirm(true)}
            title="Discard all changes and restore the original default presentation"
          >
            <RotateCcw size={14} />
            <span>Reset</span>
          </button>

          {/* Launch Runtime */}
          <button className="btn-present" onClick={onLaunchPresenter}>
            <Play size={16} fill="currentColor" />
            <span>Launch Presentation</span>
          </button>
        </div>
      </header>

      {/* 2. THREE-PANEL CORE SPLIT */}
      <div className="editor-layout-body">
        
        {/* LEFT PANEL: SLIDE LIST NAVIGATOR */}
        <aside className="editor-left-sidebar">
          <div className="sidebar-header">
            <h3>Slides ({presentation.slides.length})</h3>
            <div className="add-slide-dropdown-container">
              <select 
                className="add-slide-dropdown" 
                onChange={(e) => {
                  if(e.target.value) {
                    addSlide(e.target.value as SlideType);
                    e.target.value = ''; // Reset dropdown
                  }
                }}
              >
                <option value="">+ Add Slide...</option>
                <option value="hero">Hero Title</option>
                <option value="kpi">KPI Dashboard</option>
                <option value="quote">Quote Block</option>
                <option value="chart">Custom Composition</option>
              </select>
            </div>
          </div>
          
          <div className="slides-list-scrollable">
            {presentation.slides.map((slide, idx) => {
              const isActive = idx === activeSlideIndex;
              return (
                <div
                  key={slide.id}
                  className={`slide-nav-card ${isActive ? 'slide-nav-active' : ''}`}
                  onClick={() => setActiveSlideIndex(idx)}
                >
                  <div className="slide-card-index">{idx + 1}</div>
                  <div className="slide-card-info">
                    <span className="slide-card-title">{slide.title}</span>
                    <span className="slide-card-type">{slide.slideType.toUpperCase()} • {slide.motionPreset}</span>
                  </div>
                  
                  {/* Reordering / deleting slide actions */}
                  <div className="slide-card-actions">
                    <button
                      className="btn-card-action"
                      disabled={idx === 0}
                      onClick={(e) => moveSlide(idx, 'up', e)}
                    >
                      <ArrowUp size={12} />
                    </button>
                    <button
                      className="btn-card-action"
                      disabled={idx === presentation.slides.length - 1}
                      onClick={(e) => moveSlide(idx, 'down', e)}
                    >
                      <ArrowDown size={12} />
                    </button>
                    <button
                      className="btn-card-action btn-delete"
                      onClick={(e) => deleteSlide(idx, e)}
                    >
                      <Trash size={12} />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </aside>

        {/* CENTER PANEL: INTERACTIVE VIEWPORT STAGE */}
        <main className="editor-center-stage" onClick={() => setSelectedComponentId(null)}>
          {activeSlide ? (
            <div className={`motion-${activeSlide.motionPreset}`} style={{ width: '100%', height: '100%' }}>
              <VenueAdapter
                key={`${activeSlide.id}_${animKey}`}
                profile={activeVenue}
                showSafeAreas={showSafeAreas}
                slide={activeSlide}
              >
                <div className="slide-active" style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column' }}>
                  {activeSlide.components.map((c) => (
                    <ComponentRenderer
                      key={c.id}
                      component={c}
                      variables={presentation.variables}
                      selectedComponentId={selectedComponentId}
                      onSelectComponent={setSelectedComponentId}
                      onUpdateComponent={handleUpdateComponent}
                      onUpdateComponentDraft={handleUpdateComponentDraft}
                      isEditor={true}
                    />
                  ))}
                </div>
              </VenueAdapter>
            </div>
          ) : (
            <div className="empty-stage-message">
              No Slides Found. Click "+ Add Slide" to create a new layout.
            </div>
          )}
        </main>

        {/* RIGHT PANEL: INSPECTOR & VARIABLE DATA EDITOR */}
        <aside className="editor-right-sidebar">
          <DataEditor
            presentation={presentation}
            onChangePresentation={onChangePresentation}
            activeSlideIndex={activeSlideIndex}
            selectedComponentId={selectedComponentId}
            onUpdateComponent={handleUpdateComponent}
          />
        </aside>

      </div>

      {/* ── Toast notification ── */}
      {toast && (
        <div
          style={{
            position: 'fixed',
            bottom: '24px',
            left: '50%',
            transform: 'translateX(-50%)',
            background: toast.type === 'success' ? 'rgba(126,203,161,0.15)' : 'rgba(224,82,82,0.15)',
            border: `1px solid ${toast.type === 'success' ? 'var(--color-positive)' : 'var(--ui-danger)'}`,
            color: toast.type === 'success' ? 'var(--color-positive)' : '#ef9a9a',
            padding: '10px 20px',
            borderRadius: '8px',
            fontSize: '13px',
            fontWeight: 500,
            backdropFilter: 'blur(8px)',
            zIndex: 99999,
            whiteSpace: 'nowrap',
            boxShadow: '0 4px 20px rgba(0,0,0,0.4)',
            animation: 'toast-in 0.2s ease',
          }}
        >
          {toast.message}
        </div>
      )}

      {/* ── Reset Confirmation Modal ── */}
      {showResetConfirm && (
        <div
          className="confirm-modal-backdrop"
          onClick={(e) => { if (e.target === e.currentTarget) setShowResetConfirm(false); }}
        >
          <div className="confirm-modal">
            <div className="confirm-modal-icon">
              <AlertTriangle size={24} />
            </div>
            <h2 className="confirm-modal-title">Reset to Default?</h2>
            <p className="confirm-modal-msg">
              This will <strong>discard all unsaved changes</strong> and restore the
              presentation to its original default state. The undo history will also
              be cleared. This action cannot be undone.
            </p>
            <div className="confirm-modal-actions">
              <button
                className="btn-confirm-cancel"
                onClick={() => setShowResetConfirm(false)}
              >
                Cancel
              </button>
              <button
                className="btn-confirm-reset"
                onClick={() => {
                  setShowResetConfirm(false);
                  onReset();
                  showToast('Presentation reset to defaults');
                }}
              >
                <RotateCcw size={14} style={{ display: 'inline', marginRight: '6px', verticalAlign: 'middle' }} />
                Yes, Reset
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default AdminDashboard;

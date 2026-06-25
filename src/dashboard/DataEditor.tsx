import React, { useState } from 'react';
import type { Presentation, Slide, MotionPreset, ComponentDefinition } from '../types';
import { Upload, X } from 'lucide-react';

interface DataEditorProps {
  presentation: Presentation;
  onChangePresentation: (p: Presentation) => void;
  activeSlideIndex: number;
  selectedComponentId: string | null;
  onUpdateComponent: (componentId: string, updater: (c: ComponentDefinition) => ComponentDefinition) => void;
  onDeselectComponent?: () => void;
}

export const DataEditor: React.FC<DataEditorProps> = ({
  presentation,
  onChangePresentation,
  activeSlideIndex,
  selectedComponentId,
  onUpdateComponent,
  onDeselectComponent,
}) => {
  const activeSlide = presentation.slides[activeSlideIndex];
  const [snapToGrid, setSnapToGrid] = useState(true);

  // Helper to update global variables
  const handleVariableChange = (key: string, value: any) => {
    const updatedVariables = { ...presentation.variables, [key]: value };
    onChangePresentation({
      ...presentation,
      variables: updatedVariables,
    });
  };

  /**
   * Collect all variable keys referenced by a slide's component tree.
   * Scans dataBindings AND all string localProps (text, title, subtitle…)
   * for {{varName}} template tokens.
   */
  const getSlideVariableKeys = (components: ComponentDefinition[]): Set<string> => {
    const keys = new Set<string>();
    const extract = (str: string) => {
      for (const m of str.matchAll(/\{\{(\w+)\}\}/g)) keys.add(m[1]);
    };
    const walk = (list: ComponentDefinition[]) => {
      for (const c of list) {
        // dataBindings
        Object.values(c.dataBindings).forEach(v => extract(String(v)));
        // localProps — any string value may contain {{var}} interpolations
        if (c.localProps) {
          Object.values(c.localProps).forEach(v => {
            if (typeof v === 'string') extract(v);
          });
        }
        if (c.children) walk(c.children);
      }
    };
    walk(components);
    return keys;
  };

  // Helper to update active slide properties
  const handleSlidePropChange = (field: keyof Slide | string, value: any, isNestedBackground = false) => {
    const updatedSlides = presentation.slides.map((s, idx) => {
      if (idx !== activeSlideIndex) return s;
      if (isNestedBackground) {
        return {
          ...s,
          background: {
            ...s.background,
            [field]: value,
          },
        };
      }
      return {
        ...s,
        [field]: value,
      };
    });
    
    onChangePresentation({
      ...presentation,
      slides: updatedSlides,
    });
  };

  // Recursively find a component by ID
  const findComponentById = (components: ComponentDefinition[], id: string): ComponentDefinition | null => {
    for (const c of components) {
      if (c.id === id) return c;
      if (c.children) {
        const found = findComponentById(c.children, id);
        if (found) return found;
      }
    }
    return null;
  };

  // Parse numerical value from CSS string (e.g., "8cqmin" -> 8, "50%" -> 50)
  const parseNumberVal = (str: string | undefined | null): number => {
    if (!str) return 0;
    const match = str.match(/^([\d.]+)/);
    return match ? parseFloat(match[1]) : 0;
  };

  const selectedComponent = selectedComponentId && activeSlide
    ? findComponentById(activeSlide.components, selectedComponentId)
    : null;

  // Render Component Inspector
  const renderComponentInspector = (c: ComponentDefinition) => {
    const isLayoutComp = ['stack', 'grid', 'columns', 'container'].includes(c.type);
    const isTextComp = ['headline', 'paragraph', 'quote', 'hero', 'section-divider'].includes(c.type);

    // Layout values
    const widthVal = c.layout.width || 'fill';
    const heightVal = c.layout.height || 'fit';
    const widthType = (widthVal === 'fill' || widthVal === 'fit') ? widthVal : 'custom';
    const heightType = (heightVal === 'fill' || heightVal === 'fit') ? heightVal : 'custom';

    const numericWidth = widthType === 'custom' ? parseNumberVal(widthVal) : 50;
    const numericHeight = heightType === 'custom' ? parseNumberVal(heightVal) : 50;

    const paddingVal = c.layout.padding || '0cqmin';
    const gapVal = c.layout.gap || '0cqmin';
    const numericPadding = parseNumberVal(paddingVal);
    const numericGap = parseNumberVal(gapVal);

    const handleWidthChange = (type: string, numericVal?: number) => {
      let newVal = type;
      if (type === 'custom') {
        let v = numericVal ?? 50;
        if (snapToGrid) {
          const options = [10, 20, 25, 30, 33.33, 40, 50, 60, 66.67, 70, 75, 80, 90, 100];
          v = options.reduce((prev, curr) => Math.abs(curr - v) < Math.abs(prev - v) ? curr : prev);
        }
        newVal = `${Math.round(v * 100) / 100}%`;
      }
      onUpdateComponent(c.id, (prev) => ({
        ...prev,
        layout: { ...prev.layout, width: newVal }
      }));
    };

    const handleHeightChange = (type: string, numericVal?: number) => {
      let newVal = type;
      if (type === 'custom') {
        let v = numericVal ?? 50;
        if (snapToGrid) {
          const options = [10, 20, 25, 30, 33.33, 40, 50, 60, 66.67, 70, 75, 80, 90, 100];
          v = options.reduce((prev, curr) => Math.abs(curr - v) < Math.abs(prev - v) ? curr : prev);
        }
        newVal = `${Math.round(v * 100) / 100}%`;
      }
      onUpdateComponent(c.id, (prev) => ({
        ...prev,
        layout: { ...prev.layout, height: newVal }
      }));
    };

    const handlePaddingChange = (v: number) => {
      let finalVal = v;
      if (snapToGrid) {
        finalVal = Math.round(v / 2) * 2;
      }
      onUpdateComponent(c.id, (prev) => ({
        ...prev,
        layout: { ...prev.layout, padding: `${finalVal}cqmin` }
      }));
    };

    const handleGapChange = (v: number) => {
      let finalVal = v;
      if (snapToGrid) {
        finalVal = Math.round(v / 2) * 2;
      }
      onUpdateComponent(c.id, (prev) => ({
        ...prev,
        layout: { ...prev.layout, gap: `${finalVal}cqmin` }
      }));
    };

    return (
      <div className="editor-section">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <span className="badge-live-connection">{c.type.toUpperCase()} INSPECTOR</span>
          {onDeselectComponent && (
            <button 
              className="btn-action sm" 
              style={{ padding: '4px 8px', fontSize: '11px', display: 'flex', alignItems: 'center', gap: '4px' }}
              onClick={(e) => { e.stopPropagation(); onDeselectComponent(); }}
            >
              <X size={10} />
              <span>Close</span>
            </button>
          )}
        </div>

        {/* 1. TEXT CONTROLS */}
        {isTextComp && (
          <div className="editor-subsection">
            <h4 className="subsection-header">Text Content</h4>
            
            {/* Title / Text */}
            {c.localProps && 'text' in c.localProps && (
              <div className="editor-field-group">
                <label className="editor-label">Text Content</label>
                <textarea
                  className="editor-textarea"
                  style={{ minHeight: '80px' }}
                  value={c.localProps.text || ''}
                  onChange={(e) => {
                    onUpdateComponent(c.id, (prev) => ({
                      ...prev,
                      localProps: { ...prev.localProps, text: e.target.value }
                    }));
                  }}
                />
              </div>
            )}

            {c.localProps && 'title' in c.localProps && (
              <div className="editor-field-group">
                <label className="editor-label">Title</label>
                <input
                  type="text"
                  className="editor-input"
                  value={c.localProps.title || ''}
                  onChange={(e) => {
                    onUpdateComponent(c.id, (prev) => ({
                      ...prev,
                      localProps: { ...prev.localProps, title: e.target.value }
                    }));
                  }}
                />
              </div>
            )}

            {c.localProps && 'subtitle' in c.localProps && (
              <div className="editor-field-group">
                <label className="editor-label">Subtitle</label>
                <textarea
                  className="editor-textarea"
                  style={{ minHeight: '60px' }}
                  value={c.localProps.subtitle || ''}
                  onChange={(e) => {
                    onUpdateComponent(c.id, (prev) => ({
                      ...prev,
                      localProps: { ...prev.localProps, subtitle: e.target.value }
                    }));
                  }}
                />
              </div>
            )}

            {c.localProps && 'badge' in c.localProps && (
              <div className="editor-field-group">
                <label className="editor-label">Badge</label>
                <input
                  type="text"
                  className="editor-input"
                  value={c.localProps.badge || ''}
                  onChange={(e) => {
                    onUpdateComponent(c.id, (prev) => ({
                      ...prev,
                      localProps: { ...prev.localProps, badge: e.target.value }
                    }));
                  }}
                />
              </div>
            )}

            {c.localProps && 'author' in c.localProps && (
              <div className="editor-field-group">
                <label className="editor-label">Author</label>
                <input
                  type="text"
                  className="editor-input"
                  value={c.localProps.author || ''}
                  onChange={(e) => {
                    onUpdateComponent(c.id, (prev) => ({
                      ...prev,
                      localProps: { ...prev.localProps, author: e.target.value }
                    }));
                  }}
                />
              </div>
            )}
          </div>
        )}

        {/* KPI controls */}
        {c.type === 'kpi' && c.localProps && (
          <div className="editor-subsection">
            <h4 className="subsection-header">KPI Properties</h4>
            <div className="editor-field-group">
              <label className="editor-label">Label</label>
              <input
                type="text"
                className="editor-input"
                value={c.localProps.label || ''}
                onChange={(e) => onUpdateComponent(c.id, prev => ({
                  ...prev,
                  localProps: { ...prev.localProps, label: e.target.value }
                }))}
              />
            </div>
            <div className="editor-row">
              <div className="editor-field-group flex-1">
                <label className="editor-label">Value</label>
                <input
                  type="number"
                  className="editor-input"
                  value={c.localProps.value ?? 0}
                  onChange={(e) => onUpdateComponent(c.id, prev => ({
                    ...prev,
                    localProps: { ...prev.localProps, value: parseFloat(e.target.value) || 0 }
                  }))}
                />
              </div>
              <div className="editor-field-group flex-1">
                <label className="editor-label">Prefix</label>
                <input
                  type="text"
                  className="editor-input"
                  value={c.localProps.prefix || ''}
                  onChange={(e) => onUpdateComponent(c.id, prev => ({
                    ...prev,
                    localProps: { ...prev.localProps, prefix: e.target.value }
                  }))}
                />
              </div>
              <div className="editor-field-group flex-1">
                <label className="editor-label">Suffix</label>
                <input
                  type="text"
                  className="editor-input"
                  value={c.localProps.suffix || ''}
                  onChange={(e) => onUpdateComponent(c.id, prev => ({
                    ...prev,
                    localProps: { ...prev.localProps, suffix: e.target.value }
                  }))}
                />
              </div>
            </div>
          </div>
        )}

        {/* Chart Data point editing */}
        {c.localProps?.data && Array.isArray(c.localProps.data) && (
          <div className="editor-subsection">
            <h4 className="subsection-header">Chart Data Points</h4>
            {c.localProps.data.map((item: any, idx: number) => (
              <div key={idx} style={{ display: 'flex', gap: '6px', marginBottom: '8px', alignItems: 'center' }}>
                <input
                  type="text"
                  className="editor-input"
                  style={{ flex: 2, fontSize: '11px', padding: '6px' }}
                  placeholder="Label"
                  value={item.label || ''}
                  onChange={(e) => {
                    const updatedData = [...(c.localProps?.data || [])];
                    updatedData[idx] = { ...item, label: e.target.value };
                    onUpdateComponent(c.id, (prev) => ({
                      ...prev,
                      localProps: { ...prev.localProps, data: updatedData }
                    }));
                  }}
                />
                <input
                  type="number"
                  className="editor-input"
                  style={{ flex: 1, fontSize: '11px', padding: '6px' }}
                  placeholder="Value"
                  value={item.value ?? 0}
                  onChange={(e) => {
                    const updatedData = [...(c.localProps?.data || [])];
                    updatedData[idx] = { ...item, value: parseFloat(e.target.value) || 0 };
                    onUpdateComponent(c.id, (prev) => ({
                      ...prev,
                      localProps: { ...prev.localProps, data: updatedData }
                    }));
                  }}
                />
                <input
                  type="color"
                  className="editor-color-picker"
                  style={{ width: '24px', height: '24px', padding: 0 }}
                  value={item.color || '#C9A84C'}
                  onChange={(e) => {
                    const updatedData = [...(c.localProps?.data || [])];
                    updatedData[idx] = { ...item, color: e.target.value };
                    onUpdateComponent(c.id, (prev) => ({
                      ...prev,
                      localProps: { ...prev.localProps, data: updatedData }
                    }));
                  }}
                />
              </div>
            ))}
          </div>
        )}

        {/* 2. PLACEMENT & ALIGNMENT CONTROLS */}
        <div className="editor-subsection border-top" style={{ marginTop: '16px', paddingTop: '16px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
            <h4 className="subsection-header" style={{ margin: 0 }}>Placement & Alignment</h4>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <input
                type="checkbox"
                id="snap-grid-checkbox"
                className="editor-checkbox"
                checked={snapToGrid}
                onChange={(e) => setSnapToGrid(e.target.checked)}
              />
              <label htmlFor="snap-grid-checkbox" className="editor-label" style={{ margin: 0, fontSize: '11px', cursor: 'pointer' }}>Snap Grid</label>
            </div>
          </div>

          {/* Width selection */}
          <div className="editor-field-group">
            <label className="editor-label">Width Type</label>
            <select
              className="editor-select"
              value={widthType}
              onChange={(e) => handleWidthChange(e.target.value)}
            >
              <option value="fill">Fill Space (fill)</option>
              <option value="fit">Fit Content (fit)</option>
              <option value="custom">Custom Size</option>
            </select>
          </div>
          {widthType === 'custom' && (
            <div className="editor-field-group">
              <label className="editor-label">Custom Width ({numericWidth}%)</label>
              <input
                type="range" min="10" max="100"
                className="editor-slider"
                value={numericWidth}
                onChange={(e) => handleWidthChange('custom', parseInt(e.target.value))}
              />
            </div>
          )}

          {/* Height selection */}
          <div className="editor-field-group">
            <label className="editor-label">Height Type</label>
            <select
              className="editor-select"
              value={heightType}
              onChange={(e) => handleHeightChange(e.target.value)}
            >
              <option value="fill">Fill Space (fill)</option>
              <option value="fit">Fit Content (fit)</option>
              <option value="custom">Custom Size</option>
            </select>
          </div>
          {heightType === 'custom' && (
            <div className="editor-field-group">
              <label className="editor-label">Custom Height ({numericHeight}%)</label>
              <input
                type="range" min="10" max="100"
                className="editor-slider"
                value={numericHeight}
                onChange={(e) => handleHeightChange('custom', parseInt(e.target.value))}
              />
            </div>
          )}

          {/* Padding */}
          <div className="editor-field-group">
            <label className="editor-label">Padding ({numericPadding} cqmin)</label>
            <input
              type="range" min="0" max="16" step="0.5"
              className="editor-slider"
              value={numericPadding}
              onChange={(e) => handlePaddingChange(parseFloat(e.target.value))}
            />
          </div>

          {/* Gap (only for layouts) */}
          {isLayoutComp && (
            <div className="editor-field-group">
              <label className="editor-label">Gap ({numericGap} cqmin)</label>
              <input
                type="range" min="0" max="12" step="0.5"
                className="editor-slider"
                value={numericGap}
                onChange={(e) => handleGapChange(parseFloat(e.target.value))}
              />
            </div>
          )}

          {/* Layout-specific alignments */}
          {c.type === 'stack' && (
            <div className="editor-field-group">
              <label className="editor-label">Direction</label>
              <select
                className="editor-select"
                value={c.layout.direction || 'column'}
                onChange={(e) => onUpdateComponent(c.id, prev => ({
                  ...prev,
                  layout: { ...prev.layout, direction: e.target.value as any }
                }))}
              >
                <option value="column">Vertical Stack (Column)</option>
                <option value="row">Horizontal Stack (Row)</option>
              </select>
            </div>
          )}

          {isLayoutComp && (
            <>
              <div className="editor-field-group">
                <label className="editor-label">Justify Content (Distribute)</label>
                <select
                  className="editor-select"
                  value={c.layout.justifyContent || 'start'}
                  onChange={(e) => onUpdateComponent(c.id, prev => ({
                    ...prev,
                    layout: { ...prev.layout, justifyContent: e.target.value as any }
                  }))}
                >
                  <option value="start">Align Start</option>
                  <option value="center">Align Center</option>
                  <option value="end">Align End</option>
                  <option value="between">Space Between</option>
                  <option value="around">Space Around</option>
                </select>
              </div>

              <div className="editor-field-group">
                <label className="editor-label">Align Items (Stretch/Cross-align)</label>
                <select
                  className="editor-select"
                  value={c.layout.alignItems || 'start'}
                  onChange={(e) => onUpdateComponent(c.id, prev => ({
                    ...prev,
                    layout: { ...prev.layout, alignItems: e.target.value as any }
                  }))}
                >
                  <option value="start">Align Start</option>
                  <option value="center">Align Center</option>
                  <option value="end">Align End</option>
                  <option value="stretch">Stretch to Fit</option>
                </select>
              </div>
            </>
          )}

          {/* Text Alignment */}
          {isTextComp && (
            <div className="editor-field-group">
              <label className="editor-label">Text Alignment</label>
              <select
                className="editor-select"
                value={c.localProps?.style?.textAlign || 'left'}
                onChange={(e) => onUpdateComponent(c.id, prev => ({
                  ...prev,
                  localProps: {
                    ...prev.localProps,
                    style: { ...(prev.localProps?.style || {}), textAlign: e.target.value }
                  }
                }))}
              >
                <option value="left">Left</option>
                <option value="center">Center</option>
                <option value="right">Right</option>
                <option value="justify">Justify</option>
              </select>
            </div>
          )}
        </div>

        {/* TYPOGRAPHY CONTROLS */}
        {isTextComp && (() => {
          const currentStyle = c.localProps?.style || {};
          const currentFontWeight = String(currentStyle.fontWeight || '');
          const currentLetterSpacing = parseFloat(String(currentStyle.letterSpacing || '0')) || 0;
          const currentLineHeight = parseFloat(String(currentStyle.lineHeight || '0')) || 0;
          const currentColor = String(currentStyle.color || '#ffffff');

          const updateStyle = (patch: Record<string, any>) =>
            onUpdateComponent(c.id, prev => ({
              ...prev,
              localProps: {
                ...prev.localProps,
                style: { ...(prev.localProps?.style || {}), ...patch }
              }
            }));

          const currentFontFamily = String(currentStyle.fontFamily || '');
          const currentFontStyle  = String(currentStyle.fontStyle  || '');

          // Canonical font options — 3 families, all weights
          const FONT_OPTIONS = [
            { label: '— Theme Default —',     value: '' },
            { label: 'Inter Tight (Sans)',     value: "'Inter Tight', system-ui, sans-serif" },
            { label: 'Instrument Serif',       value: "'Instrument Serif', Georgia, serif" },
            { label: 'Ivy Presto',             value: "'Ivy Presto', Georgia, serif" },
          ];

          return (
            <div className="editor-subsection border-top" style={{ marginTop: '16px', paddingTop: '16px' }}>
              <h4 className="subsection-header">Typography</h4>

              {/* Font Family */}
              <div className="editor-field-group">
                <label className="editor-label">Font Family</label>
                <select
                  className="editor-select"
                  value={currentFontFamily}
                  onChange={(e) => {
                    if (!e.target.value) {
                      const { fontFamily: _r, ...rest } = currentStyle;
                      onUpdateComponent(c.id, prev => ({
                        ...prev,
                        localProps: { ...prev.localProps, style: rest }
                      }));
                    } else {
                      updateStyle({ fontFamily: e.target.value });
                    }
                  }}
                >
                  {FONT_OPTIONS.map(o => (
                    <option key={o.value} value={o.value}>{o.label}</option>
                  ))}
                </select>
              </div>

              {/* Italic toggle */}
              <div className="editor-field-group">
                <label className="editor-label">Style</label>
                <div style={{ display: 'flex', gap: '6px' }}>
                  {(['normal', 'italic'] as const).map(s => (
                    <button
                      key={s}
                      className={`btn-action sm${currentFontStyle === s || (!currentFontStyle && s === 'normal') ? ' btn-active' : ''}`}
                      style={{ flex: 1, padding: '5px', fontSize: '11px', fontStyle: s }}
                      onClick={() => {
                        if (s === 'normal') {
                          const { fontStyle: _r, ...rest } = currentStyle;
                          onUpdateComponent(c.id, prev => ({
                            ...prev,
                            localProps: { ...prev.localProps, style: rest }
                          }));
                        } else {
                          updateStyle({ fontStyle: s });
                        }
                      }}
                    >
                      {s === 'normal' ? 'Regular' : 'Italic'}
                    </button>
                  ))}
                </div>
              </div>

              {/* Font Size — supports both cqmin (preferred, scales with venue) and px */}
              {(() => {
                const rawSize = String(currentStyle.fontSize || '');
                // Detect stored unit; default new values to cqmin
                const storedUnit = rawSize.includes('px') ? 'px' : rawSize.includes('cqmin') ? 'cqmin' : 'cqmin';
                const sizeNum = parseFloat(rawSize) || 0;
                // Slider range per unit: px 0–120, cqmin 0–15
                const sliderMax  = storedUnit === 'px' ? 120 : 15;
                const sliderStep = storedUnit === 'px' ? 1 : 0.1;

                const applySize = (v: number, unit: string) => {
                  if (v === 0) {
                    const { fontSize: _r, ...rest } = currentStyle;
                    onUpdateComponent(c.id, prev => ({ ...prev, localProps: { ...prev.localProps, style: rest } }));
                  } else {
                    updateStyle({ fontSize: `${v}${unit}` });
                  }
                };

                return (
                  <div className="editor-field-group">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <label className="editor-label" style={{ margin: 0 }}>
                        Font Size{sizeNum > 0 ? ` — ${sizeNum}${storedUnit}` : ' — (theme default)'}
                      </label>
                      {/* Unit toggle */}
                      <div style={{ display: 'flex', gap: '3px' }}>
                        {(['cqmin', 'px'] as const).map(u => (
                          <button
                            key={u}
                            className={`btn-action sm${storedUnit === u ? ' btn-active' : ''}`}
                            style={{ padding: '2px 6px', fontSize: '10px' }}
                            onClick={() => {
                              if (sizeNum === 0) return;
                              // Convert stored value to the other unit
                              // 1 cqmin ≈ 10.8px at 1080p; use 10 as a round conversion
                              const converted = u === 'px'
                                ? Math.round(sizeNum * 10)
                                : Math.round((sizeNum / 10) * 10) / 10;
                              applySize(converted, u);
                            }}
                          >{u}</button>
                        ))}
                      </div>
                    </div>
                    <div style={{ display: 'flex', gap: '8px', alignItems: 'center', marginTop: '6px' }}>
                      <input
                        type="range" min="0" max={sliderMax} step={sliderStep}
                        className="editor-slider"
                        style={{ flex: 1 }}
                        value={sizeNum}
                        onChange={(e) => applySize(parseFloat(e.target.value), storedUnit)}
                      />
                      <span style={{ fontSize: '11px', color: 'var(--t3)', minWidth: '42px', textAlign: 'right' }}>
                        {sizeNum > 0 ? `${sizeNum}${storedUnit}` : 'auto'}
                      </span>
                    </div>
                    {sizeNum > 0 && (
                      <button
                        className="btn-action sm"
                        style={{ marginTop: '4px', padding: '2px 8px', fontSize: '10px' }}
                        onClick={() => applySize(0, storedUnit)}
                      >
                        Reset to theme default
                      </button>
                    )}
                  </div>
                );
              })()}

              {/* Font Weight */}
              <div className="editor-field-group">
                <label className="editor-label">Font Weight</label>
                <select
                  className="editor-select"
                  value={currentFontWeight || ''}
                  onChange={(e) => {
                    if (!e.target.value) {
                      const { fontWeight: _removed, ...rest } = currentStyle;
                      onUpdateComponent(c.id, prev => ({
                        ...prev,
                        localProps: { ...prev.localProps, style: rest }
                      }));
                    } else {
                      updateStyle({ fontWeight: e.target.value });
                    }
                  }}
                >
                  <option value="">— Theme Default —</option>
                  <option value="300">300 · Light</option>
                  <option value="400">400 · Regular</option>
                  <option value="500">500 · Medium</option>
                  <option value="600">600 · SemiBold</option>
                  <option value="700">700 · Bold</option>
                  <option value="800">800 · ExtraBold</option>
                  <option value="900">900 · Black</option>
                </select>
              </div>

              {/* Letter Spacing */}
              <div className="editor-field-group">
                <label className="editor-label">
                  Letter Spacing{currentLetterSpacing !== 0 ? ` — ${currentLetterSpacing}px` : ' — (theme default)'}
                </label>
                <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                  <input
                    type="range" min="-2" max="10" step="0.1"
                    className="editor-slider"
                    style={{ flex: 1 }}
                    value={currentLetterSpacing}
                    onChange={(e) => {
                      const v = parseFloat(e.target.value);
                      if (v === 0) {
                        const { letterSpacing: _removed, ...rest } = currentStyle;
                        onUpdateComponent(c.id, prev => ({
                          ...prev,
                          localProps: { ...prev.localProps, style: rest }
                        }));
                      } else {
                        updateStyle({ letterSpacing: `${v}px` });
                      }
                    }}
                  />
                  <span style={{ fontSize: '11px', color: 'var(--t3)', minWidth: '34px', textAlign: 'right' }}>
                    {currentLetterSpacing !== 0 ? `${currentLetterSpacing}px` : 'auto'}
                  </span>
                </div>
              </div>

              {/* Line Height */}
              <div className="editor-field-group">
                <label className="editor-label">
                  Line Height{currentLineHeight > 0 ? ` — ${currentLineHeight}` : ' — (theme default)'}
                </label>
                <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                  <input
                    type="range" min="0" max="3" step="0.05"
                    className="editor-slider"
                    style={{ flex: 1 }}
                    value={currentLineHeight}
                    onChange={(e) => {
                      const v = parseFloat(e.target.value);
                      if (v === 0) {
                        const { lineHeight: _removed, ...rest } = currentStyle;
                        onUpdateComponent(c.id, prev => ({
                          ...prev,
                          localProps: { ...prev.localProps, style: rest }
                        }));
                      } else {
                        updateStyle({ lineHeight: v });
                      }
                    }}
                  />
                  <span style={{ fontSize: '11px', color: 'var(--t3)', minWidth: '34px', textAlign: 'right' }}>
                    {currentLineHeight > 0 ? currentLineHeight.toFixed(2) : 'auto'}
                  </span>
                </div>
              </div>

              {/* Text Color */}
              <div className="editor-field-group">
                <label className="editor-label">Text Color</label>
                <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                  <input
                    type="color"
                    className="editor-color-picker"
                    style={{ width: '36px', height: '28px', padding: '2px', borderRadius: '6px', cursor: 'pointer' }}
                    value={currentColor.startsWith('#') ? currentColor : '#ffffff'}
                    onChange={(e) => updateStyle({ color: e.target.value })}
                  />
                  <input
                    type="text"
                    className="editor-input"
                    style={{ flex: 1, fontSize: '11px', fontFamily: 'monospace' }}
                    value={currentColor}
                    onChange={(e) => updateStyle({ color: e.target.value })}
                    placeholder="#ffffff or rgba(...)"
                  />
                  {currentStyle.color && (
                    <button
                      className="btn-action sm"
                      style={{ padding: '2px 8px', fontSize: '10px', whiteSpace: 'nowrap' }}
                      onClick={() => {
                        const { color: _removed, ...rest } = currentStyle;
                        onUpdateComponent(c.id, prev => ({
                          ...prev,
                          localProps: { ...prev.localProps, style: rest }
                        }));
                      }}
                    >
                      Reset
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })()}


        {/* 3. IMAGE COMPONENT UPLOAD & CONTROLS */}
        {c.type === 'image' && (
          <div className="editor-subsection border-top" style={{ marginTop: '16px', paddingTop: '16px' }}>
            <h4 className="subsection-header">Image Asset Settings</h4>
            
            <div className="editor-field-group">
              <label className="editor-label">Upload Image</label>
              <div className="btn-upload-container">
                <div className="btn-upload-file">
                  <Upload size={14} />
                  <span>Upload Image Here</span>
                </div>
                <input
                  type="file"
                  accept="image/*"
                  className="file-input-hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      const reader = new FileReader();
                      reader.onload = (event) => {
                        const result = event.target?.result;
                        if (result) {
                          onUpdateComponent(c.id, prev => ({
                            ...prev,
                            localProps: { ...prev.localProps, src: result }
                          }));
                        }
                      };
                      reader.readAsDataURL(file);
                    }
                  }}
                />
              </div>
              {c.localProps?.src && c.localProps.src.startsWith('data:') && (
                <img
                  src={c.localProps.src}
                  alt="Component Preview"
                  className="upload-preview-thumbnail"
                />
              )}
              <div style={{ marginTop: '8px' }}>
                <label className="editor-label" style={{ fontSize: '11px', opacity: 0.6 }}>Or Image Link URL:</label>
                <input
                  type="text"
                  className="editor-input font-mono"
                  style={{ fontSize: '11px', padding: '6px' }}
                  value={c.localProps?.src || ''}
                  onChange={(e) => onUpdateComponent(c.id, prev => ({
                    ...prev,
                    localProps: { ...prev.localProps, src: e.target.value }
                  }))}
                />
              </div>
            </div>

            <div className="editor-field-group">
              <label className="editor-label">Crop Mode (Object Fit)</label>
              <select
                className="editor-select"
                value={c.localProps?.objectFit || 'cover'}
                onChange={(e) => onUpdateComponent(c.id, prev => ({
                  ...prev,
                  localProps: { ...prev.localProps, objectFit: e.target.value }
                }))}
              >
                <option value="cover">Intelligent Crop (Cover)</option>
                <option value="contain">Preserve Ratio (Contain)</option>
                <option value="fill">Stretch (Fill)</option>
              </select>
            </div>

            <div className="editor-row">
              <div className="editor-field-group flex-1">
                <label className="editor-label">Focal X ({c.localProps?.focalPointX || 50}%)</label>
                <input
                  type="range" min="0" max="100"
                  className="editor-slider"
                  value={c.localProps?.focalPointX || 50}
                  onChange={(e) => onUpdateComponent(c.id, prev => ({
                    ...prev,
                    localProps: { ...prev.localProps, focalPointX: parseInt(e.target.value) }
                  }))}
                />
              </div>
              <div className="editor-field-group flex-1">
                <label className="editor-label">Focal Y ({c.localProps?.focalPointY || 50}%)</label>
                <input
                  type="range" min="0" max="100"
                  className="editor-slider"
                  value={c.localProps?.focalPointY || 50}
                  onChange={(e) => onUpdateComponent(c.id, prev => ({
                    ...prev,
                    localProps: { ...prev.localProps, focalPointY: parseInt(e.target.value) }
                  }))}
                />
              </div>
            </div>

            <div className="editor-field-group">
              <label className="editor-label">Blur ({c.localProps?.blur || 0}px)</label>
              <input
                type="range" min="0" max="30"
                className="editor-slider"
                value={c.localProps?.blur || 0}
                onChange={(e) => onUpdateComponent(c.id, prev => ({
                  ...prev,
                  localProps: { ...prev.localProps, blur: parseInt(e.target.value) }
                }))}
              />
            </div>

            <div className="editor-row">
              <div className="editor-field-group flex-1">
                <label className="editor-label">Overlay Color</label>
                <input
                  type="color"
                  className="editor-color-picker"
                  value={c.localProps?.overlayTint || '#000000'}
                  onChange={(e) => onUpdateComponent(c.id, prev => ({
                    ...prev,
                    localProps: { ...prev.localProps, overlayTint: e.target.value }
                  }))}
                />
              </div>
              <div className="editor-field-group flex-2">
                <label className="editor-label">Overlay Opacity ({Math.round((c.localProps?.overlayOpacity || 0) * 100)}%)</label>
                <input
                  type="range" min="0" max="100" step="5"
                  className="editor-slider"
                  value={(c.localProps?.overlayOpacity || 0) * 100}
                  onChange={(e) => onUpdateComponent(c.id, prev => ({
                    ...prev,
                    localProps: { ...prev.localProps, overlayOpacity: parseFloat(e.target.value) / 100 }
                  }))}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="dash-editor-panel">
      {/* If a component is selected, render the Component Inspector. Otherwise show global/slide fields */}
      {selectedComponent ? (
        renderComponentInspector(selectedComponent)
      ) : (
        <>
          {/* SECTION 1: DYNAMIC DATA LAYER — scoped to active slide */}
          <div className="editor-section">
            <h3 className="section-header">Dynamic Data Layer</h3>
            {(() => {
              const slideVarKeys = activeSlide
                ? getSlideVariableKeys(activeSlide.components)
                : new Set<string>();
              const slideVars = Object.entries(presentation.variables).filter(([k]) =>
                slideVarKeys.has(k)
              );

              if (slideVars.length === 0) {
                return (
                  <p className="section-desc" style={{ fontStyle: 'italic', opacity: 0.5 }}>
                    No data bindings on this slide. Add <code style={{ fontSize: '10px', background: 'rgba(255,255,255,0.06)', padding: '1px 4px', borderRadius: '3px' }}>{'{{varName}}'}</code> in component data bindings to surface variables here.
                  </p>
                );
              }

              return (
                <>
                  <p className="section-desc">
                    Showing {slideVars.length} variable{slideVars.length !== 1 ? 's' : ''} bound to this slide.
                  </p>
                  <div className="variable-inputs-grid">
                    {slideVars.map(([key, val]) => {
                      const isNum = typeof val === 'number';
                      const isLongText = typeof val === 'string' && val.length > 40;
                      return (
                        <div key={key} className="editor-field-group">
                          <label className="editor-label">{key}</label>
                          {isLongText ? (
                            <textarea
                              className="editor-textarea"
                              value={val as string}
                              onChange={(e) => handleVariableChange(key, e.target.value)}
                            />
                          ) : (
                            <input
                              type={isNum ? 'number' : 'text'}
                              className="editor-input"
                              value={val as string | number}
                              onChange={(e) =>
                                handleVariableChange(key, isNum ? parseFloat(e.target.value) || 0 : e.target.value)
                              }
                            />
                          )}
                        </div>
                      );
                    })}
                  </div>
                </>
              );
            })()}
          </div>

          {/* SECTION 2: SLIDE LAYOUT & ANIMATION CONTROL */}
          {activeSlide && (
            <div className="editor-section border-top">
              <h3 className="section-header">Active Slide Controls</h3>
              
              {/* Slide Title */}
              <div className="editor-field-group">
                <label className="editor-label">Slide Title</label>
                <input
                  type="text"
                  className="editor-input"
                  value={activeSlide.title}
                  onChange={(e) => handleSlidePropChange('title', e.target.value)}
                />
              </div>

              {/* Motion Presets */}
              <div className="editor-field-group">
                <label className="editor-label">Motion Engine Preset</label>
                <select
                  className="editor-select"
                  value={activeSlide.motionPreset}
                  onChange={(e) => handleSlidePropChange('motionPreset', e.target.value as MotionPreset)}
                >
                  <option value="luxury">Luxury (Majestic, slow, blur-in)</option>
                  <option value="premium">Premium (Elegant, spring-smooth)</option>
                  <option value="executive">Executive (Professional, crisp)</option>
                  <option value="energetic">Energetic (Playful, bouncy scale)</option>
                  <option value="minimal">Minimal (Immediate crossfade)</option>
                </select>
              </div>

              {/* Slide Speaker Notes */}
              <div className="editor-field-group">
                <label className="editor-label">Speaker Notes</label>
                <textarea
                  className="editor-textarea"
                  placeholder="Add speaker cues..."
                  value={activeSlide.speakerNotes || ''}
                  onChange={(e) => handleSlidePropChange('speakerNotes', e.target.value)}
                />
              </div>

              {/* Background Settings */}
              <div className="editor-subsection">
                <h4 className="subsection-header">Background Settings</h4>
                
                {/* Background Type */}
                <div className="editor-field-group">
                  <label className="editor-label">Type</label>
                  <select
                    className="editor-select"
                    value={activeSlide.background.type}
                    onChange={(e) => handleSlidePropChange('type', e.target.value, true)}
                  >
                    <option value="color">Solid Color</option>
                    <option value="gradient">Linear Gradient</option>
                    <option value="image">Image Asset</option>
                  </select>
                </div>

                {/* Background Value */}
                {activeSlide.background.type === 'image' ? (
                  <div className="editor-field-group">
                    <label className="editor-label">Background Image</label>
                    <div className="btn-upload-container">
                      <div className="btn-upload-file">
                        <Upload size={14} />
                        <span>Upload Image Here</span>
                      </div>
                      <input
                        type="file"
                        accept="image/*"
                        className="file-input-hidden"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            const reader = new FileReader();
                            reader.onload = (event) => {
                              if (event.target?.result) {
                                handleSlidePropChange('value', event.target.result, true);
                              }
                            };
                            reader.readAsDataURL(file);
                          }
                        }}
                      />
                    </div>
                    {activeSlide.background.value.startsWith('data:') && (
                      <img
                        src={activeSlide.background.value}
                        alt="Background Preview"
                        className="upload-preview-thumbnail"
                      />
                    )}
                    <div style={{ marginTop: '8px' }}>
                      <label className="editor-label" style={{ fontSize: '11px', opacity: 0.6 }}>Or Image Link URL:</label>
                      <input
                        type="text"
                        className="editor-input font-mono"
                        style={{ fontSize: '11px', padding: '6px' }}
                        value={activeSlide.background.value}
                        onChange={(e) => handleSlidePropChange('value', e.target.value, true)}
                      />
                    </div>
                  </div>
                ) : (
                  <div className="editor-field-group">
                    <label className="editor-label">
                      {activeSlide.background.type === 'color' && 'Hex Color'}
                      {activeSlide.background.type === 'gradient' && 'CSS Gradient Code'}
                    </label>
                    <input
                      type="text"
                      className="editor-input font-mono"
                      value={activeSlide.background.value}
                      onChange={(e) => handleSlidePropChange('value', e.target.value, true)}
                    />
                  </div>
                )}

                {activeSlide.background.type === 'image' && (
                  <>
                    {/* Crop mode */}
                    <div className="editor-field-group">
                      <label className="editor-label">Image Crop Mode</label>
                      <select
                        className="editor-select"
                        value={activeSlide.background.cropMode}
                        onChange={(e) => handleSlidePropChange('cropMode', e.target.value, true)}
                      >
                        <option value="cover">Intelligent Crop (Cover)</option>
                        <option value="contain">Preserve Ratio (Contain)</option>
                        <option value="fill">Stretch to Screen (Fill)</option>
                      </select>
                    </div>
                    
                    {/* Focal Points */}
                    <div className="editor-row">
                      <div className="editor-field-group flex-1">
                        <label className="editor-label">Focal Point X ({activeSlide.background.focalPointX}%)</label>
                        <input
                          type="range"
                          min="0"
                          max="100"
                          className="editor-slider"
                          value={activeSlide.background.focalPointX}
                          onChange={(e) => handleSlidePropChange('focalPointX', parseInt(e.target.value), true)}
                        />
                      </div>
                      <div className="editor-field-group flex-1">
                        <label className="editor-label">Focal Point Y ({activeSlide.background.focalPointY}%)</label>
                        <input
                          type="range"
                          min="0"
                          max="100"
                          className="editor-slider"
                          value={activeSlide.background.focalPointY}
                          onChange={(e) => handleSlidePropChange('focalPointY', parseInt(e.target.value), true)}
                        />
                      </div>
                    </div>
                  </>
                )}

                {/* Opacity */}
                <div className="editor-field-group">
                  <label className="editor-label">Background Opacity ({Math.round(activeSlide.background.opacity * 100)}%)</label>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    step="5"
                    className="editor-slider"
                    value={activeSlide.background.opacity * 100}
                    onChange={(e) => handleSlidePropChange('opacity', parseFloat(e.target.value) / 100, true)}
                  />
                </div>

                {/* Blur */}
                <div className="editor-field-group">
                  <label className="editor-label">Backdrop Blur ({activeSlide.background.blur}px)</label>
                  <input
                    type="range"
                    min="0"
                    max="30"
                    className="editor-slider"
                    value={activeSlide.background.blur}
                    onChange={(e) => handleSlidePropChange('blur', parseInt(e.target.value), true)}
                  />
                </div>

                {/* Overlay Tint */}
                <div className="editor-row">
                  <div className="editor-field-group flex-1">
                    <label className="editor-label">Color Tint</label>
                    <input
                      type="color"
                      className="editor-color-picker"
                      value={activeSlide.background.overlayTint.startsWith('#') ? activeSlide.background.overlayTint : '#000000'}
                      onChange={(e) => handleSlidePropChange('overlayTint', e.target.value, true)}
                    />
                  </div>
                  <div className="editor-field-group flex-2">
                    <label className="editor-label">Overlay Opacity ({Math.round(activeSlide.background.overlayOpacity * 100)}%)</label>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      step="5"
                      className="editor-slider"
                      value={activeSlide.background.overlayOpacity * 100}
                      onChange={(e) => handleSlidePropChange('overlayOpacity', parseFloat(e.target.value) / 100, true)}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};
export default DataEditor;

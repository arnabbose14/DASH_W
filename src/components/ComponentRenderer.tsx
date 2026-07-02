import React, { useState, useContext } from 'react';
import type { ComponentDefinition } from '../types';
import { Hero, Headline, Paragraph, Quote, SectionDivider } from './content/ContentComponents';
import { KPICard, BarChart, DonutChart, LineChart, ComparisonChart, Timeline, DispersionChart, ScatterPlot, GroupedBarChart, VennDiagram } from './data/DataComponents';
import { ImageComp, VideoComp, LogoStrip } from './media/MediaComponents';
import { Stack, Grid, Columns, Container, LayoutContext } from './layout/LayoutWrapper';

type Updater = (c: ComponentDefinition) => ComponentDefinition;
type UpdateFn = (id: string, updater: Updater) => void;

interface RendererProps {
  component: ComponentDefinition;
  variables: Record<string, any>;
  selectedComponentId?: string | null;
  onSelectComponent?: (id: string) => void;
  isEditor?: boolean;
  /** Records to undo history — use for inspector edits and the final mouseUp commit */
  onUpdateComponent?: UpdateFn;
  /** Live-update during drag/resize WITHOUT pushing to history each frame */
  onUpdateComponentDraft?: UpdateFn;
}

export const ComponentRenderer: React.FC<RendererProps> = ({
  component,
  variables,
  selectedComponentId = null,
  onSelectComponent,
  isEditor = false,
  onUpdateComponent,
  onUpdateComponentDraft,
}) => {
  // ── Must be at top level — never inside a conditional ──────────────────
  const [isInteracting, setIsInteracting] = useState(false);

  const renderChildren = () => {
    if (!component.children) return null;
    return component.children.map((child) => (
      <ComponentRenderer
        key={child.id}
        component={child}
        variables={variables}
        selectedComponentId={selectedComponentId}
        onSelectComponent={onSelectComponent}
        isEditor={isEditor}
        onUpdateComponent={onUpdateComponent}
        onUpdateComponentDraft={onUpdateComponentDraft}
      />
    ));
  };

  const renderComponentContent = () => {
    switch (component.type) {
      // Content
      case 'hero':
        return <Hero component={component} variables={variables} isEditor={isEditor} onUpdateComponent={onUpdateComponent} />;
      case 'headline':
        return <Headline component={component} variables={variables} isEditor={isEditor} onUpdateComponent={onUpdateComponent} />;
      case 'paragraph':
        return <Paragraph component={component} variables={variables} isEditor={isEditor} onUpdateComponent={onUpdateComponent} />;
      case 'quote':
        return <Quote component={component} variables={variables} isEditor={isEditor} onUpdateComponent={onUpdateComponent} />;
      case 'section-divider':
        return <SectionDivider component={component} variables={variables} isEditor={isEditor} onUpdateComponent={onUpdateComponent} />;
        
      // Data
      case 'kpi':
        return <KPICard component={component} variables={variables} />;
      case 'bar-chart':
        return <BarChart component={component} variables={variables} />;
      case 'donut-chart':
        return <DonutChart component={component} variables={variables} />;
      case 'line-chart':
        return <LineChart component={component} variables={variables} />;
      case 'comparison-chart':
        return <ComparisonChart component={component} variables={variables} />;
      case 'timeline':
        return <Timeline component={component} variables={variables} />;
      case 'dispersion-chart':
        return <DispersionChart component={component} variables={variables} />;
      case 'scatter-plot':
        return <ScatterPlot component={component} variables={variables} />;
      case 'grouped-bar-chart':
        return <GroupedBarChart component={component} variables={variables} />;
      case 'venn-diagram':
        return <VennDiagram component={component} variables={variables} />;
        
      // Media
      case 'image':
        return <ImageComp component={component} variables={variables} />;
      case 'video':
        return <VideoComp component={component} variables={variables} />;
      case 'logo-strip':
        return <LogoStrip component={component} variables={variables} />;
        
      // Layout
      case 'stack':
        return (
          <Stack id={component.id} layout={component.layout} className={component.localProps?.className} style={component.localProps?.style}>
            {renderChildren()}
          </Stack>
        );
      case 'grid':
        return (
          <Grid id={component.id} layout={component.layout} columns={component.localProps?.columns || 3} className={component.localProps?.className} style={component.localProps?.style}>
            {renderChildren()}
          </Grid>
        );
      case 'columns':
        return (
          <Columns id={component.id} layout={component.layout} widths={component.localProps?.widths} className={component.localProps?.className} style={component.localProps?.style}>
            {renderChildren()}
          </Columns>
        );
      case 'container':
        return (
          <Container id={component.id} layout={component.layout} className={component.localProps?.className} style={component.localProps?.style}>
            {renderChildren()}
          </Container>
        );
      case 'spacer':
        return (
          <div 
            style={{ 
              height: component.layout.height, 
              width: component.layout.width, 
              flexShrink: 0 
            }} 
          />
        );
        
      default:
        return null;
    }
  };

  const content = renderComponentContent();
  if (!content) return null;

  if (isEditor) {
    const layoutCtx = useContext(LayoutContext);
    const parentAlignItems = layoutCtx.alignItems;
    const isSelected = selectedComponentId === component.id;
    const isAbsolute = component.layout.position === 'absolute';
    // isInteracting / setIsInteracting are declared at the top of the component.

    const handleSelect = (e: React.MouseEvent) => {
      if (onSelectComponent) {
        e.stopPropagation();
        onSelectComponent(component.id);
      }
    };

    /**
     * Shared mousedown handler for both drag and resize operations.
     *
     * DRAG   — fires from the wrapper div itself (only when the component is selected).
     * RESIZE — fires from individual corner handle divs, which call e.stopPropagation()
     *          so the wrapper's drag handler never fires at the same time.
     *
     * KEY FIXES vs previous implementation:
     *  • wrapperRect is now the CONTAINING BLOCK of the component element, not
     *    always .dash-slide-wrapper. This makes percentages correct regardless
     *    of nesting depth.
     *  • setIsInteracting(true/false) bumps z-index during the gesture so the
     *    component always paints on top of all siblings.
     *  • position:'relative' is set on flow wrappers so absolute resize handles
     *    are anchored to the correct element.
     */
    const startInteraction = (
      e: React.MouseEvent,
      action: 'drag' | 'resize',
      corner?: 'tl' | 'tr' | 'bl' | 'br',
    ) => {
      // Never hijack clicks inside inline text editors
      if (
        e.target instanceof HTMLTextAreaElement ||
        e.target instanceof HTMLInputElement ||
        (e.target as HTMLElement).classList.contains('inline-text-editor')
      ) {
        return;
      }

      // Resize handles must stop the event BEFORE the parent drag handler sees it
      e.stopPropagation();

      if (!onUpdateComponent) return;
      e.preventDefault();

      // ── Find the component element ────────────────────────────────────────
      const componentEl = (
        (e.currentTarget as HTMLElement).classList.contains('editor-component-wrapper')
          ? e.currentTarget
          : (e.currentTarget as HTMLElement).closest('.editor-component-wrapper')
      ) as HTMLElement | null;
      if (!componentEl) return;

      // ── Find the real CSS containing block ───────────────────────────────
      // For absolute positioning the reference is the nearest POSITIONED ancestor
      // outside this wrapper. Walk up past the wrapper itself.
      const getContainingBlock = (el: HTMLElement): HTMLElement => {
        let cur = el.parentElement;
        while (cur) {
          const pos = window.getComputedStyle(cur).position;
          if (pos === 'relative' || pos === 'absolute' || pos === 'fixed' || pos === 'sticky') {
            return cur;
          }
          cur = cur.parentElement;
        }
        return document.documentElement;
      };
      const containingBlock = getContainingBlock(componentEl);
      const containerRect   = containingBlock.getBoundingClientRect();
      const compRect        = componentEl.getBoundingClientRect();

      const startX = e.clientX;
      const startY = e.clientY;

      // All values as % of the containing block's dimensions
      const initialLeftPct   = ((compRect.left   - containerRect.left)   / containerRect.width)  * 100;
      const initialTopPct    = ((compRect.top    - containerRect.top)    / containerRect.height) * 100;
      const initialWidthPct  = (compRect.width   / containerRect.width)  * 100;
      const initialHeightPct = (compRect.height  / containerRect.height) * 100;

      // Elevate z-index and set cursor for the duration of the gesture
      setIsInteracting(true);
      document.body.style.cursor    = action === 'drag' ? 'grabbing' : 'nwse-resize';
      document.body.style.userSelect = 'none';

      // Use draft updater for every frame (no history) — fall back to full if absent
      const applyLive = onUpdateComponentDraft ?? onUpdateComponent;
      // Closure variable: captures the LAST computed layout so mouseUp can commit once
      let pendingLayout: { left: string; top: string; width: string; height: string } | null = null;

      const fmt = (v: number) => `${Math.round(v * 100) / 100}%`;

      const handleMouseMove = (moveEvent: MouseEvent) => {
        const deltaXPct = ((moveEvent.clientX - startX) / containerRect.width)  * 100;
        const deltaYPct = ((moveEvent.clientY - startY) / containerRect.height) * 100;

        let newLeft   = initialLeftPct;
        let newTop    = initialTopPct;
        let newWidth  = initialWidthPct;
        let newHeight = initialHeightPct;

        if (action === 'drag') {
          newLeft = initialLeftPct + deltaXPct;
          newTop  = initialTopPct  + deltaYPct;

          // Snap to 1% grid for drag precision
          newLeft = Math.round(newLeft);
          newTop  = Math.round(newTop);

          // Keep component fully inside its containing block
          newLeft = Math.max(0, Math.min(100 - initialWidthPct,  newLeft));
          newTop  = Math.max(0, Math.min(100 - initialHeightPct, newTop));

        } else {
          // ── Resize: adjust dimensions per grabbed corner ──────────────────
          switch (corner) {
            case 'br':
              newWidth  = initialWidthPct  + deltaXPct;
              newHeight = initialHeightPct + deltaYPct;
              break;
            case 'bl':
              newLeft   = initialLeftPct  + deltaXPct;
              newWidth  = initialWidthPct - deltaXPct;
              newHeight = initialHeightPct + deltaYPct;
              break;
            case 'tr':
              newTop    = initialTopPct    + deltaYPct;
              newWidth  = initialWidthPct  + deltaXPct;
              newHeight = initialHeightPct - deltaYPct;
              break;
            case 'tl':
              newLeft   = initialLeftPct  + deltaXPct;
              newTop    = initialTopPct   + deltaYPct;
              newWidth  = initialWidthPct - deltaXPct;
              newHeight = initialHeightPct - deltaYPct;
              break;
          }

          // Snap to 1% grid
          newWidth  = Math.round(newWidth);
          newHeight = Math.round(newHeight);
          newLeft   = Math.round(newLeft);
          newTop    = Math.round(newTop);

          // Enforce minimum size (4%) and correct anchor when needed
          const MIN = 4;
          if (newWidth < MIN) {
            if (corner === 'bl' || corner === 'tl') newLeft = initialLeftPct + initialWidthPct - MIN;
            newWidth = MIN;
          }
          if (newHeight < MIN) {
            if (corner === 'tl' || corner === 'tr') newTop = initialTopPct + initialHeightPct - MIN;
            newHeight = MIN;
          }

          // Clamp anchor so component never leaves the containing block
          newLeft = Math.max(0, newLeft);
          newTop  = Math.max(0, newTop);
          // Clamp size so right/bottom edge never exits
          if (newLeft + newWidth  > 100) newWidth  = 100 - newLeft;
          if (newTop  + newHeight > 100) newHeight = 100 - newTop;
        }

        const layout = {
          left:   fmt(newLeft),
          top:    fmt(newTop),
          width:  fmt(newWidth),
          height: fmt(newHeight),
        };
        pendingLayout = layout;

        // Live visual update — no history entry
        applyLive?.(component.id, (c) => ({
          ...c,
          layout: { ...c.layout, position: 'absolute', ...layout },
        }));
      };

      const handleMouseUp = () => {
        setIsInteracting(false);
        document.body.style.cursor    = '';
        document.body.style.userSelect = '';
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup',   handleMouseUp);

        // Commit the final layout ONCE to history
        if (pendingLayout && onUpdateComponent) {
          const finalLayout = pendingLayout;
          onUpdateComponent(component.id, (c) => ({
            ...c,
            layout: { ...c.layout, position: 'absolute', ...finalLayout },
          }));
        }
        pendingLayout = null;
      };

      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup',   handleMouseUp);
    };

    // ── Wrapper style ─────────────────────────────────────────────────────
    // CRITICAL: flow wrappers must have position:'relative' so that the
    // absolutely-positioned resize handles are anchored to THIS element,
    // not to some distant ancestor.
    const zIndex = isInteracting ? 9999 : isSelected ? 100 : undefined;

    const wrapperStyle: React.CSSProperties = isAbsolute
      ? {
          position: 'absolute',
          left:   component.layout.left,
          top:    component.layout.top,
          width:  component.layout.width,
          height: component.layout.height,
          cursor: isSelected ? 'grab' : 'pointer',
          zIndex,
          maxWidth: component.layout.maxWidth,
          minWidth: component.layout.minWidth,
          maxHeight: component.layout.maxHeight,
          minHeight: component.layout.minHeight,
          aspectRatio: component.layout.aspectRatio,
        }
      : {
          position:      'relative',      // ← anchors resize handles correctly
          display:       'flex',
          flexDirection: 'column',
          alignItems:    parentAlignItems === 'center' ? 'center' :
                         parentAlignItems === 'end' ? 'flex-end' :
                         parentAlignItems === 'stretch' ? 'stretch' : 'flex-start',
          flexGrow:      component.layout.height === 'fill' ? 1 : undefined,
          width:  component.layout.width  === 'fill' ? '100%' : component.layout.width  === 'fit' ? 'fit-content' : component.layout.width,
          height: component.layout.height === 'fill' ? '100%' : component.layout.height === 'fit' ? 'fit-content' : component.layout.height,
          alignSelf: component.layout.width === 'fill' ? 'stretch' : undefined,
          cursor: isSelected ? 'grab' : 'pointer',
          zIndex,
          maxWidth: component.layout.maxWidth,
          minWidth: component.layout.minWidth,
          maxHeight: component.layout.maxHeight,
          minHeight: component.layout.minHeight,
          aspectRatio: component.layout.aspectRatio,
        };

    return (
      <div
        className={`editor-component-wrapper ${isSelected ? 'selected' : ''}`}
        onClick={handleSelect}
        // Drag only fires on already-selected components so a first click
        // just selects without accidentally converting to absolute.
        onMouseDown={isSelected ? (e) => startInteraction(e, 'drag') : undefined}
        style={wrapperStyle}
      >
        {content}

        {isSelected && (
          <>
            <div className="resize-handle tl" onMouseDown={(e) => { e.stopPropagation(); startInteraction(e, 'resize', 'tl'); }} />
            <div className="resize-handle tr" onMouseDown={(e) => { e.stopPropagation(); startInteraction(e, 'resize', 'tr'); }} />
            <div className="resize-handle bl" onMouseDown={(e) => { e.stopPropagation(); startInteraction(e, 'resize', 'bl'); }} />
            <div className="resize-handle br" onMouseDown={(e) => { e.stopPropagation(); startInteraction(e, 'resize', 'br'); }} />
          </>
        )}
      </div>
    );
  }

  return content;
};
export default ComponentRenderer;

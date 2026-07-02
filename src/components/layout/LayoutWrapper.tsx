import React from 'react';
import type { LayoutConstraints } from '../../types';

export const getLayoutStyles = (layout: LayoutConstraints): React.CSSProperties => {
  const styles: React.CSSProperties = {};

  // Width mapping
  if (layout.width === 'fill') {
    styles.width = '100%';
    styles.alignSelf = 'stretch';
  } else if (layout.width === 'fit') {
    styles.width = 'fit-content';
  } else if (layout.width) {
    styles.width = layout.width;
  }

  // Height mapping
  if (layout.height === 'fill') {
    styles.flexGrow = 1;
    styles.flexBasis = '0%';
    styles.alignSelf = 'stretch';
  } else if (layout.height === 'fit') {
    styles.height = 'fit-content';
  } else if (layout.height) {
    styles.height = layout.height;
  }

  if (layout.minWidth) styles.minWidth = layout.minWidth;
  if (layout.maxWidth) styles.maxWidth = layout.maxWidth;
  if (layout.minHeight) styles.minHeight = layout.minHeight;
  if (layout.maxHeight) styles.maxHeight = layout.maxHeight;
  if (layout.aspectRatio) styles.aspectRatio = layout.aspectRatio;

  // Custom properties
  if (layout.padding) styles.padding = layout.padding;
  if (layout.gap) styles.gap = layout.gap;

  // Absolute positioning mapping
  if (layout.position) styles.position = layout.position as any;
  if (layout.left) styles.left = layout.left;
  if (layout.top) styles.top = layout.top;
  if (layout.right) styles.right = layout.right;
  if (layout.bottom) styles.bottom = layout.bottom;

  return styles;
};

interface LayoutProps {
  layout: LayoutConstraints;
  children: React.ReactNode;
  className?: string;
  id?: string;
  style?: React.CSSProperties;
  onClick?: (e: React.MouseEvent) => void;
}

export const Stack: React.FC<LayoutProps> = ({ layout, children, className = '', id, style, onClick }) => {
  const direction = layout.direction || 'column';
  const justifyMap = {
    start: 'flex-start',
    center: 'center',
    end: 'flex-end',
    between: 'space-between',
    around: 'space-around',
  };
  const alignMap = {
    start: 'flex-start',
    center: 'center',
    end: 'flex-end',
    stretch: 'stretch',
  };

  const stackStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: direction,
    justifyContent: justifyMap[layout.justifyContent || 'start'],
    alignItems: alignMap[layout.alignItems || 'start'],
    flexWrap: layout.wrap || 'nowrap',
    ...getLayoutStyles(layout),
    ...style,
  };

  return (
    <div id={id} className={`dash-stack ${className}`} style={stackStyle} onClick={onClick}>
      {children}
    </div>
  );
};

interface GridProps extends LayoutProps {
  columns: number;
}

export const Grid: React.FC<GridProps> = ({ layout, children, columns, className = '', id, style, onClick }) => {
  const gridStyle: React.CSSProperties = {
    display: 'grid',
    gridTemplateColumns: `repeat(${columns || 3}, minmax(0, 1fr))`,
    ...getLayoutStyles(layout),
    ...style,
  };

  return (
    <div id={id} className={`dash-grid ${className}`} style={gridStyle} onClick={onClick}>
      {children}
    </div>
  );
};

interface ColumnsProps extends LayoutProps {
  widths?: string[]; // e.g. ["40%", "60%"]
}

export const Columns: React.FC<ColumnsProps> = ({ layout, children, widths, className = '', id, style, onClick }) => {
  const columnsStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'row',
    alignItems: layout.alignItems || 'stretch',
    gap: layout.gap || '2cqmin',
    ...getLayoutStyles(layout),
    ...style,
  };

  const childrenArray = React.Children.toArray(children);
  const parentAlign = layout.alignItems || 'stretch';

  return (
    <div id={id} className={`dash-columns ${className}`} style={columnsStyle} onClick={onClick}>
      {childrenArray.map((child, index) => {
        const colWidth = widths && widths[index] ? widths[index] : '1fr';
        const justifyContent = parentAlign === 'center' ? 'center' :
                               parentAlign === 'end' || (parentAlign as string) === 'flex-end' ? 'flex-end' :
                               parentAlign === 'start' || (parentAlign as string) === 'flex-start' ? 'flex-start' :
                               undefined;

        const colStyle: React.CSSProperties = {
          flex: colWidth === '1fr' ? '1 1 0%' : `0 0 ${colWidth}`,
          width: colWidth === '1fr' ? undefined : colWidth,
          display: 'flex',
          flexDirection: 'column',
          alignSelf: 'stretch',
          justifyContent,
        };
        return (
          <div key={index} className="dash-column-wrapper" style={colStyle}>
            {child}
          </div>
        );
      })}
    </div>
  );
};

export const Container: React.FC<LayoutProps> = ({ layout, children, className = '', id, style, onClick }) => {
  const containerStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: layout.justifyContent ? (layout.justifyContent === 'start' ? 'flex-start' : layout.justifyContent === 'end' ? 'flex-end' : layout.justifyContent) : 'center',
    alignItems: layout.alignItems ? (layout.alignItems === 'start' ? 'flex-start' : layout.alignItems === 'end' ? 'flex-end' : layout.alignItems) : 'center',
    ...getLayoutStyles(layout),
    ...style,
  };

  return (
    <div id={id} className={`dash-container ${className}`} style={containerStyle} onClick={onClick}>
      {children}
    </div>
  );
};

export const Spacer: React.FC<{ size: string; axis?: 'horizontal' | 'vertical' }> = ({ size, axis = 'vertical' }) => {
  const style: React.CSSProperties =
    axis === 'vertical'
      ? { height: size, width: '1px', flexShrink: 0 }
      : { width: size, height: '1px', flexShrink: 0 };

  return <div className="dash-spacer" style={style} />;
};

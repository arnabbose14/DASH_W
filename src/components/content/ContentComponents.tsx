import React, { useState } from 'react';
import type { ComponentDefinition } from '../../types';
import { resolveProp } from '../../utils/resolve';
import { getLayoutStyles } from '../layout/LayoutWrapper';

interface ContentProps {
  component: ComponentDefinition;
  variables: Record<string, any>;
  isEditor?: boolean;
  onUpdateComponent?: (id: string, updater: (c: ComponentDefinition) => ComponentDefinition) => void;
}

export const Hero: React.FC<ContentProps> = ({ component, variables, isEditor = false, onUpdateComponent }) => {
  const title = resolveProp('title', component.dataBindings, variables, component.localProps);
  const subtitle = resolveProp('subtitle', component.dataBindings, variables, component.localProps);
  const badge = resolveProp('badge', component.dataBindings, variables, component.localProps);

  const style = getLayoutStyles(component.layout);

  const [editField, setEditField] = useState<'title' | 'subtitle' | 'badge' | null>(null);
  const [tempText, setTempText] = useState('');

  const handleDoubleClick = (field: 'title' | 'subtitle' | 'badge', val: any, e: React.MouseEvent) => {
    if (isEditor) {
      e.stopPropagation();
      setEditField(field);
      setTempText(String(val || ''));
    }
  };

  const handleBlur = (field: 'title' | 'subtitle' | 'badge') => {
    setEditField(null);
    if (onUpdateComponent) {
      onUpdateComponent(component.id, (c) => ({
        ...c,
        localProps: { ...c.localProps, [field]: tempText }
      }));
    }
  };

  return (
    <div className="dash-hero-component animate-container-fade" style={{ ...style, '--stagger-delay': 0 } as React.CSSProperties}>
      {badge || editField === 'badge' ? (
        editField === 'badge' ? (
          <input
            type="text"
            className="hero-badge inline-text-editor"
            style={{ border: '1px dashed var(--gold)', outline: 'none', background: 'rgba(201,168,76,0.05)' }}
            value={tempText}
            onChange={(e) => setTempText(e.target.value)}
            onBlur={() => handleBlur('badge')}
            autoFocus
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleBlur('badge');
              if (e.key === 'Escape') setEditField(null);
            }}
          />
        ) : (
          <span 
            className="hero-badge animate-fade-up" 
            style={{ '--stagger-delay': 1 } as React.CSSProperties}
            onDoubleClick={(e) => handleDoubleClick('badge', badge, e)}
          >
            {badge}
          </span>
        )
      ) : null}

      {editField === 'title' ? (
        <textarea
          className="hero-title inline-text-editor"
          style={{ border: '1px dashed var(--gold)', outline: 'none', background: 'rgba(201,168,76,0.05)', width: '100%' }}
          value={tempText}
          onChange={(e) => setTempText(e.target.value)}
          onBlur={() => handleBlur('title')}
          autoFocus
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              handleBlur('title');
            }
            if (e.key === 'Escape') setEditField(null);
          }}
        />
      ) : (
        <h1 
          className="hero-title animate-fade-up" 
          style={{ '--stagger-delay': 2 } as React.CSSProperties} 
          dangerouslySetInnerHTML={{ __html: String(title) }} 
          onDoubleClick={(e) => handleDoubleClick('title', title, e)}
        />
      )}

      {subtitle || editField === 'subtitle' ? (
        editField === 'subtitle' ? (
          <textarea
            className="hero-subtitle inline-text-editor"
            style={{ border: '1px dashed var(--gold)', outline: 'none', background: 'rgba(201,168,76,0.05)', width: '100%' }}
            value={tempText}
            onChange={(e) => setTempText(e.target.value)}
            onBlur={() => handleBlur('subtitle')}
            autoFocus
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleBlur('subtitle');
              }
              if (e.key === 'Escape') setEditField(null);
            }}
          />
        ) : (
          <p 
            className="hero-subtitle animate-fade-up" 
            style={{ '--stagger-delay': 3 } as React.CSSProperties} 
            dangerouslySetInnerHTML={{ __html: String(subtitle) }} 
            onDoubleClick={(e) => handleDoubleClick('subtitle', subtitle, e)}
          />
        )
      ) : null}
    </div>
  );
};

export const Headline: React.FC<ContentProps> = ({ component, variables, isEditor = false, onUpdateComponent }) => {
  const text = resolveProp('text', component.dataBindings, variables, component.localProps);
  const Tag = component.localProps?.tag || 'h2';
  const style = getLayoutStyles(component.layout);
  const className = component.localProps?.className || (Tag === 'h1' ? 'slide-title' : Tag === 'h2' ? 'slide-heading' : 'slide-subheading');
  const extraStyle = component.localProps?.style || {};

  const [isEditing, setIsEditing] = useState(false);
  const [tempText, setTempText] = useState('');

  const handleDoubleClick = (e: React.MouseEvent) => {
    if (isEditor) {
      e.stopPropagation();
      setIsEditing(true);
      setTempText(String(text || ''));
    }
  };

  const handleBlur = () => {
    setIsEditing(false);
    if (onUpdateComponent) {
      onUpdateComponent(component.id, (c) => ({
        ...c,
        localProps: { ...c.localProps, text: tempText }
      }));
    }
  };

  if (isEditor && isEditing) {
    return (
      <textarea
        className={`${className} inline-text-editor`}
        style={{
          ...style,
          ...extraStyle,
          background: 'rgba(201, 168, 76, 0.05)',
          border: '1px dashed var(--gold)',
          outline: 'none',
          width: '100%',
          fontFamily: Tag === 'h1' || Tag === 'h2' ? 'var(--font-heading)' : 'var(--font-body)',
        }}
        value={tempText}
        onChange={(e) => setTempText(e.target.value)}
        onBlur={handleBlur}
        autoFocus
        onKeyDown={(e) => {
          if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleBlur();
          }
          if (e.key === 'Escape') setIsEditing(false);
        }}
      />
    );
  }

  return (
    <Tag
      id={component.id}
      className={`${className} animate-fade-up`}
      style={{ ...style, ...extraStyle, '--stagger-delay': component.localProps?.stagger !== undefined ? component.localProps.stagger : 1.5 } as React.CSSProperties}
      dangerouslySetInnerHTML={{ __html: String(text) }}
      onDoubleClick={handleDoubleClick}
    />
  );
};

export const Paragraph: React.FC<ContentProps> = ({ component, variables, isEditor = false, onUpdateComponent }) => {
  const text = resolveProp('text', component.dataBindings, variables, component.localProps);
  const style = getLayoutStyles(component.layout);
  const className = component.localProps?.className || 'slide-paragraph';
  const extraStyle = component.localProps?.style || {};

  const [isEditing, setIsEditing] = useState(false);
  const [tempText, setTempText] = useState('');

  const handleDoubleClick = (e: React.MouseEvent) => {
    if (isEditor) {
      e.stopPropagation();
      setIsEditing(true);
      setTempText(String(text || ''));
    }
  };

  const handleBlur = () => {
    setIsEditing(false);
    if (onUpdateComponent) {
      onUpdateComponent(component.id, (c) => ({
        ...c,
        localProps: { ...c.localProps, text: tempText }
      }));
    }
  };

  if (isEditor && isEditing) {
    return (
      <textarea
        className={`${className} inline-text-editor`}
        style={{
          ...style,
          ...extraStyle,
          background: 'rgba(201, 168, 76, 0.05)',
          border: '1px dashed var(--gold)',
          outline: 'none',
          width: '100%',
          minHeight: '80px',
        }}
        value={tempText}
        onChange={(e) => setTempText(e.target.value)}
        onBlur={handleBlur}
        autoFocus
        onKeyDown={(e) => {
          if (e.key === 'Escape') setIsEditing(false);
        }}
      />
    );
  }

  return (
    <p
      id={component.id}
      className={`${className} animate-fade-up`}
      style={{ ...style, ...extraStyle, '--stagger-delay': component.localProps?.stagger !== undefined ? component.localProps.stagger : 3.0 } as React.CSSProperties}
      dangerouslySetInnerHTML={{ __html: String(text) }}
      onDoubleClick={handleDoubleClick}
    />
  );
};

export const Quote: React.FC<ContentProps> = ({ component, variables, isEditor = false, onUpdateComponent }) => {
  const text = resolveProp('text', component.dataBindings, variables, component.localProps);
  const author = resolveProp('author', component.dataBindings, variables, component.localProps);
  const style = getLayoutStyles(component.layout);

  const [editField, setEditField] = useState<'text' | 'author' | null>(null);
  const [tempText, setTempText] = useState('');

  const handleDoubleClick = (field: 'text' | 'author', val: any, e: React.MouseEvent) => {
    if (isEditor) {
      e.stopPropagation();
      setEditField(field);
      setTempText(String(val || ''));
    }
  };

  const handleBlur = (field: 'text' | 'author') => {
    setEditField(null);
    if (onUpdateComponent) {
      onUpdateComponent(component.id, (c) => ({
        ...c,
        localProps: { ...c.localProps, [field]: tempText }
      }));
    }
  };

  return (
    <div
      className="dash-quote-card animate-container-fade"
      style={{ ...style, '--stagger-delay': 2.0 } as React.CSSProperties}
    >
      <span className="quote-mark-open">“</span>
      {editField === 'text' ? (
        <textarea
          className="quote-text inline-text-editor"
          style={{ border: '1px dashed var(--gold)', outline: 'none', background: 'rgba(201,168,76,0.05)', width: '100%' }}
          value={tempText}
          onChange={(e) => setTempText(e.target.value)}
          onBlur={() => handleBlur('text')}
          autoFocus
          onKeyDown={(e) => {
            if (e.key === 'Escape') setEditField(null);
          }}
        />
      ) : (
        <blockquote 
          className="quote-text animate-fade-up" 
          style={{ '--stagger-delay': 3.0 } as React.CSSProperties} 
          dangerouslySetInnerHTML={{ __html: String(text) }} 
          onDoubleClick={(e) => handleDoubleClick('text', text, e)}
        />
      )}

      {author || editField === 'author' ? (
        editField === 'author' ? (
          <input
            type="text"
            className="quote-author inline-text-editor"
            style={{ border: '1px dashed var(--gold)', outline: 'none', background: 'rgba(201,168,76,0.05)', display: 'block', marginTop: '8px' }}
            value={tempText}
            onChange={(e) => setTempText(e.target.value)}
            onBlur={() => handleBlur('author')}
            autoFocus
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleBlur('author');
              if (e.key === 'Escape') setEditField(null);
            }}
          />
        ) : (
          <cite 
            className="quote-author animate-fade-up" 
            style={{ '--stagger-delay': 4.0 } as React.CSSProperties}
            onDoubleClick={(e) => handleDoubleClick('author', author, e)}
          >
            — {author}
          </cite>
        )
      ) : null}
    </div>
  );
};

export const SectionDivider: React.FC<ContentProps> = ({ component, variables, isEditor = false, onUpdateComponent }) => {
  const title = resolveProp('title', component.dataBindings, variables, component.localProps);
  const subtitle = resolveProp('subtitle', component.dataBindings, variables, component.localProps);
  const style = getLayoutStyles(component.layout);

  const [editField, setEditField] = useState<'title' | 'subtitle' | null>(null);
  const [tempText, setTempText] = useState('');

  const handleDoubleClick = (field: 'title' | 'subtitle', val: any, e: React.MouseEvent) => {
    if (isEditor) {
      e.stopPropagation();
      setEditField(field);
      setTempText(String(val || ''));
    }
  };

  const handleBlur = (field: 'title' | 'subtitle') => {
    setEditField(null);
    if (onUpdateComponent) {
      onUpdateComponent(component.id, (c) => ({
        ...c,
        localProps: { ...c.localProps, [field]: tempText }
      }));
    }
  };

  return (
    <div
      className="dash-section-divider animate-container-fade"
      style={{ ...style, '--stagger-delay': 1.0 } as React.CSSProperties}
    >
      {subtitle || editField === 'subtitle' ? (
        editField === 'subtitle' ? (
          <input
            type="text"
            className="section-subtitle inline-text-editor"
            style={{ border: '1px dashed var(--gold)', outline: 'none', background: 'rgba(201,168,76,0.05)', textAlign: 'center' }}
            value={tempText}
            onChange={(e) => setTempText(e.target.value)}
            onBlur={() => handleBlur('subtitle')}
            autoFocus
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleBlur('subtitle');
              if (e.key === 'Escape') setEditField(null);
            }}
          />
        ) : (
          <span 
            className="section-subtitle animate-fade-up" 
            style={{ '--stagger-delay': 1.0 } as React.CSSProperties}
            onDoubleClick={(e) => handleDoubleClick('subtitle', subtitle, e)}
          >
            {subtitle}
          </span>
        )
      ) : null}

      {editField === 'title' ? (
        <textarea
          className="section-title inline-text-editor"
          style={{ border: '1px dashed var(--gold)', outline: 'none', background: 'rgba(201,168,76,0.05)', width: '100%', textAlign: 'center' }}
          value={tempText}
          onChange={(e) => setTempText(e.target.value)}
          onBlur={() => handleBlur('title')}
          autoFocus
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              handleBlur('title');
            }
            if (e.key === 'Escape') setEditField(null);
          }}
        />
      ) : (
        <h2 
          className="section-title animate-fade-up" 
          style={{ '--stagger-delay': 2.0 } as React.CSSProperties} 
          dangerouslySetInnerHTML={{ __html: String(title) }} 
          onDoubleClick={(e) => handleDoubleClick('title', title, e)}
        />
      )}
      <div className="section-line animate-fade-up" style={{ '--stagger-delay': 3.0 } as React.CSSProperties} />
    </div>
  );
};

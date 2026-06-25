import React from 'react';
import type { ComponentDefinition } from '../../types';
import { resolveProp } from '../../utils/resolve';
import { getLayoutStyles } from '../layout/LayoutWrapper';

interface MediaProps {
  component: ComponentDefinition;
  variables: Record<string, any>;
}

export const ImageComp: React.FC<MediaProps> = ({ component, variables }) => {
  const src = resolveProp('src', component.dataBindings, variables, component.localProps) || 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=80';
  const alt = resolveProp('alt', component.dataBindings, variables, component.localProps) || 'Image asset';
  const overlayTint = component.localProps?.overlayTint || 'transparent';
  const overlayOpacity = component.localProps?.overlayOpacity || 0;
  const blur = component.localProps?.blur || 0;
  const objectFit = component.localProps?.objectFit || 'cover';
  const focalPointX = component.localProps?.focalPointX || 50;
  const focalPointY = component.localProps?.focalPointY || 50;

  const style = getLayoutStyles(component.layout);

  return (
    <div 
      className="dash-image-wrapper animate-fade-up" 
      style={{ 
        ...style, 
        position: 'relative',
        overflow: 'hidden',
        borderRadius: '12px',
        border: '1px solid rgba(255,255,255,0.05)',
        '--stagger-delay': 0
      } as React.CSSProperties}
    >
      <img
        src={src}
        alt={alt}
        style={{
          width: '100%',
          height: '100%',
          objectFit: objectFit,
          objectPosition: `${focalPointX}% ${focalPointY}%`,
          filter: blur > 0 ? `blur(${blur}px)` : undefined,
          display: 'block',
        }}
      />
      {overlayOpacity > 0 && (
        <div 
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: overlayTint,
            opacity: overlayOpacity,
            pointerEvents: 'none',
          }}
        />
      )}
    </div>
  );
};

export const VideoComp: React.FC<MediaProps> = ({ component, variables }) => {
  const src = resolveProp('src', component.dataBindings, variables, component.localProps) || '';
  const objectFit = component.localProps?.objectFit || 'cover';
  const opacity = component.localProps?.opacity ?? 1;

  const style = getLayoutStyles(component.layout);

  return (
    <div 
      className="dash-video-wrapper animate-fade-up" 
      style={{ 
        ...style, 
        position: 'relative',
        overflow: 'hidden',
        borderRadius: '12px',
        border: '1px solid rgba(255,255,255,0.05)',
        opacity: opacity,
        '--stagger-delay': 0
      } as React.CSSProperties}
    >
      {src ? (
        <video
          src={src}
          autoPlay
          loop
          muted
          playsInline
          style={{
            width: '100%',
            height: '100%',
            objectFit: objectFit,
          }}
        />
      ) : (
        <div 
          style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'rgba(255,255,255,0.02)',
            color: 'rgba(255,255,255,0.3)',
            fontSize: '14px',
            fontFamily: 'monospace',
          }}
        >
          [No Video Source Bound]
        </div>
      )}
    </div>
  );
};

export const LogoStrip: React.FC<MediaProps> = ({ component, variables: _variables }) => {
  const logos = component.localProps?.logos || [
    { name: "GOOGLE DEEPMIND", icon: "✦" },
    { name: "DASH ENGINE", icon: "▲" },
    { name: "VEGNIS STAGES", icon: "●" },
    { name: "CONFERENCE PRO", icon: "■" }
  ];
  
  const style = getLayoutStyles(component.layout);

  return (
    <div 
      className="dash-logo-strip animate-fade-up" 
      style={{ 
        ...style,
        '--stagger-delay': 1
      } as React.CSSProperties}
    >
      <div className="logo-track">
        {logos.map((logo: any, index: number) => (
          <div key={index} className="logo-item">
            <span className="logo-icon">{logo.icon}</span>
            <span className="logo-name">{logo.name}</span>
          </div>
        ))}
        {/* Duplicate for infinite scrolling effect */}
        {logos.map((logo: any, index: number) => (
          <div key={`dup-${index}`} className="logo-item">
            <span className="logo-icon">{logo.icon}</span>
            <span className="logo-name">{logo.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

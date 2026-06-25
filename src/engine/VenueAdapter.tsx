import React, { useState, useEffect, useRef } from 'react';
import type { VenueProfile, Slide } from '../types';

interface VenueAdapterProps {
  profile: VenueProfile;
  showSafeAreas?: boolean;
  children: React.ReactNode;
  slide: Slide;
}

export const VenueAdapter: React.FC<VenueAdapterProps> = ({
  profile,
  showSafeAreas = false,
  children,
  slide,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const handleResize = () => {
      if (!containerRef.current) return;
      const { clientWidth, clientHeight } = containerRef.current;
      
      // Calculate scaling to fit slide in container
      const scaleX = clientWidth / profile.width;
      const scaleY = clientHeight / profile.height;
      const newScale = Math.min(scaleX, scaleY) * 0.95; // 5% padding around edge
      
      setScale(newScale || 1);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    
    // Set up a ResizeObserver for more robust containment resizing
    let resizeObserver: ResizeObserver | null = null;
    if (containerRef.current && typeof ResizeObserver !== 'undefined') {
      resizeObserver = new ResizeObserver(() => {
        handleResize();
      });
      resizeObserver.observe(containerRef.current);
    }

    return () => {
      window.removeEventListener('resize', handleResize);
      if (resizeObserver) resizeObserver.disconnect();
    };
  }, [profile]);

  // Handle slide background styling
  const getBackgroundStyle = (): React.CSSProperties => {
    const bg = slide.background;
    const style: React.CSSProperties = {
      opacity: bg.opacity,
    };

    if (bg.type === 'color') {
      style.backgroundColor = bg.value;
    } else if (bg.type === 'gradient') {
      style.background = bg.value;
    } else if (bg.type === 'image') {
      style.backgroundImage = `url(${bg.value})`;
      style.backgroundSize = bg.cropMode;
      style.backgroundPosition = `${bg.focalPointX}% ${bg.focalPointY}%`;
      style.backgroundRepeat = 'no-repeat';
    }

    if (bg.blur > 0) {
      style.filter = `blur(${bg.blur}px)`;
    }

    return style;
  };

  const getOverlayStyle = (): React.CSSProperties => {
    const bg = slide.background;
    return {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      backgroundColor: bg.overlayTint,
      opacity: bg.overlayOpacity,
      pointerEvents: 'none',
      zIndex: 1,
    };
  };

  const adapterContainerStyle: React.CSSProperties = {
    position: 'relative',
    width: '100%',
    height: '100%',
    overflow: 'hidden',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#05080F', // DASH_W Pitch Black
  };

  const slideWrapperStyle: React.CSSProperties = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    width: `${profile.width}px`,
    height: `${profile.height}px`,
    transform: `translate(-50%, -50%) scale(${scale})`,
    transformOrigin: 'center center',
    overflow: 'hidden',
    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
    border: '1px solid rgba(255, 255, 255, 0.05)',
    display: 'flex',
    flexDirection: 'column',
    containerType: 'size', // CSS Container Queries
    containerName: 'slide-container',
  };

  const slideBackgroundStyle: React.CSSProperties = {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    ...getBackgroundStyle(),
    zIndex: 0,
  };

  const slideContentStyle: React.CSSProperties = {
    position: 'relative',
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    zIndex: 2,
    padding: '5%',
    boxSizing: 'border-box',
  };
  return (
    <div ref={containerRef} className="dash-venue-adapter-viewport" style={adapterContainerStyle}>
      <div className="dash-slide-wrapper" style={slideWrapperStyle}>
        {/* Background Layer */}
        <div className="dash-slide-background" style={slideBackgroundStyle} />
        {slide.background.overlayOpacity > 0 && (
          <div className="dash-slide-overlay" style={getOverlayStyle()} />
        )}

        {/* Branding Logo (top-right corner of slide) */}
        {/* Use slide.localProps?.hideBranding = true on any slide to suppress the logo */}
        {!(slide as any).localProps?.hideBranding && (
          <div className="dash-slide-branding-logo" style={{
            position: 'absolute',
            top: '5%',
            right: '5%',
            width: '7cqmin',
            height: '7cqmin',
            backgroundImage: 'url(/groww-logo.png)',
            backgroundSize: 'contain',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            zIndex: 100,
            pointerEvents: 'none',
          }} />
        )}

        {/* Content Layer */}
        <div className="dash-slide-content" style={slideContentStyle}>
          {children}
        </div>

        {/* Safe Area Guides overlay (Layer 5 requirement) */}
        {showSafeAreas && (
          <div className="dash-safe-area-overlay" style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            pointerEvents: 'none',
            zIndex: 9999,
          }}>
            {/* Extended Area (100%) border */}
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              border: '2px solid #8B6914', // gold-dim
              opacity: 0.8,
            }}>
              <span style={{
                position: 'absolute',
                top: '4px',
                left: '8px',
                background: '#8B6914',
                color: '#EDE8DF',
                fontSize: '12px',
                padding: '2px 6px',
                borderRadius: '4px',
                fontFamily: 'monospace',
                fontWeight: 'bold',
              }}>EXTENDED AREA (100%)</span>
            </div>

            {/* Safe Area (90% width, 90% height) inner box */}
            <div style={{
              position: 'absolute',
              top: '5%',
              left: '5%',
              right: '5%',
              bottom: '5%',
              border: '2px dashed #C9A84C', // gold
              opacity: 0.8,
            }}>
              <span style={{
                position: 'absolute',
                bottom: '4px',
                right: '8px',
                background: '#C9A84C',
                color: '#05080F',
                fontSize: '12px',
                padding: '2px 6px',
                borderRadius: '4px',
                fontFamily: 'monospace',
                fontWeight: 'bold',
              }}>SAFE AREA (90%) - KEEP CONTENT HERE</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

import React from 'react';
import { useResponsive } from '../hooks/useResponsive';

export default function ResponsiveTest() {
  const { 
    screenSize, 
    breakpoint, 
    isMobile, 
    isTablet, 
    isDesktop, 
    isPortrait, 
    isLandscape 
  } = useResponsive();

  const getBreakpointLabel = (bp) => {
    const labels = {
      xs: 'Mobile Small (xs)',
      sm: 'Mobile (sm)',
      md: 'Tablet (md)',
      lg: 'Desktop (lg)',
      xl: 'Large Desktop (xl)'
    };
    return labels[bp] || 'Unknown';
  };

  return (
    <div style={{
      position: 'fixed',
      top: '10px',
      left: '10px',
      background: 'rgba(0,0,0,0.9)',
      color: 'white',
      padding: '12px',
      borderRadius: '8px',
      fontSize: '12px',
      zIndex: 9998,
      maxWidth: '250px',
      boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
      border: '1px solid rgba(255,255,255,0.1)'
    }}>
      <h4 style={{ margin: '0 0 8px 0', color: '#4CAF50' }}>📱 Responsive Test</h4>
      <p style={{ margin: '4px 0' }}><strong>Breakpoint:</strong> {getBreakpointLabel(breakpoint)}</p>
      <p style={{ margin: '4px 0' }}><strong>Width:</strong> {screenSize.width}px</p>
      <p style={{ margin: '4px 0' }}><strong>Height:</strong> {screenSize.height}px</p>
      <p style={{ margin: '4px 0' }}><strong>Type:</strong> {isMobile ? 'Mobile' : isTablet ? 'Tablet' : 'Desktop'}</p>
      <p style={{ margin: '4px 0' }}><strong>Orientation:</strong> {isPortrait ? 'Portrait' : 'Landscape'}</p>
      <p style={{ margin: '4px 0', fontSize: '10px', color: '#ccc' }}>
        Redimensionnez la fenêtre pour tester
      </p>
    </div>
  );
}

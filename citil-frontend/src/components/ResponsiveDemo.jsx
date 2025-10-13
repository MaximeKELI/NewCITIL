import React from 'react';
import { useResponsive } from '../hooks/useResponsive';

export default function ResponsiveDemo() {
  const {
    screenSize,
    breakpoint,
    isMobile,
    isTablet,
    isDesktop,
    isSmallMobile,
    isLargeDesktop,
    isPortrait,
    isLandscape,
    getResponsiveValue,
    getResponsiveStyle
  } = useResponsive();

  const demoItems = [
    { id: 1, title: 'Item 1', color: '#3498DB' },
    { id: 2, title: 'Item 2', color: '#e74c3c' },
    { id: 3, title: 'Item 3', color: '#2ecc71' },
    { id: 4, title: 'Item 4', color: '#f39c12' },
    { id: 5, title: 'Item 5', color: '#9b59b6' },
    { id: 6, title: 'Item 6', color: '#1abc9c' }
  ];

  const gridColumns = getResponsiveValue(1, 2, 3);
  const cardPadding = getResponsiveValue('8px', '12px', '16px');
  const fontSize = getResponsiveValue('12px', '14px', '16px');

  const containerStyle = getResponsiveStyle(
    { padding: '10px', margin: '5px' },
    { padding: '15px', margin: '10px' },
    { padding: '20px', margin: '15px' }
  );

  return (
    <div style={{
      position: 'fixed',
      bottom: '20px',
      left: '20px',
      background: 'rgba(0,0,0,0.9)',
      color: 'white',
      padding: '15px',
      borderRadius: '10px',
      zIndex: 9997,
      maxWidth: '400px',
      boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
      border: '1px solid rgba(255,255,255,0.1)',
      ...containerStyle
    }}>
      <h4 style={{ margin: '0 0 10px 0', color: '#4CAF50' }}>🎨 Responsive Demo</h4>
      
      <div style={{ marginBottom: '10px' }}>
        <p style={{ margin: '2px 0', fontSize: '12px' }}>
          <strong>Breakpoint:</strong> {breakpoint} | 
          <strong> Type:</strong> {isMobile ? 'Mobile' : isTablet ? 'Tablet' : 'Desktop'}
        </p>
        <p style={{ margin: '2px 0', fontSize: '12px' }}>
          <strong>Size:</strong> {screenSize.width}x{screenSize.height} | 
          <strong> Orientation:</strong> {isPortrait ? 'Portrait' : 'Landscape'}
        </p>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${gridColumns}, 1fr)`,
        gap: '8px',
        marginBottom: '10px'
      }}>
        {demoItems.slice(0, gridColumns * 2).map(item => (
          <div
            key={item.id}
            style={{
              background: item.color,
              padding: cardPadding,
              borderRadius: '6px',
              textAlign: 'center',
              fontSize: fontSize,
              fontWeight: 'bold',
              color: 'white',
              minHeight: '40px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            {item.title}
          </div>
        ))}
      </div>

      <div style={{ fontSize: '10px', color: '#ccc', textAlign: 'center' }}>
        Grille: {gridColumns} colonnes | Padding: {cardPadding} | Font: {fontSize}
      </div>
    </div>
  );
}

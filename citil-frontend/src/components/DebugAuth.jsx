import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useResponsive } from '../hooks/useResponsive';

export default function DebugAuth() {
  const { user, loading } = useAuth();
  const [isVisible, setIsVisible] = useState(true);
  const [timeLeft, setTimeLeft] = useState(10);
  const { screenSize, isMobile, isSmallMobile, getResponsiveValue } = useResponsive();

  useEffect(() => {
    // Timer pour masquer automatiquement après 10 secondes
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          setIsVisible(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  if (!isVisible) return null;

  return (
    <div style={{
      position: 'fixed',
      top: '10px',
      right: '10px',
      left: isMobile ? '10px' : 'auto',
      background: 'rgba(0,0,0,0.9)',
      color: 'white',
      padding: getResponsiveValue('8px', '10px', '12px'),
      borderRadius: '8px',
      fontSize: getResponsiveValue('10px', '11px', '12px'),
      zIndex: 9999,
      maxWidth: isMobile ? 'calc(100vw - 20px)' : '300px',
      width: isMobile ? 'auto' : '300px',
      boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
      border: '1px solid rgba(255,255,255,0.1)',
      animation: 'slideIn 0.3s ease-out'
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
        <h4 style={{ margin: 0, color: '#4CAF50' }}>🔍 Debug Auth</h4>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: '10px', color: '#ccc' }}>Auto-masquer dans {timeLeft}s</span>
          <button
            onClick={() => setIsVisible(false)}
            style={{
              background: 'none',
              border: 'none',
              color: '#ccc',
              cursor: 'pointer',
              fontSize: '16px',
              padding: '0',
              lineHeight: 1
            }}
          >
            ×
          </button>
        </div>
      </div>
      <p style={{ margin: '4px 0' }}><strong>Loading:</strong> {loading ? 'OUI' : 'NON'}</p>
      <p style={{ margin: '4px 0' }}><strong>User:</strong> {user ? 'Présent' : 'Absent'}</p>
      {user && (
        <>
          <p style={{ margin: '4px 0' }}><strong>Nom:</strong> {user.name}</p>
          <p style={{ margin: '4px 0' }}><strong>Email:</strong> {user.email}</p>
          <p style={{ margin: '4px 0' }}><strong>Rôle:</strong> {user.role}</p>
        </>
      )}
      <p style={{ margin: '4px 0' }}><strong>Token:</strong> {localStorage.getItem('citil_token') ? 'Présent' : 'Absent'}</p>
      
      <style jsx>{`
        @keyframes slideIn {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
}

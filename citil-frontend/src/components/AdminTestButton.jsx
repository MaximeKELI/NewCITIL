import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useResponsive } from '../hooks/useResponsive';

export default function AdminTestButton() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [isVisible, setIsVisible] = useState(true);
  const [timeLeft, setTimeLeft] = useState(15);
  const { screenSize, isMobile, isSmallMobile, getResponsiveValue } = useResponsive();
  const { login } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Timer pour masquer automatiquement après 15 secondes
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

  const testAdminLogin = async () => {
    setLoading(true);
    setError('');
    
    try {
      console.log('Test de connexion admin...');
      const result = await login('admin@citil.tg', 'password123');
      
      if (result.user && result.user.role === 'admin') {
        console.log('Connexion admin réussie, redirection vers /admin-login');
        navigate('/admin-login');
      } else {
        console.log('Utilisateur non admin:', result.user);
        setError('Utilisateur non admin');
      }
    } catch (err) {
      console.error('Erreur de connexion admin:', err);
      setError(err.message || 'Erreur de connexion');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      position: 'fixed',
      bottom: '20px',
      right: '20px',
      left: isMobile ? '20px' : 'auto',
      background: 'rgba(0,0,0,0.9)',
      color: 'white',
      padding: getResponsiveValue('8px', '10px', '12px'),
      borderRadius: '8px',
      zIndex: 9999,
      maxWidth: isMobile ? 'calc(100vw - 40px)' : '300px',
      width: isMobile ? 'auto' : '300px',
      boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
      border: '1px solid rgba(255,255,255,0.1)',
      animation: 'slideInUp 0.3s ease-out'
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
        <h4 style={{ margin: 0, color: '#8e44ad', fontSize: '14px' }}>🔧 Test Admin</h4>
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
      
      <p style={{ margin: '0 0 10px 0', fontSize: '12px', color: '#ccc' }}>
        Bouton de test pour vérifier la redirection admin
      </p>
      
      {error && (
        <div style={{ 
          background: '#ff4444', 
          color: 'white', 
          padding: '8px 12px', 
          borderRadius: '4px', 
          marginBottom: '10px', 
          fontSize: '12px' 
        }}>
          {error}
        </div>
      )}
      
      <button
        onClick={testAdminLogin}
        disabled={loading}
        style={{
          background: loading ? '#ccc' : '#8e44ad',
          color: 'white',
          border: 'none',
          padding: '10px 16px',
          borderRadius: '6px',
          cursor: loading ? 'not-allowed' : 'pointer',
          fontSize: '12px',
          fontWeight: 'bold',
          boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
          transition: 'all 0.3s ease',
          width: '100%'
        }}
      >
        {loading ? 'Connexion...' : '🔧 Tester Connexion Admin'}
      </button>
      
      <style jsx>{`
        @keyframes slideInUp {
          from {
            transform: translateY(100%);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
}

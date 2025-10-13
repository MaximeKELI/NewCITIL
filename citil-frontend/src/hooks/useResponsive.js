import { useState, useEffect } from 'react';

/**
 * Hook personnalisé pour gérer la responsivité
 * @returns {Object} Objet contenant les informations de responsivité
 */
export const useResponsive = () => {
  const [screenSize, setScreenSize] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 1024,
    height: typeof window !== 'undefined' ? window.innerHeight : 768
  });

  const [breakpoint, setBreakpoint] = useState('lg');

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      
      setScreenSize({ width, height });

      // Définir le breakpoint
      if (width < 480) {
        setBreakpoint('xs');
      } else if (width < 768) {
        setBreakpoint('sm');
      } else if (width < 1024) {
        setBreakpoint('md');
      } else if (width < 1280) {
        setBreakpoint('lg');
      } else {
        setBreakpoint('xl');
      }
    };

    // Initialiser
    handleResize();

    // Écouter les changements de taille
    window.addEventListener('resize', handleResize);
    window.addEventListener('orientationchange', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('orientationchange', handleResize);
    };
  }, []);

  // Helpers pour les breakpoints
  const isMobile = breakpoint === 'xs' || breakpoint === 'sm';
  const isTablet = breakpoint === 'md';
  const isDesktop = breakpoint === 'lg' || breakpoint === 'xl';
  const isSmallMobile = breakpoint === 'xs';
  const isLargeDesktop = breakpoint === 'xl';

  // Helpers pour les tailles spécifiques
  const isWidthLessThan = (width) => screenSize.width < width;
  const isWidthGreaterThan = (width) => screenSize.width > width;
  const isHeightLessThan = (height) => screenSize.height < height;
  const isHeightGreaterThan = (height) => screenSize.height > height;

  // Helpers pour l'orientation
  const isPortrait = screenSize.height > screenSize.width;
  const isLandscape = screenSize.width > screenSize.height;

  // Helpers pour les classes CSS responsives
  const getResponsiveClass = (baseClass, mobileClass, tabletClass, desktopClass) => {
    if (isMobile && mobileClass) return `${baseClass} ${mobileClass}`;
    if (isTablet && tabletClass) return `${baseClass} ${tabletClass}`;
    if (isDesktop && desktopClass) return `${baseClass} ${desktopClass}`;
    return baseClass;
  };

  // Helpers pour les styles responsives
  const getResponsiveStyle = (mobileStyle, tabletStyle, desktopStyle) => {
    if (isMobile) return mobileStyle;
    if (isTablet) return tabletStyle;
    if (isDesktop) return desktopStyle;
    return desktopStyle;
  };

  // Helpers pour les valeurs responsives
  const getResponsiveValue = (mobileValue, tabletValue, desktopValue) => {
    if (isMobile) return mobileValue;
    if (isTablet) return tabletValue;
    if (isDesktop) return desktopValue;
    return desktopValue;
  };

  return {
    screenSize,
    breakpoint,
    isMobile,
    isTablet,
    isDesktop,
    isSmallMobile,
    isLargeDesktop,
    isPortrait,
    isLandscape,
    isWidthLessThan,
    isWidthGreaterThan,
    isHeightLessThan,
    isHeightGreaterThan,
    getResponsiveClass,
    getResponsiveStyle,
    getResponsiveValue
  };
};

export default useResponsive;

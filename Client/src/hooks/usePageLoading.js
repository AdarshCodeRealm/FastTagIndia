import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// Configuration for different page types
const PAGE_LOADING_CONFIG = {
  // Pages that should never show loading (instant pages)
  '/': { showLoading: false },
  '/login': { showLoading: false },
  '/signup': { showLoading: false },
  
  // Pages that might need loading (data-heavy pages)
  '/buy-fastag': { 
    showLoading: true, 
    minDelay: 300, 
    maxDelay: 1200 
  },
  '/recharge-fastag': { 
    showLoading: true, 
    minDelay: 300, 
    maxDelay: 1000 
  },
  '/track-order': { 
    showLoading: true, 
    minDelay: 200, 
    maxDelay: 1500 
  },
  
  // Static pages - minimal loading
  '/terms-conditions': { 
    showLoading: true, 
    minDelay: 150, 
    maxDelay: 400 
  },
  '/privacy-policy': { 
    showLoading: true, 
    minDelay: 150, 
    maxDelay: 400 
  },
  '/refund-policy': { 
    showLoading: true, 
    minDelay: 150, 
    maxDelay: 400 
  }
};

export function usePageLoading() {
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const pageConfig = PAGE_LOADING_CONFIG[location.pathname];
    
    // If page is configured to not show loading, skip entirely
    if (!pageConfig || !pageConfig.showLoading) {
      setIsLoading(false);
      return;
    }

    let showTimer;
    let hideTimer;
    let hasShownLoading = false;

    const minDelay = pageConfig.minDelay || 200;
    const maxDelay = pageConfig.maxDelay || 800;

    // Show loading after minDelay if page hasn't loaded yet
    showTimer = setTimeout(() => {
      setIsLoading(true);
      hasShownLoading = true;
    }, minDelay);

    // Always hide loading after maxDelay
    hideTimer = setTimeout(() => {
      setIsLoading(false);
    }, maxDelay);

    return () => {
      clearTimeout(showTimer);
      clearTimeout(hideTimer);
      setIsLoading(false);
    };
  }, [location.pathname]);

  return isLoading;
}

// Hook for manual loading control in components
export function useManualLoading() {
  const [isLoading, setIsLoading] = useState(false);

  const startLoading = () => setIsLoading(true);
  const stopLoading = () => setIsLoading(false);

  return { isLoading, startLoading, stopLoading };
}
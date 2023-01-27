import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = () => {
      const { pathname } = useLocation();
      
      useEffect(() => {
            console.log('[ScrollToTop]', pathname)
            window.scrollTo(0, 0)
      }, [pathname])

      return null;
}

export default ScrollToTop;
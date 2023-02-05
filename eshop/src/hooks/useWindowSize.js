import React, { useState, useLayoutEffect } from 'react';

const debounceFunction = (fn, delay) => {
      let timeOutId = null;
      return () => {
            clearTimeout(timeOutId);
            timeOutId = setTimeout(() => {
                  timeOutId = null;
                  fn();
            }, delay);
      };
}

export const useWindowSize = () => {
      const [windowSize, setWindowSize] = useState({
            width: null,
            height: null
      });

      useLayoutEffect(() => {

            const handleResize = () => {
                  
                  setWindowSize({
                        width: window.innerWidth,
                        height: window.innerHeight
                  })
            }

            handleResize();
            const debouncedHandleResize = debounceFunction(handleResize, 1000);
            window.addEventListener('resize', debouncedHandleResize);

            return () => {
                  window.removeEventListener('resize', handleResize);
            }
      }, []);

      return windowSize;
};



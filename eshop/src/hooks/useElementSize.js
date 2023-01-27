import React, { useState, useLayoutEffect } from 'react';

const useElementSize = (elementRef) => {
      const [size, setSize] = useState({
            width: 0,
            height: 0
      });

      const updateSize = () => {
            const element = elementRef?.current;
            if (!element) return;
            console.log('useElementSize - width:', elementRef?.current.getBoundingClientRect().width)
            setSize({
                  width: element.getBoundingClientRect().width,
                  height: element.getBoundingClientRect().height
            })
      }

      useLayoutEffect(() => {
            console.log('useEffect from useElementSize', elementRef)
            updateSize();
            window.addEventListener('resize', updateSize);

            return () => {
                  window.removeEventListener('resize', updateSize);
            }
      }, [elementRef]);

      return size;
}

export default useElementSize;
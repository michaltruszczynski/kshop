import React, { useEffect } from 'react';

const useClickOutside = (ref, handler) => {
      useEffect(() => {
            const checkIfClickedOutside = event => {

                  if (ref.current && !ref.current.contains(event.target)) {
                        handler();
                  }
            }

            document.addEventListener('mousedown', checkIfClickedOutside);

            return () => {
                  document.removeEventListener('mousedown', checkIfClickedOutside)
            }
      }, [ref, handler])
}

export default useClickOutside;
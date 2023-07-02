import React, { useEffect } from 'react';

const Preloader = () => {
    useEffect(() => {
        const preloader = document.getElementById('preloader');
    
        const handleLoad = () => {
          if (preloader) {
            preloader.parentNode?.removeChild(preloader);
          }
        };
    
        window.addEventListener('load', handleLoad);
    
        return () => {
          window.removeEventListener('load', handleLoad);
        };
      }, []);

      return null;
};

export default Preloader;
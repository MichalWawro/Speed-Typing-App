import { useEffect } from 'react';

function GlobalKeyListener({onKeyPress}) {    
    useEffect(() => {
        const handleKeyDown = (event) => {
          onKeyPress(event.key);
        };
    
        window.addEventListener("keydown", handleKeyDown);
    
        return () => {
          window.removeEventListener("keydown", handleKeyDown);
        };
      }, []);
    
    return null;
};

export default GlobalKeyListener;
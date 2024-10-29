import React, { useState, useEffect } from 'react';

const ScrollToTopButton: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    setIsVisible(window.scrollY > 300);
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility);
    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  return isVisible ? (
    <button
      onClick={scrollToTop}
      className="fixed bottom-8 right-8 w-12 h-12 flex items-center justify-center bg-white border-2 border-amber-500 text-amber-500 rounded-full shadow-lg hover:bg-amber-500 hover:text-white transition-all duration-300"
    >
      ↑
    </button>
  ) : null;
};

export default ScrollToTopButton;

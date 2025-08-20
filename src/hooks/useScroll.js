import { useState, useEffect, useCallback } from 'react';

/**
 * 滚动监听Hook
 * @returns {Object} 滚动状态和位置信息
 */
export const useScroll = () => {
  const [scrollY, setScrollY] = useState(0);
  const [scrollDirection, setScrollDirection] = useState('up');
  const [isScrolling, setIsScrolling] = useState(false);

  // 节流函数
  const throttle = useCallback((func, delay) => {
    let timeoutId;
    let lastExecTime = 0;
    
    return (...args) => {
      const currentTime = Date.now();
      
      if (currentTime - lastExecTime > delay) {
        func.apply(this, args);
        lastExecTime = currentTime;
      } else {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
          func.apply(this, args);
          lastExecTime = Date.now();
        }, delay - (currentTime - lastExecTime));
      }
    };
  }, []);

  // 处理滚动事件
  const handleScroll = useCallback(
    throttle(() => {
      const currentScrollY = window.scrollY;
      
      setScrollY(currentScrollY);
      setScrollDirection(currentScrollY > scrollY ? 'down' : 'up');
      setIsScrolling(true);
      
      // 停止滚动后重置状态
      clearTimeout(window.scrollTimeout);
      window.scrollTimeout = setTimeout(() => {
        setIsScrolling(false);
      }, 150);
    }, 16), // 约60fps
    [scrollY, throttle]
  );

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(window.scrollTimeout);
    };
  }, [handleScroll]);

  // 滚动到指定位置
  const scrollTo = useCallback((target, options = {}) => {
    const defaultOptions = {
      behavior: 'smooth',
      block: 'start',
      inline: 'nearest',
    };
    
    if (typeof target === 'string') {
      const element = document.querySelector(target);
      if (element) {
        element.scrollIntoView({ ...defaultOptions, ...options });
      }
    } else if (typeof target === 'number') {
      window.scrollTo({
        top: target,
        behavior: 'smooth',
        ...options,
      });
    }
  }, []);

  // 滚动到顶部
  const scrollToTop = useCallback(() => {
    scrollTo(0);
  }, [scrollTo]);

  return {
    scrollY,
    scrollDirection,
    isScrolling,
    scrollTo,
    scrollToTop,
  };
};

import { useState, useEffect, useRef, useCallback } from 'react';

/**
 * 目录大纲自定义Hook
 * @param {string} content - 文章内容，用于触发目录重新生成
 * @returns {Object} 返回目录相关的状态和方法
 */
const useTableOfContents = (content = '') => {
  const [headings, setHeadings] = useState([]);
  const [activeId, setActiveId] = useState('');
  const observerRef = useRef(null);
  const contentRef = useRef(null);

  /**
   * 生成标题的唯一ID - 使用简单的索引ID
   */
  const generateHeadingId = (text, index) => {
    // 使用简单的索引ID，确保唯一性
    return `heading-${index}`;
  };

  /**
   * 获取所有标题元素并生成目录
   */
  const generateHeadings = useCallback(() => {
    const findAndProcessHeadings = () => {
      const contentElement = document.querySelector('[data-content="article"]');
      if (!contentElement) {
        console.log('Content element not found');
        return false;
      }

      const headingElements = contentElement.querySelectorAll('h1, h2, h3, h4, h5, h6');
      if (headingElements.length === 0) {
        console.log('No heading elements found');
        return false;
      }

      console.log('Found heading elements:', headingElements.length);

      const headingsList = [];

      // 先设置所有ID
      headingElements.forEach((element, index) => {
        const text = element.textContent.trim();
        const level = parseInt(element.tagName.charAt(1));
        
        // 生成唯一ID
        const finalId = `heading-${index}`;
        
        // 尝试多种方式设置ID
        try {
          element.id = finalId;
          element.setAttribute('id', finalId);
          console.log(`Setting ID for "${text}": ${finalId}`);
        } catch (error) {
          console.error('Error setting ID:', error);
        }

        headingsList.push({
          id: finalId,
          text,
          level,
          element,
        });
      });

      // 验证ID设置是否成功
      const allElements = contentElement.querySelectorAll('h1, h2, h3, h4, h5, h6');
      const elementsWithIds = Array.from(allElements).map(el => ({ id: el.id, text: el.textContent.trim() }));
      console.log('Elements after ID setting:', elementsWithIds);

      // 检查是否有空的ID
      const emptyIds = elementsWithIds.filter(el => !el.id);
      if (emptyIds.length > 0) {
        console.warn('Found elements with empty IDs:', emptyIds);
        return false;
      }

      console.log('Generated headings:', headingsList.map(h => ({ text: h.text, id: h.id })));
      
      // 验证所有ID都能被找到
      let allFound = true;
      headingsList.forEach((heading) => {
        const element = document.getElementById(heading.id);
        if (!element) {
          console.error('Element not found for ID:', heading.id);
          allFound = false;
        } else {
          console.log('Element found for ID:', heading.id, element.textContent.trim());
        }
      });
      
      if (allFound) {
        console.log('All elements found successfully!');
        setHeadings(headingsList);
        return true;
      } else {
        console.warn('Some elements not found, will retry...');
        return false;
      }
    };

    // 使用MutationObserver监听DOM变化
    const observer = new MutationObserver((mutations) => {
      let shouldCheck = false;
      
      mutations.forEach((mutation) => {
        if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
          mutation.addedNodes.forEach((node) => {
            if (node.nodeType === Node.ELEMENT_NODE) {
              if (node.querySelector && node.querySelector('[data-content="article"]')) {
                shouldCheck = true;
              }
              if (node.matches && node.matches('[data-content="article"]')) {
                shouldCheck = true;
              }
            }
          });
        }
      });

      if (shouldCheck) {
        setTimeout(() => {
          if (findAndProcessHeadings()) {
            observer.disconnect();
          }
        }, 500);
      }
    });

    // 开始观察
    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });

    // 立即尝试一次
    setTimeout(() => {
      if (findAndProcessHeadings()) {
        observer.disconnect();
      }
    }, 500);

    // 设置超时
    setTimeout(() => {
      observer.disconnect();
    }, 15000);

    return () => observer.disconnect();
  }, []);

  /**
   * 设置Intersection Observer监听滚动
   */
  const setupIntersectionObserver = useCallback(() => {
    if (observerRef.current) {
      observerRef.current.disconnect();
    }

    if (headings.length === 0) return;

    console.log('Setting up Intersection Observer for', headings.length, 'headings');

    const options = {
      rootMargin: '-10% 0px -60% 0px', // 调整rootMargin，使高亮更敏感
      threshold: [0, 0.25, 0.5, 0.75, 1], // 添加多个阈值
    };

    observerRef.current = new IntersectionObserver((entries) => {
      // 找到最接近视口顶部的可见标题
      let closestEntry = null;
      let minDistance = Infinity;

      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const rect = entry.boundingClientRect;
          const distance = Math.abs(rect.top);
          if (distance < minDistance) {
            minDistance = distance;
            closestEntry = entry;
          }
        }
      });

      if (closestEntry) {
        console.log('Setting active ID to:', closestEntry.target.id, 'distance:', minDistance);
        setActiveId(closestEntry.target.id);
      }
    }, options);

    // 延迟设置观察器，确保DOM元素已经准备好
    setTimeout(() => {
      // 监听所有标题元素
      headings.forEach((heading) => {
        const element = document.getElementById(heading.id);
        if (element) {
          observerRef.current.observe(element);
          console.log('Observing element:', heading.id);
        } else {
          console.warn('Element not found for heading:', heading.id);
        }
      });
    }, 200);
  }, [headings]);

  /**
   * 点击目录项跳转到对应位置
   */
  const scrollToHeading = useCallback((headingId) => {
    console.log('scrollToHeading called with:', headingId);
    
    // 查找元素
    const element = document.getElementById(headingId);
    
    if (element) {
      console.log('Element found, scrolling to:', element.textContent);
      
      // 使用scrollIntoView方法
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
        inline: 'nearest'
      });
      
      // 手动设置激活状态
      setActiveId(headingId);
      
      // 添加高亮效果
      element.style.transition = 'background-color 0.3s ease';
      element.style.backgroundColor = 'rgba(74, 222, 128, 0.1)';
      setTimeout(() => {
        element.style.backgroundColor = '';
      }, 2000);
      
    } else {
      console.log('Element not found for id:', headingId);
      
      // 尝试在文章内容区域查找
      const contentElement = document.querySelector('[data-content="article"]');
      if (contentElement) {
        const allElements = contentElement.querySelectorAll('h1, h2, h3, h4, h5, h6');
        console.log('All elements in content:', Array.from(allElements).map(el => ({ id: el.id, text: el.textContent.trim() })));
      }
    }
  }, [headings]);

  /**
   * 初始化目录功能
   */
  useEffect(() => {
    if (!content) return;

    // 清理之前的观察器
    if (observerRef.current) {
      observerRef.current.disconnect();
    }

    // 延迟执行，确保marked渲染完成
    const timer = setTimeout(() => {
      generateHeadings();
    }, 1000); // 增加延迟时间

    // 监听文章内容更新事件
    const handleContentUpdate = () => {
      setTimeout(() => {
        generateHeadings();
      }, 1000); // 增加延迟时间
    };

    window.addEventListener('articleContentUpdated', handleContentUpdate);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('articleContentUpdated', handleContentUpdate);
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [content, generateHeadings]);

  /**
   * 当标题列表更新时设置观察器
   */
  useEffect(() => {
    if (headings.length > 0) {
      console.log('Headings updated, setting up observer for', headings.length, 'headings');
      setupIntersectionObserver();
      
      // 添加手动滚动监听作为备用方案
      const handleScroll = () => {
        const scrollTop = window.pageYOffset;
        let closestHeading = null;
        let minDistance = Infinity;
        
        headings.forEach((heading) => {
          const element = document.getElementById(heading.id);
          if (element) {
            const rect = element.getBoundingClientRect();
            const distance = Math.abs(rect.top);
            if (distance < minDistance) {
              minDistance = distance;
              closestHeading = heading;
            }
          }
        });
        
        if (closestHeading && closestHeading.id !== activeId) {
          console.log('Scroll: Setting active ID to:', closestHeading.id);
          setActiveId(closestHeading.id);
        }
      };
      
      window.addEventListener('scroll', handleScroll, { passive: true });
      
      return () => {
        window.removeEventListener('scroll', handleScroll);
        if (observerRef.current) {
          observerRef.current.disconnect();
        }
      };
    }

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [headings, setupIntersectionObserver, activeId]);

  return {
    headings,
    activeId,
    scrollToHeading,
  };
};

export default useTableOfContents;

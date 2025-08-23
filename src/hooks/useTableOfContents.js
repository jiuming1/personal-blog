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
  const activeIdRef = useRef(activeId); // 添加activeId的ref

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
        return false;
      }

      const headingElements = contentElement.querySelectorAll('h1, h2, h3, h4, h5, h6');
      if (headingElements.length === 0) {
        return false;
      }

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

      // 检查是否有空的ID
      const emptyIds = elementsWithIds.filter(el => !el.id);
      if (emptyIds.length > 0) {
        return false;
      }
      
      // 验证所有ID都能被找到
      let allFound = true;
      headingsList.forEach((heading) => {
        const element = document.getElementById(heading.id);
        if (!element) {
          allFound = false;
        }
      });
      
      if (allFound) {
        setHeadings(headingsList);
        return true;
      } else {
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
          try {
            const rect = entry.boundingClientRect;
            const distance = Math.abs(rect.top);
            if (distance < minDistance) {
              minDistance = distance;
              closestEntry = entry;
            }
          } catch (error) {
            console.error('Error accessing boundingClientRect:', error);
            // 如果boundingClientRect不可用，使用备用方法
            if (entry.target && entry.target.id) {
              closestEntry = entry;
            }
          }
        }
      });

      if (closestEntry) {
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
        }
      });
    }, 200);
  }, [headings]);

  /**
   * 点击目录项跳转到对应位置
   */
  const scrollToHeading = useCallback((headingId) => {
    console.log('scrollToHeading called with:', headingId);
    
    // 立即设置激活状态，提供即时反馈
    setActiveId(headingId);
    
    // 查找元素的函数
    const findAndScrollToElement = () => {
      // 首先尝试通过ID查找
      let element = document.getElementById(headingId);
      
      if (element) {
        console.log('Element found by ID:', headingId);
      } else {
        console.log('Element not found by ID, searching in content...');
        
        // 如果通过ID找不到，尝试在文章内容区域查找
        const contentElement = document.querySelector('[data-content="article"]');
        if (contentElement) {
          const allHeadings = contentElement.querySelectorAll('h1, h2, h3, h4, h5, h6');
          console.log('Found headings in content:', allHeadings.length);
          
          // 查找匹配的标题
          for (let heading of allHeadings) {
            if (heading.id === headingId || heading.textContent.trim() === headingId) {
              element = heading;
              console.log('Element found by text content:', heading.textContent.trim());
              break;
            }
          }
        } else {
          console.log('Content element not found');
        }
      }
      
      if (element) {
        console.log('Scrolling to element:', element.textContent.trim());
        
        // 使用scrollIntoView方法，优化滚动行为
        element.scrollIntoView({
          behavior: 'smooth',
          block: 'center', // 改为center，提供更好的视觉体验
          inline: 'nearest'
        });
        
        // 添加高亮效果
        element.style.transition = 'background-color 0.2s ease';
        element.style.backgroundColor = 'rgba(74, 222, 128, 0.15)';
        setTimeout(() => {
          element.style.backgroundColor = '';
        }, 1500); // 减少高亮持续时间
        
        return true; // 成功找到并滚动
      }
      
      console.log('Element not found after all attempts');
      return false; // 未找到元素
    };
    
    // 立即尝试一次
    if (!findAndScrollToElement()) {
      console.log('First attempt failed, retrying...');
      // 如果立即查找失败，延迟重试
      setTimeout(() => {
        if (!findAndScrollToElement()) {
          console.log('Second attempt failed, final retry...');
          // 如果还是失败，再次重试
          setTimeout(() => {
            findAndScrollToElement();
          }, 500);
        }
      }, 100);
    }
  }, []); // 移除headings依赖，避免不必要的重新创建

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
    }, 1500); // 增加延迟时间

    // 监听文章内容更新事件
    const handleContentUpdate = () => {
      setTimeout(() => {
        generateHeadings();
      }, 1500); // 增加延迟时间
    };

    // 监听MathJax渲染完成事件
    const handleMathJaxRendered = () => {
      setTimeout(() => {
        generateHeadings();
      }, 1000); // MathJax渲染后重新生成目录
    };

    window.addEventListener('articleContentUpdated', handleContentUpdate);
    window.addEventListener('mathJaxRendered', handleMathJaxRendered);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('articleContentUpdated', handleContentUpdate);
      window.removeEventListener('mathJaxRendered', handleMathJaxRendered);
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
      setupIntersectionObserver();
      
      // 添加手动滚动监听作为备用方案
      const handleScroll = () => {
        let closestHeading = null;
        let minDistance = Infinity;
        
        headings.forEach((heading) => {
          const element = document.getElementById(heading.id);
          if (element) {
            try {
              const rect = element.getBoundingClientRect();
              const distance = Math.abs(rect.top);
              if (distance < minDistance) {
                minDistance = distance;
                closestHeading = heading;
              }
            } catch (error) {
              console.error('Error accessing getBoundingClientRect:', error);
            }
          }
        });
        
        if (closestHeading && closestHeading.id !== activeIdRef.current) {
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
  }, [headings, setupIntersectionObserver]); // 移除activeId依赖

  // 更新activeIdRef
  useEffect(() => {
    activeIdRef.current = activeId;
  }, [activeId]);

  return {
    headings,
    activeId,
    scrollToHeading,
  };
};

export default useTableOfContents;

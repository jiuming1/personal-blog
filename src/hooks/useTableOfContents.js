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
  const isScrollingToHeadingRef = useRef(false); // 添加标志防止滚动监听器干扰

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

      // 使用已经设置的ID
      headingElements.forEach((element, index) => {
        const text = element.textContent.trim();
        const level = parseInt(element.tagName.charAt(1));
        
        // 使用已经设置的ID，如果没有则生成
        const finalId = element.id || `heading-${index}`;
        
        // 确保ID设置成功
        if (!element.id) {
          element.id = finalId;
          element.setAttribute('id', finalId);
        }

        headingsList.push({
          id: finalId,
          text,
          level,
          element,
        });
      });

      // 验证所有标题都被正确处理
      if (headingsList.length > 0) {
        console.log('useTableOfContents: Generated headings:', headingsList.length);
        console.log('useTableOfContents: Headings:', headingsList.map(h => ({ id: h.id, text: h.text })));
        setHeadings(headingsList);
        return true;
      }
      
      return false;
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

    // 再次尝试，确保所有标题都被处理
    setTimeout(() => {
      if (!findAndProcessHeadings()) {
        findAndProcessHeadings();
      }
    }, 1500);

    // 第三次尝试，确保最后一个标题也被处理
    setTimeout(() => {
      findAndProcessHeadings();
    }, 2000);

    // 设置超时
    setTimeout(() => {
      observer.disconnect();
    }, 10000);

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
      rootMargin: '-10% 0px -60% 0px', // 调整rootMargin，使高亮更准确
      threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1], // 更精细的阈值
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

      if (closestEntry && closestEntry.target.id !== activeIdRef.current) {
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
    // 设置滚动标志，防止滚动监听器干扰
    isScrollingToHeadingRef.current = true;
    
    // 立即设置激活状态，提供即时反馈
    setActiveId(headingId);
    
    // 查找元素的函数
    const findAndScrollToElement = () => {
      // 首先尝试通过ID查找
      let element = document.getElementById(headingId);
      
      if (!element) {
        // 如果通过ID找不到，尝试在文章内容区域查找
        const contentElement = document.querySelector('[data-content="article"]');
        if (contentElement) {
          const allHeadings = contentElement.querySelectorAll('h1, h2, h3, h4, h5, h6');
          
          // 查找匹配的标题
          for (let heading of allHeadings) {
            if (heading.id === headingId) {
              element = heading;
              break;
            }
          }
        }
      }
      
      if (element) {
        // 计算目标滚动位置，确保标题在视口顶部
        const rect = element.getBoundingClientRect();
        const currentScrollTop = window.pageYOffset;
        const targetScrollTop = currentScrollTop + rect.top - 80; // 80px为顶部导航栏高度
        
        // 使用window.scrollTo进行精确滚动
        window.scrollTo({
          top: targetScrollTop,
          behavior: 'smooth'
        });
        
        // 滚动完成后清除标志
        setTimeout(() => {
          isScrollingToHeadingRef.current = false;
        }, 1000); // 给滚动动画足够时间完成
        
        // 添加高亮效果
        element.style.transition = 'background-color 0.2s ease';
        element.style.backgroundColor = 'rgba(74, 222, 128, 0.15)';
        setTimeout(() => {
          element.style.backgroundColor = '';
        }, 1500); // 减少高亮持续时间
        
        return true; // 成功找到并滚动
      }
      
      return false; // 未找到元素
    };
    
    // 立即尝试一次
    if (!findAndScrollToElement()) {
      // 如果立即查找失败，延迟重试
      setTimeout(() => {
        if (!findAndScrollToElement()) {
          // 如果还是失败，再次重试
          setTimeout(() => {
            findAndScrollToElement();
          }, 300);
        }
      }, 50);
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
        // 如果正在执行点击滚动，跳过手动滚动处理
        if (isScrollingToHeadingRef.current) {
          return;
        }
        
        let closestHeading = null;
        let minDistance = Infinity;
        
        headings.forEach((heading) => {
          const element = document.getElementById(heading.id);
          if (element) {
            try {
              const rect = element.getBoundingClientRect();
              // 优先选择在视口内的标题，如果都在视口外，选择最接近顶部的
              if (rect.top >= 0 && rect.top <= window.innerHeight) {
                const distance = rect.top;
                if (distance < minDistance) {
                  minDistance = distance;
                  closestHeading = heading;
                }
              } else if (closestHeading === null) {
                // 如果没有在视口内的标题，选择最接近顶部的
                const distance = Math.abs(rect.top);
                if (distance < minDistance) {
                  minDistance = distance;
                  closestHeading = heading;
                }
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

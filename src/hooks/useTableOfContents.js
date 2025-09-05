import { useState, useEffect, useCallback } from 'react';

/**
 * 简洁的目录钩子 - 使用标准DOM查询和滚动监听
 * @param {string} content - 文章内容
 * @returns {Object} 返回目录相关的状态和方法
 */
const useTableOfContents = (content = '') => {
  const [headings, setHeadings] = useState([]);
  const [activeId, setActiveId] = useState('');

  /**
   * 生成目录数据
   */
  const generateTOC = useCallback(() => {
    // 等待DOM渲染完成
    setTimeout(() => {
      const contentElement = document.querySelector('[data-content="article"]');
      if (!contentElement) return;

      // 查询一级和二级标题元素
      const headingElements = contentElement.querySelectorAll('h1, h2');
      
      if (headingElements.length === 0) return;

      const tocItems = [];
      
      headingElements.forEach((element, index) => {
        const text = element.textContent?.trim();
        if (!text) return;

        const level = parseInt(element.tagName.charAt(1));
        const id = `heading-${index}`;
        
        // 设置元素ID
        element.id = id;
        element.setAttribute('id', id);

        tocItems.push({
          id,
          text,
          level,
          element
        });
      });

      if (tocItems.length > 0) {
        setHeadings(tocItems);
      }
    }, 100);
  }, [content]);

  /**
   * 滚动监听 - 使用简单的getBoundingClientRect方法
   */
  const handleScroll = useCallback(() => {
    if (headings.length === 0) return;

    const scrollTop = window.pageYOffset;
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;

    // 检查是否滚动到页面底部
    const isAtBottom = scrollTop + windowHeight >= documentHeight - 100;

    if (isAtBottom) {
      // 滚动到底部时，激活最后一个标题
      const lastHeading = headings[headings.length - 1];
      if (lastHeading && lastHeading.id !== activeId) {
        setActiveId(lastHeading.id);
      }
      return;
    }

    // 遍历所有标题，找到当前应该激活的标题
    for (let i = 0; i < headings.length; i++) {
      const heading = headings[i];
      const element = document.getElementById(heading.id);
      
      if (!element) continue;

      const rect = element.getBoundingClientRect();
      const isInViewport = rect.top >= 0 && rect.top <= windowHeight * 0.3; // 标题在视口上方30%时激活
      
      if (isInViewport) {
        if (heading.id !== activeId) {
          setActiveId(heading.id);
        }
        break;
      }
    }
  }, [headings, activeId]);

  /**
   * 点击标题跳转
   */
  const scrollToHeading = useCallback((headingId) => {
    const element = document.getElementById(headingId);
    if (element) {
      const rect = element.getBoundingClientRect();
      const scrollTop = window.pageYOffset;
      const targetScrollTop = scrollTop + rect.top - 80; // 80px为顶部导航栏高度
      
      window.scrollTo({
        top: targetScrollTop,
        behavior: 'smooth'
      });
      
      setActiveId(headingId);
    }
  }, []);

  /**
   * 初始化
   */
  useEffect(() => {
    if (!content) return;

    // 延迟生成目录，确保DOM已渲染
    const timer = setTimeout(generateTOC, 500);
    
    return () => clearTimeout(timer);
  }, [content, generateTOC]);

  /**
   * 设置滚动监听
   */
  useEffect(() => {
    if (headings.length === 0) return;

    // 初始检查
    handleScroll();

    // 添加滚动监听
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [headings, handleScroll]);

  return {
    headings,
    activeId,
    scrollToHeading
  };
};

export default useTableOfContents;

import { useState, useEffect, useCallback } from 'react';

/**
 * 主题切换Hook
 * @returns {Object} 主题状态和切换函数
 */
export const useTheme = () => {
  // 从localStorage获取初始主题，默认为light
  const [theme, setTheme] = useState(() => {
    try {
      const savedTheme = localStorage.getItem('theme');
      return savedTheme === 'dark' ? 'dark' : 'light';
    } catch (error) {
      console.warn('无法访问localStorage，使用默认主题:', error);
      return 'light';
    }
  });

  // 当主题改变时，保存到localStorage并更新document属性
  useEffect(() => {
    try {
      localStorage.setItem('theme', theme);
      document.documentElement.setAttribute('data-theme', theme);
      console.log('主题已切换为:', theme); // 调试日志
    } catch (error) {
      console.warn('保存主题设置失败:', error);
    }
  }, [theme]);

  // 切换主题函数
  const toggleTheme = useCallback(() => {
    console.log('切换主题，当前主题:', theme); // 调试日志
    setTheme(prevTheme => {
      const newTheme = prevTheme === 'light' ? 'dark' : 'light';
      console.log('新主题:', newTheme); // 调试日志
      return newTheme;
    });
  }, [theme]);

  // 设置特定主题
  const setSpecificTheme = useCallback((newTheme) => {
    if (newTheme === 'light' || newTheme === 'dark') {
      setTheme(newTheme);
    }
  }, []);

  return {
    theme,
    toggleTheme,
    setSpecificTheme,
    isDark: theme === 'dark',
    isLight: theme === 'light',
  };
};

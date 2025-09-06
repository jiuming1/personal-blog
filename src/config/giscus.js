/**
 * Giscus评论系统配置
 * 配置说明：https://giscus.app/zh-CN
 */

export const GISCUS_CONFIG = {
  // GitHub仓库信息
  repo: 'jiuming1/personal-blog',
  
  // 仓库ID - 从GitHub API获取
  // 获取方式：https://api.github.com/repos/jiuming1/personal-blog
  repoId: 'R_kgDOPhFB2A', // 实际的仓库ID
  
  // 分类名称
  category: 'General',
  
  // 分类ID - 从Giscus配置页面获取
  // 获取方式：https://api.github.com/repos/jiuming1/personal-blog/discussions/categories
  categoryId: 'DIC_kwDOPhFB2M4CvCXa', // 实际的分类ID
  
  // 映射方式：title - 使用页面标题作为标识（更稳定）
  mapping: 'title',
  
  // 严格模式：0 - 不严格匹配
  strict: '0',
  
  // 启用反应：1 - 启用
  reactionsEnabled: '1',
  
  // 发出元数据：0 - 不发出
  emitMetadata: '0',
  
  // 输入位置：bottom - 底部
  inputPosition: 'bottom',
  
  // 语言：zh-CN - 中文
  lang: 'zh-CN',
  
  // 加载方式
  loading: 'lazy',
};

/**
 * 获取Giscus配置
 * @param {string} theme - 主题模式 ('light' | 'dark')
 * @returns {Object} Giscus配置对象
 */
export const getGiscusConfig = (theme = 'light') => {
  return {
    ...GISCUS_CONFIG,
    theme: 'preferred_color_scheme', // 使用系统偏好主题
  };
};

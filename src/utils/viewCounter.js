/**
 * 浏览量统计工具
 */

const VIEWS_KEY = 'article_views';

/**
 * 获取所有文章的浏览量数据
 * @returns {Object} 文章浏览量数据
 */
export const getArticleViews = () => {
  try {
    const viewsData = localStorage.getItem(VIEWS_KEY);
    return viewsData ? JSON.parse(viewsData) : {};
  } catch (error) {
    console.error('获取浏览量数据失败:', error);
    return {};
  }
};

/**
 * 获取指定文章的浏览量
 * @param {string} articleId - 文章ID
 * @returns {number} 浏览量
 */
export const getArticleViewCount = (articleId) => {
  const viewsData = getArticleViews();
  return viewsData[articleId] || 0;
};

/**
 * 增加文章浏览量
 * @param {string} articleId - 文章ID
 */
export const incrementArticleView = (articleId) => {
  try {
    const viewsData = getArticleViews();
    const currentViews = viewsData[articleId] || 0;
    viewsData[articleId] = currentViews + 1;
    localStorage.setItem(VIEWS_KEY, JSON.stringify(viewsData));
  } catch (error) {
    console.error('更新浏览量失败:', error);
  }
};

/**
 * 批量初始化文章浏览量（如果不存在）
 * @param {Array} articles - 文章列表
 */
export const initializeArticleViews = (articles) => {
  try {
    const viewsData = getArticleViews();
    let hasChanges = false;
    
    articles.forEach(article => {
      if (!(article.id in viewsData)) {
        // 为新文章设置一个随机的初始浏览量（模拟真实情况）
        const randomViews = Math.floor(Math.random() * 500) + 100;
        viewsData[article.id] = randomViews;
        hasChanges = true;
      }
    });
    
    if (hasChanges) {
      localStorage.setItem(VIEWS_KEY, JSON.stringify(viewsData));
    }
  } catch (error) {
    console.error('初始化浏览量失败:', error);
  }
};

/**
 * 获取所有文章的浏览量统计
 * @param {Array} articles - 文章列表
 * @returns {Array} 包含浏览量的文章列表
 */
export const getArticlesWithViews = (articles) => {
  const viewsData = getArticleViews();
  return articles.map(article => ({
    ...article,
    views: viewsData[article.id] || 0
  }));
};

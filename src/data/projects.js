/**
 * 项目数据
 */

export const projects = [
  {
    id: '1',
    title: 'AnimeStyle',
    description: '项目简介：AnimeStyle是一个基于深度学习的智能图像风格转换平台,致力于为用户提供高质量的真实照片转动漫风格服务.通过运用先进的AnimeGAN算法，结合分布式微服务架构, 为用户带来流畅、高效的动漫风格转换体验。',
    image: '/images/projects/python.png',
    technologies: ['Python', 'AnimeGAN', '深度学习', '微服务架构'],
    category: 'deep-learning',
    githubUrl: 'https://github.com/jiuming1/ANIMESTYLE?tab=readme-ov-file#animestyle',
    liveUrl: null,
    featured: true,
    completedDate: '2024-01-15',
    tags: ['深度学习', '图像风格转换', 'AnimeGAN'],
  },


];

/**
 * 获取所有项目
 */
export const getAllProjects = () => projects;

/**
 * 根据ID获取项目
 */
export const getProjectById = (id) => projects.find(project => project.id === id);

/**
 * 根据分类获取项目
 */
export const getProjectsByCategory = (category) => 
  projects.filter(project => project.category === category);

/**
 * 获取推荐项目
 */
export const getFeaturedProjects = () => 
  projects.filter(project => project.featured);

/**
 * 获取最新项目
 */
export const getLatestProjects = (limit = 6) => 
  projects
    .sort((a, b) => new Date(b.completedDate) - new Date(a.completedDate))
    .slice(0, limit);

/**
 * 搜索项目
 */
export const searchProjects = (query) => {
  const lowercaseQuery = query.toLowerCase();
  return projects.filter(project => 
    project.title.toLowerCase().includes(lowercaseQuery) ||
    project.description.toLowerCase().includes(lowercaseQuery) ||
    project.technologies.some(tech => tech.toLowerCase().includes(lowercaseQuery)) ||
    project.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery))
  );
};

/**
 * 获取项目统计信息
 */
export const getProjectStats = () => {
  const total = projects.length;
  const featured = projects.filter(p => p.featured).length;
  const numerical = projects.filter(p => p.category === 'numerical').length;
  const simulation = projects.filter(p => p.category === 'simulation').length;
  const deepLearning = projects.filter(p => p.category === 'deep-learning').length;
  const programming = projects.filter(p => p.category === 'programming').length;
  
  return {
    total,
    featured,
    numerical,
    simulation,
    deepLearning,
    programming,
  };
};

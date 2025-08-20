/**
 * 应用常量配置
 */

// 网站基本信息
export const SITE_CONFIG = {
  name: 'cty的个人博客',
  description: '一个基于 Material-UI 的高颜值个人博客系统',
  author: 'cty',
  email: 'your-email@example.com',
  github: 'https://github.com/your-username',
  website: 'https://your-blog.com',
};

// 路由配置
export const ROUTES = {
  HOME: '/',
  ARTICLES: '/articles',
  ABOUT: '/about',
  CONTACT: '/contact',
  NOT_FOUND: '/404',
};

// 文章分类
export const CATEGORIES = [
  { 
    value: 'numerical', 
    label: '数值计算', 
    color: '#1976d2',
    icon: '🔢'
  },
  { 
    value: 'simulation', 
    label: '仿真分析', 
    color: '#2e7d32',
    icon: '🌊'
  },
  { 
    value: 'deep-learning', 
    label: '深度学习', 
    color: '#ed6c02',
    icon: '🧠'
  },
  { 
    value: 'programming', 
    label: '编程技术', 
    color: '#9c27b0',
    icon: '💻'
  },
];

// 技能分类
export const SKILL_CATEGORIES = [
  { id: 'numerical', name: '数值计算', icon: '🔢' },
  { id: 'deep-learning', name: '深度学习', icon: '🧠' },
  { id: 'machine-learning', name: '机器学习', icon: '🔬' },
  { id: 'engineering', name: '工程仿真', icon: '⚙️' },
];

// 动画配置
export const ANIMATION_CONFIG = {
  duration: {
    fast: 200,
    normal: 300,
    slow: 500,
  },
  easing: {
    ease: 'cubic-bezier(0.4, 0, 0.2, 1)',
    easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
    easeOut: 'cubic-bezier(0, 0, 0.2, 1)',
    easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
  },
};

// 响应式断点
export const BREAKPOINTS = {
  xs: 0,
  sm: 600,
  md: 900,
  lg: 1200,
  xl: 1536,
};

// 本地存储键名
export const STORAGE_KEYS = {
  THEME: 'theme',
  USER_PREFERENCES: 'userPreferences',
  READING_PROGRESS: 'readingProgress',
};

// API配置
export const API_CONFIG = {
  baseURL: import.meta.env.VITE_API_URL || '',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
};

// 社交媒体链接
export const SOCIAL_LINKS = {
  GITHUB: 'https://github.com/jiuming1?tab=repositories',
  BILIBILI: 'https://space.bilibili.com/472521828?spm_id_from=333.1007.0.0',
};

// 粒子背景配置
export const PARTICLES_CONFIG = {
  particles: {
    number: {
      value: 80,
      density: {
        enable: true,
        value_area: 800,
      },
    },
    color: {
      value: '#1976d2',
    },
    shape: {
      type: 'circle',
    },
    opacity: {
      value: 0.5,
      random: false,
    },
    size: {
      value: 3,
      random: true,
    },
    line_linked: {
      enable: true,
      distance: 150,
      color: '#1976d2',
      opacity: 0.4,
      width: 1,
    },
    move: {
      enable: true,
      speed: 6,
      direction: 'none',
      random: false,
      straight: false,
      out_mode: 'out',
      bounce: false,
    },
  },
  interactivity: {
    detect_on: 'canvas',
    events: {
      onhover: {
        enable: true,
        mode: 'repulse',
      },
      onclick: {
        enable: true,
        mode: 'push',
      },
      resize: true,
    },
  },
  retina_detect: true,
};

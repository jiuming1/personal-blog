/**
 * 动画工具函数
 */

import { ANIMATION_CONFIG } from './constants';

/**
 * 页面进入动画配置
 */
export const pageVariants = {
  initial: {
    opacity: 0,
    y: 20,
  },
  in: {
    opacity: 1,
    y: 0,
  },
  out: {
    opacity: 0,
    y: -20,
  },
};

/**
 * 页面过渡动画配置
 */
export const pageTransition = {
  type: 'tween',
  ease: 'anticipate',
  duration: 0.4,
};

/**
 * 卡片悬停动画
 */
export const cardHoverVariants = {
  initial: {
    scale: 1,
    y: 0,
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
  },
  hover: {
    scale: 1.02,
    y: -4,
    boxShadow: '0 8px 25px rgba(0, 0, 0, 0.15)',
    transition: {
      duration: ANIMATION_CONFIG.duration.normal,
      ease: ANIMATION_CONFIG.easing.easeOut,
    },
  },
};

/**
 * 列表项动画
 */
export const listItemVariants = {
  initial: {
    opacity: 0,
    x: -20,
  },
  in: {
    opacity: 1,
    x: 0,
  },
  out: {
    opacity: 0,
    x: 20,
  },
};

/**
 * 列表容器动画
 */
export const listContainerVariants = {
  initial: {
    opacity: 0,
  },
  in: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
  out: {
    opacity: 0,
  },
};

/**
 * 按钮点击动画
 */
export const buttonTapVariants = {
  initial: {
    scale: 1,
  },
  tap: {
    scale: 0.95,
    transition: {
      duration: ANIMATION_CONFIG.duration.fast,
    },
  },
};

/**
 * 模态框动画
 */
export const modalVariants = {
  initial: {
    opacity: 0,
    scale: 0.8,
  },
  in: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: ANIMATION_CONFIG.duration.normal,
      ease: ANIMATION_CONFIG.easing.easeOut,
    },
  },
  out: {
    opacity: 0,
    scale: 0.8,
    transition: {
      duration: ANIMATION_CONFIG.duration.fast,
    },
  },
};

/**
 * 背景遮罩动画
 */
export const backdropVariants = {
  initial: {
    opacity: 0,
  },
  in: {
    opacity: 1,
    transition: {
      duration: ANIMATION_CONFIG.duration.normal,
    },
  },
  out: {
    opacity: 0,
    transition: {
      duration: ANIMATION_CONFIG.duration.fast,
    },
  },
};

/**
 * 进度条动画
 */
export const progressVariants = {
  initial: {
    width: 0,
  },
  animate: (progress) => ({
    width: `${progress}%`,
    transition: {
      duration: ANIMATION_CONFIG.duration.slow,
      ease: ANIMATION_CONFIG.easing.easeOut,
    },
  }),
};

/**
 * 技能条动画
 */
export const skillBarVariants = {
  initial: {
    width: 0,
    opacity: 0,
  },
  animate: (skill) => ({
    width: `${skill.level}%`,
    opacity: 1,
    transition: {
      duration: ANIMATION_CONFIG.duration.slow,
      ease: ANIMATION_CONFIG.easing.easeOut,
      delay: skill.delay || 0,
    },
  }),
};

/**
 * 时间轴动画
 */
export const timelineVariants = {
  initial: {
    opacity: 0,
    x: -50,
  },
  animate: (index) => ({
    opacity: 1,
    x: 0,
    transition: {
      duration: ANIMATION_CONFIG.duration.normal,
      ease: ANIMATION_CONFIG.easing.easeOut,
      delay: index * 0.2,
    },
  }),
};

/**
 * 粒子动画配置
 */
export const particleVariants = {
  initial: {
    opacity: 0,
    scale: 0,
  },
  animate: {
    opacity: [0, 1, 0],
    scale: [0, 1, 0],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  },
};

/**
 * 文字打字机效果
 */
export const typewriterVariants = {
  initial: {
    width: 0,
  },
  animate: {
    width: '100%',
    transition: {
      duration: 2,
      ease: 'easeInOut',
    },
  },
};

/**
 * 滚动触发动画
 */
export const scrollTriggerVariants = {
  hidden: {
    opacity: 0,
    y: 50,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: ANIMATION_CONFIG.duration.normal,
      ease: ANIMATION_CONFIG.easing.easeOut,
    },
  },
};

/**
 * 创建交错动画
 * @param {number} staggerDelay - 交错延迟时间
 * @returns {Object} 交错动画配置
 */
export const createStaggerAnimation = (staggerDelay = 0.1) => ({
  container: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: staggerDelay,
      },
    },
  },
  item: {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: ANIMATION_CONFIG.duration.normal,
        ease: ANIMATION_CONFIG.easing.easeOut,
      },
    },
  },
});

/**
 * 创建循环动画
 * @param {Object} options - 动画选项
 * @returns {Object} 循环动画配置
 */
export const createLoopAnimation = (options = {}) => {
  const {
    duration = 2,
    ease = 'easeInOut',
    repeat = Infinity,
    repeatType = 'loop',
  } = options;

  return {
    animate: {
      transition: {
        duration,
        ease,
        repeat,
        repeatType,
      },
    },
  };
};

/**
 * 创建路径动画
 * @param {string} path - SVG路径
 * @returns {Object} 路径动画配置
 */
export const createPathAnimation = (path) => ({
  initial: {
    pathLength: 0,
    opacity: 0,
  },
  animate: {
    pathLength: 1,
    opacity: 1,
    transition: {
      duration: ANIMATION_CONFIG.duration.slow,
      ease: ANIMATION_CONFIG.easing.easeOut,
    },
  },
});

/**
 * 获取动画延迟
 * @param {number} index - 索引
 * @param {number} baseDelay - 基础延迟
 * @returns {number} 延迟时间
 */
export const getAnimationDelay = (index, baseDelay = 0.1) => {
  return index * baseDelay;
};

/**
 * 创建弹性动画
 * @param {Object} options - 弹性选项
 * @returns {Object} 弹性动画配置
 */
export const createSpringAnimation = (options = {}) => {
  const {
    type = 'spring',
    stiffness = 100,
    damping = 10,
    mass = 1,
  } = options;

  return {
    type,
    stiffness,
    damping,
    mass,
  };
};

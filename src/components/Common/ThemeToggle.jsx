import React from 'react';
import { IconButton, Tooltip } from '@mui/material';
import { Brightness4, Brightness7 } from '@mui/icons-material';
import { motion } from 'framer-motion';

/**
 * 主题切换组件
 * @param {Object} props - 组件属性
 * @param {boolean} props.isDark - 是否为暗黑主题
 * @param {Function} props.onToggle - 主题切换函数
 * @param {string} props.size - 按钮大小
 * @param {boolean} props.showTooltip - 是否显示提示
 */
const ThemeToggle = ({ 
  isDark, 
  onToggle, 
  size = 'medium', 
  showTooltip = true 
}) => {
  const iconVariants = {
    initial: { rotate: 0 },
    animate: { rotate: 180 },
  };

  const buttonVariants = {
    hover: {
      scale: 1.1,
      transition: {
        duration: 0.2,
        ease: 'easeInOut',
      },
    },
    tap: {
      scale: 0.95,
      transition: {
        duration: 0.1,
      },
    },
  };

  const handleToggle = () => {
    if (onToggle) {
      onToggle();
    }
  };

  const button = (
    <IconButton
      onClick={handleToggle}
      color="inherit"
      size={size}
      aria-label={`切换到${isDark ? '明亮' : '暗黑'}主题`}
    >
      <motion.div
        whileHover={{ rotate: 180 }}
        transition={{ duration: 0.3 }}
      >
        {isDark ? <Brightness7 /> : <Brightness4 />}
      </motion.div>
    </IconButton>
  );

  if (showTooltip) {
    return (
      <Tooltip
        title={`切换到${isDark ? '明亮' : '暗黑'}主题`}
        placement="bottom"
        arrow
      >
        {button}
      </Tooltip>
    );
  }

  return button;
};

export default ThemeToggle;

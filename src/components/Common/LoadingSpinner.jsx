import React from 'react';
import { Box, CircularProgress, Typography, useTheme } from '@mui/material';
import { motion } from 'framer-motion';

/**
 * 加载状态组件
 * @param {Object} props - 组件属性
 * @param {string} props.message - 加载消息
 * @param {boolean} props.fullScreen - 是否全屏显示
 */
const LoadingSpinner = ({ message = '加载中...', fullScreen = false }) => {
  const theme = useTheme();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.3,
      },
    },
  };

  const spinnerVariants = {
    hidden: { scale: 0, rotate: 0 },
    visible: {
      scale: 1,
      rotate: 360,
      transition: {
        duration: 0.5,
        ease: 'easeOut',
      },
    },
  };

  const content = (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 2,
        }}
      >
        <motion.div
          variants={spinnerVariants}
          initial="hidden"
          animate="visible"
        >
          <CircularProgress
            size={40}
            thickness={4}
            sx={{
              color: theme.palette.primary.main,
            }}
          />
        </motion.div>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            textAlign: 'center',
            animation: 'pulse 2s infinite',
            '@keyframes pulse': {
              '0%': {
                opacity: 1,
              },
              '50%': {
                opacity: 0.5,
              },
              '100%': {
                opacity: 1,
              },
            },
          }}
        >
          {message}
        </Typography>
      </Box>
    </motion.div>
  );

  if (fullScreen) {
    return (
      <Box
        sx={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'background.default',
          zIndex: 9999,
        }}
      >
        {content}
      </Box>
    );
  }

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        py: 4,
      }}
    >
      {content}
    </Box>
  );
};

export default LoadingSpinner;

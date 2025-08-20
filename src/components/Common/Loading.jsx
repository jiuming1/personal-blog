import React from 'react';
import { Box, CircularProgress, Typography, LinearProgress } from '@mui/material';
import { motion } from 'framer-motion';

/**
 * 加载组件
 * @param {Object} props - 组件属性
 * @param {string} props.type - 加载类型 ('circular', 'linear', 'dots', 'pulse')
 * @param {string} props.message - 加载消息
 * @param {number} props.progress - 进度百分比 (0-100)
 * @param {string} props.size - 大小 ('small', 'medium', 'large')
 * @param {boolean} props.fullScreen - 是否全屏显示
 */
const Loading = ({
  type = 'circular',
  message = '加载中...',
  progress,
  size = 'medium',
  fullScreen = false,
}) => {
  const sizeMap = {
    small: 24,
    medium: 40,
    large: 60,
  };

  const containerVariants = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
  };

  const pulseVariants = {
    animate: {
      scale: [1, 1.2, 1],
      opacity: [0.5, 1, 0.5],
      transition: {
        duration: 1.5,
        repeat: Infinity,
        ease: 'easeInOut',
      },
    },
  };

  const dotsVariants = {
    animate: {
      y: [0, -10, 0],
      transition: {
        duration: 0.6,
        repeat: Infinity,
        ease: 'easeInOut',
      },
    },
  };

  const renderLoadingContent = () => {
    switch (type) {
      case 'circular':
        return (
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <CircularProgress size={sizeMap[size]} />
            {message && (
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ mt: 2, textAlign: 'center' }}
              >
                {message}
              </Typography>
            )}
          </Box>
        );

      case 'linear':
        return (
          <Box sx={{ width: '100%' }}>
            <LinearProgress
              variant={progress !== undefined ? 'determinate' : 'indeterminate'}
              value={progress}
              sx={{ height: 4, borderRadius: 2 }}
            />
            {message && (
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ mt: 1, textAlign: 'center' }}
              >
                {message}
              </Typography>
            )}
          </Box>
        );

      case 'dots':
        return (
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Box sx={{ display: 'flex', gap: 1 }}>
              {[0, 1, 2].map((index) => (
                <motion.div
                  key={index}
                  variants={dotsVariants}
                  animate="animate"
                  transition={{ delay: index * 0.2 }}
                >
                  <Box
                    sx={{
                      width: 8,
                      height: 8,
                      borderRadius: '50%',
                      backgroundColor: 'primary.main',
                    }}
                  />
                </motion.div>
              ))}
            </Box>
            {message && (
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ mt: 2, textAlign: 'center' }}
              >
                {message}
              </Typography>
            )}
          </Box>
        );

      case 'pulse':
        return (
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <motion.div variants={pulseVariants} animate="animate">
              <Box
                sx={{
                  width: sizeMap[size],
                  height: sizeMap[size],
                  borderRadius: '50%',
                  backgroundColor: 'primary.main',
                }}
              />
            </motion.div>
            {message && (
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ mt: 2, textAlign: 'center' }}
              >
                {message}
              </Typography>
            )}
          </Box>
        );

      default:
        return (
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <CircularProgress size={sizeMap[size]} />
            {message && (
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ mt: 2, textAlign: 'center' }}
              >
                {message}
              </Typography>
            )}
          </Box>
        );
    }
  };

  const content = (
    <motion.div
      variants={containerVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.3 }}
    >
      {renderLoadingContent()}
    </motion.div>
  );

  if (fullScreen) {
    return (
      <Box
        sx={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          zIndex: 9999,
        }}
      >
        <Box
          sx={{
            backgroundColor: 'background.paper',
            borderRadius: 2,
            p: 4,
            boxShadow: 3,
            maxWidth: 300,
            width: '100%',
          }}
        >
          {content}
        </Box>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        p: 3,
      }}
    >
      {content}
    </Box>
  );
};

export default Loading;

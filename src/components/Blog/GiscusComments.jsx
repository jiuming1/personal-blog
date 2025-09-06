import React, { useEffect, useRef } from 'react';
import { Box, Typography, Paper, useTheme } from '@mui/material';
import { motion } from 'framer-motion';
import { Message as MessageIcon } from '@mui/icons-material';
import { getGiscusConfig } from '../../config/giscus';

/**
 * Giscus评论组件
 * @param {Object} props - 组件属性
 * @param {string} props.articleId - 文章ID，用于区分不同文章的评论
 * @param {string} props.articleTitle - 文章标题
 */
const GiscusComments = ({ articleId, articleTitle }) => {
  const theme = useTheme();
  const giscusRef = useRef(null);

  useEffect(() => {
    // 清理之前的Giscus实例
    if (giscusRef.current) {
      giscusRef.current.innerHTML = '';
    }

    // 获取Giscus配置
    const config = getGiscusConfig(theme.palette.mode);

    // 创建Giscus脚本
    const script = document.createElement('script');
    script.src = 'https://giscus.app/client.js';
    script.setAttribute('data-repo', config.repo);
    script.setAttribute('data-repo-id', config.repoId);
    script.setAttribute('data-category', config.category);
    script.setAttribute('data-category-id', config.categoryId);
    script.setAttribute('data-mapping', config.mapping);
    script.setAttribute('data-strict', config.strict);
    script.setAttribute('data-reactions-enabled', config.reactionsEnabled);
    script.setAttribute('data-emit-metadata', config.emitMetadata);
    script.setAttribute('data-input-position', config.inputPosition);
    script.setAttribute('data-theme', config.theme);
    script.setAttribute('data-lang', config.lang);
    script.setAttribute('data-loading', config.loading);
    script.setAttribute('crossorigin', 'anonymous');
    script.async = true;

    // 添加到容器中
    if (giscusRef.current) {
      giscusRef.current.appendChild(script);
    }

    // 清理函数
    return () => {
      if (giscusRef.current) {
        giscusRef.current.innerHTML = '';
      }
    };
  }, [articleId, articleTitle, theme.palette.mode]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <Paper
        elevation={1}
        sx={{
          p: 4,
          backgroundColor: 'background.paper',
          borderRadius: 2,
          border: '1px solid',
          borderColor: 'divider',
        }}
      >
        {/* 评论标题 */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 2,
            mb: 3,
            pb: 2,
            borderBottom: '1px solid',
            borderColor: 'divider',
          }}
        >
          <MessageIcon 
            sx={{ 
              color: '#4ade80', 
              fontSize: '1.5rem' 
            }} 
          />
          <Typography
            variant="h5"
            sx={{
              fontWeight: 'bold',
              color: 'text.primary',
            }}
          >
            评论
          </Typography>
        </Box>

        {/* 评论说明 */}
        <Box
          sx={{
            mb: 3,
            p: 2,
            backgroundColor: theme.palette.mode === 'dark' 
              ? 'rgba(74, 222, 128, 0.1)' 
              : 'rgba(74, 222, 128, 0.05)',
            borderRadius: 1,
            border: '1px solid',
            borderColor: theme.palette.mode === 'dark' 
              ? 'rgba(74, 222, 128, 0.2)' 
              : 'rgba(74, 222, 128, 0.1)',
          }}
        >
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              fontSize: '0.9rem',
              lineHeight: 1.6,
            }}
          >
            💬 欢迎留下您的想法和见解！评论将通过GitHub进行，支持Markdown格式。
            如果您还没有GitHub账号，可以免费注册一个。
          </Typography>
        </Box>

        {/* Giscus评论容器 */}
        <Box
          ref={giscusRef}
          sx={{
            '& .giscus': {
              maxWidth: '100%',
            },
            '& .giscus-frame': {
              width: '100%',
              border: 'none',
              borderRadius: 1,
            },
          }}
        />
      </Paper>
    </motion.div>
  );
};

export default GiscusComments;

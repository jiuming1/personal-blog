import React, { useEffect, useRef } from 'react';
import { Box, Typography, Paper, useTheme } from '@mui/material';
import { motion } from 'framer-motion';
import { Message as MessageIcon } from '@mui/icons-material';

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

    // 调试信息
    console.log('文章ID:', articleId);
    console.log('文章标题:', articleTitle);
    console.log('主题模式:', theme.palette.mode);

    // 创建Giscus脚本 - 使用你提供的配置
    const script = document.createElement('script');
    script.src = 'https://giscus.app/client.js';
    script.setAttribute('data-repo', 'jiuming1/personal-blog');
    script.setAttribute('data-repo-id', 'R_kgDOPhFB2A');
    script.setAttribute('data-category', 'Announcements');
    script.setAttribute('data-category-id', 'DIC_kwDOPhFB2M4CvCXZ');
    script.setAttribute('data-mapping', 'pathname');
    script.setAttribute('data-strict', '0');
    script.setAttribute('data-reactions-enabled', '1');
    script.setAttribute('data-emit-metadata', '0');
    script.setAttribute('data-input-position', 'bottom');
    script.setAttribute('data-theme', 'preferred_color_scheme');
    script.setAttribute('data-lang', 'zh-CN');
    script.setAttribute('data-loading', 'lazy');
    script.setAttribute('crossorigin', 'anonymous');
    script.async = true;

    // 添加错误处理
    script.onerror = (error) => {
      console.error('Giscus脚本加载失败:', error);
    };

    // 添加加载成功处理
    script.onload = () => {
      console.log('Giscus脚本加载成功');
    };

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
        
        {/* 备用HTML方式 - 如果JavaScript方式有问题 */}
        <Box
          sx={{
            display: 'none', // 默认隐藏，只在JavaScript方式失败时显示
            '& .giscus': {
              maxWidth: '100%',
            },
            '& .giscus-frame': {
              width: '100%',
              border: 'none',
              borderRadius: 1,
            },
          }}
          dangerouslySetInnerHTML={{
            __html: `
              <script src="https://giscus.app/client.js"
                      data-repo="jiuming1/personal-blog"
                      data-repo-id="R_kgDOPhFB2A"
                      data-category="Announcements"
                      data-category-id="DIC_kwDOPhFB2M4CvCXZ"
                      data-mapping="pathname"
                      data-strict="0"
                      data-reactions-enabled="1"
                      data-emit-metadata="0"
                      data-input-position="bottom"
                      data-theme="preferred_color_scheme"
                      data-lang="zh-CN"
                      data-loading="lazy"
                      crossorigin="anonymous"
                      async>
              </script>
            `
          }}
        />
      </Paper>
    </motion.div>
  );
};

export default GiscusComments;

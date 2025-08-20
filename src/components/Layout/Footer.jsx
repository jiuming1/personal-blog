import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  IconButton,
  Divider,
  Link as MuiLink,
  Fab,
  Tooltip,
} from '@mui/material';
import {
  KeyboardArrowUp as ArrowUpIcon,
  GitHub as GitHubIcon,
  Favorite as HeartIcon,
} from '@mui/icons-material';

// B站图标组件
const BilibiliIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    width="24"
    height="24"
  >
    <path d="M17.813 4.653h.854c1.51.054 2.769.578 3.773 1.574 1.004.995 1.524 2.249 1.56 3.76v7.36c-.036 1.51-.556 2.769-1.56 3.773s-2.262 1.524-3.773 1.56H5.333c-1.51-.036-2.769-.556-3.773-1.56S.036 18.858 0 17.347v-7.36c.036-1.511.556-2.765 1.56-3.76 1.004-.996 2.262-1.52 3.773-1.574h.774l-1.174-1.12a1.234 1.234 0 0 1-.373-.906c0-.356.124-.658.373-.907l.027-.027c.267-.267.573-.4.92-.4.347 0 .653.133.92.4L9.653 4.44c.071.071.134.142.187.213h4.267a.836.836 0 0 1 .16-.213l2.853-2.747c.267-.267.573-.4.92-.4.347 0 .662.134.929.4.267.267.4.573.4.92 0 .347-.133.653-.4.92zM5.333 7.24c-.746.018-1.373.276-1.88.773-.506.498-.769 1.13-.786 1.894v7.52c.017.764.28 1.395.786 1.893.507.498 1.134.756 1.88.773h13.334c.746-.017 1.373-.275 1.88-.773.506-.498.769-1.129.786-1.893v-7.52c-.017-.765-.28-1.396-.786-1.894-.507-.497-1.134-.755-1.88-.773zM8 10.107c.373 0 .684.124.934.374.25.25.383.569.4.96v1.173c-.017.391-.15.71-.4.96-.25.25-.561.374-.934.374s-.684-.125-.934-.375c-.25-.25-.383-.569-.4-.96v-1.173c.017-.391.15-.71.4-.96.25-.25.561-.374.934-.374zm8 0c.373 0 .684.124.934.374.25.25.383.569.4.96v1.173c-.017.391-.15.71-.4.96-.25.25-.561.374-.934.374s-.684-.125-.934-.375c-.25-.25-.383-.569-.4-.96v-1.173c.017-.391.15-.71.4-.96.25-.25.561-.374.934-.374z"/>
  </svg>
);
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { SITE_CONFIG, ROUTES, SOCIAL_LINKS } from '../../utils/constants';
import { useScroll } from '../../hooks/useScroll';

/**
 * Footer组件
 */
const Footer = () => {
  const { scrollY } = useScroll();
  const [showScrollTop, setShowScrollTop] = useState(false);

  // 监听滚动位置，控制返回顶部按钮显示
  useEffect(() => {
    setShowScrollTop(scrollY > 400);
  }, [scrollY]);

  // 返回顶部
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  // 社交链接
  const socialLinks = [
    {
      name: 'GitHub',
      icon: <GitHubIcon />,
      url: SOCIAL_LINKS.GITHUB,
      color: '#333',
    },
    {
      name: 'Bilibili',
      icon: <BilibiliIcon />,
      url: SOCIAL_LINKS.BILIBILI,
      color: '#00A1D6',
    },
  ];

  // 快速链接
  const quickLinks = [
    { text: '首页', path: ROUTES.HOME },
    { text: '文章', path: ROUTES.ARTICLES },
    { text: '关于', path: ROUTES.ABOUT },
  ];

  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: 'background.paper',
        borderTop: '1px solid',
        borderColor: 'divider',
        mt: 'auto',
        pt: 4,
        pb: 2,
      }}
    >
      <Container maxWidth="lg">
        {/* 主要内容区域 */}
        <Box sx={{ 
          display: 'grid', 
          gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' },
          gap: 4,
          mb: 3 
        }}>
          {/* 网站信息 */}
          <Box>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 'bold',
                  background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  mb: 2,
                }}
              >
                {SITE_CONFIG.name}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                {SITE_CONFIG.description}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                分享技术见解，记录学习历程，探索编程的无限可能。
              </Typography>
            </motion.div>
          </Box>

          {/* 快速链接 */}
          <Box>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
                快速链接
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                {quickLinks.map((link) => (
                  <motion.div
                    key={link.path}
                    whileHover={{ x: 5 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <MuiLink
                      component={Link}
                      to={link.path}
                      color="text.secondary"
                      sx={{
                        textDecoration: 'none',
                        '&:hover': {
                          color: 'primary.main',
                        },
                      }}
                    >
                      {link.text}
                    </MuiLink>
                  </motion.div>
                ))}
              </Box>
            </motion.div>
          </Box>

          {/* 联系信息 */}
          <Box>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
                联系我
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                欢迎与我交流技术问题或合作机会
              </Typography>
              <Box sx={{ display: 'flex', gap: 1 }}>
                {socialLinks.map((social) => (
                  <motion.div
                    key={social.name}
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Tooltip title={social.name} arrow>
                      <IconButton
                        component="a"
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        sx={{
                          color: 'text.secondary',
                          '&:hover': {
                            color: social.color,
                            backgroundColor: 'action.hover',
                          },
                        }}
                      >
                        {social.icon}
                      </IconButton>
                    </Tooltip>
                  </motion.div>
                ))}
              </Box>
            </motion.div>
          </Box>
        </Box>

        <Divider sx={{ my: 2 }} />

        {/* 版权信息 */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: 2,
          }}
        >
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Typography variant="body2" color="text.secondary">
              © {new Date().getFullYear()} {SITE_CONFIG.name}. 保留所有权利。
            </Typography>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Typography variant="body2" color="text.secondary">
              用 <HeartIcon sx={{ fontSize: 16, color: 'error.main', mx: 0.5 }} /> 和 React 构建
            </Typography>
          </motion.div>
        </Box>
      </Container>

      {/* 返回顶部按钮 */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            transition={{ duration: 0.3 }}
            style={{
              position: 'fixed',
              bottom: 24,
              right: 24,
              zIndex: 1000,
            }}
          >
            <Tooltip title="返回顶部" arrow>
              <Fab
                color="primary"
                size="medium"
                onClick={scrollToTop}
                sx={{
                  boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                  '&:hover': {
                    boxShadow: '0 6px 16px rgba(0,0,0,0.2)',
                  },
                }}
              >
                <ArrowUpIcon />
              </Fab>
            </Tooltip>
          </motion.div>
        )}
      </AnimatePresence>
    </Box>
  );
};

export default Footer;

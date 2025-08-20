import React, { useState, useEffect } from 'react';
import { Box, Container, useTheme as useMuiTheme, useMediaQuery } from '@mui/material';
import { motion } from 'framer-motion';
import Header from './Header';
import Footer from './Footer';
import Sidebar from './Sidebar';
import ParticleBackground from '../Common/ParticleBackground';

/**
 * 主布局组件
 * @param {Object} props - 组件属性
 * @param {React.ReactNode} props.children - 子组件
 * @param {boolean} props.showSidebar - 是否显示侧边栏
 * @param {boolean} props.isDark - 是否为暗黑主题
 * @param {Function} props.onToggleTheme - 主题切换函数
 */
const Layout = ({ 
  children, 
  showSidebar = true, 
  isDark, 
  onToggleTheme 
}) => {
  const muiTheme = useMuiTheme();
  const isMobile = useMediaQuery(muiTheme.breakpoints.down('lg'));
  const [sidebarOpen, setSidebarOpen] = useState(!isMobile);

  // 监听屏幕尺寸变化，自动管理侧边栏显示状态
  useEffect(() => {
    if (isMobile) {
      setSidebarOpen(false);
    } else {
      setSidebarOpen(true);
    }
  }, [isMobile]);

  // 处理侧边栏切换
  const handleSidebarToggle = () => {
    setSidebarOpen(!sidebarOpen);
  };

  // 处理侧边栏关闭（移动端）
  const handleSidebarClose = () => {
    if (isMobile) {
      setSidebarOpen(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        color: 'text.primary',
        position: 'relative',
      }}
    >
      <ParticleBackground />
      {/* Header */}
      <Header 
        isDark={isDark} 
        onToggleTheme={onToggleTheme}
        onSidebarToggle={handleSidebarToggle}
      />

      {/* 主要内容区域 */}
      <Box
        component="main"
        sx={{
          flex: 1,
          display: 'flex',
          pt: { xs: 1, sm: 2 },
          pb: { xs: 2, sm: 4 },
        }}
      >
        <Container maxWidth="xl" sx={{ px: { xs: 1, sm: 2 } }}>
          <Box
            sx={{
              display: 'flex',
              gap: { xs: 0, lg: 3 },
              position: 'relative',
            }}
          >
            {/* 桌面端侧边栏 */}
            {showSidebar && (
              <Box
                sx={{
                  display: { xs: 'none', lg: 'block' },
                  width: sidebarOpen ? 300 : 0,
                  flexShrink: 0,
                  overflow: 'hidden',
                  transition: 'width 0.3s ease',
                }}
              >
                <Sidebar isOpen={sidebarOpen} onClose={handleSidebarClose} />
              </Box>
            )}

            {/* 移动端侧边栏遮罩 */}
            {isMobile && showSidebar && sidebarOpen && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                style={{
                  position: 'fixed',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  backgroundColor: 'rgba(0, 0, 0, 0.5)',
                  zIndex: 1100,
                }}
                onClick={handleSidebarClose}
              />
            )}

            {/* 移动端侧边栏 */}
            {isMobile && showSidebar && sidebarOpen && (
              <Box
                sx={{
                  position: 'fixed',
                  top: 0,
                  left: 0,
                  bottom: 0,
                  zIndex: 1200,
                }}
              >
                <Sidebar 
                  isOpen={sidebarOpen} 
                  onClose={handleSidebarClose}
                />
              </Box>
            )}

            {/* 主内容区域 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              style={{
                flex: 1,
                minWidth: 0, // 防止flex项目溢出
              }}
            >
                             <Box
                 sx={{
                   overflow: 'hidden',
                 }}
               >
                {children}
              </Box>
            </motion.div>
          </Box>
        </Container>
      </Box>

      {/* Footer */}
      <Footer />
    </Box>
  );
};

export default Layout;

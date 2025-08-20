import React, { useState, useEffect } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Container,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  useTheme as useMuiTheme,
  useMediaQuery,
} from '@mui/material';
import {
  Menu as MenuIcon,
  Home as HomeIcon,
  Article as ArticleIcon,
  Person as PersonIcon,
  ContactSupport as ContactIcon,
  Search as SearchIcon,
} from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { SITE_CONFIG, ROUTES } from '../../utils/constants';
import SearchBar from '../Common/SearchBar';
import ThemeToggle from '../Common/ThemeToggle';



/**
 * Header组件
 * @param {Object} props - 组件属性
 * @param {boolean} props.isDark - 是否为暗黑主题
 * @param {Function} props.onToggleTheme - 主题切换函数
 * @param {Function} props.onSidebarToggle - 侧边栏切换函数
 */
const Header = ({ isDark, onToggleTheme, onSidebarToggle }) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const location = useLocation();
  const muiTheme = useMuiTheme();
  const isMobile = useMediaQuery(muiTheme.breakpoints.down('md'));
  
  // 根据主题设置毛玻璃背景色
  const glassBackground = muiTheme.palette.mode === 'dark' 
    ? 'rgba(0, 0, 0, 0.2)' 
    : 'rgba(255, 255, 255, 0.1)';

  // 导航菜单项
  const menuItems = [
    { text: '首页', path: ROUTES.HOME, icon: <HomeIcon /> },
    { text: '文章', path: ROUTES.ARTICLES, icon: <ArticleIcon /> },
    { text: '关于', path: ROUTES.ABOUT, icon: <PersonIcon /> },
  ];

  // 处理移动端菜单切换
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  // 处理搜索栏切换
  const handleSearchToggle = () => {
    setSearchOpen(!searchOpen);
  };

  // 检查当前路径是否激活
  const isActivePath = (path) => {
    return location.pathname === path;
  };

  // 桌面端导航菜单
  const DesktopMenu = () => (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
      {menuItems.map((item) => (
        <motion.div
          key={item.path}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Button
            component={Link}
            to={item.path}
            color="inherit"
            sx={{
              position: 'relative',
              '&::after': {
                content: '""',
                position: 'absolute',
                bottom: 0,
                left: '50%',
                width: isActivePath(item.path) ? '100%' : '0%',
                height: '2px',
                backgroundColor: 'primary.main',
                transform: 'translateX(-50%)',
                transition: 'width 0.3s ease',
              },
              '&:hover::after': {
                width: '100%',
              },
            }}
          >
            {item.text}
          </Button>
        </motion.div>
      ))}
    </Box>
  );

  // 移动端抽屉菜单
  const MobileDrawer = () => (
    <Drawer
      variant="temporary"
      anchor="left"
      open={mobileOpen}
      onClose={handleDrawerToggle}
      ModalProps={{
        keepMounted: true, // 更好的移动端性能
      }}
      sx={{
        display: { xs: 'block', md: 'none' },
        '& .MuiDrawer-paper': {
          boxSizing: 'border-box',
          width: 240,
          backgroundColor: 'background.paper',
        },
      }}
    >
      <Box sx={{ p: 2 }}>
        <Typography variant="h6" color="primary" sx={{ mb: 2 }}>
          {SITE_CONFIG.name}
        </Typography>
        <List>
          {menuItems.map((item) => (
            <motion.div
              key={item.path}
              whileHover={{ x: 5 }}
              whileTap={{ scale: 0.95 }}
            >
                             <ListItem
                 component={Link}
                 to={item.path}
                 onClick={handleDrawerToggle}
                 selected={isActivePath(item.path)}
                 sx={{
                   borderRadius: 1,
                   mb: 0.5,
                   cursor: 'pointer',
                   '&.Mui-selected': {
                     backgroundColor: 'primary.main',
                     color: 'primary.contrastText',
                     '&:hover': {
                       backgroundColor: 'primary.dark',
                     },
                   },
                 }}
               >
                <Box sx={{ mr: 1, display: 'flex', alignItems: 'center' }}>
                  {item.icon}
                </Box>
                <ListItemText primary={item.text} />
              </ListItem>
            </motion.div>
          ))}
        </List>
      </Box>
    </Drawer>
  );

  return (
    <>
      <AppBar
        position="fixed"
        sx={{
          backgroundColor: glassBackground,
          color: 'text.primary',
          boxShadow: 'none',
          backdropFilter: 'blur(10px)',
          borderBottom: 'none',
        }}
      >
          <Container maxWidth="lg">
            <Toolbar sx={{ justifyContent: 'space-between' }}>
              {/* Logo区域 */}
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Typography
                  variant="h6"
                  component={Link}
                  to={ROUTES.HOME}
                  sx={{
                    textDecoration: 'none',
                    color: 'inherit',
                    fontWeight: 'bold',
                    background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
                    backgroundClip: 'text',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                  }}
                >
                  {SITE_CONFIG.name}
                </Typography>
              </motion.div>

              {/* 桌面端导航 */}
              <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                <DesktopMenu />
              </Box>

              {/* 右侧操作区域 */}
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                {/* 搜索栏 */}
                <AnimatePresence>
                  {searchOpen && (
                    <motion.div
                      initial={{ width: 0, opacity: 0 }}
                      animate={{ width: 'auto', opacity: 1 }}
                      exit={{ width: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <SearchBar
                        placeholder="搜索文章..."
                        onSearch={(query) => {
                          console.log('搜索:', query);
                          setSearchOpen(false);
                        }}
                      />
                    </motion.div>
                  )}
                </AnimatePresence>

                                 {/* 搜索按钮 */}
                 <IconButton
                   color="inherit"
                   onClick={handleSearchToggle}
                   sx={{ display: { xs: 'none', sm: 'flex' } }}
                 >
                   <motion.div
                     whileHover={{ rotate: 90 }}
                     transition={{ duration: 0.3 }}
                   >
                     <SearchIcon />
                   </motion.div>
                 </IconButton>

                 {/* 侧边栏切换按钮 */}
                 <IconButton
                   color="inherit"
                   onClick={onSidebarToggle}
                   sx={{ display: { xs: 'none', lg: 'flex' } }}
                 >
                   <motion.div
                     whileHover={{ rotate: 180 }}
                     transition={{ duration: 0.3 }}
                   >
                     <MenuIcon />
                   </motion.div>
                 </IconButton>

                {/* 主题切换 */}
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <ThemeToggle
                    isDark={isDark}
                    onToggle={onToggleTheme}
                    size="small"
                  />
                </Box>

                {/* 移动端菜单按钮 */}
                <IconButton
                  color="inherit"
                  aria-label="打开菜单"
                  onClick={handleDrawerToggle}
                  sx={{ display: { xs: 'flex', md: 'none' } }}
                >
                  <motion.div
                    animate={{ rotate: mobileOpen ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <MenuIcon />
                  </motion.div>
                </IconButton>
              </Box>
            </Toolbar>
          </Container>
        </AppBar>

      {/* 移动端抽屉 */}
      <MobileDrawer />

      {/* 占位符，防止内容被AppBar遮挡 */}
      <Toolbar />
    </>
  );
};

export default Header;

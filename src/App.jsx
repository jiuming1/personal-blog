import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, CssBaseline, Box, Typography } from '@mui/material';
import { useTheme } from './hooks/useTheme';
import { lightTheme, darkTheme } from './styles/theme';
import './styles/global.css';

// 导入布局组件
import Layout from './components/Layout/Layout';
// 导入页面组件
import Home from './pages/Home/Home';
import ArticlesList from './pages/Articles/ArticlesList';
import ArticleDetail from './pages/Articles/ArticleDetail';
import About from './pages/About/About';

/**
 * 主应用组件
 */
function App() {
  const { theme, isDark, toggleTheme } = useTheme();
  const currentTheme = isDark ? darkTheme : lightTheme;

  return (
    <ThemeProvider theme={currentTheme}>
      <CssBaseline />
      <Router basename="/personal-blog">
        <Layout isDark={isDark} onToggleTheme={toggleTheme}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/articles" element={<ArticlesList />} />
            <Route path="/articles/:id" element={<ArticleDetail />} />
            <Route path="/about" element={<About />} />
            <Route path="*" element={
              <Box sx={{ p: 4, textAlign: 'center' }}>
                <Typography variant="h4" sx={{ mb: 2 }}>
                  404 - 页面未找到
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  抱歉，您访问的页面不存在。
                </Typography>
              </Box>
            } />
          </Routes>
        </Layout>
      </Router>
    </ThemeProvider>
  );
}

export default App;

import React, { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Chip,
  Avatar,
  Link as MuiLink,
  Collapse,
  IconButton,
  useTheme as useMuiTheme,
  useMediaQuery,
} from '@mui/material';
import {
  ExpandLess,
  ExpandMore,
  Category as CategoryIcon,
  LocalOffer as TagIcon,
  Article as ArticleIcon,
  TrendingUp as TrendingIcon,
  Person as AuthorIcon,
  CalendarToday as DateIcon,
  Visibility as ViewIcon,
} from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { CATEGORIES, ROUTES } from '../../utils/constants';
import { getAllArticles, getFeaturedArticles, getLatestArticles } from '../../data/articles';

const Sidebar = ({ isOpen = true, onClose }) => {
  const [expandedCategories, setExpandedCategories] = useState({});
  const [expandedTags, setExpandedTags] = useState(false);
  const muiTheme = useMuiTheme();
  const isMobile = useMediaQuery(muiTheme.breakpoints.down('lg'));
  
  // 在移动端默认隐藏，桌面端根据传入的isOpen参数决定
  const shouldShow = isMobile ? false : isOpen;
  
  // 根据主题设置毛玻璃背景色
  const glassBackground = muiTheme.palette.mode === 'dark' 
    ? 'linear-gradient(135deg, rgba(0, 0, 0, 0.15) 0%, rgba(30, 58, 138, 0.05) 50%, rgba(6, 182, 212, 0.02) 100%)' 
    : 'linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(59, 130, 246, 0.03) 50%, rgba(6, 182, 212, 0.02) 100%)';

  const articles = getAllArticles();
  const featuredArticles = getFeaturedArticles();
  const latestArticles = getLatestArticles(5);

  const generateTags = () => {
    const tagCounts = {};
    articles.forEach(article => {
      article.tags.forEach(tag => {
        tagCounts[tag] = (tagCounts[tag] || 0) + 1;
      });
    });
    return Object.entries(tagCounts)
      .map(([tag, count]) => ({ tag, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 20);
  };

  const tags = generateTags();

  const handleCategoryToggle = (category) => {
    setExpandedCategories(prev => ({
      ...prev,
      [category]: !prev[category]
    }));
  };

  const handleTagsToggle = () => {
    setExpandedTags(!expandedTags);
  };

  const CategoryList = () => (
    <Paper
      elevation={0}
      sx={{
        p: 2,
        mb: 2,
        background: glassBackground,
        backdropFilter: 'blur(8px)',
        border: `1px solid ${muiTheme.palette.mode === 'dark' ? 'rgba(6, 182, 212, 0.1)' : 'rgba(6, 182, 212, 0.05)'}`,
        borderRadius: 2,
        transition: 'all 0.3s ease',
        '&:hover': {
          borderColor: muiTheme.palette.mode === 'dark' ? 'rgba(6, 182, 212, 0.2)' : 'rgba(6, 182, 212, 0.1)',
          boxShadow: muiTheme.palette.mode === 'dark' 
            ? '0 4px 15px rgba(6, 182, 212, 0.08)' 
            : '0 4px 15px rgba(59, 130, 246, 0.08)',
        },
      }}
    >
      <Typography 
        variant="h6" 
        sx={{ 
          mb: 2, 
          fontWeight: 'bold',
          background: muiTheme.palette.mode === 'dark' 
            ? 'linear-gradient(135deg, #06b6d4 0%, #3b82f6 100%)' 
            : 'linear-gradient(135deg, #3b82f6 0%, #06b6d4 100%)',
          backgroundClip: 'text',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <CategoryIcon sx={{ mr: 1, color: muiTheme.palette.mode === 'dark' ? '#06b6d4' : '#3b82f6' }} />
        分类
      </Typography>
      <List dense>
        {CATEGORIES.map((category) => {
          const categoryArticles = articles.filter(article => 
            article.category === category.value
          );
          const isExpanded = expandedCategories[category.value];

          return (
            <motion.div key={category.value}>
              <ListItem
                onClick={() => handleCategoryToggle(category.value)}
                sx={{
                  borderRadius: 1,
                  mb: 0.5,
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    backgroundColor: muiTheme.palette.mode === 'dark' 
                      ? 'rgba(6, 182, 212, 0.05)' 
                      : 'rgba(6, 182, 212, 0.03)',
                    transform: 'translateX(4px)',
                  },
                }}
              >
                <ListItemIcon sx={{ minWidth: 36 }}>
                  <span style={{ fontSize: '1.2rem' }}>{category.icon}</span>
                </ListItemIcon>
                <ListItemText 
                  primary={category.label}
                  secondary={`${categoryArticles.length} 篇文章`}
                />
                {isExpanded ? <ExpandLess /> : <ExpandMore />}
              </ListItem>
              
              <Collapse in={isExpanded} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  {categoryArticles.slice(0, 3).map((article) => (
                    <motion.div
                      key={article.id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <ListItem
                        component={Link}
                        to={`${ROUTES.ARTICLES}/${article.id}`}
                        sx={{
                          pl: 4,
                          borderRadius: 1,
                          mb: 0.5,
                          cursor: 'pointer',
                          '&:hover': {
                            backgroundColor: 'action.hover',
                          },
                        }}
                      >
                        <ListItemText
                          primary={article.title}
                          primaryTypographyProps={{
                            variant: 'body2',
                            noWrap: true,
                          }}
                        />
                      </ListItem>
                    </motion.div>
                  ))}
                </List>
              </Collapse>
            </motion.div>
          );
        })}
      </List>
    </Paper>
  );

  const TagCloud = () => (
    <Paper
      elevation={0}
      sx={{
        p: 2,
        mb: 2,
        background: glassBackground,
        backdropFilter: 'blur(8px)',
        border: `1px solid ${muiTheme.palette.mode === 'dark' ? 'rgba(6, 182, 212, 0.1)' : 'rgba(6, 182, 212, 0.05)'}`,
        borderRadius: 2,
        transition: 'all 0.3s ease',
        '&:hover': {
          borderColor: muiTheme.palette.mode === 'dark' ? 'rgba(6, 182, 212, 0.2)' : 'rgba(6, 182, 212, 0.1)',
          boxShadow: muiTheme.palette.mode === 'dark' 
            ? '0 4px 15px rgba(6, 182, 212, 0.08)' 
            : '0 4px 15px rgba(59, 130, 246, 0.08)',
        },
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
        <Typography 
          variant="h6" 
          sx={{ 
            fontWeight: 'bold',
            background: muiTheme.palette.mode === 'dark' 
              ? 'linear-gradient(135deg, #06b6d4 0%, #3b82f6 100%)' 
              : 'linear-gradient(135deg, #3b82f6 0%, #06b6d4 100%)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <TagIcon sx={{ mr: 1, color: muiTheme.palette.mode === 'dark' ? '#06b6d4' : '#3b82f6' }} />
          标签云
        </Typography>
        <IconButton 
          size="small" 
          onClick={handleTagsToggle}
          sx={{
            color: muiTheme.palette.mode === 'dark' ? '#06b6d4' : '#3b82f6',
                       '&:hover': {
             backgroundColor: muiTheme.palette.mode === 'dark' 
               ? 'rgba(6, 182, 212, 0.05)' 
               : 'rgba(6, 182, 212, 0.03)',
           },
          }}
        >
          {expandedTags ? <ExpandLess /> : <ExpandMore />}
        </IconButton>
      </Box>
      
      <Collapse in={expandedTags} timeout="auto">
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
          {tags.map((tag) => (
            <motion.div
              key={tag.tag}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Chip
                label={`${tag.tag} (${tag.count})`}
                size="small"
                variant="outlined"
                component={Link}
                to={`${ROUTES.ARTICLES}?tag=${tag.tag}`}
                sx={{
                  cursor: 'pointer',
                                     background: muiTheme.palette.mode === 'dark' 
                     ? 'rgba(6, 182, 212, 0.03)' 
                     : 'rgba(6, 182, 212, 0.02)',
                   border: `1px solid ${muiTheme.palette.mode === 'dark' ? 'rgba(6, 182, 212, 0.15)' : 'rgba(6, 182, 212, 0.1)'}`,
                  color: muiTheme.palette.mode === 'dark' ? '#06b6d4' : '#3b82f6',
                  fontWeight: 500,
                  transition: 'all 0.3s ease',
                                     '&:hover': {
                     background: muiTheme.palette.mode === 'dark' 
                       ? 'rgba(6, 182, 212, 0.08)' 
                       : 'rgba(6, 182, 212, 0.05)',
                     borderColor: muiTheme.palette.mode === 'dark' ? '#06b6d4' : '#3b82f6',
                     transform: 'scale(1.05)',
                     boxShadow: muiTheme.palette.mode === 'dark' 
                       ? '0 2px 8px rgba(6, 182, 212, 0.15)' 
                       : '0 2px 8px rgba(59, 130, 246, 0.1)',
                   },
                }}
              />
            </motion.div>
          ))}
        </Box>
      </Collapse>
    </Paper>
  );

  const LatestArticles = () => (
    <Paper
      elevation={0}
      sx={{
        p: 2,
        mb: 2,
        background: glassBackground,
        backdropFilter: 'blur(8px)',
        border: `1px solid ${muiTheme.palette.mode === 'dark' ? 'rgba(6, 182, 212, 0.1)' : 'rgba(6, 182, 212, 0.05)'}`,
        borderRadius: 2,
        transition: 'all 0.3s ease',
        '&:hover': {
          borderColor: muiTheme.palette.mode === 'dark' ? 'rgba(6, 182, 212, 0.2)' : 'rgba(6, 182, 212, 0.1)',
          boxShadow: muiTheme.palette.mode === 'dark' 
            ? '0 4px 15px rgba(6, 182, 212, 0.08)' 
            : '0 4px 15px rgba(59, 130, 246, 0.08)',
        },
      }}
    >
      <Typography 
        variant="h6" 
        sx={{ 
          mb: 2, 
          fontWeight: 'bold',
          background: muiTheme.palette.mode === 'dark' 
            ? 'linear-gradient(135deg, #06b6d4 0%, #3b82f6 100%)' 
            : 'linear-gradient(135deg, #3b82f6 0%, #06b6d4 100%)',
          backgroundClip: 'text',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <TrendingIcon sx={{ mr: 1, color: muiTheme.palette.mode === 'dark' ? '#06b6d4' : '#3b82f6' }} />
        最新文章
      </Typography>
      <List dense>
        {latestArticles.map((article, index) => (
          <motion.div
            key={article.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <ListItem
              component={Link}
              to={`${ROUTES.ARTICLES}/${article.id}`}
              sx={{
                borderRadius: 1,
                mb: 1,
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                                 '&:hover': {
                   backgroundColor: muiTheme.palette.mode === 'dark' 
                     ? 'rgba(6, 182, 212, 0.05)' 
                     : 'rgba(6, 182, 212, 0.03)',
                   transform: 'translateX(4px)',
                 },
              }}
            >
              <ListItemIcon sx={{ minWidth: 36 }}>
                <Avatar
                  sx={{
                    width: 32,
                    height: 32,
                    fontSize: '0.75rem',
                    background: muiTheme.palette.mode === 'dark' 
                      ? 'linear-gradient(135deg, #06b6d4 0%, #3b82f6 100%)' 
                      : 'linear-gradient(135deg, #3b82f6 0%, #06b6d4 100%)',
                    color: 'white',
                    fontWeight: 'bold',
                    boxShadow: muiTheme.palette.mode === 'dark' 
                      ? '0 2px 8px rgba(6, 182, 212, 0.3)' 
                      : '0 2px 8px rgba(59, 130, 246, 0.2)',
                  }}
                >
                  {index + 1}
                </Avatar>
              </ListItemIcon>
              <ListItemText
                primary={article.title}
                secondary={
                  <Box component="span" sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 0.5 }}>
                    <DateIcon sx={{ fontSize: 14 }} />
                    <Typography component="span" variant="caption" color="text.secondary">
                      {new Date(article.publishDate).toLocaleDateString()}
                    </Typography>
                    <ViewIcon sx={{ fontSize: 14, ml: 1 }} />
                    <Typography component="span" variant="caption" color="text.secondary">
                      {article.views}
                    </Typography>
                  </Box>
                }
                primaryTypographyProps={{
                  variant: 'body2',
                  noWrap: true,
                }}
              />
            </ListItem>
          </motion.div>
        ))}
      </List>
    </Paper>
  );

  const AuthorInfo = () => (
    <Paper
      elevation={0}
      sx={{
        p: 2,
        background: glassBackground,
        backdropFilter: 'blur(8px)',
        border: `1px solid ${muiTheme.palette.mode === 'dark' ? 'rgba(6, 182, 212, 0.1)' : 'rgba(6, 182, 212, 0.05)'}`,
        borderRadius: 2,
        textAlign: 'center',
        transition: 'all 0.3s ease',
        '&:hover': {
          borderColor: muiTheme.palette.mode === 'dark' ? 'rgba(6, 182, 212, 0.2)' : 'rgba(6, 182, 212, 0.1)',
          boxShadow: muiTheme.palette.mode === 'dark' 
            ? '0 4px 15px rgba(6, 182, 212, 0.08)' 
            : '0 4px 15px rgba(59, 130, 246, 0.08)',
        },
      }}
    >
      <Avatar
        src="/personal-blog/images/projects/head.jpg"
        sx={{
          width: 80,
          height: 80,
          mx: 'auto',
          mb: 2,
          background: muiTheme.palette.mode === 'dark' 
            ? 'linear-gradient(135deg, #06b6d4 0%, #3b82f6 100%)' 
            : 'linear-gradient(135deg, #3b82f6 0%, #06b6d4 100%)',
                     border: `3px solid ${muiTheme.palette.mode === 'dark' ? 'rgba(6, 182, 212, 0.15)' : 'rgba(6, 182, 212, 0.1)'}`,
                     boxShadow: muiTheme.palette.mode === 'dark' 
             ? '0 4px 20px rgba(6, 182, 212, 0.15)' 
             : '0 4px 20px rgba(59, 130, 246, 0.1)',
        }}
      >
        <AuthorIcon sx={{ fontSize: 40 }} />
      </Avatar>
             <Typography 
         variant="h6" 
         sx={{ 
           mb: 1, 
           fontWeight: 'bold',
           background: muiTheme.palette.mode === 'dark' 
             ? 'linear-gradient(135deg, #06b6d4 0%, #3b82f6 100%)' 
             : 'linear-gradient(135deg, #3b82f6 0%, #06b6d4 100%)',
           backgroundClip: 'text',
           WebkitBackgroundClip: 'text',
           WebkitTextFillColor: 'transparent',
         }}
       >
         cty
       </Typography>
      <Typography 
        variant="body2" 
        color="text.secondary" 
        sx={{ 
          mb: 2,
          lineHeight: 1.6,
          color: muiTheme.palette.mode === 'dark' ? '#cbd5e1' : '#4b5563',
        }}
      >
        热爱技术，专注前端开发，分享学习心得和技术见解。
      </Typography>
      <MuiLink
        component={Link}
        to={ROUTES.ABOUT}
        sx={{ 
          textDecoration: 'none',
          color: muiTheme.palette.mode === 'dark' ? '#06b6d4' : '#3b82f6',
          fontWeight: 600,
          transition: 'all 0.3s ease',
          '&:hover': {
            color: muiTheme.palette.mode === 'dark' ? '#0891b2' : '#2563eb',
            textShadow: muiTheme.palette.mode === 'dark' 
              ? '0 0 8px rgba(6, 182, 212, 0.5)' 
              : '0 0 8px rgba(59, 130, 246, 0.3)',
          },
        }}
      >
        了解更多 →
      </MuiLink>
    </Paper>
  );

  return (
    <AnimatePresence>
      {shouldShow && (
        <motion.div
          initial={{ x: 0, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: 0, opacity: 0 }}
          transition={{ duration: 0.3 }}
          style={{
            width: 300,
            position: 'sticky',
            top: 80,
            height: 'auto',
            zIndex: 'auto',
            backgroundColor: 'background.default',
            overflowY: 'auto',
            padding: 0,
          }}
        >
          <CategoryList />
          <TagCloud />
          <LatestArticles />
          <AuthorInfo />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Sidebar;

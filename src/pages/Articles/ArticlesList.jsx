import React, { useState, useMemo, memo, useRef, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Chip,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Pagination,
  Paper,
  useTheme,
  InputAdornment,
  IconButton,
} from '@mui/material';
import {
  Search as SearchIcon,
  FilterList as FilterIcon,
  Article as ArticleIcon,
  CalendarToday as DateIcon,
  Visibility as ViewIcon,
  Person as AuthorIcon,
  Category as CategoryIcon,
  Clear as ClearIcon,
} from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { ROUTES, CATEGORIES } from '../../utils/constants';
import { getAllArticles, getArticlesByCategory, searchArticles } from '../../data/articles';

/**
 * 文章列表页面专用搜索组件
 */
const ArticleListSearchField = memo(({ value, onChange, placeholder }) => {
  const [inputValue, setInputValue] = useState(value || '');
  const [isFocused, setIsFocused] = useState(false);
  const searchTimeoutRef = useRef(null);
  const lastValueRef = useRef(value);

  // 同步外部value变化 - 只在组件初始化或value真正改变时更新
  useEffect(() => {
    if (value !== lastValueRef.current) {
      lastValueRef.current = value;
      setInputValue(value || '');
    }
  }, [value]);

  // 防抖搜索函数
  const debouncedSearch = (searchValue) => {
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }
    searchTimeoutRef.current = setTimeout(() => {
      if (onChange) {
        onChange(searchValue);
      }
    }, 300); // 300ms延迟
  };

  const handleInputChange = (event) => {
    const newValue = event.target.value;
    setInputValue(newValue);
    // 使用防抖机制调用onChange
    debouncedSearch(newValue);
  };

  const handleClear = () => {
    setInputValue('');
    // 清除定时器
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }
    if (onChange) {
      onChange('');
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      // 按回车键时立即搜索，清除定时器
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }
      if (onChange) {
        onChange(inputValue);
      }
    }
  };

  // 组件卸载时清理定时器
  useEffect(() => {
    return () => {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }
    };
  }, []);

  return (
    <TextField
      fullWidth
      placeholder={placeholder}
      value={inputValue}
      onChange={handleInputChange}
      onKeyPress={handleKeyPress}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
      inputProps={{
        lang: 'zh-CN',
        autoComplete: 'off',
        autoCorrect: 'off',
        autoCapitalize: 'off',
        spellCheck: 'false',
      }}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon color="action" />
          </InputAdornment>
        ),
        endAdornment: inputValue && (
          <InputAdornment position="end">
            <IconButton
              size="small"
              onClick={handleClear}
              edge="end"
              aria-label="清除搜索"
            >
              <ClearIcon />
            </IconButton>
          </InputAdornment>
        ),
      }}
      sx={{
        '& .MuiOutlinedInput-root': {
          borderRadius: 2,
          transition: 'all 0.3s ease',
          '&:hover': {
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
          },
          '&.Mui-focused': {
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
          },
        },
      }}
    />
  );
});

/**
 * 文章列表页面
 */
const ArticlesList = () => {
  const theme = useTheme();
  const location = useLocation();
  const [articles] = useState(() => getAllArticles()); // 只在初始化时调用一次
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState('date');
  
  const articlesPerPage = 9;

  // 从URL参数中读取搜索查询
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchParam = urlParams.get('search');
    if (searchParam) {
      setSearchQuery(decodeURIComponent(searchParam));
    }
  }, [location.search]);

  // 动画变体
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: 'easeOut',
      },
    },
  };

  // 使用useMemo计算筛选结果，避免状态更新
  const filteredArticles = useMemo(() => {
    let filtered = [...articles];

    // 按分类筛选
    if (selectedCategory) {
      filtered = filtered.filter(article => article.category === selectedCategory);
    }

    // 按搜索关键词筛选
    if (searchQuery.trim()) {
      const lowercaseQuery = searchQuery.toLowerCase();
      filtered = filtered.filter(article => 
        article.title.toLowerCase().includes(lowercaseQuery) ||
        article.excerpt.toLowerCase().includes(lowercaseQuery) ||
        (article.tags && article.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery)))
      );
    }

    // 排序
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'date':
          return new Date(b.publishDate) - new Date(a.publishDate);
        case 'views':
          const viewsA = a.views || 0;
          const viewsB = b.views || 0;
          return viewsB - viewsA;
        case 'title':
          return a.title.localeCompare(b.title, 'zh-CN');
        default:
          return 0;
      }
    });

    return filtered;
  }, [articles, searchQuery, selectedCategory, sortBy]);

  // 分页逻辑
  const paginatedArticles = useMemo(() => {
    const startIndex = (currentPage - 1) * articlesPerPage;
    return filteredArticles.slice(startIndex, startIndex + articlesPerPage);
  }, [filteredArticles, currentPage]);

  const totalPages = Math.ceil(filteredArticles.length / articlesPerPage);

  // 处理搜索 - 实时更新搜索查询
  const handleSearch = (query) => {
    setSearchQuery(query);
    setCurrentPage(1); // 重置到第一页，确保能看到搜索结果
  };

  // 处理分类筛选
  const handleCategoryChange = (event) => {
    const category = event.target.value;
    setSelectedCategory(category);
    setCurrentPage(1); // 重置到第一页
  };

  // 处理排序
  const handleSortChange = (event) => {
    const sort = event.target.value;
    setSortBy(sort);
    setCurrentPage(1); // 重置到第一页
  };

  // 处理分页
  const handlePageChange = (event, value) => {
    setCurrentPage(value);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // 清除筛选
  const clearFilters = () => {
    setSearchQuery('');
    setSelectedCategory('');
    setSortBy('date');
    setCurrentPage(1);
  };

  // 筛选器组件
  const FilterSection = () => (
    <Paper sx={{ p: 3, mb: 4 }}>
      <motion.div
        variants={itemVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
          <FilterIcon sx={{ mr: 1 }} />
          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
            筛选和搜索
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {/* 搜索框 - 使用自定义搜索组件 */}
          <ArticleListSearchField
            value={searchQuery}
            onChange={handleSearch}
            placeholder="搜索文章标题或内容..."
          />

          {/* 筛选选项 */}
          <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', alignItems: 'center' }}>
            {/* 分类筛选 */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <CategoryIcon sx={{ fontSize: 16, color: 'text.secondary' }} />
              <Select
                value={selectedCategory}
                onChange={handleCategoryChange}
                size="small"
                displayEmpty
                sx={{
                  minWidth: 120,
                  '& .MuiSelect-select': {
                    textAlign: 'center',
                    padding: '4px 8px'
                  }
                }}
              >
                <MenuItem value="" sx={{ textAlign: 'center' }}>全部分类</MenuItem>
                {CATEGORIES.map((category) => (
                  <MenuItem key={category.value} value={category.value} sx={{ textAlign: 'center' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <span style={{ marginRight: 8 }}>{category.icon}</span>
                      {category.label}
                    </Box>
                  </MenuItem>
                ))}
              </Select>
            </Box>

            {/* 排序 */}
            <FormControl sx={{ minWidth: 100, maxWidth: 150 }}>
              <InputLabel>排序</InputLabel>
              <Select
                value={sortBy}
                label="排序"
                onChange={handleSortChange}
                size="small"
              >
                <MenuItem value="date">按日期</MenuItem>
                <MenuItem value="views">按浏览量</MenuItem>
                <MenuItem value="title">按标题</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </Box>

        {/* 清除筛选按钮 */}
        {(searchQuery || selectedCategory || sortBy !== 'date') && (
          <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-start' }}>
            <Button
              variant="outlined"
              onClick={clearFilters}
              size="small"
              sx={{ minWidth: 'auto' }}
            >
              清除筛选
            </Button>
          </Box>
        )}
      </motion.div>
    </Paper>
  );

  // 文章卡片组件
  const ArticleCard = ({ article, index }) => (
    <Grid xs={12} sm={6} lg={4} key={article.id} sx={{ width: '100%' }}>
      <motion.div
        variants={itemVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        transition={{ delay: index * 0.1 }}
      >
        <Card
          component={Link}
          to={`${ROUTES.ARTICLES}/${article.id}`}
          sx={{
            height: '100%',
            minHeight: '450px',
            width: '100%',
            textDecoration: 'none',
            transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
            '&:hover': {
              transform: 'translateY(-8px)',
              boxShadow: theme.shadows[8],
            },
          }}
        >
                     {article.coverImage ? (
             <CardMedia
               component="img"
               height="200"
               image={article.coverImage}
               alt={article.title}
               sx={{
                 objectFit: 'cover',
                 width: '100%',
                 height: '200px',
               }}
             />
           ) : (
             <Box
               sx={{
                 height: '200px',
                 backgroundColor: theme.palette.action.hover,
                 display: 'flex',
                 alignItems: 'center',
                 justifyContent: 'center',
               }}
             >
               <ArticleIcon sx={{ fontSize: '3rem', color: 'text.secondary' }} />
             </Box>
           )}
          <CardContent sx={{ p: 3 }}>
            {/* 文章元信息 */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
              <Chip
                label={article.category}
                size="small"
                color="primary"
                variant="outlined"
                icon={<CategoryIcon />}
              />
              <Box sx={{ flex: 1 }} />
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                <ViewIcon sx={{ fontSize: 16 }} />
                <Typography variant="caption" color="text.secondary">
                  {article.views}
                </Typography>
              </Box>
            </Box>

            {/* 文章标题 */}
            <Typography
              variant="h6"
              sx={{
                mb: 2,
                fontWeight: 'bold',
                color: 'text.primary',
                lineHeight: 1.4,
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
              }}
            >
              {article.title}
            </Typography>

            {/* 文章摘要 */}
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{
                mb: 3,
                lineHeight: 1.6,
                display: '-webkit-box',
                WebkitLineClamp: 3,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
              }}
            >
              {article.excerpt}
            </Typography>

            {/* 文章标签 */}
            {article.tags && article.tags.length > 0 && (
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mb: 2 }}>
                                 {article.tags && article.tags.slice(0, 3).map((tag) => (
                  <Chip
                    key={tag}
                    label={tag}
                    size="small"
                    variant="outlined"
                    sx={{ fontSize: '0.75rem' }}
                  />
                ))}
              </Box>
            )}

            {/* 文章底部信息 */}
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <AuthorIcon sx={{ fontSize: 16, color: 'text.secondary' }} />
                <Typography variant="caption" color="text.secondary">
                  {article.author}
                </Typography>
              </Box>
                             <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                 <DateIcon sx={{ fontSize: 16, color: 'text.secondary' }} />
                 <Typography variant="caption" color="text.secondary">
                   {new Date(article.publishDate).toLocaleDateString()}
                 </Typography>
               </Box>
            </Box>
          </CardContent>
        </Card>
      </motion.div>
    </Grid>
  );

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <Container maxWidth="lg">
        {/* 页面标题 */}
        <motion.div variants={itemVariants}>
          <Box sx={{ textAlign: 'center', mb: 6, px: 2, pt: 4 }}>
            <Typography variant="h3" sx={{ fontWeight: 'bold', mb: 2 }}>
              文章列表
            </Typography>
            <Typography variant="h6" color="text.secondary">
              发现有趣的技术文章和见解
            </Typography>
          </Box>
        </motion.div>

        {/* 筛选器 */}
        <FilterSection />

        {/* 结果统计 */}
        <motion.div variants={itemVariants}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3, px: 2 }}>
            <Typography variant="body1" color="text.secondary">
              共找到 {filteredArticles.length} 篇文章
            </Typography>
            {filteredArticles.length > 0 && (
              <Typography variant="body2" color="text.secondary">
                第 {currentPage} 页，共 {totalPages} 页
              </Typography>
            )}
          </Box>
        </motion.div>

        {/* 文章列表 */}
        {filteredArticles.length > 0 ? (
          <>
                         <Grid container spacing={3} columns={12}>
               <AnimatePresence>
                 {paginatedArticles.map((article, index) => (
                   <ArticleCard key={article.id} article={article} index={index} />
                 ))}
               </AnimatePresence>
             </Grid>

            {/* 分页 */}
            {totalPages > 1 && (
              <motion.div variants={itemVariants}>
                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 6 }}>
                  <Pagination
                    count={totalPages}
                    page={currentPage}
                    onChange={handlePageChange}
                    color="primary"
                    size="large"
                    showFirstButton
                    showLastButton
                  />
                </Box>
              </motion.div>
            )}
          </>
        ) : (
          // 空状态
          <motion.div variants={itemVariants}>
            <Paper
              sx={{
                p: 8,
                textAlign: 'center',
                background: `linear-gradient(135deg, ${theme.palette.background.paper} 0%, ${theme.palette.action.hover} 100%)`,
              }}
            >
              <ArticleIcon sx={{ fontSize: '4rem', color: 'text.secondary', mb: 2 }} />
              <Typography variant="h5" sx={{ mb: 2, fontWeight: 'bold' }}>
                没有找到相关文章
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
                尝试调整搜索条件或清除筛选器
              </Typography>
              <Button
                variant="contained"
                onClick={clearFilters}
                startIcon={<FilterIcon />}
              >
                清除筛选
              </Button>
            </Paper>
          </motion.div>
        )}
      </Container>
    </motion.div>
  );
};

export default ArticlesList;

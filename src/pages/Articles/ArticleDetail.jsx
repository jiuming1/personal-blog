import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  Chip,
  Avatar,
  Paper,
  Divider,
  IconButton,
  useTheme,
  Breadcrumbs,
  Link as MuiLink,
} from '@mui/material';
import TableOfContents from '../../components/Blog/TableOfContents';
import useTableOfContents from '../../hooks/useTableOfContents';
import {
  ArrowBack as ArrowBackIcon,
  CalendarToday as DateIcon,
  Visibility as ViewIcon,
  Person as AuthorIcon,
  Category as CategoryIcon,
  Share as ShareIcon,
  Bookmark as BookmarkIcon,
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { marked } from 'marked';
import { InlineMath, BlockMath } from 'react-katex';
import { ROUTES, CATEGORIES } from '../../utils/constants';
import { getArticleById, getAllArticles } from '../../data/articles';
import { incrementArticleView } from '../../utils/viewCounter';

/**
 * 渲染包含数学公式的内容组件 - 采用新的渲染逻辑
 */
const MathContent = ({ content }) => {
  const renderContent = () => {
    const parts = content.split(/(__INLINE_MATH__.*?__INLINE_MATH__|__BLOCK_MATH__.*?__BLOCK_MATH__)/g);
    
    return parts.map((part, index) => {
      if (part.startsWith('__INLINE_MATH__') && part.endsWith('__INLINE_MATH__')) {
        const formula = part.replace(/__INLINE_MATH__/g, '');
        try {
          return (
            <InlineMath key={index} math={formula} />
          );
        } catch (error) {
          console.error('Error rendering inline math:', error);
          return <span key={index} style={{ color: 'red' }}>{formula}</span>;
        }
      } else if (part.startsWith('__BLOCK_MATH__') && part.endsWith('__BLOCK_MATH__')) {
        const formula = part.replace(/__BLOCK_MATH__/g, '');
        try {
          return (
            <BlockMath key={index} math={formula} />
          );
        } catch (error) {
          console.error('Error rendering block math:', error);
          return <div key={index} style={{ color: 'red', textAlign: 'center' }}>{formula}</div>;
        }
      } else {
        return (
          <span key={index} dangerouslySetInnerHTML={{ __html: part }} />
        );
      }
    });
  };

  return <div>{renderContent()}</div>;
};

/**
 * 文章详情页面
 */
const ArticleDetail = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { id } = useParams();
  const [article, setArticle] = useState(null);
  const [relatedArticles, setRelatedArticles] = useState([]);
  
  // 使用目录大纲Hook
  const { headings, activeId, scrollToHeading } = useTableOfContents(article?.content || '');

  // 配置marked选项
  useEffect(() => {
    // 禁用marked的自动ID生成，我们将手动设置ID
    marked.setOptions({
      breaks: true,
      gfm: true,
      headerPrefix: '',
      mangle: false,
      headerIds: false, // 禁用自动ID生成
    });
  }, []);

  // 自定义markdown渲染器，支持数学公式 - 采用新的渲染逻辑
  const renderMarkdownWithMath = (content) => {
    // 先处理数学公式，用特殊标记替换
    let processedContent = content;
    
    // 处理LaTeX块级数学公式 \[...\]，用特殊标记替换
    processedContent = processedContent.replace(/\\\\\[([^\]]+)\\\\\]/g, (match, formula) => {
      return `__BLOCK_MATH__${formula}__BLOCK_MATH__`;
    });
    
    // 处理LaTeX行内数学公式 \(...\)，用特殊标记替换
    processedContent = processedContent.replace(/\\\\\\(([^)]+)\\\\\\)/g, (match, formula) => {
      return `__INLINE_MATH__${formula}__INLINE_MATH__`;
    });
    
    // 处理美元符号行内数学公式 $...$
    processedContent = processedContent.replace(/\$([^\$]+)\$/g, (match, formula) => {
      return `__INLINE_MATH__${formula}__INLINE_MATH__`;
    });
    
    // 处理美元符号块级数学公式 $$...$$
    processedContent = processedContent.replace(/\$\$([^\$]+)\$\$/g, (match, formula) => {
      return `__BLOCK_MATH__${formula}__BLOCK_MATH__`;
    });
    
    // 使用marked渲染markdown
    const htmlContent = marked(processedContent);
    
    return htmlContent;
  };

  useEffect(() => {
    const currentArticle = getArticleById(id);
    if (currentArticle) {
      setArticle(currentArticle);
      
      // 增加文章浏览量
      incrementArticleView(id);
      
      // 获取相关文章
      const allArticles = getAllArticles();
      const related = allArticles
        .filter(a => a.id !== id && a.category === currentArticle.category)
        .slice(0, 3);
      setRelatedArticles(related);
    }
  }, [id]);

  // 当文章内容更新后，确保目录能正确生成并渲染数学公式
  useEffect(() => {
    if (article?.content) {
      // 延迟一点时间确保DOM已经更新
      const timer = setTimeout(() => {
        // 触发一个自定义事件，通知目录组件内容已更新
        window.dispatchEvent(new CustomEvent('articleContentUpdated'));
        
        // 渲染数学公式
        renderMathInElement();
        
        // 调试：检查数学公式匹配情况
        console.log('Article content length:', article.content.length);
        const latexBlockMatches = article.content.match(/\\\\\[([^\]]+)\\\\\]/g);
        const latexInlineMatches = article.content.match(/\\\\\\(([^)]+)\\\\\\)/g);
        console.log('LaTeX block matches:', latexBlockMatches);
        console.log('LaTeX inline matches:', latexInlineMatches);
      }, 500);
      
      return () => clearTimeout(timer);
    }
  }, [article?.content]);

  // 渲染数学公式的函数
  const renderMathInElement = () => {
    // 渲染行内数学公式
    const inlineMathElements = document.querySelectorAll('.math-inline');
    inlineMathElements.forEach((element) => {
      try {
        const formula = element.textContent;
        const mathElement = document.createElement('span');
        mathElement.innerHTML = `<span class="katex">${formula}</span>`;
        element.innerHTML = '';
        element.appendChild(mathElement);
      } catch (error) {
        console.error('Error rendering inline math:', error);
      }
    });
    
    // 渲染块级数学公式
    const blockMathElements = document.querySelectorAll('.math-block');
    blockMathElements.forEach((element) => {
      try {
        const formula = element.textContent;
        const mathElement = document.createElement('div');
        mathElement.innerHTML = `<div class="katex-display">${formula}</div>`;
        element.innerHTML = '';
        element.appendChild(mathElement);
      } catch (error) {
        console.error('Error rendering block math:', error);
      }
    });
  };

  if (!article) {
    return (
      <Container maxWidth="lg">
        <Box sx={{ textAlign: 'center', py: 8 }}>
          <Typography variant="h4" color="text.secondary">
            文章未找到
          </Typography>
        </Box>
      </Container>
    );
  }

  const category = CATEGORIES.find(cat => cat.value === article.category);

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

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <Container maxWidth="lg">
        {/* 面包屑导航 */}
        <motion.div variants={itemVariants}>
          <Box sx={{ py: 2 }}>
            <Breadcrumbs aria-label="breadcrumb">
              <MuiLink
                component={Link}
                to={ROUTES.HOME}
                color="inherit"
                sx={{ textDecoration: 'none' }}
              >
                首页
              </MuiLink>
              <MuiLink
                component={Link}
                to={ROUTES.ARTICLES}
                color="inherit"
                sx={{ textDecoration: 'none' }}
              >
                文章
              </MuiLink>
              <Typography color="text.primary">{article.title}</Typography>
            </Breadcrumbs>
          </Box>
        </motion.div>

        {/* 文章头部 */}
        <motion.div variants={itemVariants}>
          <Paper
            elevation={1}
            sx={{
              p: 4,
              mb: 3,
              backgroundColor: 'background.paper',
            }}
          >
            {/* 返回按钮 */}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
              <IconButton
                onClick={() => navigate(-1)}
                sx={{ color: 'text.secondary' }}
              >
                <ArrowBackIcon />
              </IconButton>
                             <Box sx={{ display: 'flex', gap: 1 }}>
                 <IconButton sx={{ color: 'text.secondary' }}>
                   <ShareIcon />
                 </IconButton>
                 <IconButton sx={{ color: 'text.secondary' }}>
                   <BookmarkIcon />
                 </IconButton>
               </Box>
            </Box>

            {/* 文章标题 */}
            <Typography
              variant="h3"
              sx={{
                fontWeight: 'bold',
                mb: 4,
                lineHeight: 1.4,
                color: 'text.primary',
                fontSize: { xs: '1.8rem', sm: '2.2rem', md: '2.5rem' },
              }}
            >
              {article.title}
            </Typography>

            {/* 文章元信息 */}
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mb: 3 }}>
              <Chip
                icon={<CategoryIcon />}
                label={category?.label || article.category}
                color="primary"
                variant="outlined"
              />
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <AuthorIcon sx={{ fontSize: 16, color: 'text.secondary' }} />
                <Typography variant="body2" color="text.secondary">
                  {article.author}
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <DateIcon sx={{ fontSize: 16, color: 'text.secondary' }} />
                <Typography variant="body2" color="text.secondary">
                  {new Date(article.publishDate).toLocaleDateString()}
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <ViewIcon sx={{ fontSize: 16, color: 'text.secondary' }} />
                <Typography variant="body2" color="text.secondary">
                  {article.views} 次浏览
                </Typography>
              </Box>
            </Box>

            {/* 文章标签 */}
            {article.tags && article.tags.length > 0 && (
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                {article.tags.map((tag) => (
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
          </Paper>
        </motion.div>

                           {/* 文章内容 */}
          <motion.div variants={itemVariants}>
            <Box sx={{ 
              display: 'flex', 
              gap: 3,
              alignItems: 'flex-start',
              position: 'relative',
            }}>
            
            {/* 目录大纲 - 固定在右侧 */}
            <Box sx={{ 
              position: 'fixed',
              right: 40,
              top: '50%',
              transform: 'translateY(-50%)',
              zIndex: 1000,
              display: { xs: 'none', lg: 'block' },
            }}>
              <TableOfContents
                headings={headings}
                activeId={activeId}
                onHeadingClick={scrollToHeading}
              />
            </Box>
              {/* 文章正文 */}
              <Box sx={{ 
                flex: 1,
                maxWidth: { xs: '100%', lg: 'calc(100% - 320px)' },
                mr: { lg: 4 },
              }}>
               <Paper
                 elevation={1}
                 sx={{
                   p: 4,
                   mb: 3,
                   backgroundColor: 'background.paper',
                 }}
               >
            {/* 文章摘要 */}
            <Typography
              variant="h6"
              color="text.secondary"
              sx={{
                mb: 4,
                fontStyle: 'italic',
                lineHeight: 1.7,
                padding: 3,
                backgroundColor: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.05)',
                borderRadius: 2,
                borderLeft: '4px solid',
                borderColor: 'primary.main',
                fontSize: '1.1rem',
              }}
            >
              {article.excerpt}
            </Typography>

            <Divider sx={{ mb: 4 }} />

            {/* 文章正文 */}
            <Box sx={{ lineHeight: 1.8 }}>
              <Box
                data-content="article"
                ref={(el) => {
                  if (el) {
                    // 在DOM元素挂载后立即设置ID
                    setTimeout(() => {
                      const headings = el.querySelectorAll('h1, h2, h3, h4, h5, h6');
                      headings.forEach((heading, index) => {
                        heading.id = `heading-${index}`;
                        console.log(`ArticleDetail: Set ID for "${heading.textContent.trim()}": heading-${index}`);
                      });
                    }, 100);
                  }
                }}
                sx={{
                  mb: 3,
                  color: 'text.primary',
                  fontSize: '1.1rem',
                  scrollBehavior: 'smooth', // 确保平滑滚动
                  scrollMarginTop: '100px', // 为锚点滚动添加顶部边距
                  '& h1': {
                    fontSize: '2.5rem',
                    fontWeight: 'bold',
                    mt: 6,
                    mb: 3,
                    color: 'text.primary',
                    borderBottom: '2px solid',
                    borderColor: 'primary.main',
                    pb: 1,
                  },
                  '& h2': {
                    fontSize: '2rem',
                    fontWeight: 'bold',
                    mt: 5,
                    mb: 2.5,
                    color: 'text.primary',
                  },
                  '& h3': {
                    fontSize: '1.5rem',
                    fontWeight: 'bold',
                    mt: 4,
                    mb: 2,
                    color: 'text.primary',
                  },
                  '& h4, & h5, & h6': {
                    fontSize: '1.25rem',
                    fontWeight: 'bold',
                    mt: 3,
                    mb: 1.5,
                    color: 'text.primary',
                  },
                  '& p': {
                    mb: 2.5,
                    lineHeight: 1.8,
                    textAlign: 'justify',
                  },
                  '& ul, & ol': {
                    mb: 3,
                    pl: 4,
                    '& li': {
                      mb: 1,
                      lineHeight: 1.6,
                    },
                    '& ul, & ol': {
                      mt: 1,
                      mb: 1,
                    },
                  },
                  '& blockquote': {
                    borderLeft: '4px solid',
                    borderColor: 'primary.main',
                    pl: 3,
                    ml: 0,
                    mr: 0,
                    fontStyle: 'italic',
                    backgroundColor: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.05)',
                    py: 2,
                    borderRadius: '0 8px 8px 0',
                    fontSize: '1.05rem',
                  },
                  '& code': {
                    backgroundColor: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
                    padding: '3px 6px',
                    borderRadius: 2,
                    fontSize: '0.9em',
                    fontFamily: 'Consolas, Monaco, "Courier New", monospace',
                    color: theme.palette.mode === 'dark' ? '#4ade80' : '#059669',
                  },
                  '& pre': {
                    backgroundColor: theme.palette.mode === 'dark' ? '#1e293b' : '#f8fafc',
                    padding: 3,
                    borderRadius: 2,
                    overflow: 'auto',
                    mb: 3,
                    border: '1px solid',
                    borderColor: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
                    fontSize: '0.9rem',
                    lineHeight: 1.5,
                    '& code': {
                      backgroundColor: 'transparent',
                      padding: 0,
                      color: theme.palette.mode === 'dark' ? '#e2e8f0' : '#1e293b',
                      fontSize: 'inherit',
                    },
                  },
                  '& strong': {
                    fontWeight: 'bold',
                    color: 'text.primary',
                  },
                  '& em': {
                    fontStyle: 'italic',
                  },
                  '& a': {
                    color: 'primary.main',
                    textDecoration: 'none',
                    '&:hover': {
                      textDecoration: 'underline',
                    },
                  },
                  '& img': {
                    maxWidth: '100%',
                    height: 'auto',
                    borderRadius: 2,
                    my: 2,
                  },
                  '& table': {
                    width: '100%',
                    borderCollapse: 'collapse',
                    mb: 3,
                    '& th, & td': {
                      border: '1px solid',
                      borderColor: 'divider',
                      padding: 2,
                      textAlign: 'left',
                    },
                    '& th': {
                      backgroundColor: 'action.hover',
                      fontWeight: 'bold',
                    },
                  },
                }}
               >
                 <MathContent content={renderMarkdownWithMath(article.content)} />
               </Box>
            </Box>
          </Paper>
                               </Box>
            </Box>
                   </motion.div>

         {/* 相关文章 */}
        {relatedArticles.length > 0 && (
          <motion.div variants={itemVariants}>
            <Paper
              elevation={1}
              sx={{
                p: 4,
                backgroundColor: 'background.paper',
              }}
            >
              <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 3 }}>
                相关文章
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                {relatedArticles.map((relatedArticle) => (
                  <Box
                    key={relatedArticle.id}
                    component={Link}
                    to={`${ROUTES.ARTICLES}/${relatedArticle.id}`}
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 2,
                      p: 2,
                      borderRadius: 1,
                      textDecoration: 'none',
                      color: 'inherit',
                      '&:hover': {
                        backgroundColor: 'action.hover',
                      },
                    }}
                  >
                    <Avatar
                      src="/personal-blog/images/projects/head.jpg"
                      sx={{
                        width: 48,
                        height: 48,
                        backgroundColor: 'primary.main',
                      }}
                    >
                      <CategoryIcon />
                    </Avatar>
                    <Box sx={{ flex: 1 }}>
                      <Typography
                        variant="h6"
                        sx={{
                          fontWeight: 'bold',
                          mb: 1,
                          color: 'text.primary',
                        }}
                      >
                        {relatedArticle.title}
                      </Typography>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{
                          display: '-webkit-box',
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: 'vertical',
                          overflow: 'hidden',
                        }}
                      >
                        {relatedArticle.excerpt}
                      </Typography>
                    </Box>
                  </Box>
                ))}
              </Box>
            </Paper>
          </motion.div>
                 )}
       </Container>
       
     </motion.div>
   );
 };

export default ArticleDetail;

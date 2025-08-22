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
import katex from 'katex';
import 'katex/dist/katex.min.css';
import { ROUTES, CATEGORIES } from '../../utils/constants';
import { getArticleById, getAllArticles } from '../../data/articles';
import { incrementArticleView } from '../../utils/viewCounter';

/**
 * 渲染包含数学公式的内容组件 - 使用DOM后处理
 */
const MathContent = ({ content }) => {
  const contentRef = useRef(null);

  useEffect(() => {
    if (contentRef.current) {
      // 在DOM渲染后处理数学公式
      const container = contentRef.current;
      
      // 处理块级数学公式 \\[...\\]
      const blockMathElements = container.querySelectorAll('p, div');
      blockMathElements.forEach((element) => {
        const text = element.textContent;
        const blockMathRegex = /\\\\\[([^\]]+)\\\\\]/g;
        if (blockMathRegex.test(text)) {
          const newText = text.replace(blockMathRegex, (match, formula) => {
            try {
              return katex.renderToString(formula, { displayMode: true });
            } catch (error) {
              console.error('Error rendering block math:', error);
              return `<span style="color: red;">${formula}</span>`;
            }
          });
          element.innerHTML = newText;
        }
      });
      
             // 处理行内数学公式 \\(...\\)
       const inlineMathElements = container.querySelectorAll('p, div, span');
       inlineMathElements.forEach((element) => {
         const text = element.textContent;
         const inlineMathRegex = new RegExp('\\\\\\\\\\(([^)]+)\\\\\\\\\\)', 'g');
         if (inlineMathRegex.test(text)) {
           const newText = text.replace(inlineMathRegex, (match, formula) => {
             try {
               return katex.renderToString(formula, { displayMode: false });
             } catch (error) {
               console.error('Error rendering inline math:', error);
               return `<span style="color: red;">${formula}</span>`;
             }
           });
           element.innerHTML = newText;
         }
       });
    }
  }, [content]);

  return <div ref={contentRef} dangerouslySetInnerHTML={{ __html: content }} />;
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

  // 自定义markdown渲染器，支持数学公式 - 使用DOM后处理
  const renderMarkdownWithMath = (content) => {
    // 直接使用marked渲染markdown，不预处理数学公式
    const htmlContent = marked(content);
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
        
        // 调试：检查数学公式匹配情况
        console.log('Article content length:', article.content.length);
        const blockMathRegex = /\\\\\[([^\]]+)\\\\\]/g;
        const inlineMathRegex = new RegExp('\\\\\\\\\\(([^)]+)\\\\\\\\\\)', 'g');
        const latexBlockMatches = article.content.match(blockMathRegex);
        const latexInlineMatches = article.content.match(inlineMathRegex);
        console.log('LaTeX block matches:', latexBlockMatches);
        console.log('LaTeX inline matches:', latexInlineMatches);
      }, 500);
      
      return () => clearTimeout(timer);
    }
  }, [article?.content]);

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
                mb: 2,
                color: 'text.primary',
                lineHeight: 1.2,
              }}
            >
              {article.title}
            </Typography>

            {/* 文章元信息 */}
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mb: 3, alignItems: 'center' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Avatar
                  src="/personal-blog/images/projects/head.jpg"
                  sx={{ width: 32, height: 32 }}
                >
                  <AuthorIcon />
                </Avatar>
                <Typography variant="body2" color="text.secondary">
                  {article.author}
                </Typography>
              </Box>

              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <DateIcon sx={{ fontSize: '1rem', color: 'text.secondary' }} />
                <Typography variant="body2" color="text.secondary">
                  {article.publishDate}
                </Typography>
              </Box>

              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <ViewIcon sx={{ fontSize: '1rem', color: 'text.secondary' }} />
                <Typography variant="body2" color="text.secondary">
                  {article.readTime} 分钟阅读
                </Typography>
              </Box>

              {category && (
                <Chip
                  icon={<CategoryIcon />}
                  label={category.label}
                  size="small"
                  sx={{
                    backgroundColor: category.color,
                    color: 'white',
                    '& .MuiChip-icon': {
                      color: 'white',
                    },
                  }}
                />
              )}
            </Box>

            {/* 文章标签 */}
            {article.tags && article.tags.length > 0 && (
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 3 }}>
                {article.tags.map((tag, index) => (
                  <Chip
                    key={index}
                    label={tag}
                    size="small"
                    variant="outlined"
                    sx={{ fontSize: '0.75rem' }}
                  />
                ))}
              </Box>
            )}

            {/* 文章摘要 */}
            {article.excerpt && (
              <Typography
                variant="body1"
                color="text.secondary"
                sx={{
                  mb: 3,
                  fontStyle: 'italic',
                  borderLeft: '4px solid',
                  borderColor: 'primary.main',
                  pl: 2,
                }}
              >
                {article.excerpt}
              </Typography>
            )}
          </Paper>
        </motion.div>

        {/* 文章内容 */}
        <motion.div variants={itemVariants}>
          <Paper
            elevation={1}
            sx={{
              p: 4,
              mb: 3,
              backgroundColor: 'background.paper',
            }}
          >
            <Box sx={{ display: 'flex', gap: 4 }}>
              {/* 文章正文 */}
              <Box sx={{ flex: 1 }}>
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
                      },
                      '& ul, & ol': {
                        mb: 2.5,
                        pl: 3,
                      },
                      '& li': {
                        mb: 1,
                      },
                      '& blockquote': {
                        borderLeft: '4px solid',
                        borderColor: 'primary.main',
                        pl: 3,
                        py: 1,
                        my: 3,
                        backgroundColor: 'action.hover',
                        fontStyle: 'italic',
                      },
                      '& code': {
                        backgroundColor: 'action.hover',
                        px: 1,
                        py: 0.5,
                        borderRadius: 1,
                        fontSize: '0.9em',
                        fontFamily: 'monospace',
                      },
                      '& pre': {
                        backgroundColor: 'action.hover',
                        p: 2,
                        borderRadius: 1,
                        overflow: 'auto',
                        mb: 3,
                        '& code': {
                          backgroundColor: 'transparent',
                          p: 0,
                        },
                      },
                      '& img': {
                        maxWidth: '100%',
                        height: 'auto',
                        borderRadius: 1,
                        my: 2,
                      },
                      '& table': {
                        width: '100%',
                        borderCollapse: 'collapse',
                        mb: 3,
                        border: '1px solid',
                        borderColor: 'divider',
                        padding: 2,
                        textAlign: 'left',
                      },
                      '& th': {
                        backgroundColor: 'action.hover',
                        fontWeight: 'bold',
                      },
                    }}
                   >
                     <MathContent content={renderMarkdownWithMath(article.content)} />
                   </Box>
                </Box>
              </Box>

              {/* 目录大纲 */}
              {headings.length > 0 && (
                <Box sx={{ width: 240, flexShrink: 0 }}>
                  <TableOfContents
                    headings={headings}
                    activeId={activeId}
                    onHeadingClick={scrollToHeading}
                  />
                </Box>
              )}
            </Box>
          </Paper>
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

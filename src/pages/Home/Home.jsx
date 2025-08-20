import React, { useState, useEffect } from 'react';
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
  Avatar,
  Paper,
  Divider,
  useTheme,
} from '@mui/material';
import {
  Article as ArticleIcon,
  Code as CodeIcon,
  Person as PersonIcon,
  TrendingUp as TrendingIcon,
  CalendarToday as DateIcon,
  Visibility as ViewIcon,
  GitHub as GitHubIcon,
  Launch as LaunchIcon,
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ROUTES } from '../../utils/constants';
import { getAllArticles, getFeaturedArticles, getLatestArticles } from '../../data/articles';
import { getAllProjects, getFeaturedProjects, getProjectStats } from '../../data/projects';
import { getAllSkills } from '../../data/skills';



/**
 * 首页组件
 */
const Home = () => {
  const theme = useTheme();
  const [articles] = useState(getAllArticles());
  const [featuredArticles] = useState(getFeaturedArticles());
  const [latestArticles] = useState(getLatestArticles(3));
  const [projects] = useState(getAllProjects());
  const [featuredProjects] = useState(getFeaturedProjects());
  const [skills] = useState(getAllSkills());
  const [projectStats] = useState(getProjectStats());

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

  // 个人介绍部分
  const HeroSection = () => (
    <Box
      sx={{
        color: theme.palette.mode === 'dark' ? '#ffffff' : '#1a1a1a',
        py: 8,
        mb: 6,
        borderRadius: 3,
        position: 'relative',
        overflow: 'hidden',
        border: `2px solid ${theme.palette.mode === 'dark' ? '#1e3a8a' : '#3b82f6'}`,
        boxShadow: theme.palette.mode === 'dark' 
          ? '0 8px 32px rgba(30, 58, 138, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)' 
          : '0 8px 32px rgba(59, 130, 246, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.8)',
        // 添加背景图片
        backgroundImage: `url('/personal-blog/images/projects/bg.jpg')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: theme.palette.mode === 'dark' 
            ? 'linear-gradient(135deg, rgba(0, 0, 0, 0.4) 0%, rgba(0, 0, 0, 0.3) 50%, rgba(0, 0, 0, 0.2) 100%)' 
            : 'linear-gradient(135deg, rgba(255, 255, 255, 0.7) 0%, rgba(255, 255, 255, 0.5) 50%, rgba(255, 255, 255, 0.3) 100%)',
          zIndex: 1,
        },
        '&::after': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '2px',
          background: theme.palette.mode === 'dark' 
            ? 'linear-gradient(90deg, #3b82f6, #06b6d4, #3b82f6)' 
            : 'linear-gradient(90deg, #3b82f6, #06b6d4, #3b82f6)',
          zIndex: 2,
        },
      }}
    >
      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 3 }}>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
            <motion.div variants={itemVariants}>
              <Avatar
                src="/personal-blog/images/projects/head.jpg"
                sx={{
                  width: 120,
                  height: 120,
                  fontSize: '3rem',
                  backgroundColor: theme.palette.mode === 'dark' ? '#1e3a8a' : '#3b82f6',
                  border: `4px solid ${theme.palette.mode === 'dark' ? '#06b6d4' : '#06b6d4'}`,
                  mr: 3,
                  color: 'white',
                  boxShadow: theme.palette.mode === 'dark' 
                    ? '0 4px 20px rgba(6, 182, 212, 0.4)' 
                    : '0 4px 20px rgba(59, 130, 246, 0.3)',
                  // 添加旋转动画效果
                  animation: 'rotate 20s linear infinite',
                  transformOrigin: 'center center',
                  '&:hover': {
                    animation: 'rotate 2s linear infinite',
                    transform: 'scale(1.05)',
                    boxShadow: theme.palette.mode === 'dark' 
                      ? '0 8px 30px rgba(6, 182, 212, 0.6)' 
                      : '0 8px 30px rgba(59, 130, 246, 0.5)',
                  },
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: '-2px',
                    left: '-2px',
                    right: '-2px',
                    bottom: '-2px',
                    background: 'linear-gradient(45deg, #3b82f6, #06b6d4, #3b82f6)',
                    borderRadius: '50%',
                    zIndex: -1,
                    opacity: 0.3,
                  },
                  '@keyframes rotate': {
                    '0%': {
                      transform: 'rotate(0deg)',
                    },
                    '100%': {
                      transform: 'rotate(360deg)',
                    },
                  },
                }}
              >
                <PersonIcon sx={{ fontSize: '3rem' }} />
              </Avatar>
            </motion.div>
            <Box>
              <motion.div variants={itemVariants}>
                <Typography 
                  variant="h2" 
                  sx={{ 
                    fontWeight: 'bold', 
                    mb: 1,
                    background: theme.palette.mode === 'dark' 
                      ? 'linear-gradient(135deg, #ffffff 0%, #06b6d4 50%, #3b82f6 100%)' 
                      : 'linear-gradient(135deg, #1a1a1a 0%, #3b82f6 50%, #06b6d4 100%)',
                    backgroundClip: 'text',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    textShadow: theme.palette.mode === 'dark' 
                      ? '0 2px 10px rgba(6, 182, 212, 0.3)' 
                      : '0 2px 10px rgba(59, 130, 246, 0.3)',
                    letterSpacing: '0.02em',
                    position: 'relative',
                    '&::after': {
                      content: '""',
                      position: 'absolute',
                      bottom: '-8px',
                      left: 0,
                      width: '60px',
                      height: '3px',
                      background: 'linear-gradient(90deg, #3b82f6, #06b6d4)',
                      borderRadius: '2px',
                    }
                  }}
                >
                  欢迎来到我的博客
                </Typography>
              </motion.div>
              <motion.div variants={itemVariants}>
                <Typography 
                  variant="h5" 
                  sx={{ 
                    opacity: 0.95, 
                    mb: 2,
                    fontWeight: 500,
                    color: theme.palette.mode === 'dark' ? '#e2e8f0' : '#374151',
                    textShadow: theme.palette.mode === 'dark' 
                      ? '0 1px 3px rgba(0, 0, 0, 0.5)' 
                      : '0 1px 3px rgba(255, 255, 255, 0.8)',
                    letterSpacing: '0.01em',
                    fontStyle: 'italic'
                  }}
                >
                  数值计算工程师 / 深度学习研究者 / 技术cty
                </Typography>
              </motion.div>
              <motion.div variants={itemVariants}>
                <Typography 
                  variant="body1" 
                  sx={{ 
                    opacity: 0.9, 
                    maxWidth: 600,
                    lineHeight: 1.8,
                    color: theme.palette.mode === 'dark' ? '#cbd5e1' : '#4b5563',
                    textShadow: theme.palette.mode === 'dark' 
                      ? '0 1px 2px rgba(0, 0, 0, 0.3)' 
                      : '0 1px 2px rgba(255, 255, 255, 0.6)',
                    fontWeight: 400,
                    letterSpacing: '0.005em'
                  }}
                >
                  专注于数值计算、流体仿真和深度学习技术，热爱分享技术见解和研究成果。
                  在这里，我会记录我的技术成长历程，分享MATLAB、Fluent和深度学习相关的实用技巧和项目经验。
                </Typography>
              </motion.div>
            </Box>
          </Box>
          
          <motion.div variants={itemVariants}>
            <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
              <Button
                component={Link}
                to={ROUTES.ARTICLES}
                variant="contained"
                size="large"
                sx={{
                  background: theme.palette.mode === 'dark' 
                    ? 'linear-gradient(135deg, #1e3a8a 0%, #3b82f6 50%, #06b6d4 100%)' 
                    : 'linear-gradient(135deg, #3b82f6 0%, #06b6d4 50%, #0891b2 100%)',
                  color: 'white',
                  border: 'none',
                  boxShadow: theme.palette.mode === 'dark' 
                    ? '0 4px 15px rgba(6, 182, 212, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.2)' 
                    : '0 4px 15px rgba(59, 130, 246, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.3)',
                  textShadow: '0 1px 2px rgba(0, 0, 0, 0.3)',
                  fontWeight: 600,
                  letterSpacing: '0.02em',
                  '&:hover': {
                    background: theme.palette.mode === 'dark' 
                      ? 'linear-gradient(135deg, #1e40af 0%, #2563eb 50%, #0891b2 100%)' 
                      : 'linear-gradient(135deg, #2563eb 0%, #0891b2 50%, #0e7490 100%)',
                    color: 'white',
                    boxShadow: theme.palette.mode === 'dark' 
                      ? '0 8px 25px rgba(6, 182, 212, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.3)' 
                      : '0 8px 25px rgba(59, 130, 246, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.4)',
                    transform: 'translateY(-3px) scale(1.02)',
                  },
                  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                  position: 'relative',
                  overflow: 'hidden',
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: '-100%',
                    width: '100%',
                    height: '100%',
                    background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent)',
                    transition: 'left 0.5s',
                  },
                  '&:hover::before': {
                    left: '100%',
                  },
                }}
                startIcon={<ArticleIcon />}
              >
                浏览文章
              </Button>
              <Button
                component={Link}
                to={ROUTES.ABOUT}
                variant="outlined"
                size="large"
                sx={{
                  borderColor: theme.palette.mode === 'dark' ? '#06b6d4' : '#06b6d4',
                  color: theme.palette.mode === 'dark' ? '#06b6d4' : '#06b6d4',
                  borderWidth: '2px',
                  background: theme.palette.mode === 'dark' 
                    ? 'rgba(6, 182, 212, 0.05)' 
                    : 'rgba(6, 182, 212, 0.05)',
                  backdropFilter: 'blur(10px)',
                  fontWeight: 600,
                  letterSpacing: '0.02em',
                  textShadow: theme.palette.mode === 'dark' 
                    ? '0 1px 2px rgba(0, 0, 0, 0.3)' 
                    : '0 1px 2px rgba(255, 255, 255, 0.8)',
                  '&:hover': {
                    borderColor: theme.palette.mode === 'dark' ? '#0891b2' : '#0891b2',
                    background: theme.palette.mode === 'dark' 
                      ? 'linear-gradient(135deg, rgba(6, 182, 212, 0.2) 0%, rgba(8, 145, 178, 0.3) 100%)' 
                      : 'linear-gradient(135deg, rgba(6, 182, 212, 0.2) 0%, rgba(8, 145, 178, 0.3) 100%)',
                    color: theme.palette.mode === 'dark' ? '#ffffff' : '#1a1a1a',
                    boxShadow: theme.palette.mode === 'dark' 
                      ? '0 6px 20px rgba(6, 182, 212, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.1)' 
                      : '0 6px 20px rgba(6, 182, 212, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
                    transform: 'translateY(-3px) scale(1.02)',
                  },
                  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                  position: 'relative',
                  overflow: 'hidden',
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: '-100%',
                    width: '100%',
                    height: '100%',
                    background: 'linear-gradient(90deg, transparent, rgba(6, 182, 212, 0.1), transparent)',
                    transition: 'left 0.5s',
                  },
                  '&:hover::before': {
                    left: '100%',
                  },
                }}
                startIcon={<PersonIcon />}
              >
                了解更多
              </Button>
            </Box>
          </motion.div>
        </motion.div>
      </Container>
    </Box>
  );

  // 技能展示部分
  const SkillsSection = () => (
    <Box sx={{ mb: 6 }}>
      <motion.div
        variants={itemVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <Typography variant="h4" sx={{ mb: 3, fontWeight: 'bold', textAlign: 'center' }}>
          专业技能
        </Typography>
      </motion.div>
      
      <Box sx={{ 
        display: 'flex', 
        flexWrap: 'wrap', 
        gap: 2, 
        justifyContent: 'center',
        maxWidth: '800px',
        mx: 'auto'
      }}>
        {skills && skills.map((skill, index) => (
          <motion.div
            key={skill.id}
            variants={itemVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
          >
            <Card
              sx={{
                width: { xs: '140px', sm: '160px' },
                height: { xs: '140px', sm: '160px' },
                borderRadius: 3,
                background: skill.color.background,
                backdropFilter: 'blur(8px)',
                border: `1px solid ${skill.color.border}`,
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                cursor: 'pointer',
                position: 'relative',
                overflow: 'hidden',
                '&:hover': {
                  transform: 'translateY(-4px) scale(1.05)',
                  boxShadow: `0 8px 25px ${skill.color.hover}`,
                  borderColor: skill.color.primary,
                  background: skill.color.hover,
                  '& .skill-icon': {
                    transform: 'scale(1.1) rotate(5deg)',
                    color: skill.color.primary,
                  },
                  '& .skill-name': {
                    color: skill.color.primary,
                  },
                },
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  top: 0,
                  left: '-100%',
                  width: '100%',
                  height: '100%',
                  background: `linear-gradient(90deg, transparent, ${skill.color.hover}, transparent)`,
                  transition: 'left 0.6s',
                },
                '&:hover::before': {
                  left: '100%',
                },
              }}
            >
              <CardContent sx={{ 
                textAlign: 'center', 
                p: 2,
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center'
              }}>
                <Box 
                  className="skill-icon"
                  sx={{ 
                    mb: 1,
                    transition: 'transform 0.3s ease',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: { xs: '3rem', sm: '3.5rem' },
                    height: { xs: '3rem', sm: '3.5rem' }
                  }}
                >
                  <img 
                    src={skill.icon} 
                    alt={skill.name}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'contain',
                      filter: theme.palette.mode === 'dark' 
                        ? 'brightness(1.1) contrast(1.05) saturate(1.1)' 
                        : 'brightness(1.05) contrast(1.02) saturate(1.05)',
                      transition: 'filter 0.3s ease'
                    }}
                  />
                </Box>
                <Typography 
                  className="skill-name"
                  variant="body2" 
                  sx={{ 
                    fontWeight: 600,
                    fontSize: { xs: '0.75rem', sm: '0.875rem' },
                    lineHeight: 1.2,
                    transition: 'color 0.3s ease',
                    color: theme.palette.mode === 'dark' ? '#cbd5e1' : '#4b5563'
                  }}
                >
                  {skill.name}
                </Typography>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </Box>
      
      {/* 技能标签展示 */}
      <motion.div
        variants={itemVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        transition={{ delay: 0.6 }}
      >
        <Box sx={{ 
          mt: 3, 
          display: 'flex', 
          flexWrap: 'wrap', 
          gap: 1, 
          justifyContent: 'center',
          maxWidth: '600px',
          mx: 'auto'
        }}>
          {skills && skills.map((skill, skillIndex) => 
            skill.tags && skill.tags.slice(0, 2).map((tag, tagIndex) => (
              <Chip
                key={`${skill.id}-${tag}`}
                label={tag}
                size="small"
                sx={{
                  background: skill.color.background,
                  border: `1px solid ${skill.color.border}`,
                  color: skill.color.primary,
                  fontWeight: 500,
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    background: skill.color.hover,
                    transform: 'scale(1.05)',
                    boxShadow: `0 2px 8px ${skill.color.hover}`,
                  }
                }}
              />
            ))
          ).flat()}
        </Box>
      </motion.div>
    </Box>
  );

  // 最新文章部分
  const LatestArticlesSection = () => (
    <Box sx={{ mb: 6 }}>
      <motion.div
        variants={itemVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
          <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
            最新文章
          </Typography>
          <Button
            component={Link}
            to={ROUTES.ARTICLES}
            variant="outlined"
            endIcon={<LaunchIcon />}
          >
            查看全部
          </Button>
        </Box>
      </motion.div>

      <Grid container spacing={3} columns={12}>
        {latestArticles && latestArticles.map((article, index) => (
          <Grid xs={12} md={4} key={article.id} sx={{ width: '100%' }}>
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
                  minHeight: '400px',
                  width: '100%',
                  border: 'none',
                  textDecoration: 'none',
                  transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
                  '&:hover': {
                    transform: 'translateY(-4px)',
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
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                    <Chip
                      label={article.category}
                      size="small"
                      color="primary"
                      variant="outlined"
                    />
                    <Box sx={{ flex: 1 }} />
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                      <ViewIcon sx={{ fontSize: 16 }} />
                      <Typography variant="caption" color="text.secondary">
                        {article.views}
                      </Typography>
                    </Box>
                  </Box>
                  
                  <Typography variant="h6" sx={{ mb: 1, fontWeight: 'bold', color: 'text.primary' }}>
                    {article.title}
                  </Typography>
                  
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    {article.excerpt}
                  </Typography>
                  
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <DateIcon sx={{ fontSize: 16, color: 'text.secondary' }} />
                    <Typography variant="caption" color="text.secondary">
                      {new Date(article.publishDate).toLocaleDateString()}
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </motion.div>
          </Grid>
        ))}
      </Grid>
    </Box>
  );

  // 项目展示部分
  const ProjectsSection = () => (
    <Box sx={{ mb: 6 }}>
      <motion.div
        variants={itemVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <Typography variant="h4" sx={{ mb: 4, fontWeight: 'bold', textAlign: 'center' }}>
          精选项目
        </Typography>
      </motion.div>

      <Grid container spacing={3} columns={12}>
        {featuredProjects && featuredProjects.slice(0, 1).map((project, index) => (
          <Grid xs={12} md={12} key={project.id} sx={{ width: '100%' }}>
            <motion.div
              variants={itemVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Card
                sx={{
                  height: '100%',
                  minHeight: '400px',
                  width: '100%',
                  border: 'none',
                  transition: 'transform 0.3s ease-in-out',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                  },
                }}
              >
                {project.image ? (
                  <CardMedia
                    component="img"
                    height="200"
                    image={project.image}
                    alt={project.title}
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
                    <CodeIcon sx={{ fontSize: '3rem', color: 'text.secondary' }} />
                  </Box>
                )}
                <CardContent>
                  <Typography variant="h6" sx={{ mb: 1, fontWeight: 'bold' }}>
                    {project.title}
                  </Typography>
                  
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    {project.description}
                  </Typography>
                  
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
                    {project.technologies && project.technologies.slice(0, 4).map((tech) => (
                      <Chip
                        key={tech}
                        label={tech}
                        size="small"
                        variant="outlined"
                      />
                    ))}
                  </Box>
                  
                                     <Box sx={{ display: 'flex', gap: 1 }}>
                     {project.githubUrl && (
                       <Button
                         component="a"
                         href={project.githubUrl}
                         target="_blank"
                         rel="noopener noreferrer"
                         size="small"
                         startIcon={<GitHubIcon />}
                         variant="outlined"
                       >
                         GitHub
                       </Button>
                     )}
                     {project.liveUrl && (
                       <Button
                         component="a"
                         href={project.liveUrl}
                         target="_blank"
                         rel="noopener noreferrer"
                         size="small"
                         startIcon={<LaunchIcon />}
                         variant="contained"
                       >
                         演示
                       </Button>
                     )}
                   </Box>
                </CardContent>
              </Card>
            </motion.div>
          </Grid>
        ))}
      </Grid>
    </Box>
  );

  // 统计信息部分
  const StatsSection = () => (
    <Box sx={{ mb: 6 }}>
      <motion.div
        variants={itemVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <Paper
          sx={{
            p: 4,
            background: `linear-gradient(135deg, ${theme.palette.background.paper} 0%, ${theme.palette.action.hover} 100%)`,
            borderRadius: 3,
          }}
        >
                               <Grid container spacing={4} columns={12} sx={{ textAlign: 'center' }}>
            <Grid xs={6} md={3}>
              <motion.div
                variants={itemVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                <Box sx={{ mb: 2 }}>
                  <ArticleIcon sx={{ fontSize: '3rem', color: 'primary.main' }} />
                </Box>
                <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 1 }}>
                  {articles.length}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  发布文章
                </Typography>
              </motion.div>
            </Grid>
            
            <Grid xs={6} md={3}>
              <motion.div
                variants={itemVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
              >
                <Box sx={{ mb: 2 }}>
                  <CodeIcon sx={{ fontSize: '3rem', color: 'secondary.main' }} />
                </Box>
                <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 1 }}>
                  {projectStats.total}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  所有项目
                </Typography>
              </motion.div>
            </Grid>
            
            <Grid xs={6} md={3}>
              <motion.div
                variants={itemVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
              >
                <Box sx={{ mb: 2 }}>
                  <TrendingIcon sx={{ fontSize: '3rem', color: 'success.main' }} />
                </Box>
                <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 1 }}>
                  {skills.length}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  专业技能
                </Typography>
              </motion.div>
            </Grid>
            
            <Grid xs={6} md={3}>
              <motion.div
                variants={itemVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
              >
                <Box sx={{ mb: 2 }}>
                  <PersonIcon sx={{ fontSize: '3rem', color: 'info.main' }} />
                </Box>
                <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 1 }}>
                  3+
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  年研究经验
                </Typography>
              </motion.div>
            </Grid>
          </Grid>
        </Paper>
      </motion.div>
    </Box>
  );

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <Container maxWidth="lg">
        <HeroSection />
        <SkillsSection />
        <LatestArticlesSection />
        <ProjectsSection />
        <StatsSection />
      </Container>
    </motion.div>
  );
};

export default Home;

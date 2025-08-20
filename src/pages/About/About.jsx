import React from 'react';
import {
  Box,
  Container,
  Typography,
  Paper,
  Avatar,
  Grid,
  Card,
  CardContent,
  Chip,
  useTheme,
} from '@mui/material';
import {
  Person as PersonIcon,
  School as SchoolIcon,
  Work as WorkIcon,
  Star as StarIcon,
  Code as CodeIcon,
  Psychology as PsychologyIcon,
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import { getAllSkills } from '../../data/skills';

/**
 * 关于页面
 */
const About = () => {
  const theme = useTheme();

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

  // 个人经历时间轴数据
  const timelineData = [
    {
      year: '2024',
      title: '深度学习研究',
      description: '专注于计算机视觉和自然语言处理技术研究',
      icon: <PsychologyIcon />,
    },
    {
      year: '2023',
      title: '数值计算工程师',
      description: '从事MATLAB和Fluent仿真分析工作',
      icon: <CodeIcon />,
    },
    {
      year: '2022',
      title: '技术博客写作',
      description: '开始分享技术见解和项目经验',
      icon: <StarIcon />,
    },
    {
      year: '2021',
      title: '学术研究',
      description: '参与多个科研项目，发表学术论文',
      icon: <SchoolIcon />,
    },
  ];

  // 获取技能数据
  const skills = getAllSkills();

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      style={{
        background: theme.palette.mode === 'dark' 
          ? 'linear-gradient(135deg, rgba(0, 0, 0, 0.02) 0%, rgba(30, 58, 138, 0.03) 50%, rgba(6, 182, 212, 0.02) 100%)' 
          : 'linear-gradient(135deg, rgba(255, 255, 255, 0.8) 0%, rgba(59, 130, 246, 0.02) 50%, rgba(6, 182, 212, 0.01) 100%)',
        minHeight: '100vh',
        padding: '20px 0',
      }}
    >
      <Container maxWidth="lg">
        {/* 页面标题 */}
        <motion.div variants={itemVariants}>
          <Box sx={{ textAlign: 'center', mb: 4, pt: 2 }}>
            <Typography 
              variant="h3" 
              sx={{ 
                fontWeight: 'bold', 
                mb: 2,
                color: 'text.primary',
              }}
            >
              关于我
            </Typography>
            <Typography 
              variant="h6" 
              sx={{
                background: theme.palette.mode === 'dark' 
                  ? 'linear-gradient(135deg, #06b6d4 0%, #3b82f6 100%)' 
                  : 'linear-gradient(135deg, #3b82f6 0%, #06b6d4 100%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                fontWeight: 600,
              }}
            >
              数值计算工程师 / 深度学习研究者 / 技术博主
            </Typography>
          </Box>
        </motion.div>

        {/* 个人介绍 */}
        <motion.div variants={itemVariants}>
          <Paper
            elevation={0}
            sx={{
              p: 3,
              mb: 3,
              background: theme.palette.mode === 'dark' 
                ? 'linear-gradient(135deg, rgba(0, 0, 0, 0.3) 0%, rgba(30, 58, 138, 0.1) 50%, rgba(6, 182, 212, 0.05) 100%)' 
                : 'linear-gradient(135deg, rgba(255, 255, 255, 0.8) 0%, rgba(59, 130, 246, 0.05) 50%, rgba(6, 182, 212, 0.03) 100%)',
              backdropFilter: 'blur(8px)',
              border: `1px solid ${theme.palette.mode === 'dark' ? 'rgba(6, 182, 212, 0.1)' : 'rgba(6, 182, 212, 0.05)'}`,
              borderRadius: 2,
              transition: 'all 0.3s ease',
              '&:hover': {
                borderColor: theme.palette.mode === 'dark' ? 'rgba(6, 182, 212, 0.2)' : 'rgba(6, 182, 212, 0.1)',
                boxShadow: theme.palette.mode === 'dark' 
                  ? '0 4px 15px rgba(6, 182, 212, 0.1)' 
                  : '0 4px 15px rgba(59, 130, 246, 0.1)',
              },
            }}
          >
            <Grid container spacing={4} alignItems="center">
              <Grid item xs={12} md={4}>
                <Box sx={{ textAlign: 'center' }}>
                  <Avatar
                    src="/personal-blog/images/projects/head.jpg"
                    sx={{
                      width: 200,
                      height: 200,
                      mx: 'auto',
                      mb: 2,
                      background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
                    }}
                  >
                    <PersonIcon sx={{ fontSize: 100 }} />
                  </Avatar>
                                     <Typography 
                     variant="h5" 
                     sx={{ 
                       fontWeight: 'bold', 
                       mb: 1,
                       background: theme.palette.mode === 'dark' 
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
                     sx={{
                       color: theme.palette.mode === 'dark' ? '#cbd5e1' : '#4b5563',
                       fontWeight: 500,
                     }}
                   >
                     热爱技术，专注创新
                   </Typography>
                </Box>
              </Grid>
              <Grid item xs={12} md={8}>
                                 <Typography 
                   variant="h6" 
                   sx={{ 
                     fontWeight: 'bold', 
                     mb: 2,
                     background: theme.palette.mode === 'dark' 
                       ? 'linear-gradient(135deg, #06b6d4 0%, #3b82f6 100%)' 
                       : 'linear-gradient(135deg, #3b82f6 0%, #06b6d4 100%)',
                     backgroundClip: 'text',
                     WebkitBackgroundClip: 'text',
                     WebkitTextFillColor: 'transparent',
                   }}
                 >
                   个人简介
                 </Typography>
                 <Typography variant="body1" sx={{ mb: 2, lineHeight: 1.8 }}>
                   我是一名专注于<Box component="span" sx={{ color: theme.palette.mode === 'dark' ? '#06b6d4' : '#3b82f6', fontWeight: 600 }}>数值计算</Box>和<Box component="span" sx={{ color: theme.palette.mode === 'dark' ? '#8b5cf6' : '#7c3aed', fontWeight: 600 }}>深度学习</Box>的技术研究者，拥有丰富的工程仿真和机器学习项目经验。
                   在<Box component="span" sx={{ color: theme.palette.mode === 'dark' ? '#06b6d4' : '#3b82f6', fontWeight: 600 }}>MATLAB</Box>、<Box component="span" sx={{ color: theme.palette.mode === 'dark' ? '#06b6d4' : '#3b82f6', fontWeight: 600 }}>Fluent</Box>等数值计算工具方面有深入的研究，同时在深度学习领域也有扎实的理论基础和实践经验。
                 </Typography>
                 <Typography variant="body1" sx={{ mb: 2, lineHeight: 1.8 }}>
                   我热衷于分享技术见解和项目经验，通过博客记录技术成长历程，希望能与更多志同道合的技术爱好者交流学习。
                   在这里，我会分享<Box component="span" sx={{ color: theme.palette.mode === 'dark' ? '#06b6d4' : '#3b82f6', fontWeight: 600 }}>MATLAB</Box>、<Box component="span" sx={{ color: theme.palette.mode === 'dark' ? '#06b6d4' : '#3b82f6', fontWeight: 600 }}>Fluent</Box>和<Box component="span" sx={{ color: theme.palette.mode === 'dark' ? '#8b5cf6' : '#7c3aed', fontWeight: 600 }}>深度学习</Box>相关的实用技巧和项目经验。
                 </Typography>
                 <Typography variant="body1" sx={{ lineHeight: 1.8 }}>
                   除了技术研究，我也关注前沿科技发展，积极参与开源项目，致力于推动技术创新和知识传播。
                 </Typography>
              </Grid>
            </Grid>
          </Paper>
        </motion.div>

        {/* 专业技能 */}
        <motion.div variants={itemVariants}>
          <Paper
            elevation={0}
            sx={{
              p: 3,
              mb: 3,
              background: theme.palette.mode === 'dark' 
                ? 'linear-gradient(135deg, rgba(0, 0, 0, 0.3) 0%, rgba(30, 58, 138, 0.1) 50%, rgba(6, 182, 212, 0.05) 100%)' 
                : 'linear-gradient(135deg, rgba(255, 255, 255, 0.8) 0%, rgba(59, 130, 246, 0.05) 50%, rgba(6, 182, 212, 0.03) 100%)',
              backdropFilter: 'blur(8px)',
              border: `1px solid ${theme.palette.mode === 'dark' ? 'rgba(6, 182, 212, 0.1)' : 'rgba(6, 182, 212, 0.05)'}`,
              borderRadius: 2,
              transition: 'all 0.3s ease',
              '&:hover': {
                borderColor: theme.palette.mode === 'dark' ? 'rgba(6, 182, 212, 0.2)' : 'rgba(6, 182, 212, 0.1)',
                boxShadow: theme.palette.mode === 'dark' 
                  ? '0 4px 15px rgba(6, 182, 212, 0.1)' 
                  : '0 4px 15px rgba(59, 130, 246, 0.1)',
              },
            }}
          >
            <Typography 
              variant="h5" 
              sx={{ 
                fontWeight: 'bold', 
                mb: 3,
                color: 'text.primary',
              }}
            >
              专业技能
            </Typography>
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
                   initial={{ opacity: 0, y: 20 }}
                   animate={{ opacity: 1, y: 0 }}
                   transition={{ duration: 0.6, delay: index * 0.1 }}
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
          </Paper>
        </motion.div>

                                   {/* 经历时间轴 */}
          <motion.div variants={itemVariants}>
                      <Paper
             elevation={0}
             sx={{
               p: 3,
               background: theme.palette.mode === 'dark' 
                 ? 'linear-gradient(135deg, rgba(0, 0, 0, 0.3) 0%, rgba(30, 58, 138, 0.1) 50%, rgba(6, 182, 212, 0.05) 100%)' 
                 : 'linear-gradient(135deg, rgba(255, 255, 255, 0.8) 0%, rgba(59, 130, 246, 0.05) 50%, rgba(6, 182, 212, 0.03) 100%)',
               backdropFilter: 'blur(8px)',
               border: `1px solid ${theme.palette.mode === 'dark' ? 'rgba(6, 182, 212, 0.1)' : 'rgba(6, 182, 212, 0.05)'}`,
               borderRadius: 2,
               transition: 'all 0.3s ease',
               '&:hover': {
                 borderColor: theme.palette.mode === 'dark' ? 'rgba(6, 182, 212, 0.2)' : 'rgba(6, 182, 212, 0.1)',
                 boxShadow: theme.palette.mode === 'dark' 
                   ? '0 4px 15px rgba(6, 182, 212, 0.1)' 
                   : '0 4px 15px rgba(59, 130, 246, 0.1)',
               },
             }}
           >
              <Typography 
                variant="h5" 
                sx={{ 
                  fontWeight: 'bold', 
                  mb: 3,
                  color: 'text.primary',
                }}
              >
                经历时间轴
              </Typography>
                           <Box sx={{ position: 'relative' }}>
                {/* 时间轴中心线 */}
                <Box
                  sx={{
                    position: 'absolute',
                    left: '50%',
                    top: 0,
                    bottom: 0,
                    width: 3,
                    background: theme.palette.mode === 'dark' 
                      ? 'linear-gradient(180deg, #06b6d4 0%, #3b82f6 50%, #8b5cf6 100%)' 
                      : 'linear-gradient(180deg, #3b82f6 0%, #06b6d4 50%, #8b5cf6 100%)',
                    transform: 'translateX(-50%)',
                    zIndex: 1,
                    borderRadius: 2,
                  }}
                />
               
               {/* 时间轴项目 */}
               {timelineData.map((item, index) => (
                 <motion.div
                   key={index}
                   initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                   animate={{ opacity: 1, x: 0 }}
                   transition={{ duration: 0.6, delay: index * 0.2 }}
                 >
                                       <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        mb: 6,
                        position: 'relative',
                        flexDirection: index % 2 === 0 ? 'row' : 'row-reverse',
                      }}
                    >
                                           {/* 时间轴点 */}
                      <Box
                        sx={{
                          position: 'absolute',
                          left: '50%',
                          transform: 'translateX(-50%)',
                          width: 24,
                          height: 24,
                          borderRadius: '50%',
                          background: theme.palette.mode === 'dark' 
                            ? 'linear-gradient(135deg, #06b6d4 0%, #3b82f6 100%)' 
                            : 'linear-gradient(135deg, #3b82f6 0%, #06b6d4 100%)',
                          border: `3px solid ${theme.palette.mode === 'dark' ? 'rgba(0, 0, 0, 0.3)' : 'rgba(255, 255, 255, 0.9)'}`,
                          zIndex: 3,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: 'white',
                          boxShadow: theme.palette.mode === 'dark' 
                            ? '0 4px 15px rgba(6, 182, 212, 0.3)' 
                            : '0 4px 15px rgba(59, 130, 246, 0.2)',
                          transition: 'all 0.3s ease',
                          '&:hover': {
                            transform: 'translateX(-50%) scale(1.1)',
                            boxShadow: theme.palette.mode === 'dark' 
                              ? '0 6px 20px rgba(6, 182, 212, 0.4)' 
                              : '0 6px 20px rgba(59, 130, 246, 0.3)',
                          },
                        }}
                      >
                        <Box sx={{ fontSize: '0.9rem' }}>
                          {item.icon}
                        </Box>
                      </Box>
                     
                     {/* 内容卡片 */}
                     <Box
                       sx={{
                         width: '45%',
                         ml: index % 2 === 0 ? 0 : 'auto',
                         mr: index % 2 === 0 ? 'auto' : 0,
                       }}
                     >
                                               <Paper
                          elevation={0}
                          sx={{
                            p: 3,
                            background: theme.palette.mode === 'dark' 
                              ? 'rgba(0, 0, 0, 0.2)' 
                              : 'rgba(255, 255, 255, 0.8)',
                            backdropFilter: 'blur(8px)',
                            border: `1px solid ${theme.palette.mode === 'dark' ? 'rgba(6, 182, 212, 0.1)' : 'rgba(6, 182, 212, 0.05)'}`,
                            borderRadius: 2,
                            transition: 'all 0.3s ease',
                            position: 'relative',
                            '&:hover': {
                              borderColor: theme.palette.mode === 'dark' ? 'rgba(6, 182, 212, 0.2)' : 'rgba(6, 182, 212, 0.1)',
                              boxShadow: theme.palette.mode === 'dark' 
                                ? '0 4px 15px rgba(6, 182, 212, 0.15)' 
                                : '0 4px 15px rgba(59, 130, 246, 0.1)',
                              transform: index % 2 === 0 ? 'translateX(-5px)' : 'translateX(5px)',
                            },
                            '&::after': {
                              content: '""',
                              position: 'absolute',
                              [index % 2 === 0 ? 'right' : 'left']: -8,
                              top: '50%',
                              transform: 'translateY(-50%)',
                              width: 0,
                              height: 0,
                              borderTop: '8px solid transparent',
                              borderBottom: '8px solid transparent',
                              [index % 2 === 0 ? 'borderLeft' : 'borderRight']: `8px solid ${theme.palette.mode === 'dark' ? 'rgba(0, 0, 0, 0.2)' : 'rgba(255, 255, 255, 0.8)'}`,
                            },
                          }}
                        >
                                                   <Typography 
                            variant="h6" 
                            component="span" 
                            sx={{ 
                              fontWeight: 'bold', 
                              color: theme.palette.mode === 'dark' ? '#06b6d4' : '#3b82f6',
                              fontSize: '0.9rem',
                            }}
                          >
                            {item.year}
                          </Typography>
                          <Typography 
                            variant="h6" 
                            sx={{ 
                              fontWeight: 'bold', 
                              mb: 1, 
                              mt: 1,
                              color: theme.palette.mode === 'dark' ? '#e2e8f0' : '#1f2937',
                            }}
                          >
                            {item.title}
                          </Typography>
                          <Typography 
                            variant="body2" 
                            sx={{
                              color: theme.palette.mode === 'dark' ? '#cbd5e1' : '#4b5563',
                              lineHeight: 1.6,
                            }}
                          >
                            {item.description}
                          </Typography>
                       </Paper>
                     </Box>
                   </Box>
                 </motion.div>
               ))}
             </Box>
           </Paper>
         </motion.div>
      </Container>
    </motion.div>
  );
};

export default About;

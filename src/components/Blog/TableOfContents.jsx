import React from 'react';
import {
  Box,
  Typography,
  useTheme,
  Paper,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Collapse,
  IconButton,
} from '@mui/material';
import {
  ExpandLess as ExpandLessIcon,
  ExpandMore as ExpandMoreIcon,
  List as ListIcon,
} from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * 美观紧凑的目录组件
 * @param {Object} props - 组件属性
 * @param {Array} props.headings - 标题数组
 * @param {string} props.activeId - 当前激活的标题ID
 * @param {Function} props.onHeadingClick - 点击标题的回调函数
 */
const TableOfContents = ({ headings, activeId, onHeadingClick }) => {
  const theme = useTheme();
  const [isExpanded, setIsExpanded] = React.useState(false);

  if (!headings || headings.length === 0) {
    return null;
  }

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Paper
        elevation={2}
        sx={{
          position: 'fixed',
          top: '50%',
          right: 20,
          transform: 'translateY(-50%)',
          width: 280,
          maxHeight: '70vh',
          backgroundColor: 'background.paper',
          borderRadius: 2,
          border: '1px solid',
          borderColor: 'divider',
          overflow: 'hidden',
          zIndex: 1000,
          boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
        }}
      >
        {/* 标题栏 */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            p: 2,
            backgroundColor: theme.palette.mode === 'dark' 
              ? 'rgba(74, 222, 128, 0.1)' 
              : 'rgba(74, 222, 128, 0.05)',
            borderBottom: '1px solid',
            borderColor: 'divider',
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <ListIcon sx={{ color: '#4ade80', fontSize: '1.2rem' }} />
            <Typography
              variant="subtitle1"
              sx={{
                fontWeight: 600,
                color: '#4ade80',
                fontSize: '0.95rem',
              }}
            >
              目录
            </Typography>
          </Box>
          <IconButton
            size="small"
            onClick={toggleExpanded}
            sx={{
              color: 'text.secondary',
              '&:hover': {
                backgroundColor: 'action.hover',
              },
            }}
          >
            {isExpanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
          </IconButton>
        </Box>

        {/* 目录内容 */}
        <Collapse in={isExpanded} timeout="auto" unmountOnExit>
          <Box
            sx={{
              maxHeight: 'calc(70vh - 80px)',
              overflow: 'auto',
              '&::-webkit-scrollbar': {
                width: '6px',
              },
              '&::-webkit-scrollbar-track': {
                backgroundColor: 'transparent',
              },
              '&::-webkit-scrollbar-thumb': {
                backgroundColor: theme.palette.mode === 'dark' 
                  ? 'rgba(255,255,255,0.2)' 
                  : 'rgba(0,0,0,0.2)',
                borderRadius: '3px',
              },
              '&::-webkit-scrollbar-thumb:hover': {
                backgroundColor: theme.palette.mode === 'dark' 
                  ? 'rgba(255,255,255,0.3)' 
                  : 'rgba(0,0,0,0.3)',
              },
            }}
          >
            <List dense sx={{ p: 0 }}>
              {headings.map((heading, index) => (
                <motion.div
                  key={heading.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <ListItem
                    disablePadding
                    sx={{
                      borderLeft: activeId === heading.id 
                        ? '3px solid #4ade80' 
                        : '3px solid transparent',
                      backgroundColor: activeId === heading.id 
                        ? theme.palette.mode === 'dark' 
                          ? 'rgba(74, 222, 128, 0.15)' 
                          : 'rgba(74, 222, 128, 0.08)'
                        : 'transparent',
                      transition: 'all 0.2s ease',
                    }}
                  >
                    <ListItemButton
                      onClick={() => onHeadingClick && onHeadingClick(heading.id)}
                      sx={{
                        py: 1,
                        px: 2,
                        pl: 2 + (heading.level - 1) * 1.5, // 根据标题级别缩进
                        '&:hover': {
                          backgroundColor: activeId === heading.id 
                            ? theme.palette.mode === 'dark' 
                              ? 'rgba(74, 222, 128, 0.2)' 
                              : 'rgba(74, 222, 128, 0.12)'
                            : 'action.hover',
                        },
                      }}
                    >
                      <ListItemText
                        primary={
                          <Typography
                            variant="body2"
                            sx={{
                              fontWeight: activeId === heading.id ? 600 : 400,
                              color: activeId === heading.id 
                                ? '#4ade80' 
                                : 'text.primary',
                              fontSize: heading.level === 1 ? '0.9rem' : '0.8rem',
                              lineHeight: 1.4,
                              whiteSpace: 'nowrap',
                              overflow: 'hidden',
                              textOverflow: 'ellipsis',
                              display: 'flex',
                              alignItems: 'center',
                              gap: 0.5,
                            }}
                          >
                            {/* 标题级别指示器 */}
                            <Box
                              sx={{
                                width: 4,
                                height: 4,
                                borderRadius: '50%',
                                backgroundColor: activeId === heading.id 
                                  ? '#4ade80' 
                                  : theme.palette.mode === 'dark' 
                                    ? 'rgba(255,255,255,0.4)' 
                                    : 'rgba(0,0,0,0.4)',
                                flexShrink: 0,
                              }}
                            />
                            {heading.text}
                          </Typography>
                        }
                      />
                    </ListItemButton>
                  </ListItem>
                </motion.div>
              ))}
            </List>
          </Box>
        </Collapse>

        {/* 折叠状态下的标题显示 */}
        {!isExpanded && (
          <Box
            sx={{
              p: 2,
              cursor: 'pointer',
              '&:hover': {
                backgroundColor: 'action.hover',
              },
            }}
            onClick={toggleExpanded}
          >
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{
                fontSize: '0.8rem',
                textAlign: 'center',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 1,
              }}
            >
              <ListIcon sx={{ fontSize: '1rem' }} />
              {headings.length} 个标题
            </Typography>
          </Box>
        )}
      </Paper>
    </motion.div>
  );
};

export default TableOfContents;

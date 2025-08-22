import React, { useState, useEffect, useRef } from 'react';
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Paper,
  useTheme,
} from '@mui/material';
import { motion } from 'framer-motion';

/**
 * 目录大纲组件
 * @param {Object} props - 组件属性
 * @param {Array} props.headings - 标题数组
 * @param {string} props.activeId - 当前激活的标题ID
 * @param {Function} props.onHeadingClick - 点击标题的回调函数
 */
const TableOfContents = ({ headings, activeId, onHeadingClick }) => {
  const theme = useTheme();

  // 调试信息
  console.log('TableOfContents render:', { headings: headings.length, activeId });

  if (!headings || headings.length === 0) {
    return null;
  }

  return (
    <Box
      sx={{
        position: 'fixed',
        top: '50%',
        right: 20,
        transform: 'translateY(-50%)',
        width: 240,
        backgroundColor: 'background.paper',
        borderRadius: 1,
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        border: '1px solid',
        borderColor: 'divider',
        overflow: 'hidden',
        zIndex: 1000,
        maxHeight: '80vh',
      }}
    >
      <Box sx={{ 
        p: 2, 
        backgroundColor: theme.palette.mode === 'dark' ? 'rgba(74, 222, 128, 0.1)' : 'rgba(74, 222, 128, 0.05)',
        borderBottom: '1px solid',
        borderColor: 'divider',
      }}>
        <Typography
          variant="subtitle1"
          sx={{
            fontWeight: 'bold',
            color: '#4ade80',
            fontSize: '0.95rem',
          }}
        >
          目录
        </Typography>
      </Box>
      
      <Box sx={{ maxHeight: 'calc(100vh - 200px)', overflow: 'auto' }}>
                 {headings.map((heading, index) => (
           <Box
             key={heading.id || `heading-${index}`}
             onClick={(e) => {
               e.preventDefault();
               e.stopPropagation();
               onHeadingClick(heading.id);
             }}
             sx={{
               px: 2,
               py: 1.5,
               cursor: 'pointer',
               borderLeft: activeId === heading.id ? '3px solid #4ade80' : '3px solid transparent',
               backgroundColor: activeId === heading.id 
                 ? theme.palette.mode === 'dark' 
                   ? 'rgba(74, 222, 128, 0.15)' 
                   : 'rgba(74, 222, 128, 0.08)'
                 : 'transparent',
               '&:hover': {
                 backgroundColor: activeId === heading.id 
                   ? theme.palette.mode === 'dark' 
                     ? 'rgba(74, 222, 128, 0.2)' 
                     : 'rgba(74, 222, 128, 0.12)'
                   : 'action.hover',
               },
               transition: 'all 0.2s ease',
               userSelect: 'none',
             }}
           >
            <Typography
              variant="body2"
              sx={{
                fontWeight: activeId === heading.id ? 'bold' : 'normal',
                color: activeId === heading.id ? '#4ade80' : 'text.primary',
                fontSize: heading.level === 1 ? '0.9rem' : '0.8rem',
                pl: (heading.level - 1) * 1.5,
                lineHeight: 1.3,
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
            >
              {heading.text}
            </Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default TableOfContents;

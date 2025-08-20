import React, { useState, useCallback } from 'react';
import {
  TextField,
  InputAdornment,
  IconButton,
  Paper,
  List,
  ListItem,
  ListItemText,
  ListItemButton,
  Typography,
  Box,
  Fade,
} from '@mui/material';
import { Search, Clear } from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';
import { debounce } from '../../utils/helpers';

/**
 * 搜索栏组件
 * @param {Object} props - 组件属性
 * @param {Function} props.onSearch - 搜索回调函数
 * @param {Function} props.onSuggestionClick - 建议点击回调函数
 * @param {Array} props.suggestions - 搜索建议
 * @param {string} props.placeholder - 占位符文本
 * @param {boolean} props.showSuggestions - 是否显示建议
 * @param {string} props.size - 输入框大小
 */
const SearchBar = ({
  onSearch,
  onSuggestionClick,
  suggestions = [],
  placeholder = '搜索...',
  showSuggestions = true,
  size = 'medium',
}) => {
  const [query, setQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [showResults, setShowResults] = useState(false);

  // 防抖搜索
  const debouncedSearch = useCallback(
    debounce((searchQuery) => {
      if (onSearch) {
        onSearch(searchQuery);
      }
    }, 300),
    [onSearch]
  );

  const handleInputChange = (event) => {
    const value = event.target.value;
    setQuery(value);
    setShowResults(value.length > 0);
    debouncedSearch(value);
  };

  const handleClear = () => {
    setQuery('');
    setShowResults(false);
    if (onSearch) {
      onSearch('');
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setQuery(suggestion);
    setShowResults(false);
    if (onSuggestionClick) {
      onSuggestionClick(suggestion);
    } else if (onSearch) {
      onSearch(suggestion);
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      setShowResults(false);
      if (onSearch) {
        onSearch(query);
      }
    }
  };

  const handleFocus = () => {
    setIsFocused(true);
    if (query.length > 0) {
      setShowResults(true);
    }
  };

  const handleBlur = () => {
    setIsFocused(false);
    // 增加延迟时间，避免点击建议项时立即关闭
    setTimeout(() => setShowResults(false), 300);
  };

  const containerVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: { opacity: 1, y: 0 },
  };

  const suggestionVariants = {
    hidden: { opacity: 0, y: -5 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <Box sx={{ position: 'relative', width: '100%' }}>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        transition={{ duration: 0.3 }}
      >
        <TextField
          fullWidth
          size={size}
          value={query}
          onChange={handleInputChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onKeyPress={handleKeyPress}
          placeholder={placeholder}
          variant="outlined"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search color="action" />
              </InputAdornment>
            ),
            endAdornment: query && (
              <InputAdornment position="end">
                <IconButton
                  size="small"
                  onClick={handleClear}
                  edge="end"
                  aria-label="清除搜索"
                >
                  <Clear />
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
      </motion.div>

      {/* 搜索建议 */}
      <AnimatePresence>
        {showSuggestions && showResults && suggestions.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            style={{
              position: 'absolute',
              top: '100%',
              left: 0,
              right: 0,
              zIndex: 1000,
              marginTop: 4,
            }}
          >
            <Paper
              elevation={8}
              sx={{
                maxHeight: 300,
                overflow: 'auto',
                borderRadius: 2,
              }}
            >
              <List dense>
                {suggestions.map((suggestion, index) => (
                  <motion.div
                    key={index}
                    variants={suggestionVariants}
                    initial="hidden"
                    animate="visible"
                    transition={{ delay: index * 0.05 }}
                  >
                    <ListItem disablePadding>
                      <ListItemButton
                        onClick={() => handleSuggestionClick(suggestion)}
                        sx={{
                          '&:hover': {
                            backgroundColor: 'action.hover',
                          },
                        }}
                      >
                        <ListItemText
                          primary={suggestion}
                          primaryTypographyProps={{
                            variant: 'body2',
                          }}
                        />
                      </ListItemButton>
                    </ListItem>
                  </motion.div>
                ))}
              </List>
            </Paper>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 无结果提示 - 只在有查询内容且没有建议时显示 */}
      <AnimatePresence>
        {showSuggestions && showResults && query.trim().length > 0 && suggestions.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            style={{
              position: 'absolute',
              top: '100%',
              left: 0,
              right: 0,
              zIndex: 1000,
              marginTop: 4,
            }}
          >
            <Paper
              elevation={8}
              sx={{
                p: 2,
                borderRadius: 2,
                textAlign: 'center',
              }}
            >
              <Typography variant="body2" color="text.secondary">
                未找到相关结果
              </Typography>
            </Paper>
          </motion.div>
        )}
      </AnimatePresence>
    </Box>
  );
};

export default SearchBar;

# Giscus评论系统配置指南

## 概述

本项目已集成Giscus评论系统，基于GitHub Discussions，为静态网站提供完整的评论功能。

## 配置步骤

### 1. 启用GitHub Discussions

1. 访问你的GitHub仓库：`https://github.com/jiuming1/personal-blog`
2. 点击 **Settings** 标签页
3. 在左侧菜单中找到 **General** 部分
4. 滚动到 **Features** 部分
5. 勾选 **Discussions** 复选框
6. 点击 **Set up discussions** 按钮

### 2. 获取仓库ID

✅ **已完成** - 仓库ID已获取并配置：
- 仓库ID: `R_kgDOPhFB2A`
- 仓库名称: `jiuming1/personal-blog`

API返回信息：
```json
{
  "id": 1041318360,
  "node_id": "R_kgDOPhFB2A",
  "name": "personal-blog",
  "full_name": "jiuming1/personal-blog",
  ...
}
```

### 3. 获取分类ID

⚠️ **需要先启用Discussions功能**

启用Discussions后，访问以下API获取分类ID：
```
https://api.github.com/repos/jiuming1/personal-blog/discussions/categories
```

在返回的JSON中找到 `General` 分类的 `id` 字段，例如：
```json
[
  {
    "id": "DIC_kwDOLhJhJc4CgJhJ",
    "name": "General",
    ...
  }
]
```

**注意：** 当前仓库的 `has_discussions` 为 `false`，需要先启用Discussions功能。

### 4. 更新配置文件

编辑 `src/config/giscus.js` 文件，更新以下配置：

```javascript
export const GISCUS_CONFIG = {
  repo: 'jiuming1/personal-blog',
  repoId: 'R_kgDOPhFB2A', // ✅ 已更新为实际仓库ID
  category: 'General',
  categoryId: '你的分类ID', // ⚠️ 需要启用Discussions后更新
  // ... 其他配置保持不变
};
```

### 5. 测试评论功能

1. 启动开发服务器：`npm run dev`
2. 访问任意文章页面
3. 滚动到页面底部查看评论区域
4. 点击评论区域，应该会显示Giscus评论界面

## 功能特性

- ✅ **无需注册**：用户可以通过GitHub账号直接评论
- ✅ **Markdown支持**：支持Markdown格式的评论
- ✅ **主题适配**：自动适配明暗主题
- ✅ **中文界面**：原生支持中文
- ✅ **表情反应**：支持对评论进行表情反应
- ✅ **回复功能**：支持评论回复和讨论
- ✅ **实时更新**：评论实时同步到GitHub Discussions

## 自定义样式

评论组件的样式已与项目主题保持一致，包括：

- 使用项目的主题色彩（绿色 #4ade80）
- 适配明暗主题切换
- 响应式设计
- 与文章页面布局一致

## 故障排除

### 评论不显示

1. 检查GitHub Discussions是否已启用
2. 确认仓库ID和分类ID是否正确
3. 检查浏览器控制台是否有错误信息
4. 确认网络连接正常

### 主题不匹配

评论系统会自动检测当前主题模式，如果发现不匹配：

1. 清除浏览器缓存
2. 重新加载页面
3. 检查 `theme.palette.mode` 是否正确传递

## 更多信息

- [Giscus官方文档](https://giscus.app/zh-CN)
- [GitHub Discussions API](https://docs.github.com/en/rest/discussions)
- [项目仓库](https://github.com/jiuming1/personal-blog)

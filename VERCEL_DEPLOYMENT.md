# Vercel 部署指南

## 项目改造说明

本项目已从 Express + tRPC 架构改造为**纯前端 + GitHub API** 的架构，完全移除了后端依赖和数据库需求。

### 改造内容

1. **移除认证逻辑** - 删除了所有 Manus OAuth 认证代码，任何人都可以直接访问应用
2. **移除后端服务** - 不再需要 Express 服务器，所有功能通过 GitHub 公开 API 实现
3. **移除数据库** - 收藏功能使用浏览器本地存储实现，无需后端数据库

### 功能说明

- **用户画像** - 实时查询 GitHub API 获取用户信息
- **社交关系** - 实时查询 GitHub API 获取关注/粉丝列表
- **社交图谱** - 基于关注关系生成可视化图谱
- **推荐系统** - 基于用户数据的智能推荐算法
- **收藏功能** - 使用浏览器 localStorage 保存收藏数据

## 部署步骤

### 1. 准备 GitHub 仓库

```bash
# 初始化 git 仓库（如果还没有）
git init
git add .
git commit -m "Initial commit: GitHub Social Graph"

# 添加远程仓库
git remote add origin https://github.com/YOUR_USERNAME/github-social-graph.git
git push -u origin main
```

### 2. 连接到 Vercel

访问 [Vercel Dashboard](https://vercel.com/dashboard)，点击 "Add New" → "Project"，选择上面创建的 GitHub 仓库。

### 3. 配置环境变量（可选）

如果您有 GitHub API Token，可以在 Vercel 项目设置中添加：

- **变量名**: `VITE_GITHUB_API_TOKEN`
- **变量值**: 您的 GitHub Personal Access Token

获取 Token 的方法：
1. 访问 https://github.com/settings/tokens
2. 点击 "Generate new token"
3. 选择 `public_repo` 权限
4. 生成 Token 并复制

### 4. 部署

Vercel 会自动检测 `vercel.json` 配置文件，按照以下步骤构建和部署：

1. 安装依赖
2. 构建前端代码（`pnpm build`）
3. 将 `client/dist` 目录作为静态网站部署

### 5. 验证部署

部署完成后，访问 Vercel 提供的 URL，应该能看到应用首页。

## 项目结构

```
github-social-graph/
├── client/                 # 前端代码（Vite + React）
│   ├── src/
│   │   ├── pages/         # 页面组件
│   │   ├── components/    # UI 组件
│   │   ├── lib/           # 工具函数（GitHub API、本地存储等）
│   │   └── App.tsx        # 主应用组件
│   ├── package.json
│   └── vite.config.ts
├── vercel.json            # Vercel 部署配置
├── .vercelignore          # Vercel 忽略文件
└── README.md
```

## 环境变量

### 可选环境变量

- `VITE_GITHUB_API_TOKEN` - GitHub API Token（用于提高 API 请求限额）

## 注意事项

1. **GitHub API 限额** - 未认证的请求限额为 60 次/小时，认证后为 5000 次/小时。建议添加 GitHub API Token。

2. **CORS 问题** - 如果遇到 CORS 错误，可以使用 GitHub API 的 CORS 代理（已在代码中处理）。

3. **本地存储** - 收藏功能使用浏览器 localStorage，数据仅保存在用户本地，不会同步到服务器。

4. **性能优化** - 应用使用 SWR 进行数据缓存，相同的请求会自动复用缓存结果。

## 常见问题

### Q: 为什么没有登录功能？
A: 项目改造为纯前端架构，所有功能都基于 GitHub 公开 API，无需认证即可使用。

### Q: 收藏的数据会被保存吗？
A: 收藏数据保存在浏览器的 localStorage 中，仅在当前设备上可用。如果清除浏览器数据，收藏会丢失。

### Q: 如何增加 GitHub API 请求限额？
A: 在 Vercel 项目设置中添加 `VITE_GITHUB_API_TOKEN` 环境变量，使用您的 GitHub Personal Access Token。

### Q: 支持哪些浏览器？
A: 支持所有现代浏览器（Chrome、Firefox、Safari、Edge）。

## 后续改进

1. **实现用户对比功能** - 支持选择两个用户进行对比
2. **添加高级搜索** - 支持按技术栈、活跃度等条件筛选
3. **集成 GitHub OAuth** - 实现一键 Star 仓库功能（需要用户授权）
4. **数据导出功能** - 支持将分析结果导出为 CSV 或 PDF

## 支持

如有问题，请提交 Issue 或联系开发者。

# GitHub 社交图谱 - GitHub Social Graph

[![GitHub Stars](https://img.shields.io/github/stars/yourusername/github-social-graph.svg)](https://github.com/yourusername/github-social-graph/stargazers)
[![GitHub Forks](https://img.shields.io/github/forks/yourusername/github-social-graph.svg)](https://github.com/yourusername/github-social-graph/network/members)
[![GitHub Issues](https://img.shields.io/github/issues/yourusername/github-social-graph.svg)](https://github.com/yourusername/github-social-graph/issues)
[![License](https://img.shields.io/github/license/yourusername/github-social-graph.svg)](https://github.com/yourusername/github-social-graph/blob/main/LICENSE)
[![Node.js CI](https://github.com/yourusername/github-social-graph/actions/workflows/node.yml/badge.svg)](https://github.com/yourusername/github-social-graph/actions/workflows/node.yml)
[![Vercel Deploy](https://vercelbadge.vercel.app/api/yourusername/github-social-graph)](https://github-social-graph.vercel.app)

一个功能强大的 GitHub 社交网络关系可视化工具，帮助您探索 GitHub 上的社交图谱，发现共同连接和智能推荐潜在关注者。

## ✨ 核心功能

### 🔍 用户画像与搜索
- 实时查询 GitHub API 获取用户详细信息
- 展示用户基本资料、仓库统计和活动数据
- 支持快速搜索任何 GitHub 用户
- 响应式设计，适配各种设备

### 🔗 社交关系分析
- 实时获取用户的关注和粉丝列表
- 展示用户的社交网络连接强度
- 支持分页加载大量数据
- 直观的关系列表展示

### 📊 交互式社交图谱
- 基于关注关系生成交互式可视化图谱
- 支持拖拽、缩放和平移操作
- 清晰展示用户之间的连接路径
- 支持点击节点查看用户详情
- 动态力导向布局，自动优化节点分布

### 💡 智能推荐系统
- 基于用户社交关系的智能推荐算法
- 推荐潜在的感兴趣用户
- 发现共同关注的用户
- 个性化推荐结果

### ⭐ 收藏与本地存储
- 使用浏览器本地存储保存收藏数据
- 支持添加和移除收藏
- 快速访问收藏的用户
- 数据持久化，刷新页面不丢失

### 🔗 共同连接发现
- 查找两个用户之间的共同连接
- 可视化展示连接路径
- 支持多路径查找

### 🌓 主题切换
- 支持亮色/暗色主题
- 自动跟随系统主题
- 手动切换主题选项

### 📱 响应式设计
- 适配桌面、平板和移动设备
- 优化移动端交互体验
- 流畅的动画效果

## 🛠️ 技术栈

### 前端技术
| 技术 | 版本 | 用途 |
|------|------|------|
| **React** | 19 | 前端框架 |
| **TypeScript** | 5.9 | 类型安全 |
| **Vite** | 7 | 构建工具 |
| **Tailwind CSS** | 4 | 样式框架 |
| **Tailwind CSS Animate** | 1.0 | 动画效果 |
| **Radix UI** | 1.0 | UI 组件基础 |
| **shadcn/ui** | 2.0 | 组件库 |
| **React Force Graph** | 1.48 | 社交图谱可视化 |
| **tRPC** | 11.6 | 端到端类型安全 API |
| **React Query** | 5.90 | 数据状态管理 |
| **Wouter** | 3.3 | 路由管理 |
| **Zod** | 4.1 | 数据验证 |

### 后端技术
| 技术 | 版本 | 用途 |
|------|------|------|
| **Express** | 4.21 | 后端框架 |
| **tRPC** | 11.6 | API 框架 |
| **Drizzle ORM** | 0.44 | 数据库 ORM |
| **MySQL2** | 3.15 | 数据库驱动 |
| **tsx** | 4.19 | TypeScript 执行器 |
| **AWS SDK** | 3.693 | S3 存储服务 |

### 其他技术
- **GitHub Public API** - 数据源
- **Vercel** - 部署平台
- **Prettier** - 代码格式化
- **Vitest** - 测试框架
- **Drizzle Kit** - 数据库迁移

## 🚀 快速开始

### 前提条件

- Node.js 18+ 或 Bun 1.1+
- npm 或 pnpm
- MySQL 数据库（可选，用于服务器端功能）

### 安装和运行

1. **克隆仓库**

```bash
git clone https://github.com/yourusername/github-social-graph.git
cd github-social-graph
```

2. **安装依赖**

```bash
# 使用 npm
npm install

# 或使用 pnpm
pnpm install
```

3. **启动开发服务器**

```bash
# 启动完整应用（前端 + 后端）
npm run dev

# 或只启动前端开发服务器
npm run dev:client
```

4. **访问应用**

打开浏览器访问 `http://localhost:5173`

### 构建生产版本

```bash
# 构建前端代码
npm run build

# 运行生产服务器
npm run start
```

构建产物将生成在 `client/dist` 目录

## 📦 部署到 Vercel

### 一键部署

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yourusername/github-social-graph)

### 手动部署步骤

1. **准备 GitHub 仓库**

```bash
# 初始化 git 仓库（如果还没有）
git init
git add .
git commit -m "Initial commit: GitHub Social Graph"

# 添加远程仓库
git remote add origin https://github.com/YOUR_USERNAME/github-social-graph.git
git push -u origin main
```

2. **连接到 Vercel**

访问 [Vercel Dashboard](https://vercel.com/dashboard)，点击 "Add New" → "Project"，选择上面创建的 GitHub 仓库。

3. **配置环境变量**

在 Vercel 项目设置中添加以下环境变量：

| 变量名 | 描述 | 可选/必填 |
|--------|------|-----------|
| `VITE_GITHUB_API_TOKEN` | GitHub API Token（用于提高 API 请求限额） | 可选 |
| `DATABASE_URL` | MySQL 数据库连接 URL | 可选 |
| `AWS_ACCESS_KEY_ID` | AWS 访问密钥 | 可选 |
| `AWS_SECRET_ACCESS_KEY` | AWS 密钥 | 可选 |
| `AWS_REGION` | AWS 区域 | 可选 |
| `AWS_S3_BUCKET` | S3 存储桶名称 | 可选 |

获取 GitHub Token 的方法：
1. 访问 https://github.com/settings/tokens
2. 点击 "Generate new token"
3. 选择 `public_repo` 权限
4. 生成 Token 并复制

4. **部署**

Vercel 会自动检测 `vercel.json` 配置文件，按照以下步骤构建和部署：

1. 安装依赖
2. 构建前端代码
3. 将 `client/dist` 目录作为静态网站部署
4. 部署后端 API 函数

5. **验证部署**

部署完成后，访问 Vercel 提供的 URL，应该能看到应用首页。

## ⚙️ 环境变量

### 前端环境变量

| 变量名 | 描述 | 默认值 |
|--------|------|--------|
| `VITE_GITHUB_API_TOKEN` | GitHub API Token | 无 |
| `VITE_APP_URL` | 应用 URL | `http://localhost:5173` |
| `VITE_API_URL` | API 端点 URL | `/api` |

### 后端环境变量

| 变量名 | 描述 | 默认值 |
|--------|------|--------|
| `NODE_ENV` | 环境类型 | `development` |
| `PORT` | 服务器端口 | `3000` |
| `DATABASE_URL` | 数据库连接 URL | 无 |
| `AWS_ACCESS_KEY_ID` | AWS 访问密钥 | 无 |
| `AWS_SECRET_ACCESS_KEY` | AWS 密钥 | 无 |
| `AWS_REGION` | AWS 区域 | `us-east-1` |
| `AWS_S3_BUCKET` | S3 存储桶名称 | 无 |

## 📁 项目结构

```
github-social-graph/
├── client/                 # 前端代码（Vite + React）
│   ├── public/             # 静态资源
│   │   ├── robots.txt
│   │   ├── sitemap.xml
│   │   └── favicon.ico
│   ├── src/
│   │   ├── _core/          # 核心功能
│   │   │   └── hooks/      # 自定义 Hooks
│   │   ├── components/     # UI 组件
│   │   │   ├── ui/         # 基础 UI 组件
│   │   │   ├── SocialGraph.tsx
│   │   │   ├── UserProfileCard.tsx
│   │   │   └── ...
│   │   ├── contexts/       # React Context
│   │   ├── hooks/          # 自定义 Hooks
│   │   ├── lib/            # 工具函数
│   │   ├── pages/          # 页面组件
│   │   ├── App.tsx         # 主应用组件
│   │   ├── index.css       # 全局样式
│   │   └── main.tsx        # 应用入口
│   ├── index.html          # HTML 模板
│   └── vite.config.ts      # Vite 配置
├── server/                 # 后端代码（Express + tRPC）
│   ├── _core/              # 核心功能
│   │   ├── types/          # 类型定义
│   │   ├── context.ts      # tRPC 上下文
│   │   ├── trpc.ts         # tRPC 配置
│   │   ├── env.ts          # 环境变量
│   │   ├── oauth.ts        # OAuth 认证
│   │   └── index.ts        # 服务器入口
│   ├── db.ts               # 数据库配置
│   └── routers.ts          # API 路由
├── shared/                 # 共享代码
│   ├── _core/              # 共享核心
│   ├── const.ts            # 共享常量
│   └── types.ts            # 共享类型
├── drizzle/                # Drizzle ORM
│   ├── schema.ts           # 数据库模式
│   ├── relations.ts        # 关系定义
│   └── migrations/         # 数据库迁移
├── patches/                # 依赖补丁
├── vercel.json             # Vercel 配置
├── package.json            # 项目依赖
├── tsconfig.json           # TypeScript 配置
├── tailwind.config.js      # Tailwind CSS 配置
└── README.md               # 项目说明文档
```

## 📖 使用说明

### 基本使用流程

1. **搜索用户**：在搜索框中输入 GitHub 用户名，点击搜索按钮
2. **查看用户详情**：在搜索结果中点击用户头像或名称
3. **查看社交图谱**：在用户详情页面，切换到 "社交图谱" 标签
4. **探索社交关系**：在社交图谱中拖拽、缩放查看用户的社交网络
5. **添加收藏**：在用户详情页面点击 "收藏" 按钮
6. **查看收藏**：点击导航栏中的 "收藏" 按钮
7. **查找共同连接**：在探索页面输入两个用户名，查看共同连接

### 社交图谱操作指南

- **拖拽**：按住鼠标左键拖拽可以移动图谱
- **缩放**：使用鼠标滚轮或触摸板缩放图谱
- **点击节点**：点击用户节点查看用户详情
- **悬停节点**：悬停在用户节点上查看用户名和基本信息
- **双击节点**：展开节点，显示其直接连接
- **右键菜单**：右键点击节点查看更多选项

### 高级功能

#### 智能推荐
1. 访问推荐页面
2. 输入 GitHub 用户名
3. 查看推荐的用户列表
4. 点击用户查看详情或添加到收藏

#### 共同连接查找
1. 访问探索页面
2. 输入两个 GitHub 用户名
3. 点击 "查找共同连接"
4. 查看可视化的连接路径

## 📝 常见问题

### Q: 为什么没有登录功能？
A: 项目核心功能基于 GitHub 公开 API，无需认证即可使用。服务器端功能支持 OAuth 认证，可用于扩展功能。

### Q: 收藏的数据会被保存吗？
A: 收藏数据保存在浏览器的 localStorage 中，仅在当前设备上可用。如果清除浏览器数据，收藏会丢失。

### Q: 如何增加 GitHub API 请求限额？
A: 在 Vercel 项目设置中添加 `VITE_GITHUB_API_TOKEN` 环境变量，使用您的 GitHub Personal Access Token。

### Q: 支持哪些浏览器？
A: 支持所有现代浏览器（Chrome 90+、Firefox 88+、Safari 14+、Edge 90+）。

### Q: 为什么有些用户的社交关系不完整？
A: GitHub API 限制了每次请求返回的数据量，我们使用分页加载来获取完整数据，但对于拥有大量关注/粉丝的用户，可能需要较长时间加载。

### Q: 如何贡献代码？
A: 请查看 [贡献指南](#🤝-贡献指南) 部分。

### Q: 如何报告 bug 或提出功能建议？
A: 请在 GitHub Issues 页面提交：https://github.com/yourusername/github-social-graph/issues

## 🔮 后续改进计划

1. **用户对比功能** - 支持选择两个用户进行详细对比
2. **高级搜索** - 支持按技术栈、活跃度等条件筛选用户
3. **集成 GitHub OAuth** - 实现一键 Star 仓库功能
4. **数据导出功能** - 支持将分析结果导出为 CSV 或 PDF
5. **暗黑模式优化** - 进一步优化暗黑模式下的可视化效果
6. **移动端优化** - 改进移动端的用户体验
7. **更多可视化选项** - 支持切换不同的图谱布局算法
8. **实时数据更新** - 支持实时更新用户数据
9. **团队功能** - 支持查看团队成员关系
10. **API 文档** - 完善 API 文档

## 🤝 贡献指南

我们欢迎各种形式的贡献！如果您想为项目做出贡献，请遵循以下步骤：

1. **Fork 仓库**

```bash
git fork https://github.com/yourusername/github-social-graph.git
```

2. **创建特性分支**

```bash
git checkout -b feature/AmazingFeature
```

3. **安装依赖**

```bash
npm install
```

4. **编写代码**

5. **运行测试**

```bash
npm test
```

6. **提交更改**

```bash
git commit -m 'Add some AmazingFeature'
```

7. **推送到分支**

```bash
git push origin feature/AmazingFeature
```

8. **打开 Pull Request**

在 GitHub 上打开一个 Pull Request，描述您的更改。

### 贡献规范

- 遵循项目的代码风格（使用 Prettier 格式化）
- 编写测试用例（如果适用）
- 更新文档（如果功能发生变化）
- 确保 CI 测试通过
- 遵循 [Conventional Commits](https://www.conventionalcommits.org/) 规范

## 📄 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情。

## 📞 联系方式

- **项目链接**: [https://github.com/yourusername/github-social-graph](https://github.com/yourusername/github-social-graph)
- **问题反馈**: [GitHub Issues](https://github.com/yourusername/github-social-graph/issues)
- **部署地址**: [https://github-social-graph.vercel.app](https://github-social-graph.vercel.app)
- **开发者**: yourusername
- **Twitter**: [@yourusername](https://twitter.com/yourusername)

## 🙏 致谢

- [GitHub](https://github.com) - 提供了强大的公开 API
- [React](https://react.dev) - 用于构建用户界面
- [Vite](https://vitejs.dev) - 现代化的前端构建工具
- [Tailwind CSS](https://tailwindcss.com) - 实用优先的 CSS 框架
- [Radix UI](https://radix-ui.com) - 无障碍设计的 UI 组件
- [shadcn/ui](https://ui.shadcn.com) - 可复用的 UI 组件
- [tRPC](https://trpc.io) - 端到端类型安全 API
- [Drizzle ORM](https://orm.drizzle.team) - 现代化的 ORM
- [Vercel](https://vercel.com) - 优秀的部署平台
- [React Force Graph](https://github.com/vasturiano/react-force-graph) - 强大的力导向图库


## 📚 相关资源

- [GitHub API 文档](https://docs.github.com/en/rest)
- [React 文档](https://react.dev/learn)
- [TypeScript 文档](https://www.typescriptlang.org/docs/)
- [Vite 文档](https://vitejs.dev/guide/)
- [Tailwind CSS 文档](https://tailwindcss.com/docs/)
- [tRPC 文档](https://trpc.io/docs/)
- [Drizzle ORM 文档](https://orm.drizzle.team/docs/overview)

---

如果您觉得这个项目有用，请给它一个 ⭐️ 支持一下！

[![Stargazers over time](https://starchart.cc/yourusername/github-social-graph.svg)](https://starchart.cc/yourusername/github-social-graph)
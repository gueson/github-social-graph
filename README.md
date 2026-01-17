# GitHub Social Graph

一个可视化GitHub社交关系的强大工具，帮助用户探索GitHub上的社交网络、发现共同连接和推荐潜在的关注者。

## 🚀 功能特点

- **社交图谱可视化**：直观展示GitHub用户之间的关注关系网络
- **共同连接分析**：发现您与其他用户之间的共同关注者
- **智能推荐系统**：基于社交关系推荐潜在的关注者
- **用户档案查看**：详细查看GitHub用户的档案信息
- **响应式设计**：完美适配桌面和移动设备
- **高性能渲染**：使用Canvas技术实现流畅的图谱交互
- **深色/浅色主题**：支持主题切换，保护您的眼睛

## 🛠 技术栈

### 前端
- **React 19**：现代化的UI框架
- **TypeScript**：类型安全的JavaScript超集
- **Tailwind CSS**：实用优先的CSS框架
- **Radix UI**：可访问性优先的UI组件库
- **React Force Graph**：用于可视化社交图谱
- **Wouter**：轻量级的路由解决方案
- **Zod**：数据验证库

### 后端
- **Node.js**：JavaScript运行时
- **Express**：Web应用框架
- **tRPC**：类型安全的API框架
- **Drizzle ORM**：现代化的数据库ORM
- **MySQL**：关系型数据库

### 工具
- **Vite**：快速的构建工具
- **Vitest**：现代化的测试框架
- **Prettier**：代码格式化工具

## 📦 快速开始

### 前提条件

- Node.js 18+ 和 pnpm
- MySQL数据库
- GitHub API Token（可选，用于提高API请求限制）

### 安装步骤

1. **克隆仓库**

```bash
git clone https://github.com/yourusername/github-social-graph.git
cd github-social-graph
```

2. **安装依赖**

```bash
pnpm install
```

3. **配置环境变量**

创建 `.env` 文件并配置以下环境变量：

```env
# 数据库连接
DATABASE_URL="mysql://username:password@localhost:3306/github_social_graph"

# GitHub API Token（可选）
VITE_GITHUB_API_TOKEN="your-github-api-token"

# 应用配置
PORT=3000
NODE_ENV=development
```

4. **数据库设置**

```bash
pnpm db:push
```

5. **启动开发服务器**

```bash
pnpm dev
```

6. **访问应用**

打开浏览器访问 `http://localhost:3000`

## 📁 项目结构

```
github-social-graph/
├── client/                # 前端应用
│   ├── src/              # 前端源码
│   │   ├── components/   # React组件
│   │   ├── lib/          # 工具函数
│   │   ├── pages/        # 页面组件
│   │   ├── hooks/        # 自定义Hook
│   │   └── contexts/     # React上下文
│   └── index.html        # HTML入口文件
├── server/               # 后端应用
│   ├── _core/            # 核心功能
│   ├── db.ts             # 数据库操作
│   └── routers.ts        # API路由
├── shared/               # 共享代码
├── drizzle/              # 数据库模式
└── package.json          # 项目配置
```

## 🔍 核心功能

### 社交图谱可视化

社交图谱是应用的核心功能，它使用Canvas技术渲染用户之间的关注关系网络。每个节点代表一个GitHub用户，节点大小根据用户的粉丝数量动态调整。连线代表关注关系，线上的数字表示共同关注者的数量。

```typescript
// 核心图谱组件
import { SocialGraph } from './components/SocialGraph';

<SocialGraph
  nodes={graphNodes}
  links={graphLinks}
  isLoading={isLoading}
  onNodeClick={handleNodeClick}
/>
```

### 共同连接分析

分析两个用户之间的共同关注者，帮助用户发现潜在的社交联系。

### 智能推荐系统

基于用户的社交网络和行为模式，推荐潜在的关注者和项目。

### 用户档案查看

详细查看GitHub用户的档案信息，包括：
- 基本信息（姓名、头像、位置等）
- 仓库列表和统计信息
- 关注者和关注的用户
- 语言偏好

## ⚙️ 配置说明

### 环境变量

| 变量名 | 描述 | 可选 | 默认值 |
|-------|------|------|--------|
| `DATABASE_URL` | 数据库连接字符串 | 否 | 无 |
| `VITE_GITHUB_API_TOKEN` | GitHub API Token | 是 | 无 |
| `PORT` | 服务器端口 | 是 | 3000 |
| `NODE_ENV` | 运行环境 | 是 | development |

### GitHub API 限制

未提供GitHub API Token时，API请求将受到限制。建议提供Token以获得更好的体验。

## 📡 API文档

应用使用tRPC提供类型安全的API。主要API包括：

### 用户API
- `getUserByUsername`: 根据用户名获取用户信息
- `getUserFollowing`: 获取用户关注的用户列表
- `getUserFollowers`: 获取用户的粉丝列表

### 社交关系API
- `getCommonConnections`: 获取两个用户之间的共同连接
- `getSocialGraph`: 获取用户的社交图谱数据

### 推荐API
- `getRecommendations`: 获取用户推荐

## 🧑‍💻 开发指南

### 开发流程

1. 创建功能分支：`git checkout -b feature/your-feature`
2. 开发功能
3. 运行测试：`pnpm test`
4. 检查类型：`pnpm check`
5. 格式化代码：`pnpm format`
6. 提交代码：`git commit -m "feat: add your feature"`
7. 推送分支：`git push origin feature/your-feature`
8. 创建Pull Request

### 构建生产版本

```bash
pnpm build
pnpm start
```

## 🤝 贡献指南

我们欢迎社区贡献！请查看[CONTRIBUTING.md](CONTRIBUTING.md)了解如何参与。

### 提交规范

我们使用以下提交规范：

- `feat`: 新功能
- `fix`: 修复bug
- `docs`: 文档更新
- `style`: 代码格式更改
- `refactor`: 代码重构
- `test`: 测试更新
- `chore`: 构建过程或辅助工具的变动

## 📄 许可证

本项目采用MIT许可证 - 查看[LICENSE](LICENSE)文件了解详情。

## 📞 联系方式

- 项目负责人：[Your Name](https://github.com/yourusername)
- 邮箱：your.email@example.com
- GitHub Issues：[提交问题](https://github.com/yourusername/github-social-graph/issues)

## 📊 项目状态

- ✅ 社交图谱可视化
- ✅ 共同连接分析
- ✅ 智能推荐系统
- ✅ 用户档案查看
- ✅ 响应式设计
- ⏳ 深色主题支持
- ⏳ 性能优化
- ⏳ 更多功能开发中...

---

如果您喜欢这个项目，请给它一个 ⭐️！

[![GitHub stars](https://img.shields.io/github/stars/yourusername/github-social-graph?style=social)](https://github.com/yourusername/github-social-graph)
[![GitHub forks](https://img.shields.io/github/forks/yourusername/github-social-graph?style=social)](https://github.com/yourusername/github-social-graph)
[![GitHub issues](https://img.shields.io/github/issues/yourusername/github-social-graph)](https://github.com/yourusername/github-social-graph/issues)
[![GitHub license](https://img.shields.io/github/license/yourusername/github-social-graph)](https://github.com/yourusername/github-social-graph/blob/main/LICENSE)
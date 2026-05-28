# 🧒 CodeSpark Kids — 儿童编程启蒙实验室

> 把编程启蒙变成一场会发光的冒险 ✨

面向 5-12 岁儿童的互动编程启蒙学习平台，从不插电思维到 Python 初体验，让孩子在拖拽、迷宫、小游戏和项目挑战中逐步建立计算思维。

## ✨ 特性

- 🎮 **5 个学习阶段**：从不插电思维到项目实战，循序渐进
- 🧩 **10 门互动课程**：每门课都有动手挑战，不只是看
- 🎯 **8 种挑战类型**：指令排序、条件判断、迷宫、Canvas 游戏、代码块、Python 编辑器等
- 💾 **本地进度保存**：Zustand + localStorage，关闭浏览器不丢进度
- 📱 **响应式设计**：手机、平板、电脑都能用
- 🌙 **深色霓虹主题**：每个阶段独特配色，视觉舒适
- 🐳 **Docker 一键部署**：开箱即用

## 📚 课程体系

| 阶段 | 主题 | 课程数 | 内容 |
|------|------|--------|------|
| 🧠 阶段 1 | 不插电思维 | 2 门 | 指令序列、条件判断 |
| 🎨 阶段 2 | 可视化入门 | 2 门 | Scratch 积木、拖拽编程 |
| 🎮 阶段 3 | 游戏化编程 | 2 门 | Canvas 游戏、循环迷宫 |
| 💻 阶段 4 | 代码初体验 | 2 门 | Python 输出、变量实验 |
| 🚀 阶段 5 | 项目实战 | 2 门 | 电子宠物、迷你游戏 |

## 🛠️ 技术栈

- **框架**: Next.js 14 (App Router)
- **语言**: TypeScript
- **样式**: Tailwind CSS v4
- **状态管理**: Zustand
- **动画**: Framer Motion
- **图标**: Lucide React
- **拖拽**: @dnd-kit

## 🚀 快速开始

### 本地开发

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 打开浏览器
open http://localhost:3000
```

### 生产构建

```bash
npm run build
npm run start
```

### Docker 部署

```bash
# 拉取镜像
docker pull xilianghe/coding-kids:latest

# 运行容器
docker run -d --name coding-kids -p 8889:3000 xilianghe/coding-kids:latest

# 或使用 docker-compose
docker-compose up -d
```

访问 `http://localhost:8889` 即可。

## 📁 项目结构

```
coding-kids/
├── app/                          # Next.js App Router
│   ├── page.tsx                  # 首页（阶段卡片展示）
│   ├── layout.tsx                # 全局布局
│   ├── globals.css               # 全局样式
│   └── courses/
│       ├── [stageId]/
│       │   ├── page.tsx          # 阶段课程列表
│       │   └── [courseId]/
│       │       └── page.tsx      # 课程详情 + 互动挑战
├── components/
│   ├── challenges/               # 互动挑战组件
│   │   ├── SequenceChallenge.tsx # 指令排序拖拽
│   │   ├── ConditionChallenge.tsx# 条件判断搭建
│   │   ├── BlocksChallenge.tsx   # Scratch 风格积木
│   │   ├── MazeChallenge.tsx     # 迷宫路径规划
│   │   ├── CanvasGame.tsx        # Canvas 小游戏
│   │   ├── PythonEditor.tsx      # Python 代码编辑器
│   │   ├── ProjectChallenge.tsx  # 项目实战挑战
│   │   └── ChallengeHost.tsx     # 挑战容器组件
│   ├── StageCard.tsx             # 阶段卡片
│   ├── Header.tsx                # 顶部导航
│   ├── ProgressBar.tsx           # 进度条
│   └── StageProgressBar.tsx      # 阶段进度
├── lib/
│   ├── courses.ts                # 课程数据定义
│   └── stage-icons.ts            # 阶段图标映射
├── store/
│   └── progress-store.ts         # Zustand 进度管理
├── Dockerfile                    # Docker 构建文件
├── docker-compose.yml            # Docker Compose 配置
└── package.json
```

## 🎯 互动挑战类型

### 1. 指令排序 (SequenceChallenge)
拖拽指令卡片，让机器人按正确顺序走到目标位置。学习：程序是一组有序指令。

### 2. 条件判断 (ConditionChallenge)
搭建「如果...就...」规则，帮助角色做出正确选择。学习：条件逻辑。

### 3. 代码块 (BlocksChallenge)
Scratch 风格的彩色积木，拖拽组合控制角色移动。学习：事件和动作。

### 4. 迷宫挑战 (MazeChallenge)
规划路径穿越迷宫，避开障碍收集宝石。学习：路径规划。

### 5. Canvas 游戏 (CanvasGame)
接水果小游戏，移动篮子接住掉落的水果。学习：游戏循环、变量。

### 6. Python 编辑器 (PythonEditor)
编写简单 Python 代码并运行查看输出。学习：代码语法。

### 7. 项目挑战 (ProjectChallenge)
综合运用所学知识，完成电子宠物或迷你游戏。学习：项目拆解。

## 🔧 环境变量

无需配置任何环境变量，开箱即用。学习进度保存在浏览器 localStorage 中。

## 📦 Docker 构建

```bash
# 构建镜像
docker build -t coding-kids .

# 运行
docker run -d -p 8889:3000 coding-kids
```

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

## 📄 许可证

MIT License

---

**让孩子在游戏中爱上编程 🎮➡️💻**

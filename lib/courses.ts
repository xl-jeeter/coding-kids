export type ChallengeType =
  | "sequence"
  | "condition"
  | "blocks"
  | "maze"
  | "canvas"
  | "python"
    | "project";

export type StageIconName = "brain" | "palette" | "gamepad" | "code" | "rocket";

export type Course = {
  id: string;
  title: string;
  description: string;
  duration: string;
  goals: string[];
  challenge: ChallengeType;
};

export type Stage = {
  id: string;
  order: number;
  title: string;
  emoji: string;
  subtitle: string;
  description: string;
  color: string;
  accent: string;
  icon: StageIconName;
  courses: Course[];
};

export const stages: Stage[] = [
  {
    id: "unplugged-thinking",
    order: 1,
    title: "不插电思维",
    emoji: "🧠",
    subtitle: "像小工程师一样拆解问题",
    description: "用游戏理解指令、顺序和条件，不需要先写代码。",
    color: "from-cyan-400 to-blue-500",
    accent: "#22d3ee",
    icon: "brain",
    courses: [
      {
        id: "robot-sequence",
        title: "理解指令和序列",
        description: "拖拽指令卡片，让机器人按正确顺序走到星星目标。",
        duration: "15 分钟",
        goals: ["认识程序是一组清晰指令", "理解顺序会改变结果", "练习调试错误步骤"],
        challenge: "sequence",
      },
      {
        id: "if-then-game",
        title: "条件判断",
        description: "搭建如果...就...规则，帮助角色做出正确选择。",
        duration: "12 分钟",
        goals: ["理解条件成立与不成立", "组合简单规则", "用逻辑解决选择问题"],
        challenge: "condition",
      },
    ],
  },
  {
    id: "visual-start",
    order: 2,
    title: "可视化入门",
    emoji: "🎨",
    subtitle: "把代码变成彩色积木",
    description: "通过 Scratch 风格的代码块控制角色，建立编程直觉。",
    color: "from-fuchsia-400 to-pink-500",
    accent: "#e879f9",
    icon: "palette",
    courses: [
      {
        id: "scratch-blocks",
        title: "Scratch 风格积木编程",
        description: "选择动作积木并排列，观察角色如何移动和转向。",
        duration: "18 分钟",
        goals: ["认识事件和动作块", "把想法转换成积木程序", "尝试不同组合"],
        challenge: "blocks",
      },
      {
        id: "drag-code-move",
        title: "拖拽代码块控制角色",
        description: "用代码块规划路线，让角色收集宝石。",
        duration: "16 分钟",
        goals: ["连接动作和结果", "规划路线", "通过预览修正程序"],
        challenge: "maze",
      },
    ],
  },
  {
    id: "game-programming",
    order: 3,
    title: "游戏化编程",
    emoji: "🎮",
    subtitle: "在小游戏里学习循环和变量",
    description: "用 Canvas 小游戏理解重复、分数、速度等核心概念。",
    color: "from-emerald-400 to-lime-500",
    accent: "#34d399",
    icon: "gamepad",
    courses: [
      {
        id: "catch-fruit",
        title: "Canvas 接水果",
        description: "移动篮子接住水果，观察变量如何记录分数。",
        duration: "20 分钟",
        goals: ["理解游戏循环", "认识分数变量", "体验事件控制"],
        challenge: "canvas",
      },
      {
        id: "loop-maze",
        title: "循环迷宫",
        description: "用重复指令走出迷宫，减少不必要的步骤。",
        duration: "18 分钟",
        goals: ["发现重复模式", "用循环简化程序", "比较程序效率"],
        challenge: "maze",
      },
    ],
  },
  {
    id: "first-code",
    order: 4,
    title: "代码初体验",
    emoji: "💻",
    subtitle: "第一次写出真正的代码",
    description: "从简单 Python 输出开始，看到代码运行结果。",
    color: "from-amber-300 to-orange-500",
    accent: "#f59e0b",
    icon: "code",
    courses: [
      {
        id: "python-print",
        title: "Python 打招呼",
        description: "编辑 print 语句，运行后看到自己的输出。",
        duration: "15 分钟",
        goals: ["认识文本和引号", "理解输出", "修正常见语法问题"],
        challenge: "python",
      },
      {
        id: "python-variables",
        title: "变量小实验",
        description: "改变变量值，让程序显示不同的角色名字和分数。",
        duration: "18 分钟",
        goals: ["理解变量保存信息", "修改变量值", "组合文本输出"],
        challenge: "python",
      },
    ],
  },
  {
    id: "projects",
    order: 5,
    title: "项目实战",
    emoji: "🚀",
    subtitle: "把知识组合成完整作品",
    description: "完成综合挑战，设计自己的互动小项目。",
    color: "from-violet-400 to-indigo-500",
    accent: "#8b5cf6",
    icon: "rocket",
    courses: [
      {
        id: "pet-project",
        title: "电子宠物挑战",
        description: "组合条件、变量和交互，设计会回应的电子宠物。",
        duration: "25 分钟",
        goals: ["拆解项目需求", "组合多个编程概念", "完成可展示作品"],
        challenge: "project",
      },
      {
        id: "mini-game-project",
        title: "迷你游戏毕业作品",
        description: "规划目标、规则和反馈，完成一个可玩的小游戏原型。",
        duration: "30 分钟",
        goals: ["设计游戏规则", "添加胜利条件", "展示并复盘作品"],
        challenge: "project",
      },
    ],
  },
];

export function getStage(stageId: string) {
  return stages.find((stage) => stage.id === stageId);
}

export function getCourse(stageId: string, courseId: string) {
  return getStage(stageId)?.courses.find((course) => course.id === courseId);
}

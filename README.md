# UptimeKeeper

<p align="center">
  <img src="https://img.shields.io/badge/Next.js-15-black?style=flat&logo=next.js" alt="Next.js">
  <img src="https://img.shields.io/badge/React-19-blue?style=flat&logo=react" alt="React">
  <img src="https://img.shields.io/badge/Tailwind_CSS-4-blue?style=flat&logo=tailwindcss" alt="Tailwind CSS">
  <img src="https://img.shields.io/badge/pnpm-10-yellow?style=flat&logo=pnpm" alt="pnpm">
</p>

一个优雅的站点状态监控面板，基于 [UptimeRobot](https://uptimerobot.com/) API 构建，使用 Next.js 15 和 React 19 开发。

参考项目：[Uptime-Status](https://github.com/JLinMr/Uptime-Status)，主要做了以下改进：
1. 使用 Next.js 开发，解决 [UptimeRobot API](https://uptimerobot.com/) 跨域的问题
2. 引入最新的 [TailwindCSS 4.x](https://tailwindcss.com/) 版本
3. 基于 [Motion](https://motion.dev/) 动画库

## 🌟 特性

- 📊 实时监控网站状态（在线/离线/暂停）
- 📈 可视化响应时间图表
- 📅 30天内故障记录查看
- 🎨 响应式设计，支持深色/浅色主题
- ⚡ 动画效果，流畅用户体验
- 📱 移动端适配

## 🛠 技术栈

- [Next.js 15](https://nextjs.org/) - React 框架
- [React 19](https://reactjs.org/) - UI 库
- [TypeScript](https://www.typescriptlang.org/) - 类型安全
- [Tailwind CSS](https://tailwindcss.com/) - 样式框架
- [Motion](https://motion.dev/) - 动画库
- [UptimeRobot API](https://uptimerobot.com/api) - 网站监控服务

## 📦 安装

1. 克隆项目

```bash
git clone https://github.com/baiwumm/UptimeKeeper.git
```

2. 安装依赖

```bash
cd UptimeKeeper
pnpm install
```

3. 配置环境变量

创建 `.env` 文件并添加以下配置：

```env
# UptimeRobot API Key
UPTIMEROBOT_API_KEY = "ur1779826-ddf42d879d591ecbc2d29790"
# API 代理地址
UPTIMEROBOT_API_URL = "https://api.uptimerobot.com/v2/getMonitors"

# 网站标题
NEXT_PUBLIC_SITE_TITLE = '白雾茫茫丶'
# 网站名称
NEXT_PUBLIC_SITE_NAME = 'UptimeKeeper'
# 网站描述
NEXT_PUBLIC_SITE_DESCRIPTION = '一个优雅的站点状态监控面板'
# 网站关键词
NEXT_PUBLIC_SITE_KEYWORDS = 'UptimeKeeper,UptimeRobot, 网站监控, API监控, 服务可用性, 站点状态, 网站宕机检测, 服务器健康监测, 实时监控, 可视化报表'
# 倒计时，单位分钟
NEXT_PUBLIC_COUNTDOWN_TIME = '5'
# 响应时间天数，默认 30 天，最小值 7 天，最大值 90 天
NEXT_PUBLIC_RESPONSE_DAYS = '30'
```

4. 启动开发服务器

```bash
pnpm dev
```

访问 http://localhost:5173 查看应用。

## 🚀 部署

```bash
# 构建生产版本
pnpm build

# 启动生产服务器
pnpm start
```

## 📁 项目结构

```
src/
├── app/                 # Next.js 应用目录
│   ├── api/             # API 路由
│   └── components/      # 全局组件
├── components/          # 页面组件
└── lib/                 # 工具函数和类型定义
```

## 📝 使用说明

1. 获取 [UptimeRobot](https://uptimerobot.com/) API 密钥
2. 在 UptimeRobot 中配置需要监控的网站
3. 将 API 密钥添加到环境变量中
4. 启动应用即可查看网站监控状态

## 🤝 贡献

欢迎提交 Issue 和 Pull Request 来帮助改进这个项目。

## 📄 许可证

[MIT](./LICENSE) © [baiwumm](https://github.com/baiwumm)
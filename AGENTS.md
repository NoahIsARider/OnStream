# AGENTS.md

## 项目概述

OnStream - 一个伪装成直播平台的番茄钟应用。用户以为自己在看/开直播，实际上是一个专注计时器。提供 Twitch 和 Bilibili 两种皮肤。

## 技术栈

- **Framework**: Next.js 16 (App Router)
- **Core**: React 19
- **Language**: TypeScript 5
- **UI**: shadcn/ui + Tailwind CSS 4
- **包管理器**: pnpm

## 目录结构

```
src/
├── app/
│   ├── page.tsx              # 主页面（皮肤选择 + 流页面）
│   ├── layout.tsx            # 根布局
│   └── globals.css           # 全局样式 + 动画
├── components/
│   ├── SkinSelector.tsx       # 皮肤选择页面
│   ├── StreamPage.tsx         # 流页面主组件
│   ├── TwitchSkin.tsx         # Twitch 皮肤布局
│   ├── BilibiliSkin.tsx       # Bilibili 皮肤布局
│   ├── VideoFeed.tsx          # 摄像头/屏幕共享 + 滤镜
│   ├── ChatPanel.tsx          # 模拟聊天面板
│   ├── DanmakuOverlay.tsx     # 弹幕覆盖层（Bilibili）
│   ├── LikesOverlay.tsx       # 点赞动画覆盖层
│   ├── GiftOverlay.tsx        # 礼物通知覆盖层
│   ├── FilterPanel.tsx        # 滤镜和贴纸控制面板
│   └── PomodoroTimer.tsx      # 番茄钟组件
├── hooks/
│   ├── usePomodoro.ts         # 番茄钟逻辑
│   ├── useSimulatedChat.ts    # 模拟聊天
│   ├── useSimulatedLikes.ts   # 模拟点赞
│   ├── useSimulatedGifts.ts   # 模拟礼物
│   └── useSimulatedDanmaku.ts # 模拟弹幕
── lib/
    └── simulatedData.ts       # 所有模拟数据
```

## 核心功能

1. **皮肤选择**: Twitch（深色+紫色）和 Bilibili（浅色+粉色）
2. **摄像头/屏幕共享**: 调用 getUserMedia / getDisplayMedia
3. **视频滤镜**: 10 种 CSS 滤镜效果
4. **贴纸**: 16 种 emoji 贴纸叠加
5. **模拟聊天**: 随机用户名 + 消息，自动滚动
6. **弹幕**: Bilibili 皮肤专属，从右向左飘过
7. **点赞动画**: 心形从底部升起
8. **礼物通知**: 随机礼物弹出通知
9. **番茄钟**: 25/5/15 分钟模式，进度条显示

## 开发命令

```bash
pnpm dev          # 开发服务器
pnpm build        # 生产构建
pnpm start        # 生产启动
pnpm lint         # 代码检查
```

## 注意事项

- 所有组件都是 "use client" 因为涉及浏览器 API
- 模拟数据在 `src/lib/simulatedData.ts` 中集中管理
- 动画在 `globals.css` 中定义（fadeIn, floatUp, danmaku 等）
- 番茄钟定时器在后台运行，即使不直播也会继续计时

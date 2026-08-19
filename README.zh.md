# dsh-image-conatiner

这是一个 DeepSeek Harness 客户端插件，用更接近 Codex App 的响应式生成图片画廊，替换助手消息里过小的图片宫格。

包名按需求保留 `conatiner` 这一拼写。

> 这是非官方社区插件，与 DeepSeek 无隶属或背书关系。

## 体验

- 单图按自然比例展示，并限制极端长宽比；
- 2 至 4 张图使用大尺寸双列布局；
- 更多图片会在三列与窄屏双列之间自适应；
- 全屏组预览支持上一张、下一张、计数、键盘、下载原图、焦点恢复和失败重试；
- 使用 Harness 语义色彩变量，兼容深色模式、窄屏和减少动态效果设置。

插件占用 `conversation.chat.assistant.images` 扩展位。未安装插件或选择器不接管时，`ui-conversation` 继续渲染内置 `ImageGallery`，对话图片不会消失。

## 兼容性

0.1.0 已在 DeepSeek Harness `v0.1.0-rc.7`、提交 `99f6f02` 上验证。插件依赖 `conversation.chat.assistant.images` chain slot；原始 rc.7 尚未提供该扩展位，因此仓库附带一份最小、MIT 兼容的集成补丁：

```text
patches/deepseek-harness-v0.1.0-rc.7-assistant-images.patch
```

如果你的 Harness 源码已经包含 `conversation.chat.assistant.images`，不要重复应用补丁。

## 安装

请在正在运行的 Harness 会话之外执行：

```bash
cd /absolute/path/to/deepseek-harness
git clone https://github.com/aa2246740/dsh-image-conatiner.git my-plugins/dsh-image-conatiner

rg -q "conversation.chat.assistant.images" packages/client/ui-conversation/src \
  || git apply my-plugins/dsh-image-conatiner/patches/deepseek-harness-v0.1.0-rc.7-assistant-images.patch

pnpm run build
pnpm dshx ship "$(pwd)/my-plugins/dsh-image-conatiner" --restart
```

仓库已经包含构建后的 `lib/`，安装时无需再次构建插件本身。`dshx` 是 [dsh-external-plugin-devkit](https://github.com/aa2246740/dsh-external-plugin-devkit) 提供的非官方进程外插件工作台。

## 开发

请把仓库 clone 到 `<deepseek-harness>/my-plugins/dsh-image-conatiner`；TypeScript 与打包配置会复用 Harness 工作区合同。

```bash
pnpm install --ignore-workspace
pnpm --ignore-workspace run test
pnpm --ignore-workspace run typecheck
pnpm --ignore-workspace run build
```

贡献流程见 [CONTRIBUTING.md](CONTRIBUTING.md)，安全问题请按 [SECURITY.md](SECURITY.md) 私下报告。

## 许可证

MIT。可选的 Harness 集成补丁修改的是 MIT 许可的 DeepSeek Harness 源码，并保留上游许可证边界。

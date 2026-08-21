[English](README.en.md)

# dsh-image-conatiner

助手刚画出来的图，别再挤成一排小方块。装上这个插件，对话里会变成 Codex 那种大图廊：一张按比例铺开，两三张并排，点开还能全屏翻。

![点开灯箱，再翻下一张](docs/screenshots/lightbox-next.gif)

> 非官方社区插件，跟 DeepSeek 没关系。包名里的 `conatiner` 是故意留的。

## 长什么样

下面是把插件装进 DeepSeek Harness Web 之后拍的，侧栏和输入框都在。

一张，按原图比例：

![单图按自然比例](docs/screenshots/single-natural-ratio.png)

四张一组：

![四图网格](docs/screenshots/grid-four.png)

点开以后有上一张、下一张和计数：

![灯箱 2 / 4](docs/screenshots/lightbox.png)

![翻到下一张 3 / 4](docs/screenshots/lightbox-next.png)

## 安装

在正在跑的 Harness 会话外面执行：

```bash
cd /absolute/path/to/deepseek-harness
git clone https://github.com/aa2246740/dsh-image-conatiner.git my-plugins/dsh-image-conatiner

rg -q "conversation.chat.assistant.images" packages/client/ui-conversation/src \
  || git apply my-plugins/dsh-image-conatiner/patches/deepseek-harness-v0.1.0-rc.7-assistant-images.patch

pnpm run build
pnpm dshx ship "$(pwd)/my-plugins/dsh-image-conatiner" --restart
```

仓库里已经有编好的 `lib/`，不用先给插件自己再 build 一遍。`dshx` 来自 [dsh-external-plugin-devkit](https://github.com/aa2246740/dsh-external-plugin-devkit)。

0.1.0 对着 DeepSeek Harness `v0.1.0-rc.7`（提交 `99f6f02`）试过。它占 `conversation.chat.assistant.images` 这个口子；原版 rc.7 没有，所以上面那行 `git apply` 会补上。源码里已经有的话会跳过，别再打一遍。没装上或选择器不接的时候，对话还是走自带的 `ImageGallery`，图不会消失。

## 它会做什么

- 单图按自然比例，极端长宽比会收一收
- 2–4 张用大号双列；再多就在三列和窄屏双列之间切
- 全屏预览：上一张 / 下一张、计数、键盘、下原图、关掉后焦点回去、失败能重试
- 跟着 Harness 的语义色，深色、窄屏、减少动态都能用

## 开发

把仓库 clone 到 `<deepseek-harness>/my-plugins/dsh-image-conatiner`。TypeScript 和打包会复用 Harness 工作区合同。

```bash
pnpm install --ignore-workspace
pnpm --ignore-workspace run test
pnpm --ignore-workspace run typecheck
pnpm --ignore-workspace run build
```

贡献流程见 [CONTRIBUTING.md](CONTRIBUTING.md)。安全问题按 [SECURITY.md](SECURITY.md) 私下说。

## 许可证

MIT。可选的 Harness 补丁改的是 MIT 许可的上游源码，上游许可证边界还在。

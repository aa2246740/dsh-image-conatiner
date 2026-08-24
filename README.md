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

# 仅 rc.7 需要；rc.8 请跳过：
# rg -q "conversation.chat.assistant.images" packages/client/ui-conversation/src \
#   || git apply my-plugins/dsh-image-conatiner/patches/deepseek-harness-v0.1.0-rc.7-assistant-images.patch

pnpm dshx ship "$(pwd)/my-plugins/dsh-image-conatiner" --restart
```

仓库里已经有编好的 `lib/`，不用先给插件自己再 build 一遍。`dshx` 来自 [dsh-external-plugin-devkit](https://github.com/aa2246740/dsh-external-plugin-devkit)。

**0.2.0** 对着 DeepSeek Harness `v0.1.0-rc.8`（提交 `141eb6fe`）试过。它占 rc.8 已经有的原生槽位 `conversation.message.images`，并用优先级 `-10` 盖住内置画廊——**不要在 rc.8 上再打 rc.7 那份源码补丁**。

还在 rc.7 上的话，先 checkout 标签 `v0.1.0` 再 ship。0.1.0 占的是补丁加上的 `conversation.chat.assistant.images`。没装上的时候，对话还是走自带的画廊，图不会消失。

如果旧安装是通过 `file:` 写进 profile 依赖的，请改成指向本目录的 `link:` 并重启 Web 宿主，浏览器才会拿到新的 client bundle。

## 它会做什么

- 单图按自然比例，极端长宽比会收一收
- 2–4 张用大号双列；再多就在三列和窄屏双列之间切
- 全屏预览：上一张 / 下一张、计数、键盘、下原图、关掉后焦点回去、失败能重试
- 跟着 Harness 的语义色，深色、窄屏、减少动态都能用

## 开发

把仓库 clone 到 `<deepseek-harness>/my-plugins/dsh-image-conatiner`。重新构建走 dshx 的 `externalClientBundle` 适配器（`tools/dshx/src/client-build.js`），不要用官方仓库内的 `clientBundle()`（那个 helper 只发现 `packages/*/*`）。

```bash
pnpm install --ignore-workspace
pnpm --ignore-workspace run test
pnpm --ignore-workspace run typecheck
pnpm --ignore-workspace run build
```

贡献流程见 [CONTRIBUTING.md](CONTRIBUTING.md)。安全问题按 [SECURITY.md](SECURITY.md) 私下说。

## 许可证

MIT。可选的 Harness 补丁（仅 rc.7）改的是 MIT 许可的上游源码，上游许可证边界还在。

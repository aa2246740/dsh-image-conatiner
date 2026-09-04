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

不需要 dshx。默认走官方 `dsh`。仓库里已经有编好的 `lib/`。

```sh
dsh plugin --profile web add github:aa2246740/dsh-image-conatiner
```

或本地 clone：

```sh
git clone https://github.com/aa2246740/dsh-image-conatiner.git
dsh plugin --profile web add ./dsh-image-conatiner
```

然后**重启这个 DSH Host**，**刷新页面**。`dsh plugin add` 只写 profile，不会热挂正在跑的 Host。

卸载：

```sh
dsh plugin --profile web remove dsh-image-conatiner
```

当前源码面向 DeepSeek Harness `dsh-v0.1.2-rc.1`。它使用公开的 `conversation.message.images` 原生槽位，并用优先级 `-10` 盖住内置画廊。`v0.2.0` 仍是面向 `v0.1.0-rc.8` 的已发布版本；两个版本都不需要 rc.7 源码补丁。

还在 rc.7 上的话，先 checkout 标签 `v0.1.0`。0.1.0 占的是补丁加上的 `conversation.chat.assistant.images`：

```text
patches/deepseek-harness-v0.1.0-rc.7-assistant-images.patch
```

没装上的时候，对话还是走自带的画廊，图不会消失。

如果旧安装是通过 `file:` 写进 profile 依赖的，请改成指向本目录的 `link:` 并重启 Web 宿主，浏览器才会拿到新的 client bundle。

## 它会做什么

- 单图按自然比例，极端长宽比会收一收
- 2–4 张用大号双列；再多就在三列和窄屏双列之间切
- 全屏预览：上一张 / 下一张、计数、键盘、下原图、关掉后焦点回去、失败能重试
- 跟着 Harness 的语义色，深色、窄屏、减少动态都能用

## 开发

仓库可以独立放置。重新构建走目标 Harness 中 dshx 的 `externalClientBundle` 适配器；用 `DSHX_HARNESS` 明确指定目标检出，避免读取另一份 Harness 的客户端平台表。

```bash
pnpm install --frozen-lockfile
pnpm test
pnpm typecheck
DSHX_HARNESS=/absolute/path/to/deepseek-harness pnpm build
```

贡献流程见 [CONTRIBUTING.md](CONTRIBUTING.md)。安全问题按 [SECURITY.md](SECURITY.md) 私下说。

## Optional: dshx

已经在用 Agent 对着一份 Harness 检出干活？先装 [dshx](https://github.com/aa2246740/dsh-external-plugin-devkit)，再把那个仓库和本仓库（`https://github.com/aa2246740/dsh-image-conatiner`）一起交给 Agent。后面它自己会装。

## 许可证

MIT。可选的 Harness 补丁（仅 rc.7）改的是 MIT 许可的上游源码，上游许可证边界还在。

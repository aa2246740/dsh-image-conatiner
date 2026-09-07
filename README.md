[English](README.en.md)

# dsh-image-conatiner

助手刚画出来的图按比例铺开，两三张并排，点开全屏翻。包名里的 `conatiner` 是故意留的。

![点开灯箱，再翻下一张](docs/screenshots/lightbox-next.gif)

![单图按自然比例](docs/screenshots/single-natural-ratio.png)

![四图网格](docs/screenshots/grid-four.png)

![灯箱 2 / 4](docs/screenshots/lightbox.png)

![翻到下一张 3 / 4](docs/screenshots/lightbox-next.png)

## 安装

仓库里已经有编好的 `lib/`。

```sh
dsh plugin --profile web add github:aa2246740/dsh-image-conatiner
```

或本地 clone：

```sh
git clone https://github.com/aa2246740/dsh-image-conatiner.git
dsh plugin --profile web add ./dsh-image-conatiner
```

然后重启这个 DSH Host，刷新页面。`dsh plugin add` 只写 profile，不会热挂正在跑的 Host。

```sh
dsh plugin --profile web remove dsh-image-conatiner
```

当前源码面向 DeepSeek Harness `dsh-v0.1.2-rc.1`。它占用公开的 `conversation.message.images` 槽，优先级 `-10`，盖住内置画廊。`v0.2.0` 仍是面向 `v0.1.0-rc.8` 的已发布版本。

还在 rc.7 上的话，先 checkout 标签 `v0.1.0`。0.1.0 占的是补丁加上的 `conversation.chat.assistant.images`：

```text
patches/deepseek-harness-v0.1.0-rc.7-assistant-images.patch
```

没装上的时候，对话还是走自带的画廊。如果旧安装是通过 `file:` 写进 profile 的，改成指向本目录的 `link:` 并重启 Web 宿主。

## 开发

```bash
pnpm install --frozen-lockfile
pnpm test
pnpm typecheck
DSHX_HARNESS=/absolute/path/to/deepseek-harness pnpm build
```

用 `DSHX_HARNESS` 指定目标检出。贡献流程见 [CONTRIBUTING.md](CONTRIBUTING.md)。安全问题按 [SECURITY.md](SECURITY.md) 私下说。

## 许可

MIT。可选的 Harness 补丁仅用于 rc.7，改的是 MIT 许可的上游源码。

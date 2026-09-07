[中文](README.md)

# dsh-image-conatiner

Generated images in the chat use a larger gallery: one image at its natural ratio, a few side by side, fullscreen paging on click. The `conatiner` spelling in the package name is intentional.

![Open the lightbox, then next](docs/screenshots/lightbox-next.gif)

![Single image at natural ratio](docs/screenshots/single-natural-ratio.png)

![Four-image grid](docs/screenshots/grid-four.png)

![Lightbox 2 / 4](docs/screenshots/lightbox.png)

![Next image 3 / 4](docs/screenshots/lightbox-next.png)

## Install

The repo already ships built `lib/`.

```sh
dsh plugin --profile web add github:aa2246740/dsh-image-conatiner
```

Or from a clone:

```sh
git clone https://github.com/aa2246740/dsh-image-conatiner.git
dsh plugin --profile web add ./dsh-image-conatiner
```

Then restart that DSH Host and reload the page. `dsh plugin add` writes the profile. It does not hot-load a running Host.

```sh
dsh plugin --profile web remove dsh-image-conatiner
```

Current source targets DeepSeek Harness `dsh-v0.1.2-rc.1`. It uses the public `conversation.message.images` slot and shadows the built-in gallery at priority `-10`. `v0.2.0` remains the published `v0.1.0-rc.8` release.

On rc.7, check out tag `v0.1.0`. That version occupies the patched `conversation.chat.assistant.images` slot:

```text
patches/deepseek-harness-v0.1.0-rc.7-assistant-images.patch
```

Without the plugin, chat still uses the built-in gallery. If an older install used a `file:` profile dependency, change it to `link:` pointing at this directory and restart the Web host.

## Develop

```bash
pnpm install --frozen-lockfile
pnpm test
pnpm typecheck
DSHX_HARNESS=/absolute/path/to/deepseek-harness pnpm build
```

Set `DSHX_HARNESS` to the target checkout. See [CONTRIBUTING.md](CONTRIBUTING.md). Report security issues privately via [SECURITY.md](SECURITY.md).

## License

MIT. The optional Harness patch is rc.7 only and edits MIT-licensed upstream source.

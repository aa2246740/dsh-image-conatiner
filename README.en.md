[中文](README.md)

# dsh-image-conatiner

```sh
dsh plugin --profile web add github:aa2246740/dsh-image-conatiner
```

You need official `dsh` on PATH (or `npx @deepseek-ai/dsh`) and **pnpm**. Then restart that Host and reload the page. `dsh plugin add` writes the profile. It does not hot-load a running Host.

Generated images in the chat use a larger gallery: one image at its natural ratio, a few side by side, fullscreen paging on click. The `conatiner` spelling in the package name is intentional.

![Open the lightbox, then next](docs/screenshots/lightbox-next.gif)

![Single image at natural ratio](docs/screenshots/single-natural-ratio.png)

![Four-image grid](docs/screenshots/grid-four.png)

![Lightbox 2 / 4](docs/screenshots/lightbox.png)

![Next image 3 / 4](docs/screenshots/lightbox-next.png)

## Install

That `github:` command works because this package declares `dsh.bundle.patch` and commits built `lib/`. Official `dsh plugin add` runs pnpm in `$DSH_HOME/profiles/web` and appends this package to `dsh.profile.bundles`. You do not need Creator Mode or a second toolchain.

If `dsh` is not on PATH:

```sh
npx @deepseek-ai/dsh plugin --profile web add github:aa2246740/dsh-image-conatiner
```

Or from a clone:

```sh
git clone https://github.com/aa2246740/dsh-image-conatiner.git
dsh plugin --profile web add ./dsh-image-conatiner
```

```sh
dsh plugin --profile web remove dsh-image-conatiner
```

Targets official DeepSeek Harness **0.1.5-rc.3** (tag `dsh-v0.1.5-rc.3`, npm `@deepseek-ai/dsh@0.1.5-rc.3`). It uses the public `conversation.message.images` slot and shadows the built-in gallery at priority `-10`. Peers are `^0.1.5-rc.3`: `^0.1.2-rc.1` does not accept `0.1.5-rc.3`. Do not install it against `0.1.7` alphas. `v0.2.0` remains the published `v0.1.0-rc.8` release.

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
```

Committed `lib/` is what the official `github:` install loads. Rebuilding the client is in [CONTRIBUTING.md](CONTRIBUTING.md). Report security issues privately via [SECURITY.md](SECURITY.md).

## License

MIT. The optional Harness patch is rc.7 only and edits MIT-licensed upstream source.

[中文](README.md)

# dsh-image-conatiner

Assistant-generated images shouldn't land as a strip of tiny tiles. This plugin swaps that for a Codex-style gallery: one image keeps a useful ratio, two to four sit in a large grid, and a click opens a real lightbox.

![Open the lightbox, then go to the next image](docs/screenshots/lightbox-next.gif)

> Unofficial community plugin. Not affiliated with DeepSeek. The `conatiner` spelling in the package name is intentional.

## What it looks like

These were taken in DeepSeek Harness Web after installing the plugin. Sidebar and composer are the real chrome.

One image, natural ratio:

![Single image at a natural aspect ratio](docs/screenshots/single-natural-ratio.png)

A set of four:

![Four-image grid](docs/screenshots/grid-four.png)

Open one and you get previous / next plus a counter:

![Lightbox at 2 / 4](docs/screenshots/lightbox.png)

![Next image, 3 / 4](docs/screenshots/lightbox-next.png)

## Install

Run this outside a live Harness conversation:

```bash
cd /absolute/path/to/deepseek-harness
git clone https://github.com/aa2246740/dsh-image-conatiner.git my-plugins/dsh-image-conatiner

rg -q "conversation.chat.assistant.images" packages/client/ui-conversation/src \
  || git apply my-plugins/dsh-image-conatiner/patches/deepseek-harness-v0.1.0-rc.7-assistant-images.patch

pnpm run build
pnpm dshx ship "$(pwd)/my-plugins/dsh-image-conatiner" --restart
```

The repo already ships built `lib/`, so you don't need to build the plugin itself. `dshx` comes from [dsh-external-plugin-devkit](https://github.com/aa2246740/dsh-external-plugin-devkit).

0.1.0 is tested against DeepSeek Harness `v0.1.0-rc.7` at commit `99f6f02`. It claims `conversation.chat.assistant.images`. Stock rc.7 doesn't have that slot, so the `git apply` line above adds it. Skip the patch if your checkout already has the slot. If the plugin isn't installed or its selector declines, `ui-conversation` keeps the built-in `ImageGallery` — images don't disappear.

## What it does

- One image keeps a useful natural ratio; extreme ratios get clamped
- Two to four images use a large two-column grid; larger sets switch between three columns and a narrow two-column layout
- Full-screen preview: previous / next, counter, keyboard, original download, focus restore, retry
- Follows Harness semantic tokens, including dark mode, narrow viewports, and reduced motion

## Develop

Clone this repo at `<deepseek-harness>/my-plugins/dsh-image-conatiner`. TypeScript and the bundle config reuse the Harness workspace contracts.

```bash
pnpm install --ignore-workspace
pnpm --ignore-workspace run test
pnpm --ignore-workspace run typecheck
pnpm --ignore-workspace run build
```

See [CONTRIBUTING.md](CONTRIBUTING.md) for the contribution workflow and [SECURITY.md](SECURITY.md) for private vulnerability reporting.

## License

MIT. The optional Harness integration patch edits MIT-licensed upstream source and keeps that license boundary.

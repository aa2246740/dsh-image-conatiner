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

You do **not** need dshx. The default path is official `dsh`. The repo already ships built `lib/`.

```sh
dsh plugin --profile web add github:aa2246740/dsh-image-conatiner
```

Or from a clone:

```sh
git clone https://github.com/aa2246740/dsh-image-conatiner.git
dsh plugin --profile web add ./dsh-image-conatiner
```

Then **restart that DSH Host** and **reload the page**. `dsh plugin add` writes the profile; it does not hot-load a running Host.

Remove:

```sh
dsh plugin --profile web remove dsh-image-conatiner
```

The current source targets DeepSeek Harness `dsh-v0.1.2-rc.1`. It uses the public native `conversation.message.images` slot and shadows the built-in gallery at priority `-10`. `v0.2.0` remains the published `v0.1.0-rc.8` release; neither version needs the rc.7 source patch.

On rc.7, check out tag `v0.1.0`. That release occupies the patched `conversation.chat.assistant.images` chain slot:

```text
patches/deepseek-harness-v0.1.0-rc.7-assistant-images.patch
```

If the plugin isn't installed, `ui-conversation` keeps the built-in gallery — images don't disappear.

If you already installed an older checkout as a `file:` profile dependency, retarget it to this directory with `link:` and restart the Web host so the browser receives the new client bundle.

## What it does

- One image keeps a useful natural ratio; extreme ratios get clamped
- Two to four images use a large two-column grid; larger sets switch between three columns and a narrow two-column layout
- Full-screen preview: previous / next, counter, keyboard, original download, focus restore, retry
- Follows Harness semantic tokens, including dark mode, narrow viewports, and reduced motion

## Develop

The repository can live outside Harness. Rebuilds use the target Harness dshx `externalClientBundle` adapter; set `DSHX_HARNESS` explicitly so the build reads the intended client platform table.

```bash
pnpm install --frozen-lockfile
pnpm test
pnpm typecheck
DSHX_HARNESS=/absolute/path/to/deepseek-harness pnpm build
```

See [CONTRIBUTING.md](CONTRIBUTING.md) for the contribution workflow and [SECURITY.md](SECURITY.md) for private vulnerability reporting.

## Optional: dshx

Already using an Agent against a Harness checkout? Install [dshx](https://github.com/aa2246740/dsh-external-plugin-devkit), then give the Agent both that repo and this one (`https://github.com/aa2246740/dsh-image-conatiner`). It can take it from there.

## License

MIT. The optional Harness integration patch (rc.7 only) edits MIT-licensed upstream source and keeps that license boundary.

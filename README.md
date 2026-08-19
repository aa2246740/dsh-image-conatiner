# dsh-image-conatiner

A DeepSeek Harness client plugin that replaces compact assistant-image tiles with a responsive, Codex-style generated-image gallery.

The package name intentionally preserves the requested `conatiner` spelling.

> This is an unofficial community plugin. It is not affiliated with or endorsed by DeepSeek.

## Experience

- one image keeps a useful natural aspect ratio;
- two to four images use a large two-column composition;
- larger groups adapt between three and two columns;
- full-screen group preview includes previous/next controls, a counter, keyboard navigation, original-file download, focus restoration, and retry;
- the gallery uses Harness semantic tokens, dark mode, narrow viewports, and reduced-motion preferences.

The plugin claims `conversation.chat.assistant.images`. If it is absent or its selector declines, `ui-conversation` keeps the built-in `ImageGallery` fallback, so transcript rendering remains available.

## Compatibility

Version 0.1.0 is tested against DeepSeek Harness `v0.1.0-rc.7` at commit `99f6f02`. It requires the `conversation.chat.assistant.images` chain slot. The slot is not present in the stock rc.7 source, so this repository includes a minimal, MIT-compatible integration patch:

```text
patches/deepseek-harness-v0.1.0-rc.7-assistant-images.patch
```

Do not apply the patch if your Harness checkout already contains `conversation.chat.assistant.images`.

## Install

Run these commands from outside a live Harness conversation:

```bash
cd /absolute/path/to/deepseek-harness
git clone https://github.com/aa2246740/dsh-image-conatiner.git my-plugins/dsh-image-conatiner

rg -q "conversation.chat.assistant.images" packages/client/ui-conversation/src \
  || git apply my-plugins/dsh-image-conatiner/patches/deepseek-harness-v0.1.0-rc.7-assistant-images.patch

pnpm run build
pnpm dshx ship "$(pwd)/my-plugins/dsh-image-conatiner" --restart
```

The repository includes the built `lib/` package, so installation does not require rebuilding the plugin itself. `dshx` is the unofficial external plugin workshop from [dsh-external-plugin-devkit](https://github.com/aa2246740/dsh-external-plugin-devkit).

## Develop

Clone this repository at `<deepseek-harness>/my-plugins/dsh-image-conatiner`; its TypeScript and bundle configuration intentionally reuse the Harness workspace contracts.

```bash
pnpm install --ignore-workspace
pnpm --ignore-workspace run test
pnpm --ignore-workspace run typecheck
pnpm --ignore-workspace run build
```

See [CONTRIBUTING.md](CONTRIBUTING.md) for the contribution workflow and [SECURITY.md](SECURITY.md) for private vulnerability reporting.

## License

MIT. The optional Harness integration patch modifies MIT-licensed DeepSeek Harness source and retains the upstream license boundary.

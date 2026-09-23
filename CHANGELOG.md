# Changelog

All notable changes to this project are documented in this file.

## 0.2.1 - 2026-09-23

- Lead the README with the official stock install: `dsh plugin --profile web add github:aa2246740/dsh-image-conatiner`, then restart the Host and reload. Requires pnpm. The package already declares `dsh.bundle.patch` and commits `lib/`.
- Target official DeepSeek Harness `0.1.5-rc.3` (`dsh-v0.1.5-rc.3`, `@deepseek-ai/dsh@0.1.5-rc.3`) through its public Chat slot, locale, and renderer client APIs. Peer ranges are `^0.1.5-rc.3` because `^0.1.2-rc.1` does not accept `0.1.5-rc.3`. This line does not target `0.1.7` alphas.
- Remove the deleted client-runtime dependency and make the external client build select its Harness platform table through `DSHX_HARNESS`.
- Render RC1 optimistic image previews directly while continuing to load durable attachment references through the authorized loader.
- Keep the existing gallery, lightbox, accessibility, retry, and download behavior unchanged.

## 0.2.0 - 2026-08-24

- Target DeepSeek Harness `v0.1.0-rc.8` and the native `conversation.message.images` single slot.
- Shadow the built-in attachment gallery at priority `-10` instead of occupying a patched rc.7 chain slot.
- Accept owner props (`images`, `loadImage`) directly; rc.8 no longer injects a chain `matched` share.
- Build the browser half with dshx `externalClientBundle` so an out-of-tree `my-plugins` package can emit RC8 lazy-CJS without living under `packages/*/*`.
- Keep 0.1.0 and the rc.7 integration patch for older checkouts; do not apply that patch on rc.8.

## 0.1.0 - 2026-08-19

- Added a responsive one-to-many assistant image gallery.
- Added a full-screen group lightbox with keyboard navigation, focus restoration, thumbnails, retry, and original-file download.
- Added light, dark, narrow-screen, coarse-pointer, and reduced-motion styling.
- Added a minimal DeepSeek Harness rc.7 assistant-image chain-slot integration patch.
- Added Chinese and English locale dictionaries, tests, and portable dshx packaging.

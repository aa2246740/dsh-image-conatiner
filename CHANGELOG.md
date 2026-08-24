# Changelog

All notable changes to this project are documented in this file.

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

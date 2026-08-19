# Contributing

Thanks for helping improve `dsh-image-conatiner`.

## Development setup

Clone the repository into `<deepseek-harness>/my-plugins/dsh-image-conatiner`. The project intentionally consumes DeepSeek Harness workspace types and its shared client bundler.

```bash
pnpm install --ignore-workspace
pnpm --ignore-workspace run test
pnpm --ignore-workspace run typecheck
pnpm --ignore-workspace run build
```

Keep changes inside the plugin unless an image-slot contract change is required. If the Harness seam changes, update the pinned patch and its compatibility note together. Preserve the public package name, including the intentional `conatiner` spelling.

Before submitting a change, verify the gallery in light and dark themes, at desktop and 390px widths, and exercise open, previous, next, Escape, download, retry, and focus restoration.

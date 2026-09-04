# Contributing

Thanks for helping improve `dsh-image-conatiner`.

## Development setup

Clone the repository anywhere. Rebuilds use the target Harness dshx `externalClientBundle` adapter; set `DSHX_HARNESS` explicitly so an unrelated checkout cannot supply the client platform table.

```bash
pnpm install --frozen-lockfile
pnpm test
pnpm typecheck
DSHX_HARNESS=/absolute/path/to/deepseek-harness pnpm build
```

Keep changes inside the plugin unless an image-slot contract change is required. If the Harness seam changes, update the compatibility note (and the rc.7 patch only when targeting rc.7). Preserve the public package name, including the intentional `conatiner` spelling.

Before submitting a change, verify the gallery in light and dark themes, at desktop and 390px widths, and exercise open, previous, next, Escape, download, retry, and focus restoration.

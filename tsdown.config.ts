import { existsSync, readFileSync } from 'node:fs'
import { homedir } from 'node:os'
import { join, resolve } from 'node:path'
import { pathToFileURL, fileURLToPath } from 'node:url'
import type { TsdownPlugin, UserConfig } from 'tsdown'

const vendored = fileURLToPath(new URL('./tools/client-build.js', import.meta.url))

function resolveHarnessAdapter(): string {
  const configured = process.env.DSHX_HARNESS?.trim()
  const configPath = join(homedir(), '.config/dshx/harness')
  const recorded = existsSync(configPath) ? readFileSync(configPath, 'utf8').trim() : undefined
  const selected = configured === undefined || configured.length === 0 ? recorded : configured
  if (!selected) throw new Error('dshx client build requires a Harness root from DSHX_HARNESS or ~/.config/dshx/harness')
  return join(resolve(selected), 'tools/dshx/src/client-build.js')
}

const adapter = existsSync(vendored) ? vendored : resolveHarnessAdapter()
if (!existsSync(adapter)) throw new Error(`dshx client build adapter not found: ${adapter}`)
const { externalClientBundle } = await import(pathToFileURL(adapter).href)

const bundle = externalClientBundle('dsh-image-conatiner', [
  'lib/types/index.js',
  'lib/types/invariant.js',
], { clientEntry: 'src/client/index.ts' }) as UserConfig[]

const portableOutput: TsdownPlugin = {
  name: 'dsh-image-conatiner-portable-output',
  generateBundle(_options, output) {
    const client = output['client.js']
    if (client?.type !== 'chunk') this.error('client.js was not emitted')
    client.code = client.code.replace(
      /^([ \t]*\/\/#region \\0dshx-css-module:).*[\\/]([^/\\\r\n]+\.module\.css\.mjs)(\r?)$/gmu,
      '$1$2$3',
    )
    if (/^.*\/\/#region \\0dshx-css-module:.*[\\/].*$/mu.test(client.code)) {
      this.error('client.js contains a non-portable CSS module path')
    }
  },
}

export default bundle.map((config) => {
  if (config.name !== 'dsh-image-conatiner/client') return config
  const plugins = Array.isArray(config.plugins)
    ? config.plugins
    : config.plugins === undefined
      ? []
      : [config.plugins]
  return { ...config, plugins: [...plugins, portableOutput] }
})

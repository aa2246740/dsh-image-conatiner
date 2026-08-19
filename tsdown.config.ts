import { clientBundle } from '../../packages/client/tsdown.client.ts'

const bundle = clientBundle('dsh-image-conatiner', ['lib/types/index.js', 'lib/types/invariant.js'])

export default ((inlineConfig) => bundle(inlineConfig).map((config) => {
  if (config.name !== 'dsh-image-conatiner/client') return config
  const plugins = Array.isArray(config.plugins)
    ? config.plugins
    : config.plugins === undefined
      ? []
      : [config.plugins]
  return {
    ...config,
    plugins: [...plugins, {
      name: 'dsh-image-conatiner-portable-output',
      generateBundle(_options, output) {
        const client = output['client.js']
        if (client?.type !== 'chunk') this.error('client.js was not emitted')
        client.code = client.code.replace(
          /^([ \t]*\/\/#region \\0dsh-css:).*[\\/]([^/\\\r\n]+\.module\.css\.mjs)(\r?)$/gmu,
          '$1$2$3',
        )
        if (/^.*\/\/#region \\0dsh-css:.*[\\/].*$/mu.test(client.code)) {
          this.error('client.js contains a non-portable CSS module path')
        }
      },
    }],
  }
})) satisfies typeof bundle

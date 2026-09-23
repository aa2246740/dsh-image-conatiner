import { existsSync, readFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import semver from 'semver'
import { describe, expect, it } from 'vitest'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const pkg = JSON.parse(readFileSync(resolve(root, 'package.json'), 'utf8')) as {
  main: string
  scripts?: { prepare?: string }
  exports: Record<string, unknown>
  dsh: { bundle: { patch: string } }
  peerDependencies: Record<string, string>
  devDependencies: Record<string, string>
}

const HARNESS_PEERS = [
  '@deepseek-ai/dsh-invariants',
  '@deepseek-ai/dsh-client-ui-chat',
] as const

describe('stock dsh plugin add', () => {
  it('declares dsh.bundle.patch so official add joins the profile layer stack', () => {
    expect(pkg.dsh.bundle.patch).toBe('./cordis.patch.yml')
    expect(existsSync(resolve(root, 'cordis.patch.yml'))).toBe(true)
  })

  it('commits compiled lib entries and does not require a prepare script', () => {
    expect(pkg.scripts?.prepare).toBeUndefined()
    expect(pkg.main).toBe('lib/index.js')
    expect(pkg.exports['./client']).toBe('./lib/client.js')
    expect(existsSync(resolve(root, 'lib/index.js'))).toBe(true)
    expect(existsSync(resolve(root, 'lib/client.js'))).toBe(true)
  })

  it('accepts official 0.1.5-rc.3 and refuses 0.1.7 alphas', () => {
    for (const name of HARNESS_PEERS) {
      expect(pkg.peerDependencies[name]).toBe('^0.1.5-rc.3')
      expect(pkg.devDependencies[name]).toBe('0.1.5-rc.3')
      const range = pkg.peerDependencies[name] ?? ''
      expect(semver.satisfies('0.1.5-rc.3', range)).toBe(true)
      expect(semver.satisfies('0.1.5-rc.3', '^0.1.2-rc.1')).toBe(false)
      expect(semver.satisfies('0.1.7-alpha.1', range)).toBe(false)
      expect(semver.satisfies('0.1.7-alpha.2', range)).toBe(false)
    }
  })
})

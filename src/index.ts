/** Host half for the Codex-style assistant image gallery plugin. */
import type { Context } from '@deepseek-ai/cordis'

export const name = 'dsh-image-conatiner'
export const inject = []

/** Mount the package so its browser declaration joins the Web plugin graph. */
export function apply(_ctx: Context): void {
  console.log('[my-plugins/dsh-image-conatiner] loaded')
}

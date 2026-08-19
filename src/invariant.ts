/** Package-owned invariant companion for dsh-image-conatiner. */
import type { Context } from '@deepseek-ai/cordis'
import type { InvariantInstaller } from '@deepseek-ai/dsh-invariants'

const PACKAGE_NAME = 'dsh-image-conatiner'

export const name = 'dsh-image-conatiner-invariant'
export const inject = ['invariants']

// No runtime invariant: this package contributes browser presentation only;
// the client slot registry owns contribution and disposal checks.
const install: InvariantInstaller = () => {}

export const apply = (ctx: Context): Promise<() => void> =>
  Promise.resolve(ctx.invariants.register(PACKAGE_NAME, install))

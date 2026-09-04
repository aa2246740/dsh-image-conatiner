/** Browser registration for the Codex-style assistant image gallery. */
import type { Context as ClientContext } from '@deepseek-ai/cordis'
import type {} from '@deepseek-ai/dsh-client-locale/client'
import type {} from '@deepseek-ai/dsh-client-ui-chat/client'
import type {} from '@deepseek-ai/dsh-client-ui-renderer/client'
import { ImageContainer } from './ImageContainer.tsx'
import { en, zh, type ImageContainerKey } from './locales.ts'

declare module '@deepseek-ai/dsh-client-ui-slots' {
  interface LocaleNamespaceMap {
    'image-container': ImageContainerKey
  }
}

const NS = 'image-container'

export const name = 'dsh-image-conatiner-client'
export const inject = ['slots', 'locale']

/**
 * Register dictionaries and claim every non-empty message image group.
 *
 * Current Harness releases dispatch the native single slot
 * `conversation.message.images` (the rc.7 patch slot
 * `conversation.chat.assistant.images` no longer exists), and the built-in
 * ui-attachment entry already owns priority 0 there — a lower priority
 * shadows it for every group (the cell's lowest live entry renders).
 */
export function apply(ctx: ClientContext): void {
  ctx.effect(() => ctx.locale.register(NS, { zh, en }), 'dsh-image-conatiner: dictionaries')
  ctx.slots.inject('conversation.message.images', () => ctx.slots.register({
    name: 'conversation.message.images',
    priority: -10,
    locale: NS,
  }, ImageContainer))
}

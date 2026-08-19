/** Browser registration for the Codex-style assistant image gallery. */
import type { ClientContext } from '@deepseek-ai/dsh-client-runtime/client'
import type { AssistantImageGroupOwnerProps } from '@deepseek-ai/dsh-client-ui-conversation/client'
import type {} from '@deepseek-ai/dsh-client-locale/client'
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

function selectImages(owner: AssistantImageGroupOwnerProps): AssistantImageGroupOwnerProps | null {
  return owner.images.length === 0 ? null : owner
}

/** Register dictionaries and claim every non-empty assistant image group. */
export function apply(ctx: ClientContext): void {
  ctx.effect(() => ctx.locale.register(NS, { zh, en }), 'dsh-image-conatiner: dictionaries')
  ctx.slots.inject('conversation.chat.assistant.images', () => ctx.slots.register({
    name: 'conversation.chat.assistant.images',
    select: selectImages,
    locale: NS,
  }, ImageContainer))
}

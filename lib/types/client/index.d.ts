/** Browser registration for the Codex-style assistant image gallery. */
import type { ClientContext } from '@deepseek-ai/dsh-client-runtime/client';
import { type ImageContainerKey } from './locales.ts';
declare module '@deepseek-ai/dsh-client-ui-slots' {
    interface LocaleNamespaceMap {
        'image-container': ImageContainerKey;
    }
}
export declare const name = "dsh-image-conatiner-client";
export declare const inject: string[];
/**
 * Register dictionaries and claim every non-empty message image group.
 *
 * Since harness rc.8 the render site dispatches the native single slot
 * `conversation.message.images` (the rc.7 patch slot
 * `conversation.chat.assistant.images` no longer exists), and the built-in
 * ui-attachment entry already owns priority 0 there — a lower priority
 * shadows it for every group (the cell's lowest live entry renders).
 */
export declare function apply(ctx: ClientContext): void;
//# sourceMappingURL=index.d.ts.map
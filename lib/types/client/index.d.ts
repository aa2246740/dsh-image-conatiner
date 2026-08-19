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
/** Register dictionaries and claim every non-empty assistant image group. */
export declare function apply(ctx: ClientContext): void;
//# sourceMappingURL=index.d.ts.map
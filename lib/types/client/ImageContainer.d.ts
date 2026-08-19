import type { ReactNode } from 'react';
import type { AssistantImageGroupOwnerProps } from '@deepseek-ai/dsh-client-ui-conversation/client';
import type { PropsLocale, PropsRuntime } from '@deepseek-ai/dsh-client-ui-slots';
type ImageContainerProps = PropsRuntime<'conversation.chat.assistant.images'> & {
    matched: AssistantImageGroupOwnerProps;
} & PropsLocale<'image-container'>;
/** Codex-style responsive gallery and group-aware original-image preview. */
export declare function ImageContainer({ matched, t }: ImageContainerProps): ReactNode;
export {};
//# sourceMappingURL=ImageContainer.d.ts.map
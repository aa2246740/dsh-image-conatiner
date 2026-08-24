import type { ReactNode } from 'react';
import type { PropsLocale, PropsRuntime } from '@deepseek-ai/dsh-client-ui-slots';
type ImageContainerProps = PropsRuntime<'conversation.message.images'> & PropsLocale<'image-container'>;
/** Codex-style responsive gallery and group-aware original-image preview. */
export declare function ImageContainer({ images, loadImage, t }: ImageContainerProps): ReactNode;
export {};
//# sourceMappingURL=ImageContainer.d.ts.map
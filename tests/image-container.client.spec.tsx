// @vitest-environment jsdom

import { afterEach, describe, expect, it, vi } from 'vitest'
import { cleanup, fireEvent, render, waitFor, within } from '@testing-library/react'
import type { ImageAttachmentRef } from '@deepseek-ai/dsh-attachment'

vi.mock('@deepseek-ai/dsh-client-ui-primitives', () => {
  const Icon = ({ size }: { size?: number }) => <svg width={size} height={size} />
  return {
    IconChevronLeftOutline14: Icon,
    IconChevronRightOutline14: Icon,
    IconCloseOutline16: Icon,
    IconDownloadOutline16: Icon,
    IconFullscreenOutline16: Icon,
    IconRefreshOutline16: Icon,
  }
})

import { ImageContainer } from '../src/client/ImageContainer.tsx'
import { zh, type ImageContainerKey } from '../src/client/locales.ts'

afterEach(() => {
  cleanup()
  document.body.style.overflow = ''
})

type ImageContainerProps = Parameters<typeof ImageContainer>[0]

const t = ((key: ImageContainerKey, params?: Record<string, unknown>): string => {
  let value = zh[key]
  for (const [name, replacement] of Object.entries(params ?? {})) {
    value = value.replace(`{${name}}`, String(replacement))
  }
  return value
}) as ImageContainerProps['t']

function attachment(index: number): ImageAttachmentRef {
  return {
    attachmentId: `sha256:${String(index).repeat(64)}` as ImageAttachmentRef['attachmentId'],
    mediaType: 'image/png',
    bytes: 68,
    width: 1200,
    height: 900,
    name: `generated-${String(index)}.png`,
  }
}

function props(
  count: number,
  loadImage: ImageContainerProps['loadImage'] = async item => `blob:${String(item.attachmentId)}`,
): ImageContainerProps {
  return {
    images: Array.from({ length: count }, (_, index) => ({ attachment: attachment(index + 1) })),
    loadImage,
    t,
  } as ImageContainerProps
}

describe('ImageContainer', () => {
  it('renders four generated images as one large group instead of thumbnail-sized atoms', async () => {
    const view = render(<ImageContainer {...props(4)} />)
    const gallery = view.getByRole('group', { name: '生成图片' })

    expect(gallery.getAttribute('data-count')).toBe('4')
    expect(gallery.querySelectorAll('button')).toHaveLength(4)
    expect(await view.findAllByRole('img')).toHaveLength(4)
  })

  it('previews the selected group image with navigation, download, Escape, and focus restore', async () => {
    const view = render(<ImageContainer {...props(4)} />)
    const opener = await view.findByRole('button', { name: '查看图片 generated-2.png' })
    fireEvent.click(opener)

    const dialog = view.getByRole('dialog', { name: '图片预览' })
    expect(dialog.textContent).toContain('2 / 4')
    expect(view.getByRole('link', { name: '下载原图' }).getAttribute('download')).toBe('generated-2.png')
    expect(document.body.style.overflow).toBe('hidden')

    fireEvent.keyDown(window, { key: 'ArrowRight' })
    expect(dialog.textContent).toContain('3 / 4')
    expect(within(dialog).getByRole('img', { name: 'generated-3.png' })).toBeTruthy()

    fireEvent.keyDown(window, { key: 'Escape' })
    expect(view.queryByRole('dialog', { name: '图片预览' })).toBeNull()
    expect(document.activeElement).toBe(opener)
    expect(document.body.style.overflow).toBe('')
  })

  it('lets one failed image retry without replacing the rest of the group', async () => {
    const loadImage = vi.fn<ImageContainerProps['loadImage']>()
      .mockRejectedValueOnce(new Error('temporary'))
      .mockResolvedValue('blob:recovered')
    const view = render(<ImageContainer {...props(1, loadImage)} />)

    const retry = await view.findByRole('button', { name: '重试加载 generated-1.png' })
    fireEvent.click(retry)
    await view.findByRole('img', { name: 'generated-1.png' })
    await waitFor(() => { expect(loadImage).toHaveBeenCalledTimes(2) })
  })

  it('numbers duplicate source names so downloading a generated group does not overwrite files', async () => {
    const input = props(2)
    const duplicateNames = {
      ...input,
      images: input.images.map(({ attachment: item }) => ({
        attachment: { ...item, name: 'generated.jpg' },
      })),
    } as ImageContainerProps
    const view = render(<ImageContainer {...duplicateNames} />)
    const openers = await view.findAllByRole('button', { name: '查看图片 generated.jpg' })
    fireEvent.click(openers[1] as HTMLButtonElement)

    expect(view.getByRole('link', { name: '下载原图' }).getAttribute('download')).toBe('generated-2.jpg')
  })

  it('renders an optimistic RC1 preview directly without calling the durable loader', () => {
    const loadImage = vi.fn<ImageContainerProps['loadImage']>()
    const view = render(<ImageContainer
      images={[{ preview: { url: 'blob:optimistic', name: 'upload.png', width: 640, height: 480 } }]}
      loadImage={loadImage}
      t={t}
    />)

    const image = view.getByRole('img', { name: 'upload.png' })
    expect(image.getAttribute('src')).toBe('blob:optimistic')
    expect(loadImage).not.toHaveBeenCalled()
  })
})

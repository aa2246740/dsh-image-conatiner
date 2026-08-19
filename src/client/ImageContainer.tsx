import { useCallback, useEffect, useId, useMemo, useRef, useState } from 'react'
import type { CSSProperties, ReactNode } from 'react'
import { createPortal } from 'react-dom'
import type { ImageAttachmentRef } from '@deepseek-ai/dsh-attachment'
import {
  IconChevronLeftOutline14, IconChevronRightOutline14, IconCloseOutline16,
  IconDownloadOutline16, IconFullscreenOutline16, IconRefreshOutline16,
} from '@deepseek-ai/dsh-client-ui-primitives'
import type { AssistantImageGroupOwnerProps } from '@deepseek-ai/dsh-client-ui-conversation/client'
import type { PropsLocale, PropsRuntime } from '@deepseek-ai/dsh-client-ui-slots'
import css from './ImageContainer.module.css'

type ImageContainerProps = PropsRuntime<'conversation.chat.assistant.images'>
  & { matched: AssistantImageGroupOwnerProps }
  & PropsLocale<'image-container'>

type Translator = ImageContainerProps['t']

type AssetState =
  | { status: 'loading' }
  | { status: 'loaded'; src: string }
  | { status: 'error' }

interface GalleryItem {
  key: string
  attachment: ImageAttachmentRef
  index: number
}

interface ImageAssetProps {
  item: GalleryItem
  count: number
  state: AssetState
  attempt: number
  loadImage: AssistantImageGroupOwnerProps['loadImage']
  onState: (key: string, state: AssetState) => void
  onOpen: (index: number, opener: HTMLElement) => void
  onRetry: (key: string) => void
  t: Translator
}

const LOADING: AssetState = { status: 'loading' }

function itemKey(attachment: ImageAttachmentRef, index: number): string {
  return `${String(attachment.attachmentId)}:${String(index)}`
}

function itemName(item: GalleryItem, t: Translator): string {
  return item.attachment.name ?? t('image.name', { index: item.index + 1 })
}

function fileExtension(mediaType: ImageAttachmentRef['mediaType']): string {
  switch (mediaType) {
    case 'image/jpeg': return 'jpg'
    case 'image/webp': return 'webp'
    case 'image/gif': return 'gif'
    default: return 'png'
  }
}

function downloadName(item: GalleryItem, items: readonly GalleryItem[]): string {
  const name = item.attachment.name
  if (name === undefined) return `image-${String(item.index + 1)}.${fileExtension(item.attachment.mediaType)}`
  if (items.filter(candidate => candidate.attachment.name === name).length === 1) return name
  const dot = name.lastIndexOf('.')
  const suffix = `-${String(item.index + 1)}`
  return dot > 0 ? `${name.slice(0, dot)}${suffix}${name.slice(dot)}` : `${name}${suffix}`
}

function sameState(left: AssetState | undefined, right: AssetState): boolean {
  if (left?.status !== right.status) return false
  return left.status !== 'loaded' || (right.status === 'loaded' && left.src === right.src)
}

type RatioStyle = CSSProperties & { '--dic-ratio': string }

function singleStyle(item: GalleryItem, count: number): RatioStyle | undefined {
  if (count !== 1) return undefined
  const natural = item.attachment.width / item.attachment.height
  const ratio = Math.min(1.8, Math.max(0.72, natural))
  return { '--dic-ratio': String(ratio) }
}

function ImageAsset({
  item, count, state, attempt, loadImage, onState, onOpen, onRetry, t,
}: ImageAssetProps): ReactNode {
  useEffect(() => {
    let live = true
    onState(item.key, LOADING)
    void loadImage(item.attachment).then((src) => {
      if (live) onState(item.key, { status: 'loaded', src })
    }).catch(() => {
      if (live) onState(item.key, { status: 'error' })
    })
    return () => { live = false }
  }, [attempt, item.key, loadImage, onState])

  const name = itemName(item, t)
  if (state.status === 'error') {
    return (
      <button
        type="button"
        className={css.retry}
        aria-label={t('image.retry', { name })}
        onClick={() => { onRetry(item.key) }}
      >
        <IconRefreshOutline16 size={18} />
        <span>{t('image.failed')}</span>
      </button>
    )
  }
  return (
    <button
      type="button"
      className={css.tile}
      style={singleStyle(item, count)}
      data-state={state.status}
      aria-label={t('image.openNamed', { name })}
      aria-busy={state.status === 'loading' || undefined}
      title={t('image.open')}
      disabled={state.status === 'loading'}
      onClick={(event) => { onOpen(item.index, event.currentTarget) }}
    >
      {state.status === 'loaded'
        ? <img src={state.src} alt={name} />
        : <span className={css.skeleton}><span className={css.srOnly}>{t('image.loading')}</span></span>}
      <span className={css.expand} aria-hidden="true"><IconFullscreenOutline16 size={16} /></span>
    </button>
  )
}

interface LightboxProps {
  items: readonly GalleryItem[]
  assets: Readonly<Record<string, AssetState | undefined>>
  index: number
  opener: HTMLElement | null
  onIndex: (index: number) => void
  onClose: () => void
  onRetry: (key: string) => void
  t: Translator
}

function Lightbox({ items, assets, index, opener, onIndex, onClose, onRetry, t }: LightboxProps): ReactNode {
  const dialogRef = useRef<HTMLDivElement | null>(null)
  const closeRef = useRef<HTMLButtonElement | null>(null)
  const titleId = useId()
  const count = items.length
  const item = items[index] as GalleryItem
  const state = assets[item.key] ?? LOADING
  const name = itemName(item, t)

  const move = useCallback((delta: number): void => {
    onIndex((index + delta + count) % count)
  }, [count, index, onIndex])

  useEffect(() => {
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    closeRef.current?.focus()
    return () => {
      document.body.style.overflow = previousOverflow
      opener?.focus()
    }
  }, [opener])

  useEffect(() => {
    const onKeyDown = (event: globalThis.KeyboardEvent): void => {
      if (event.key === 'Escape') {
        event.preventDefault()
        onClose()
        return
      }
      if (event.key === 'ArrowLeft' && count > 1) {
        event.preventDefault()
        move(-1)
        return
      }
      if (event.key === 'ArrowRight' && count > 1) {
        event.preventDefault()
        move(1)
        return
      }
      if (event.key !== 'Tab') return
      const focusable = dialogRef.current?.querySelectorAll<HTMLElement>(
        'button:not(:disabled), a[href], [tabindex]:not([tabindex="-1"])',
      )
      if (focusable === undefined || focusable.length === 0) return
      const first = focusable[0] as HTMLElement
      const last = focusable[focusable.length - 1] as HTMLElement
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => { window.removeEventListener('keydown', onKeyDown) }
  }, [count, move, onClose])

  return createPortal(
    <div
      ref={dialogRef}
      className={css.lightbox}
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
    >
      <h2 id={titleId} className={css.srOnly}>{t('preview.title')}</h2>
      <div className={css.mask} aria-hidden="true" onMouseDown={onClose} />

      <div className={css.counter} aria-live="polite">
        {t('preview.counter', { current: index + 1, total: count })}
      </div>

      <div className={css.actions}>
        {state.status === 'loaded' && (
          <a
            className={css.lightboxAction}
            href={state.src}
            download={downloadName(item, items)}
            aria-label={t('preview.download')}
            title={t('preview.download')}
          >
            <IconDownloadOutline16 size={17} />
          </a>
        )}
        <button
          ref={closeRef}
          type="button"
          className={css.lightboxAction}
          aria-label={t('preview.close')}
          title={t('preview.close')}
          onClick={onClose}
        >
          <IconCloseOutline16 size={18} />
        </button>
      </div>

      {count > 1 && (
        <>
          <button
            type="button"
            className={css.nav}
            data-direction="previous"
            aria-label={t('preview.previous')}
            title={t('preview.previous')}
            onClick={() => { move(-1) }}
          >
            <IconChevronLeftOutline14 size={20} />
          </button>
          <button
            type="button"
            className={css.nav}
            data-direction="next"
            aria-label={t('preview.next')}
            title={t('preview.next')}
            onClick={() => { move(1) }}
          >
            <IconChevronRightOutline14 size={20} />
          </button>
        </>
      )}

      <div className={css.stage} aria-live="polite">
        {state.status === 'loaded' && <img className={css.preview} src={state.src} alt={name} />}
        {state.status === 'loading' && (
          <div className={css.previewStatus} role="status">{t('image.loading')}</div>
        )}
        {state.status === 'error' && (
          <button type="button" className={css.previewRetry} onClick={() => { onRetry(item.key) }}>
            <IconRefreshOutline16 size={18} />
            {t('image.retry', { name })}
          </button>
        )}
      </div>

      {count > 1 && (
        <div className={css.filmstrip} aria-label={t('gallery.label')}>
          {items.map((candidate) => {
            const candidateState = assets[candidate.key] ?? LOADING
            return (
              <button
                type="button"
                key={candidate.key}
                className={css.filmstripItem}
                aria-current={candidate.index === index ? 'true' : undefined}
                aria-label={t('image.openNamed', { name: itemName(candidate, t) })}
                onClick={() => { onIndex(candidate.index) }}
              >
                {candidateState.status === 'loaded'
                  ? <img src={candidateState.src} alt="" />
                  : <span data-state={candidateState.status} />}
              </button>
            )
          })}
        </div>
      )}
    </div>,
    document.body,
  )
}

/** Codex-style responsive gallery and group-aware original-image preview. */
export function ImageContainer({ matched, t }: ImageContainerProps): ReactNode {
  const items = useMemo<GalleryItem[]>(() => matched.images.map(({ attachment }, index) => ({
    key: itemKey(attachment, index),
    attachment,
    index,
  })), [matched.images])
  const [assets, setAssets] = useState<Record<string, AssetState | undefined>>({})
  const [attempts, setAttempts] = useState<Record<string, number | undefined>>({})
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const openerRef = useRef<HTMLElement | null>(null)

  const updateAsset = useCallback((key: string, next: AssetState): void => {
    setAssets((current) => sameState(current[key], next) ? current : { ...current, [key]: next })
  }, [])

  const retry = useCallback((key: string): void => {
    setAttempts(current => ({ ...current, [key]: (current[key] ?? 0) + 1 }))
  }, [])

  const open = useCallback((index: number, opener: HTMLElement): void => {
    openerRef.current = opener
    setOpenIndex(index)
  }, [])

  const close = useCallback((): void => { setOpenIndex(null) }, [])

  useEffect(() => {
    if (openIndex !== null && openIndex >= items.length) setOpenIndex(items.length === 0 ? null : items.length - 1)
  }, [items.length, openIndex])

  if (items.length === 0) return null
  return (
    <>
      <div
        className={css.gallery}
        data-count={items.length <= 4 ? String(items.length) : 'many'}
        data-compact={items.length > 4 || undefined}
        role="group"
        aria-label={t('gallery.label')}
      >
        {items.map(item => (
          <div className={css.asset} key={item.key}>
            <ImageAsset
              item={item}
              count={items.length}
              state={assets[item.key] ?? LOADING}
              attempt={attempts[item.key] ?? 0}
              loadImage={matched.loadImage}
              onState={updateAsset}
              onOpen={open}
              onRetry={retry}
              t={t}
            />
          </div>
        ))}
      </div>
      {openIndex !== null && (
        <Lightbox
          items={items}
          assets={assets}
          index={openIndex}
          opener={openerRef.current}
          onIndex={setOpenIndex}
          onClose={close}
          onRetry={retry}
          t={t}
        />
      )}
    </>
  )
}

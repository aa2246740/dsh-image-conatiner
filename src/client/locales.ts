/** `image-container` namespace dictionaries. */

export const zh = {
  'gallery.label': '生成图片',
  'image.name': '图片 {index}',
  'image.open': '查看大图',
  'image.openNamed': '查看图片 {name}',
  'image.loading': '图片加载中',
  'image.failed': '图片加载失败',
  'image.retry': '重试加载 {name}',
  'preview.title': '图片预览',
  'preview.close': '关闭图片预览',
  'preview.previous': '上一张图片',
  'preview.next': '下一张图片',
  'preview.download': '下载原图',
  'preview.counter': '{current} / {total}',
} satisfies Record<string, string>

export type ImageContainerKey = keyof typeof zh

export const en = {
  'gallery.label': 'Generated images',
  'image.name': 'Image {index}',
  'image.open': 'Open large preview',
  'image.openNamed': 'Open image {name}',
  'image.loading': 'Loading image',
  'image.failed': 'Image failed to load',
  'image.retry': 'Retry loading {name}',
  'preview.title': 'Image preview',
  'preview.close': 'Close image preview',
  'preview.previous': 'Previous image',
  'preview.next': 'Next image',
  'preview.download': 'Download original',
  'preview.counter': '{current} / {total}',
} satisfies Record<ImageContainerKey, string>

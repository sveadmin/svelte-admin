import type {
  Rune,
} from '@sveadmin/common'

export function prepareShowPreview (isPreviewVisible: Rune<boolean>) {
  return (event: Event) => {
    if (event instanceof KeyboardEvent
      && event.key !== 'Enter') {
      return
    }

    isPreviewVisible.value = true
    event.stopPropagation()
  }
}
  
import type {
  AccordionStore,
} from '../types.js'

import {
  getAccordionClicked,
} from '../helper/index.js'

export function prepareFlipAccordion(
  open: AccordionStore,
  onOpen?: (event?: Event, containerFunction?: ((event: MouseEvent) => void)) => boolean,
  onClose?: (event?: Event, containerFunction?: ((event: MouseEvent) => void)) => boolean
) : (e?: Event) => boolean {
  return (e?: Event) : boolean => {
    if(!e) {
      return false
    }
    if (e instanceof KeyboardEvent
        && e.key !== 'Enter') {
      return false
    }

    const target: HTMLElement | null = getAccordionClicked(e.target as HTMLElement)
    if (!target) {
      return false
    }
    open.isOpen = !!(1 - (parseInt(target?.dataset?.open ?? '0')))
    if (open.isOpen
      && onOpen) {
      onOpen(e)
    }
    if (!open.isOpen
      && onClose) {
      onClose(e)
    }
    return true
  }
}
import type {
  AccordionStore,
} from '../types.js'

import {
  getAccordionClicked,
} from '../helper/index.js'

export function prepareFlipAccordion(open: AccordionStore) : (e: Event) => void {
  return (e: Event) : void => {
    if (e instanceof KeyboardEvent
        && e.key !== 'Enter') {
      return
    }

    const target: HTMLElement | null = getAccordionClicked(e.target as HTMLElement)

    if (!target) {
      return
    }
    open.isOpen = !!(1 - (parseInt(target?.dataset?.open ?? '0')))
  }
}
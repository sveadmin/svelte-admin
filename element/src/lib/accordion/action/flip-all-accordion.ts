import type {
  AccordionStore,
} from '../types.js'

import {
  allOpenReducer,
} from '../helper/index.js'

export function prepareFlipAllAccordion(openStates: AccordionStore[]) : (e: Event) => void {
  return (e: Event) : void => {
    if (e instanceof KeyboardEvent
        && e.key !== 'Enter') {
      return
    }
    const isAllOpen = openStates.reduce(allOpenReducer, true),
      newValue = !isAllOpen
    openStates.map((currentState: AccordionStore) => {
      currentState.isOpen = newValue
    })
  }
}
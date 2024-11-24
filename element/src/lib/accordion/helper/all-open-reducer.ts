  import type {
    AccordionStore,
  } from '../types.js'

export function allOpenReducer (aggregator: boolean, currentState: AccordionStore) {
  aggregator = aggregator && currentState.isOpen
  return aggregator
}
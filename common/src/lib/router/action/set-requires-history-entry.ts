import {
  Writable,
} from 'svelte/store'

import {
  RouterData
} from '../types.js'

export function prepareSetRequiresHistoryEntry (store: Writable<RouterData>) : (value: boolean) => void {
  const { update } = store
  return (value: boolean) : void => {
    update(currentValue => {
      currentValue.routingHelpers.requiresHistoryEntry = value
      return currentValue
    })
  }
}
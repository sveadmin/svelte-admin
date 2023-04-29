import {
  Writable,
} from 'svelte/store'

import {
  RouterData
} from '../types.js'

export function prepareSetWasBackButtonUsed (store: Writable<RouterData>) : (value: boolean) => void {
  const { update } = store
  return (value: boolean) : void => {
    update(currentValue => {
      currentValue.routingHelpers.wasBackButtonUsed = value
      return currentValue
    })
  }
}
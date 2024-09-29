import {
  Writable,
} from 'svelte/store'

import {
  DateSelectorDisplayData,
} from '../types.js'

export function prepareSetIsSelectorVisible(store: Writable<DateSelectorDisplayData>) : (isSelectorVisible: boolean) => void {
  const { update } = store

  return (isSelectorVisible: boolean) : void => {
    update(currentValue => {
      currentValue.isSelectorVisible = isSelectorVisible
      return currentValue
    })
  }
}
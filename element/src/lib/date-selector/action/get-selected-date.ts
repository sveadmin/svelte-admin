import {
  get,
  Writable,
} from 'svelte/store'


import {
  DateSelectorDisplayData
} from '../types.js'

export function preapreGetSelectedDate(store: Writable<DateSelectorDisplayData>) : () => Date | null {
  return () : Date | null => {
    const { selected } = get(store)
    return selected
  }

}
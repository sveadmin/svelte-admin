import {
  SelectionItem,
} from '../dropdown-multi.svelte'

export const generateLookupValues = (filteredValues: Array<SelectionItem>) : {[key: string]: string} => {
  return filteredValues.reduce((aggregator, value) => {
    if (!value) {
      return aggregator
    }
    aggregator[value.value.toLowerCase()] = value.id
    return aggregator
  }, {})
}
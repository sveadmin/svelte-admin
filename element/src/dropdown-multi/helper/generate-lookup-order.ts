import {
  LookupItem,
  SelectionItem,
} from '../dropdown-multi.svelte'

export const generateLookupOrder = (filteredValues: Array<SelectionItem>) : Array<LookupItem> => {
  const lookupOrder = filteredValues.reduce((aggregator, value) => {
    if (!value) {
      return aggregator
    }
    aggregator.push({
      term: value.value.toLowerCase(),
      display: value.value,
    })
    return aggregator
  }, [])
  return lookupOrder.sort();
}
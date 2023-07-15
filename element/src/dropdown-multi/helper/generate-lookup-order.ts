import {
  LookupItem,
  SelectionItem,
} from '../types.js'

export const generateLookupOrder = (filteredValues: SelectionItem[]) : LookupItem[] => {
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
import type {
  SelectionItem,
} from '../types.js'

export const generateLookupValues = (filteredValues: SelectionItem[]) : {[key: string]: string} => {
  return filteredValues.reduce(function (aggregator: {[key: string]: string}, value) {
    if (!value) {
      return aggregator
    }
    aggregator[value.value.toLowerCase()] = value.id
    return aggregator
  }, {})
}
import type {
  ExternalData,
} from '../types.js'

export function prepareHas (store: {raw: ExternalData}) {
  return (key: string) : boolean => {
    return (store.raw && !!store.raw[key]) ?? false
  }
}
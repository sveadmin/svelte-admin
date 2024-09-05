import type {
  ExternalData,
} from '../types.js'

export function prepareRemove (store: {raw: ExternalData}) {
  return (key: string) : void => {
    delete store.raw[key]
  }
}
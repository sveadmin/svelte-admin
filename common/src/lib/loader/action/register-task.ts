import type {
  LoaderData,
} from '../types.js'

export function prepareRegisterTask (store: LoaderData) {
  return () : string => {
    clearTimeout(store.grace)
    store.state = true
    const key = Math.random().toString(36).substring(2, 7)
    store.keys[key] = true
    return key
  }
}
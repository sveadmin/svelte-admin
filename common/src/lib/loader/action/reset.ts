import type {
  LoaderData,
} from '../types.js'

export function prepareReset (store: LoaderData) {
  return () : void => {
    console.warn('Avoid using loader reset in production')
    store.keys = {}
    store.state = false;
    if (store.grace) {
      clearTimeout(store.grace)
    }
  }
}
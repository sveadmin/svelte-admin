import type {
  LoaderData,
} from '../types.js'

const GRACE_PERIOD = 200

export function prepareUnregisterTask (store: LoaderData) {

  function turnOff () {
    store.state = false
  }

  return (key: string) : void => {
    delete store.keys[key]
    if (Object.keys(store.keys).length === 0) {
      store.grace = setTimeout(turnOff, GRACE_PERIOD)
    }
  }
}
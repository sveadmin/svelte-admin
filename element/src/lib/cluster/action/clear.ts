import type {
  ValueHelperStore,
} from '$lib/types.js'

export function prepareClear(valueHelper: ValueHelperStore) : (event?: Event) => boolean {
  return (event?: Event) : boolean => {
    if (!Array.isArray(valueHelper.current)) {
      return true
    }
    valueHelper.current.map(() => '')
    return true
  }
}
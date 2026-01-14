import type {
  ValueHelperStore,
} from '$lib/types.js'

export function prepareCopy(valueHelper: ValueHelperStore) : (event?: Event) => boolean {
  return (event?: Event) : boolean => {
    if (!valueHelper.value) {
      return false
    }
    if (Array.isArray(valueHelper.value)) {
      navigator.clipboard.writeText(valueHelper.value.join(''))
      return true
    }
    navigator.clipboard.writeText(valueHelper.value.toString())
    return true
  }
}
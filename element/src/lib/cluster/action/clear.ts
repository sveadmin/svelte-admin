import type {
  ValueHelperStore,
} from '$lib/types.js'

export function prepareClear(valueHelper: ValueHelperStore, length?: () => number) : (event?: Event) => boolean {
  return (event?: Event) : boolean => {
    const clearLength = length?.() ?? valueHelper.display?.length ?? 0
    for (let i = 0; i < clearLength; i += 1) {
      if (!Array.isArray(valueHelper.display)) {
        valueHelper.display = []
      }
      valueHelper.display[i] = ''
    }
    return true
  }
}
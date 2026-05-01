import type {
  ValueHelperStore,
} from '$lib/types.js'

export function prepareClear(valueHelper: ValueHelperStore, dynamicPartMap: {[key: number] : number} = $state({})) : (event?: Event) => boolean {
  return (event?: Event) : boolean => {
    Object.keys(dynamicPartMap).map((index: string) => {
      if (!Array.isArray(valueHelper.display)) {
        return
      }
      valueHelper.display[parseInt(index)] = ''
    })
    return true
  }
}

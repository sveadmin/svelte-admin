import {
  untrack,
} from 'svelte'

import type {
  SveadminComponent,
  ValueHelperStore
} from '$lib/types.js'

export function prepareValueParser(valueHelper: ValueHelperStore) : (
  aggregator: {[key: number] : number},
  currentPiece: SveadminComponent<any>,
  index: number
) => {[key: number] : number} {
  let dynamicCount: number = 0
  return (
    aggregator: {[key: number] : number},
    currentPiece: SveadminComponent<any>,
    index: number
  ) : {[key: number] : number} => {
    if (index === 0) {
      dynamicCount = 0
      valueHelper.display = []
    }
    const isEditable = currentPiece.isInputVisible || !!currentPiece?.input
    const config = ((!currentPiece.isInputVisible && currentPiece?.display?.config) || currentPiece?.input?.config) ?? {}
    
    untrack(() => {
      if (!valueHelper?.display
        || typeof valueHelper?.display === 'string') {
        return aggregator
      }
      if (config.value) {
        valueHelper.display.push(config.value)
      } else {
        // This filters out static components which can not have the value changed
        if (!isEditable) {
          valueHelper.display.push('')
        } else {
          aggregator[index] = dynamicCount
          const current: string[] = valueHelper?.current as string[] //This type casting is guaranteed by running the splitter to get the vlaueHelper.current
          valueHelper.display.push(current[dynamicCount])
          dynamicCount++
        }
      }
    })

    return aggregator
  }
}
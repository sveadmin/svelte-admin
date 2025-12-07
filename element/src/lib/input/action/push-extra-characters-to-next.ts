import {
  prepareDistributeValue,
} from '../helper/distribute-value.js'

import {
  INPUT_TYPE_CHECKBOX,
} from '../types.js'

export function preparePushExtraCharactersToNext(allowedKeys : string[] = [], allowedSeparators : string[] = []) {
    const distributeValue = prepareDistributeValue(
      allowedKeys,
      allowedSeparators
    )
    
    return (event?: Event & { currentTarget: EventTarget & HTMLInputElement; }) : boolean => {
    if (!event) {
      return true
    }
    const target = event.target as HTMLInputElement
    const selectionStart = target.selectionStart
    let valueToDistribute : string = target.value

    target.value =  ''
    distributeValue(
      valueToDistribute,
      target,
      selectionStart,
    )
    return true
  }
}
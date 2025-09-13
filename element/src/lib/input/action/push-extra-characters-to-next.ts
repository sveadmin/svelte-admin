import {
  prepareDistributeValue,
} from '../helper/distribute-value.js'

export function preparePushExtraCharactersToNext(allowedKeys : string[] = [], allowedSeparators : string[] = []) {
    const distributeValue = prepareDistributeValue(
      allowedKeys,
      allowedSeparators
    )
    
    return (event: Event & { currentTarget: EventTarget & HTMLInputElement; }) : boolean => {
    const target = event.target as HTMLInputElement

    const valueToDistribute = target.value,
      selectionStart = target.selectionStart
    target.value = ''
    distributeValue(
      valueToDistribute,
      target,
      selectionStart,
    )
    return true
  }
}
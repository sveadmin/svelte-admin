import type {
  Rune,
} from '@sveadmin/common'

import {
  focusNext,
} from '$lib/helper/index.js'

export function prepareParsePastedValue (
  value : Rune<string[]>,
  allowedInputKeys: string[],
  inputLengths: number[],
) {
  return async (event: KeyboardEvent) : Promise<boolean> => {
    event.preventDefault()
    const pastedValue = await navigator.clipboard.readText() //This makes sure that the value is copied into the field
    const target = event.target as HTMLInputElement,
      currentInput: number = parseInt(target.dataset.index ?? '0'),
      selectionStart: number = target.selectionStart ?? 0,
      selectionEnd: number = target.selectionEnd ?? 0

    let currentInputElement : HTMLInputElement | null = target

    if (!navigator.clipboard) {
      return false
    }
    const valuePieces: string[] = pastedValue.split('')
    let sanitizedPieces: string[] = (allowedInputKeys && allowedInputKeys.length > 0) 
      ? valuePieces.filter(character => allowedInputKeys.indexOf(character) !== -1)
      : valuePieces.filter(() => true)
    if (selectionStart === selectionEnd
      && (value.value[currentInput] === ''
        || selectionEnd === value.value[currentInput].length)) {
      if (!inputLengths
        || !inputLengths[currentInput]) {
        //Value length is not limited
        value.value[currentInput] = value.value[currentInput] + sanitizedPieces.join('')
        return true
      }
      value.value[currentInput] = value.value[currentInput] + sanitizedPieces.splice(0, inputLengths[currentInput] - value.value[currentInput].length).join('')
      let i : number
      for (i = currentInput + 1; i <= value.value.length; i += 1) {
        if (value.value[i]  === ''
          && sanitizedPieces.length > 0
          && currentInputElement) {
          value.value[i] = sanitizedPieces.splice(0, (inputLengths && inputLengths[i]) ?? Infinity).join('')
          currentInputElement = focusNext(currentInputElement)
        } else {
          break
        }
      }
      return true
    }
    //There are certain characters, selected, only replace the selection
    value.value[currentInput] = value.value[currentInput].substring(0, selectionStart)
      + sanitizedPieces.splice(0, selectionEnd - selectionStart).join('')
      + value.value[currentInput].substring(selectionEnd, inputLengths && inputLengths[currentInput])

    return true
  }

}
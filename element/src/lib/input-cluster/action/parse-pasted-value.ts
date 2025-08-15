import type {
  Rune,
} from '@sveadmin/common'

import {
  focusNext,
} from '$lib/helper/index.js'

export function prepareParsePastedValue (
  value : Rune<string[]>,
  allowedInputKeys?: string[],
  allowedSeparators: string[] = [],
  inputLengths?: Array<number | null>,
) {
  return async (event: KeyboardEvent) : Promise<boolean> => {
    event.preventDefault()
    const pastedValue = await navigator.clipboard.readText() //This makes sure that the value is copied into the field
    const target = event.target as HTMLInputElement,
      currentInput: number = parseInt(target.dataset.index ?? '0'),
      selectionStart: number = target.selectionStart ?? 0,
      selectionEnd: number = target.selectionEnd ?? 0

    let currentInputElement : HTMLInputElement | null = target,
      nextSeparator: number | undefined

    if (!navigator.clipboard) {
      return false
    }
    const valuePieces: string[] = pastedValue.split('')
    let sanitizedPieces: string[] = (allowedInputKeys && allowedInputKeys.length > 0) 
      ? valuePieces.filter(character => allowedInputKeys.indexOf(character) !== -1 || allowedSeparators.indexOf(character) !== -1)
      : valuePieces.filter(() => true)
    if (selectionStart === selectionEnd
      && (value.value[currentInput] === ''
        || value.value[currentInput] === null
        || selectionEnd === (value.value[currentInput]?.length ?? 0))) {
      nextSeparator = sanitizedPieces.findIndex(character => allowedSeparators.indexOf(character) !== -1)
      if (!inputLengths) {
        inputLengths = []
      }
      if (!inputLengths?.[currentInput]) {
        //Value length is not limited by input
        if (!nextSeparator) {
          value.value[currentInput] = (value.value[currentInput] || '') + sanitizedPieces.join('')
          return true
        }
        value.value[currentInput] = (value.value[currentInput] || '') + sanitizedPieces.slice(0, nextSeparator).join('')
        sanitizedPieces.splice(0, nextSeparator)
      }
      const cutoff = (nextSeparator > 0)
        ? Math.min(nextSeparator - value.value[currentInput].length, (inputLengths[currentInput] || Infinity) - value.value[currentInput].length)
        : inputLengths[currentInput] ?? Infinity - value.value[currentInput].length
      value.value[currentInput] = value.value[currentInput] + sanitizedPieces.splice(0, cutoff).join('')
      if (nextSeparator > 0) {
        sanitizedPieces.splice(0, 1)
        nextSeparator = sanitizedPieces.findIndex(character => allowedSeparators.indexOf(character) !== -1)
      }
      let i : number
      for (i = currentInput + 1; i <= value.value.length; i += 1) {
        if ((value.value[i]  === ''
            || value.value[i] === null)
          && sanitizedPieces.length > 0
          && currentInputElement) {
          const cutoff = (nextSeparator > 0)
            ? Math.min(nextSeparator, inputLengths[i] ?? Infinity)
            : inputLengths[i] ?? Infinity
          value.value[i] = sanitizedPieces.splice(0, cutoff).join('')
          if (nextSeparator > 0) {
            sanitizedPieces.splice(0, 1)
            nextSeparator = sanitizedPieces.findIndex(character => allowedSeparators.indexOf(character) !== -1)
          }
          currentInputElement = focusNext(currentInputElement)
        } else {
          break
        }
      }
      return true
    }
    //There are certain characters, selected, only replace the selection
    nextSeparator = sanitizedPieces.findIndex(character => allowedSeparators.indexOf(character) !== -1)
    let cutoff = (nextSeparator > 0)
      ? Math.min(nextSeparator, selectionEnd - selectionStart)
      : selectionEnd - selectionStart
    
    if (inputLengths
      && inputLengths[currentInput]) {
      cutoff = (cutoff)
        ? Math.min(cutoff, inputLengths[currentInput])
        : inputLengths[currentInput]
    }
    value.value[currentInput] = value.value[currentInput].substring(0, selectionStart)
      + sanitizedPieces.splice(0, cutoff).join('')
      + value.value[currentInput].substring(selectionStart + cutoff)

    return true
  }

}
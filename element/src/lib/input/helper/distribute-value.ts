import {
  focusNext,
} from '$lib/helper/index.js'

import {
  SELECTION_INPUT_TYPE_CHECKBOX,
} from '$lib/types.js'

const checkboxCheckedValues = [
  '1',
  'true',
]

export function prepareDistributeValue (
  allowedInputKeys?: string[],
  allowedSeparators: string[] = [],
) {
  const regexAllowedKeys = allowedInputKeys?.reduce((aggregator: RegExp[], currentKeyPiece: string) => {
    if (currentKeyPiece[0] === '/'
      && currentKeyPiece.slice(-1) === '/') {
      aggregator.push(new RegExp(currentKeyPiece.slice(1, -1)))
    }
    return aggregator
  }, []) ?? []

  const distributeValue : (
    valueToDistribute: string,
    target: HTMLInputElement,
    selectionStartReceived?: number | null,
    preventValueOverwrite?: boolean,
  ) => boolean = (
    valueToDistribute: string,
    target: HTMLInputElement,
    selectionStartReceived: number | null = null,
    preventValueOverwrite: boolean = false,
  ) : boolean => {
    if (preventValueOverwrite
        && target.value.length > 0) {
      return true
    }

    const inputLength: number | null = parseInt(target.dataset.maxlength || '-1'),
      selectionStart: number = target.selectionStart ?? 0,
      selectionEnd: number = target.selectionEnd ?? 0
      
    let valuePieces: string[] = valueToDistribute.split(''),
      next: HTMLInputElement | null = null

    let nextSeparator: number | undefined = valuePieces.findIndex(character => allowedSeparators.indexOf(character) !== -1),
      sanitizedPieces: string[]
      
    sanitizedPieces = (nextSeparator >= 0)
      ? valuePieces.splice(0, nextSeparator)
      : valuePieces.splice(0, Infinity)
    if (nextSeparator >= 0) {
      valuePieces.splice(0, 1)
    }

    sanitizedPieces = (allowedInputKeys && allowedInputKeys.length > 0) 
        ? sanitizedPieces.filter(character => {
            if (allowedInputKeys.indexOf(character) !== -1) {
              return true
            }
            return regexAllowedKeys.find(regex => regex.test(character))
          })
        : sanitizedPieces

    if (selectionStart < selectionEnd
      && inputLength > 0) {
      sanitizedPieces = sanitizedPieces.splice(0, selectionEnd - selectionStart)
    }

    sanitizedPieces = [
      ...target.value.substring(0, selectionStart).split(''),
      ...sanitizedPieces,
      ...target.value.substring(selectionEnd)
    ]

    const cutoff : number = (inputLength < 0) ? Infinity : inputLength

    target.value = sanitizedPieces.slice(0, cutoff).join('')
    if (target.type === SELECTION_INPUT_TYPE_CHECKBOX
        && target.value !== 'on') {
      target.value = 'on'
      const cbValue = sanitizedPieces.slice(0, cutoff).join('')
      target.checked = checkboxCheckedValues.indexOf(cbValue) > -1
      target.dispatchEvent(new InputEvent("change"))
    } else {
      if (selectionStartReceived) {
        target.selectionStart = target.selectionEnd = selectionStartReceived
      }
    }
    target.dispatchEvent(new InputEvent("input"))
    sanitizedPieces.splice(0, cutoff)

    if (nextSeparator < 0
      && sanitizedPieces.length > 0) {
      valuePieces = sanitizedPieces.concat(valuePieces)
    }

    if (valuePieces.length === 0) {
      return true
    }

    next = focusNext(target)

    if(next
      && (next.value.length === 0
        || next.type === SELECTION_INPUT_TYPE_CHECKBOX
      )) {
      next.value = valuePieces.join('')
      next.dispatchEvent(new InputEvent("input", {bubbles: true}))
    }

    return true

  }

  return distributeValue
}
import {
  focusNext,
} from '$lib/helper/index.js'

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
      next: HTMLInputElement | null = null,
      nextSeparator: number | undefined,
      sanitizedPieces: string[] = (allowedInputKeys && allowedInputKeys.length > 0) 
        ? valuePieces.filter(character => {
            if (allowedInputKeys.indexOf(character) !== -1) {
              return true
            }
            if (allowedSeparators.indexOf(character) !== -1) {
              return true
            }
            return regexAllowedKeys.find(regex => regex.test(character))
          })
        : valuePieces.filter(() => true)

    if (selectionStart < selectionEnd
      && inputLength > 0) {
      sanitizedPieces = sanitizedPieces.splice(0, selectionEnd - selectionStart)
    }

    valuePieces = [
      ...target.value.substring(0, selectionStart).split(''),
      ...sanitizedPieces,
      ...target.value.substring(selectionEnd)
    ]

    nextSeparator = valuePieces.findIndex(character => allowedSeparators.indexOf(character) !== -1)
    const cutoff : number = Math.min(
      (inputLength < 0) ? Infinity : inputLength,
      (nextSeparator < 0) ? Infinity : nextSeparator,
    )

    target.value = valuePieces.slice(0, cutoff).join('')
    valuePieces.splice(0, cutoff)
    if (selectionStartReceived) {
      target.selectionStart = target.selectionEnd = selectionStartReceived
    }
    target.dispatchEvent(new InputEvent("input"))
console.log('IPL', inputLength, sanitizedPieces)
console.log('IPL selection', target.selectionStart, target.selectionEnd)
console.log('IPL allowed', allowedInputKeys, allowedSeparators)
console.log('IPL cutiff', cutoff, nextSeparator, valuePieces, target.dataset.maxlength)
    if (nextSeparator > 0) {
      valuePieces.splice(0, 1)
    }

    return (valuePieces.length > 0
      && (next = focusNext(target)))
      ? distributeValue(valuePieces.join(''), next, null, true)
      : true

  }

  return distributeValue
}
import {
  prepareDistributeValue,
} from '$lib/input/helper/index.js'

export function prepareParsePastedValue (
  allowedInputKeys?: string[],
  allowedSeparators: string[] = [],
) {
  const distributeValue = prepareDistributeValue(
    allowedInputKeys,
    allowedSeparators,
  )
  return async (event: KeyboardEvent) : Promise<boolean> => {
    event.preventDefault()
    if (!navigator.clipboard) {
      return false
    }
    const pastedValue = await navigator.clipboard.readText() //This makes sure that the value is copied into the field
    const target = event.target as HTMLInputElement

    return distributeValue(pastedValue, target, (target.selectionStart || 0) + pastedValue.length)
  }

}
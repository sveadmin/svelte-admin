import type {
  ValidatorStore,
} from '@sveadmin/common'

import type {
  KeyMap,
} from '$lib/types.js'

export function prepareInputOnKeyup(
  keyMap: KeyMap,
  validateValue: (value: any) => boolean,
  validateWhileTyping: boolean,
  onKeyup?: (event: KeyboardEvent) => void
) : (event: KeyboardEvent) => void
{
  return (event: KeyboardEvent) : void => {
    const target = event.target as HTMLInputElement
    const value = target.value
    const key = event.key
    if (key) {
      if (keyMap[key]) {
        if (!keyMap[key](event)) {
          return
        }
      }

      if (validateWhileTyping) {
    console.log('caliadsid', value)
        validateValue(value)
      }
      if (typeof onKeyup === 'function') {
        onKeyup(event)
      }
    }
  }
}
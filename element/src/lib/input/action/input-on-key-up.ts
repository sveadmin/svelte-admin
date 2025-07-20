import {
  KEY_UNMATCHED,
  type KeyMap,
  type ParsedKeyMap,
} from '$lib/types.js'

import {
  keyMapParser,
} from '$lib/helper/index.js'

export function prepareInputOnKeyUp(
  keyMap: KeyMap,
  validateValue: (value: any) => boolean,
  validateWhileTyping: boolean,
  onKeyUp?: (event: KeyboardEvent) => void
) : (event: KeyboardEvent) => void
{
  const parsedKeyMap = keyMapParser(keyMap)
  const unmatchedAction = parsedKeyMap.find(
    (
      keyPress =>
        keyPress.key === KEY_UNMATCHED
    )
  )
  return (event: KeyboardEvent) : void => {
    const target = event.target as HTMLInputElement
    const value = target.value
    const key = event.key

    if (key) {
      const action = parsedKeyMap.find(
        keyPress => {
          if (keyPress.key !== key) {
            return false
          }

          if (keyPress.onAllModifiers) {
            return true
          }

          return keyPress.altKey === event.altKey  
            && keyPress.ctrlKey === event.ctrlKey  
            && keyPress.metaKey === event.metaKey  
            && keyPress.shiftKey === event.shiftKey  
        }
      )

      if (action) {
        if (!action.event(event)) {
          return
        }
      } else {
        if (unmatchedAction) {
          if (!unmatchedAction.event(event)) {
            return
          }
        }
      }

      if (validateWhileTyping) {
        validateValue(value)
      }
      if (typeof onKeyUp === 'function') {
        onKeyUp(event)
      }
    }
  }
}
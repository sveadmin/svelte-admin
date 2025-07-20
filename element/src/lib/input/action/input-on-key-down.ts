import {
  type KeyMap,
  KEY_UNMATCHED,
} from '$lib/types.js'

import {
  keyMapParser,
} from '$lib/helper/index.js'

export function prepareInputOnKeyDown(
  keyMap: KeyMap,
  onKeydown?: (event: KeyboardEvent) => void
) : (event: KeyboardEvent) => void
{
  const parsedKeyMap = keyMapParser(keyMap, true)

  return (event: KeyboardEvent) : void => {
    const key = event.key
    const unmatchedAction = parsedKeyMap.find(
      (
        keyPress =>
          keyPress.key === KEY_UNMATCHED
      )
    )

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

      if (typeof onKeydown === 'function') {
        onKeydown(event)
      }
    }
  }
}
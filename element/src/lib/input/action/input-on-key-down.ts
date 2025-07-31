import {
  KEY_UNMATCHED,
  KEY_DOWN_ALLOWED_KEYS
} from '$lib/types.js'

import type {
  KeyMap,
} from '$lib/types.js'

import {
  keyMapParser,
} from '$lib/helper/index.js'

export function prepareInputOnKeyDown(
  keyMap: KeyMap,
  onKeydown?: (event: KeyboardEvent) => void,
  allowedKeys?: string[]
) : (event: KeyboardEvent) => void
{
  if (allowedKeys
    && keyMap[KEY_DOWN_ALLOWED_KEYS]) {
    allowedKeys.map((allowedKey: string) => {
      keyMap['_' + allowedKey] = keyMap[KEY_DOWN_ALLOWED_KEYS]
    })
  }

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
          if (keyPress.regex) {
            return keyPress.regex.test(key)
          }
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
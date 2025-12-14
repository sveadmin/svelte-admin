import {
  KEY_ALLOWED_KEYS,
  KEY_UNMATCHED,
} from '$lib/types.js'

import type {
  KeyMap,
} from '$lib/types.js'

import {
  keyMapParser,
} from '$lib/helper/index.js'

export function prepareInputOnKeyUp(
  keyMap: KeyMap,
  // validateValue: (value: any) => boolean,
  // validateWhileTyping: boolean,
  allowedKeys?: string[]
) : (event?: KeyboardEvent) => boolean | Promise<boolean>
{
  if (allowedKeys
    && keyMap[KEY_ALLOWED_KEYS]) {
    allowedKeys.map((allowedKey: string) => {
      keyMap[allowedKey] = keyMap[KEY_ALLOWED_KEYS]
    })
  }

  const parsedKeyMap = keyMapParser(keyMap)

  const unmatchedAction = parsedKeyMap.find(
    (
      keyPress =>
        keyPress.key === KEY_UNMATCHED
    )
  )
  return (event?: KeyboardEvent) : boolean | Promise<boolean> => {
    if (!event) {
      return true
    }
    // const target = event.target as HTMLInputElement
    // const value = target.value
    const key = event.key

    if (key) {
      const action = parsedKeyMap.find(
        keyPress => {
          if (keyPress.regex) {
            return keyPress.regex.test(key)
          }
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
        return action.event(event)
      }
      if (unmatchedAction) {
        return unmatchedAction.event(event)
      }

      // if (validateWhileTyping) {
      //   validateValue(value)
      // }
    }
    return true
  }
}
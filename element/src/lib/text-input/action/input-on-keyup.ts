import {
  KEY_UNMATCHED,
  type KeyMap,
  type ParsedKeyMap,
} from '$lib/types.js'

import {
  keyMapParser,
} from '$lib/helper/index.js'

export function prepareInputOnKeyup(
  keyMap: KeyMap,
  validateValue: (value: any) => boolean,
  validateWhileTyping: boolean,
  onKeyup?: (event: KeyboardEvent) => void
) : (event: KeyboardEvent) => void
{
  const parsedKeyMap = keyMapParser(keyMap)
  const filteredKeyMap : ParsedKeyMap = Object.keys(parsedKeyMap).reduce(
    (aggregator: ParsedKeyMap, currentKey) => {
      if (!parsedKeyMap[currentKey].onKeydown) {
        aggregator[currentKey] = parsedKeyMap[currentKey]
      }
      return aggregator
    },
    {}
  )
  return (event: KeyboardEvent) : void => {
    const target = event.target as HTMLInputElement
    const value = target.value
    const key = event.key

    if (key) {
      if (filteredKeyMap[key]
        && filteredKeyMap[key].altKey === event.altKey
        && filteredKeyMap[key].ctrlKey === event.ctrlKey
        && filteredKeyMap[key].metaKey === event.metaKey
        && filteredKeyMap[key].shiftKey === event.shiftKey) {
        if (!filteredKeyMap[key].event(event)) {
          return
        }
      } else {
        if (filteredKeyMap[KEY_UNMATCHED]) {
          if (!filteredKeyMap[KEY_UNMATCHED].event(event)) {
            return
          }
        }
      }

      if (validateWhileTyping) {
        validateValue(value)
      }
      if (typeof onKeyup === 'function') {
        onKeyup(event)
      }
    }
  }
}
import type {
  KeyMap,
} from '$lib/types.js'

import { continueOnKeyEvent } from './continue-on-key-event.js'

export function addCopyPaste(
  keyMap: KeyMap,
  parsePastedValue: ((event: KeyboardEvent) => Promise<boolean>)
) : KeyMap {
  keyMap['_Ctrl+c'] = continueOnKeyEvent
  keyMap['_Ctrl+C'] = continueOnKeyEvent
  keyMap['_Ctrl+v'] = parsePastedValue
  keyMap['_Ctrl+V'] = parsePastedValue
  keyMap['_Ctrl+Insert'] = continueOnKeyEvent
  keyMap['_Shift+Insert'] = parsePastedValue

  return keyMap
}
import type {
  KeyMap,
} from '$lib/types.js'

import {
  continueOnKeyEvent
} from '$lib/input/index.js'

export function addCopyPaste(
  keyMap: KeyMap,
  parsePastedValue?: ((event: KeyboardEvent) => Promise<boolean>)
) : KeyMap {
  keyMap['_Ctrl+c'] = continueOnKeyEvent
  keyMap['_Ctrl+C'] = continueOnKeyEvent
  keyMap['_Ctrl+x'] = continueOnKeyEvent
  keyMap['_Ctrl+X'] = continueOnKeyEvent
  keyMap['_Ctrl+v'] = continueOnKeyEvent //parsePastedValue
  keyMap['_Ctrl+V'] = continueOnKeyEvent //parsePastedValue
  keyMap['_Ctrl+Insert'] = continueOnKeyEvent
  keyMap['_Shift+Insert'] = continueOnKeyEvent //parsePastedValue

  return keyMap
}
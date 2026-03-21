import type {
  KeyMap,
} from '$lib/types.js'

import {
  continueOnKeyEvent
} from '$lib/input/index.js'

export function allowCopyPaste(
  keyMap: KeyMap
) : KeyMap {
  keyMap['^Ctrl+c'] = continueOnKeyEvent
  keyMap['^Ctrl+C'] = continueOnKeyEvent
  keyMap['^Ctrl+x'] = continueOnKeyEvent
  keyMap['^Ctrl+X'] = continueOnKeyEvent
  keyMap['^Ctrl+v'] = continueOnKeyEvent //parsePastedValue
  keyMap['^Ctrl+V'] = continueOnKeyEvent //parsePastedValue
  keyMap['^Ctrl+Insert'] = continueOnKeyEvent
  keyMap['^Shift+Insert'] = continueOnKeyEvent //parsePastedValue

  return keyMap
}
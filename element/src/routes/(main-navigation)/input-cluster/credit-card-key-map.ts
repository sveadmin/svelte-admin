import {
  KEY_DOWN_UNMATCHED,
} from '$lib/types.js'

import type {
  KeyMap,
} from '$lib/types.js'

import {
  continueOnKeyEvent,
  isAtFirstCharacter,
  isAtLastCharacter,
  preventDefault,
  preventRepeat,
  prepareJumpToNext,
  prepareJumpToPrevious,
} from '$lib/input-cluster/index.js'

export const keyMap : KeyMap = {
  '_-': prepareJumpToNext(),
  '_ArrowLeft': prepareJumpToPrevious(isAtFirstCharacter),
  '_ArrowRight': prepareJumpToNext(isAtLastCharacter),
  '_Ctrl+ArrowLeft': continueOnKeyEvent,
  '_Ctrl+ArrowRight': continueOnKeyEvent,
  '_Ctrl+Shift+ArrowLeft': continueOnKeyEvent,
  '_Ctrl+Shift+ArrowRight': continueOnKeyEvent,
  '_Shift+ArrowLeft': continueOnKeyEvent,
  '_Shift+ArrowRight': continueOnKeyEvent,
  '_Backspace': prepareJumpToPrevious(isAtFirstCharacter),
  '_Delete': continueOnKeyEvent,
  '_End': continueOnKeyEvent,
  '_Home': continueOnKeyEvent,
  '_Tab': continueOnKeyEvent,
  '_Shift+Tab': continueOnKeyEvent,
  '_Ctrl+a': continueOnKeyEvent,
  '_Ctrl+A': continueOnKeyEvent,
  '_*+F1': continueOnKeyEvent,
  '_*+F2': continueOnKeyEvent,
  '_*+F3': continueOnKeyEvent,
  '_*+F4': continueOnKeyEvent,
  '_*+F5': continueOnKeyEvent,
  [KEY_DOWN_UNMATCHED]: preventDefault,
}

export function addCopyPaste(parsePastedValue: ((event: KeyboardEvent) => Promise<boolean>)) : KeyMap {
  keyMap['_Ctrl+c'] = continueOnKeyEvent
  keyMap['_Ctrl+C'] = continueOnKeyEvent
  keyMap['_Ctrl+v'] = parsePastedValue
  keyMap['_Ctrl+V'] = parsePastedValue
  keyMap['_Ctrl+Insert'] = continueOnKeyEvent
  keyMap['_Shift+Insert'] = parsePastedValue

  return keyMap
}

export function allowInputKeys(allowedInputKeys: string [], pushExtraCharactersToNext: (event: KeyboardEvent) => boolean) {
  allowedInputKeys.map(character => {
    keyMap['_' + character] = preventRepeat
    keyMap[character] = pushExtraCharactersToNext
  })
}
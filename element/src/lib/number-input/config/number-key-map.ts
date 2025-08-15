import {
  KEY_DOWN_ALLOWED_KEYS,
  KEY_DOWN_UNMATCHED,
} from '$lib/types.js'

import type {
  KeyMap,
} from '$lib/types.js'

import {
  preventRepeat,
} from '$lib/input/index.js'

import {
  continueOnKeyEvent,
  isAtFirstCharacter,
  isAtLastCharacter,
  preventDefault,
  prepareJumpToNext,
  prepareJumpToPrevious,
} from '$lib/input/index.js'

export const numberKeyMap : KeyMap = {
  '_ArrowDown': continueOnKeyEvent,
  '_ArrowLeft': prepareJumpToPrevious(isAtFirstCharacter),
  '_ArrowRight': prepareJumpToNext(isAtLastCharacter),
  '_ArrowUp': continueOnKeyEvent,
  '_Ctrl+ArrowLeft': prepareJumpToPrevious(isAtFirstCharacter),
  '_Ctrl+ArrowRight': prepareJumpToNext(isAtLastCharacter),
  '_*+ArrowLeft': continueOnKeyEvent,
  '_*+ArrowRight': continueOnKeyEvent,
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
  [KEY_DOWN_ALLOWED_KEYS]: preventRepeat,
  [KEY_DOWN_UNMATCHED]: preventDefault,
}
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

export const keyMap : KeyMap = {
  '^-': prepareJumpToNext(),
  '^.': prepareJumpToNext(),
  '^/': prepareJumpToNext(),
  '^ArrowDown': continueOnKeyEvent,
  '^ArrowLeft': prepareJumpToPrevious(isAtFirstCharacter),
  '^ArrowRight': prepareJumpToNext(isAtLastCharacter),
  '^ArrowUp': continueOnKeyEvent,
  '^Ctrl+ArrowLeft': prepareJumpToPrevious(isAtFirstCharacter),
  '^Ctrl+ArrowRight': prepareJumpToNext(isAtLastCharacter),
  '^*+ArrowLeft': continueOnKeyEvent,
  '^*+ArrowRight': continueOnKeyEvent,
  '^Backspace': prepareJumpToPrevious(isAtFirstCharacter),
  '^Delete': continueOnKeyEvent,
  '^*+End': continueOnKeyEvent,
  '^*+Home': continueOnKeyEvent,
  '^Tab': continueOnKeyEvent,
  '^Shift+Tab': continueOnKeyEvent,
  '^Ctrl+a': continueOnKeyEvent,
  '^Ctrl+A': continueOnKeyEvent,
  '^*+F1': continueOnKeyEvent,
  '^*+F2': continueOnKeyEvent,
  '^*+F3': continueOnKeyEvent,
  '^*+F4': continueOnKeyEvent,
  '^*+F5': continueOnKeyEvent,
  [KEY_DOWN_UNMATCHED]: preventDefault,
  [KEY_DOWN_ALLOWED_KEYS]: preventRepeat,
}
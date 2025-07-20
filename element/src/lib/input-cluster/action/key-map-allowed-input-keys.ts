import type {
  KeyMap,
} from '$lib/types.js'

import { preventRepeat } from './prevent-repeat.js'

export function allowInputKeys(
  keyMap: KeyMap,
  allowedInputKeys: string [],
  pushExtraCharactersToNext: (event: KeyboardEvent) => boolean
) {
  allowedInputKeys.map(character => {
    keyMap['_' + character] = preventRepeat
    keyMap[character] = pushExtraCharactersToNext
  })
}
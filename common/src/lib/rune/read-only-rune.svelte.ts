// Credit to Jonathan Gamble
// https://dev.to/jdgamble555/using-sharable-runes-with-typescript-in-svelte5-5hcp
import type {
  Rune,
} from './types.js'

function transformRune<T>(rune: T) : T {
  if (Array.isArray(rune)) {
    return rune.slice() as T
  }

  if (typeof rune === 'object') {
    return structuredClone(rune)
  }

  return rune
}

export const readOnlyRune = <T>(initialValue: T | Rune<T>) : Rune<T> => {
  if (initialValue?.hasOwnProperty('isRune')) {
    const runeBypass = initialValue as Rune<T>
    return runeBypass
  }

  let rune: T = $state(initialValue as T),
    copy: T

  return {
    isRune: true,
    get value() {
      copy = transformRune(rune)
      return copy
    },
    get() : T {
      return rune;
    },
    set value(v: T) {
    },
    set(v: T) {
    }
  };
};
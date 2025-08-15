// Credit to Jonathan Gamble
// https://dev.to/jdgamble555/using-sharable-runes-with-typescript-in-svelte5-5hcp
import type {
  Rune,
} from './types.js'

export const rune = <T>(initialValue: T | Rune<T>) : Rune<T> => {
  if (initialValue?.hasOwnProperty('isRune')) {
    const runeBypass = initialValue as Rune<T>
    return runeBypass
  }

  let rune: T = $state(initialValue as T);

  return {
    isRune: true,
    get value() {
      return rune;
    },
    get() : T {
      return rune;
    },
    set value(v: T) {
      rune = v;
    },
    set(v: T) : void {
      rune = v;
    }
  };
};
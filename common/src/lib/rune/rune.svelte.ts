// Credit to Jonathan Gamble
// https://dev.to/jdgamble555/using-sharable-runes-with-typescript-in-svelte5-5hcp
export const rune = <T>(initialValue: T)=> {
  if (initialValue?.hasOwnProperty('isRune')) {
    return initialValue
  }

  let rune = $state(initialValue);

  return {
    isRune: true,
    get value() {
      return rune;
    },
    set value(v: T) {
      rune = v;
    }
  };
};
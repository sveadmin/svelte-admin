export interface Rune<T> {
  isRune: boolean;
  value: T;
  get: () => T;
  set: (v: T) => void;
}
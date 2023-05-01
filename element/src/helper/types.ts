import {
  Spring
} from 'svelte/motion'

export type ShakeOptions = {
  stiffness: number,
  damping: number,
  delay: number
}

export interface Shaker extends Spring<number> {
  shake: () => void;
}

export type ShakeOptions = {
  stiffness: number,
  damping: number,
  delay: number
}

export interface Shaker {
  shake: () => void;
  
}

export { focusNext } from './focus-next'
export { shake } from './shake'
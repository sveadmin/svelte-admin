export type ShakeOptions = {
  stiffness: number,
  damping: number,
  delay: number
}

export interface Shaker {
  shake: (newValue?: number) => void;
  current: number;
  target: number;
}

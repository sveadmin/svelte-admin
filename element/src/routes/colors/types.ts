export const COLOR__ALTERNATE_BACKGROUND = 'alternate-background-color'

export const COLOR__BACKGROUND = 'background-color'

export const COLOR__ERROR = 'error-color'

export const COLOR__INPUT_BORDER = 'input-border-color'

export const COLOR__LOADER_1 = 'loader-color1'

export const COLOR__LOADER_2 = 'loader-color2'

export const COLOR__MAIN = 'main-color'

export const COLOR__MAIN_LIGHT = 'main-color-light'

export const COLOR__SECONDARY = 'secondary-color'

export const COLOR__SECONDARY_LIGHT = 'secondary-color-light'

export const COLOR__SELECTION = 'selection-color'

export const COLOR__STATUS_BEST = 'status-color-best'

export const COLOR__STATUS_BETTER = 'status-color-better'

export const COLOR__STATUS_GOOD = 'status-color-good'

export const COLOR__STATUS_WORSE = 'status-color-worse'

export const COLOR__STATUS_WORST = 'status-color-worst'

export const COLOR__TEXT = 'text-color'

export const COLOR_TYPES = [
  COLOR__ALTERNATE_BACKGROUND,
  COLOR__BACKGROUND,
  COLOR__ERROR,
  COLOR__INPUT_BORDER,
  COLOR__LOADER_1,
  COLOR__LOADER_2,
  COLOR__MAIN,
  COLOR__MAIN_LIGHT,
  COLOR__SECONDARY,
  COLOR__SECONDARY_LIGHT,
  COLOR__SELECTION,
  COLOR__STATUS_BEST,
  COLOR__STATUS_BETTER,
  COLOR__STATUS_GOOD,
  COLOR__STATUS_WORSE,
  COLOR__STATUS_WORST,
  COLOR__TEXT
]

export type ColorTypes = typeof COLOR_TYPES[number]

export interface Color {
  b: number,
  g: number,
  hex?: string;
  r: number,
  rgb?: string,
}

export interface Colors {
  [key: ColorTypes] : ColorStore
}

export interface ColorStore extends Color {
  get b (): number;
  get g (): number;
  get hex (): string;
  get r (): number;
  get rgb (): string;
  set b (value: string | number);
  set g (value: string | number);
  set r (value: string | number);
}

export interface ColorsStore {
  colors: Colors;
}
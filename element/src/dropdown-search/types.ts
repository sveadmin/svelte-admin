export type Option = {
  id: string;
  value: string;
}

export const DISPLAY_COMBO = 'combo';

export const DISPLAY_LABEL = 'label';

export const DISPLAY_VALUE = 'value';

export const ALLOWED_DISPLAY_MODES = [
  DISPLAY_COMBO,
  DISPLAY_LABEL,
  DISPLAY_VALUE
]

export type AllowedDisplayMode = typeof ALLOWED_DISPLAY_MODES[number]
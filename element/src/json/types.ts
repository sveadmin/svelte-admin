export interface JsonProps {
  displayMode?: AllowedJsonDisplayMode;
  fields?: string[];
  value: string;
}

export const DISPLAY_JSON_FILTERED = 'filtered'

export const DISPLAY_JSON_FULL = 'full'

export const ALLOWED_JSON_DISPLAY_MODES = [
  DISPLAY_JSON_FILTERED,
  DISPLAY_JSON_FULL,
]

export type AllowedJsonDisplayMode = typeof ALLOWED_JSON_DISPLAY_MODES[number]

export const COMPONENT_JSON = 'json'
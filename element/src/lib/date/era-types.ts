import type {
  SveadminComponent
} from '$lib/types.js'

import type {
  DateTimeCommonProps
} from './date-time.js'

export const COMPONENT_ERA = 'era'

export interface ComponentEra extends SveadminComponent {
  display?: {
    config?: EraDisplayProps,
  },
  type: typeof COMPONENT_ERA,
}

export const DATE_ERA_LONG = 'long'

export const DATE_ERA_NARROW = 'narrow'

export const DATE_ERA_SHORT = 'short'

export const ALLOWED_DATE_ERA = [
  DATE_ERA_LONG,
  DATE_ERA_NARROW,
  DATE_ERA_SHORT,
]

export type DateEra = typeof ALLOWED_DATE_ERA[number]

export interface EraDisplayProps extends DateTimeCommonProps {
  era?: DateEra;
}
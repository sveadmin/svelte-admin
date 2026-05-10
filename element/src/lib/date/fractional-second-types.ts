import type {
  SveadminComponent,
} from '$lib/types.js'

import type {
  DateTimeCommonProps
} from './date-time.js'

export const COMPONENT_FRACTIONAL_SECOND = 'fractionalSecond'

export interface ComponentFractionalSecond extends SveadminComponent<
  typeof COMPONENT_FRACTIONAL_SECOND,
  undefined,
  FractionalSecondDisplayProps
>
{
}

export interface FractionalSecondDisplayProps extends DateTimeCommonProps{
  fractionalSecondDigits?: number; //1 - 3
}

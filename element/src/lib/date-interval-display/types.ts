import type {
  DateCalendar
} from '$lib/text-display/index.js'

import type {
  ClassListOptional,
  StyleOptional,
} from '$lib/types.js'

export const COMPONENT_DATE_INTERVAL_DISPLAY = 'date-interval-display'

export interface DateIntervalDisplayProps {
  calendar?: DateCalendar,
  dateTimeFormat?: string;
  displayMode?: AllowedIntervalDisplayMode;
  intervalFormat?: string;
  locale?: string;
  refreshInterval?: number;
  timeZone?: string;
  value: null | Date | string;
  // dateIntervalDictionary?: DateIntervalDictionary;
  // format?: string;
  // id?: string;
  // isHighlighted?: ((currentDiff: number) => boolean);
  // refreshAt?: number;
  // secondsDenominator?: number;
}

export const DISPLAY_INTERVAL_DATE = 'date'

export const DISPLAY_INTERVAL_INTERVAL = 'interval'

export const ALLOWED_INTERVAL_DISPLAY_MODES = [
  DISPLAY_INTERVAL_DATE,
  DISPLAY_INTERVAL_INTERVAL,
]

export type AllowedIntervalDisplayMode = typeof ALLOWED_INTERVAL_DISPLAY_MODES[number]

export interface DateIntervalDisplayPropsWrappedProps extends
  DateIntervalDisplayProps,
  ClassListOptional,
  StyleOptional
{
}
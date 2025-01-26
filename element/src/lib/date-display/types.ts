import type {
  DateCalendar
} from '$lib/date/index.js'

import type {
  ClassListOptional,
  StyleOptional,
} from '$lib/types.js'

export const COMPONENT_DATE_DISPLAY = 'date-display'

export interface DateDisplayProps {
  calendar?: DateCalendar,
  format?: string;
  locale?: string;
  refreshInterval?: number;
  timeZone?: string;
  value: null | Date | string;
}

export interface DateDisplayWrappedProps extends
  DateDisplayProps,
  ClassListOptional,
  StyleOptional
{
}

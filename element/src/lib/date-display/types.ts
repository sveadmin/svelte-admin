import type {
  ClassListOptional,
  StyleOptional,
  SveadminComponent,
} from '$lib/types.js'

import type {
  DateCalendar
} from '$lib/date/index.js'

import type {
  TextDisplayProps,
} from '$lib/text-display/index.js'

export const COMPONENT_DATE_DISPLAY = 'date-display'

export const COMPONENT_DATE_DISPLAY_WRAPPED = 'date-display-wrapped'

export interface ComponentDateDisplay extends SveadminComponent<
  typeof COMPONENT_DATE_DISPLAY,
  undefined,
  DateDisplayProps
>
{
}

export interface ComponentDateDisplayWrapped extends SveadminComponent<
  typeof COMPONENT_DATE_DISPLAY_WRAPPED,
  undefined,
  DateDisplayWrappedProps
>
{
}

export interface DateDisplayProps extends TextDisplayProps {
  calendar?: DateCalendar,
  format?: string;
  locale?: string;
  refreshInterval?: number;
  timeZone?: string;
  value?: null | Date | string;
}

export interface DateDisplayWrappedProps extends
  Omit<DateDisplayProps, 'componentConfig'>,
  ClassListOptional,
  StyleOptional
{
  childrenConfig?: {
    0?: DateDisplayProps,
    date?: DateDisplayProps,
  }
  componentConfig?: {
    0?: ComponentDateDisplay,
    date?: ComponentDateDisplay,
  }
}

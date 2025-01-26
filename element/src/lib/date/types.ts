export * from './calendar-types.js'
export * from './day-period-types.js'
export * from './day-types.js'
export * from './era-types.js'
export * from './fractional-second-types.js'
export * from './hour-types.js'
export * from './interval-types.js'
export * from './minute-types.js'
export * from './month-types.js'
export * from './second-types.js'
export * from './time-zone-types.js'
export * from './week-types.js'
export * from './weekday-types.js'
export * from './year-types.js'

import type { TextDisplayPartBase } from '$lib/literal/types.js'

import type { DateCalendar } from './calendar-types.js'
import type { DayOptions, TextDisplayPartDay } from './day-types.js'
import type { DayPeriodOptions, TextDisplayPartDayPeriod } from './day-period-types.js'
import type { EraOptions, TextDisplayPartEra } from './era-types.js'
import type { FractionalSecondOptions, TextDisplayPartFractionalSecond } from './fractional-second-types.js'
import type { HourOptions, TextDisplayPartHour } from './hour-types.js'
import type { IntervalOptions, TextDisplayPartInterval } from './interval-types.js'
import type { MinuteOptions, TextDisplayPartMinute } from './minute-types.js'
import type { MonthOptions, TextDisplayPartMonth } from './month-types.js'
import type { SecondOptions, TextDisplayPartSecond } from './second-types.js'
import type { TextDisplayPartTimeZone, TimeZoneOptions } from './time-zone-types.js'
import type { DateWeek, TextDisplayPartWeek, WeekOptions } from './week-types.js'
import type { TextDisplayPartWeekday, WeekdayOptions } from './weekday-types.js'
import type { TextDisplayPartYear, YearOptions } from './year-types.js'

export const DATE_TIME_DEFINITION_DEFAULT = 'default'

export const DATE_TIME_DEFINITION_FULL_DATE = 'fullDate'

export const DATE_TIME_DEFINITION_ISO_DATE = 'isoDate'

export const DATE_TIME_DEFINITION_ISO_DATE_TIME = 'isoDateTime'

export const DATE_TIME_DEFINITION_ISO_TIME = 'isoTime'

export const DATE_TIME_DEFINITION_LONG_DATE = 'longDate'

export const DATE_TIME_DEFINITION_LONG_TIME = 'longTime'

export const DATE_TIME_DEFINITION_MEDIUM_DATE = 'mediumDate'

export const DATE_TIME_DEFINITION_MEDIUM_TIME = 'mediumTime'

export const DATE_TIME_DEFINITION_PADDED_SHORT_DATE = 'paddedShortDate'

export const DATE_TIME_DEFINITION_SHORT_DATE = 'shortDate'

export const DATE_TIME_DEFINITION_SHORT_TIME = 'shortTime'

export const ALLOWED_DATE_TIME_DEFINITION = [
  DATE_TIME_DEFINITION_DEFAULT,
  DATE_TIME_DEFINITION_FULL_DATE,
  DATE_TIME_DEFINITION_ISO_DATE,
  DATE_TIME_DEFINITION_ISO_DATE_TIME,
  DATE_TIME_DEFINITION_ISO_TIME,
  DATE_TIME_DEFINITION_LONG_DATE,
  DATE_TIME_DEFINITION_LONG_TIME,
  DATE_TIME_DEFINITION_MEDIUM_DATE,
  DATE_TIME_DEFINITION_MEDIUM_TIME,
  DATE_TIME_DEFINITION_PADDED_SHORT_DATE,
  DATE_TIME_DEFINITION_SHORT_DATE,
  DATE_TIME_DEFINITION_SHORT_TIME
]

export type DateTimeDefinition = typeof ALLOWED_DATE_TIME_DEFINITION[number]

export type DateTimeDefinitions = {[key: DateTimeDefinition] : string}

export interface DateOptions extends
  DayOptions,
  EraOptions,
  IntervalOptions,
  MonthOptions,
  WeekOptions,
  WeekdayOptions,
  YearOptions
{
  calendar?: DateCalendar;
  format?: string;
  dateStyle?: DateStyle;
  //localeMatcher is ignored in this implementation
  //numberingSystem?: TODO: get the list in
}

export interface DateSplitterSettings {
  dateNeeded: boolean;
  intervalNeeded: boolean;
  locale?: string;
  options: Intl.DateTimeFormatOptions;
  timeNeeded: boolean;
  timeZone?: string;
  weekNeeded?: DateWeek;
}

export const DATE_STYLE_FULL = 'full'

export const DATE_STYLE_LONG = 'long'

export const DATE_STYLE_MEDIUM = 'medium'

export const DATE_STYLE_SHORT = 'short'

export const ALLOWED_DATE_STYLE = [
  DATE_STYLE_FULL,
  DATE_STYLE_LONG,
  DATE_STYLE_MEDIUM,
  DATE_STYLE_SHORT,
]

export type DateStyle = typeof ALLOWED_DATE_STYLE[number]

export interface DateTimeOptions extends DateOptions, TimeOptions
{
  //formatMatcher?: TODO: get it done, amybe in the DateTimeOptions

}

export const TEXT_DISPLAY_TYPE_DATE = 'date'

export const TEXT_DISPLAY_TYPE_DATE_TIME = 'dateTime'

export const TEXT_DISPLAY_TYPE_TIME = 'time'

export interface TextDisplayPartDate extends TextDisplayPartBase {
  locale?: string,
  options?: DateOptions,
  timeZone?: string; //https://www.iana.org/time-zones,
  type: typeof TEXT_DISPLAY_TYPE_DATE,
}

export interface TextDisplayPartDateTime extends TextDisplayPartBase {
  locale?: string,
  options?: DateTimeOptions,
  timeZone?: string; //https://www.iana.org/time-zones,
  type: typeof TEXT_DISPLAY_TYPE_DATE_TIME,
}

export type TextDisplayPartDateTimeObjects = TextDisplayPartDay |
  TextDisplayPartDayPeriod |
  TextDisplayPartEra |
  TextDisplayPartFractionalSecond |
  TextDisplayPartHour |
  TextDisplayPartInterval |
  TextDisplayPartMinute |
  TextDisplayPartMonth |
  TextDisplayPartSecond |
  TextDisplayPartTimeZone |
  TextDisplayPartWeek |
  TextDisplayPartWeekday |
  TextDisplayPartYear

export interface TextDisplayPartTime extends TextDisplayPartBase {
  locale?: string,
  options?: TimeOptions,
  timeZone?: string; //https://www.iana.org/time-zones,
  type: typeof TEXT_DISPLAY_TYPE_TIME,
}

export const TIME_STYLE_FULL = 'full'

export const TIME_STYLE_LONG = 'long'

export const TIME_STYLE_MEDIUM = 'medium'

export const TIME_STYLE_SHORT = 'short'

export const ALLOWED_TIME_STYLE = [
  TIME_STYLE_FULL,
  TIME_STYLE_LONG,
  TIME_STYLE_MEDIUM,
  TIME_STYLE_SHORT,
]

export type TimeStyle = typeof ALLOWED_TIME_STYLE[number]

export interface TimeOptions extends
  DayPeriodOptions,
  FractionalSecondOptions,
  HourOptions,
  IntervalOptions,
  MinuteOptions,
  SecondOptions,
  TimeZoneOptions
{
  format?: string;
  timeStyle?: TimeStyle;
}
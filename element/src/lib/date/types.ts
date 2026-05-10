import type {
  CommonInputProps,
  DATE_INPUT_TYPE_DATE,
  DATE_INPUT_TYPE_DATE_TIME,
  DATE_INPUT_TYPE_TIME,
  SveadminComponent,
} from '$lib/types.js'

import { COMPONENT_DAY } from './day-types.js'
import { COMPONENT_DAY_PERIOD } from './day-period-types.js'
import { COMPONENT_ERA } from './era-types.js'
import { COMPONENT_FRACTIONAL_SECOND } from './fractional-second-types.js'
import { COMPONENT_HOUR } from './hour-types.js'
import { COMPONENT_INTERVAL } from './interval-types.js'
import { COMPONENT_MINUTE } from './minute-types.js'
import { COMPONENT_MONTH } from './month-types.js'
import { COMPONENT_SECOND } from './second-types.js'
import { COMPONENT_TIME_ZONE_NAME } from './time-zone-types.js'
import { COMPONENT_WEEK } from './week-types.js'
import { COMPONENT_WEEKDAY } from './weekday-types.js'
import { COMPONENT_YEAR } from './year-types.js'

import type { DateCalendar } from './calendar-types.js'
import type { ComponentDay, DayDisplayProps } from './day-types.js'
import type { ComponentDayPeriod, DayPeriodDisplayProps } from './day-period-types.js'
import type { ComponentEra, EraDisplayProps } from './era-types.js'
import type { ComponentFractionalSecond, FractionalSecondDisplayProps } from './fractional-second-types.js'
import type { ComponentHour, HourDisplayProps } from './hour-types.js'
import type { ComponentInterval, IntervalDisplayProps } from './interval-types.js'
import type { ComponentMinute, MinuteDisplayProps } from './minute-types.js'
import type { ComponentMonth, MonthDisplayProps } from './month-types.js'
import type { ComponentSecond, SecondDisplayProps } from './second-types.js'
import type { ComponentTimeZone, TimeZoneDisplayProps } from './time-zone-types.js'
import type { ComponentWeek, DateWeek, WeekDisplayProps } from './week-types.js'
import type { ComponentWeekday, WeekdayDisplayProps } from './weekday-types.js'
import type { ComponentYear, YearDisplayProps } from './year-types.js'

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

export interface DateDisplayProps extends
  DayDisplayProps,
  EraDisplayProps,
  IntervalDisplayProps,
  MonthDisplayProps,
  WeekDisplayProps,
  WeekdayDisplayProps,
  YearDisplayProps
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
] as const

export type DateStyle = typeof ALLOWED_DATE_STYLE[number]

export interface DateTimeDisplayProps extends DateDisplayProps, TimeDisplayProps
{
  //formatMatcher?: TODO: get it done, amybe in the DateTimeDisplayProps

}

export const COMPONENT_DATE = 'date'

export const COMPONENT_DATE_TIME = 'dateTime'

export const COMPONENT_TIME = 'time'

export const ALLOWED_DATE_COMPONENTS = [
  COMPONENT_DAY,
  COMPONENT_DATE,
  COMPONENT_ERA,
  COMPONENT_MONTH,
  COMPONENT_WEEK,
  COMPONENT_WEEKDAY,
  COMPONENT_YEAR,
]

export const ALLOWED_TIME_COMPONENTS = [
  COMPONENT_DAY_PERIOD,
  COMPONENT_FRACTIONAL_SECOND,
  COMPONENT_HOUR,
  COMPONENT_INTERVAL,
  COMPONENT_MINUTE,
  COMPONENT_SECOND,
  COMPONENT_TIME,
  COMPONENT_TIME_ZONE_NAME,
]

export const ALLOWED_DATE_TIME_COMPONENTS = [
  ...ALLOWED_DATE_COMPONENTS,
  ...ALLOWED_TIME_COMPONENTS,
  COMPONENT_DATE_TIME
]

export type AllowedDateComponents = typeof ALLOWED_DATE_COMPONENTS[number]

export type AllowedDateTimeComponents = typeof ALLOWED_DATE_TIME_COMPONENTS[number]

export type AllowedTimeComponents = typeof ALLOWED_TIME_COMPONENTS[number]

export interface EditorPartDate {
}

export interface EditorPartDateTime extends EditorPartDate,
  EditorPartTime
{
}

export interface EditorPartTime {
}

export interface ComponentDate extends SveadminComponent<
  typeof COMPONENT_DATE,
  undefined,
  DateDisplayProps
>
{
}

export interface ComponentDateTime extends SveadminComponent<
  typeof COMPONENT_DATE_TIME,
  undefined,
  DateTimeDisplayProps
>
{
}

export interface TextInputPartDate extends
  CommonInputProps,
  Omit<ComponentDate, 'type'>
{
  editor?: EditorPartDate,
  type: typeof DATE_INPUT_TYPE_DATE,
}

export interface TextInputPartDateTime extends
  CommonInputProps,
  Omit<ComponentDateTime, 'type'>
{
  editor?: EditorPartDateTime,
  type: typeof DATE_INPUT_TYPE_DATE_TIME,
}

export type ComponentDateTimeObjects = ComponentDay |
  ComponentDayPeriod |
  ComponentEra |
  ComponentFractionalSecond |
  ComponentHour |
  ComponentInterval |
  ComponentMinute |
  ComponentMonth |
  ComponentSecond |
  ComponentTimeZone |
  ComponentWeek |
  ComponentWeekday |
  ComponentYear

export interface ComponentTime extends SveadminComponent<
  typeof COMPONENT_TIME,
  undefined,
  TimeDisplayProps
>
{
}

// export type TextInputPartDateTimeObjects = TextInputPartDay |
//   TextInputPartDayPeriod |
//   TextInputPartEra |
//   TextInputPartFractionalSecond |
//   TextInputPartHour |
//   TextInputPartInterval |
//   TextInputPartMinute |
//   TextInputPartMonth |
//   TextInputPartSecond |
//   TextInputPartTimeZone |
//   TextInputPartYear

export interface TextInputPartTime extends
  CommonInputProps, 
  Omit<ComponentTime, 'type'>
{
  editor?: EditorPartTime,
  type: typeof DATE_INPUT_TYPE_TIME,
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
] as const

export type TimeStyle = typeof ALLOWED_TIME_STYLE[number]

export interface TimeDisplayProps extends
  DayPeriodDisplayProps,
  FractionalSecondDisplayProps,
  HourDisplayProps,
  IntervalDisplayProps,
  MinuteDisplayProps,
  SecondDisplayProps,
  TimeZoneDisplayProps
{
  format?: string;
  timeStyle?: TimeStyle;
}
import type {
  ClassListOptional,
  CustomTranslationsOptional,
  OnClickOptional,
  StyleOptional,
  Value,
} from '$lib/types.js'

import {
  TEXT_DISPLAY_TYPE_LITERAL,
} from '$lib/literal/types.js'

import type {
  TextDisplayPartBase,
  TextDisplayPartLiteral,
} from '$lib/literal/types.js'

import {
  TEXT_DISPLAY_TYPE_DATE,
  TEXT_DISPLAY_TYPE_DATE_TIME,
  TEXT_DISPLAY_TYPE_DAY,
  TEXT_DISPLAY_TYPE_DAY_PERIOD,
  TEXT_DISPLAY_TYPE_ERA,
  TEXT_DISPLAY_TYPE_FRACTIONAL_SECOND,
  TEXT_DISPLAY_TYPE_HOUR,
  TEXT_DISPLAY_TYPE_INTERVAL,
  TEXT_DISPLAY_TYPE_MINUTE,
  TEXT_DISPLAY_TYPE_MONTH,
  TEXT_DISPLAY_TYPE_SECOND,
  TEXT_DISPLAY_TYPE_TIME,
  TEXT_DISPLAY_TYPE_TIME_ZONE_NAME,
  TEXT_DISPLAY_TYPE_WEEK,
  TEXT_DISPLAY_TYPE_WEEKDAY,
  TEXT_DISPLAY_TYPE_YEAR,
} from '$lib/date/types.js'

import type {
  DateTimeDefinitions,
  TextDisplayPartDate,
  TextDisplayPartDateTime,
  TextDisplayPartDateTimeObjects,
  TextDisplayPartTime,
} from '$lib/date/types.js'

import {
  TEXT_DISPLAY_TYPE_NUMBER,
} from '$lib/number/types.js'

import type {
  TextDisplayPartNumber,
} from '$lib/number/types.js'

export const COMPONENT_TEXT_DISPLAY = 'text-display'

export interface TextDisplayProps extends
  CustomTranslationsOptional,
  Value
{
  dateTimeDefinitions?: DateTimeDefinitions,
  mask?: TextDisplayMask | string,
  refreshInterval?: number;
  splitter?: (value: any) => any[];
}

export interface TextDisplayWrappedProps extends
  ClassListOptional,
  OnClickOptional,
  StyleOptional,
  TextDisplayProps
{
}

export const TEXT_DISPLAY_TYPE_TEXT = 'text'

export const ALLOWED_TEXT_DISPLAY_TYPE = [
  TEXT_DISPLAY_TYPE_DATE,
  TEXT_DISPLAY_TYPE_DATE_TIME,
  TEXT_DISPLAY_TYPE_DAY,
  TEXT_DISPLAY_TYPE_DAY_PERIOD,
  TEXT_DISPLAY_TYPE_ERA,
  TEXT_DISPLAY_TYPE_FRACTIONAL_SECOND,
  TEXT_DISPLAY_TYPE_HOUR,
  TEXT_DISPLAY_TYPE_INTERVAL,
  TEXT_DISPLAY_TYPE_LITERAL,
  TEXT_DISPLAY_TYPE_MINUTE,
  TEXT_DISPLAY_TYPE_MONTH,
  TEXT_DISPLAY_TYPE_NUMBER,
  TEXT_DISPLAY_TYPE_SECOND,
  TEXT_DISPLAY_TYPE_TEXT,
  TEXT_DISPLAY_TYPE_TIME,
  TEXT_DISPLAY_TYPE_TIME_ZONE_NAME,
  TEXT_DISPLAY_TYPE_WEEK,
  TEXT_DISPLAY_TYPE_WEEKDAY,
  TEXT_DISPLAY_TYPE_YEAR,
]

export type TextDisplayType = typeof ALLOWED_TEXT_DISPLAY_TYPE[number]

export interface TextDisplayPartText extends TextDisplayPartBase {
  type: typeof TEXT_DISPLAY_TYPE_TEXT,
}

export type TextDisplayPart = TextDisplayPartObjects | string

export type TextDisplayPartObjects = TextDisplayPartDate |
  TextDisplayPartDateTime |
  TextDisplayPartDateTimeObjects |
  TextDisplayPartLiteral |
  TextDisplayPartNumber |
  TextDisplayPartText |
  TextDisplayPartTime

export type TextDisplayMask = TextDisplayPart[]
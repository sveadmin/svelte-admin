import type {
  ChildrenClassListOptional,
  ChildrenStyleOptional,
  ClassListOptional,
  CustomTranslationsOptional,
  IsAttachedOnLeftOptional,
  IsAttachedOnRightOptional,
  OnClickOptional,
  SizeOptional,
  StyleOptional,
  ValueOptional,
} from '$lib/types.js'

import {
  COMPONENT_LITERAL,
} from '$lib/literal/types.js'

import type {
  SveaComponentLiteral,
} from '$lib/literal/types.js'

import {
  COMPONENT_DATE,
  COMPONENT_DATE_TIME,
  COMPONENT_DAY,
  COMPONENT_DAY_PERIOD,
  COMPONENT_ERA,
  COMPONENT_FRACTIONAL_SECOND,
  COMPONENT_HOUR,
  COMPONENT_INTERVAL,
  COMPONENT_MINUTE,
  COMPONENT_MONTH,
  COMPONENT_SECOND,
  COMPONENT_TIME,
  COMPONENT_TIME_ZONE_NAME,
  COMPONENT_WEEK,
  COMPONENT_WEEKDAY,
  COMPONENT_YEAR,
} from '$lib/date/index.js'

import type {
  DateTimeDefinitions,
  ComponentDate,
  ComponentDateTime,
  ComponentDateTimeObjects,
  ComponentTime,
} from '$lib/date/index.js'

import {
  TEXT_DISPLAY_TYPE_NUMBER,
} from '$lib/number/types.js'

import type {
  TextDisplayPartNumber,
} from '$lib/number/types.js'

export const COMPONENT_TEXT_DISPLAY = 'text-display'

export interface EditorPartText {
}

export interface TextDisplayProps extends
  CustomTranslationsOptional,
  SizeOptional,
  ValueOptional
{
  dateTimeDefinitions?: DateTimeDefinitions,
  mask?: TextDisplayMask | string,
  refreshInterval?: number;
  splitter?: (value: any) => any[];
}

export interface TextDisplayWrappedProps extends
  ChildrenClassListOptional,
  ChildrenStyleOptional,
  ClassListOptional,
  OnClickOptional,
  StyleOptional,
  TextDisplayProps
{
}

export const TEXT_DISPLAY_TYPE_TEXT = 'text'

export const ALLOWED_TEXT_DISPLAY_TYPE = [
  COMPONENT_DATE,
  COMPONENT_DATE_TIME,
  COMPONENT_DAY,
  COMPONENT_DAY_PERIOD,
  COMPONENT_ERA,
  COMPONENT_FRACTIONAL_SECOND,
  COMPONENT_HOUR,
  COMPONENT_INTERVAL,
  COMPONENT_LITERAL,
  COMPONENT_MINUTE,
  COMPONENT_MONTH,
  TEXT_DISPLAY_TYPE_NUMBER,
  COMPONENT_SECOND,
  TEXT_DISPLAY_TYPE_TEXT,
  COMPONENT_TIME,
  COMPONENT_TIME_ZONE_NAME,
  COMPONENT_WEEK,
  COMPONENT_WEEKDAY,
  COMPONENT_YEAR,
]

export type TextDisplayType = typeof ALLOWED_TEXT_DISPLAY_TYPE[number]

export interface TextDisplayPartText {
  type: typeof TEXT_DISPLAY_TYPE_TEXT,
}

export type TextDisplayPart = TextDisplayPartObjects | string

export type TextDisplayPartObjects = ComponentDate |
  ComponentDateTime |
  ComponentDateTimeObjects |
  SveaComponentLiteral |
  TextDisplayPartNumber |
  TextDisplayPartText |
  ComponentTime

export type TextDisplayMask = TextDisplayPart[]

export interface TextInputPartText extends
  IsAttachedOnLeftOptional,
  IsAttachedOnRightOptional,
  TextDisplayPartNumber
{
  editor?: EditorPartText;
}
import type {
  ClassListOptional,
  CustomTranslationsOptional,
  StyleOptional,
  Value,
} from '$lib/types.js'

export const COMPONENT_TEXT_DISPLAY = 'text-display'

export const DATE_CALENDAR_BUDDHIST = 'buddhist'

export const DATE_CALENDAR_CHINESE = 'chinese'

export const DATE_CALENDAR_COPTIC = 'coptic'

export const DATE_CALENDAR_DANGI = 'dangi'

export const DATE_CALENDAR_ETHIOAA = 'ethioaa'

export const DATE_CALENDAR_ETHIOPIC = 'ethiopic'

export const DATE_CALENDAR_GREGORY = 'gregory'

export const DATE_CALENDAR_HEBREW = 'hebrew'

export const DATE_CALENDAR_INDIAN = 'indian'

export const DATE_CALENDAR_ISLAMIC = 'islamic'

export const DATE_CALENDAR_ISLAMIC_UMALQURA = 'islamic-umalqura'

export const DATE_CALENDAR_ISLAMIC_TBLA = 'islamic-tbla'

export const DATE_CALENDAR_ISLAMIC_CIVIL = 'islamic-civil'

export const DATE_CALENDAR_ISLAMIC_RGSA = 'islamic-rgsa'

export const DATE_CALENDAR_ISO8601 = 'iso8601'

export const DATE_CALENDAR_JAPANESE = 'japanese'

export const DATE_CALENDAR_PERSIAN = 'persian'

export const DATE_CALENDAR_ROC = 'roc'

export const ALLOWED_DATE_CALENDAR = [
  DATE_CALENDAR_BUDDHIST,
  DATE_CALENDAR_CHINESE,
  DATE_CALENDAR_COPTIC,
  DATE_CALENDAR_DANGI,
  DATE_CALENDAR_ETHIOAA,
  DATE_CALENDAR_ETHIOPIC,
  DATE_CALENDAR_GREGORY,
  DATE_CALENDAR_HEBREW,
  DATE_CALENDAR_INDIAN,
  DATE_CALENDAR_ISLAMIC,
  DATE_CALENDAR_ISLAMIC_UMALQURA,
  DATE_CALENDAR_ISLAMIC_TBLA,
  DATE_CALENDAR_ISLAMIC_CIVIL,
  DATE_CALENDAR_ISLAMIC_RGSA,
  DATE_CALENDAR_ISO8601,
  DATE_CALENDAR_JAPANESE,
  DATE_CALENDAR_PERSIAN,
  DATE_CALENDAR_ROC,
]

export type DateCalendar = typeof ALLOWED_DATE_CALENDAR[number]

export const DATE_DAY_2DIGIT = '2-digit'

export const DATE_DAY_NUMERIC = 'numeric'

export const ALLOWED_DATE_DAY = [
  DATE_DAY_2DIGIT,
  DATE_DAY_NUMERIC,
]

export type DateDay = typeof ALLOWED_DATE_DAY[number]

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

export const DATE_ERA_LONG = 'long'

export const DATE_ERA_NARROW = 'narrow'

export const DATE_ERA_SHORT = 'short'

export const ALLOWED_DATE_ERA = [
  DATE_ERA_LONG,
  DATE_ERA_NARROW,
  DATE_ERA_SHORT,
]

export type DateEra = typeof ALLOWED_DATE_ERA[number]

export const DATE_INTERVAL_LONG = 'long'

export const DATE_INTERVAL_LONG_MASK = 'longMask'

export const DATE_INTERVAL_NARROW = 'narrow'

export const DATE_INTERVAL_SHORT = 'short'

export const DATE_INTERVAL_SHORT_MASK = 'shortMask'

export const ALLOWED_DATE_INTERVAL = [
  DATE_INTERVAL_LONG,
  DATE_INTERVAL_LONG_MASK,
  DATE_INTERVAL_SHORT,
  DATE_INTERVAL_SHORT_MASK,
]

export type DateInterval = typeof ALLOWED_DATE_INTERVAL[number]

export const DATE_MONTH_2DIGIT = '2-digit'

export const DATE_MONTH_LONG = 'long'

export const DATE_MONTH_NARROW = 'narrow'

export const DATE_MONTH_NUMERIC = 'numeric'

export const DATE_MONTH_SHORT = 'short'

export const ALLOWED_DATE_MONTH = [
  DATE_MONTH_2DIGIT,
  DATE_MONTH_LONG,
  DATE_MONTH_NARROW,
  DATE_MONTH_NUMERIC,
  DATE_MONTH_SHORT
]

export type DateMonth = typeof ALLOWED_DATE_MONTH[number]

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

export const DATE_WEEK_2DIGIT = '2-digit'

export const DATE_WEEK_NUMERIC = 'numeric'

export const ALLOWED_DATE_WEEK = [
  DATE_WEEK_2DIGIT,
  DATE_WEEK_NUMERIC,
]

export type DateWeek = typeof ALLOWED_DATE_WEEK[number]

export const DATE_WEEKDAY_DELTA_LONG = 'deltaLong'

export const DATE_WEEKDAY_DELTA_SHORT = 'deltaShort'

export const DATE_WEEKDAY_LONG = 'long'

export const DATE_WEEKDAY_NARROW = 'narrow'

export const DATE_WEEKDAY_NUMERIC = 'numeric'

export const DATE_WEEKDAY_SHORT = 'short'

export const ALLOWED_DATE_WEEKDAY = [
  DATE_WEEKDAY_DELTA_LONG,
  DATE_WEEKDAY_DELTA_SHORT,
  DATE_WEEKDAY_LONG,
  DATE_WEEKDAY_NARROW,
  DATE_WEEKDAY_NUMERIC,
  DATE_WEEKDAY_SHORT,
]

export const DATE_WEEKDAY_DELTA_YSD = 'deltaYsd'

export const DATE_WEEKDAY_DELTA_TDY = 'deltaTdy'

export const DATE_WEEKDAY_DELTA_TMW = 'deltaTmw'

export const DATE_WEEKDAY_DELTA_YESTERDAY = 'deltaYesterday'

export const DATE_WEEKDAY_DELTA_TODAY = 'deltaToday'

export const DATE_WEEKDAY_DELTA_TOMORROW = 'deltaTomorrow'

export type DateWeekday = typeof ALLOWED_DATE_WEEKDAY[number]

export const DATE_YEAR_2DIGIT = '2-digit'

export const DATE_YEAR_NUMERIC = 'numeric'

export const ALLOWED_DATE_YEAR = [
  DATE_YEAR_2DIGIT,
  DATE_YEAR_NUMERIC,
]

export type DateYear = typeof ALLOWED_DATE_YEAR[number]

export interface EraOptions {
  era?: DateEra;
}

export const NUMBER_COMPACT_DISPLAY_LONG = 'long'

export const NUMBER_COMPACT_DISPLAY_SHORT = 'short'

export const ALLOWED_NUMBER_COMPACT_DISPLAY = [
  NUMBER_COMPACT_DISPLAY_LONG,
  NUMBER_COMPACT_DISPLAY_SHORT
]

export interface DayOptions {
  day?: DateDay;
}

export interface DayPeriodOptions {
  dayPeriod?: TimeDayPeriod;
  lowerCase?: boolean;
}

export interface FractionalSecondOptions {
  fractionalSecondDigits?: number; //1 - 3
}

export interface HourOptions {
  hour?: TimeHour;
  hour12?: boolean;
  hourCycle?: TimeHourCycle;
}

export interface IntervalOptions {
  interval?: DateInterval;
  unit?: IntervalUnits;
}

export interface Interval {
  past: boolean;
  unit: IntervalUnits;
  value: number;
}

export interface MinuteOptions {
  minute?: TimeMinute;
}

export interface MonthOptions {
  month?: DateMonth;
}

export type NumberCompactDisplay = typeof ALLOWED_NUMBER_COMPACT_DISPLAY[number]

export const NUMBER_CURRENCY_DISPLAY_CODE = 'code'

export const NUMBER_CURRENCY_DISPLAY_NAME = 'name'

export const NUMBER_CURRENCY_DISPLAY_NARROW_SYMBOL = 'narrowSymbol'

export const NUMBER_CURRENCY_DISPLAY_SYMBOL = 'symbol'

export const ALLOWED_NUMBER_CURRENCY_DISPLAY = [
  NUMBER_CURRENCY_DISPLAY_CODE,
  NUMBER_CURRENCY_DISPLAY_NAME,
  NUMBER_CURRENCY_DISPLAY_NARROW_SYMBOL,
  NUMBER_CURRENCY_DISPLAY_SYMBOL,
]

export type NumberCurrencyDisplay = typeof ALLOWED_NUMBER_CURRENCY_DISPLAY[number]

export const NUMBER_CURRENCY_SIGN_ACCOUNTING = 'accounting'

export const NUMBER_CURRENCY_SIGN_STANDARD = 'standard'

export const ALLOWED_NUMBER_CURRENCY_SIGN = [
  NUMBER_CURRENCY_SIGN_ACCOUNTING,
  NUMBER_CURRENCY_SIGN_STANDARD,
]

export type NumberCurrencySign = typeof ALLOWED_NUMBER_CURRENCY_SIGN[number]

export const NUMBER_NOTATION_COMPACT = 'compact'

export const NUMBER_NOTATION_ENGINEERING = 'engineering'

export const NUMBER_NOTATION_SCIENTIFIC = 'scientific'

export const NUMBER_NOTATION_STANDARD = 'standard'

export const ALLOWED_NUMBER_NOTATION = [
  NUMBER_NOTATION_COMPACT,
  NUMBER_NOTATION_ENGINEERING,
  NUMBER_NOTATION_SCIENTIFIC,
  NUMBER_NOTATION_STANDARD
]

export type NumberNotation = typeof ALLOWED_NUMBER_NOTATION[number]

export interface NumberOptions {
  compactDisplay?: NumberCompactDisplay;
  currency?: string; //https://en.wikipedia.org/wiki/ISO_4217#List_of_ISO_4217_currency_codes
  currencyDisplay?: NumberCurrencyDisplay;
  currencySign?: NumberCurrencySign;
  //localeMatcher is ignored in this implementation
  maximumFractionDigits?: number; //0 - 100
  maximumSignificantDigits?: number; //1 - 21
  minimumFractionDigits?: number; //0 - 100
  minimumIntegerDigits?: number; //1 - 21
  minimumSignificantDigits?: number; //1 - 21
  notation?: NumberNotation;
  roundingIncrement?: 1 | 2 | 5 | 10 | 20 | 25 | 50 | 100 | 200 | 250 | 500 | 1000 | 2000 | 2500 | 5000;
  roundingMode?: NumberRoundingMode;
  roundingPriority?: NumberRoundingPriority;
  signDisplay?: NumberSignDisplay;
  style?: NumberStyles;
  trailingZeroDisplay?: NumberTrailingZeroDisplay;
  unit?: string; //https://tc39.es/ecma402/#table-sanctioned-single-unit-identifiers
  unitDisplay?: NumberUnitDisplay;
  useGrouping?: NumberUseGrouping;
}

export const NUMBER_ROUNDING_MODE_CEIL = 'ceil'

export const NUMBER_ROUNDING_MODE_EXPAND = 'expand'

export const NUMBER_ROUNDING_MODE_FLOOR = 'flooor'

export const NUMBER_ROUNDING_MODE_HALF_CEIL = 'halfCeil'

export const NUMBER_ROUNDING_MODE_HALF_EVEN = 'halfEven'

export const NUMBER_ROUNDING_MODE_HALF_EXPAND = 'halfExpand'

export const NUMBER_ROUNDING_MODE_HALF_FLOOR = 'halfFloor'

export const NUMBER_ROUNDING_MODE_HALF_TRUNC = 'halfTrunc'

export const NUMBER_ROUNDING_MODE_TRUNC = 'trunc'

export const ALLOWED_NUMBER_ROUNDING_MODE = [
  NUMBER_ROUNDING_MODE_CEIL,
  NUMBER_ROUNDING_MODE_EXPAND,
  NUMBER_ROUNDING_MODE_FLOOR,
  NUMBER_ROUNDING_MODE_HALF_CEIL,
  NUMBER_ROUNDING_MODE_HALF_EVEN,
  NUMBER_ROUNDING_MODE_HALF_EXPAND, //default
  NUMBER_ROUNDING_MODE_HALF_FLOOR,
  NUMBER_ROUNDING_MODE_HALF_TRUNC,
  NUMBER_ROUNDING_MODE_TRUNC,
]

export type NumberRoundingMode = typeof ALLOWED_NUMBER_ROUNDING_MODE[number]

export const NUMBER_ROUNDING_PRIORITY_AUTO = 'auto'

export const NUMBER_ROUNDING_PRIORITY_LESS_PRECISION = 'lessPricision'

export const NUMBER_ROUNDING_PRIORITY_MORE_PRECISION = 'morePrecision'

export const ALLOWED_NUMBER_ROUNDING_PRIORITY = [
  NUMBER_ROUNDING_PRIORITY_AUTO,
  NUMBER_ROUNDING_PRIORITY_LESS_PRECISION,
  NUMBER_ROUNDING_PRIORITY_MORE_PRECISION
]

export type NumberRoundingPriority = typeof ALLOWED_NUMBER_ROUNDING_PRIORITY[number]

export const NUMBER_SIGN_DISPLAY_ALWAYS = 'always'

export const NUMBER_SIGN_DISPLAY_AUTO = 'auto'

export const NUMBER_SIGN_DISPLAY_EXCEPT_ZERO = 'exceptZero'

export const NUMBER_SIGN_DISPLAY_NEGATIVE = 'negative'

export const NUMBER_SIGN_DISPLAY_NEVER = 'never'

export const ALLOWED_NUMBER_SIGN_DISPLAY = [
  NUMBER_SIGN_DISPLAY_ALWAYS,
  NUMBER_SIGN_DISPLAY_AUTO,
  NUMBER_SIGN_DISPLAY_EXCEPT_ZERO,
  NUMBER_SIGN_DISPLAY_NEGATIVE,
  NUMBER_SIGN_DISPLAY_NEVER
]

export type NumberSignDisplay = typeof ALLOWED_NUMBER_SIGN_DISPLAY[number]

export const NUMBER_STYLE_CURRENCY = 'currency'

export const NUMBER_STYLE_DECIMAL = 'decimal'

export const NUMBER_STYLE_PERCENT = 'percent'

export const NUMBER_STYLE_UNIT = 'unit'

export const ALLOWED_NUMBER_STYLES = [
  NUMBER_STYLE_CURRENCY,
  NUMBER_STYLE_DECIMAL,
  NUMBER_STYLE_PERCENT,
  NUMBER_STYLE_UNIT,
]

export type NumberStyles = typeof ALLOWED_NUMBER_STYLES[number]

export const NUMBER_TRAILING_ZERO_DISPLAY_AUTO = 'auto'

export const NUMBER_TRAILING_ZERO_DISPLAY_STRIP_IF_INTEGER = 'stripIfInteger'

export const ALLOWED_NUMBER_TRAILING_ZERO_DISPLAY = [
  NUMBER_TRAILING_ZERO_DISPLAY_AUTO,
  NUMBER_TRAILING_ZERO_DISPLAY_STRIP_IF_INTEGER,
]

export type NumberTrailingZeroDisplay = typeof ALLOWED_NUMBER_TRAILING_ZERO_DISPLAY[number]

export const NUMBER_UNIT_DISPLAY_LONG = 'long'

export const NUMBER_UNIT_DISPLAY_NARROW = 'narrow'

export const NUMBER_UNIT_DISPLAY_SHORT = 'short'

export const ALLOWED_NUMBER_UNIT_DISPLAY = [
  NUMBER_UNIT_DISPLAY_LONG,
  NUMBER_UNIT_DISPLAY_NARROW,
  NUMBER_UNIT_DISPLAY_SHORT
]

export type NumberUnitDisplay = typeof ALLOWED_NUMBER_UNIT_DISPLAY[number]

export const NUMBER_USE_GROUPING_ALWAYS = 'always'

export const NUMBER_USE_GROUPING_AUTO = 'auto'

export const NUMBER_USE_GROUPING_MIN2 = 'min2'

export const ALLOWED_NUMBER_USE_GROUPING = [
  NUMBER_USE_GROUPING_ALWAYS,
  NUMBER_USE_GROUPING_AUTO,
  NUMBER_USE_GROUPING_MIN2,
  true,
  false
]

export type NumberUseGrouping = typeof ALLOWED_NUMBER_USE_GROUPING[number]

export interface SecondOptions {
  second?: TimeSecond;
}

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
  TextDisplayProps,
  ClassListOptional,
  StyleOptional
{
}

export const TEXT_DISPLAY_TYPE_DATE = 'date'

export const TEXT_DISPLAY_TYPE_DATE_TIME = 'dateTime'

export const TEXT_DISPLAY_TYPE_DAY = 'day'

export const TEXT_DISPLAY_TYPE_DAY_PERIOD = 'dayPeriod'

export const TEXT_DISPLAY_TYPE_ERA = 'era'

export const TEXT_DISPLAY_TYPE_FRACTIONAL_SECOND = 'fractionalSecond'

export const TEXT_DISPLAY_TYPE_HOUR = 'hour'

export const TEXT_DISPLAY_TYPE_INTERVAL = 'interval'

export const TEXT_DISPLAY_TYPE_LITERAL = 'literal'

export const TEXT_DISPLAY_TYPE_MINUTE = 'minute'

export const TEXT_DISPLAY_TYPE_MONTH = 'month'

export const TEXT_DISPLAY_TYPE_NUMBER = 'number'

export const TEXT_DISPLAY_TYPE_SECOND = 'second'

export const TEXT_DISPLAY_TYPE_TEXT = 'text'

export const TEXT_DISPLAY_TYPE_TIME = 'time'

export const TEXT_DISPLAY_TYPE_TIME_ZONE_NAME = 'timeZoneName'

export const TEXT_DISPLAY_TYPE_WEEK = 'week'

export const TEXT_DISPLAY_TYPE_WEEKDAY = 'weekday'

export const TEXT_DISPLAY_TYPE_YEAR = 'year'

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

export const ALLOWED_INTERVAL_UNITS = [
  TEXT_DISPLAY_TYPE_DAY,
  TEXT_DISPLAY_TYPE_HOUR,
  TEXT_DISPLAY_TYPE_MINUTE,
  TEXT_DISPLAY_TYPE_MONTH,
  TEXT_DISPLAY_TYPE_SECOND,
  TEXT_DISPLAY_TYPE_WEEK,
  TEXT_DISPLAY_TYPE_YEAR
]

export type IntervalUnits = typeof ALLOWED_INTERVAL_UNITS[number]

export interface TextDisplayPartBase {
  index?: number;
}
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

export interface TextDisplayPartDay extends TextDisplayPartBase {
  locale?: string,
  options?: DayOptions,
  timeZone?: string; //https://www.iana.org/time-zones,
  type: typeof TEXT_DISPLAY_TYPE_DAY,
}

export interface TextDisplayPartDayPeriod extends TextDisplayPartBase {
  locale?: string,
  options?: DayPeriodOptions,
  timeZone?: string; //https://www.iana.org/time-zones,
  type: typeof TEXT_DISPLAY_TYPE_DAY_PERIOD,
}

export interface TextDisplayPartEra extends TextDisplayPartBase {
  locale?: string,
  options?: EraOptions,
  timeZone?: string; //https://www.iana.org/time-zones,
  type: typeof TEXT_DISPLAY_TYPE_ERA,
}

export interface TextDisplayPartFractionalSecond extends TextDisplayPartBase {
  locale?: string,
  options?: FractionalSecondOptions,
  timeZone?: string; //https://www.iana.org/time-zones,
  type: typeof TEXT_DISPLAY_TYPE_FRACTIONAL_SECOND,
}

export interface TextDisplayPartHour extends TextDisplayPartBase {
  locale?: string,
  options?: HourOptions,
  timeZone?: string; //https://www.iana.org/time-zones,
  type: typeof TEXT_DISPLAY_TYPE_HOUR,
}

export interface TextDisplayPartInterval extends TextDisplayPartBase {
  locale?: string,
  options?: IntervalOptions,
  timeZone?: string; //https://www.iana.org/time-zones,
  type: typeof TEXT_DISPLAY_TYPE_INTERVAL,
}

export interface TextDisplayPartLiteral {
  type: typeof TEXT_DISPLAY_TYPE_LITERAL,
  value?: string;
}

export interface TextDisplayPartMinute extends TextDisplayPartBase {
  locale?: string,
  options?: MinuteOptions,
  timeZone?: string; //https://www.iana.org/time-zones,
  type: typeof TEXT_DISPLAY_TYPE_MINUTE,
}

export interface TextDisplayPartMonth extends TextDisplayPartBase {
  locale?: string,
  options?: MonthOptions,
  timeZone?: string; //https://www.iana.org/time-zones,
  type: typeof TEXT_DISPLAY_TYPE_MONTH,
}

export interface TextDisplayPartNumber extends TextDisplayPartBase {
  options?: NumberOptions,
  type: typeof TEXT_DISPLAY_TYPE_NUMBER,
}

export interface TextDisplayPartSecond extends TextDisplayPartBase {
  locale?: string,
  options?: SecondOptions,
  timeZone?: string; //https://www.iana.org/time-zones,
  type: typeof TEXT_DISPLAY_TYPE_SECOND,
}

export interface TextDisplayPartText extends TextDisplayPartBase {
  type: typeof TEXT_DISPLAY_TYPE_TEXT,
}

export interface TextDisplayPartTime extends TextDisplayPartBase {
  locale?: string,
  options?: TimeOptions,
  timeZone?: string; //https://www.iana.org/time-zones,
  type: typeof TEXT_DISPLAY_TYPE_TIME,
}

export interface TextDisplayPartTimeZone extends TextDisplayPartBase {
  locale?: string,
  options?: TimeZoneOptions,
  timeZone?: string; //https://www.iana.org/time-zones,
  type: typeof TEXT_DISPLAY_TYPE_TIME_ZONE_NAME,
}

export interface TextDisplayPartWeek extends TextDisplayPartBase {
  locale?: string,
  options?: WeekOptions,
  timeZone?: string; //https://www.iana.org/time-zones,
  type: typeof TEXT_DISPLAY_TYPE_WEEK,
}

export interface TextDisplayPartWeekday extends TextDisplayPartBase {
  locale?: string,
  options?: WeekdayOptions,
  timeZone?: string; //https://www.iana.org/time-zones,
  type: typeof TEXT_DISPLAY_TYPE_WEEKDAY,
}

export interface TextDisplayPartYear extends TextDisplayPartBase {
  locale?: string,
  options?: YearOptions,
  timeZone?: string; //https://www.iana.org/time-zones,
  type: typeof TEXT_DISPLAY_TYPE_YEAR,
}

export type TextDisplayPart = TextDisplayPartObjects | string

export type TextDisplayPartObjects = TextDisplayPartDate |
  TextDisplayPartDateTime |
  TextDisplayPartDateTimeObjects |
  TextDisplayPartLiteral |
  TextDisplayPartNumber |
  TextDisplayPartText |
  TextDisplayPartTime

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

export type TextDisplayMask = TextDisplayPart[]

export const TIME_DAY_PERIOD_LONG = 'long'

export const TIME_DAY_PERIOD_NARROW = 'narrow'

export const TIME_DAY_PERIOD_SHORT = 'short'

export const ALLOWED_TIME_DAY_PERIOD = [
  TIME_DAY_PERIOD_LONG,
  TIME_DAY_PERIOD_NARROW,
  TIME_DAY_PERIOD_SHORT,
]

export type TimeDayPeriod = typeof ALLOWED_TIME_DAY_PERIOD[number]

export const TIME_HOUR_2DIGIT = '2-digit'

export const TIME_HOUR_NUMERIC = 'numeric'

export const ALLOWED_TIME_HOUR = [
  TIME_HOUR_2DIGIT,
  TIME_HOUR_NUMERIC,
]

export type TimeHour = typeof ALLOWED_TIME_HOUR[number]

export const TIME_MINUTE_2DIGIT = '2-digit'

export const TIME_MINUTE_NUMERIC = 'numeric'

export const ALLOWED_TIME_MINUTE = [
  TIME_MINUTE_2DIGIT,
  TIME_MINUTE_NUMERIC,
]

export type TimeMinute = typeof ALLOWED_TIME_MINUTE[number]

export const TIME_SECOND_2DIGIT = '2-digit'

export const TIME_SECOND_NUMERIC = 'numeric'

export const ALLOWED_TIME_SECOND = [
  TIME_SECOND_2DIGIT,
  TIME_SECOND_NUMERIC,
]

export type TimeSecond = typeof ALLOWED_TIME_SECOND[number]

export const TIME_HOUR_CYCLE_H11 = 'h11'

export const TIME_HOUR_CYCLE_H12 = 'h12'

export const TIME_HOUR_CYCLE_H23 = 'h23'

export const TIME_HOUR_CYCLE_H24 = 'h24'

export const ALLOWED_TIME_HOUR_CYCLE = [
  TIME_HOUR_CYCLE_H11,
  TIME_HOUR_CYCLE_H12,
  TIME_HOUR_CYCLE_H23,
  TIME_HOUR_CYCLE_H24
]

export type TimeHourCycle = typeof ALLOWED_TIME_HOUR_CYCLE[number]

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

export interface TimeZoneOptions {
  timeZone?: string; //https://www.iana.org/time-zones
  timeZoneName?: TimeZoneName;
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

export const TIME_ZONE_NAME_LONG = 'long'

export const TIME_ZONE_NAME_LONG_GENERIC = 'longGeneric'

export const TIME_ZONE_NAME_LONG_OFFSET = 'longOffset'

export const TIME_ZONE_NAME_REGION = 'region'

export const TIME_ZONE_NAME_SHORT = 'short'

export const TIME_ZONE_NAME_SHORT_GENERIC = 'shortGeneric'

export const TIME_ZONE_NAME_SHORT_OFFSET = 'shortOffset'

export const ALLOWED_TIME_ZONE_NAME = [
  TIME_ZONE_NAME_LONG,
  TIME_ZONE_NAME_LONG_GENERIC,
  TIME_ZONE_NAME_LONG_OFFSET,
  TIME_ZONE_NAME_REGION,
  TIME_ZONE_NAME_SHORT,
  TIME_ZONE_NAME_SHORT_GENERIC,
  TIME_ZONE_NAME_SHORT_OFFSET,
]

export type TimeZoneName = typeof ALLOWED_TIME_ZONE_NAME[number]

export interface WeekOptions {
  week?: DateWeek;
}

export interface WeekdayOptions {
  weekday?: DateWeekday;
}

export interface YearOptions {
  year?: DateYear;
}
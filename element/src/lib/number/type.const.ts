/**
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat/NumberFormat#compactdisplay
 */
export const NUMBER_COMPACT_DISPLAY_LONG = 'long'

export const NUMBER_COMPACT_DISPLAY_SHORT = 'short'

export const ALLOWED_NUMBER_COMPACT_DISPLAY = [
  NUMBER_COMPACT_DISPLAY_LONG,
  NUMBER_COMPACT_DISPLAY_SHORT
]

export type NumberCompactDisplay = typeof ALLOWED_NUMBER_COMPACT_DISPLAY[number]

/**
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat/NumberFormat#currencydisplay
 */
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

/**
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat/NumberFormat#currencysign
 */
export const NUMBER_CURRENCY_SIGN_ACCOUNTING = 'accounting'

export const NUMBER_CURRENCY_SIGN_STANDARD = 'standard'

export const ALLOWED_NUMBER_CURRENCY_SIGN = [
  NUMBER_CURRENCY_SIGN_ACCOUNTING,
  NUMBER_CURRENCY_SIGN_STANDARD,
]

export type NumberCurrencySign = typeof ALLOWED_NUMBER_CURRENCY_SIGN[number]

/**
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat/NumberFormat#notation
 */
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

/**
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat/NumberFormat#roundingmode
 */
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

/**
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat/NumberFormat#roundingpriority
 */
export const NUMBER_ROUNDING_PRIORITY_AUTO = 'auto'

export const NUMBER_ROUNDING_PRIORITY_LESS_PRECISION = 'lessPricision'

export const NUMBER_ROUNDING_PRIORITY_MORE_PRECISION = 'morePrecision'

export const ALLOWED_NUMBER_ROUNDING_PRIORITY = [
  NUMBER_ROUNDING_PRIORITY_AUTO,
  NUMBER_ROUNDING_PRIORITY_LESS_PRECISION,
  NUMBER_ROUNDING_PRIORITY_MORE_PRECISION
]

export type NumberRoundingPriority = typeof ALLOWED_NUMBER_ROUNDING_PRIORITY[number]

/**
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat/NumberFormat#signdisplay
 */
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

/**
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat/NumberFormat#style
 */
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

/**
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat/NumberFormat#trailingzerodisplay
 */
export const NUMBER_TRAILING_ZERO_DISPLAY_AUTO = 'auto'

export const NUMBER_TRAILING_ZERO_DISPLAY_STRIP_IF_INTEGER = 'stripIfInteger'

export const ALLOWED_NUMBER_TRAILING_ZERO_DISPLAY = [
  NUMBER_TRAILING_ZERO_DISPLAY_AUTO,
  NUMBER_TRAILING_ZERO_DISPLAY_STRIP_IF_INTEGER,
]

export type NumberTrailingZeroDisplay = typeof ALLOWED_NUMBER_TRAILING_ZERO_DISPLAY[number]

/**
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat/NumberFormat#unitdisplay
 */
export const NUMBER_UNIT_DISPLAY_LONG = 'long'

export const NUMBER_UNIT_DISPLAY_NARROW = 'narrow'

export const NUMBER_UNIT_DISPLAY_SHORT = 'short'

export const ALLOWED_NUMBER_UNIT_DISPLAY = [
  NUMBER_UNIT_DISPLAY_LONG,
  NUMBER_UNIT_DISPLAY_NARROW,
  NUMBER_UNIT_DISPLAY_SHORT
]

export type NumberUnitDisplay = typeof ALLOWED_NUMBER_UNIT_DISPLAY[number]

/**
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat/NumberFormat#usegrouping
 */
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

/**
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat/NumberFormat#roundingincrement
 */
export type RoundingIncrements = 1 | 2 | 5 | 10 | 20 | 25 | 50 | 100 | 200 | 250 | 500 | 1000 | 2000 | 2500 | 5000
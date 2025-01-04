import {
  TEXT_DISPLAY_TYPE_DAY,
  TEXT_DISPLAY_TYPE_HOUR,
  TEXT_DISPLAY_TYPE_MINUTE,
  TEXT_DISPLAY_TYPE_MONTH,
  TEXT_DISPLAY_TYPE_SECOND,
  TEXT_DISPLAY_TYPE_WEEK,
  TEXT_DISPLAY_TYPE_YEAR,

} from '../types.js'
import type {
  IntervalUnits,
} from '../types.js'

export function intervalUnitToType(match?: string) : IntervalUnits | undefined {
  switch (match?.substring(match.length - 1)) {
    case 'y':
      return TEXT_DISPLAY_TYPE_YEAR
    case 'm':
      return TEXT_DISPLAY_TYPE_MONTH
    case 'd':
      return TEXT_DISPLAY_TYPE_DAY
    case 'h':
    case 'H':
      return TEXT_DISPLAY_TYPE_HOUR
    case 'M':
      return TEXT_DISPLAY_TYPE_MINUTE
    case 'W':
      return TEXT_DISPLAY_TYPE_WEEK
    case 's':
      return TEXT_DISPLAY_TYPE_SECOND
  }
}
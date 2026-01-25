import {
  TEXT_DISPLAY_TYPE_DAY,
} from '../day-types.js'

import {
  TEXT_DISPLAY_TYPE_HOUR,
} from '../hour-types.js'

import {
  TEXT_DISPLAY_TYPE_MINUTE,
} from '../minute-types.js'

import {
  TEXT_DISPLAY_TYPE_MONTH,
} from '../month-types.js'

import {
  TEXT_DISPLAY_TYPE_SECOND,
} from '../second-types.js'

import {
  TEXT_DISPLAY_TYPE_WEEK,
} from '../week-types.js'

import {
  TEXT_DISPLAY_TYPE_YEAR,
} from '../year-types.js'

import type {
  IntervalUnits,
} from '../interval-types.js'

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
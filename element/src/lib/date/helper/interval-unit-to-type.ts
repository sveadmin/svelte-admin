import {
  COMPONENT_DAY,
} from '../day-types.js'

import {
  COMPONENT_HOUR,
} from '../hour-types.js'

import {
  COMPONENT_MINUTE,
} from '../minute-types.js'

import {
  COMPONENT_MONTH,
} from '../month-types.js'

import {
  COMPONENT_SECOND,
} from '../second-types.js'

import {
  COMPONENT_WEEK,
} from '../week-types.js'

import {
  COMPONENT_YEAR,
} from '../year-types.js'

import type {
  IntervalUnits,
} from '../interval-types.js'

export function intervalUnitToType(match?: string) : IntervalUnits | undefined {
  switch (match?.substring(match.length - 1)) {
    case 'y':
      return COMPONENT_YEAR
    case 'm':
      return COMPONENT_MONTH
    case 'd':
      return COMPONENT_DAY
    case 'h':
    case 'H':
      return COMPONENT_HOUR
    case 'M':
      return COMPONENT_MINUTE
    case 'W':
      return COMPONENT_WEEK
    case 's':
      return COMPONENT_SECOND
  }
}
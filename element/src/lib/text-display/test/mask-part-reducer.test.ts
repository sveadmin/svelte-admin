import { describe, expect, it } from 'vitest'

import {
  createOptionStore,
} from '$lib/helper/index.js'

import {
  prepareMaskPartReducer,
} from '../helper/index.js'

import {
  DATE_DAY_2DIGIT,
  DATE_ERA_NARROW,
  DATE_MONTH_2DIGIT,
  DATE_MONTH_NARROW,
  DATE_WEEKDAY_SHORT,
  DATE_YEAR_2DIGIT,
  TEXT_DISPLAY_TYPE_DATE,
  TEXT_DISPLAY_TYPE_DATE_TIME,
  TEXT_DISPLAY_TYPE_DAY,
  TEXT_DISPLAY_TYPE_DAY_PERIOD,
  TEXT_DISPLAY_TYPE_ERA,
  TEXT_DISPLAY_TYPE_FRACTIONAL_SECOND,
  TEXT_DISPLAY_TYPE_HOUR,
  TEXT_DISPLAY_TYPE_LITERAL,
  TEXT_DISPLAY_TYPE_MINUTE,
  TEXT_DISPLAY_TYPE_MONTH,
  TEXT_DISPLAY_TYPE_NUMBER,
  TEXT_DISPLAY_TYPE_SECOND,
  TEXT_DISPLAY_TYPE_TEXT,
  TEXT_DISPLAY_TYPE_TIME,
  TEXT_DISPLAY_TYPE_TIME_ZONE_NAME,
  TEXT_DISPLAY_TYPE_WEEKDAY, 
  TEXT_DISPLAY_TYPE_YEAR,
  TIME_DAY_PERIOD_NARROW,
  TIME_HOUR_2DIGIT,
  TIME_HOUR_CYCLE_H23,
  TIME_MINUTE_2DIGIT,
  TIME_SECOND_2DIGIT,
  TIME_ZONE_NAME_SHORT_OFFSET,
} from '../types.js'

import type {
  TextDisplayMask,
  TextDisplayPartObjects,
} from '../types.js'

describe('Test mask part reducer', async () => {
  it('Non-expanding non-date parts are returned as they are added', async () => {
    const maskPartReducer = await prepareMaskPartReducer()
    const mask: TextDisplayMask = [
      {
        type: TEXT_DISPLAY_TYPE_LITERAL,
        value: 'test'
      },
      {
        type: TEXT_DISPLAY_TYPE_NUMBER,
      },
      {
        type: TEXT_DISPLAY_TYPE_TEXT,
      },
    ]

    expect(mask.reduce(maskPartReducer, [])).toEqual(mask)
  })

  it('Non-expanding date parts have locale and timeZone added', async () => {
    const maskPartReducer = await prepareMaskPartReducer()
    const mask: TextDisplayMask = [
      {
        type: TEXT_DISPLAY_TYPE_DAY,
      },
      {
        type: TEXT_DISPLAY_TYPE_DAY_PERIOD,
      },
      {
        type: TEXT_DISPLAY_TYPE_ERA,
      },
      {
        type: TEXT_DISPLAY_TYPE_FRACTIONAL_SECOND,
      },
      {
        type: TEXT_DISPLAY_TYPE_HOUR,
      },
      {
        type: TEXT_DISPLAY_TYPE_MINUTE,
      },
      {
        type: TEXT_DISPLAY_TYPE_MONTH,
      },
      {
        type: TEXT_DISPLAY_TYPE_SECOND,
      },
      {
        type: TEXT_DISPLAY_TYPE_TIME_ZONE_NAME,
      },
      {
        type: TEXT_DISPLAY_TYPE_WEEKDAY,
      },
      {
        type: TEXT_DISPLAY_TYPE_YEAR,
      },
    ]

    const transformed: TextDisplayMask = [
      {
        locale: 'sv',
        timeZone: 'UTC',
        type: TEXT_DISPLAY_TYPE_DAY,
      },
      {
        locale: 'sv',
        timeZone: 'UTC',
        type: TEXT_DISPLAY_TYPE_DAY_PERIOD,
      },
      {
        locale: 'sv',
        timeZone: 'UTC',
        type: TEXT_DISPLAY_TYPE_ERA,
      },
      {
        locale: 'sv',
        timeZone: 'UTC',
        type: TEXT_DISPLAY_TYPE_FRACTIONAL_SECOND,
      },
      {
        locale: 'sv',
        timeZone: 'UTC',
        type: TEXT_DISPLAY_TYPE_HOUR,
      },
      {
        locale: 'sv',
        timeZone: 'UTC',
        type: TEXT_DISPLAY_TYPE_MINUTE,
      },
      {
        locale: 'sv',
        timeZone: 'UTC',
        type: TEXT_DISPLAY_TYPE_MONTH,
      },
      {
        locale: 'sv',
        timeZone: 'UTC',
        type: TEXT_DISPLAY_TYPE_SECOND,
      },
      {
        locale: 'sv',
        timeZone: 'UTC',
        type: TEXT_DISPLAY_TYPE_TIME_ZONE_NAME,
      },
      {
        locale: 'sv',
        timeZone: 'UTC',
        type: TEXT_DISPLAY_TYPE_WEEKDAY,
      },
      {
        locale: 'sv',
        timeZone: 'UTC',
        type: TEXT_DISPLAY_TYPE_YEAR,
      },
    ]

    expect(mask.reduce(maskPartReducer, [])).toEqual(transformed)
  })

  it('Default date parsing', async () => {
    const maskPartReducer = await prepareMaskPartReducer()
    const mask: TextDisplayMask = [
      {
        type: TEXT_DISPLAY_TYPE_DATE,
      },
    ]

    const output: TextDisplayPartObjects[] = [
      {
        locale: 'sv',
        timeZone: 'UTC',
        type: TEXT_DISPLAY_TYPE_YEAR,
      },
      {
        type: TEXT_DISPLAY_TYPE_LITERAL,
        value: '-'
      },
      {
        locale: 'sv',
        timeZone: 'UTC',
        type: TEXT_DISPLAY_TYPE_MONTH,
      },
      {
        type: TEXT_DISPLAY_TYPE_LITERAL,
        value: '-'
      },
      {
        locale: 'sv',
        timeZone: 'UTC',
        type: TEXT_DISPLAY_TYPE_DAY,
      },
    ]

    expect(mask.reduce(maskPartReducer, [])).toEqual(output)
  })

  it('Default date time parsing', async () => {
    const maskPartReducer = await prepareMaskPartReducer()
    const mask: TextDisplayMask = [
      {
        type: TEXT_DISPLAY_TYPE_DATE_TIME,
      },
    ]

    const output: TextDisplayPartObjects[] = [
      {
        locale: 'sv',
        timeZone: 'UTC',
        type: TEXT_DISPLAY_TYPE_YEAR,
      },
      {
        type: TEXT_DISPLAY_TYPE_LITERAL,
        value: '-'
      },
      {
        locale: 'sv',
        timeZone: 'UTC',
        type: TEXT_DISPLAY_TYPE_MONTH,
      },
      {
        type: TEXT_DISPLAY_TYPE_LITERAL,
        value: '-'
      },
      {
        locale: 'sv',
        timeZone: 'UTC',
        type: TEXT_DISPLAY_TYPE_DAY,
      },
      {
        type: TEXT_DISPLAY_TYPE_LITERAL,
        value: ' '
      },
      {
        locale: 'sv',
        timeZone: 'UTC',
        type: TEXT_DISPLAY_TYPE_HOUR,
      },
      {
        type: TEXT_DISPLAY_TYPE_LITERAL,
        value: ':'
      },
      {
        locale: 'sv',
        timeZone: 'UTC',
        type: TEXT_DISPLAY_TYPE_MINUTE,
      },
      {
        type: TEXT_DISPLAY_TYPE_LITERAL,
        value: ':'
      },
      {
        locale: 'sv',
        timeZone: 'UTC',
        type: TEXT_DISPLAY_TYPE_SECOND,
      },
    ]

    expect(mask.reduce(maskPartReducer, [])).toEqual(output)
  })

  it('Default time parsing', async () => {
    const maskPartReducer = await prepareMaskPartReducer()
    const mask: TextDisplayMask = [
      {
        type: TEXT_DISPLAY_TYPE_TIME,
      },
    ]

    const output: TextDisplayPartObjects[] = [
      {
        locale: 'sv',
        timeZone: 'UTC',
        type: TEXT_DISPLAY_TYPE_HOUR,
      },
      {
        type: TEXT_DISPLAY_TYPE_LITERAL,
        value: ':'
      },
      {
        locale: 'sv',
        timeZone: 'UTC',
        type: TEXT_DISPLAY_TYPE_MINUTE,
      },
      {
        type: TEXT_DISPLAY_TYPE_LITERAL,
        value: ':'
      },
      {
        locale: 'sv',
        timeZone: 'UTC',
        type: TEXT_DISPLAY_TYPE_SECOND,
      },
    ]

    expect(mask.reduce(maskPartReducer, [])).toEqual(output)
  })

  it('Date parsing settings are passed on', async () => {
    const maskPartReducer = await prepareMaskPartReducer()
    const mask: TextDisplayMask = [
      {
        options: {
          day: DATE_DAY_2DIGIT,
          era: DATE_ERA_NARROW,
          month: DATE_MONTH_2DIGIT,
          // weekday: DATE_WEEKDAY_SHORT, 
          year: DATE_YEAR_2DIGIT,
        },
        type: TEXT_DISPLAY_TYPE_DATE,
      },
    ]

    const output: TextDisplayPartObjects[] = [
      {
        locale: 'sv',
        options: {
          year: DATE_YEAR_2DIGIT,
        },
        timeZone: 'UTC',
        type: TEXT_DISPLAY_TYPE_YEAR,
      },
      {
        type: TEXT_DISPLAY_TYPE_LITERAL,
        value: '-'
      },
      {
        locale: 'sv',
        options: {
          month: DATE_MONTH_2DIGIT,
        },
        timeZone: 'UTC',
        type: TEXT_DISPLAY_TYPE_MONTH,
      },
      {
        type: TEXT_DISPLAY_TYPE_LITERAL,
        value: '-'
      },
      {
        locale: 'sv',
        options: {
          day: DATE_DAY_2DIGIT,
        },
        timeZone: 'UTC',
        type: TEXT_DISPLAY_TYPE_DAY,
      },
      {
        type: TEXT_DISPLAY_TYPE_LITERAL,
        value: ' '
      },
      {
        locale: 'sv',
        options: {
          era: 'narrow',
        },
        timeZone: 'UTC',
        type: TEXT_DISPLAY_TYPE_ERA,
      },
    ]

    expect(mask.reduce(maskPartReducer, [])).toEqual(output)
  })

  it('Date time parsing settings are passed on', async () => {
    const maskPartReducer = await prepareMaskPartReducer()
    const mask: TextDisplayMask = [
      {
        options: {
          day: DATE_DAY_2DIGIT,
          dayPeriod: TIME_DAY_PERIOD_NARROW,
          era: DATE_ERA_NARROW,
          fractionalSecondDigits: 2,
          hour: TIME_HOUR_2DIGIT,
          hour12: false,
          hourCycle: TIME_HOUR_CYCLE_H23,
          minute: TIME_MINUTE_2DIGIT,
          month: DATE_MONTH_2DIGIT,
          second: TIME_SECOND_2DIGIT,
          timeZone: 'UTC',
          timeZoneName: TIME_ZONE_NAME_SHORT_OFFSET,
          // weekday: DATE_WEEKDAY_SHORT, 
          year: DATE_YEAR_2DIGIT,
        },
        type: TEXT_DISPLAY_TYPE_DATE_TIME,
      },
    ]

    const output: TextDisplayPartObjects[] = [
      {
        locale: 'sv',
        options: {
          year: DATE_YEAR_2DIGIT,
        },
        timeZone: 'UTC',
        type: TEXT_DISPLAY_TYPE_YEAR,
      },
      {
        type: TEXT_DISPLAY_TYPE_LITERAL,
        value: '-'
      },
      {
        locale: 'sv',
        options: {
          month: DATE_MONTH_2DIGIT,
        },
        timeZone: 'UTC',
        type: TEXT_DISPLAY_TYPE_MONTH,
      },
      {
        type: TEXT_DISPLAY_TYPE_LITERAL,
        value: '-'
      },
      {
        locale: 'sv',
        options: {
          day: DATE_DAY_2DIGIT,
        },
        timeZone: 'UTC',
        type: TEXT_DISPLAY_TYPE_DAY,
      },
      {
        type: TEXT_DISPLAY_TYPE_LITERAL,
        value: ' '
      },
      {
        locale: 'sv',
        options: {
          era: 'narrow',
        },
        timeZone: 'UTC',
        type: TEXT_DISPLAY_TYPE_ERA,
      },
      {
        type: TEXT_DISPLAY_TYPE_LITERAL,
        value: ' '
      },
      {
        locale: 'sv',
        options: {
          hour: TIME_HOUR_2DIGIT,
          hour12: false,
          hourCycle: TIME_HOUR_CYCLE_H23,
        },
        timeZone: 'UTC',
        type: TEXT_DISPLAY_TYPE_HOUR,
      },
      {
        type: TEXT_DISPLAY_TYPE_LITERAL,
        value: ':'
      },
      {
        locale: 'sv',
        options: {
          minute: TIME_MINUTE_2DIGIT,
        },
        timeZone: 'UTC',
        type: TEXT_DISPLAY_TYPE_MINUTE,
      },
      {
        type: TEXT_DISPLAY_TYPE_LITERAL,
        value: ':'
      },
      {
        locale: 'sv',
        options: {
          second: TIME_SECOND_2DIGIT,
        },
        timeZone: 'UTC',
        type: TEXT_DISPLAY_TYPE_SECOND,
      },
      {
        type: TEXT_DISPLAY_TYPE_LITERAL,
        value: ','
      },
      {
        locale: 'sv',
        options: {
          fractionalSecondDigits: 2,
        },
        timeZone: 'UTC',
        type: TEXT_DISPLAY_TYPE_FRACTIONAL_SECOND,
      },
      {
        type: TEXT_DISPLAY_TYPE_LITERAL,
        value: ' '
      },
      {
        locale: 'sv',
        options: {
          timeZoneName: 'shortOffset',
        },
        timeZone: 'UTC',
        type: TEXT_DISPLAY_TYPE_TIME_ZONE_NAME,
      },
    ]

    expect(mask.reduce(maskPartReducer, [])).toEqual(output)
  })

  it('Time parsing settings are passed on', async () => {
    const maskPartReducer = await prepareMaskPartReducer()
    const mask: TextDisplayMask = [
      {
        options: {
          dayPeriod: TIME_DAY_PERIOD_NARROW,
          fractionalSecondDigits: 2,
          hour: TIME_HOUR_2DIGIT,
          hour12: false,
          hourCycle: TIME_HOUR_CYCLE_H23,
          minute: TIME_MINUTE_2DIGIT,
          second: TIME_SECOND_2DIGIT,
          timeZone: 'UTC',
          timeZoneName: TIME_ZONE_NAME_SHORT_OFFSET,
          // weekday: DATE_WEEKDAY_SHORT, 
        },
        type: TEXT_DISPLAY_TYPE_TIME,
      },
    ]

    const output: TextDisplayPartObjects[] = [
      {
        locale: 'sv',
        options: {
          hour: TIME_HOUR_2DIGIT,
          hour12: false,
          hourCycle: TIME_HOUR_CYCLE_H23,
        },
        timeZone: 'UTC',
        type: TEXT_DISPLAY_TYPE_HOUR,
      },
      {
        type: TEXT_DISPLAY_TYPE_LITERAL,
        value: ':'
      },
      {
        locale: 'sv',
        options: {
          minute: TIME_MINUTE_2DIGIT,
        },
        timeZone: 'UTC',
        type: TEXT_DISPLAY_TYPE_MINUTE,
      },
      {
        type: TEXT_DISPLAY_TYPE_LITERAL,
        value: ':'
      },
      {
        locale: 'sv',
        options: {
          second: TIME_SECOND_2DIGIT,
        },
        timeZone: 'UTC',
        type: TEXT_DISPLAY_TYPE_SECOND,
      },
      {
        type: TEXT_DISPLAY_TYPE_LITERAL,
        value: ','
      },
      {
        locale: 'sv',
        options: {
          fractionalSecondDigits: 2,
        },
        timeZone: 'UTC',
        type: TEXT_DISPLAY_TYPE_FRACTIONAL_SECOND,
      },
      {
        type: TEXT_DISPLAY_TYPE_LITERAL,
        value: ' '
      },
      {
        locale: 'sv',
        options: {
          timeZoneName: 'shortOffset',
        },
        timeZone: 'UTC',
        type: TEXT_DISPLAY_TYPE_TIME_ZONE_NAME,
      },
    ]

    expect(mask.reduce(maskPartReducer, [])).toEqual(output)
  })
})
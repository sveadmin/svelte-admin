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
  DATE_YEAR_NUMERIC,
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
        index: 1,
        type: TEXT_DISPLAY_TYPE_NUMBER,
      },
      {
        type: TEXT_DISPLAY_TYPE_TEXT,
      },
    ]

    expect(mask.reduce(maskPartReducer, [])).toEqual(mask)
  })

  it('String shortcut works for literal', async () => {
    const maskPartReducer = await prepareMaskPartReducer()
    const mask: TextDisplayMask = [
      'This is a literal'
    ]
    const output: TextDisplayMask = [
      {
        type: TEXT_DISPLAY_TYPE_LITERAL,
        value: 'This is a literal'
      },
    ]

    expect(mask.reduce(maskPartReducer, [])).toEqual(output)
  })

  it('String shortcut is split when dynamic placeholders are used', async () => {
    const maskPartReducer = await prepareMaskPartReducer()
    const mask: TextDisplayMask = [
      'This phrase contains a $(text) and a $(number)!'
    ]
    const output: TextDisplayMask = [
      {
        type: TEXT_DISPLAY_TYPE_LITERAL,
        value: 'This phrase contains a '
      },
      {
        type: TEXT_DISPLAY_TYPE_TEXT,
      },
      {
        type: TEXT_DISPLAY_TYPE_LITERAL,
        value: ' and a '
      },
      {
        index: 1,
        type: TEXT_DISPLAY_TYPE_NUMBER,
      },
      {
        type: TEXT_DISPLAY_TYPE_LITERAL,
        value: '!'
      },
    ]
    expect(mask.reduce(maskPartReducer, [])).toEqual(output)

    const mask2: TextDisplayMask = [
      'Special characters can be "$(text)", "$(number)" escaped'
    ]
    const output2: TextDisplayMask = [
      {
        type: TEXT_DISPLAY_TYPE_LITERAL,
        value: 'Special characters can be '
      },
      {
        type: TEXT_DISPLAY_TYPE_LITERAL,
        value: '$(text)'
      },
      {
        type: TEXT_DISPLAY_TYPE_LITERAL,
        value: ', '
      },
      {
        type: TEXT_DISPLAY_TYPE_LITERAL,
        value: '$(number)'
      },
      {
        type: TEXT_DISPLAY_TYPE_LITERAL,
        value: ' escaped'
      },
    ]
    expect(output2).toEqual(mask2.reduce(maskPartReducer, []))

    const mask3: TextDisplayMask = [
      'Date can use format $(date:yyyy-mm-dd), $(dateTime:yyyy-mm-dd HH:MM:ss), $(time:HH:MM:ss)'
    ]
    const output3: TextDisplayMask = [
      {
        type: TEXT_DISPLAY_TYPE_LITERAL,
        value: 'Date can use format '
      },
      {
        locale: "sv-SE",
        options: {
          year: DATE_YEAR_NUMERIC,
        },
        type: TEXT_DISPLAY_TYPE_YEAR,
      },
      {
        type: TEXT_DISPLAY_TYPE_LITERAL,
        value: '-'
      },
      {
        locale: "sv-SE",
        options: {
          month: DATE_MONTH_2DIGIT,
        },
        type: TEXT_DISPLAY_TYPE_MONTH,
      },
      {
        type: TEXT_DISPLAY_TYPE_LITERAL,
        value: '-'
      },
      {
        locale: "sv-SE",
        options: {
          day: DATE_DAY_2DIGIT,
        },
        type: TEXT_DISPLAY_TYPE_DAY,
      },
      {
        type: TEXT_DISPLAY_TYPE_LITERAL,
        value: ', '
      },
      {
        index: 1,
        locale: "sv-SE",
        options: {
          year: DATE_YEAR_NUMERIC,
        },
        type: TEXT_DISPLAY_TYPE_YEAR,
      },
      {
        type: TEXT_DISPLAY_TYPE_LITERAL,
        value: '-'
      },
      {
        index: 1,
        locale: "sv-SE",
        options: {
          month: DATE_MONTH_2DIGIT,
        },
        type: TEXT_DISPLAY_TYPE_MONTH,
      },
      {
        type: TEXT_DISPLAY_TYPE_LITERAL,
        value: '-'
      },
      {
        index: 1,
        locale: "sv-SE",
        options: {
          day: DATE_DAY_2DIGIT,
        },
        type: TEXT_DISPLAY_TYPE_DAY,
      },
      {
        type: TEXT_DISPLAY_TYPE_LITERAL,
        value: ' '
      },
      {
        index: 1,
        locale: "sv-SE",
        options: {
          hour: TIME_HOUR_2DIGIT,
          hourCycle: TIME_HOUR_CYCLE_H23,
        },
        type: TEXT_DISPLAY_TYPE_HOUR,
      },
      {
        type: TEXT_DISPLAY_TYPE_LITERAL,
        value: ':'
      },
      {
        index: 1,
        locale: "sv-SE",
        options: {
          minute: TIME_MINUTE_2DIGIT,
        },
        type: TEXT_DISPLAY_TYPE_MINUTE,
      },
      {
        type: TEXT_DISPLAY_TYPE_LITERAL,
        value: ':'
      },
      {
        index: 1,
        locale: "sv-SE",
        options: {
          second: TIME_SECOND_2DIGIT,
        },
        type: TEXT_DISPLAY_TYPE_SECOND,
      },
      {
        type: TEXT_DISPLAY_TYPE_LITERAL,
        value: ', '
      },
      {
        index: 2,
        locale: "sv-SE",
        options: {
          hour: TIME_HOUR_2DIGIT,
          hourCycle: TIME_HOUR_CYCLE_H23,
        },
        type: TEXT_DISPLAY_TYPE_HOUR,
      },
      {
        type: TEXT_DISPLAY_TYPE_LITERAL,
        value: ':'
      },
      {
        index: 2,
        locale: "sv-SE",
        options: {
          minute: TIME_MINUTE_2DIGIT,
        },
        type: TEXT_DISPLAY_TYPE_MINUTE,
      },
      {
        type: TEXT_DISPLAY_TYPE_LITERAL,
        value: ':'
      },
      {
        index: 2,
        locale: "sv-SE",
        options: {
          second: TIME_SECOND_2DIGIT,
        },
        type: TEXT_DISPLAY_TYPE_SECOND,
      },
    ]

    expect(mask3.reduce(maskPartReducer, [])).toEqual(output3)
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
        locale: 'sv-SE',
        type: TEXT_DISPLAY_TYPE_DAY,
      },
      {
        locale: 'sv-SE',
        type: TEXT_DISPLAY_TYPE_DAY_PERIOD,
      },
      {
        locale: 'sv-SE',
        type: TEXT_DISPLAY_TYPE_ERA,
      },
      {
        locale: 'sv-SE',
        type: TEXT_DISPLAY_TYPE_FRACTIONAL_SECOND,
      },
      {
        locale: 'sv-SE',
        type: TEXT_DISPLAY_TYPE_HOUR,
      },
      {
        locale: 'sv-SE',
        type: TEXT_DISPLAY_TYPE_MINUTE,
      },
      {
        locale: 'sv-SE',
        type: TEXT_DISPLAY_TYPE_MONTH,
      },
      {
        locale: 'sv-SE',
        type: TEXT_DISPLAY_TYPE_SECOND,
      },
      {
        locale: 'sv-SE',
        type: TEXT_DISPLAY_TYPE_TIME_ZONE_NAME,
      },
      {
        locale: 'sv-SE',
        type: TEXT_DISPLAY_TYPE_WEEKDAY,
      },
      {
        locale: 'sv-SE',
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
        locale: 'sv-SE',
        type: TEXT_DISPLAY_TYPE_YEAR,
      },
      {
        type: TEXT_DISPLAY_TYPE_LITERAL,
        value: '-'
      },
      {
        locale: 'sv-SE',
        type: TEXT_DISPLAY_TYPE_MONTH,
      },
      {
        type: TEXT_DISPLAY_TYPE_LITERAL,
        value: '-'
      },
      {
        locale: 'sv-SE',
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
        locale: 'sv-SE',
        type: TEXT_DISPLAY_TYPE_YEAR,
      },
      {
        type: TEXT_DISPLAY_TYPE_LITERAL,
        value: '-'
      },
      {
        locale: 'sv-SE',
        type: TEXT_DISPLAY_TYPE_MONTH,
      },
      {
        type: TEXT_DISPLAY_TYPE_LITERAL,
        value: '-'
      },
      {
        locale: 'sv-SE',
        type: TEXT_DISPLAY_TYPE_DAY,
      },
      {
        type: TEXT_DISPLAY_TYPE_LITERAL,
        value: ' '
      },
      {
        locale: 'sv-SE',
        type: TEXT_DISPLAY_TYPE_HOUR,
      },
      {
        type: TEXT_DISPLAY_TYPE_LITERAL,
        value: ':'
      },
      {
        locale: 'sv-SE',
        type: TEXT_DISPLAY_TYPE_MINUTE,
      },
      {
        type: TEXT_DISPLAY_TYPE_LITERAL,
        value: ':'
      },
      {
        locale: 'sv-SE',
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
        locale: 'sv-SE',
        type: TEXT_DISPLAY_TYPE_HOUR,
      },
      {
        type: TEXT_DISPLAY_TYPE_LITERAL,
        value: ':'
      },
      {
        locale: 'sv-SE',
        type: TEXT_DISPLAY_TYPE_MINUTE,
      },
      {
        type: TEXT_DISPLAY_TYPE_LITERAL,
        value: ':'
      },
      {
        locale: 'sv-SE',
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
        locale: 'sv-SE',
        options: {
          year: DATE_YEAR_2DIGIT,
        },
        type: TEXT_DISPLAY_TYPE_YEAR,
      },
      {
        type: TEXT_DISPLAY_TYPE_LITERAL,
        value: '-'
      },
      {
        locale: 'sv-SE',
        options: {
          month: DATE_MONTH_2DIGIT,
        },
        type: TEXT_DISPLAY_TYPE_MONTH,
      },
      {
        type: TEXT_DISPLAY_TYPE_LITERAL,
        value: '-'
      },
      {
        locale: 'sv-SE',
        options: {
          day: DATE_DAY_2DIGIT,
        },
        type: TEXT_DISPLAY_TYPE_DAY,
      },
      {
        type: TEXT_DISPLAY_TYPE_LITERAL,
        value: ' '
      },
      {
        locale: 'sv-SE',
        options: {
          era: 'narrow',
        },
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
        locale: 'sv-SE',
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
        locale: 'sv-SE',
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
        locale: 'sv-SE',
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
        locale: 'sv-SE',
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
        locale: 'sv-SE',
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
        locale: 'sv-SE',
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
        locale: 'sv-SE',
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
        locale: 'sv-SE',
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
        locale: 'sv-SE',
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
        locale: 'sv-SE',
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
        locale: 'sv-SE',
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
        locale: 'sv-SE',
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
        locale: 'sv-SE',
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
        locale: 'sv-SE',
        options: {
          timeZoneName: 'shortOffset',
        },
        timeZone: 'UTC',
        type: TEXT_DISPLAY_TYPE_TIME_ZONE_NAME,
      },
    ]

    expect(mask.reduce(maskPartReducer, [])).toEqual(output)
  })

  it('Dealing with empty masks', async () => {
    const maskPartReducer = await prepareMaskPartReducer()

    const output1 = [
      {
        type: TEXT_DISPLAY_TYPE_LITERAL,
        value: ''
      },
    ]

    expect([''].reduce(maskPartReducer, [])).toEqual(output1)
    expect([].reduce(maskPartReducer, [])).toEqual([])
  })
})
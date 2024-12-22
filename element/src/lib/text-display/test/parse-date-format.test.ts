import { describe, expect, it } from 'vitest'

import {
  createOptionStore,
} from '$lib/helper/index.js'

import {
  prepareParseDateFormat,
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
  TextDisplayPartDate,
  TextDisplayPartDateTime,
  TextDisplayPartObjects,
  TextDisplayPartTime,
} from '../types.js'

describe('Test parsing strings into mask', () => {
  it('It parses ISO format', async () => {
    const parseDateFormat = await prepareParseDateFormat()
    const input: TextDisplayPartDateTime = {
      options: {
        format: 'yyyy-mm-dd"T"HH:MM:ss',
      },
      type: TEXT_DISPLAY_TYPE_DATE_TIME
    }
    const mask: TextDisplayMask = [
      {
        options: {
          year: 'numeric'
        },
        type: TEXT_DISPLAY_TYPE_YEAR,
      },
      {
        type: TEXT_DISPLAY_TYPE_LITERAL,
        value: '-'
      },
      {
        options: {
          month: '2-digit'
        },
        type: TEXT_DISPLAY_TYPE_MONTH,
      },
      {
        type: TEXT_DISPLAY_TYPE_LITERAL,
        value: '-'
      },
      {
        options: {
          day: '2-digit'
        },
        type: TEXT_DISPLAY_TYPE_DAY,
      },
      {
        type: TEXT_DISPLAY_TYPE_LITERAL,
        value: 'T'
      },
      {
        options: {
          hour: '2-digit',
          hourCycle: 'h23',
        },
        type: TEXT_DISPLAY_TYPE_HOUR,
      },
      {
        type: TEXT_DISPLAY_TYPE_LITERAL,
        value: ':'
      },
      {
        options: {
          minute: '2-digit'
        },
        type: TEXT_DISPLAY_TYPE_MINUTE,
      },
      {
        type: TEXT_DISPLAY_TYPE_LITERAL,
        value: ':'
      },
      {
        options: {
          second: '2-digit'
        },
        type: TEXT_DISPLAY_TYPE_SECOND,
      },
    ]

    expect(mask).toEqual(parseDateFormat(input))
  })

  it('It parses ISO format DATE only', async () => {
    const parseDateFormat = await prepareParseDateFormat()
    const input: TextDisplayPartDate = {
      options: {
        format: 'yyyy-mm-dd"T"HH:MM:ss',
      },
      type: TEXT_DISPLAY_TYPE_DATE
    }
    const mask: TextDisplayMask = [
      {
        options: {
          year: 'numeric'
        },
        type: TEXT_DISPLAY_TYPE_YEAR,
      },
      {
        type: TEXT_DISPLAY_TYPE_LITERAL,
        value: '-'
      },
      {
        options: {
          month: '2-digit'
        },
        type: TEXT_DISPLAY_TYPE_MONTH,
      },
      {
        type: TEXT_DISPLAY_TYPE_LITERAL,
        value: '-'
      },
      {
        options: {
          day: '2-digit'
        },
        type: TEXT_DISPLAY_TYPE_DAY,
      },
      {
        type: TEXT_DISPLAY_TYPE_LITERAL,
        value: 'T'
      },
      {
        type: TEXT_DISPLAY_TYPE_LITERAL,
        value: 'HH:MM:ss'
      },
    ]

    expect(mask).toEqual(parseDateFormat(input))
  })

  it('It parses ISO format TIME only', async () => {
    const parseDateFormat = await prepareParseDateFormat()
    const input: TextDisplayPartTime = {
      options: {
        format: 'yyyy-mm-dd"T"HH:MM:ss',
      },
      type: TEXT_DISPLAY_TYPE_TIME
    }
    const mask: TextDisplayMask = [
      {
        type: TEXT_DISPLAY_TYPE_LITERAL,
        value: 'yyyy-mm-dd'
      },
      {
        type: TEXT_DISPLAY_TYPE_LITERAL,
        value: 'T'
      },
      {
        options: {
          hour: '2-digit',
          hourCycle: 'h23',
        },
        type: TEXT_DISPLAY_TYPE_HOUR,
      },
      {
        type: TEXT_DISPLAY_TYPE_LITERAL,
        value: ':'
      },
      {
        options: {
          minute: '2-digit'
        },
        type: TEXT_DISPLAY_TYPE_MINUTE,
      },
      {
        type: TEXT_DISPLAY_TYPE_LITERAL,
        value: ':'
      },
      {
        options: {
          second: '2-digit'
        },
        type: TEXT_DISPLAY_TYPE_SECOND,
      },
    ]

    expect(mask).toEqual(parseDateFormat(input))
  })

})
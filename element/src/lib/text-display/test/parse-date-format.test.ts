import { describe, expect, it } from 'vitest'


import {
  prepareParseDateFormat,
  TEXT_DISPLAY_TYPE_DATE,
  TEXT_DISPLAY_TYPE_DATE_TIME,
  TEXT_DISPLAY_TYPE_DAY,
  TEXT_DISPLAY_TYPE_HOUR,
  TEXT_DISPLAY_TYPE_MINUTE,
  TEXT_DISPLAY_TYPE_MONTH,
  TEXT_DISPLAY_TYPE_SECOND,
  TEXT_DISPLAY_TYPE_TIME,
  TEXT_DISPLAY_TYPE_YEAR,
} from '$lib/date/index.js'

import type {
  TextDisplayPartDate,
  TextDisplayPartDateTime,
  TextDisplayPartTime,
} from '$lib/date/index.js'

import {
  COMPONENT_LITERAL,
} from '$lib/literal/index.js'


import type {
  TextDisplayMask,
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
        type: COMPONENT_LITERAL,
        value: '-'
      },
      {
        options: {
          month: '2-digit'
        },
        type: TEXT_DISPLAY_TYPE_MONTH,
      },
      {
        type: COMPONENT_LITERAL,
        value: '-'
      },
      {
        options: {
          day: '2-digit'
        },
        type: TEXT_DISPLAY_TYPE_DAY,
      },
      {
        type: COMPONENT_LITERAL,
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
        type: COMPONENT_LITERAL,
        value: ':'
      },
      {
        options: {
          minute: '2-digit'
        },
        type: TEXT_DISPLAY_TYPE_MINUTE,
      },
      {
        type: COMPONENT_LITERAL,
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
        type: COMPONENT_LITERAL,
        value: '-'
      },
      {
        options: {
          month: '2-digit'
        },
        type: TEXT_DISPLAY_TYPE_MONTH,
      },
      {
        type: COMPONENT_LITERAL,
        value: '-'
      },
      {
        options: {
          day: '2-digit'
        },
        type: TEXT_DISPLAY_TYPE_DAY,
      },
      {
        type: COMPONENT_LITERAL,
        value: 'T'
      },
      {
        type: COMPONENT_LITERAL,
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
        type: COMPONENT_LITERAL,
        value: 'yyyy-mm-dd'
      },
      {
        type: COMPONENT_LITERAL,
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
        type: COMPONENT_LITERAL,
        value: ':'
      },
      {
        options: {
          minute: '2-digit'
        },
        type: TEXT_DISPLAY_TYPE_MINUTE,
      },
      {
        type: COMPONENT_LITERAL,
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
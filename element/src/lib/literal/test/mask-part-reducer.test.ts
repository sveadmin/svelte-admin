import { describe, expect, it } from 'vitest'

import type {
  SveadminComponent,
  SveadminComponentMask,
} from '$lib/types.js'

import {
  prepareMaskPartReducer,
} from '../helper/index.js'

import {
  COMPONENT_LITERAL,
} from '$lib/literal/index.js'

import {
  COMPONENT_DATE,
  COMPONENT_DATE_TIME,
  COMPONENT_DAY,
  COMPONENT_DAY_PERIOD,
  COMPONENT_ERA,
  COMPONENT_FRACTIONAL_SECOND,
  COMPONENT_HOUR,
  COMPONENT_MINUTE,
  COMPONENT_MONTH,
  COMPONENT_SECOND,
  COMPONENT_TIME,
  COMPONENT_TIME_ZONE_NAME,
  COMPONENT_WEEKDAY, 
  COMPONENT_YEAR,
  DATE_DAY_2DIGIT,
  DATE_ERA_NARROW,
  DATE_MONTH_2DIGIT,
  DATE_MONTH_NARROW,
  DATE_WEEKDAY_SHORT,
  DATE_YEAR_2DIGIT,
  DATE_YEAR_NUMERIC,
  TIME_DAY_PERIOD_NARROW,
  TIME_HOUR_2DIGIT,
  TIME_HOUR_CYCLE_H23,
  TIME_MINUTE_2DIGIT,
  TIME_SECOND_2DIGIT,
  TIME_ZONE_NAME_SHORT_OFFSET,
} from '$lib/date/index.js'

import {
  TEXT_DISPLAY_TYPE_NUMBER,
} from '$lib/number/index.js'

import {
  COMPONENT_TEXT_DISPLAY,
} from '$lib/text-display/types.js'

describe('Test mask part reducer', async () => {
  it('Non-expanding non-date parts are returned as they are added', async () => {
    const maskPartReducer = await prepareMaskPartReducer()
    const mask: SveadminComponent[] = [
      {
        display: {
          config: {
            value: 'test'
          },
        },
        type: COMPONENT_LITERAL,
      },
      {
        index: 1,
        type: TEXT_DISPLAY_TYPE_NUMBER,
      },
      {
        type: COMPONENT_TEXT_DISPLAY,
      },
    ]

    expect(mask.reduce(maskPartReducer, [])).toEqual(mask)
  })

  it('String shortcut works for literal', async () => {
    const maskPartReducer = await prepareMaskPartReducer()
    const mask: SveadminComponentMask = [
      'This is a literal'
    ]
    const output: SveadminComponent[] = [
      {
        display : {
          config: {
            value: 'This is a literal'
          },
        },
        type: COMPONENT_LITERAL,
      },
    ]

    expect(mask.reduce(maskPartReducer, [])).toEqual(output)
  })

  it('String shortcut is split when dynamic placeholders are used', async () => {
    const maskPartReducer = await prepareMaskPartReducer()
    const mask: SveadminComponentMask = [
      'This phrase contains a $(text) and a $(number)!'
    ]
    const output: SveadminComponent[] = [
      {
        display: {
          config: {
            value: 'This phrase contains a '
          }
        },
        type: COMPONENT_LITERAL,
      },
      {
        type: COMPONENT_TEXT_DISPLAY,
      },
      {
        display: {
          config: {
            value: ' and a '
          }
        },
        type: COMPONENT_LITERAL,
      },
      {
        index: 1,
        type: TEXT_DISPLAY_TYPE_NUMBER,
      },
      {
        display: {
          config: {
            value: '!'
          }
        },
        type: COMPONENT_LITERAL,
      },
    ]
    expect(output).toEqual(mask.reduce(maskPartReducer, []))

    const mask2: SveadminComponentMask = [
      'Special characters can be "$(text)", "$(number)" escaped'
    ]
    const output2: SveadminComponent[] = [
      {
        display: {
          config: {
            value: 'Special characters can be '
          },
        },
        type: COMPONENT_LITERAL,
      },
      {
        display: {
          config: {
            value: '$(text)'
          },
        },
        type: COMPONENT_LITERAL,
      },
      {
        display: {
          config: {
            value: ', '
          },
        },
        type: COMPONENT_LITERAL,
      },
      {
        display: {
          config: {
            value: '$(number)'
          },
        },
        type: COMPONENT_LITERAL,
      },
      {
        display: {
          config: {
            value: ' escaped'
          },
        },
        type: COMPONENT_LITERAL,
      },
    ]
    expect(mask2.reduce(maskPartReducer, [])).toEqual(output2)

    const mask3: SveadminComponentMask = [
      'Date can use format $(date:yyyy-mm-dd), $(dateTime:yyyy-mm-dd HH:MM:ss), $(time:HH:MM:ss)'
    ]
    const output3: SveadminComponent[] = [
      {
        display: {
          config: {
            value: 'Date can use format '
          },
        },
        type: COMPONENT_LITERAL,
      },
      {
        display: {
          config: {
            locale: "sv-SE",
            year: DATE_YEAR_NUMERIC,
          },
        },
        type: COMPONENT_YEAR,
      },
      {
        display: {
          config: {
            value: '-'
          },
        },
        type: COMPONENT_LITERAL,
      },
      {
        display: {
          config: {
            locale: "sv-SE",
            month: DATE_MONTH_2DIGIT,
          },
        },
        type: COMPONENT_MONTH,
      },
      {
        display: {
          config: {
            value: '-'
          },
        },
        type: COMPONENT_LITERAL,
      },
      {
        display: {
          config: {
            locale: "sv-SE",
            day: DATE_DAY_2DIGIT,
          },
        },
        type: COMPONENT_DAY,
      },
      {
        display: {
          config: {
            value: ', '
          },
        },
        type: COMPONENT_LITERAL,
      },
      {
        display: {
          config: {
            locale: "sv-SE",
            year: DATE_YEAR_NUMERIC,
          },
        },
        index: 1,
        type: COMPONENT_YEAR,
      },
      {
        display: {
          config: {
            value: '-'
          },
        },
        type: COMPONENT_LITERAL,
      },
      {
        display: {
          config: {
            locale: "sv-SE",
            month: DATE_MONTH_2DIGIT,
          },
        },
        index: 1,
        type: COMPONENT_MONTH,
      },
      {
        display: {
          config: {
            value: '-'
          },
        },
        type: COMPONENT_LITERAL,
      },
      {
        display: {
          config: {
            locale: "sv-SE",
            day: DATE_DAY_2DIGIT,
          },
        },
        index: 1,
        type: COMPONENT_DAY,
      },
      {
        display: {
          config: {
            value: ' '
          },
        },
        type: COMPONENT_LITERAL,
      },
      {
        display: {
          config: {
            hour: TIME_HOUR_2DIGIT,
            hourCycle: TIME_HOUR_CYCLE_H23,
            locale: "sv-SE",
          },
        },
        index: 1,
        type: COMPONENT_HOUR,
      },
      {
        display: {
          config: {
            value: ':'
          },
        },
        type: COMPONENT_LITERAL,
      },
      {
        display: {
          config: {
            locale: "sv-SE",
            minute: TIME_MINUTE_2DIGIT,
          },
        },
        index: 1,
        type: COMPONENT_MINUTE,
      },
      {
        display: {
          config: {
            value: ':'
          },
        },
        type: COMPONENT_LITERAL,
      },
      {
        display: {
          config: {
            locale: "sv-SE",
            second: TIME_SECOND_2DIGIT,
          },
        },
        index: 1,
        type: COMPONENT_SECOND,
      },
      {
        display: {
          config: {
            value: ', '
          }
        },
        type: COMPONENT_LITERAL,
      },
      {
        display: {
          config: {
            hour: TIME_HOUR_2DIGIT,
            hourCycle: TIME_HOUR_CYCLE_H23,
            locale: "sv-SE",
          },
        },
        index: 2,
        type: COMPONENT_HOUR,
      },
      {
        display: {
          config: {
            value: ':'
          }
        },
        type: COMPONENT_LITERAL,
      },
      {
        display: {
          config: {
            locale: "sv-SE",
            minute: TIME_MINUTE_2DIGIT,
          },
        },
        index: 2,
        type: COMPONENT_MINUTE,
      },
      {
        display: {
          config: {
            value: ':'
          }
        },
        type: COMPONENT_LITERAL,
      },
      {
        display: {
          config: {
            locale: "sv-SE",
            second: TIME_SECOND_2DIGIT,
          },
        },
        index: 2,
        type: COMPONENT_SECOND,
      },
    ]

    expect(mask3.reduce(maskPartReducer, [])).toEqual(output3)
  })

  it('Non-expanding date parts have locale and timeZone added', async () => {
    const maskPartReducer = await prepareMaskPartReducer()
    const mask: SveadminComponentMask = [
      {
        type: COMPONENT_DAY,
      },
      {
        type: COMPONENT_DAY_PERIOD,
      },
      {
        type: COMPONENT_ERA,
      },
      {
        type: COMPONENT_FRACTIONAL_SECOND,
      },
      {
        type: COMPONENT_HOUR,
      },
      {
        type: COMPONENT_MINUTE,
      },
      {
        type: COMPONENT_MONTH,
      },
      {
        type: COMPONENT_SECOND,
      },
      {
        type: COMPONENT_TIME_ZONE_NAME,
      },
      {
        type: COMPONENT_WEEKDAY,
      },
      {
        type: COMPONENT_YEAR,
      },
    ]

    const transformed: SveadminComponent[] = [
      {
        display: {
          config: {
            locale: 'sv-SE',
          }
        },
        type: COMPONENT_DAY,
      },
      {
        display: {
          config: {
            locale: 'sv-SE',
          }
        },
        type: COMPONENT_DAY_PERIOD,
      },
      {
        display: {
          config: {
            locale: 'sv-SE',
          }
        },
        type: COMPONENT_ERA,
      },
      {
        display: {
          config: {
            locale: 'sv-SE',
          }
        },
        type: COMPONENT_FRACTIONAL_SECOND,
      },
      {
        display: {
          config: {
            locale: 'sv-SE',
          }
        },
        type: COMPONENT_HOUR,
      },
      {
        display: {
          config: {
            locale: 'sv-SE',
          }
        },
        type: COMPONENT_MINUTE,
      },
      {
        display: {
          config: {
            locale: 'sv-SE',
          }
        },
        type: COMPONENT_MONTH,
      },
      {
        display: {
          config: {
            locale: 'sv-SE',
          }
        },
        type: COMPONENT_SECOND,
      },
      {
        display: {
          config: {
            locale: 'sv-SE',
          }
        },
        type: COMPONENT_TIME_ZONE_NAME,
      },
      {
        display: {
          config: {
            locale: 'sv-SE',
          }
        },
        type: COMPONENT_WEEKDAY,
      },
      {
        display: {
          config: {
            locale: 'sv-SE',
          }
        },
        type: COMPONENT_YEAR,
      },
    ]

    expect(mask.reduce(maskPartReducer, [])).toEqual(transformed)
  })

  it('Default date parsing', async () => {
    const maskPartReducer = await prepareMaskPartReducer()
    const mask: SveadminComponentMask = [
      {
        type: COMPONENT_DATE,
      },
    ]

    const output: SveadminComponent[] = [
      {
        display: {
          config: {
            locale: 'sv-SE',
          }
        },
        type: COMPONENT_YEAR,
      },
      {
        display: {
          config: {
            value: '-'
          }
        },
        type: COMPONENT_LITERAL,
      },
      {
        display: {
          config: {
            locale: 'sv-SE',
          }
        },
        type: COMPONENT_MONTH,
      },
      {
        display: {
          config: {
            value: '-'
          }
        },
        type: COMPONENT_LITERAL,
      },
      {
        display: {
          config: {
            locale: 'sv-SE',
          }
        },
        type: COMPONENT_DAY,
      },
    ]

    expect(mask.reduce(maskPartReducer, [])).toEqual(output)
  })

  it('Default date time parsing', async () => {
    const maskPartReducer = await prepareMaskPartReducer()
    const mask: SveadminComponentMask = [
      {
        type: COMPONENT_DATE_TIME,
      },
    ]

    const output: SveadminComponent[] = [
      {
        display: {
          config: {
            locale: 'sv-SE',
          }
        },
        type: COMPONENT_YEAR,
      },
      {
        display: {
          config: {
            value: '-'
          }
        },
        type: COMPONENT_LITERAL,
      },
      {
        display: {
          config: {
            locale: 'sv-SE',
          }
        },
        type: COMPONENT_MONTH,
      },
      {
        display: {
          config: {
            value: '-'
          }
        },
        type: COMPONENT_LITERAL,
      },
      {
        display: {
          config: {
            locale: 'sv-SE',
          }
        },
        type: COMPONENT_DAY,
      },
      {
        display: {
          config: {
            value: ' '
          }
        },
        type: COMPONENT_LITERAL,
      },
      {
        display: {
          config: {
            locale: 'sv-SE',
          }
        },
        type: COMPONENT_HOUR,
      },
      {
        display: {
          config: {
            value: ':'
          }
        },
        type: COMPONENT_LITERAL,
      },
      {
        display: {
          config: {
            locale: 'sv-SE',
          }
        },
        type: COMPONENT_MINUTE,
      },
      {
        display: {
          config: {
            value: ':'
          }
        },
        type: COMPONENT_LITERAL,
      },
      {
        display: {
          config: {
            locale: 'sv-SE',
          }
        },
        type: COMPONENT_SECOND,
      },
    ]

    expect(mask.reduce(maskPartReducer, [])).toEqual(output)
  })

  it('Default time parsing', async () => {
    const maskPartReducer = await prepareMaskPartReducer()
    const mask: SveadminComponentMask = [
      {
        type: COMPONENT_TIME,
      },
    ]

    const output: SveadminComponent[] = [
      {
        display: {
          config: {
            locale: 'sv-SE',
          }
        },
        type: COMPONENT_HOUR,
      },
      {
        display: {
          config: {
            value: ':'
          }
        },
        type: COMPONENT_LITERAL,
      },
      {
        display: {
          config: {
            locale: 'sv-SE',
          }
        },
        type: COMPONENT_MINUTE,
      },
      {
        display: {
          config: {
            value: ':'
          }
        },
        type: COMPONENT_LITERAL,
      },
      {
        display: {
          config: {
            locale: 'sv-SE',
          }
        },
        type: COMPONENT_SECOND,
      },
    ]

    expect(mask.reduce(maskPartReducer, [])).toEqual(output)
  })

  it('Date parsing settings are passed on', async () => {
    const maskPartReducer = await prepareMaskPartReducer()
    const mask: SveadminComponent[] = [
      {
        display: {
          config: {
            day: DATE_DAY_2DIGIT,
            era: DATE_ERA_NARROW,
            month: DATE_MONTH_2DIGIT,
            // weekday: DATE_WEEKDAY_SHORT, 
            year: DATE_YEAR_2DIGIT,
          }
        },
        type: COMPONENT_DATE,
      },
    ]

    const output: SveadminComponent[] = [
      {
        display: {
          config: {
            locale: 'sv-SE',
            year: DATE_YEAR_2DIGIT,
          }
        },
        type: COMPONENT_YEAR,
      },
      {
        display: {
          config: {
            value: '-'
          }
        },
        type: COMPONENT_LITERAL,
      },
      {
        display: {
          config: {
            locale: 'sv-SE',
            month: DATE_MONTH_2DIGIT,
          }
        },
        type: COMPONENT_MONTH,
      },
      {
        display: {
          config: {
            value: '-'
          }
        },
        type: COMPONENT_LITERAL,
      },
      {
        display: {
          config: {
            day: DATE_DAY_2DIGIT,
            locale: 'sv-SE',
          }
        },
        type: COMPONENT_DAY,
      },
      {
        display: {
          config: {
            value: ' '
          }
        },
        type: COMPONENT_LITERAL,
      },
      {
        display: {
          config: {
            era: 'narrow',
            locale: 'sv-SE',
          }
        },
        type: COMPONENT_ERA,
      },
    ]

    expect(mask.reduce(maskPartReducer, [])).toEqual(output)
  })

  it('Date time parsing settings are passed on', async () => {
    const maskPartReducer = await prepareMaskPartReducer()
    const mask: SveadminComponentMask = [
      {
        display: {
          config: {
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
          }
        },
        type: COMPONENT_DATE_TIME,
      },
    ]

    const output: SveadminComponent[] = [
      {
        display: {
          config: {
            locale: 'sv-SE',
            timeZone: 'UTC',
            year: DATE_YEAR_2DIGIT,
          }
        },
        type: COMPONENT_YEAR,
      },
      {
        display: {
          config: {
            value: '-'
          }
        },
        type: COMPONENT_LITERAL,
      },
      {
        display: {
          config: {
            locale: 'sv-SE',
            month: DATE_MONTH_2DIGIT,
            timeZone: 'UTC',
          }
        },
        type: COMPONENT_MONTH,
      },
      {
        display: {
          config: {
            value: '-'
          }
        },
        type: COMPONENT_LITERAL,
      },
      {
        display: {
          config: {
            day: DATE_DAY_2DIGIT,
            locale: 'sv-SE',
            timeZone: 'UTC',
          }
        },
        type: COMPONENT_DAY,
      },
      {
        display: {
          config: {
            value: ' '
          }
        },
        type: COMPONENT_LITERAL,
      },
      {
        display: {
          config: {
            era: 'narrow',
            locale: 'sv-SE',
            timeZone: 'UTC',
          }
        },
        type: COMPONENT_ERA,
      },
      {
        display: {
          config: {
            value: ' '
          }
        },
        type: COMPONENT_LITERAL,
      },
      {
        display: {
          config: {
            hour: TIME_HOUR_2DIGIT,
            hour12: false,
            hourCycle: TIME_HOUR_CYCLE_H23,
            locale: 'sv-SE',
            timeZone: 'UTC',
          }
        },
        type: COMPONENT_HOUR,
      },
      {
        display: {
          config: {
            value: ':'
          }
        },
        type: COMPONENT_LITERAL,
      },
      {
        display: {
          config: {
            locale: 'sv-SE',
            minute: TIME_MINUTE_2DIGIT,
            timeZone: 'UTC',
          }
        },
        type: COMPONENT_MINUTE,
      },
      {
        display: {
          config: {
            value: ':'
          }
        },
        type: COMPONENT_LITERAL,
      },
      {
        display: {
          config: {
            locale: 'sv-SE',
            second: TIME_SECOND_2DIGIT,
            timeZone: 'UTC',
          }
        },
        type: COMPONENT_SECOND,
      },
      {
        display: {
          config: {
            value: ','
          }
        },
        type: COMPONENT_LITERAL,
      },
      {
        display: {
          config: {
            fractionalSecondDigits: 2,
            locale: 'sv-SE',
            timeZone: 'UTC',
          }
        },
        type: COMPONENT_FRACTIONAL_SECOND,
      },
      {
        display: {
          config: {
            value: ' '
          }
        },
        type: COMPONENT_LITERAL,
      },
      {
        display: {
          config: {
            locale: 'sv-SE',
            timeZone: 'UTC',
            timeZoneName: 'shortOffset',
          }
        },
        type: COMPONENT_TIME_ZONE_NAME,
      },
    ]

    expect(mask.reduce(maskPartReducer, [])).toEqual(output)
  })

  it('Time parsing settings are passed on', async () => {
    const maskPartReducer = await prepareMaskPartReducer()
    const mask: SveadminComponentMask = [
      {
        display: {
          config: {
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
          }
        },
        type: COMPONENT_TIME,
      },
    ]

    const output: SveadminComponent[] = [
      {
        display: {
          config: {
            hour: TIME_HOUR_2DIGIT,
            hour12: false,
            hourCycle: TIME_HOUR_CYCLE_H23,
            locale: 'sv-SE',
            timeZone: 'UTC',
          }
        },
        type: COMPONENT_HOUR,
      },
      {
        display: {
          config: {
            value: ':'
          }
        },
        type: COMPONENT_LITERAL,
      },
      {
        display: {
          config: {
            locale: 'sv-SE',
            minute: TIME_MINUTE_2DIGIT,
            timeZone: 'UTC',
          }
        },
        type: COMPONENT_MINUTE,
      },
      {
        display: {
          config: {
            value: ':'
          }
        },
        type: COMPONENT_LITERAL,
      },
      {
        display: {
          config: {
            locale: 'sv-SE',
            second: TIME_SECOND_2DIGIT,
            timeZone: 'UTC',
          }
        },
        type: COMPONENT_SECOND,
      },
      {
        display: {
          config: {
            value: ','
          }
        },
        type: COMPONENT_LITERAL,
      },
      {
        display: {
          config: {
            fractionalSecondDigits: 2,
            locale: 'sv-SE',
            timeZone: 'UTC',
          }
        },
        type: COMPONENT_FRACTIONAL_SECOND,
      },
      {
        display: {
          config: {
            value: ' '
          }
        },
        type: COMPONENT_LITERAL,
      },
      {
        display: {
          config: {
            locale: 'sv-SE',
            timeZone: 'UTC',
            timeZoneName: 'shortOffset',
          }
        },
        type: COMPONENT_TIME_ZONE_NAME,
      },
    ]

    expect(mask.reduce(maskPartReducer, [])).toEqual(output)
  })

  it('Dealing with empty masks', async () => {
    const maskPartReducer = await prepareMaskPartReducer()

    const output1 = [
      {
        display: {
          config: {
            value: ''
          }
        },
        type: COMPONENT_LITERAL,
      },
    ]

    expect([''].reduce(maskPartReducer, [])).toEqual(output1)
    expect([].reduce(maskPartReducer, [])).toEqual([])
  })
})
import { describe, expect, it } from 'vitest'

import type {
  SveadminComponentMask
} from '$lib/types.js'

import {
  DATE_DAY_2DIGIT,
  DATE_DAY_NUMERIC,
  DATE_INTERVAL_LONG,
  DATE_INTERVAL_LONG_MASK,
  DATE_INTERVAL_NARROW,
  DATE_INTERVAL_SHORT,
  DATE_INTERVAL_SHORT_MASK,
  DATE_MONTH_2DIGIT,
  DATE_MONTH_NUMERIC,
  DATE_YEAR_2DIGIT,
  dateSplitter,
  COMPONENT_DATE,
  COMPONENT_DATE_TIME,
  COMPONENT_DAY,
  COMPONENT_HOUR,
  COMPONENT_INTERVAL,
  COMPONENT_MINUTE,
  COMPONENT_MONTH,
  COMPONENT_SECOND,
  COMPONENT_TIME,
  COMPONENT_WEEK,
  COMPONENT_YEAR,
} from '$lib/date/index.js'

import {
  NUMBER_STYLE_CURRENCY,
  NUMBER_STYLE_DECIMAL,
  NUMBER_STYLE_PERCENT,
  TEXT_DISPLAY_TYPE_NUMBER,
} from '$lib/number/index.js'

import {
  COMPONENT_TEXT_DISPLAY,
} from '$lib/text-display/index.js'

import {
  COMPONENT_LITERAL
} from '../types.js'

import {
  prepareParseValue,
} from '../helper/index.js'


describe('Test value parser', () => {
  it('No mask returns the value', async () => {
    const parseValue = await prepareParseValue()
    const value = 'This is the value'
    const output = parseValue('', value)

    expect(output).toEqual(value)
  })

  it('Literal masks work', async () => {
    const parseValue = await prepareParseValue()

    const mask: SveadminComponentMask = [
      {
        display: {
          config: {
            value: '- ',
          }
        },
        type: COMPONENT_LITERAL,
      },
      {
        type: COMPONENT_TEXT_DISPLAY,
      },
      ' -', // Literal shortcut
    ]

    const value = 'This is the value'
    const output = parseValue(mask, value)

    expect(output).toEqual(`- ${value} -`)
  })

  it('NUmber formatting works', async () => {
    const parseValue = await prepareParseValue()

  const numberFormat1 = [
    {
      display: {
        config: {
          style: NUMBER_STYLE_DECIMAL,
        }
      },
      type: TEXT_DISPLAY_TYPE_NUMBER,
    }
  ]

  const numberFormat2 = [
    {
      display: {
        config: {
          locale: 'de-DE',
          style: NUMBER_STYLE_DECIMAL,
        }
      },
      type: TEXT_DISPLAY_TYPE_NUMBER,
    }
  ]

  const numberFormat3 = [
    {
      display: {
        config: {
          locale: 'fr-FR',
          style: NUMBER_STYLE_DECIMAL,
        }
      },
      type: TEXT_DISPLAY_TYPE_NUMBER,
    }
  ]

  const numberFormat4 = [
    {
      display: {
        config: {
          style: NUMBER_STYLE_DECIMAL,
          useGrouping: false,
        }
      },
      type: TEXT_DISPLAY_TYPE_NUMBER,
    }
  ]

  const numberFormat5 = [
    {
      display: {
        config: {
          style: NUMBER_STYLE_DECIMAL,
          maximumFractionDigits: 2,
        }
      },
      type: TEXT_DISPLAY_TYPE_NUMBER,
    }
  ]

  const numberFormat6 = [
    {
      display: {
        config: {
          style: NUMBER_STYLE_DECIMAL,
          maximumFractionDigits: 4,
        }
      },
      type: TEXT_DISPLAY_TYPE_NUMBER,
    }
  ]

  const numberFormat7 = [
    {
      display: {
        config: {
          style: NUMBER_STYLE_DECIMAL,
          maximumFractionDigits: 10,
          minimumFractionDigits: 10,
        }
      },
      type: TEXT_DISPLAY_TYPE_NUMBER,
    }
  ]

  const numberFormat10 = [
    {
      display: {
        config: {
          style: NUMBER_STYLE_PERCENT,
        }
      },
      type: TEXT_DISPLAY_TYPE_NUMBER,
    }
  ]

    expect(parseValue(numberFormat1, 12345.6789)).toEqual('12,345.679')
    expect(parseValue(numberFormat2, 12345.6789)).toEqual('12.345,679')
    expect(parseValue(numberFormat3, 12345.6789)).toEqual('12\u202f345,679')
    expect(parseValue(numberFormat4, 12345.6789)).toEqual('12345.679')
    expect(parseValue(numberFormat5, 12345.6789)).toEqual('12,345.68')
    expect(parseValue(numberFormat6, 12345.6789)).toEqual('12,345.6789')
    expect(parseValue(numberFormat7, 12345.6789)).toEqual('12,345.6789000000')
    expect(parseValue(numberFormat10, .45678)).toEqual('46%')
  })

  it('Currency formatting work', async () => {
    const parseValue = await prepareParseValue()

    const mask: SveadminComponentMask = [
      {
        display: {
          config: {
            style: NUMBER_STYLE_CURRENCY,
            currency: 'EUR',
          }
        },
        type: TEXT_DISPLAY_TYPE_NUMBER,
      }
    ]

    const value = 1234.567
    const output = parseValue(mask, value)

    expect(output).toEqual('€1,234.57')
  })

  it('Date formatting works using predefined schemas', async () => {
    const parseValue = await prepareParseValue(undefined, dateSplitter)

    const dateFormat1 = [
      {
        type: COMPONENT_DATE_TIME,
      }
    ]

    const dateFormat2 = [
      {
        display: {
          config: {
            locale: 'en-US',
          }
        },
        type: COMPONENT_DATE_TIME,
      }
    ]

    const dateFormat3 = [
      {
        type: COMPONENT_DATE,
      }
    ]

    const dateFormat4 = [
      {
        type: COMPONENT_TIME,
      }
    ]

    const value = new Date('2021.02.03 09:08:07')

    expect(parseValue(dateFormat1, value)).toEqual('2021-02-03 09:08:07')
    expect(parseValue(dateFormat2, value)).toEqual('2/3/21, 9:08:07')
    expect(parseValue(dateFormat3, value)).toEqual('2021-02-03')
    expect(parseValue(dateFormat4, value)).toEqual('09:08:07')
  })

  it('Date formatting works with the default format processors', async () => {
    const parseValue = await prepareParseValue(undefined, dateSplitter)

    const dateFormat1 = [
      {
        display: {
          config: {
            format: 'yy-m-d, DDD h:M:s t o',
          }
        },
        type: COMPONENT_DATE_TIME,
      }
    ]
    const dateFormat1US = [
      {
        display: {
          config: {
            format: 'yy-m-d, DDD h:M:s TT o',
            locale: 'en-US',
          }
        },
        type: COMPONENT_DATE_TIME,
      }
    ]

    const dateFormat2 = [
      {
        display: {
          config: {
            format: 'yy|mm|dd, DDDD hh.MM.ss tt p',
          }
        },
        type: COMPONENT_DATE_TIME,
      }
    ]

    const dateFormat2US = [
      {
        display: {
          config: {
            format: 'yy|mm|dd, DDDD hh.MM.ss tt p',
            locale: 'en-US',
          }
        },
        type: COMPONENT_DATE_TIME,
      }
    ]

    const dateFormat3 = [
      {
        display: {
          config: {
            format: 'yyyy-mmm-dd, N H.MM.s.l Z W',
          }
        },
        type: COMPONENT_DATE_TIME,
      }
    ]

    const dateFormat3US = [
      {
        display: {
          config: {
            format: 'yyyy-mmm-dd, N H.MM.s.l Z W',
            locale: 'en-US',
          }
        },
        type: COMPONENT_DATE_TIME,
      }
    ]

    const dateFormat4 = [
      {
        display: {
          config: {
            format: 'yyyy~mmmm~dd, HH,MM,ss,L ZZ WW',
          }
        },
        type: COMPONENT_DATE_TIME,
      }
    ]

    const dateFormat4US = [
      {
        display: {
          config: {
            format: 'yyyy~mmmm~dd, HH,MM,ss,L ZZ WW',
            locale: 'en-US',
          }
        },
        type: COMPONENT_DATE_TIME,
      }
    ]

    const value = new Date('2021.02.03 09:08:07')

    expect(parseValue(dateFormat1, value)).toEqual('21-2-3, ons 9:8:7 f GMT+1')
    expect(parseValue(dateFormat1US, value)).toEqual('21-2-3, Wed 9:8:7 AM GMT+1')
    expect(parseValue(dateFormat2, value)).toEqual('21|02|03, onsdag 09.08.07 fm GMT+01:00')
    expect(parseValue(dateFormat2US, value)).toEqual('21|02|03, Wednesday 09.08.07 am GMT+01:00')
    expect(parseValue(dateFormat3, value)).toEqual('2021-feb.-03, 3 9.08.7.000 CET 5')
    expect(parseValue(dateFormat3US, value)).toEqual('2021-Feb-03, 3 9.08.7.000 GMT+1 5')
    expect(parseValue(dateFormat4, value)).toEqual('2021~februari~03, 09,08,07,00 Europe/Berlin 05')
    expect(parseValue(dateFormat4US, value)).toEqual('2021~February~03, 09,08,07,00 Europe/Berlin 05')
  })
})
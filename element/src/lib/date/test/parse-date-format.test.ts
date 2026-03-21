import { describe, expect, it } from 'vitest'

import type {
  SveadminComponent,
} from '$lib/types.js'

import {
  prepareParseDateFormat,
  COMPONENT_DATE,
  COMPONENT_DATE_TIME,
  COMPONENT_DAY,
  COMPONENT_HOUR,
  COMPONENT_MINUTE,
  COMPONENT_MONTH,
  COMPONENT_SECOND,
  COMPONENT_TIME,
  COMPONENT_YEAR,
} from '$lib/date/index.js'

import {
  COMPONENT_LITERAL,
} from '$lib/literal/index.js'

describe('Test parsing strings into mask', () => {
  it('It parses ISO format', async () => {
    const parseDateFormat = await prepareParseDateFormat()
    const input: SveadminComponent<any> = {
      display: {
        config: {
          format: 'yyyy-mm-dd"T"HH:MM:ss',
        }
      },
      type: COMPONENT_DATE_TIME
    }
    const mask: SveadminComponent<any>[] = [
      {
        display: {
          config: {
            year: 'numeric'
          }
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
            month: '2-digit'
          }
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
            day: '2-digit'
          }
        },
        type: COMPONENT_DAY,
      },
      {
        display: {
          config: {
            value: 'T'
          },
        },
        type: COMPONENT_LITERAL,
      },
      {
        display: {
          config: {
            hour: '2-digit',
            hourCycle: 'h23',
          }
        },
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
            minute: '2-digit'
          }
        },
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
            second: '2-digit'
          }
        },
        type: COMPONENT_SECOND,
      },
    ]

    expect(parseDateFormat(input)).toEqual(mask)
  })

  it('It parses ISO format DATE only', async () => {
    const parseDateFormat = await prepareParseDateFormat()
    const input: SveadminComponent<any> = {
      display: {
        config: {
          format: 'yyyy-mm-dd"T"HH:MM:ss',
        }
      },
      type: COMPONENT_DATE
    }
    const mask: SveadminComponent<any>[] = [
      {
        display: {
          config: {
            year: 'numeric'
          }
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
            month: '2-digit'
          }
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
            day: '2-digit'
          }
        },
        type: COMPONENT_DAY,
      },
      {
        display: {
          config: {
            value: 'T'
          },
        },
        type: COMPONENT_LITERAL,
      },
      {
        display: {
          config: {
            value: 'HH:MM:ss'
          },
        },
        type: COMPONENT_LITERAL,
      },
    ]

    expect(mask).toEqual(parseDateFormat(input))
  })

  it('It parses ISO format TIME only', async () => {
    const parseDateFormat = await prepareParseDateFormat()
    const input: SveadminComponent<any> = {
      display: {
        config: {
          format: 'yyyy-mm-dd"T"HH:MM:ss',
        }
      },
      type: COMPONENT_TIME
    }
    const mask: SveadminComponent<any>[] = [
      {
        display: {
          config: {
            value: 'yyyy-mm-dd'
          },
        },
        type: COMPONENT_LITERAL,
      },
      {
        display: {
          config: {
            value: 'T'
          },
        },
        type: COMPONENT_LITERAL,
      },
      {
        display: {
          config: {
            hour: '2-digit',
            hourCycle: 'h23',
          }
        },
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
            minute: '2-digit'
          }
        },
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
            second: '2-digit'
          }
        },
        type: COMPONENT_SECOND,
      },
    ]

    expect(mask).toEqual(parseDateFormat(input))
  })

})
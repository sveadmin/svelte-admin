<script lang="ts">
  import {
    i18n,
  } from '@sveadmin/common'

  import {
    Accordion,
  } from '$lib/accordion/index.js'

  import {
    Button,
  } from '$lib/button/index.js'

  import {
    GridContainer,
    GridLine,
  } from '$lib/grid/index.js'

  import {
    COMPONENT_LITERAL,
    Literal,
  } from '$lib/literal/index.js'

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

  let language = $state(i18n.locale() ?? 'en_GB')

  const changeLanguage = (e: Event) => {
    const target = e.target as HTMLElement
    language = target.dataset.lang ?? 'en_GB'
  }

  $effect(() => {
    i18n.setLocale(language)
  })

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

  const dateFormatByString = [
    {
      display: {
        config: {
          format: '"year: "yyyy. "month: "mm. "day: "dd. "and then hour: "HH "minute: "MM "plus second: "ss',
        }
      },
      type: COMPONENT_DATE_TIME,
    }
  ]

  const dateFormatByString2 = [
    {
      display: {
        config: {
          format: '"year: "yy. "month: "m. "day: "d. "and then hour: "H "minute: "M "plus second: "s',
        }
      },
      type: COMPONENT_DATE_TIME,
    }
  ]

  const dateFormatYear1 = [
    {
      display: {
        config: {
          format: '"yy:" yy',
        }
      },
      type: COMPONENT_DATE_TIME,
    }
  ]

  const dateFormatYear2 = [
    {
      display: {
        config: {
          format: '"yyyy: "yyyy'
        }
      },
      type: COMPONENT_DATE_TIME,
    }
  ]

  const dateFormatMonth1 = [
    {
      display: {
        config: {
          format: '"m: "m',
        }
      },
      type: COMPONENT_DATE_TIME,
    }
  ]

  const dateFormatMonth2 = [
    {
      display: {
        config: {
          format: '"mm: "mm',
        }
      },
      type: COMPONENT_DATE_TIME,
    }
  ]

  const dateFormatMonth3 = [
    {
      display: {
        config: {
          locale: 'en-US',
          format: '"mmm: "mmm',
        }
      },
      type: COMPONENT_DATE_TIME,
    }
  ]

  const dateFormatMonth4 = [
    {
      display: {
        config: {
          format: '"mmmm: "mmmm',
          locale: 'en-US',
        }
      },
      type: COMPONENT_DATE_TIME,
    }
  ]

  const dateFormatMonth5 = [
    {
      display: {
        config: {
          format: '"mmm: "mmm',
        }
      },
      type: COMPONENT_DATE_TIME,
    }
  ]

  const dateFormatMonth6 = [
    {
      display: {
        config: {
          format: '"mmmm: "mmmm',
        }
      },
      type: COMPONENT_DATE_TIME,
    }
  ]

  const dateFormatDay1 = [
    {
      display: {
        config: {
          format: '"d: "d',
        }
      },
      type: COMPONENT_DATE_TIME,
    }
  ]

  const dateFormatDay2 = [
    {
      display: {
        config: {
          format: '"dd: "dd',
        }
      },
      type: COMPONENT_DATE_TIME,
    }
  ]

  const dateFormatDay3 = [
    {
      display: {
        config: {
          format: '"ddd: "ddd',
          locale: 'en-US',
        }
      },
      type: COMPONENT_DATE_TIME,
    }
  ]

  const dateFormatDay4 = [
    {
      display: {
        config: {
          locale: 'en-US',
          format: '"dddd: "dddd',
        }
      },
      type: COMPONENT_DATE_TIME,
    }
  ]

  const dateFormatDay5 = [
    {
      display: {
        config: {
          format: '"ddd: "ddd',
        }
      },
      type: COMPONENT_DATE_TIME,
    }
  ]

  const dateFormatDay6 = [
    {
      display: {
        config: {
          format: '"dddd: "dddd',
        }
      },
      type: COMPONENT_DATE_TIME,
    }
  ]

  const dateFormatDay7 = [
    {
      display: {
        config: {
          format: '"DDD: "DDD',
          locale: 'en-US',
        }
      },
      type: COMPONENT_DATE_TIME,
    }
  ]

  const dateFormatDay8 = [
    {
      display: {
        config: {
          format: '"DDDD: "DDDD',
          locale: 'en-US',
        }
      },
      type: COMPONENT_DATE_TIME,
    }
  ]

  const dateFormatDay9 = [
    {
      display: {
        config: {
          format: '"N: "N',
        }
      },
      type: COMPONENT_DATE_TIME,
    }
  ]

  const dateFormatWeekNumber1 = [
    {
      display: {
        config: {
          format: '"W: "W',
        }
      },
      type: COMPONENT_DATE_TIME,
    }
  ]

  const dateFormatWeekNumber2 = [
    {
      display: {
        config: {
          format: '"WW: "WW',
        }
      },
      type: COMPONENT_DATE_TIME,
    }
  ]

  const dateFormatHour1 = [
    {
      display: {
        config: {
          format: '"h TT: "h TT',
          locale: 'en-US',
        }
      },
      type: COMPONENT_DATE_TIME,
    }
  ]

  const dateFormatHour2 = [
    {
      display: {
        config: {
          format: '"hh TT: "hh TT',
          locale: 'en-US',
        }
      },
      type: COMPONENT_DATE_TIME,
    }
  ]

  const dateFormatHour3 = [
    {
      display: {
        config: {
          format: '"H: "H',
        }
      },
      type: COMPONENT_DATE_TIME,
    }
  ]

  const dateFormatHour4 = [
    {
      display: {
        config: {
          format: '"HH: "HH',
        }
      },
      type: COMPONENT_DATE_TIME,
    }
  ]

  const dateFormatDayPeriod1 = [
    {
      display: {
        config: {
          locale: 'en-US',
          format: '"ht: "ht',
        }
      },
      type: COMPONENT_DATE_TIME,
    }
  ]

  const dateFormatDayPeriod2 = [
    {
      display: {
        config: {
          format: '"h tt: "h tt',
          locale: 'en-US',
        }
      },
      type: COMPONENT_DATE_TIME,
    }
  ]

  const dateFormatDayPeriod3 = [
    {
      display: {
        config: {
          format: '"hT: "hT',
          locale: 'en-US',
        }
      },
      type: COMPONENT_DATE_TIME,
    }
  ]

  const dateFormatDayPeriod4 = [
    {
      display: {
        config: {
          format: '"h TT: "h TT',
          locale: 'en-US',
        }
      },
      type: COMPONENT_DATE_TIME,
    }
  ]

  const dateFormatMinute1 = [
    {
      display: {
        config: {
          format: '"M: "M',
        }
      },
      type: COMPONENT_DATE_TIME,
    }
  ]

  const dateFormatMinute2 = [
    {
      display: {
        config: {
          format: '"MM: "MM',
        }
      },
      type: COMPONENT_DATE_TIME,
    }
  ]

  const dateFormatSecond1 = [
    {
      display: {
        config: {
          format: '"s: "s',
        }
      },
      type: COMPONENT_DATE_TIME,
    }
  ]

  const dateFormatSecond2 = [
    {
      display: {
        config: {
          format: '"ss: "ss',
        }
      },
      type: COMPONENT_DATE_TIME,
    }
  ]

  const dateFormatSecond3 = [
    {
      display: {
        config: {
          format: '"s.l: "s.l',
        }
      },
      type: COMPONENT_DATE_TIME,
    }
  ]

  const dateFormatSecond4 = [
    {
      display: {
        config: {
          format: '"s.L: "s.L',
        }
      },
      type: COMPONENT_DATE_TIME,
    }
  ]


  const dateFormatMinuteSecond1 = [
    {
      display: {
        config: {
          format: '"M:s: "M:s',
        }
      },
      type: COMPONENT_DATE_TIME,
    }
  ]

  const dateFormatMinuteSecond2 = [
    {
      display: {
        config: {
          format: '"M:ss: "M:ss',
        }
      },
      type: COMPONENT_DATE_TIME,
    }
  ]

  const dateFormatMinuteSecond3 = [
    {
      display: {
        config: {
          format: '"MM:s: "MM:s',
        }
      },
      type: COMPONENT_DATE_TIME,
    }
  ]

  const dateFormatMinuteSecond4 = [
    {
      display: {
        config: {
          format: '"MM:ss: "MM:ss',
        }
      },
      type: COMPONENT_DATE_TIME,
    }
  ]

  const dateFormatTimeZone1 = [
    {
      display: {
        config: {
          format: '"o: "o',
          timeZone: 'Europe/Berlin',
        }
      },
      type: COMPONENT_DATE_TIME,
    }
  ]

  const dateFormatTimeZone2 = [
    {
      display: {
        config: {
          format: '"p: "p',
          timeZone: 'Europe/Berlin',
        }
      },
      type: COMPONENT_DATE_TIME,
    }
  ]

  const dateFormatTimeZone3 = [
    {
      display: {
        config: {
          format: '"Z (locael sv): "Z',
          locale: 'sv',
          timeZone: 'Europe/Berlin',
        }
      },
      type: COMPONENT_DATE_TIME,
    }
  ]

  const dateFormatTimeZone4 = [
    {
      display: {
        config: {
          format: '"Z (locale en-US): "Z',
          locale: 'en-US',
          timeZone: 'Europe/Berlin',
        }
      },
      type: COMPONENT_DATE_TIME,
    }
  ]

  const dateFormatTimeZone5 = [
    {
      display: {
        config: {
          format: '"ZZ: "ZZ',
          locale: 'en-US',
          timeZone: 'Europe/Berlin',
        }
      },
      type: COMPONENT_DATE_TIME,
    }
  ]

  const dateFormatTimeZone6 = [
    {
      display: {
        config: {
          format: '"o: "o',
          timeZone: 'America/Los_Angeles',
        }
      },
      type: COMPONENT_DATE_TIME,
    }
  ]

  const dateFormatTimeZone7 = [
    {
      display: {
        config: {
          format: '"p: "p',
          timeZone: 'America/Los_Angeles',
        }
      },
      type: COMPONENT_DATE_TIME,
    }
  ]

  const dateFormatTimeZone8 = [
    {
      display: {
        config: {
          format: '"Z (locale sv): "Z',
          locale: 'sv',
          timeZone: 'America/Los_Angeles',
        }
      },
      type: COMPONENT_DATE_TIME,
    }
  ]

  const dateFormatTimeZone9 = [
    {
      display: {
        config: {
          format: '"Z (locale en-US): "Z',
          locale: 'en-US',
          timeZone: 'America/Los_Angeles',
        }
      },
      type: COMPONENT_DATE_TIME,
    }
  ]

  const dateFormatTimeZone10 = [
    {
      display: {
        config: {
          format: '"ZZ: "ZZ',
          locale: 'en-US',
          timeZone: 'America/Los_Angeles',
        }
      },
      type: COMPONENT_DATE_TIME,
    }
  ]

  const dateFormatInterval1 = [
    {
      display: {
        config: {
          interval: DATE_INTERVAL_NARROW,
        }
      },
      type: COMPONENT_INTERVAL,
    }
  ]

  const dateFormatInterval2 = [
    {
      display: {
        config: {
          interval: DATE_INTERVAL_SHORT ,
        }
      },
      type: COMPONENT_INTERVAL,
    }
  ]

  const dateFormatInterval3 = [
    {
      display: {
        config: {
          interval: DATE_INTERVAL_SHORT,
          unit: COMPONENT_SECOND,
        }
      },
      type: COMPONENT_INTERVAL,
    }
  ]

  const dateFormatInterval4 = [
    {
      display: {
        config: {
          interval: DATE_INTERVAL_SHORT,
          unit: COMPONENT_MINUTE,
        }
      },
      type: COMPONENT_INTERVAL,
    }
  ]

  const dateFormatInterval5 = [
    {
      display: {
        config: {
          interval: DATE_INTERVAL_SHORT,
          unit: COMPONENT_HOUR,
        }
      },
      type: COMPONENT_INTERVAL,
    }
  ]

  const dateFormatInterval6 = [
    {
      display: {
        config: {
          interval: DATE_INTERVAL_SHORT,
          unit: COMPONENT_DAY,
        }
      },
      type: COMPONENT_INTERVAL,
    }
  ]

  const dateFormatInterval7 = [
    {
      display: {
        config: {
          interval: DATE_INTERVAL_SHORT,
          unit: COMPONENT_WEEK,
        }
      },
      type: COMPONENT_INTERVAL,
    }
  ]

  const dateFormatInterval8 = [
    {
      display: {
        config: {
          interval: DATE_INTERVAL_SHORT,
          unit: COMPONENT_MONTH,
        }
      },
      type: COMPONENT_INTERVAL,
    }
  ]

  const dateFormatInterval9 = [
    {
      display: {
        config: {
          interval: DATE_INTERVAL_SHORT,
          unit: COMPONENT_YEAR,
        }
      },
      type: COMPONENT_INTERVAL,
    }
  ]

  const dateFormatInterval12 = [
    {
      display: {
        config: {
          interval: DATE_INTERVAL_LONG ,
        }
      },
      type: COMPONENT_INTERVAL,
    }
  ]

  const dateFormatInterval13 = [
    {
      display: {
        config: {
          interval: DATE_INTERVAL_LONG,
          unit: COMPONENT_SECOND,
        }
      },
      type: COMPONENT_INTERVAL,
    }
  ]

  const dateFormatInterval14 = [
    {
      display: {
        config: {
          interval: DATE_INTERVAL_LONG,
          unit: COMPONENT_MINUTE,
        }
      },
      type: COMPONENT_INTERVAL,
    }
  ]

  const dateFormatInterval15 = [
    {
      display: {
        config: {
          interval: DATE_INTERVAL_LONG,
          unit: COMPONENT_HOUR,
        }
      },
      type: COMPONENT_INTERVAL,
    }
  ]

  const dateFormatInterval16 = [
    {
      display: {
        config: {
          interval: DATE_INTERVAL_LONG,
          unit: COMPONENT_DAY,
        }
      },
      type: COMPONENT_INTERVAL,
    }
  ]

  const dateFormatInterval17 = [
    {
      display: {
        config: {
          interval: DATE_INTERVAL_LONG,
          unit: COMPONENT_WEEK,
        }
      },
      type: COMPONENT_INTERVAL,
    }
  ]

  const dateFormatInterval18 = [
    {
      display: {
        config: {
          interval: DATE_INTERVAL_LONG,
          unit: COMPONENT_MONTH,
        }
      },
      type: COMPONENT_INTERVAL,
    }
  ]

  const dateFormatInterval19 = [
    {
      display: {
        config: {
          interval: DATE_INTERVAL_LONG,
          unit: COMPONENT_YEAR,
        }
      },
      type: COMPONENT_INTERVAL,
    }
  ]

  const dateFormatInterval22 = [
    {
      display: {
        config: {
          interval: DATE_INTERVAL_SHORT_MASK ,
        }
      },
      type: COMPONENT_INTERVAL,
    }
  ]

  const dateFormatInterval23 = [
    {
      display: {
        config: {
          interval: DATE_INTERVAL_SHORT_MASK,
          unit: COMPONENT_SECOND,
        }
      },
      type: COMPONENT_INTERVAL,
    }
  ]

  const dateFormatInterval24 = [
    {
      display: {
        config: {
          interval: DATE_INTERVAL_SHORT_MASK,
          unit: COMPONENT_MINUTE,
        }
      },
      type: COMPONENT_INTERVAL,
    }
  ]

  const dateFormatInterval25 = [
    {
      display: {
        config: {
          interval: DATE_INTERVAL_SHORT_MASK,
          unit: COMPONENT_HOUR,
        }
      },
      type: COMPONENT_INTERVAL,
    }
  ]

  const dateFormatInterval26 = [
    {
      display: {
        config: {
          interval: DATE_INTERVAL_SHORT_MASK,
          unit: COMPONENT_DAY,
        }
      },
      type: COMPONENT_INTERVAL,
    }
  ]

  const dateFormatInterval27 = [
    {
      display: {
        config: {
          interval: DATE_INTERVAL_SHORT_MASK,
          unit: COMPONENT_WEEK,
        }
      },
      type: COMPONENT_INTERVAL,
    }
  ]

  const dateFormatInterval28 = [
    {
      display: {
        config: {
          interval: DATE_INTERVAL_SHORT_MASK,
          unit: COMPONENT_MONTH,
        }
      },
      type: COMPONENT_INTERVAL,
    }
  ]

  const dateFormatInterval29 = [
    {
      display: {
        config: {
          interval: DATE_INTERVAL_SHORT_MASK,
          unit: COMPONENT_YEAR,
        }
      },
      type: COMPONENT_INTERVAL,
    }
  ]

  const dateFormatInterval32 = [
    {
      display: {
        config: {
          interval: DATE_INTERVAL_LONG_MASK,
        }
      },
      type: COMPONENT_INTERVAL,
    }
  ]

  const dateFormatInterval33 = [
    {
      display: {
        config: {
          interval: DATE_INTERVAL_LONG_MASK,
          unit: COMPONENT_SECOND,
        }
      },
      type: COMPONENT_INTERVAL,
    }
  ]

  const dateFormatInterval34 = [
    {
      display: {
        config: {
          interval: DATE_INTERVAL_LONG_MASK,
          unit: COMPONENT_MINUTE,
        }
      },
      type: COMPONENT_INTERVAL,
    }
  ]

  const dateFormatInterval35 = [
    {
      display: {
        config: {
          interval: DATE_INTERVAL_LONG_MASK,
          unit: COMPONENT_HOUR,
        }
      },
      type: COMPONENT_INTERVAL,
    }
  ]

  const dateFormatInterval36 = [
    {
      display: {
        config: {
          interval: DATE_INTERVAL_LONG_MASK,
          unit: COMPONENT_DAY,
        }
      },
      type: COMPONENT_INTERVAL,
    }
  ]

  const dateFormatInterval37 = [
    {
      display: {
        config: {
          interval: DATE_INTERVAL_LONG_MASK,
          unit: COMPONENT_WEEK,
        }
      },
      type: COMPONENT_INTERVAL,
    }
  ]

  const dateFormatInterval38 = [
    {
      display: {
        config: {
          interval: DATE_INTERVAL_LONG_MASK,
          unit: COMPONENT_MONTH,
        }
      },
      type: COMPONENT_INTERVAL,
    }
  ]

  const dateFormatInterval39 = [
    {
      display: {
        config: {
          interval: DATE_INTERVAL_LONG_MASK,
          unit: COMPONENT_YEAR,
        }
      },
      type: COMPONENT_INTERVAL,
    }
  ]

  const dateRange1 = [
    {
      display: {
        config: {
          value: 'from: ',
        }
      },
      type: COMPONENT_LITERAL,
    },
    {
      display: {
        config: {
          month: DATE_MONTH_NUMERIC
        }
      },
      type: COMPONENT_MONTH,
    },
    {
      display: {
        config: {
          value: '/',
        }
      },
      type: COMPONENT_LITERAL,
    },
    {
      display: {
        config: {
          day: DATE_DAY_NUMERIC
        }
      },
      type: COMPONENT_DAY,
    },
    {
      display: {
        config: {
          value: '/',
        }
      },
      type: COMPONENT_LITERAL,
    },
    {
      display: {
        config: {
          year: DATE_YEAR_2DIGIT
        }
      },
      type: COMPONENT_YEAR,
    },
    {
      display: {
        config: {
          value: ' to: ',
        }
      },
      type: COMPONENT_LITERAL,
    },
    {
      display: {
        config: {
          year: DATE_YEAR_2DIGIT
        }
      },
      index: 1,
      type: COMPONENT_YEAR,
    },
    {
      display: {
        config: {
          value: '-',
        }
      },
      type: COMPONENT_LITERAL,
    },
    {
      display: {
        config: {
          month: DATE_MONTH_2DIGIT
        }
      },
      index: 1,
      type: COMPONENT_MONTH,
    },
    {
      display: {
        config: {
          value: '-',
        }
      },
      type: COMPONENT_LITERAL,
    },
    {
      display: {
        config: {
          day: DATE_DAY_2DIGIT
        }
      },
      index: 1,
      type: COMPONENT_DAY,
    },
  ]

  let boundDate = $state(new Date('2021.02.03 09:08:07'))
  const dateFormat = new Intl.DateTimeFormat('sv')
  let dateEditor = $derived(dateFormat.format(boundDate))

  const onDateChange = (e: Event) => {
    const target = e.target as HTMLInputElement
    boundDate = new Date(target.value)
  }

  const pastDate = new Date()
  pastDate.setTime(pastDate.getTime() - 86400000000)
  const futureDate = new Date()
  futureDate.setTime(futureDate.getTime() + 86400000000)

  const refreshingDate = new Date()
  refreshingDate.setTime(refreshingDate.getTime() + 70000)
</script>
{#key language}
Change language <span class="i18n">(this only influences text loaded via i18n)</span> <Button label="EN" onClick={changeLanguage} data={{lang: 'en_GB'}} class={(language === 'en_GB') ? 'selected' : ''}/>  <Button label="DE" onClick={changeLanguage}  data={{lang: 'de_DE'}} class={(language === 'de_DE') ? 'selected' : ''}/>
{/key}
<Accordion>
  {#snippet title()}
    Detailed date format options
  {/snippet}
  <GridContainer class="demopage-grid">
    <GridLine>
      <span class="grid-span-4">ISO Date format (using `sv` locale): </span>
      <span class="grid-span-8">
        <Literal
          mask={dateFormat1}
          splitter={dateSplitter}
          value={new Date('2021.02.03 09:08:07')} />
      </span>
    </GridLine>
  </GridContainer>
  <GridContainer class="demopage-grid">
    <GridLine>
      <span class="grid-span-4">US Date format: </span>
      <span class="grid-span-8">
        <Literal
          mask={dateFormat2}
          splitter={dateSplitter}
          value={new Date('2021.02.03 09:08:07')} />
      </span>
    </GridLine>
  </GridContainer>
  <GridContainer class="demopage-grid">
    <GridLine>
      <span class="grid-span-4">Date only (bound): </span>
      <span class="grid-span-4">
        <Literal
          mask={dateFormat3}
          splitter={dateSplitter}
          bind:value={boundDate} />
      </span>
      <span>Change: </span>
      <input class="grid-span-3" value={dateEditor} onchange={onDateChange}  type="date"/>
    </GridLine>
  </GridContainer>
  <GridContainer class="demopage-grid">
    <GridLine>
      <span class="grid-span-4">Time only: </span>
      <span class="grid-span-8">
        <Literal
          mask={dateFormat4}
          splitter={dateSplitter}
          value={new Date('2021.02.03 09:08:07')} />
      </span>
    </GridLine>
  </GridContainer>
  <GridContainer class="demopage-grid">
    <GridLine>
      <span class="grid-span-4">Definition using custom mask</span>
      <span class="grid-span-8">
        <Literal
          mask={dateFormatByString}
          splitter={dateSplitter}
          value={new Date('2021.02.03 09:08:07')} />
      </span>
    </GridLine>
  </GridContainer>
  <GridContainer class="demopage-grid">
    <GridLine>
      <span class="grid-span-4">Definition using custom mask (numeric format)</span>
      <span class="grid-span-8">
        <Literal
          mask={dateFormatByString2}
          splitter={dateSplitter}
          value={new Date('2021.02.03 09:08:07')} />
      </span>
    </GridLine>
  </GridContainer>
</Accordion>
<Accordion>
  {#snippet title()}
    Detailed date settings and defaults
  {/snippet}
  <GridContainer class="demopage-grid">
    <GridLine>
      <span class="grid-span-6">Year formats</span>
      <span class="grid-span-4">
        <Literal
          mask={dateFormatYear1}
          splitter={dateSplitter}
          value={new Date('2021.02.03 09:08:07')} />
      </span>
      <span class="grid-span-2">
        <Literal
          mask={dateFormatYear2}
          splitter={dateSplitter}
          value={new Date('2021.02.03 09:08:07')} />
      </span>
    </GridLine>
  </GridContainer>
  <GridContainer class="demopage-grid">
    <GridLine>
      <span class="grid-span-4">Month formats</span>
      <span class="grid-span-2">
        <Literal
          mask={dateFormatMonth1}
          splitter={dateSplitter}
          value={new Date('2021.02.03 09:08:07')} />
      </span>
      <span class="grid-span-2">
        <Literal
          mask={dateFormatMonth2}
          splitter={dateSplitter}
          value={new Date('2021.02.03 09:08:07')} />
      </span>
      <span class="grid-span-2">
        <Literal
          mask={dateFormatMonth3}
          splitter={dateSplitter}
          value={new Date('2021.02.03 09:08:07')} />
      </span>
      <span class="grid-span-2">
        <Literal
          mask={dateFormatMonth4}
          splitter={dateSplitter}
          value={new Date('2021.02.03 09:08:07')} />
      </span>
    </GridLine>
  </GridContainer>
  <GridContainer class="demopage-grid">
    <GridLine>
      <span class="grid-span-8">Month formats with default locale (Swedish)</span>
      <span class="grid-span-2">
        <Literal
          mask={dateFormatMonth5}
          splitter={dateSplitter}
          value={new Date('2021.02.03 09:08:07')} />
      </span>
      <span class="grid-span-2">
        <Literal
          mask={dateFormatMonth6}
          splitter={dateSplitter}
          value={new Date('2021.02.03 09:08:07')} />
      </span>
    </GridLine>
  </GridContainer>
  <GridContainer class="demopage-grid">
    <GridLine>
      <span class="grid-span-4">Day formats</span>
      <span class="grid-span-2">
        <Literal
          mask={dateFormatDay1}
          splitter={dateSplitter}
          value={new Date('2021.02.03 09:08:07')} />
      </span>
      <span class="grid-span-2">
        <Literal
          mask={dateFormatDay2}
          splitter={dateSplitter}
          value={new Date('2021.02.03 09:08:07')} />
      </span>
      <span class="grid-span-2">
        <Literal
          mask={dateFormatDay3}
          splitter={dateSplitter}
          value={new Date('2021.02.03 09:08:07')} />
      </span>
      <span class="grid-span-2">
        <Literal
          mask={dateFormatDay4}
          splitter={dateSplitter}
          value={new Date('2021.02.03 09:08:07')} />
      </span>
    </GridLine>
  </GridContainer>
  <GridContainer class="demopage-grid">
    <GridLine>
      <span class="grid-span-8">Day formats with default locale (Swedish)</span>
      <span class="grid-span-2">
        <Literal
          mask={dateFormatDay5}
          splitter={dateSplitter}
          value={new Date('2021.02.03 09:08:07')} />
      </span>
      <span class="grid-span-2">
        <Literal
          mask={dateFormatDay6}
          splitter={dateSplitter}
          value={new Date('2021.02.03 09:08:07')} />
      </span>
    </GridLine>
  </GridContainer>
  <GridContainer class="demopage-grid">
    <GridLine>
      <span class="grid-span-4">Day name with optional delta - short</span>
      <span class="grid-span-2">
        <Literal
          mask={dateFormatDay7}
          splitter={dateSplitter}
          value={new Date(Date.now() - 86400000 * 2)} />
      </span>
      <span class="grid-span-2 i18n">
        <Literal
          mask={dateFormatDay7}
          splitter={dateSplitter}
          value={new Date(Date.now() - 86400000)} />
      </span>
      <span class="grid-span-2 i18n">
        <Literal
          mask={dateFormatDay7}
          splitter={dateSplitter}
          value={new Date(Date.now())} />
      </span>
      <span class="grid-span-2 i18n">
        <Literal
          mask={dateFormatDay7}
          splitter={dateSplitter}
          value={new Date(Date.now() + 86400000)} />
      </span>
    </GridLine>
  </GridContainer>
  <GridContainer class="demopage-grid">
    <GridLine>
      <span class="grid-span-4">Day name with optional delta - long</span>
      <span class="grid-span-2">
        <Literal
          mask={dateFormatDay8}
          splitter={dateSplitter}
          value={new Date(Date.now() - 86400000 * 2)} />
      </span>
      <span class="grid-span-2 i18n">
        <Literal
          mask={dateFormatDay8}
          splitter={dateSplitter}
          value={new Date(Date.now() - 86400000)} />
      </span>
      <span class="grid-span-2 i18n">
        <Literal
          mask={dateFormatDay8}
          splitter={dateSplitter}
          value={new Date(Date.now())} />
      </span>
      <span class="grid-span-2 i18n">
        <Literal
          mask={dateFormatDay8}
          splitter={dateSplitter}
          value={new Date(Date.now() + 86400000)} />
      </span>
    </GridLine>
  </GridContainer>
  <GridContainer class="demopage-grid">
    <GridLine>
      <span class="grid-span-8">Weekday as number</span>
      <span class="grid-span-2">
        <Literal
          mask={dateFormatDay9}
          splitter={dateSplitter}
          value={new Date('202021.02.03 09:08:07')} />
      </span>
    </GridLine>
  </GridContainer>
  <GridContainer class="demopage-grid">
    <GridLine>
      <span class="grid-span-8">Week number</span>
      <span class="grid-span-2">
        <Literal
          mask={dateFormatWeekNumber1}
          splitter={dateSplitter}
          value={new Date('202021.02.03 09:08:07')} />
      </span>
      <span class="grid-span-2">
        <Literal
          mask={dateFormatWeekNumber2}
          splitter={dateSplitter}
          value={new Date('202021.02.03 09:08:07')} />
      </span>
    </GridLine>
  </GridContainer>
</Accordion>
<Accordion>
  {#snippet title()}
    Detailed time settings and defaults
  {/snippet}
  <GridContainer class="demopage-grid">
    <GridLine>
      <span class="grid-span-4">Hour formats</span>
      <span class="grid-span-2">
        <Literal
          mask={dateFormatHour1}
          splitter={dateSplitter}
          value={new Date('2021.02.03 19:08:07')} />
      </span>
      <span class="grid-span-2">
        <Literal
          mask={dateFormatHour2}
          splitter={dateSplitter}
          value={new Date('2021.02.03 19:08:07')} />
      </span>
      <span class="grid-span-2">
        <Literal
          mask={dateFormatHour3}
          splitter={dateSplitter}
          value={new Date('2021.02.03 09:08:07')} />
      </span>
      <span class="grid-span-2">
        <Literal
          mask={dateFormatHour4}
          splitter={dateSplitter}
          value={new Date('2021.02.03 09:08:07')} />
      </span>
    </GridLine>
  </GridContainer>
  <GridContainer class="demopage-grid">
    <GridLine>
      <span class="grid-span-4">Day period formats</span>
      <span class="grid-span-2">
        <Literal
          mask={dateFormatDayPeriod1}
          splitter={dateSplitter}
          value={new Date('2021.02.03 09:08:07')} />
      </span>
      <span class="grid-span-2">
        <Literal
          mask={dateFormatDayPeriod2}
          splitter={dateSplitter}
          value={new Date('2021.02.03 09:08:07')} />
      </span>
      <span class="grid-span-2">
        <Literal
          mask={dateFormatDayPeriod3}
          splitter={dateSplitter}
          value={new Date('2021.02.03 09:08:07')} />
      </span>
      <span class="grid-span-2">
        <Literal
          mask={dateFormatDayPeriod4}
          splitter={dateSplitter}
          value={new Date('2021.02.03 09:08:07')} />
      </span>
    </GridLine>
    <GridLine>
      <span class="grid-start-2 grid-span-11" style="font-size: 1rem">If no locale is specified, the default locale is used which will result in the Swedish version of am/pm: fm/em</span>
    </GridLine>
  </GridContainer>
  <GridContainer class="demopage-grid">
    <GridLine>
      <span class="grid-span-8">Minute formats</span>
      <span class="grid-span-2">
        <Literal
          mask={dateFormatMinute1}
          splitter={dateSplitter}
          value={new Date('2021.02.03 09:08:07')} />
      </span>
      <span class="grid-span-2">
        <Literal
          mask={dateFormatMinute2}
          splitter={dateSplitter}
          value={new Date('2021.02.03 09:08:07')} />
      </span>
    </GridLine>
  </GridContainer>
  <GridContainer class="demopage-grid">
    <GridLine>
      <span class="grid-span-4">Second formats</span>
      <span class="grid-span-2">
        <Literal
          mask={dateFormatSecond1}
          splitter={dateSplitter}
          value={new Date('2021.02.03 09:08:07')} />
      </span>
      <span class="grid-span-2">
        <Literal
          mask={dateFormatSecond2}
          splitter={dateSplitter}
          value={new Date('2021.02.03 09:08:07')} />
      </span>
      <span class="grid-span-2">
        <Literal
          mask={dateFormatSecond3}
          splitter={dateSplitter}
          value={new Date('2021.02.03 09:08:07.456')} />
      </span>
      <span class="grid-span-2">
        <Literal
          mask={dateFormatSecond4}
          splitter={dateSplitter}
          value={new Date('2021.02.03 09:08:07.456')} />
      </span>
    </GridLine>
  </GridContainer>
  <GridContainer class="demopage-grid">
    <GridLine>
      <span class="grid-span-4">Minute + Second formats</span>
      <span class="grid-span-2">
        <Literal
          mask={dateFormatMinuteSecond1}
          splitter={dateSplitter}
          value={new Date('2021.02.03 09:08:07')} />
      </span>
      <span class="grid-span-2">
        <Literal
          mask={dateFormatMinuteSecond2}
          splitter={dateSplitter}
          value={new Date('2021.02.03 09:08:07')} />
      </span>
      <span class="grid-span-2">
        <Literal
          mask={dateFormatMinuteSecond3}
          splitter={dateSplitter}
          value={new Date('2021.02.03 09:08:07.456')} />
      </span>
      <span class="grid-span-2">
        <Literal
          mask={dateFormatMinuteSecond4}
          splitter={dateSplitter}
          value={new Date('2021.02.03 09:08:07.456')} />
      </span>
    </GridLine>
  </GridContainer>
  <GridContainer class="demopage-grid">
    <GridLine>
      <span class="grid-span-2">TZ formats</span>
      <span class="grid-span-2">
        <Literal
          mask={dateFormatTimeZone1}
          splitter={dateSplitter}
          value={new Date('2021.02.03 09:08:07')} />
      </span>
      <span class="grid-span-2">
        <Literal
          mask={dateFormatTimeZone2}
          splitter={dateSplitter}
          value={new Date('2021.02.03 09:08:07')} />
      </span>
      <span class="grid-span-2">
        <Literal
          mask={dateFormatTimeZone3}
          splitter={dateSplitter}
          value={new Date('2021.02.03 09:08:07.456')} />
      </span>
      <span class="grid-span-2">
        <Literal
          mask={dateFormatTimeZone4}
          splitter={dateSplitter}
          value={new Date('2021.02.03 09:08:07.456')} />
      </span>
      <span class="grid-span-2">
        <Literal
          mask={dateFormatTimeZone5}
          splitter={dateSplitter}
          value={new Date('2021.02.03 09:08:07.456')} />
      </span>
    </GridLine>
  </GridContainer>
  <GridContainer class="demopage-grid">
    <GridLine>
      <span class="grid-span-2">TZ formats (PST base)</span>
      <span class="grid-span-2">
        <Literal
          mask={dateFormatTimeZone6}
          splitter={dateSplitter}
          value={new Date('2021.02.03 09:08:07')} />
      </span>
      <span class="grid-span-2">
        <Literal
          mask={dateFormatTimeZone7}
          splitter={dateSplitter}
          value={new Date('2021.02.03 09:08:07')} />
      </span>
      <span class="grid-span-2">
        <Literal
          mask={dateFormatTimeZone8}
          splitter={dateSplitter}
          value={new Date('2021.02.03 09:08:07')} />
      </span>
      <span class="grid-span-2">
        <Literal
          mask={dateFormatTimeZone9}
          splitter={dateSplitter}
          value={new Date('2021.02.03 09:08:07')} />
      </span>
      <span class="grid-span-2">
        <Literal
          mask={dateFormatTimeZone10}
          splitter={dateSplitter}
          value={new Date('2021.02.03 09:08:07')} />
      </span>
    </GridLine>
  </GridContainer>
</Accordion>
<Accordion>
  {#snippet title()}
    Detailed interval formats
  {/snippet}
  <GridContainer class="demopage-grid">
    <GridLine>
      <span class="grid-span-6">Interval returning the best fit unit but not adding it</span>
      <span class="grid-span-2">
        <Literal
          mask={dateFormatInterval1}
          splitter={dateSplitter}
          value={pastDate} />
      </span>
    </GridLine>
  </GridContainer>
  <GridContainer class="demopage-grid">
    <GridLine>
      <span class="grid-span-4">Interval to past date short</span>
      <span class="grid-span-2 i18n">
        <Literal
          mask={dateFormatInterval2}
          splitter={dateSplitter}
          value={pastDate} />
      </span>
      <span class="grid-span-2 i18n">
        <Literal
          mask={dateFormatInterval3}
          splitter={dateSplitter}
          value={pastDate} />
      </span>
      <span class="grid-span-2 i18n">
        <Literal
          mask={dateFormatInterval4}
          splitter={dateSplitter}
          value={pastDate} />
      </span>
      <span class="grid-span-2 i18n">
        <Literal
          mask={dateFormatInterval5}
          splitter={dateSplitter}
          value={pastDate} />
      </span>
    </GridLine>
    <GridLine>
      <span class="grid-start-5 grid-span-2">
        <Literal
          mask={dateFormatInterval6}
          splitter={dateSplitter}
          value={pastDate} />
      </span>
      <span class="grid-span-2 i18n">
        <Literal
          mask={dateFormatInterval7}
          splitter={dateSplitter}
          value={pastDate} />
      </span>
      <span class="grid-span-2 i18n">
        <Literal
          mask={dateFormatInterval8}
          splitter={dateSplitter}
          value={pastDate} />
      </span>
      <span class="grid-span-2 i18n">
        <Literal
          mask={dateFormatInterval9}
          splitter={dateSplitter}
          value={pastDate} />
      </span>
    </GridLine>
  </GridContainer>
  <GridContainer class="demopage-grid">
    <GridLine>
      <span class="grid-span-4">Interval to future date short</span>
      <span class="grid-span-2 i18n">
        <Literal
          mask={dateFormatInterval2}
          splitter={dateSplitter}
          value={futureDate} />
      </span>
      <span class="grid-span-2 i18n">
        <Literal
          mask={dateFormatInterval3}
          splitter={dateSplitter}
          value={futureDate} />
      </span>
      <span class="grid-span-2 i18n">
        <Literal
          mask={dateFormatInterval4}
          splitter={dateSplitter}
          value={futureDate} />
      </span>
      <span class="grid-span-2 i18n">
        <Literal
          mask={dateFormatInterval5}
          splitter={dateSplitter}
          value={futureDate} />
      </span>
    </GridLine>
    <GridLine>
      <span class="grid-start-5 grid-span-2">
        <Literal
          mask={dateFormatInterval6}
          splitter={dateSplitter}
          value={futureDate} />
      </span>
      <span class="grid-span-2 i18n">
        <Literal
          mask={dateFormatInterval7}
          splitter={dateSplitter}
          value={futureDate} />
      </span>
      <span class="grid-span-2 i18n">
        <Literal
          mask={dateFormatInterval8}
          splitter={dateSplitter}
          value={futureDate} />
      </span>
      <span class="grid-span-2 i18n">
        <Literal
          mask={dateFormatInterval9}
          splitter={dateSplitter}
          value={futureDate} />
      </span>
    </GridLine>
  </GridContainer>
  <GridContainer class="demopage-grid">
    <GridLine>
      <span class="grid-span-4">Interval to past date long</span>
      <span class="grid-span-2 i18n">
        <Literal
          mask={dateFormatInterval12}
          splitter={dateSplitter}
          value={pastDate} />
      </span>
      <span class="grid-span-2 i18n">
        <Literal
          mask={dateFormatInterval13}
          splitter={dateSplitter}
          value={pastDate} />
      </span>
      <span class="grid-span-2 i18n">
        <Literal
          mask={dateFormatInterval14}
          splitter={dateSplitter}
          value={pastDate} />
      </span>
      <span class="grid-span-2 i18n">
        <Literal
          mask={dateFormatInterval15}
          splitter={dateSplitter}
          value={pastDate} />
      </span>
    </GridLine>
    <GridLine>
      <span class="grid-start-5 grid-span-2">
        <Literal
          mask={dateFormatInterval16}
          splitter={dateSplitter}
          value={pastDate} />
      </span>
      <span class="grid-span-2 i18n">
        <Literal
          mask={dateFormatInterval17}
          splitter={dateSplitter}
          value={pastDate} />
      </span>
      <span class="grid-span-2 i18n">
        <Literal
          mask={dateFormatInterval18}
          splitter={dateSplitter}
          value={pastDate} />
      </span>
      <span class="grid-span-2 i18n">
        <Literal
          mask={dateFormatInterval19}
          splitter={dateSplitter}
          value={pastDate} />
      </span>
    </GridLine>
  </GridContainer>
  <GridContainer class="demopage-grid">
    <GridLine>
      <span class="grid-span-4">Interval to future date long</span>
      <span class="grid-span-2 i18n">
        <Literal
          mask={dateFormatInterval12}
          splitter={dateSplitter}
          value={futureDate} />
      </span>
      <span class="grid-span-2 i18n">
        <Literal
          mask={dateFormatInterval13}
          splitter={dateSplitter}
          value={futureDate} />
      </span>
      <span class="grid-span-2 i18n">
        <Literal
          mask={dateFormatInterval14}
          splitter={dateSplitter}
          value={futureDate} />
      </span>
      <span class="grid-span-2 i18n">
        <Literal
          mask={dateFormatInterval15}
          splitter={dateSplitter}
          value={futureDate} />
      </span>
    </GridLine>
    <GridLine>
      <span class="grid-start-5 grid-span-2">
        <Literal
          mask={dateFormatInterval16}
          splitter={dateSplitter}
          value={futureDate} />
      </span>
      <span class="grid-span-2 i18n">
        <Literal
          mask={dateFormatInterval17}
          splitter={dateSplitter}
          value={futureDate} />
      </span>
      <span class="grid-span-2 i18n">
        <Literal
          mask={dateFormatInterval18}
          splitter={dateSplitter}
          value={futureDate} />
      </span>
      <span class="grid-span-2 i18n">
        <Literal
          mask={dateFormatInterval19}
          splitter={dateSplitter}
          value={futureDate} />
      </span>
    </GridLine>
  </GridContainer>
  <GridContainer class="demopage-grid">
    <GridLine>
      <span class="grid-span-4">Interval to past date short with prefix/suffix</span>
      <span class="grid-span-2 i18n">
        <Literal
          mask={dateFormatInterval22}
          splitter={dateSplitter}
          value={pastDate} />
      </span>
      <span class="grid-span-2 i18n">
        <Literal
          mask={dateFormatInterval23}
          splitter={dateSplitter}
          value={pastDate} />
      </span>
      <span class="grid-span-2 i18n">
        <Literal
          mask={dateFormatInterval24}
          splitter={dateSplitter}
          value={pastDate} />
      </span>
      <span class="grid-span-2 i18n">
        <Literal
          mask={dateFormatInterval25}
          splitter={dateSplitter}
          value={pastDate} />
      </span>
    </GridLine>
    <GridLine>
      <span class="grid-start-5 grid-span-2">
        <Literal
          mask={dateFormatInterval26}
          splitter={dateSplitter}
          value={pastDate} />
      </span>
      <span class="grid-span-2 i18n">
        <Literal
          mask={dateFormatInterval27}
          splitter={dateSplitter}
          value={pastDate} />
      </span>
      <span class="grid-span-2 i18n">
        <Literal
          mask={dateFormatInterval28}
          splitter={dateSplitter}
          value={pastDate} />
      </span>
      <span class="grid-span-2 i18n">
        <Literal
          mask={dateFormatInterval29}
          splitter={dateSplitter}
          value={pastDate} />
      </span>
    </GridLine>
  </GridContainer>
  <GridContainer class="demopage-grid">
    <GridLine>
      <span class="grid-span-4">Interval to future date short with prefix/suffix</span>
      <span class="grid-span-2 i18n">
        <Literal
          mask={dateFormatInterval22}
          splitter={dateSplitter}
          value={futureDate} />
      </span>
      <span class="grid-span-2 i18n">
        <Literal
          mask={dateFormatInterval23}
          splitter={dateSplitter}
          value={futureDate} />
      </span>
      <span class="grid-span-2 i18n">
        <Literal
          mask={dateFormatInterval24}
          splitter={dateSplitter}
          value={futureDate} />
      </span>
      <span class="grid-span-2 i18n">
        <Literal
          mask={dateFormatInterval25}
          splitter={dateSplitter}
          value={futureDate} />
      </span>
    </GridLine>
    <GridLine>
      <span class="grid-start-5 grid-span-2">
        <Literal
          mask={dateFormatInterval26}
          splitter={dateSplitter}
          value={futureDate} />
      </span>
      <span class="grid-span-2 i18n">
        <Literal
          mask={dateFormatInterval27}
          splitter={dateSplitter}
          value={futureDate} />
      </span>
      <span class="grid-span-2 i18n">
        <Literal
          mask={dateFormatInterval28}
          splitter={dateSplitter}
          value={futureDate} />
      </span>
      <span class="grid-span-2 i18n">
        <Literal
          mask={dateFormatInterval29}
          splitter={dateSplitter}
          value={futureDate} />
      </span>
    </GridLine>
  </GridContainer>
  <GridContainer class="demopage-grid">
    <GridLine>
      <span class="grid-span-4">Interval to past date long with prefix/suffix</span>
      <span class="grid-span-2 i18n">
        <Literal
          mask={dateFormatInterval32}
          splitter={dateSplitter}
          value={pastDate} />
      </span>
      <span class="grid-span-2 i18n">
        <Literal
          mask={dateFormatInterval33}
          splitter={dateSplitter}
          value={pastDate} />
      </span>
      <span class="grid-span-2 i18n">
        <Literal
          mask={dateFormatInterval34}
          splitter={dateSplitter}
          value={pastDate} />
      </span>
      <span class="grid-span-2 i18n">
        <Literal
          mask={dateFormatInterval35}
          splitter={dateSplitter}
          value={pastDate} />
      </span>
    </GridLine>
    <GridLine>
      <span class="grid-start-5 grid-span-2">
        <Literal
          mask={dateFormatInterval36}
          splitter={dateSplitter}
          value={pastDate} />
      </span>
      <span class="grid-span-2 i18n">
        <Literal
          mask={dateFormatInterval37}
          splitter={dateSplitter}
          value={pastDate} />
      </span>
      <span class="grid-span-2 i18n">
        <Literal
          mask={dateFormatInterval38}
          splitter={dateSplitter}
          value={pastDate} />
      </span>
      <span class="grid-span-2 i18n">
        <Literal
          mask={dateFormatInterval39}
          splitter={dateSplitter}
          value={pastDate} />
      </span>
    </GridLine>
  </GridContainer>
  <GridContainer class="demopage-grid">
    <GridLine>
      <span class="grid-span-4">Interval to future date long with prefix/suffix</span>
      <span class="grid-span-2 i18n">
        <Literal
          mask={dateFormatInterval32}
          splitter={dateSplitter}
          value={futureDate} />
      </span>
      <span class="grid-span-2 i18n">
        <Literal
          mask={dateFormatInterval33}
          splitter={dateSplitter}
          value={futureDate} />
      </span>
      <span class="grid-span-2 i18n">
        <Literal
          mask={dateFormatInterval34}
          splitter={dateSplitter}
          value={futureDate} />
      </span>
      <span class="grid-span-2 i18n">
        <Literal
          mask={dateFormatInterval35}
          splitter={dateSplitter}
          value={futureDate} />
      </span>
    </GridLine>
    <GridLine>
      <span class="grid-start-5 grid-span-2">
        <Literal
          mask={dateFormatInterval36}
          splitter={dateSplitter}
          value={futureDate} />
      </span>
      <span class="grid-span-2 i18n">
        <Literal
          mask={dateFormatInterval37}
          splitter={dateSplitter}
          value={futureDate} />
      </span>
      <span class="grid-span-2 i18n">
        <Literal
          mask={dateFormatInterval38}
          splitter={dateSplitter}
          value={futureDate} />
      </span>
      <span class="grid-span-2 i18n">
        <Literal
          mask={dateFormatInterval39}
          splitter={dateSplitter}
          value={futureDate} />
      </span>
    </GridLine>
  </GridContainer>
  <GridContainer class="demopage-grid">
    <GridLine>
      <span class="grid-span-4">Interval with refreshInterval at every second</span>
      <span class="grid-span-2 i18n">
        <Literal
          mask={dateFormatInterval32}
          refreshInterval={1000}
          splitter={dateSplitter}
          value={refreshingDate} />
      </span>
      <span class="grid-span-2 i18n">
        <Literal
          mask={dateFormatInterval33}
          refreshInterval={1000}
          splitter={dateSplitter}
          value={refreshingDate} />
      </span>
      <span class="grid-span-2 i18n">
        <Literal
          mask={dateFormatInterval34}
          refreshInterval={1000}
          splitter={dateSplitter}
          value={refreshingDate} />
      </span>
      <span class="grid-span-2 i18n">
        <Literal
          mask={dateFormatInterval35}
          refreshInterval={1000}
          splitter={dateSplitter}
          value={refreshingDate} />
      </span>
    </GridLine>
  </GridContainer>
</Accordion>
<Accordion>
  {#snippet title()}
    Two date in one line with different formats
  {/snippet}
  <GridContainer class="demopage-grid">
    <GridLine>
      <span class="grid-span-6">Interval returning the best fit unit but not adding it</span>
      <span class="grid-span-4">
        <Literal
          mask={dateRange1}
          splitter={dateSplitter}
          value={[new Date('2021.02.03 09:08:07'), new Date('2022.04.06 08:06:04')]} />
      </span>
    </GridLine>
  </GridContainer>
</Accordion>

<style>
  span.i18n {
    background-color: rgba(var(--secondary-color-light), .25);
  }
</style>
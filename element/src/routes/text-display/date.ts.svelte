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
    DATE_YEAR_NUMERIC,
    dateSplitter,
    TEXT_DISPLAY_TYPE_DATE,
    TEXT_DISPLAY_TYPE_DATE_TIME,
    TEXT_DISPLAY_TYPE_DAY,
    TEXT_DISPLAY_TYPE_HOUR,
    TEXT_DISPLAY_TYPE_INTERVAL,
    TEXT_DISPLAY_TYPE_LITERAL,
    TEXT_DISPLAY_TYPE_MINUTE,
    TEXT_DISPLAY_TYPE_MONTH,
    TEXT_DISPLAY_TYPE_SECOND,
    TEXT_DISPLAY_TYPE_TIME,
    TEXT_DISPLAY_TYPE_WEEK,
    TEXT_DISPLAY_TYPE_YEAR,
    TextDisplay,
  } from '$lib/text-display/index.js'

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
      type: TEXT_DISPLAY_TYPE_DATE_TIME,
    }
  ]

  const dateFormat2 = [
    {
      locale: 'en-US',
      type: TEXT_DISPLAY_TYPE_DATE_TIME,
    }
  ]

  const dateFormat3 = [
    {
      type: TEXT_DISPLAY_TYPE_DATE,
    }
  ]

  const dateFormat4 = [
    {
      type: TEXT_DISPLAY_TYPE_TIME,
    }
  ]

  const dateFormatByString = [
    {
      options: {
        format: '"year: "yyyy. "month: "mm. "day: "dd. "and then hour: "HH "minute: "MM "plus second: "ss',
      },
      type: TEXT_DISPLAY_TYPE_DATE_TIME,
    }
  ]

  const dateFormatByString2 = [
    {
      options: {
        format: '"year: "yy. "month: "m. "day: "d. "and then hour: "H "minute: "M "plus second: "s',
      },
      type: TEXT_DISPLAY_TYPE_DATE_TIME,
    }
  ]

  const dateFormatYear1 = [
    {
      options: {
        format: '"yy:" yy',
      },
      type: TEXT_DISPLAY_TYPE_DATE_TIME,
    }
  ]

  const dateFormatYear2 = [
    {
      options: {
        format: '"yyyy: "yyyy'
      },
      type: TEXT_DISPLAY_TYPE_DATE_TIME,
    }
  ]

  const dateFormatMonth1 = [
    {
      options: {
        format: '"m: "m',
      },
      type: TEXT_DISPLAY_TYPE_DATE_TIME,
    }
  ]

  const dateFormatMonth2 = [
    {
      options: {
        format: '"mm: "mm',
      },
      type: TEXT_DISPLAY_TYPE_DATE_TIME,
    }
  ]

  const dateFormatMonth3 = [
    {
      locale: 'en-US',
      options: {
        format: '"mmm: "mmm',
      },
      type: TEXT_DISPLAY_TYPE_DATE_TIME,
    }
  ]

  const dateFormatMonth4 = [
    {
      locale: 'en-US',
      options: {
        format: '"mmmm: "mmmm',
      },
      type: TEXT_DISPLAY_TYPE_DATE_TIME,
    }
  ]

  const dateFormatMonth5 = [
    {
      options: {
        format: '"mmm: "mmm',
      },
      type: TEXT_DISPLAY_TYPE_DATE_TIME,
    }
  ]

  const dateFormatMonth6 = [
    {
      options: {
        format: '"mmmm: "mmmm',
      },
      type: TEXT_DISPLAY_TYPE_DATE_TIME,
    }
  ]

  const dateFormatDay1 = [
    {
      options: {
        format: '"d: "d',
      },
      type: TEXT_DISPLAY_TYPE_DATE_TIME,
    }
  ]

  const dateFormatDay2 = [
    {
      options: {
        format: '"dd: "dd',
      },
      type: TEXT_DISPLAY_TYPE_DATE_TIME,
    }
  ]

  const dateFormatDay3 = [
    {
      locale: 'en-US',
      options: {
        format: '"ddd: "ddd',
      },
      type: TEXT_DISPLAY_TYPE_DATE_TIME,
    }
  ]

  const dateFormatDay4 = [
    {
      locale: 'en-US',
      options: {
        format: '"dddd: "dddd',
      },
      type: TEXT_DISPLAY_TYPE_DATE_TIME,
    }
  ]

  const dateFormatDay5 = [
    {
      options: {
        format: '"ddd: "ddd',
      },
      type: TEXT_DISPLAY_TYPE_DATE_TIME,
    }
  ]

  const dateFormatDay6 = [
    {
      options: {
        format: '"dddd: "dddd',
      },
      type: TEXT_DISPLAY_TYPE_DATE_TIME,
    }
  ]

  const dateFormatDay7 = [
    {
      locale: 'en-US',
      options: {
        format: '"DDD: "DDD',
      },
      type: TEXT_DISPLAY_TYPE_DATE_TIME,
    }
  ]

  const dateFormatDay8 = [
    {
      locale: 'en-US',
      options: {
        format: '"DDDD: "DDDD',
      },
      type: TEXT_DISPLAY_TYPE_DATE_TIME,
    }
  ]

  const dateFormatDay9 = [
    {
      options: {
        format: '"N: "N',
      },
      type: TEXT_DISPLAY_TYPE_DATE_TIME,
    }
  ]

  const dateFormatWeekNumber1 = [
    {
      options: {
        format: '"W: "W',
      },
      type: TEXT_DISPLAY_TYPE_DATE_TIME,
    }
  ]

  const dateFormatWeekNumber2 = [
    {
      options: {
        format: '"WW: "WW',
      },
      type: TEXT_DISPLAY_TYPE_DATE_TIME,
    }
  ]

  const dateFormatHour1 = [
    {
      locale: 'en-US',
      options: {
        format: '"h TT: "h TT',
      },
      type: TEXT_DISPLAY_TYPE_DATE_TIME,
    }
  ]

  const dateFormatHour2 = [
    {
      locale: 'en-US',
      options: {
        format: '"hh TT: "hh TT',
      },
      type: TEXT_DISPLAY_TYPE_DATE_TIME,
    }
  ]

  const dateFormatHour3 = [
    {
      options: {
        format: '"H: "H',
      },
      type: TEXT_DISPLAY_TYPE_DATE_TIME,
    }
  ]

  const dateFormatHour4 = [
    {
      options: {
        format: '"HH: "HH',
      },
      type: TEXT_DISPLAY_TYPE_DATE_TIME,
    }
  ]

  const dateFormatDayPeriod1 = [
    {
      locale: 'en-US',
      options: {
        format: '"ht: "ht',
      },
      type: TEXT_DISPLAY_TYPE_DATE_TIME,
    }
  ]

  const dateFormatDayPeriod2 = [
    {
      locale: 'en-US',
      options: {
        format: '"h tt: "h tt',
      },
      type: TEXT_DISPLAY_TYPE_DATE_TIME,
    }
  ]

  const dateFormatDayPeriod3 = [
    {
      locale: 'en-US',
      options: {
        format: '"hT: "hT',
      },
      type: TEXT_DISPLAY_TYPE_DATE_TIME,
    }
  ]

  const dateFormatDayPeriod4 = [
    {
      locale: 'en-US',
      options: {
        format: '"h TT: "h TT',
      },
      type: TEXT_DISPLAY_TYPE_DATE_TIME,
    }
  ]

  const dateFormatMinute1 = [
    {
      options: {
        format: '"M: "M',
      },
      type: TEXT_DISPLAY_TYPE_DATE_TIME,
    }
  ]

  const dateFormatMinute2 = [
    {
      options: {
        format: '"MM: "MM',
      },
      type: TEXT_DISPLAY_TYPE_DATE_TIME,
    }
  ]

  const dateFormatSecond1 = [
    {
      options: {
        format: '"s: "s',
      },
      type: TEXT_DISPLAY_TYPE_DATE_TIME,
    }
  ]

  const dateFormatSecond2 = [
    {
      options: {
        format: '"ss: "ss',
      },
      type: TEXT_DISPLAY_TYPE_DATE_TIME,
    }
  ]

  const dateFormatSecond3 = [
    {
      options: {
        format: '"s.l: "s.l',
      },
      type: TEXT_DISPLAY_TYPE_DATE_TIME,
    }
  ]

  const dateFormatSecond4 = [
    {
      options: {
        format: '"s.L: "s.L',
      },
      type: TEXT_DISPLAY_TYPE_DATE_TIME,
    }
  ]


  const dateFormatMinuteSecond1 = [
    {
      options: {
        format: '"M:s: "M:s',
      },
      type: TEXT_DISPLAY_TYPE_DATE_TIME,
    }
  ]

  const dateFormatMinuteSecond2 = [
    {
      options: {
        format: '"M:ss: "M:ss',
      },
      type: TEXT_DISPLAY_TYPE_DATE_TIME,
    }
  ]

  const dateFormatMinuteSecond3 = [
    {
      options: {
        format: '"MM:s: "MM:s',
      },
      type: TEXT_DISPLAY_TYPE_DATE_TIME,
    }
  ]

  const dateFormatMinuteSecond4 = [
    {
      options: {
        format: '"MM:ss: "MM:ss',
      },
      type: TEXT_DISPLAY_TYPE_DATE_TIME,
    }
  ]

  const dateFormatTimeZone1 = [
    {
      options: {
        format: '"o: "o',
        timeZone: 'Europe/Berlin',
      },
      type: TEXT_DISPLAY_TYPE_DATE_TIME,
    }
  ]

  const dateFormatTimeZone2 = [
    {
      options: {
        format: '"p: "p',
        timeZone: 'Europe/Berlin',
      },
      type: TEXT_DISPLAY_TYPE_DATE_TIME,
    }
  ]

  const dateFormatTimeZone3 = [
    {
      locale: 'sv',
      options: {
        format: '"Z (locael sv): "Z',
        timeZone: 'Europe/Berlin',
      },
      type: TEXT_DISPLAY_TYPE_DATE_TIME,
    }
  ]

  const dateFormatTimeZone4 = [
    {
      locale: 'en-US',
      options: {
        format: '"Z (locale en-US): "Z',
        timeZone: 'Europe/Berlin',
      },
      type: TEXT_DISPLAY_TYPE_DATE_TIME,
    }
  ]

  const dateFormatTimeZone5 = [
    {
      locale: 'en-US',
      options: {
        format: '"ZZ: "ZZ',
        timeZone: 'Europe/Berlin',
      },
      type: TEXT_DISPLAY_TYPE_DATE_TIME,
    }
  ]

  const dateFormatTimeZone6 = [
    {
      options: {
        format: '"o: "o',
        timeZone: 'America/Los_Angeles',
      },
      type: TEXT_DISPLAY_TYPE_DATE_TIME,
    }
  ]

  const dateFormatTimeZone7 = [
    {
      options: {
        format: '"p: "p',
        timeZone: 'America/Los_Angeles',
      },
      type: TEXT_DISPLAY_TYPE_DATE_TIME,
    }
  ]

  const dateFormatTimeZone8 = [
    {
      locale: 'sv',
      options: {
        format: '"Z (locale sv): "Z',
        timeZone: 'America/Los_Angeles',
      },
      type: TEXT_DISPLAY_TYPE_DATE_TIME,
    }
  ]

  const dateFormatTimeZone9 = [
    {
      locale: 'en-US',
      options: {
        format: '"Z (locale en-US): "Z',
        timeZone: 'America/Los_Angeles',
      },
      type: TEXT_DISPLAY_TYPE_DATE_TIME,
    }
  ]

  const dateFormatTimeZone10 = [
    {
      locale: 'en-US',
      options: {
        format: '"ZZ: "ZZ',
        timeZone: 'America/Los_Angeles',
      },
      type: TEXT_DISPLAY_TYPE_DATE_TIME,
    }
  ]

  const dateFormatInterval1 = [
    {
      options: {
        interval: DATE_INTERVAL_NARROW,
      },
      type: TEXT_DISPLAY_TYPE_INTERVAL,
    }
  ]

  const dateFormatInterval2 = [
    {
      options: {
        interval: DATE_INTERVAL_SHORT ,
      },
      type: TEXT_DISPLAY_TYPE_INTERVAL,
    }
  ]

  const dateFormatInterval3 = [
    {
      options: {
        interval: DATE_INTERVAL_SHORT,
        unit: TEXT_DISPLAY_TYPE_SECOND,
      },
      type: TEXT_DISPLAY_TYPE_INTERVAL,
    }
  ]

  const dateFormatInterval4 = [
    {
      options: {
        interval: DATE_INTERVAL_SHORT,
        unit: TEXT_DISPLAY_TYPE_MINUTE,
      },
      type: TEXT_DISPLAY_TYPE_INTERVAL,
    }
  ]

  const dateFormatInterval5 = [
    {
      options: {
        interval: DATE_INTERVAL_SHORT,
        unit: TEXT_DISPLAY_TYPE_HOUR,
      },
      type: TEXT_DISPLAY_TYPE_INTERVAL,
    }
  ]

  const dateFormatInterval6 = [
    {
      options: {
        interval: DATE_INTERVAL_SHORT,
        unit: TEXT_DISPLAY_TYPE_DAY,
      },
      type: TEXT_DISPLAY_TYPE_INTERVAL,
    }
  ]

  const dateFormatInterval7 = [
    {
      options: {
        interval: DATE_INTERVAL_SHORT,
        unit: TEXT_DISPLAY_TYPE_WEEK,
      },
      type: TEXT_DISPLAY_TYPE_INTERVAL,
    }
  ]

  const dateFormatInterval8 = [
    {
      options: {
        interval: DATE_INTERVAL_SHORT,
        unit: TEXT_DISPLAY_TYPE_MONTH,
      },
      type: TEXT_DISPLAY_TYPE_INTERVAL,
    }
  ]

  const dateFormatInterval9 = [
    {
      options: {
        interval: DATE_INTERVAL_SHORT,
        unit: TEXT_DISPLAY_TYPE_YEAR,
      },
      type: TEXT_DISPLAY_TYPE_INTERVAL,
    }
  ]

  const dateFormatInterval12 = [
    {
      options: {
        interval: DATE_INTERVAL_LONG ,
      },
      type: TEXT_DISPLAY_TYPE_INTERVAL,
    }
  ]

  const dateFormatInterval13 = [
    {
      options: {
        interval: DATE_INTERVAL_LONG,
        unit: TEXT_DISPLAY_TYPE_SECOND,
      },
      type: TEXT_DISPLAY_TYPE_INTERVAL,
    }
  ]

  const dateFormatInterval14 = [
    {
      options: {
        interval: DATE_INTERVAL_LONG,
        unit: TEXT_DISPLAY_TYPE_MINUTE,
      },
      type: TEXT_DISPLAY_TYPE_INTERVAL,
    }
  ]

  const dateFormatInterval15 = [
    {
      options: {
        interval: DATE_INTERVAL_LONG,
        unit: TEXT_DISPLAY_TYPE_HOUR,
      },
      type: TEXT_DISPLAY_TYPE_INTERVAL,
    }
  ]

  const dateFormatInterval16 = [
    {
      options: {
        interval: DATE_INTERVAL_LONG,
        unit: TEXT_DISPLAY_TYPE_DAY,
      },
      type: TEXT_DISPLAY_TYPE_INTERVAL,
    }
  ]

  const dateFormatInterval17 = [
    {
      options: {
        interval: DATE_INTERVAL_LONG,
        unit: TEXT_DISPLAY_TYPE_WEEK,
      },
      type: TEXT_DISPLAY_TYPE_INTERVAL,
    }
  ]

  const dateFormatInterval18 = [
    {
      options: {
        interval: DATE_INTERVAL_LONG,
        unit: TEXT_DISPLAY_TYPE_MONTH,
      },
      type: TEXT_DISPLAY_TYPE_INTERVAL,
    }
  ]

  const dateFormatInterval19 = [
    {
      options: {
        interval: DATE_INTERVAL_LONG,
        unit: TEXT_DISPLAY_TYPE_YEAR,
      },
      type: TEXT_DISPLAY_TYPE_INTERVAL,
    }
  ]

  const dateFormatInterval22 = [
    {
      options: {
        interval: DATE_INTERVAL_SHORT_MASK ,
      },
      type: TEXT_DISPLAY_TYPE_INTERVAL,
    }
  ]

  const dateFormatInterval23 = [
    {
      options: {
        interval: DATE_INTERVAL_SHORT_MASK,
        unit: TEXT_DISPLAY_TYPE_SECOND,
      },
      type: TEXT_DISPLAY_TYPE_INTERVAL,
    }
  ]

  const dateFormatInterval24 = [
    {
      options: {
        interval: DATE_INTERVAL_SHORT_MASK,
        unit: TEXT_DISPLAY_TYPE_MINUTE,
      },
      type: TEXT_DISPLAY_TYPE_INTERVAL,
    }
  ]

  const dateFormatInterval25 = [
    {
      options: {
        interval: DATE_INTERVAL_SHORT_MASK,
        unit: TEXT_DISPLAY_TYPE_HOUR,
      },
      type: TEXT_DISPLAY_TYPE_INTERVAL,
    }
  ]

  const dateFormatInterval26 = [
    {
      options: {
        interval: DATE_INTERVAL_SHORT_MASK,
        unit: TEXT_DISPLAY_TYPE_DAY,
      },
      type: TEXT_DISPLAY_TYPE_INTERVAL,
    }
  ]

  const dateFormatInterval27 = [
    {
      options: {
        interval: DATE_INTERVAL_SHORT_MASK,
        unit: TEXT_DISPLAY_TYPE_WEEK,
      },
      type: TEXT_DISPLAY_TYPE_INTERVAL,
    }
  ]

  const dateFormatInterval28 = [
    {
      options: {
        interval: DATE_INTERVAL_SHORT_MASK,
        unit: TEXT_DISPLAY_TYPE_MONTH,
      },
      type: TEXT_DISPLAY_TYPE_INTERVAL,
    }
  ]

  const dateFormatInterval29 = [
    {
      options: {
        interval: DATE_INTERVAL_SHORT_MASK,
        unit: TEXT_DISPLAY_TYPE_YEAR,
      },
      type: TEXT_DISPLAY_TYPE_INTERVAL,
    }
  ]

  const dateFormatInterval32 = [
    {
      options: {
        interval: DATE_INTERVAL_LONG_MASK,
      },
      type: TEXT_DISPLAY_TYPE_INTERVAL,
    }
  ]

  const dateFormatInterval33 = [
    {
      options: {
        interval: DATE_INTERVAL_LONG_MASK,
        unit: TEXT_DISPLAY_TYPE_SECOND,
      },
      type: TEXT_DISPLAY_TYPE_INTERVAL,
    }
  ]

  const dateFormatInterval34 = [
    {
      options: {
        interval: DATE_INTERVAL_LONG_MASK,
        unit: TEXT_DISPLAY_TYPE_MINUTE,
      },
      type: TEXT_DISPLAY_TYPE_INTERVAL,
    }
  ]

  const dateFormatInterval35 = [
    {
      options: {
        interval: DATE_INTERVAL_LONG_MASK,
        unit: TEXT_DISPLAY_TYPE_HOUR,
      },
      type: TEXT_DISPLAY_TYPE_INTERVAL,
    }
  ]

  const dateFormatInterval36 = [
    {
      options: {
        interval: DATE_INTERVAL_LONG_MASK,
        unit: TEXT_DISPLAY_TYPE_DAY,
      },
      type: TEXT_DISPLAY_TYPE_INTERVAL,
    }
  ]

  const dateFormatInterval37 = [
    {
      options: {
        interval: DATE_INTERVAL_LONG_MASK,
        unit: TEXT_DISPLAY_TYPE_WEEK,
      },
      type: TEXT_DISPLAY_TYPE_INTERVAL,
    }
  ]

  const dateFormatInterval38 = [
    {
      options: {
        interval: DATE_INTERVAL_LONG_MASK,
        unit: TEXT_DISPLAY_TYPE_MONTH,
      },
      type: TEXT_DISPLAY_TYPE_INTERVAL,
    }
  ]

  const dateFormatInterval39 = [
    {
      options: {
        interval: DATE_INTERVAL_LONG_MASK,
        unit: TEXT_DISPLAY_TYPE_YEAR,
      },
      type: TEXT_DISPLAY_TYPE_INTERVAL,
    }
  ]

  const dateRange1 = [
    {
      type: TEXT_DISPLAY_TYPE_LITERAL,
      value: 'from: ',
    },
    {
      options: {
        month: DATE_MONTH_NUMERIC
      },
      type: TEXT_DISPLAY_TYPE_MONTH,
    },
    {
      type: TEXT_DISPLAY_TYPE_LITERAL,
      value: '/',
    },
    {
      options: {
        day: DATE_DAY_NUMERIC
      },
      type: TEXT_DISPLAY_TYPE_DAY,
    },
    {
      type: TEXT_DISPLAY_TYPE_LITERAL,
      value: '/',
    },
    {
      options: {
        year: DATE_YEAR_2DIGIT
      },
      type: TEXT_DISPLAY_TYPE_YEAR,
    },
    {
      type: TEXT_DISPLAY_TYPE_LITERAL,
      value: ' to: ',
    },
    {
      index: 1,
      options: {
        year: DATE_YEAR_2DIGIT
      },
      type: TEXT_DISPLAY_TYPE_YEAR,
    },
    {
      type: TEXT_DISPLAY_TYPE_LITERAL,
      value: '-',
    },
    {
      index: 1,
      options: {
        month: DATE_MONTH_2DIGIT
      },
      type: TEXT_DISPLAY_TYPE_MONTH,
    },
    {
      type: TEXT_DISPLAY_TYPE_LITERAL,
      value: '-',
    },
    {
      index: 1,
      options: {
        day: DATE_DAY_2DIGIT
      },
      type: TEXT_DISPLAY_TYPE_DAY,
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
Change language <span class="i18n">(this only influences text loaded via i18n)</span> <Button label="EN" callback={changeLanguage} data={{lang: 'en_GB'}} class={(language === 'en_GB') ? 'selected' : ''}/>  <Button label="DE" callback={changeLanguage}  data={{lang: 'de_DE'}} class={(language === 'de_DE') ? 'selected' : ''}/>
{/key}
<Accordion>
  {#snippet title()}
    Detailed date format options
  {/snippet}
  <GridContainer class="demopage-grid">
    <GridLine>
      <span class="grid-span-4">ISO Date format (using `sv` locale): </span>
      <span class="grid-span-8">
        <TextDisplay
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
        <TextDisplay
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
        <TextDisplay
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
        <TextDisplay
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
        <TextDisplay
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
        <TextDisplay
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
        <TextDisplay
          mask={dateFormatYear1}
          splitter={dateSplitter}
          value={new Date('2021.02.03 09:08:07')} />
      </span>
      <span class="grid-span-2">
        <TextDisplay
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
        <TextDisplay
          mask={dateFormatMonth1}
          splitter={dateSplitter}
          value={new Date('2021.02.03 09:08:07')} />
      </span>
      <span class="grid-span-2">
        <TextDisplay
          mask={dateFormatMonth2}
          splitter={dateSplitter}
          value={new Date('2021.02.03 09:08:07')} />
      </span>
      <span class="grid-span-2">
        <TextDisplay
          mask={dateFormatMonth3}
          splitter={dateSplitter}
          value={new Date('2021.02.03 09:08:07')} />
      </span>
      <span class="grid-span-2">
        <TextDisplay
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
        <TextDisplay
          mask={dateFormatMonth5}
          splitter={dateSplitter}
          value={new Date('2021.02.03 09:08:07')} />
      </span>
      <span class="grid-span-2">
        <TextDisplay
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
        <TextDisplay
          mask={dateFormatDay1}
          splitter={dateSplitter}
          value={new Date('2021.02.03 09:08:07')} />
      </span>
      <span class="grid-span-2">
        <TextDisplay
          mask={dateFormatDay2}
          splitter={dateSplitter}
          value={new Date('2021.02.03 09:08:07')} />
      </span>
      <span class="grid-span-2">
        <TextDisplay
          mask={dateFormatDay3}
          splitter={dateSplitter}
          value={new Date('2021.02.03 09:08:07')} />
      </span>
      <span class="grid-span-2">
        <TextDisplay
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
        <TextDisplay
          mask={dateFormatDay5}
          splitter={dateSplitter}
          value={new Date('2021.02.03 09:08:07')} />
      </span>
      <span class="grid-span-2">
        <TextDisplay
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
        <TextDisplay
          mask={dateFormatDay7}
          splitter={dateSplitter}
          value={new Date(Date.now() - 86400000 * 2)} />
      </span>
      <span class="grid-span-2 i18n">
        <TextDisplay
          mask={dateFormatDay7}
          splitter={dateSplitter}
          value={new Date(Date.now() - 86400000)} />
      </span>
      <span class="grid-span-2 i18n">
        <TextDisplay
          mask={dateFormatDay7}
          splitter={dateSplitter}
          value={new Date(Date.now())} />
      </span>
      <span class="grid-span-2 i18n">
        <TextDisplay
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
        <TextDisplay
          mask={dateFormatDay8}
          splitter={dateSplitter}
          value={new Date(Date.now() - 86400000 * 2)} />
      </span>
      <span class="grid-span-2 i18n">
        <TextDisplay
          mask={dateFormatDay8}
          splitter={dateSplitter}
          value={new Date(Date.now() - 86400000)} />
      </span>
      <span class="grid-span-2 i18n">
        <TextDisplay
          mask={dateFormatDay8}
          splitter={dateSplitter}
          value={new Date(Date.now())} />
      </span>
      <span class="grid-span-2 i18n">
        <TextDisplay
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
        <TextDisplay
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
        <TextDisplay
          mask={dateFormatWeekNumber1}
          splitter={dateSplitter}
          value={new Date('202021.02.03 09:08:07')} />
      </span>
      <span class="grid-span-2">
        <TextDisplay
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
        <TextDisplay
          mask={dateFormatHour1}
          splitter={dateSplitter}
          value={new Date('2021.02.03 19:08:07')} />
      </span>
      <span class="grid-span-2">
        <TextDisplay
          mask={dateFormatHour2}
          splitter={dateSplitter}
          value={new Date('2021.02.03 19:08:07')} />
      </span>
      <span class="grid-span-2">
        <TextDisplay
          mask={dateFormatHour3}
          splitter={dateSplitter}
          value={new Date('2021.02.03 09:08:07')} />
      </span>
      <span class="grid-span-2">
        <TextDisplay
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
        <TextDisplay
          mask={dateFormatDayPeriod1}
          splitter={dateSplitter}
          value={new Date('2021.02.03 09:08:07')} />
      </span>
      <span class="grid-span-2">
        <TextDisplay
          mask={dateFormatDayPeriod2}
          splitter={dateSplitter}
          value={new Date('2021.02.03 09:08:07')} />
      </span>
      <span class="grid-span-2">
        <TextDisplay
          mask={dateFormatDayPeriod3}
          splitter={dateSplitter}
          value={new Date('2021.02.03 09:08:07')} />
      </span>
      <span class="grid-span-2">
        <TextDisplay
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
        <TextDisplay
          mask={dateFormatMinute1}
          splitter={dateSplitter}
          value={new Date('2021.02.03 09:08:07')} />
      </span>
      <span class="grid-span-2">
        <TextDisplay
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
        <TextDisplay
          mask={dateFormatSecond1}
          splitter={dateSplitter}
          value={new Date('2021.02.03 09:08:07')} />
      </span>
      <span class="grid-span-2">
        <TextDisplay
          mask={dateFormatSecond2}
          splitter={dateSplitter}
          value={new Date('2021.02.03 09:08:07')} />
      </span>
      <span class="grid-span-2">
        <TextDisplay
          mask={dateFormatSecond3}
          splitter={dateSplitter}
          value={new Date('2021.02.03 09:08:07.456')} />
      </span>
      <span class="grid-span-2">
        <TextDisplay
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
        <TextDisplay
          mask={dateFormatMinuteSecond1}
          splitter={dateSplitter}
          value={new Date('2021.02.03 09:08:07')} />
      </span>
      <span class="grid-span-2">
        <TextDisplay
          mask={dateFormatMinuteSecond2}
          splitter={dateSplitter}
          value={new Date('2021.02.03 09:08:07')} />
      </span>
      <span class="grid-span-2">
        <TextDisplay
          mask={dateFormatMinuteSecond3}
          splitter={dateSplitter}
          value={new Date('2021.02.03 09:08:07.456')} />
      </span>
      <span class="grid-span-2">
        <TextDisplay
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
        <TextDisplay
          mask={dateFormatTimeZone1}
          splitter={dateSplitter}
          value={new Date('2021.02.03 09:08:07')} />
      </span>
      <span class="grid-span-2">
        <TextDisplay
          mask={dateFormatTimeZone2}
          splitter={dateSplitter}
          value={new Date('2021.02.03 09:08:07')} />
      </span>
      <span class="grid-span-2">
        <TextDisplay
          mask={dateFormatTimeZone3}
          splitter={dateSplitter}
          value={new Date('2021.02.03 09:08:07.456')} />
      </span>
      <span class="grid-span-2">
        <TextDisplay
          mask={dateFormatTimeZone4}
          splitter={dateSplitter}
          value={new Date('2021.02.03 09:08:07.456')} />
      </span>
      <span class="grid-span-2">
        <TextDisplay
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
        <TextDisplay
          mask={dateFormatTimeZone6}
          splitter={dateSplitter}
          value={new Date('2021.02.03 09:08:07')} />
      </span>
      <span class="grid-span-2">
        <TextDisplay
          mask={dateFormatTimeZone7}
          splitter={dateSplitter}
          value={new Date('2021.02.03 09:08:07')} />
      </span>
      <span class="grid-span-2">
        <TextDisplay
          mask={dateFormatTimeZone8}
          splitter={dateSplitter}
          value={new Date('2021.02.03 09:08:07')} />
      </span>
      <span class="grid-span-2">
        <TextDisplay
          mask={dateFormatTimeZone9}
          splitter={dateSplitter}
          value={new Date('2021.02.03 09:08:07')} />
      </span>
      <span class="grid-span-2">
        <TextDisplay
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
        <TextDisplay
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
        <TextDisplay
          mask={dateFormatInterval2}
          splitter={dateSplitter}
          value={pastDate} />
      </span>
      <span class="grid-span-2 i18n">
        <TextDisplay
          mask={dateFormatInterval3}
          splitter={dateSplitter}
          value={pastDate} />
      </span>
      <span class="grid-span-2 i18n">
        <TextDisplay
          mask={dateFormatInterval4}
          splitter={dateSplitter}
          value={pastDate} />
      </span>
      <span class="grid-span-2 i18n">
        <TextDisplay
          mask={dateFormatInterval5}
          splitter={dateSplitter}
          value={pastDate} />
      </span>
    </GridLine>
    <GridLine>
      <span class="grid-start-5 grid-span-2">
        <TextDisplay
          mask={dateFormatInterval6}
          splitter={dateSplitter}
          value={pastDate} />
      </span>
      <span class="grid-span-2 i18n">
        <TextDisplay
          mask={dateFormatInterval7}
          splitter={dateSplitter}
          value={pastDate} />
      </span>
      <span class="grid-span-2 i18n">
        <TextDisplay
          mask={dateFormatInterval8}
          splitter={dateSplitter}
          value={pastDate} />
      </span>
      <span class="grid-span-2 i18n">
        <TextDisplay
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
        <TextDisplay
          mask={dateFormatInterval2}
          splitter={dateSplitter}
          value={futureDate} />
      </span>
      <span class="grid-span-2 i18n">
        <TextDisplay
          mask={dateFormatInterval3}
          splitter={dateSplitter}
          value={futureDate} />
      </span>
      <span class="grid-span-2 i18n">
        <TextDisplay
          mask={dateFormatInterval4}
          splitter={dateSplitter}
          value={futureDate} />
      </span>
      <span class="grid-span-2 i18n">
        <TextDisplay
          mask={dateFormatInterval5}
          splitter={dateSplitter}
          value={futureDate} />
      </span>
    </GridLine>
    <GridLine>
      <span class="grid-start-5 grid-span-2">
        <TextDisplay
          mask={dateFormatInterval6}
          splitter={dateSplitter}
          value={futureDate} />
      </span>
      <span class="grid-span-2 i18n">
        <TextDisplay
          mask={dateFormatInterval7}
          splitter={dateSplitter}
          value={futureDate} />
      </span>
      <span class="grid-span-2 i18n">
        <TextDisplay
          mask={dateFormatInterval8}
          splitter={dateSplitter}
          value={futureDate} />
      </span>
      <span class="grid-span-2 i18n">
        <TextDisplay
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
        <TextDisplay
          mask={dateFormatInterval12}
          splitter={dateSplitter}
          value={pastDate} />
      </span>
      <span class="grid-span-2 i18n">
        <TextDisplay
          mask={dateFormatInterval13}
          splitter={dateSplitter}
          value={pastDate} />
      </span>
      <span class="grid-span-2 i18n">
        <TextDisplay
          mask={dateFormatInterval14}
          splitter={dateSplitter}
          value={pastDate} />
      </span>
      <span class="grid-span-2 i18n">
        <TextDisplay
          mask={dateFormatInterval15}
          splitter={dateSplitter}
          value={pastDate} />
      </span>
    </GridLine>
    <GridLine>
      <span class="grid-start-5 grid-span-2">
        <TextDisplay
          mask={dateFormatInterval16}
          splitter={dateSplitter}
          value={pastDate} />
      </span>
      <span class="grid-span-2 i18n">
        <TextDisplay
          mask={dateFormatInterval17}
          splitter={dateSplitter}
          value={pastDate} />
      </span>
      <span class="grid-span-2 i18n">
        <TextDisplay
          mask={dateFormatInterval18}
          splitter={dateSplitter}
          value={pastDate} />
      </span>
      <span class="grid-span-2 i18n">
        <TextDisplay
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
        <TextDisplay
          mask={dateFormatInterval12}
          splitter={dateSplitter}
          value={futureDate} />
      </span>
      <span class="grid-span-2 i18n">
        <TextDisplay
          mask={dateFormatInterval13}
          splitter={dateSplitter}
          value={futureDate} />
      </span>
      <span class="grid-span-2 i18n">
        <TextDisplay
          mask={dateFormatInterval14}
          splitter={dateSplitter}
          value={futureDate} />
      </span>
      <span class="grid-span-2 i18n">
        <TextDisplay
          mask={dateFormatInterval15}
          splitter={dateSplitter}
          value={futureDate} />
      </span>
    </GridLine>
    <GridLine>
      <span class="grid-start-5 grid-span-2">
        <TextDisplay
          mask={dateFormatInterval16}
          splitter={dateSplitter}
          value={futureDate} />
      </span>
      <span class="grid-span-2 i18n">
        <TextDisplay
          mask={dateFormatInterval17}
          splitter={dateSplitter}
          value={futureDate} />
      </span>
      <span class="grid-span-2 i18n">
        <TextDisplay
          mask={dateFormatInterval18}
          splitter={dateSplitter}
          value={futureDate} />
      </span>
      <span class="grid-span-2 i18n">
        <TextDisplay
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
        <TextDisplay
          mask={dateFormatInterval22}
          splitter={dateSplitter}
          value={pastDate} />
      </span>
      <span class="grid-span-2 i18n">
        <TextDisplay
          mask={dateFormatInterval23}
          splitter={dateSplitter}
          value={pastDate} />
      </span>
      <span class="grid-span-2 i18n">
        <TextDisplay
          mask={dateFormatInterval24}
          splitter={dateSplitter}
          value={pastDate} />
      </span>
      <span class="grid-span-2 i18n">
        <TextDisplay
          mask={dateFormatInterval25}
          splitter={dateSplitter}
          value={pastDate} />
      </span>
    </GridLine>
    <GridLine>
      <span class="grid-start-5 grid-span-2">
        <TextDisplay
          mask={dateFormatInterval26}
          splitter={dateSplitter}
          value={pastDate} />
      </span>
      <span class="grid-span-2 i18n">
        <TextDisplay
          mask={dateFormatInterval27}
          splitter={dateSplitter}
          value={pastDate} />
      </span>
      <span class="grid-span-2 i18n">
        <TextDisplay
          mask={dateFormatInterval28}
          splitter={dateSplitter}
          value={pastDate} />
      </span>
      <span class="grid-span-2 i18n">
        <TextDisplay
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
        <TextDisplay
          mask={dateFormatInterval22}
          splitter={dateSplitter}
          value={futureDate} />
      </span>
      <span class="grid-span-2 i18n">
        <TextDisplay
          mask={dateFormatInterval23}
          splitter={dateSplitter}
          value={futureDate} />
      </span>
      <span class="grid-span-2 i18n">
        <TextDisplay
          mask={dateFormatInterval24}
          splitter={dateSplitter}
          value={futureDate} />
      </span>
      <span class="grid-span-2 i18n">
        <TextDisplay
          mask={dateFormatInterval25}
          splitter={dateSplitter}
          value={futureDate} />
      </span>
    </GridLine>
    <GridLine>
      <span class="grid-start-5 grid-span-2">
        <TextDisplay
          mask={dateFormatInterval26}
          splitter={dateSplitter}
          value={futureDate} />
      </span>
      <span class="grid-span-2 i18n">
        <TextDisplay
          mask={dateFormatInterval27}
          splitter={dateSplitter}
          value={futureDate} />
      </span>
      <span class="grid-span-2 i18n">
        <TextDisplay
          mask={dateFormatInterval28}
          splitter={dateSplitter}
          value={futureDate} />
      </span>
      <span class="grid-span-2 i18n">
        <TextDisplay
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
        <TextDisplay
          mask={dateFormatInterval32}
          splitter={dateSplitter}
          value={pastDate} />
      </span>
      <span class="grid-span-2 i18n">
        <TextDisplay
          mask={dateFormatInterval33}
          splitter={dateSplitter}
          value={pastDate} />
      </span>
      <span class="grid-span-2 i18n">
        <TextDisplay
          mask={dateFormatInterval34}
          splitter={dateSplitter}
          value={pastDate} />
      </span>
      <span class="grid-span-2 i18n">
        <TextDisplay
          mask={dateFormatInterval35}
          splitter={dateSplitter}
          value={pastDate} />
      </span>
    </GridLine>
    <GridLine>
      <span class="grid-start-5 grid-span-2">
        <TextDisplay
          mask={dateFormatInterval36}
          splitter={dateSplitter}
          value={pastDate} />
      </span>
      <span class="grid-span-2 i18n">
        <TextDisplay
          mask={dateFormatInterval37}
          splitter={dateSplitter}
          value={pastDate} />
      </span>
      <span class="grid-span-2 i18n">
        <TextDisplay
          mask={dateFormatInterval38}
          splitter={dateSplitter}
          value={pastDate} />
      </span>
      <span class="grid-span-2 i18n">
        <TextDisplay
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
        <TextDisplay
          mask={dateFormatInterval32}
          splitter={dateSplitter}
          value={futureDate} />
      </span>
      <span class="grid-span-2 i18n">
        <TextDisplay
          mask={dateFormatInterval33}
          splitter={dateSplitter}
          value={futureDate} />
      </span>
      <span class="grid-span-2 i18n">
        <TextDisplay
          mask={dateFormatInterval34}
          splitter={dateSplitter}
          value={futureDate} />
      </span>
      <span class="grid-span-2 i18n">
        <TextDisplay
          mask={dateFormatInterval35}
          splitter={dateSplitter}
          value={futureDate} />
      </span>
    </GridLine>
    <GridLine>
      <span class="grid-start-5 grid-span-2">
        <TextDisplay
          mask={dateFormatInterval36}
          splitter={dateSplitter}
          value={futureDate} />
      </span>
      <span class="grid-span-2 i18n">
        <TextDisplay
          mask={dateFormatInterval37}
          splitter={dateSplitter}
          value={futureDate} />
      </span>
      <span class="grid-span-2 i18n">
        <TextDisplay
          mask={dateFormatInterval38}
          splitter={dateSplitter}
          value={futureDate} />
      </span>
      <span class="grid-span-2 i18n">
        <TextDisplay
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
        <TextDisplay
          mask={dateFormatInterval32}
          refreshInterval={1000}
          splitter={dateSplitter}
          value={refreshingDate} />
      </span>
      <span class="grid-span-2 i18n">
        <TextDisplay
          mask={dateFormatInterval33}
          refreshInterval={1000}
          splitter={dateSplitter}
          value={refreshingDate} />
      </span>
      <span class="grid-span-2 i18n">
        <TextDisplay
          mask={dateFormatInterval34}
          refreshInterval={1000}
          splitter={dateSplitter}
          value={refreshingDate} />
      </span>
      <span class="grid-span-2 i18n">
        <TextDisplay
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
        <TextDisplay
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
<script lang="ts">
  import {
    GridContainer,
    GridLine,
  } from '$lib/grid/index.js'

  import {
    dateSplitter,
    TEXT_DISPLAY_TYPE_DATE,
    TEXT_DISPLAY_TYPE_DATE_TIME,
    TEXT_DISPLAY_TYPE_TIME,
    TextDisplay,
  } from '$lib/text-display/index.js'

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

  let boundDate = $state(new Date('2021.02.03 09:08:07'))
  const dateFormat = new Intl.DateTimeFormat('sv')
  let dateEditor = $derived(dateFormat.format(boundDate))

  const onDateChange = (e: Event) => {
    const target = e.target as HTMLInputElement
    boundDate = new Date(target.value)
  }

</script>

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
    <span class="grid-span-8">Weekday as number</span>
    <span class="grid-span-2">
      <TextDisplay
        mask={dateFormatDay7}
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
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
    DateDisplay,
  } from '$lib/date-display/index.js'

  let language = $state(i18n.locale() ?? 'en_GB')

  const changeLanguage = (e: Event) => {
    const target = e.target as HTMLElement
    language = target.dataset.lang ?? 'en_GB'
  }

  $effect(() => {
    i18n.setLocale(language)
  })

  let boundDate = $state(new Date('2021.02.03 09:08:07'))
  const dateFormat = new Intl.DateTimeFormat('sv-SE')
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
  refreshingDate.setTime(refreshingDate.getTime() + 130000)
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
      <span class="grid-span-4">Date only (bound): </span>
      <span class="grid-span-4">
        <DateDisplay format="yyyy-mm-dd" bind:value={boundDate} />
      </span>
      <span>Change: </span>
      <input class="grid-span-3" value={dateEditor} onchange={onDateChange}  type="date"/>
    </GridLine>
  </GridContainer>
  <GridContainer class="demopage-grid">
    <GridLine>
      <span class="grid-span-4">ISO Date format (using `sv` locale): </span>
      <span class="grid-span-8">
        <DateDisplay value={new Date('2021.02.03 09:08:07')}/>
      </span>
    </GridLine>
  </GridContainer>
  <GridContainer class="demopage-grid">
    <GridLine>
      <span class="grid-span-4">US Date format: </span>
      <span class="grid-span-8">
        <DateDisplay locale="en-US" value={new Date('2021.02.03 09:08:07')}/>
      </span>
    </GridLine>
  </GridContainer>
  <GridContainer class="demopage-grid">
    <GridLine>
      <span class="grid-span-4">Definition using custom mask</span>
      <span class="grid-span-8">
        <DateDisplay
          format="'year: 'yyyy. 'month: 'mm. 'day: 'dd. 'and hour: 'HH 'minute: 'MM 'plus second: 'ss"
          value={new Date('2021.02.03 09:08:07')} />
      </span>
    </GridLine>
  </GridContainer>
  <GridContainer class="demopage-grid">
    <GridLine>
      <span class="grid-span-4">Definition using custom mask (numeric format)</span>
      <span class="grid-span-8">
        <DateDisplay
          format="'year: 'yy. 'month: 'm. 'day: 'd. 'and hour: 'H 'minute: 'M 'plus second: 's"
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
        <DateDisplay format="'yy:' yy" value={new Date('2021.02.03 09:08:07')} />
      </span>
      <span class="grid-span-2">
        <DateDisplay format="'yyyy:' yyyy" value={new Date('2021.02.03 09:08:07')} />
      </span>
    </GridLine>
  </GridContainer>
  <GridContainer class="demopage-grid">
    <GridLine>
      <span class="grid-span-6">Era formats</span>
      <span class="grid-span-2">
        <DateDisplay format="'e:' e" locale="en-US" value={new Date('2021.02.03 09:08:07')} />
      </span>
      <span class="grid-span-2">
        <DateDisplay format="'ee:' ee" locale="en-US" value={new Date('2021.02.03 09:08:07')} />
      </span>
      <span class="grid-span-2">
        <DateDisplay format="'eee:' eee" locale="en-US" value={new Date('2021.02.03 09:08:07')} />
      </span>
    </GridLine>
  </GridContainer>
  <GridContainer class="demopage-grid">
    <GridLine>
      <span class="grid-span-4">Month formats</span>
      <span class="grid-span-2">
        <DateDisplay format="'m: 'm" value={new Date('2021.02.03 09:08:07')} />
      </span>
      <span class="grid-span-2">
        <DateDisplay format="'mm: 'mm" value={new Date('2021.02.03 09:08:07')} />
      </span>
      <span class="grid-span-2">
        <DateDisplay format="'mmm: 'mmm" locale="en-US" value={new Date('2021.02.03 09:08:07')} />
      </span>
      <span class="grid-span-2">
        <DateDisplay format="'mmmm: 'mmmm" locale="en-US" value={new Date('2021.02.03 09:08:07')} />
      </span>
    </GridLine>
  </GridContainer>
  <GridContainer class="demopage-grid">
    <GridLine>
      <span class="grid-span-8">Month formats with default locale (Swedish)</span>
      <span class="grid-span-2">
        <DateDisplay format="'mmm: 'mmm" value={new Date('2021.02.03 09:08:07')} />
      </span>
      <span class="grid-span-2">
        <DateDisplay format="'mmmm: 'mmmm" value={new Date('2021.02.03 09:08:07')} />
      </span>
    </GridLine>
  </GridContainer>
  <GridContainer class="demopage-grid">
    <GridLine>
      <span class="grid-span-4">Day formats</span>
      <span class="grid-span-2">
        <DateDisplay format="'d: 'd" value={new Date('2021.02.03 09:08:07')} />
      </span>
      <span class="grid-span-2">
        <DateDisplay format="'dd: 'dd" value={new Date('2021.02.03 09:08:07')} />
      </span>
      <span class="grid-span-2">
        <DateDisplay format="'ddd: 'ddd" locale="en-US" value={new Date('2021.02.03 09:08:07')} />
      </span>
      <span class="grid-span-2">
        <DateDisplay format="'dddd: 'dddd" locale="en-US" value={new Date('2021.02.03 09:08:07')} />
      </span>
    </GridLine>
  </GridContainer>
  <GridContainer class="demopage-grid">
    <GridLine>
      <span class="grid-span-8">Day formats with default locale (Swedish)</span>
      <span class="grid-span-2">
        <DateDisplay format="'ddd: 'ddd" value={new Date('2021.02.03 09:08:07')} />
      </span>
      <span class="grid-span-2">
        <DateDisplay format="'dddd: 'dddd" value={new Date('2021.02.03 09:08:07')} />
      </span>
    </GridLine>
  </GridContainer>
  <GridContainer class="demopage-grid">
    <GridLine>
      <span class="grid-span-4">Day name with optional delta - short</span>
      <span class="grid-span-2">
        <DateDisplay format="'DDD: 'DDD" locale="en-US" value={new Date(Date.now() - 86400000 * 2)} />
      </span>
      {#key language}
        <span class="grid-span-2 i18n">
          <DateDisplay format="'DDD: 'DDD" locale="en-US" value={new Date(Date.now() - 86400000)} />
        </span>
        <span class="grid-span-2 i18n">
          <DateDisplay format="'DDD: 'DDD" locale="en-US" value={new Date(Date.now())} />
        </span>
        <span class="grid-span-2 i18n">
          <DateDisplay format="'DDD: 'DDD" locale="en-US" value={new Date(Date.now() + 86400000)} />
        </span>
      {/key}
    </GridLine>
  </GridContainer>
  <GridContainer class="demopage-grid">
    <GridLine>
      <span class="grid-span-4">Day name with optional delta - long</span>
      <span class="grid-span-2">
        <DateDisplay format="'DDDD: 'DDDD" locale="en-US" value={new Date(Date.now() - 86400000 * 2)} />
      </span>
      {#key language}
        <span class="grid-span-2 i18n">
          <DateDisplay format="'DDDD: 'DDDD" locale="en-US" value={new Date(Date.now() - 86400000)} />
        </span>
        <span class="grid-span-2 i18n">
          <DateDisplay format="'DDDD: 'DDDD" locale="en-US" value={new Date(Date.now())} />
        </span>
        <span class="grid-span-2 i18n">
          <DateDisplay format="'DDDD: 'DDDD" locale="en-US" value={new Date(Date.now() + 86400000)} />
        </span>
      {/key}
    </GridLine>
  </GridContainer>
  <GridContainer class="demopage-grid">
    <GridLine>
      <span class="grid-span-8">Weekday as number</span>
      <span class="grid-span-2">
        <DateDisplay format="'N: 'N" value={new Date('202021.02.03 09:08:07')} />
      </span>
    </GridLine>
  </GridContainer>
  <GridContainer class="demopage-grid">
    <GridLine>
      <span class="grid-span-8">Week number</span>
      <span class="grid-span-2">
        <DateDisplay format="'W: 'W" value={new Date('202021.02.03 09:08:07')} />
      </span>
      <span class="grid-span-2">
        <DateDisplay format="'WW: 'WW" value={new Date('202021.02.03 09:08:07')} />
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
        <DateDisplay format="'h TT: 'h TT" locale="en-us" value={new Date('2021.02.03 19:08:07')} />
      </span>
      <span class="grid-span-2">
        <DateDisplay format="'hh TT: 'hh TT" locale="en-us" value={new Date('2021.02.03 19:08:07')} />
      </span>
      <span class="grid-span-2">
        <DateDisplay format="'H: 'H" value={new Date('2021.02.03 09:08:07')} />
      </span>
      <span class="grid-span-2">
        <DateDisplay format="'HH: 'HH" value={new Date('2021.02.03 09:08:07')} />
      </span>
    </GridLine>
  </GridContainer>
  <GridContainer class="demopage-grid">
    <GridLine>
      <span class="grid-span-4">Day period formats</span>
      <span class="grid-span-2">
        <DateDisplay format="'ht: 'ht" locale="en-US" value={new Date('2021.02.03 09:08:07')} />
      </span>
      <span class="grid-span-2">
        <DateDisplay format="'h tt: 'h tt" locale="en-US" value={new Date('2021.02.03 09:08:07')} />
      </span>
      <span class="grid-span-2">
        <DateDisplay format="'h T: 'h T" locale="en-US" value={new Date('2021.02.03 09:08:07')} />
      </span>
      <span class="grid-span-2">
        <DateDisplay format="'h TT: 'h TT" locale="en-US" value={new Date('2021.02.03 09:08:07')} />
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
        <DateDisplay format="'M: 'M" value={new Date('2021.02.03 09:08:07')} />
      </span>
      <span class="grid-span-2">
        <DateDisplay format="'MM: 'MM" value={new Date('2021.02.03 09:08:07')} />
      </span>
    </GridLine>
  </GridContainer>
  <GridContainer class="demopage-grid">
    <GridLine>
      <span class="grid-span-4">Second formats</span>
      <span class="grid-span-2">
        <DateDisplay format="'s: 's" value={new Date('2021.02.03 09:08:07')} />
      </span>
      <span class="grid-span-2">
        <DateDisplay format="'ss: 'ss" value={new Date('2021.02.03 09:08:07')} />
      </span>
      <span class="grid-span-2">
        <DateDisplay format="'s.l: 's.l" value={new Date('2021.02.03 09:08:07.456')} />
      </span>
      <span class="grid-span-2">
        <DateDisplay format="'s.L: 's.L" value={new Date('2021.02.03 09:08:07.456')} />
      </span>
    </GridLine>
  </GridContainer>
  <GridContainer class="demopage-grid">
    <GridLine>
      <span class="grid-span-4">Minute + Second formats</span>
      <span class="grid-span-2">
        <DateDisplay format="'M:s: 'M:s" value={new Date('2021.02.03 09:08:07')} />
      </span>
      <span class="grid-span-2">
        <DateDisplay format="'M:ss: 'M:ss" value={new Date('2021.02.03 09:08:07')} />
      </span>
      <span class="grid-span-2">
        <DateDisplay format="'MM:s: 'MM:s" value={new Date('2021.02.03 09:08:07')} />
      </span>
      <span class="grid-span-2">
        <DateDisplay format="'MM:ss: 'MM:ss" value={new Date('2021.02.03 09:08:07')} />
      </span>
    </GridLine>
  </GridContainer>
  <GridContainer class="demopage-grid">
    <GridLine>
      <span class="grid-span-2">TZ formats</span>
      <span class="grid-span-2">
        <DateDisplay format="'o: 'o" timeZone="Europe/Berlin" value={new Date('2021.02.03 09:08:07')} />
      </span>
      <span class="grid-span-2">
        <DateDisplay format="'p: 'p" timeZone="Europe/Berlin" value={new Date('2021.02.03 09:08:07')} />
      </span>
      <span class="grid-span-2">
        <DateDisplay format="'Z (locale sv): 'Z" timeZone="Europe/Berlin" value={new Date('2021.02.03 09:08:07')} />
      </span>
      <span class="grid-span-2">
        <DateDisplay format="'Z (locale en-US): 'Z" 
          locale="en-US"
          timeZone="Europe/Berlin"
          value={new Date('2021.02.03 09:08:07')} />
      </span>
      <span class="grid-span-2">
        <DateDisplay format="'ZZ: 'ZZ" 
          locale="en-US"
          timeZone="Europe/Berlin"
          value={new Date('2021.02.03 09:08:07')} />
      </span>
    </GridLine>
  </GridContainer>
  <GridContainer class="demopage-grid">
    <GridLine>
      <span class="grid-span-2">TZ formats (PST base)</span>
      <span class="grid-span-2">
        <DateDisplay format="'o: 'o" timeZone="America/Los_Angeles" value={new Date('2021.02.03 09:08:07')} />
      </span>
      <span class="grid-span-2">
        <DateDisplay format="'p: 'p" timeZone="America/Los_Angeles" value={new Date('2021.02.03 09:08:07')} />
      </span>
      <span class="grid-span-2">
        <DateDisplay format="'Z (locale sv): 'Z" timeZone="America/Los_Angeles" value={new Date('2021.02.03 09:08:07')} />
      </span>
      <span class="grid-span-2">
        <DateDisplay format="'Z (locale en-US): 'Z" 
          locale="en-US"
          timeZone="America/Los_Angeles"
          value={new Date('2021.02.03 09:08:07')} />
      </span>
      <span class="grid-span-2">
        <DateDisplay format="'ZZ: 'ZZ" 
          locale="en-US"
          timeZone="America/Los_Angeles"
          value={new Date('2021.02.03 09:08:07')} />
      </span>
    </GridLine>
  </GridContainer>
</Accordion>
<Accordion>
  {#snippet title()}
    Detailed interval formats
  {/snippet}
  {#key language}
    <GridContainer class="demopage-grid">
      <GridLine>
        <span class="grid-span-6">Interval returning the best fit unit but not adding it</span>
        <span class="grid-span-2">
          <DateDisplay format="'i: 'i" value={pastDate} />
        </span>
      </GridLine>
    </GridContainer>
    <GridContainer class="demopage-grid">
      <GridLine>
        <span class="grid-span-2">Interval to past date short</span>
        <span class="grid-span-2 i18n">
          <DateDisplay format="'ii: 'ii" value={pastDate} />
        </span>
          <span class="grid-span-2 i18n">
            <DateDisplay format="'iis: 'iis" value={pastDate} />
          </span>
          <span class="grid-span-2 i18n">
            <DateDisplay format="'iiM: 'iiM"value={pastDate} />
          </span>
          <span class="grid-span-2 i18n">
            <DateDisplay format="'iiH: 'iiH" value={pastDate} />
          </span>
          <span class="grid-span-2 i18n">
            <DateDisplay format="'iih: 'iih" value={pastDate} />
          </span>
      </GridLine>
      <GridLine>
        <span class="grid-start-3 grid-span-2 i18n">
          <DateDisplay format="'iid: 'iid" value={pastDate} />
        </span>
        <span class="grid-span-2 i18n">
          <DateDisplay format="'iiW: 'iiW" value={pastDate} />
        </span>
        <span class="grid-span-2 i18n">
          <DateDisplay format="'iim: 'iim" value={pastDate} />
        </span>
        <span class="grid-span-2 i18n">
          <DateDisplay format="'iiy: 'iiy"value={pastDate} />
        </span>
      </GridLine>
    </GridContainer>
    <GridContainer class="demopage-grid">
      <GridLine>
        <span class="grid-span-2">Interval to future date short</span>
        <span class="grid-span-2 i18n">
          <DateDisplay format="'ii: 'ii" value={futureDate} />
        </span>
        <span class="grid-span-2 i18n">
          <DateDisplay format="'iis: 'iis" value={futureDate} />
        </span>
        <span class="grid-span-2 i18n">
          <DateDisplay format="'iiM: 'iiM"value={futureDate} />
        </span>
        <span class="grid-span-2 i18n">
          <DateDisplay format="'iiH: 'iiH" value={futureDate} />
        </span>
        <span class="grid-span-2 i18n">
          <DateDisplay format="'iih: 'iih" value={futureDate} />
        </span>
      </GridLine>
      <GridLine>
        <span class="grid-start-3 grid-span-2 i18n">
          <DateDisplay format="'iid: 'iid" value={futureDate} />
        </span>
        <span class="grid-span-2 i18n">
          <DateDisplay format="'iiW: 'iiW" value={futureDate} />
        </span>
        <span class="grid-span-2 i18n">
          <DateDisplay format="'iim: 'iim" value={futureDate} />
        </span>
        <span class="grid-span-2 i18n">
          <DateDisplay format="'iiy: 'iiy"value={futureDate} />
        </span>
      </GridLine>
    </GridContainer>
    <GridContainer class="demopage-grid">
      <GridLine>
        <span class="grid-span-2">Interval to past date long</span>
        <span class="grid-span-2 i18n">
          <DateDisplay format="'iii: 'iii" value={pastDate} />
        </span>
        <span class="grid-span-2 i18n">
          <DateDisplay format="'iiis: 'iiis" value={pastDate} />
        </span>
        <span class="grid-span-2 i18n">
          <DateDisplay format="'iiiM: 'iiiM"value={pastDate} />
        </span>
        <span class="grid-span-2 i18n">
          <DateDisplay format="'iiiH: 'iiiH" value={pastDate} />
        </span>
        <span class="grid-span-2 i18n">
          <DateDisplay format="'iiih: 'iiih" value={pastDate} />
        </span>
      </GridLine>
      <GridLine>
        <span class="grid-start-3 grid-span-2 i18n">
          <DateDisplay format="'iiid: 'iiid" value={pastDate} />
        </span>
        <span class="grid-span-2 i18n">
          <DateDisplay format="'iiiW: 'iiiW" value={pastDate} />
        </span>
        <span class="grid-span-2 i18n">
          <DateDisplay format="'iiim: 'iiim" value={pastDate} />
        </span>
        <span class="grid-span-2 i18n">
          <DateDisplay format="'iiiy: 'iiiy"value={pastDate} />
        </span>
      </GridLine>
    </GridContainer>
    <GridContainer class="demopage-grid">
      <GridLine>
        <span class="grid-span-2">Interval to future date long</span>
        <span class="grid-span-2 i18n">
          <DateDisplay format="'iii: 'iii" value={futureDate} />
        </span>
        <span class="grid-span-2 i18n">
          <DateDisplay format="'iiis: 'iiis" value={futureDate} />
        </span>
        <span class="grid-span-2 i18n">
          <DateDisplay format="'iiiM: 'iiiM"value={futureDate} />
        </span>
        <span class="grid-span-2 i18n">
          <DateDisplay format="'iiiH: 'iiiH" value={futureDate} />
        </span>
        <span class="grid-span-2 i18n">
          <DateDisplay format="'iiih: 'iiih" value={futureDate} />
        </span>
      </GridLine>
      <GridLine>
        <span class="grid-start-3 grid-span-2 i18n">
          <DateDisplay format="'iiid: 'iiid" value={futureDate} />
        </span>
        <span class="grid-span-2 i18n">
          <DateDisplay format="'iiiW: 'iiiW" value={futureDate} />
        </span>
        <span class="grid-span-2 i18n">
          <DateDisplay format="'iiim: 'iiim" value={futureDate} />
        </span>
        <span class="grid-span-2 i18n">
          <DateDisplay format="'iiiy: 'iiiy"value={futureDate} />
        </span>
      </GridLine>
    </GridContainer>
    <GridContainer class="demopage-grid">
      <GridLine>
        <span class="grid-span-2">Interval to past date short with prefix/suffix</span>
        <span class="grid-span-2 i18n">
          <DateDisplay format="'II: 'II" value={pastDate} />
        </span>
        <span class="grid-span-2 i18n">
          <DateDisplay format="'IIs: 'IIs" value={pastDate} />
        </span>
        <span class="grid-span-2 i18n">
          <DateDisplay format="'IIM: 'IIM"value={pastDate} />
        </span>
        <span class="grid-span-2 i18n">
          <DateDisplay format="'IIH: 'IIH" value={pastDate} />
        </span>
        <span class="grid-span-2 i18n">
          <DateDisplay format="'IIh: 'IIh" value={pastDate} />
        </span>
      </GridLine>
      <GridLine>
        <span class="grid-start-3 grid-span-2 i18n">
          <DateDisplay format="'IId: 'IId" value={pastDate} />
        </span>
        <span class="grid-span-2 i18n">
          <DateDisplay format="'IIW: 'IIW" value={pastDate} />
        </span>
        <span class="grid-span-2 i18n">
          <DateDisplay format="'IIm: 'IIm" value={pastDate} />
        </span>
        <span class="grid-span-2 i18n">
          <DateDisplay format="'IIy: 'IIy"value={pastDate} />
        </span>
      </GridLine>
    </GridContainer>
    <GridContainer class="demopage-grid">
      <GridLine>
        <span class="grid-span-2">Interval to future date short with prefix/suffix</span>
        <span class="grid-span-2 i18n">
          <DateDisplay format="'II: 'II" value={futureDate} />
        </span>
        <span class="grid-span-2 i18n">
          <DateDisplay format="'IIs: 'IIs" value={futureDate} />
        </span>
        <span class="grid-span-2 i18n">
          <DateDisplay format="'IIM: 'IIM"value={futureDate} />
        </span>
        <span class="grid-span-2 i18n">
          <DateDisplay format="'IIH: 'IIH" value={futureDate} />
        </span>
        <span class="grid-span-2 i18n">
          <DateDisplay format="'IIh: 'IIh" value={futureDate} />
        </span>
      </GridLine>
      <GridLine>
        <span class="grid-start-3 grid-span-2 i18n">
          <DateDisplay format="'IId: 'IId" value={futureDate} />
        </span>
        <span class="grid-span-2 i18n">
          <DateDisplay format="'IIW: 'IIW" value={futureDate} />
        </span>
        <span class="grid-span-2 i18n">
          <DateDisplay format="'IIm: 'IIm" value={futureDate} />
        </span>
        <span class="grid-span-2 i18n">
          <DateDisplay format="'IIy: 'IIy"value={futureDate} />
        </span>
      </GridLine>
    </GridContainer>
    <GridContainer class="demopage-grid">
      <GridLine>
        <span class="grid-span-2">Interval to past date long with prefix/suffix</span>
        <span class="grid-span-2 i18n">
          <DateDisplay format="'III: 'III" value={pastDate} />
        </span>
        <span class="grid-span-2 i18n">
          <DateDisplay format="'IIIs: 'IIIs" value={pastDate} />
        </span>
        <span class="grid-span-2 i18n">
          <DateDisplay format="'IIIM: 'IIIM"value={pastDate} />
        </span>
        <span class="grid-span-2 i18n">
          <DateDisplay format="'IIIH: 'IIIH" value={pastDate} />
        </span>
        <span class="grid-span-2 i18n">
          <DateDisplay format="'IIIh: 'IIIh" value={pastDate} />
        </span>
      </GridLine>
      <GridLine>
        <span class="grid-start-3 grid-span-2 i18n">
          <DateDisplay format="'IIId: 'IIId" value={pastDate} />
        </span>
        <span class="grid-span-2 i18n">
          <DateDisplay format="'IIIW: 'IIIW" value={pastDate} />
        </span>
        <span class="grid-span-2 i18n">
          <DateDisplay format="'IIIm: 'IIIm" value={pastDate} />
        </span>
        <span class="grid-span-2 i18n">
          <DateDisplay format="'IIIy: 'IIIy"value={pastDate} />
        </span>
      </GridLine>
    </GridContainer>
    <GridContainer class="demopage-grid">
      <GridLine>
        <span class="grid-span-2">Interval to future date long with prefix/suffix</span>
        <span class="grid-span-2 i18n">
          <DateDisplay format="'III: 'III" value={futureDate} />
        </span>
        <span class="grid-span-2 i18n">
          <DateDisplay format="'IIIs: 'IIIs" value={futureDate} />
        </span>
        <span class="grid-span-2 i18n">
          <DateDisplay format="'IIIM: 'IIIM"value={futureDate} />
        </span>
        <span class="grid-span-2 i18n">
          <DateDisplay format="'IIIH: 'IIIH" value={futureDate} />
        </span>
        <span class="grid-span-2 i18n">
          <DateDisplay format="'IIIh: 'IIIh" value={futureDate} />
        </span>
      </GridLine>
      <GridLine>
        <span class="grid-start-3 grid-span-2 i18n">
          <DateDisplay format="'IIId: 'IIId" value={futureDate} />
        </span>
        <span class="grid-span-2 i18n">
          <DateDisplay format="'IIIW: 'IIIW" value={futureDate} />
        </span>
        <span class="grid-span-2 i18n">
          <DateDisplay format="'IIIm: 'IIIm" value={futureDate} />
        </span>
        <span class="grid-span-2 i18n">
          <DateDisplay format="'IIIy: 'IIIy"value={futureDate} />
        </span>
      </GridLine>
    </GridContainer>
    <GridContainer class="demopage-grid">
      <GridLine>
        <span class="grid-span-4">Interval with refreshInterval at every second</span>
        <span class="grid-span-2 i18n">
          <DateDisplay format="'III: 'III"refreshInterval={1000}
            value={refreshingDate} />
        </span>
        <span class="grid-span-2 i18n">
          <DateDisplay format="'IIIs: 'IIIs"
            refreshInterval={1000}
            value={refreshingDate} />
        </span>
        <span class="grid-span-2 i18n">
          <DateDisplay format="'IIIM: 'IIIM"
            refreshInterval={1000}
            value={refreshingDate} />
        </span>
        <span class="grid-span-2 i18n">
          <DateDisplay format="'IIIH: 'IIIH"
            refreshInterval={1000}
            value={refreshingDate} />
        </span>
      </GridLine>
    </GridContainer>
  {/key}
</Accordion>
<Accordion>
  {#snippet title()}
    Two date in one line with different formats
  {/snippet}
  <GridContainer class="demopage-grid">
    <GridLine>
      <span class="grid-span-6">Interval returning the best fit unit but not adding it</span>
      <span class="grid-span-4">
        <DateDisplay format={"'from: '$(m/d/yy H:M:s)' to: '$(yyyy-mm-dd  HH:MM:ss)' (This part is not to be converted: yyyy-mm-dd  HH:MM:ss )'"}
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
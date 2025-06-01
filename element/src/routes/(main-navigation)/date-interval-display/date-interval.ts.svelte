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
    DateIntervalDisplay,
  } from '$lib/date-interval-display/index.js'

  let language = $state(i18n.locale() ?? 'en_GB')

  const changeLanguage = (e: Event) => {
    const target = e.target as HTMLElement
    language = target.dataset.lang ?? 'en_GB'
  }

  $effect(() => {
    i18n.setLocale(language)
  })

  let date: Date = $state(new Date())
</script>
{#key language}
Change language <span class="i18n">(this only influences text loaded via i18n)</span> <Button label="EN" callback={changeLanguage} data={{lang: 'en_GB'}} class={(language === 'en_GB') ? 'selected' : ''}/>  <Button label="DE" callback={changeLanguage}  data={{lang: 'de_DE'}} class={(language === 'de_DE') ? 'selected' : ''}/>
{/key}
<GridContainer class="demopage-grid">
  <GridLine>
    <span class="grid-span-4">Date interval default settings: </span>
    <span class="grid-span-4">
      <DateIntervalDisplay value={date} />
    </span>
  </GridLine>
</GridContainer>

<style>
  span.i18n {
    background-color: rgba(var(--secondary-color-light), .25);
  }
</style>
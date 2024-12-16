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

  let dafaultDate = new Date('2020.02.28 10:11:12')
  let boundDate = $state(dafaultDate)
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
        value={new Date('2020.02.28 10:11:12')} />
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
        value={new Date('2020.02.28 10:11:12')} />
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
        value={new Date('2020.02.28 10:11:12')} />
    </span>
  </GridLine>
</GridContainer>

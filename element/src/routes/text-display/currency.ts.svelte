<script lang="ts">
  import {
    GridContainer,
    GridLine,
  } from '$lib/grid/index.js'

  import {
    NUMBER_STYLE_CURRENCY,
    TEXT_DISPLAY_TYPE_NUMBER,
    TextDisplay,
  } from '$lib/text-display/index.js'

  const currencyFormat1 = [
    'Format number as currency: ',
    {
      type: TEXT_DISPLAY_TYPE_NUMBER,
      options: {
        style: NUMBER_STYLE_CURRENCY,
        currency: 'EUR',
      }
    }
  ]

  let boundNumber = $state(1234)

</script>


<GridContainer class="demopage-grid">
  <GridLine>
    <span class="grid-span-12">
      <TextDisplay
        mask={currencyFormat1}
        value="1234" />
    </span>
  </GridLine>
</GridContainer>
<GridContainer class="demopage-grid">
  <GridLine>
    <span class="grid-span-8">
      <TextDisplay
        mask={[...currencyFormat1, ' (bound)']}
        bind:value={boundNumber} />
    </span>
    <span>Change: </span>
    <input class="grid-span-3" bind:value={boundNumber} type="number"/>
  </GridLine>
</GridContainer>
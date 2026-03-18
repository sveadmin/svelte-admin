<script lang="ts">
  import {
    GridContainer,
    GridLine,
  } from '$lib/grid/index.js'

  import {
    NUMBER_STYLE_CURRENCY,
    TEXT_DISPLAY_TYPE_NUMBER,
  } from '$lib/number/index.js'

  import {
    Literal,
  } from '$lib/literal/index.js'

  const currencyFormat1 = [
    'Format number as currency: ',
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

  let boundNumber = $state(1234)

</script>


<GridContainer class="demopage-grid">
  <GridLine>
    <span class="grid-span-12">
      <Literal
        mask={currencyFormat1}
        value="1234" />
    </span>
  </GridLine>
</GridContainer>
<GridContainer class="demopage-grid">
  <GridLine>
    <span class="grid-span-8">
      <Literal
        mask={[...currencyFormat1, ' (bound)']}
        bind:value={boundNumber} />
    </span>
    <span>Change: </span>
    <input class="grid-span-3" bind:value={boundNumber} type="number"/>
  </GridLine>
</GridContainer>
<script lang="ts">
  import {
    GridContainer,
    GridLine,
  } from '$lib/grid/index.js'

  import {
    NUMBER_STYLE_DECIMAL,
    NUMBER_STYLE_PERCENT,
    TEXT_DISPLAY_TYPE_NUMBER,
  } from '$lib/number/index.js'

  import {
    Literal,
  } from '$lib/literal/index.js'

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

</script>


<GridContainer class="demopage-grid">
  <GridLine>
    <span class="grid-span-6">Format number as decimal:</span>
    <span class="grid-span-6">
      <Literal mask={numberFormat1}
        value="12345.6789" />
    </span>
  </GridLine>
  <GridLine>
    <span class="grid-span-6">Format number as decimal (German rules):</span>
    <span class="grid-span-6">
      <Literal mask={numberFormat2}
        value="12345.6789" />
    </span>
  </GridLine>
  <GridLine>
    <span class="grid-span-6">Format number as decimal (French rules):</span>
    <span class="grid-span-6">
      <Literal mask={numberFormat3}
        value="12345.6789" />
    </span>
  </GridLine>
  <GridLine>
    <span class="grid-span-6">Decimal, no thousand groups:</span>
    <span class="grid-span-6">
      <Literal mask={numberFormat4}
        value="12345.6789" />
    </span>
  </GridLine>
  <GridLine>
    <span class="grid-span-6">Decimal, two fractional digits:</span>
    <span class="grid-span-6">
      <Literal mask={numberFormat5}
        value="12345.6789" />
    </span>
  </GridLine>
  <GridLine>
    <span class="grid-span-6">Decimal, four fractional digits:</span>
    <span class="grid-span-6">
      <Literal mask={numberFormat6}
        value="12345.6789" />
    </span>
  </GridLine>
  <GridLine>
    <span class="grid-span-6">Decimal, at least ten fractional digits:</span>
    <span class="grid-span-6">
      <Literal mask={numberFormat7}
        value="12345.6789" />
    </span>
  </GridLine>
</GridContainer>
<GridContainer class="demopage-grid">
  <GridLine>
    <span class="grid-span-6">Format number as percentage: </span>
    <span class="grid-span-6">
      <Literal mask={numberFormat10}
        value=".45678" />
    </span>
  </GridLine>
</GridContainer>
<script lang="ts">
  import {
    GridContainer,
    GridLine,
  } from '$lib/grid/index.js'

  import {
    NUMBER_STYLE_CURRENCY,
    NUMBER_STYLE_DECIMAL,
    NUMBER_STYLE_PERCENT,
    TEXT_DISPLAY_TYPE_NUMBER,
    TextDisplay,
  } from '$lib/text-display/index.js'

  const numberFormat1 = [
    {
      type: TEXT_DISPLAY_TYPE_NUMBER,
      options: {
        style: NUMBER_STYLE_DECIMAL,
      }
    }
  ]

  const numberFormat2 = [
    {
      locale: 'de-DE',
      options: {
        style: NUMBER_STYLE_DECIMAL,
      },
      type: TEXT_DISPLAY_TYPE_NUMBER,
    }
  ]

  const numberFormat3 = [
    {
      locale: 'fr-FR',
      options: {
        style: NUMBER_STYLE_DECIMAL,
      },
      type: TEXT_DISPLAY_TYPE_NUMBER,
    }
  ]

  const numberFormat4 = [
    {
      type: TEXT_DISPLAY_TYPE_NUMBER,
      options: {
        style: NUMBER_STYLE_DECIMAL,
        useGrouping: false,
      }
    }
  ]

  const numberFormat5 = [
    {
      type: TEXT_DISPLAY_TYPE_NUMBER,
      options: {
        style: NUMBER_STYLE_DECIMAL,
        maximumFractionDigits: 2,
      }
    }
  ]

  const numberFormat6 = [
    {
      type: TEXT_DISPLAY_TYPE_NUMBER,
      options: {
        style: NUMBER_STYLE_DECIMAL,
        maximumFractionDigits: 4,
      }
    }
  ]

  const numberFormat7 = [
    {
      type: TEXT_DISPLAY_TYPE_NUMBER,
      options: {
        style: NUMBER_STYLE_DECIMAL,
        maximumFractionDigits: 10,
        minimumFractionDigits: 10,
      }
    }
  ]

  const numberFormat10 = [
    {
      type: TEXT_DISPLAY_TYPE_NUMBER,
      options: {
        style: NUMBER_STYLE_PERCENT,
      }
    }
  ]

</script>


<GridContainer class="demopage-grid">
  <GridLine>
    <span class="grid-span-6">Format number as decimal:</span>
    <span class="grid-span-6">
      <TextDisplay class="grid-span-6"
        mask={numberFormat1}
        value="12345.6789" />
    </span>
  </GridLine>
  <GridLine>
    <span class="grid-span-6">Format number as decimal (German rules):</span>
    <span class="grid-span-6">
      <TextDisplay class="grid-span-6"
        mask={numberFormat2}
        value="12345.6789" />
    </span>
  </GridLine>
  <GridLine>
    <span class="grid-span-6">Format number as decimal (French rules):</span>
    <span class="grid-span-6">
      <TextDisplay class="grid-span-6"
        mask={numberFormat3}
        value="12345.6789" />
    </span>
  </GridLine>
  <GridLine>
    <span class="grid-span-6">Decimal, no thousand groups:</span>
    <span class="grid-span-6">
      <TextDisplay class="grid-span-6"
        mask={numberFormat4}
        value="12345.6789" />
    </span>
  </GridLine>
  <GridLine>
    <span class="grid-span-6">Decimal, two fractional digits:</span>
    <span class="grid-span-6">
      <TextDisplay class="grid-span-6"
        mask={numberFormat5}
        value="12345.6789" />
    </span>
  </GridLine>
  <GridLine>
    <span class="grid-span-6">Decimal, four fractional digits:</span>
    <span class="grid-span-6">
      <TextDisplay class="grid-span-6"
        mask={numberFormat6}
        value="12345.6789" />
    </span>
  </GridLine>
  <GridLine>
    <span class="grid-span-6">Decimal, at least ten fractional digits:</span>
    <span class="grid-span-6">
      <TextDisplay class="grid-span-6"
        mask={numberFormat7}
        value="12345.6789" />
    </span>
  </GridLine>
</GridContainer>
<GridContainer class="demopage-grid">
  <GridLine>
    <span class="grid-span-6">Format number as percentage: </span>
    <span class="grid-span-6">
      <TextDisplay class="grid-span-6"
        mask={numberFormat10}
        value=".45678" />
    </span>
  </GridLine>
</GridContainer>
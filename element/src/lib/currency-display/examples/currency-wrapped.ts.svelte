<script lang="ts">
  import {
    SIZE_EXTRA_LARGE,
    SIZE_LARGE,
  } from '$lib/types.js'

  import {
    GridContainer,
    GridLine,
  } from '$lib/grid/index.js'

  import {
    NUMBER_CURRENCY_DISPLAY_NAME,
  } from '$lib/number/index.js'

  import {
    CurrencyDisplayWrapped,
  } from '$lib/currency-display/index.js'
</script>

<GridContainer>
  <GridLine>
    <span class="grid-span-6">Default settings with wrapped number: </span>
    <CurrencyDisplayWrapped class="grid-span-4" currency="EUR" value="123456789.987654" />
  </GridLine>
  <GridLine>
    <span class="grid-span-6">More decimals: </span>
    <CurrencyDisplayWrapped class="grid-span-4"
      currency="EUR"
      fractionDigits={6}
      value="123456789.987654" />
    
  </GridLine>
  <GridLine>
    <span class="grid-span-6">Zero padded: </span>
    <CurrencyDisplayWrapped class="grid-span-4"
      currency="EUR"
      value="123456789.987654" 
      zeroPadded={12}/>
  </GridLine>
  <GridLine>
    <span class="grid-span-6">Full currency name: </span>
    <CurrencyDisplayWrapped class="grid-span-4"
      currency="EUR"
      currencyDisplay={NUMBER_CURRENCY_DISPLAY_NAME}
      value="123456789.987654" 
      zeroPadded={12}/>
  </GridLine>
  <GridLine>
    <span class="grid-span-6">Currencys aligneds around decimal separator : </span>
    <CurrencyDisplayWrapped containerClass="grid-span-4"
      currency="EUR"
      digitWidth=8
      fractionDigits={7}
      fractionWidth=4
      value="123456789.987654" />
  </GridLine>
  <GridLine>
    <CurrencyDisplayWrapped containerClass="grid-span-4 grid-start-7"
      currency="EUR"
      digitWidth=8
      fractionDigits={5}
      fractionWidth=4
      value="56789.987" />
  </GridLine>
  <GridLine>
    <CurrencyDisplayWrapped containerClass="grid-span-4 grid-start-7"
      currency="EUR"
      digitWidth=8
      fractionDigits={7}
      fractionWidth=4
      value=".1122334455" />
  </GridLine>
  <GridLine>
    <CurrencyDisplayWrapped containerClass="grid-span-4 grid-start-7"
      currency="EUR"
      digitWidth=8
      fractionDigits={7}
      fractionWidth=4
      value="-.1113" />
  </GridLine>
  <GridLine>
    <CurrencyDisplayWrapped containerClass="grid-span-4 grid-start-7"
      currency="EUR"
      digitWidth=8
      fractionWidth=4
      value="122345" />
  </GridLine>
  <GridLine>
    <CurrencyDisplayWrapped containerClass="grid-span-4 grid-start-7"
      currency="EUR"
      digitWidth=8
      fractionWidth=4
      value="-1122334455" />
  </GridLine>
  <GridLine>
    <span class="grid-span-6">Currencys aligneds around decimal separator : </span>
    <CurrencyDisplayWrapped containerClass="grid-span-3"
      currency="USD"
      currencyDisplay={NUMBER_CURRENCY_DISPLAY_NAME}
      digitWidth=30
      fractionDigits={10}
      fractionWidth=100
      value="1234.987654321" />
    <CurrencyDisplayWrapped containerClass="grid-span-3  grid-start-7"
      currency="USD"
      currencyDisplay={NUMBER_CURRENCY_DISPLAY_NAME}
      digitWidth=30
      fractionDigits={10}
      fractionWidth=100
      value="1.76" />
    <CurrencyDisplayWrapped containerClass="grid-span-3  grid-start-7"
      currency="USD"
      currencyDisplay={NUMBER_CURRENCY_DISPLAY_NAME}
      digitWidth=30
      fractionDigits={10}
      fractionWidth=100
      value="13579" />
    <CurrencyDisplayWrapped containerClass="grid-span-3  grid-start-7"
      currency="USD"
      currencyDisplay={NUMBER_CURRENCY_DISPLAY_NAME}
      digitWidth=30
      fractionDigits={10}
      fractionWidth=100
      size={SIZE_LARGE}
      value="1.76" />
    <CurrencyDisplayWrapped containerClass="grid-span-3  grid-start-7"
      currency="USD"
      currencyDisplay={NUMBER_CURRENCY_DISPLAY_NAME}
      digitWidth=30
      fractionDigits={10}
      fractionWidth=100
      size={SIZE_EXTRA_LARGE}
      value="1.76" />
  </GridLine>
</GridContainer>
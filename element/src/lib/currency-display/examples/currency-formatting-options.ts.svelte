<script lang="ts">
  import {
    GridContainer,
    GridLine,
  } from '$lib/grid/index.js'

  import {
    NUMBER_CURRENCY_DISPLAY_CODE,
    NUMBER_CURRENCY_DISPLAY_NAME,
    NUMBER_CURRENCY_DISPLAY_NARROW_SYMBOL,
    NUMBER_CURRENCY_SIGN_ACCOUNTING,
  } from '$lib/number/index.js'

  import {
    CurrencyDisplay,
  } from '$lib/currency-display/index.js'

</script>

<GridContainer>
  <GridLine>
    <span class="grid-span-6">
      Unformatted currency display:
    </span>
    <span class="grid-span-6">
      <CurrencyDisplay currency="AUD"
        value="123456789.987654" />
    </span>
  </GridLine>
  <GridLine>
    <span class="grid-span-6">
      Use code for currency display:
    </span>
    <span class="grid-span-6">
      <CurrencyDisplay currency="AUD"
        currencyDisplay={NUMBER_CURRENCY_DISPLAY_CODE}
        value="-123456789.987654" />
    </span>
  </GridLine>
  <GridLine>
    <span class="grid-span-6">
      Use narrow symbol for currency display:
    </span>
    <span class="grid-span-6">
      <CurrencyDisplay currency="AUD"
        currencyDisplay={NUMBER_CURRENCY_DISPLAY_NARROW_SYMBOL}
        value="-123456789.987654" />
    </span>
  </GridLine>
  <GridLine>
    <span class="grid-span-6">
      Use name for currency display:
    </span>
    <span class="grid-span-6">
      <CurrencyDisplay currency="AUD"
        currencyDisplay={NUMBER_CURRENCY_DISPLAY_NAME}
        value="-123456789.987654" />
    </span>
  </GridLine>
  <GridLine>
    <span class="grid-span-6">
      Use parantheses for negative number:
    </span>
    <span class="grid-span-6">
      <CurrencyDisplay currency="AUD"
        currencySign={NUMBER_CURRENCY_SIGN_ACCOUNTING}
        value="-123456789.987654" />
    </span>
  </GridLine>
</GridContainer>
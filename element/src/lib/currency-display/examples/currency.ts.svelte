<script lang="ts">
  import {
    GridContainer,
    GridLine,
  } from '$lib/grid/index.js'

  import {
    NUMBER_SIGN_DISPLAY_ALWAYS,
  } from '$lib/number/index.js'

  import {
    CurrencyDisplay,
  } from '$lib/currency-display/index.js'

  import {
    SIZE_EXTRA_LARGE,
    SIZE_LARGE,
    SIZE_SMALL,
  } from '$lib/types.js'
</script>

<GridContainer>
  <GridLine>
    <span class="grid-span-6">
      German format:
    </span>
    <span class="grid-span-6">
      <CurrencyDisplay currency="EUR"
        locale="de-DE"
        value="123456789.987654" />
    </span>
  </GridLine>
  <GridLine>
    <span class="grid-span-6">
      German format small:
    </span>
    <span class="grid-span-6">
      <CurrencyDisplay currency="EUR"
        locale="de-DE"
        size={SIZE_SMALL}
        value="123456789.987654" />
    </span>
  </GridLine>
  <GridLine>
    <span class="grid-span-6">
      German format large:
    </span>
    <span class="grid-span-6">
      <CurrencyDisplay currency="EUR"
        locale="de-DE"
        size={SIZE_LARGE}
        value="123456789.987654" />
    </span>
  </GridLine>
  <GridLine>
    <span class="grid-span-6">
      German format extra large:
    </span>
    <span class="grid-span-6">
      <CurrencyDisplay currency="EUR"
        locale="de-DE"
        size={SIZE_EXTRA_LARGE}
        value="123456789.987654" />
    </span>
  </GridLine>
  <GridLine>
    <span class="grid-span-6">
      French format:
    </span>
    <span class="grid-span-6">
      <CurrencyDisplay currency="EUR"
        locale="fr-FR"
        value="123456789.987654" />
    </span>
  </GridLine>
  <GridLine>
    <span class="grid-span-6">
      More decimals:
    </span>
    <span class="grid-span-6">
      <CurrencyDisplay  currency="CNY"
        fractionDigits={6}
        value="123456789.987654" />
    </span>
  </GridLine>
  <GridLine>
    <span class="grid-span-6">
      No thousand grouping:
    </span>
    <span class="grid-span-6">
      <CurrencyDisplay currency="JPY"
        useGrouping={false}
        value="123456789.987654" />
    </span>
  </GridLine>
  <GridLine>
    <span class="grid-span-6">
      Zero padded:
    </span>
    <span class="grid-span-6">
      <CurrencyDisplay currency="AUD"
        fractionDigits={4}
        value="123456789.987654" 
        zeroPadded={12}/>
    </span>
  </GridLine>
  <GridLine>
    <span class="grid-span-6">
      Fix number of fraction digits (zero padded):
    </span>
    <span class="grid-span-6">
      <CurrencyDisplay currency="GBP"
        fractionDigits={[10, 10]}
        value="123456789.987654" />
    </span>
  </GridLine>
  <GridLine>
    <span class="grid-span-6">
      Multiple numbers with same format:
    </span>
    <span class="grid-span-6">
      <CurrencyDisplay
        currency="INR"
        fractionDigits={2}
        locale="fr-FR"
        mask=" $(number) - $(number)"
        value={[123456789.987654, 5555555.4444]} />
    </span>
  </GridLine>
  <GridLine>
    <span class="grid-span-6">
      Always show sign:
    </span>
    <span class="grid-span-6">
      <CurrencyDisplay currency="BRL"
        signDisplay={NUMBER_SIGN_DISPLAY_ALWAYS}
        mask=" $(number),  $(number),  $(number)"
        value={[123.45, 0, -987.65]} />
    </span>
  </GridLine>
</GridContainer>
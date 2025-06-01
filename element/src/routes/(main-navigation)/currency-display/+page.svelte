<script lang="ts">
  import {
    Accordion,
  } from '$lib/accordion/index.js'

  import {
    GridContainer,
    GridLine,
  } from '$lib/grid/index.js'

  import {
    NUMBER_CURRENCY_DISPLAY_CODE,
    NUMBER_CURRENCY_DISPLAY_NAME,
    NUMBER_CURRENCY_DISPLAY_NARROW_SYMBOL,
    NUMBER_CURRENCY_SIGN_ACCOUNTING,
    NUMBER_SIGN_DISPLAY_ALWAYS,
  } from '$lib/number/index.js'

  import {
    CurrencyDisplay,
    CurrencyDisplayWrapped,
  } from '$lib/currency-display/index.js'
</script>

<Accordion>
  {#snippet title()}
    <h2>Currency formatting options</h2>
  {/snippet}
  <GridContainer>
    <GridLine>
      <span class="grid-span-12">
        <CurrencyDisplay currency="AUD"
          mask="Unformatted currency display: $(number)"
          value="123456789.987654" />
      </span>
    </GridLine>
    <GridLine>
      <span class="grid-span-12">
        <CurrencyDisplay currency="AUD"
          currencyDisplay={NUMBER_CURRENCY_DISPLAY_CODE}
          mask="Use code for currency display: $(number)"
          value="-123456789.987654" />
      </span>
    </GridLine>
    <GridLine>
      <span class="grid-span-12">
        <CurrencyDisplay currency="AUD"
          currencyDisplay={NUMBER_CURRENCY_DISPLAY_NARROW_SYMBOL}
          mask="Use narrow symbol for currency display: $(number)"
          value="-123456789.987654" />
      </span>
    </GridLine>
    <GridLine>
      <span class="grid-span-12">
        <CurrencyDisplay currency="AUD"
          currencyDisplay={NUMBER_CURRENCY_DISPLAY_NAME}
          mask="Use name for currency display: $(number)"
          value="-123456789.987654" />
      </span>
    </GridLine>
    <GridLine>
      <span class="grid-span-12">
        <CurrencyDisplay currency="AUD"
          currencySign={NUMBER_CURRENCY_SIGN_ACCOUNTING}
          mask="Use parantheses for negative number: $(number)"
          value="-123456789.987654" />
      </span>
    </GridLine>
  </GridContainer>
</Accordion>
<Accordion>
  {#snippet title()}
    <h2>Currency display</h2>
  {/snippet}
  <GridContainer>
    <GridLine>
      <span class="grid-span-12">
        <CurrencyDisplay currency="EUR"
          locale="de-DE"
          mask="German format: $(number)"
          value="123456789.987654" />
      </span>
    </GridLine>
    <GridLine>
      <span class="grid-span-12">
        <CurrencyDisplay currency="EUR"
          locale="fr-FR"
          mask="French format: $(number)"
          value="123456789.987654" />
      </span>
    </GridLine>
    <GridLine>
      <span class="grid-span-12">
        <CurrencyDisplay  currency="CNY"
          fractionDigits={6}
          mask="More decimals: $(number)"
          value="123456789.987654" />
      </span>
    </GridLine>
    <GridLine>
      <span class="grid-span-12">
        <CurrencyDisplay currency="JPY"
          useGrouping={false}
          mask="No thousand grouping: $(number)"
          value="123456789.987654" />
      </span>
    </GridLine>
    <GridLine>
      <span class="grid-span-12">
        <CurrencyDisplay currency="AUD"
          mask="Zero padded: $(number)"
          fractionDigits={4}
          value="123456789.987654" 
          zeroPadded={12}/>
      </span>
    </GridLine>
    <GridLine>
      <span class="grid-span-12">
        <CurrencyDisplay currency="GBP"
          mask="Fix number of fraction digits (zero padded): $(number)"
          fractionDigits={[10, 10]}
          value="123456789.987654" />
      </span>
    </GridLine>
    <GridLine>
      <span class="grid-span-12">
        <CurrencyDisplay
          currency="INR"
          fractionDigits={2}
          locale="fr-FR"
          mask="Multiple numbers with same format: $(number) - $(number)"
          value={[123456789.987654, 5555555.4444]} />
      </span>
    </GridLine>
    <GridLine>
      <span class="grid-span-12">
        <CurrencyDisplay currency="BRL"
          signDisplay={NUMBER_SIGN_DISPLAY_ALWAYS}
          mask="Always show sign: $(number),  $(number),  $(number)"
          value={[123.45, 0, -987.65]} />
      </span>
    </GridLine>
  </GridContainer>
</Accordion>
<Accordion>
  {#snippet title()}
    <h2>Currency display wrapped</h2>
  {/snippet}
  <GridContainer>
    <GridLine>
      <span class="grid-span-6">Default settings with wrapped number: </span>
      <CurrencyDisplayWrapped class="grid-span-2" currency="EUR" value="123456789.987654" />
    </GridLine>
    <GridLine>
      <span class="grid-span-6">More decimals: </span>
      <CurrencyDisplayWrapped class="grid-span-2"
        currency="EUR"
        fractionDigits={6}
        value="123456789.987654" />
      
    </GridLine>
    <GridLine>
      <span class="grid-span-6">Zero padded: </span>
      <CurrencyDisplayWrapped class="grid-span-2"
        currency="EUR"
        value="123456789.987654" 
        zeroPadded={12}/>
    </GridLine>
    <GridLine>
      <span class="grid-span-6">Currencys aligneds around decimal separator : </span>
      <CurrencyDisplayWrapped containerClass="grid-span-3"
        currency="EUR"
        fractionDigits={7}
        value="123456789.987654" 
        digitsToFractionRatio={[8, 4]}/>
      <CurrencyDisplayWrapped containerClass="grid-span-3 grid-start-7"
        currency="EUR"
        fractionDigits={5}
        value="56789.987" 
        digitsToFractionRatio={[8, 4]}/>
      <CurrencyDisplayWrapped containerClass="grid-span-3 grid-start-7"
        currency="EUR"
        fractionDigits={7}
        value=".1122334455" 
        digitsToFractionRatio={[8, 4]}/>
      <CurrencyDisplayWrapped containerClass="grid-span-3 grid-start-7"
        currency="EUR"
        fractionDigits={7}
        value="-.1113" 
        digitsToFractionRatio={[8, 4]}/>
      <CurrencyDisplayWrapped containerClass="grid-span-3 grid-start-7"
        currency="EUR"
        value="122345" 
        digitsToFractionRatio={[8, 4]}/>
      <CurrencyDisplayWrapped containerClass="grid-span-3 grid-start-7"
        currency="EUR"
        value="-1122334455" 
        digitsToFractionRatio={[8, 4]}/>
    </GridLine>
    <GridLine>
      <span class="grid-span-6">Currencys aligneds around decimal separator : </span>
      <CurrencyDisplayWrapped containerClass="grid-span-3"
        currency="USD"
        currencyDisplay={NUMBER_CURRENCY_DISPLAY_NAME}
        fractionDigits={10}
        value="1234.987654321" 
        digitsToFractionRatio={[30, 100]}/>
      <CurrencyDisplayWrapped containerClass="grid-span-3  grid-start-7"
        currency="USD"
        currencyDisplay={NUMBER_CURRENCY_DISPLAY_NAME}
        fractionDigits={10}
        value="1.76" 
        digitsToFractionRatio={[30, 100]}/>
      <CurrencyDisplayWrapped containerClass="grid-span-3  grid-start-7"
        currency="USD"
        currencyDisplay={NUMBER_CURRENCY_DISPLAY_NAME}
        fractionDigits={10}
        value="13579" 
        digitsToFractionRatio={[30, 100]}/>
    </GridLine>
  </GridContainer>
</Accordion>
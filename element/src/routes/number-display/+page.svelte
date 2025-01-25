<script lang="ts">
  import {
    Accordion,
  } from '$lib/accordion/index.js'

  import {
    GridContainer,
    GridLine,
  } from '$lib/grid/index.js'

  import {
    NUMBER_ROUNDING_MODE_CEIL,
    NUMBER_ROUNDING_MODE_EXPAND,
    NUMBER_ROUNDING_MODE_TRUNC,
    NUMBER_SIGN_DISPLAY_ALWAYS,
    ordinalEn,
    TEXT_DISPLAY_TYPE_NUMBER,
  } from '$lib/text-display/index.js'

  import {
    NumberDisplay,
    NumberDisplayWrapped,
  } from '$lib/number-display/index.js'

  let number1: number = $state(14312)
  let dynamicSuffix1 = $derived.by(() => ordinalEn(number1))
  let number2: number = $state(143122)
  let dynamicSuffix2 = $derived.by(() => ordinalEn(number2))
</script>

<Accordion>
  {#snippet title()}
    <h2>Number display</h2>
  {/snippet}
  <GridContainer>
    <GridLine>
      <span class="grid-span-12">
        <NumberDisplay mask="Unformatted number display: $(number)"
          value="123456789.987654" />
      </span>
    </GridLine>
    <GridLine>
      <span class="grid-span-12">
        <NumberDisplay locale="de-DE"
          mask="German format: $(number)"
          value="123456789.987654" />
      </span>
    </GridLine>
    <GridLine>
      <span class="grid-span-12">
        <NumberDisplay locale="fr-FR"
          mask="French format: $(number)"
          value="123456789.987654" />
      </span>
    </GridLine>
    <GridLine>
      <span class="grid-span-12">
        <NumberDisplay fractionDigits={6}
          mask="More decimals: $(number)"
          value="123456789.987654" />
      </span>
    </GridLine>
    <GridLine>
      <span class="grid-span-12">
        <NumberDisplay useGrouping={false}
          mask="No thousand grouping: $(number)"
          value="123456789.987654" />
      </span>
    </GridLine>
    <GridLine>
      <span class="grid-span-12">
        <NumberDisplay mask="Zero padded: $(number)"
          fractionDigits={4}
          value="123456789.987654" 
          zeroPadded={12}/>
      </span>
    </GridLine>
    <GridLine>
      <span class="grid-span-12">
        <NumberDisplay mask={['Use dynamic ordinal suffix (English): $(number)', dynamicSuffix1, ', $(number)', dynamicSuffix2]}
          value={[number1, number2]} />
      </span>
    </GridLine>
    <GridLine>
      <span class="grid-span-12">
        <NumberDisplay mask="Fix number of fraction digits (zero padded): $(number)"
          fractionDigits={[10, 10]}
          value="123456789.987654" />
      </span>
    </GridLine>
    <GridLine>
      <span class="grid-span-12">
        <NumberDisplay fractionDigits="2"
          locale="fr-FR"
          mask="Multiple numbers with same format: $(number) - $(number)"
          value={[123456789.987654, 5555555.4444]} />
      </span>
    </GridLine>
    <GridLine>
      <span class="grid-span-12">
        <NumberDisplay signDisplay={NUMBER_SIGN_DISPLAY_ALWAYS}
          mask="Always show sign: $(number),  $(number),  $(number)"
          value={[123.45, 0, -987.65]} />
      </span>
    </GridLine>
    <GridLine>
      <span class="grid-span-12">
        Rounding modes. Numbers used: 1.65, -1.65, 1.23, -1,23
      </span> 
      <span class="grid-span-3">
        <NumberDisplay fractionDigits={0}
          mask="Default: $(number),  $(number),  $(number), $(number)"
          value={[1.65, -1.65, 1.23, -1,23]} />
      </span>
      <span class="grid-span-3">
        <NumberDisplay fractionDigits={0}
          mask="Ceiling: $(number),  $(number),  $(number), $(number)"
          roundingMode={NUMBER_ROUNDING_MODE_CEIL}
          value={[1.65, -1.65, 1.23, -1,23]} />
      </span>
      <span class="grid-span-3">
        <NumberDisplay fractionDigits={0}
          mask="Truncate: $(number),  $(number),  $(number), $(number)"
          roundingMode={NUMBER_ROUNDING_MODE_TRUNC}
          value={[1.65, -1.65, 1.23, -1,23]} />
      </span>
      <span class="grid-span-3">
        <NumberDisplay fractionDigits={0}
          mask="Expand: $(number),  $(number),  $(number), $(number)"
          roundingMode={NUMBER_ROUNDING_MODE_EXPAND}
          value={[1.65, -1.65, 1.23, -1,23]} />
      </span>
    </GridLine>
  </GridContainer>
</Accordion>
<Accordion>
  {#snippet title()}
    <h2>Number display wrapped</h2>
  {/snippet}
  <GridContainer>
    <GridLine>
      <span class="grid-span-6">Default settings with wrapped number: </span>
      <NumberDisplayWrapped class="grid-span-2" value="123456789.987654" />
    </GridLine>
    <GridLine>
      <span class="grid-span-6">More decimals: </span>
      <NumberDisplayWrapped class="grid-span-2"
        fractionDigits={6}
        value="123456789.987654" />
      
    </GridLine>
    <GridLine>
      <span class="grid-span-6">Zero padded: </span>
      <NumberDisplayWrapped class="grid-span-2"
        value="123456789.987654" 
        zeroPadded={12}/>
    </GridLine>
    <GridLine>
      <span class="grid-span-6">Numbers aligneds around decimal separator : </span>
      <NumberDisplayWrapped containerClass="grid-span-3"
        fractionDigits={7}
        value="123456789.987654" 
        digitsToFractionRatio={[8, 4]}/>
      <NumberDisplayWrapped containerClass="grid-span-3 grid-start-7"
        fractionDigits={5}
        value="56789.987" 
        digitsToFractionRatio={[8, 4]}/>
      <NumberDisplayWrapped containerClass="grid-span-3 grid-start-7"
        fractionDigits={7}
        value=".1122334455" 
        digitsToFractionRatio={[8, 4]}/>
      <NumberDisplayWrapped containerClass="grid-span-3 grid-start-7"
        fractionDigits={7}
        value="-.1113" 
        digitsToFractionRatio={[8, 4]}/>
      <NumberDisplayWrapped containerClass="grid-span-3 grid-start-7"
        value="122345" 
        digitsToFractionRatio={[8, 4]}/>
      <NumberDisplayWrapped containerClass="grid-span-3 grid-start-7"
        value="-1122334455" 
        digitsToFractionRatio={[8, 4]}/>
    </GridLine>
    <GridLine>
      <span class="grid-span-6">Numbers aligneds around decimal separator : </span>
      <NumberDisplayWrapped containerClass="grid-span-3"
        fractionDigits={10}
        value="1234.987654321" 
        digitsToFractionRatio={[30, 100]}/>
      <NumberDisplayWrapped containerClass="grid-span-3  grid-start-7"
        fractionDigits={10}
        value="1.76" 
        digitsToFractionRatio={[30, 100]}/>
    </GridLine>
  </GridContainer>
</Accordion>
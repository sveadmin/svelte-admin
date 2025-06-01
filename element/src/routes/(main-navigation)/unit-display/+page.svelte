<script lang="ts">
  import {
    Accordion,
  } from '$lib/accordion/index.js'

  import {
    GridContainer,
    GridLine,
  } from '$lib/grid/index.js'

  import {
    NUMBER_SIGN_DISPLAY_ALWAYS,
    NUMBER_UNIT_DISPLAY_LONG,
    NUMBER_UNIT_DISPLAY_NARROW,
  } from '$lib/number/index.js'

  import {
    UnitDisplay,
    UnitDisplayWrapped,
  } from '$lib/unit-display/index.js'
</script>

<Accordion>
  {#snippet title()}
    <h2>Unit formatting options</h2>
  {/snippet}
  <GridContainer>
    <GridLine>
      <span class="grid-span-12">
        <UnitDisplay mask="Unformatted unit display: $(number)"
          unit="kilogram"
          value="123456789.987654" />
      </span>
    </GridLine>
    <GridLine>
      <span class="grid-span-12">
        <UnitDisplay mask="Use long name for unit display: $(number)"
          unit="kilogram"
          unitDisplay={NUMBER_UNIT_DISPLAY_LONG}
          value="-123456789.987654" />
      </span>
    </GridLine>
    <GridLine>
      <span class="grid-span-12">
        <UnitDisplay mask="Use narrow symbol for unit display: $(number)"
          unit="kilogram"
          unitDisplay={NUMBER_UNIT_DISPLAY_NARROW}
          value="-123456789.987654" />
      </span>
    </GridLine>
  </GridContainer>
</Accordion>
<Accordion>
  {#snippet title()}
    <h2>Unit display</h2>
  {/snippet}
  <GridContainer>
    <GridLine>
      <span class="grid-span-12">
        <UnitDisplay locale="de-DE"
          mask="German format: $(number)"
          unit="kilometer"
          value="123456789.987654" />
      </span>
    </GridLine>
    <GridLine>
      <span class="grid-span-12">
        <UnitDisplay locale="fr-FR"
          mask="French format: $(number)"
          unit="centimeter"
          value="123456789.987654" />
      </span>
    </GridLine>
    <GridLine>
      <span class="grid-span-12">
        <UnitDisplay fractionDigits={6}
          mask="More decimals: $(number)"
          unit="nanosecond"
          value="123456789.987654" />
      </span>
    </GridLine>
    <GridLine>
      <span class="grid-span-12">
        <UnitDisplay useGrouping={false}
          mask="No thousand grouping: $(number)"
          unit="terabit"
          value="123456789.987654" />
      </span>
    </GridLine>
    <GridLine>
      <span class="grid-span-12">
        <UnitDisplay fractionDigits={4}
          mask="Zero padded: $(number)"
          unit="celsius"
          value="123456789.987654" 
          zeroPadded={12}/>
      </span>
    </GridLine>
    <GridLine>
      <span class="grid-span-12">
        <UnitDisplay fractionDigits={[10, 10]}
          mask="Fix number of fraction digits (zero padded): $(number)"
          unit="liter"
          value="123456789.987654" />
      </span>
    </GridLine>
    <GridLine>
      <span class="grid-span-12">
        <UnitDisplay fractionDigits={2}
          locale="fr-FR"
          mask="Multiple numbers with same format: $(number) - $(number)"
          unit="mile"
          value={[123456789.987654, 5555555.4444]} />
      </span>
    </GridLine>
    <GridLine>
      <span class="grid-span-12">
        <UnitDisplay signDisplay={NUMBER_SIGN_DISPLAY_ALWAYS}
          mask="Always show sign: $(number),  $(number),  $(number)"
          unit="second"
          value={[123.45, 0, -987.65]} />
      </span>
    </GridLine>
  </GridContainer>
</Accordion>
<Accordion>
  {#snippet title()}
    <h2>Unit display wrapped</h2>
  {/snippet}
  <GridContainer>
    <GridLine>
      <span class="grid-span-6">Default settings with wrapped number: </span>
      <UnitDisplayWrapped class="grid-span-2" unit="milliliter" value="123456789.987654" />
    </GridLine>
    <GridLine>
      <span class="grid-span-6">More decimals: </span>
      <UnitDisplayWrapped class="grid-span-2"
        unit="pound"
        fractionDigits={6}
        value="123456789.987654" />
      
    </GridLine>
    <GridLine>
      <span class="grid-span-6">Zero padded: </span>
      <UnitDisplayWrapped class="grid-span-2"
        unit="inch"
        value="123456789.987654" 
        zeroPadded={12}/>
    </GridLine>
    <GridLine>
      <span class="grid-span-6">Units aligned around decimal separator : </span>
      <UnitDisplayWrapped containerClass="grid-span-3"
        fractionDigits={7}
        unit="meter"
        value="123456789.987654" 
        digitsToFractionRatio={[8, 4]}/>
      <UnitDisplayWrapped containerClass="grid-span-3 grid-start-7"
        fractionDigits={5}
        unit="meter"
        value="56789.987" 
        digitsToFractionRatio={[8, 4]}/>
      <UnitDisplayWrapped containerClass="grid-span-3 grid-start-7"
        fractionDigits={7}
        unit="meter"
        value=".1122334455" 
        digitsToFractionRatio={[8, 4]}/>
      <UnitDisplayWrapped containerClass="grid-span-3 grid-start-7"
        fractionDigits={7}
        unit="meter"
        value="-.1113" 
        digitsToFractionRatio={[8, 4]}/>
      <UnitDisplayWrapped containerClass="grid-span-3 grid-start-7"
        unit="meter"
        value="122345" 
        digitsToFractionRatio={[8, 4]}/>
      <UnitDisplayWrapped containerClass="grid-span-3 grid-start-7"
        unit="meter"
        value="-1122334455" 
        digitsToFractionRatio={[8, 4]}/>
    </GridLine>
    <!-- <GridLine>
      <span class="grid-span-6">Units aligneds around decimal separator : </span>
      <UnitDisplayWrapped containerClass="grid-span-3"
        currency="USD"
        fractionDigits={10}
        value="1234.987654321" 
        digitsToFractionRatio={[30, 100]}/>
      <UnitDisplayWrapped containerClass="grid-span-3  grid-start-7"
        currency="USD"
        fractionDigits={10}
        value="1.76" 
        digitsToFractionRatio={[30, 100]}/>
    </GridLine> -->
  </GridContainer>
</Accordion>
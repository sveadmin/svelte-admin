<script lang="ts">
  import {
    SIZE_EXTRA_LARGE,
    SIZE_LARGE,
    SIZE_SMALL,
  } from '$lib/types.js'

  import {
    GridContainer,
    GridLine,
  } from '$lib/grid/index.js'

  import {
    NumberDisplayWrapped,
  } from '$lib/number-display/index.js'

</script>

<GridContainer>
  <GridLine>
    <span class="grid-span-6">Default settings with wrapped number: </span>
    <NumberDisplayWrapped class="grid-span-4" value="123456789.987654" />
  </GridLine>
  <GridLine>
    <span class="grid-span-6">Small wrapped number: </span>
    <NumberDisplayWrapped class="grid-span-4" size={SIZE_SMALL} value="123456789.987654" />
  </GridLine>
  <GridLine>
    <span class="grid-span-6">Large wrapped number: </span>
    <NumberDisplayWrapped class="grid-span-4" size={SIZE_LARGE} value="123456789.987654" />
  </GridLine>
  <GridLine>
    <span class="grid-span-6">Extra large wrapped number: </span>
    <NumberDisplayWrapped class="grid-span-4" size={SIZE_EXTRA_LARGE} value="123456789.987654" />
  </GridLine>
  <GridLine>
    <span class="grid-span-6">More decimals: </span>
    <NumberDisplayWrapped class="grid-span-4"
      fractionDigits={6}
      value="123456789.987654" />
    
  </GridLine>
  <GridLine>
    <span class="grid-span-6">Zero padded: </span>
    <NumberDisplayWrapped class="grid-span-4"
      value="123456789.987654" 
      zeroPadded={12}/>
  </GridLine>
  <GridLine>
    <span class="grid-span-6">Numbers aligneds around decimal separator : </span>
    <NumberDisplayWrapped containerClass="grid-span-4"
      digitWidth=8
      fractionDigits=7
      fractionWidth=4
      value="123456789.987654" 
      />
    <NumberDisplayWrapped containerClass="grid-span-4 grid-start-7"
      digitWidth=8
      fractionDigits=5
      fractionWidth=4
      value="56789.987" />
    <NumberDisplayWrapped containerClass="grid-span-4 grid-start-7"
      digitWidth=8
      fractionDigits=7
      fractionWidth=4
      value=".1122334455" />
    <NumberDisplayWrapped containerClass="grid-span-4 grid-start-7"
      digitWidth=8
      fractionDigits=7
      fractionWidth=4
      value="-.1113" />
    <NumberDisplayWrapped containerClass="grid-span-4 grid-start-7"
      digitWidth=8
      fractionWidth=4
      value="122345" />
    <NumberDisplayWrapped containerClass="grid-span-4 grid-start-7"
      digitWidth=8
      fractionWidth=4
      value="-1122334455" />
  </GridLine>
  <GridLine>
    <span class="grid-span-6">Different fraction spacing: </span>
    <NumberDisplayWrapped containerClass="grid-span-4"
      digitWidth=30
      fractionDigits=10
      fractionWidth=100
      value="1234.987654321" />
    <NumberDisplayWrapped containerClass="grid-span-4 grid-start-7"
      digitWidth=30
      fractionDigits=10
      fractionWidth=100
      size={SIZE_SMALL}
      value="1234.987654321" />
    <NumberDisplayWrapped containerClass="grid-span-4 grid-start-7"
      digitWidth=30
      fractionDigits=10
      fractionWidth=100
      value="1.76" />
    <NumberDisplayWrapped containerClass="grid-span-4 grid-start-7"
      digitWidth=30
      fractionDigits=10
      fractionWidth=100
      size={SIZE_EXTRA_LARGE}
      value="1.76" />
  </GridLine>
</GridContainer>

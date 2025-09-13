<script lang="ts">
  import {
    Button,
  } from '$lib/button/index.js'

  import {
    NumberInput,
  } from '$lib/number-input/index.js'

  import {
    GridContainer,
    GridLine,
  } from '$lib/grid/index.js'

  import {
    SIZE_SMALL,
    SIZE_LARGE,
    SIZE_EXTRA_LARGE,
  } from '$lib/types.js'

  let value : number | null = $state(123.45),
    valueSmall : number = $state(123456.78),
    valueLarge : number = $state(123.456),
    valueExtraLarge : number = $state(123.456),
    valueDot : number = $state(123.45),
    valueFraction : number | null = $state(123.45),
    valueFractionSmall : number = $state(123456.78),
    valueFractionLarge : number = $state(123.456),
    valueFractionExtraLarge : number = $state(123.456),
    valueFractionDot : number = $state(0.0090012345)

  const clearValue = () => value = null
  const clearFraction = () => valueFraction = null
</script>

<GridContainer class="demopage-grid">
  <GridLine>
    <span class="grid-span-4">Normal size number input</span>
    <span class="grid-span-6">
      <form>
        <NumberInput bind:value={value}/>
      </form>
    </span>
    <span class="grid-span-2">
      Value: {value}
    </span>
  </GridLine>
  <GridLine>
    <Button onClick={clearValue} label="Clear value" class="grid-span-2 grid-start-5"/>
  </GridLine>
  <GridLine>
    <span class="grid-span-4">Small size number input</span>
    <span class="grid-span-6">
      <form>
        <NumberInput size={SIZE_SMALL}  bind:value={valueSmall} />
      </form>
    </span>
    <span class="grid-span-2">
      Value: {valueSmall}
    </span>
  </GridLine>
  <GridLine>
    <span class="grid-span-4">Large size number input</span>
    <span class="grid-span-6">
      <form>
        <NumberInput size={SIZE_LARGE}  bind:value={valueLarge} />
      </form>
    </span>
    <span class="grid-span-2">
      Value: {valueLarge}
    </span>
  </GridLine>
  <GridLine>
    <span class="grid-span-4">Extra large size number input</span>
    <span class="grid-span-6">
      <form>
        <NumberInput size={SIZE_EXTRA_LARGE}  bind:value={valueExtraLarge} />
      </form>
    </span>
    <span class="grid-span-2">
      Value: {valueExtraLarge}
    </span>
  </GridLine>
  <GridLine>
    <span class="grid-span-4">Normal size number input with . as decimal separator</span>
    <span class="grid-span-6">
      <form>
        <NumberInput decimalSeparator="."  bind:value={valueDot}/>
      </form>
    </span>
    <span class="grid-span-2">
      Value: {valueDot}
    </span>
  </GridLine>
  <GridLine>
    <span class="grid-span-3">Values to copy & paste:</span>
    <span class="grid-span-2">1000.345</span>
    <span class="grid-span-2">1000,345</span>
    <span class="grid-span-2">0.00987654321</span>
    <span class="grid-span-2">-123.456789</span>
  </GridLine>
  <GridLine>
    <span class="grid-span-4">Normal size with fraction digits</span>
    <span class="grid-span-6">
      <form>
        <NumberInput fractionDigits=3 isClearButtonEnabled={true} bind:value={valueFraction} />
      </form>
    </span>
    <span class="grid-span-2">
      Value: {valueFraction}
    </span>
  </GridLine>
  <GridLine>
    <Button onClick={clearFraction} label="Clear value" class="grid-span-2 grid-start-5"/>
  </GridLine>
  <GridLine>
    <span class="grid-span-4">Small size with fraction digits</span>
    <span class="grid-span-6">
      <form>
        <NumberInput fractionDigits=3
          isClearButtonEnabled={true}
          size={SIZE_SMALL}
          bind:value={valueFractionSmall} />
      </form>
    <span class="grid-span-2">
      Value: {valueFractionSmall}
    </span>
    </span>
  </GridLine>
  <GridLine>
    <span class="grid-span-4">Large size with fraction digits</span>
    <span class="grid-span-6">
      <form>
        <NumberInput fractionDigits=3
          isClearButtonEnabled={true}
          size={SIZE_LARGE}
          bind:value={valueFractionLarge} />
      </form>
    </span>
    <span class="grid-span-2">
      Value: {valueFractionLarge}
    </span>
  </GridLine>
  <GridLine>
    <span class="grid-span-4">Extra large size with fraction digits</span>
    <span class="grid-span-6">
      <form>
        <NumberInput fractionDigits=3
          isClearButtonEnabled={true}
          size={SIZE_EXTRA_LARGE}
          bind:value={valueFractionExtraLarge} />
      </form>
    </span>
    <span class="grid-span-2">
      Value: {valueFractionExtraLarge}
    </span>
  </GridLine>
  <GridLine>
    <span class="grid-span-4">Very small number with dot separator</span>
    <span class="grid-span-6">
      <form>
        <NumberInput decimalSeparator="."
          fractionDigits=8
          isClearButtonEnabled={true}
          bind:value={valueFractionDot} />
      </form>
    </span>
    <span class="grid-span-2">
      Value: {valueFractionDot}
    </span>
  </GridLine>
</GridContainer>
<script lang="ts">
  import {
    createFieldValidator,
    greaterThanValidator,
    lessThanValidator,
  } from '@sveadmin/common'

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

  let lowerBoundary: number = $state(0),
    upperBoundary: number = $state(10),
    value : number | null = $state(123.45),
    valueSmall : number = $state(123456.78),
    valueLarge : number = $state(123.456),
    valueExtraLarge : number = $state(123.456),
    valueDot : number = $state(123.45),
    valueFraction : number | null = $state(123.45),
    valueFractionSmall : number = $state(123456.78),
    valueFractionLarge : number = $state(123.456),
    valueFractionExtraLarge : number = $state(123.456),
    valueFractionDot : number = $state(0.0090012345),
    valueValidators : number = $state(0),
    valueValidatorsDot : number = $state(0)

  const validator = createFieldValidator([
    greaterThanValidator({
      get base () { return lowerBoundary}
    }),
    lessThanValidator({
      get base () { return upperBoundary}
    }),
  ])

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
    <span class="grid-span-2 grid-start-4">aaaaaaa</span>
    <span class="grid-span-2">-123-123,123</span>
    <span class="grid-span-2">56.,234</span>
    <span class="grid-span-2">12.34.56.78</span>
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
          mask={[{visibleWidth: "9rem"}]}
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
  <GridLine class="demopage-text-input">
    <h3 class="grid-span-4">Validator values tied to store</h3>
    <NumberInput areErrorsVisible={true}
      class="grid-span-2"
      type="number"
      validators={validator} 
      bind:value={valueValidators} />
    <span class="grid-span-2">
      Value: {valueValidators}
    </span>
  </GridLine>
  <GridLine class="demopage-text-input">
    <span class="grid-span-6 grid-start-5">
      <form>
        <NumberInput areErrorsVisible={true}
          fractionDigits=3
          type="number"
          validators={validator} 
          bind:value={valueValidatorsDot} />
      </form>
    </span>
    <span class="grid-span-2">
      Value: {valueValidatorsDot}
    </span>
  </GridLine>
  <GridLine class="demopage-text-input">
    <h4 class="grid-span-1 grid-start-5">
      Lower
    </h4>
    <span class="grid-span-3">
      <form>
        <NumberInput type="number" bind:value={lowerBoundary} />
      </form>
    </span>
    <h4 class="grid-span-1">
      Upper
    </h4>
    <span class="grid-span-3">
      <form>
        <NumberInput type="number" bind:value={upperBoundary} />
      </form>
    </span>
  </GridLine>
</GridContainer>
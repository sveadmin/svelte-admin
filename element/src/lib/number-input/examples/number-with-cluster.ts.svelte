<script lang="ts">
  import {
    Button,
  } from '$lib/button/index.js'

  import type {
    maskPartReducerFunction,
  } from '$lib/cluster/types.js'

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

  const {
    maskPartReducer = undefined
  } : {maskPartReducer?: maskPartReducerFunction} = $props()

  let instance : {ref: HTMLInputElement | undefined} = $state({ref: undefined}),
    valueFraction : number | null = $state(123.45),
    valueFractionSmall : number = $state(123456.78),
    valueFractionLarge : number = $state(123.456),
    valueFractionExtraLarge : number = $state(123.456),
    valueFractionDot : number = $state(0.0090012345),
    valueFractionBothSeparatorComma : number = $state(456.123),
    valueFractionBothSeparatorDot : number = $state(456.123)

  const clearFraction = () => valueFraction = null
</script>

<GridContainer class="demopage-grid">
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
    <span class="grid-span-4">Default number input with cluster (will not auto udpate value due to missing binding)</span>
    <span class="grid-span-6">
      <form>
        <NumberInput fractionDigits=3 bind:instance value=123.45/>
      </form>
    </span>
    <span class="grid-span-2">
      Value: {instance.ref?.value}
    </span>
  </GridLine>
  <GridLine>
    <span class="grid-span-4">Normal size with fraction digits</span>
    <span class="grid-span-6" data-testid="number-input">
      <form>
        <NumberInput fractionDigits=3
          isClearButtonEnabled={true}
          {maskPartReducer}
          bind:value={valueFraction} />
      </form>
    </span>
    <span class="grid-span-2" data-testid="number-value">
      Value: {valueFraction}
    </span>
  </GridLine>
{#if false}
  <GridLine>
    <Button onClick={clearFraction} data={{testid: 'clear-value'}} label="Clear value" class="grid-span-2 grid-start-5"/>
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
    </span>
    <span class="grid-span-2">
      Value: {valueFractionSmall}
    </span>
  </GridLine>
  <GridLine>
    <span class="grid-span-4">Large size with fraction digits</span>
    <span class="grid-span-6">
      <form>
        <NumberInput fractionDigits=3
          isClearButtonEnabled={true}
          size={SIZE_LARGE}
          bind:value={valueFractionLarge}
          visibleWidth="9rem" />
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
          bind:value={valueFractionExtraLarge}
          visibleWidth="9rem" />
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
  <GridLine>
    <span class="grid-span-4">Only accept `,` decimal separator</span>
    <span class="grid-span-6">
      <form>
        <NumberInput fractionDigits=3
          isIncorrectDecimalSeparatorAllowed={false}
          bind:value={valueFractionBothSeparatorComma} />
      </form>
    </span>
    <span class="grid-span-2">
      Value: {valueFractionBothSeparatorComma}
    </span>
  </GridLine>
  <GridLine>
    <span class="grid-span-4">Only accept `.` decimal separator</span>
    <span class="grid-span-6">
      <form>
        <NumberInput decimalSeparator="."
          fractionDigits=3
          isIncorrectDecimalSeparatorAllowed={false}
          bind:value={valueFractionBothSeparatorDot} />
      </form>
    </span>
    <span class="grid-span-2">
      Value: {valueFractionBothSeparatorDot}
    </span>
  </GridLine>
{/if}
</GridContainer>
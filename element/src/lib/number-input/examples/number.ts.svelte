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
    valueDot : number = $state(123.45)

  const clearValue = () => value = null
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
        <NumberInput size={SIZE_SMALL} bind:value={valueSmall} />
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
        <NumberInput size={SIZE_LARGE} bind:value={valueLarge} />
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
        <NumberInput size={SIZE_EXTRA_LARGE} bind:value={valueExtraLarge} />
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
        <NumberInput decimalSeparator="." bind:value={valueDot}/>
      </form>
    </span>
    <span class="grid-span-2">
      Value: {valueDot}
    </span>
  </GridLine>
</GridContainer>
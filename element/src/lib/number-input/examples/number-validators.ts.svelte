<script lang="ts">
  import {
    createFieldValidator,
    greaterThanValidator,
    lessThanValidator,
  } from '@sveadmin/common'

  import {
    NumberInput,
  } from '$lib/number-input/index.js'

  import {
    GridContainer,
    GridLine,
  } from '$lib/grid/index.js'

  let lowerBoundary: number = $state(0),
    upperBoundary: number = $state(10),
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

</script>

<GridContainer class="demopage-grid">
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
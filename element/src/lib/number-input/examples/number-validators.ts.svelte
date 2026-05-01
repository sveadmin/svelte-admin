<script lang="ts">
  import {
    createFieldValidator,
    greaterThanValidator,
    lessThanValidator,
  } from '@sveadmin/common'

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

  let lowerBoundary: number = $state(0),
    upperBoundary: number = $state(10),
    valueValidators : number = $state(0),
    valueValidatorsDot : number = $state(0)

  /**
   * This is required for the tests to be able to run, as async loading of maskPartReducer makes the component render empty in tests
   */
  const {
    maskPartReducer = undefined
  } : {maskPartReducer?: maskPartReducerFunction} = $props()

  const validator = createFieldValidator([
    greaterThanValidator({
      get base () { return lowerBoundary}
    }),
    lessThanValidator({
      get base () { return upperBoundary}
    }),
  ])

  const validatorDot = createFieldValidator(validator) // COpy the validator

  const validateInputsOnChange = () => {
    validator.validate(valueValidators)
    return true
  }

  const validateInputsOnkeyup = () => {
    validatorDot.validate(valueValidatorsDot)
    return true
  }

</script>

<GridContainer class="demopage-grid">
  <form>
    <GridLine class="demopage-text-input" data={{testid: "simple-container"}}>
      <h3 class="grid-span-4">Validator values tied to store, also validates on limit change</h3>
        <NumberInput areErrorsVisible={true}
          class="grid-span-4"
          data={{testid: "number-input"}}
          {maskPartReducer}
          type="number"
          validators={validator} 
          bind:value={valueValidators} />
      <span class="grid-span-2">
        Value: {valueValidators}
      </span>
    </GridLine>
  </form>
  <form>
    <GridLine class="demopage-text-input">
      <h3 class="grid-span-4">Validator values tied to store, also validates on limit keyup</h3>
      <span class="grid-span-6" data-testid="cluster-container">
        <NumberInput areErrorsVisible={true}
          data={{testid: "number-input-cluster"}}
          fractionDigits=3
          {maskPartReducer}
          type="number"
          validators={validatorDot} 
          bind:value={valueValidatorsDot} />
      </span>
      <span class="grid-span-2">
        Value: {valueValidatorsDot}
      </span>
    </GridLine>
  </form>
  <form>
    <GridLine class="demopage-text-input">
      <h4 class="grid-span-1 grid-start-5">
        Lower
      </h4>
      <span class="grid-span-3" data-testid="lower-limit-container">
        <NumberInput data={{testid: "lower-limit"}}
          {maskPartReducer}
          onChange={validateInputsOnChange}
          onKeyUp={validateInputsOnkeyup}
          type="number"
          bind:value={lowerBoundary} />
      </span>
      <h4 class="grid-span-1">
        Upper
      </h4>
      <span class="grid-span-3" data-testid="upper-limit-container">
        <NumberInput data={{testid: "upper-limit"}}
          {maskPartReducer}
          onChange={validateInputsOnChange}
          onKeyUp={validateInputsOnkeyup}
          type="number"
          bind:value={upperBoundary} />
      </span>
    </GridLine>
  </form>
</GridContainer>
<script lang="ts">
  import {
    untrack,
  } from 'svelte'

  import {
    createFieldValidator,
    greaterThanValidator,
    lessThanValidator,
    requiredValidator,
    validDateValidator,
  } from '@sveadmin/common'

  import type {
    AnyValidator,
    IsValid,
  } from '@sveadmin/common'

  import {
    GridLine,
  } from '$lib/grid/index.js'

  import {
    Input,
    InputWrapped,
  } from '$lib/input/index.js'

  import {
    DateDisplay,
  } from '$lib/date-display/index.js'

  let boundDateValue: string = $state(''),
    lowerBoundary: number = $state(0),
    upperBoundary: number = $state(10),
    valueWithinBoundaries: number = $state(5)

  const validators2 = createFieldValidator([requiredValidator()]) //If the same instance is used, the two validator gets updated by both inputs
  const validators3 = createFieldValidator([validDateValidator()])
  const validators4 = createFieldValidator([
    greaterThanValidator({
      get base () { return lowerBoundary}
    }),
    lessThanValidator({
      get base () { return upperBoundary}
    }),
  ])

  $effect(() => {
    $state.snapshot(lowerBoundary) //Forcing reactivity
    $state.snapshot(upperBoundary) //Forcing reactivity
    untrack(() => {
      validators4.validate({value: valueWithinBoundaries} as AnyValidator)
    })
  })
</script>

{#snippet errorElement(isValid: IsValid)}
  <div style="grid-area: error">
    <p>
      Is the value valid: {isValid.valid}
    </p>
    <p>
      Derived value: 
      {#if isValid.valid}
        <DateDisplay value={new Date(boundDateValue)} />
      {/if}
    </p>
    <p>
      Error message: {isValid.message}
    </p>
    <p>
      Error code: {isValid.error}
    </p>
  </div>

{/snippet}


<GridLine class="demopage-text-input">
  <h3 class="grid-span-6">Required value with container around input</h3>
  <InputWrapped areErrorsVisible={true} class="grid-span-3" validators={validators2} />
</GridLine>
<GridLine class="demopage-text-input">
  <h3 class="grid-span-6">Validator values tied to store</h3>
  <Input areErrorsVisible={true}
    class="grid-span-2"
    type="number"
    validators={validators4}
    bind:value={valueWithinBoundaries} />
</GridLine>
<GridLine class="demopage-text-input">
  <h4 class="grid-span-1 grid-start-7">
    Lower
  </h4>
  <Input class="grid-span-2" type="number" bind:value={lowerBoundary} />
  <h4 class="grid-span-1">
    Upper
  </h4>
  <Input class="grid-span-2" type="number" bind:value={upperBoundary} />
</GridLine>
<GridLine class="demopage-text-input">
  <h3 class="grid-span-6">Wrapped container with custom error display</h3>
  <InputWrapped areErrorsVisible={true}
    class="grid-span-6"
    error={errorElement}
    label="Date validator"
    isValidationPerformedOnLoad={true}
    validators={validators3}
    bind:value={boundDateValue} />
</GridLine>

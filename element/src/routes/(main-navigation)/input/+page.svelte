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

  import {
    TEXT_INPUT_TYPE_NUMBER,
  } from '$lib/types.js'

  import {
    inputElement,
  } from './input-element.svelte'

  import {
    formattedLabel,
  } from './formatted-label.svelte'

  import './input.css'

  let boundValue = $state(''),
    boundDateValue: string = $state(''),
    isDisabled = $state(false),
    deriveBase : number = $state(0),
    lowerBoundary: number = $state(0),
    upperBoundary: number = $state(10),
    valueWithinBoundaries: number = $state(5)

  let derived : string = $derived((deriveBase % 2 === 0) ? 'even' : 'odd')


  const validators = createFieldValidator([requiredValidator()])
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
    $state.snapshot(lowerBoundary)
    $state.snapshot(upperBoundary)
    untrack(() => {
      validators4.validate({value: valueWithinBoundaries})
    })
  })

  const classes = $state(['class1', 'class2', 'grid-span-4'])
  let condition: number = $state(0);
  const conditionalClasses = $state(['off', 'grid-span-4'])

  const changeDisabled = () => {
    isDisabled = !isDisabled
  }

  const addClass = () => {
    classes.push(Math.random().toString(36).substring(2, 6))
  }

  const switchClassCondition = () => {
    const index = conditionalClasses.indexOf((condition === 1) ? 'on' : 'off')
    condition = 1 - condition
    conditionalClasses.splice(index, 1, (condition === 1) ? 'on' : 'off')
  }
</script>

{#snippet errorElement(isValid: IsValid)}
  <div>
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
      Did the value change: {isValid.dirty} (TODO: Does not properly work)
    </p>
    <p>
      Error message: {isValid.message}
    </p>
    <p>
      Error code: {isValid.error}
    </p>
  </div>

{/snippet}

<h2>Text input</h2>
<h3>Simple input</h3>
<Input />
<h3>Disabled input</h3>
<Input isDisabled={true}/>
<h3>Exact width</h3>
<Input visibleWidth="300px"/>
<h3>Exact width in characters - width ratio os based on letter M, which is the widest</h3>
<Input visibleWidth="9ch" value="MMMM-MMMM"/>
<Input visibleWidth="9ch" value="....-...."/>
<Input visibleWidth="10ch" value="0123456789"/>
<Input visibleWidth="2ch" value="00"/>
<Input visibleWidth="1.5ch" value="11"/>
<h3>Formatted label</h3>
<Input label={formattedLabel} />
<GridLine>
  <Input label="Input text using grid line and label" class="grid-span-4" labelClass="grid-span-6"/>
</GridLine>
<GridLine>
  <h3 class="grid-span-6">Simple input with bound value</h3>
  <Input class="color1 size3 grid-span-3" bind:value={boundValue}/>
  <div class="grid-span-3">Bound value: `{boundValue}`</div>
</GridLine>
<GridLine>
  <h3 class="grid-span-6">Control disabled state</h3>
  <Input class="color1 size3 grid-span-3" bind:isDisabled={isDisabled}/>
  <input type="button" value="Switch condition" class="grid-span-2" onclick={changeDisabled}>
</GridLine>
<GridLine>
  <h3 class="grid-span-6">Derived data</h3>
  <Input class="color1 size3 grid-span-3" bind:value={deriveBase} type={TEXT_INPUT_TYPE_NUMBER} />
  <span class="grid-span-3">{derived}</span>
</GridLine>
<GridLine>
  <h3 class="grid-span-6">Simple input with classes</h3>
  <Input class="color1 size3 grid-span-3"/>
</GridLine>
<GridLine>
  <h3 class="grid-span-6">Simple input with dynamic classes</h3>
  <Input class={classes}/>
</GridLine>
<GridLine class="demopage-text-input">
  <input type="button" value="Add Class" class="grid-span-6" onclick={addClass}>
  <span class="grid-span-6">{classes.join(', ')}</span>
</GridLine>
<GridLine class="demopage-text-input">
  <h3 class="grid-span-6">Conditional classes</h3>
  <Input class={conditionalClasses} />
</GridLine>
<GridLine class="demopage-text-input">
  <input type="button" value="Switch condition" class="grid-span-6" onclick={switchClassCondition}>
  <span class="grid-span-6">{conditionalClasses.join(', ')}</span>
</GridLine>
<GridLine class="demopage-text-input">
  <h3 class="grid-span-6">Required value</h3>
  <Input areErrorsVisible={true} class="grid-span-3" {validators} />
</GridLine>
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
  <h3 class="grid-span-6">Wrapped container with custom input</h3>
  <InputWrapped class="grid-span-3" input={inputElement} />
</GridLine>
<GridLine class="demopage-text-input">
  <h3 class="grid-span-6">Wrapped container with custom input but value overwrite</h3>
  <InputWrapped class="grid-span-3" input={inputElement} value="This is the value from the wrapper"/>
</GridLine>
<GridLine class="demopage-text-input">
  <h3 class="grid-span-6">Wrapped container with sinmple label passthrough</h3>
  <InputWrapped class="grid-span-3" input={inputElement} label="This is passed to the custom component"/>
</GridLine>
<GridLine class="demopage-text-input">
  <h3 class="grid-span-6">Wrapped container with formatted label passthrough</h3>
  <InputWrapped class="grid-span-3" input={inputElement} label={formattedLabel}/>
</GridLine>
<GridLine class="demopage-text-input">
  <h3 class="grid-span-6">Wrapped container with custom error display</h3>
  <InputWrapped areErrorsVisible={true}
    class="grid-span-3"
    error={errorElement}
    label="Date validator"
    validateWhenLoaded={true}
    validators={validators3}
    bind:value={boundDateValue} />
</GridLine>
<form>
  <GridLine class="demopage-text-input">
    <h3 class="grid-span-9">If text inputs are in a form tabbing filling out one goes to the next</h3>
    <Input class="grid-span-3"/>
  </GridLine>
  <GridLine class="demopage-text-input">
    <Input class="grid-span-3" labelClass="grid-span-3" label="Form input 2"/>
    <Input class="grid-span-3" labelClass="grid-span-3" label="Form input 3"/>
  </GridLine>
  <GridLine class="demopage-text-input">
    <Input class="grid-span-3" labelClass="grid-span-3" label="Form input 4"/>
    <input type="button" class="grid-span-3 grid-start-10" value="Submit dummy"/>
  </GridLine>
</form>
<GridLine class="demopage-text-input">
  <h3 class="grid-span-6">Text input using a mask</h3>
  <Input class="grid-span-3"/>
</GridLine>
<script lang="ts">
  import {
    createFieldValidator,
    requiredValidator,
  } from '@sveadmin/common'

  import {
    GridLine,
  } from '$lib/grid/index.js'

  import {
    TextInput,
    type TextInputProps,
    TextInputWrapped,
    INPUT_TYPE_NUMBER,
  } from '$lib/text-input/index.js'
  


  import './text-input.css'

  let boundValue = $state('')
  let isDisabled = $state(false)
  let deriveBase : number = $state(0)
  let derived : string = $derived((deriveBase % 2 === 0) ? 'even' : 'odd')

  const validators = createFieldValidator([requiredValidator()])
  const validators2 = createFieldValidator([requiredValidator()]) //If the same instance is used, the two validator gets updated by both inputs

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

{#snippet formattedLabel()}
<h4>Formatted label</h4>
<div>with some extra information</div>
{/snippet}

{#snippet inputElement(properties: TextInputProps)}
<TextInput
  {...properties}
  style="border-style:dotted;"
  value={properties.value || "Value from the Snippet"} />
{/snippet}

<h2>Text input</h2>
<h3>Simple input</h3>
<TextInput />
<h3>Disabled input</h3>
<TextInput isDisabled={true}/>
<h3>Simple label</h3>
<TextInput label="Unformatted label"/>
<h3>Formatted label</h3>
<TextInput label={formattedLabel} />
<GridLine>
  <TextInput label="Input text using grid line and label" class="grid-span-4" labelClass="grid-span-6"/>
</GridLine>
<GridLine>
  <h3 class="grid-span-6">Simple input with bound value</h3>
  <TextInput class="color1 size3 grid-span-3" bind:value={boundValue}/>
  <div class="grid-span-3">Bound value: `{boundValue}`</div>
</GridLine>
<GridLine>
  <h3 class="grid-span-6">Control disabled state</h3>
  <TextInput class="color1 size3 grid-span-3" bind:isDisabled={isDisabled}/>
  <input type="button" value="Switch condition" class="grid-span-2" onclick={changeDisabled}>
</GridLine>
<GridLine>
  <h3 class="grid-span-6">Derived data</h3>
  <TextInput class="color1 size3 grid-span-3" bind:value={deriveBase} type={INPUT_TYPE_NUMBER} />
  <span class="grid-span-3">{derived}</span>
</GridLine>
<GridLine>
  <h3 class="grid-span-6">Simple input with classes</h3>
  <TextInput class="color1 size3 grid-span-3"/>
</GridLine>
<GridLine>
  <h3 class="grid-span-6">Simple input with dynamic classes</h3>
  <TextInput class={classes}/>
</GridLine>
<GridLine class="demopage-text-input">
  <input type="button" value="Add Class" class="grid-span-6" onclick={addClass}>
  <span class="grid-span-6">{classes.join(', ')}</span>
</GridLine>
<GridLine class="demopage-text-input">
  <h3 class="grid-span-6">Conditional classes</h3>
  <TextInput class={conditionalClasses} />
</GridLine>
<GridLine class="demopage-text-input">
  <input type="button" value="Switch condition" class="grid-span-6" onclick={switchClassCondition}>
  <span class="grid-span-6">{conditionalClasses.join(', ')}</span>
</GridLine>
<GridLine class="demopage-text-input">
  <h3 class="grid-span-6">Required value</h3>
  <TextInput areErrorsVisible={true} class="grid-span-3" {validators} />
</GridLine>
<GridLine class="demopage-text-input">
  <h3 class="grid-span-6">Required value with container around input</h3>
  <TextInputWrapped areErrorsVisible={true} class="grid-span-3" validators={validators2} />
</GridLine>
<GridLine class="demopage-text-input">
  <h3 class="grid-span-6">Wrapped container with custom input</h3>
  <TextInputWrapped class="grid-span-3" input={inputElement} />
</GridLine>
<GridLine class="demopage-text-input">
  <h3 class="grid-span-6">Wrapped container with custom input but value overwrite</h3>
  <TextInputWrapped class="grid-span-3" input={inputElement} value="This is the value from the wrapper"/>
</GridLine>
<GridLine class="demopage-text-input">
  <h3 class="grid-span-6">Wrapped container with sinmple label passthrough</h3>
  <TextInputWrapped class="grid-span-3" input={inputElement} label="This is passed to the custom component"/>
</GridLine>
<GridLine class="demopage-text-input">
  <h3 class="grid-span-6">Wrapped container with formatted label passthrough</h3>
  <TextInputWrapped class="grid-span-3" input={inputElement} label={formattedLabel}/>
</GridLine>
<form>
  <GridLine class="demopage-text-input">
    <h3 class="grid-span-9">If text inputs are in a form tabbing filling out one goes to the next</h3>
    <TextInput class="grid-span-3"/>
  </GridLine>
  <GridLine class="demopage-text-input">
    <TextInput class="grid-span-3" labelClass="grid-span-3" label="Form input 2"/>
    <TextInput class="grid-span-3" labelClass="grid-span-3" label="Form input 3"/>
  </GridLine>
  <GridLine class="demopage-text-input">
    <TextInput class="grid-span-3" labelClass="grid-span-3" label="Form input 4"/>
    <input type="button" class="grid-span-3 grid-start-10" value="Submit dummy"/>
  </GridLine>
</form>
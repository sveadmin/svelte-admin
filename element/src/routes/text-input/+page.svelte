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
    INPUT_TYPE_NUMBER,
  } from '$lib/text-input/index.js'
  


  import './text-input.css'

  let boundValue = $state('')
  let isDisabled = $state(false)
  let deriveBase : number = $state(0)
  let derived : string = $derived((deriveBase % 2 === 0) ? 'even' : 'odd')

  const validators = createFieldValidator([requiredValidator()])

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
<h2>Text input</h2>
<h3>Simple input</h3>
<TextInput />
<h3>Disabled input</h3>
<TextInput isDisabled={true}/>
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
  <TextInput {validators} />
</GridLine>
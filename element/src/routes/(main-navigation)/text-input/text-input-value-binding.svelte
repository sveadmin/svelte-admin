<script lang="ts">
  import {
    GridLine,
  } from '$lib/grid/index.js'

  import {
    TEXT_INPUT_TYPE_NUMBER,
  } from '$lib/types.js'

  import {
    TextInput,
    TextInputWrapped,
  } from '$lib/text-input/index.js'

  let boundValue = $state('')
  let boundPlaceholder = $state('Change me!')
  let isDisabled = $state(false)
  let deriveBase : number = $state(0)
  let derived : string = $derived((deriveBase % 2 === 0) ? 'even' : 'odd')

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

<GridLine>
  <h3 class="grid-span-6">Simple input with bound value</h3>
  <TextInput class="grid-span-3" bind:value={boundValue}/>
  <div class="grid-span-3">Bound value: `{boundValue}`</div>
</GridLine>
<GridLine>
  <h3 class="grid-span-6">Control disabled state</h3>
  <TextInput class="grid-span-3" bind:isDisabled={isDisabled}/>
  <input type="button" value="Switch condition" class="grid-span-2" onclick={changeDisabled}>
</GridLine>
<GridLine>
  <h3 class="grid-span-6">Placeholder can be bound</h3>
  <TextInput class="grid-span-3" value="" bind:placeholder={boundPlaceholder}/>
  <TextInput class="grid-span-3" bind:value={boundPlaceholder} placeholder="Placeholder for the other input"/>
</GridLine>
<GridLine>
  <h3 class="grid-span-6">Derived data</h3>
  <TextInput class="grid-span-3" bind:value={deriveBase} type={TEXT_INPUT_TYPE_NUMBER} />
  <span class="grid-span-3">{derived}</span>
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
<GridLine>
  <h3 class="grid-span-6">Bound placeholder works with wrapped element</h3>
  <TextInputWrapped class="grid-span-3" value="" bind:placeholder={boundPlaceholder}/>
  <TextInput class="grid-span-3" bind:value={boundPlaceholder} placeholder="Placeholder for the other input"/>
</GridLine>
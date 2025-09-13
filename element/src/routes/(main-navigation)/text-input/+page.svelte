<script lang="ts">
  import {
    createFieldValidator,
    requiredValidator,
  } from '@sveadmin/common'

  import {
    GridLine,
  } from '$lib/grid/index.js'

  import {
    SIZE_SMALL,
    SIZE_LARGE,
    SIZE_EXTRA_LARGE,
    TEXT_INPUT_TYPE_NUMBER,
  } from '$lib/types.js'

  import {
    TextInput,
    type TextInputProps,
    TextInputWrapped,
  } from '$lib/text-input/index.js'
  


  import './text-input.css'

  let boundValue = $state('')
  let boundPlaceholder = $state('Change me!')
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

{#snippet inputElement(properties: TextInputProps)}
<TextInput
  {...properties}
  style="border-style:dotted;"
  value={properties.value || "Value from the Snippet"} />
{/snippet}

<h2>Text input</h2>
<h3>Simple input</h3>
<TextInput />
<h3>Simple input small</h3>
<TextInput size={SIZE_SMALL} />
<h3>Simple input large</h3>
<TextInput size={SIZE_LARGE} />
<h3>Simple input extra large</h3>
<TextInput size={SIZE_EXTRA_LARGE} />
<h3>Disabled input</h3>
<TextInput isDisabled={true}/>
<h3>Exact width</h3>
<TextInput visibleWidth="300px"/>
<h3>Exact width in characters - width ratio os based on letter M, which is the widest</h3>
<TextInput visibleWidth="9ch" value="MMMM-MMMM"/>
<TextInput visibleWidth="9ch" value="....-...."/>
<TextInput visibleWidth="10ch" value="0123456789"/>
<TextInput visibleWidth="2ch" value="00"/>
<TextInput visibleWidth="1.5ch" value="11"/>
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
  <h3 class="grid-span-6">Simple input with placeholder</h3>
  <TextInput class="grid-span-3" value="" placeholder="Put here anything"/>
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
  <h3 class="grid-span-6">Wrapped container with custom input</h3>
  <TextInputWrapped class="grid-span-3" input={inputElement} />
</GridLine>
<GridLine class="demopage-text-input">
  <h3 class="grid-span-6">Wrapped container with custom input but value overwrite</h3>
  <TextInputWrapped class="grid-span-3" input={inputElement} value="This is the value from the wrapper"/>
</GridLine>
<GridLine class="demopage-text-input">
  <h3 class="grid-span-6">Wrapped container with placeholder</h3>
  <TextInputWrapped class="grid-span-3" value="" placeholder="Using Sveadmin placeholder"/>
  <h3 class="grid-span-6">Small wrapped container with placeholder</h3>
  <TextInputWrapped class="grid-span-3" value="" placeholder="Using Sveadmin placeholder" size={SIZE_SMALL}/>
  <h3 class="grid-span-6">Large wrapped container with placeholder</h3>
  <TextInputWrapped class="grid-span-4" value="" placeholder="Using Sveadmin placeholder" size={SIZE_LARGE}/>
  <h3 class="grid-span-6">Etra large wrapped container with placeholder</h3>
  <TextInputWrapped class="grid-span-5" value="" placeholder="Using Sveadmin placeholder" size={SIZE_EXTRA_LARGE}/>
</GridLine>
<GridLine>
  <h3 class="grid-span-6">Bound placeholder works with wrapped element</h3>
  <TextInputWrapped class="grid-span-3" value="" bind:placeholder={boundPlaceholder}/>
  <TextInput class="grid-span-3" bind:value={boundPlaceholder} placeholder="Placeholder for the other input"/>
</GridLine>
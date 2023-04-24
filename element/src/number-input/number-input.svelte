<script lang="ts">
  import { createEventDispatcher } from 'svelte'
  import {
    createFieldValidator,
    ValidatorStore,
  } from '@sveadmin/common'

  import { NumberDisplay } from '../main'
  import { focusNext } from '../helper/'

  const dispatch = createEventDispatcher();

  export let data = {},
    decimals: number = 2,
    digits: number = 7,
    editor: boolean = false,
    id: string = 'number-input',
    thousandSeparator: number = 3,
    validators: ValidatorStore = createFieldValidator([]), //To be able to read the errros supply an empty validator
    value: string | number = ''

  const { validate } = validators

  export const validateValue = () => {
    validate({value})
  }
  
  const init = (el: HTMLElement) => {
    el.focus()
  }

  const openEditor = () => {
    editor = true
  }

  const closeEditor = (newValue: string | number) => {
    value = newValue
    editor = false
  }

  const onChange = (event: Event) => {
    const target = event.target as HTMLInputElement
    const newValue = target.value
    validate({value: newValue})
    dispatch('change', event)
  }

  const onBlur = (event: Event) => {
    const target = event.target as HTMLInputElement
    const newValue = target.value
    validate({value: newValue})
    if (editor) {
      closeEditor(newValue)
    }
    dispatch('blur', event)
  }

  const inputKeyUp = (event: KeyboardEvent) => {
    const target = event.target as HTMLInputElement
    const newValue = target.value
    const keyCode = event.code
    if (keyCode === 'Enter') {
      closeEditor(newValue)
      focusNext(target)
    }
    if (keyCode === 'Escape') {
      target.value = target.dataset.original // This is required as on blur there is no time for the rendering phase to change the target value before the element is removed
      closeEditor(newValue)
    }
  }

</script>

{#if editor}
  <input
    class="digitEditor"
    data-original={value}
    {id}
    on:keyup={inputKeyUp}
    on:change={onChange}
    on:blur={onBlur}
    type="number"
    use:init
    {value} />
{:else}
  <NumberDisplay
    bind:value
    {decimals}
    {digits}
    on:click={openEditor}
    on:focus={openEditor}
    {thousandSeparator} />
{/if}

<style global src="./number-input.css"></style>
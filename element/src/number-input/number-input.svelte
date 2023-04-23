<script lang="ts">
  import { createEventDispatcher } from 'svelte'
  import { readable } from 'svelte/store'
  import { NumberDisplay } from '../'
  import { focusNext } from './helper'

  const dispatch = createEventDispatcher();

  export let id, data = {}, value = '', digits = 7, decimals = 2, thousandSeparator = 3, validators = {},
    editor = false

  const { validity = readable({valid: true}), validate = () => {return {valid: true}} } = validators

  export const validateValue = () => {
    validate(value, false, data)
  }
  
  // validity.subscribe((validity) => {
  //   dispatch('errorMessage', {
  //     id,
  //     validity
  //   })
  // })

  const init = (el) => {
    el.focus()
  }

  const openEditor = () => {
    editor = true
  }

  const closeEditor = (newValue) => {
    value = newValue
    editor = false
  }

  const onChange = (event) => {
    validate(event.target.value, false, data)
    dispatch('change', event)
  }

  const onBlur = (event) => {
    validate(event.target.value, false, data)
    if (editor) {
      closeEditor(event.target.value)
    }
    dispatch('blur', event)
  }

  const inputKeyUp = (event) => {
    if (event.detail.keyCode === 13) {
      closeEditor(event.target.value)
      focusNext(event.target)
    }
    if (event.detail.keyCode === 27) {
      event.target.value = event.target.dataset.original // This is required as on blur there is no time for the rendering phase to change the target value before the element is removed
      closeEditor(event.target.value)
    }
  }

</script>

{#if editor}
  <input
    type="number"
    class="digitEditor"
    on:keyup={inputKeyUp}
    on:change={onChange}
    on:blur={onBlur}
    {value}
    data-original={value}
    use:init />
{:else}
  <NumberDisplay
    bind:value
    {digits}
    {decimals}
    {thousandSeparator}
    on:click={openEditor}
    on:focus={openEditor} />
{/if}

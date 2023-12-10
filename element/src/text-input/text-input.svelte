<script lang="ts">
  import {
    createEventDispatcher,
    onMount,
  } from 'svelte'
  import {
    createFieldValidator,
    ValidatorStore,
  } from '@sveadmin/common'

  import {
    INPUT_TYPE_PASSWORD,
    INPUT_TYPE_TEXT,
  } from './types.js'

  import { focusNext } from '../helper/index.js'

  const dispatch = createEventDispatcher();
  export let getValue: {() : string} = null,
    id: string = 'text-input',
    setFocus: boolean = false,
    type: string = INPUT_TYPE_TEXT,
    validateWhileTyping: boolean = true,
    validators: ValidatorStore = createFieldValidator([]),
    value: string = ''

  const { validate } = validators

  export const validateValue = () => {
    validate({value})
  }
  
  const init = (el: HTMLElement) => {
    if (setFocus) {
      el.focus()
    }
  }

  const inputKeyUp = (event: KeyboardEvent) => {
    const target = event.target as HTMLInputElement
    const key = event.key
    if (key === 'Enter') {
      focusNext(target)
    }
    if (validateWhileTyping
      && key !== 'Enter'
      && key !== 'Escape') {
      validate({value: target.value})
    }
    dispatch('keyup', event)
  }

  const onChange = (event: Event) => {
    const target = event.target as HTMLInputElement

    validate({value: target.value})
    dispatch('change', event)
  }

  const onBlur = (event: Event) => {
    const target = event.target as HTMLInputElement
    validate({value : target.value})
    dispatch('blur', event)
  }

  onMount(() => {
    if (typeof getValue === 'function') {
      value = getValue()
    }
  })

</script>

{#if type === INPUT_TYPE_PASSWORD}
  <input
    id={id}
    on:keyup={inputKeyUp}
    on:change={onChange}
    on:blur={onBlur}
    type="password"
    use:init
    bind:value >
{:else}
  <input
    id={id}
    on:keyup={inputKeyUp}
    on:change={onChange}
    on:blur={onBlur}
    type="text"
    use:init
    bind:value >
{/if}
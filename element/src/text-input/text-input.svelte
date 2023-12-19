<script lang="ts">
  import {
    createEventDispatcher,
    onMount,
  } from 'svelte'
  import {
    createFieldValidator,
    ValidatorStore,
  } from '@sveadmin/common'

  import { focusNext } from '../helper/index.js'

  const dispatch = createEventDispatcher();
  export let getValue: {() : string} = null,
    classList: string = $$restProps.class || '',
    id: string = 'text-input',
    setFocus: boolean = false,
    style: string = '',
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

<input
  class={classList}
  id={id}
  on:keyup={inputKeyUp}
  on:change={onChange}
  on:blur={onBlur}
  {style}
  type="text"
  use:init
  bind:value >
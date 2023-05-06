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
  export let data = {},
    getValue: {() : string} = null,
    id: string = 'text-input',
    setFocus: boolean = false,
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
    const keyCode = event.code
    if (keyCode === 'Enter') {
      focusNext(target)
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
  id={id}
  on:keyup={inputKeyUp}
  on:change={onChange}
  on:blur={onBlur}
  type="text"
  use:init
  bind:value >
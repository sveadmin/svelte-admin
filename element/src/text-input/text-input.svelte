<script lang="ts">
  import { createEventDispatcher } from 'svelte'
  import { readable } from 'svelte/store';
  import { focusNext } from './helper'

  const dispatch = createEventDispatcher();
  export let id, data = {}, value = '', setFocus = false, validators = {}

  const { validity = readable({valid: true}), validate = () => {return {valid: true}} } = validators

  export const validateValue = () => {
    validate(value, false, data)
  }
  
  // validity.subscribe(validity => {
  //   dispatch('errorMessage', {
  //     id,
  //     validity
  //   })
  // })

  const init = el => {
    if (setFocus) {
      el.focus()
    }
  }

  const inputKeyUp = event => {
    if (event.keyCode === 13) {
      focusNext(event.target)
    }
    dispatch('keyup', event)
  }

  const onChange = event => {
    validate(event.target.value, false, data)
    dispatch('change', event)
  }

  const onBlur = event => {
    validate(event.target.value, false, data)
    dispatch('blur', event)
  }

</script>
<input
  id={id}
  type="text"
  bind:value
  on:keyup={inputKeyUp}
  on:change={onChange}
  on:blur={onBlur}
  use:init >
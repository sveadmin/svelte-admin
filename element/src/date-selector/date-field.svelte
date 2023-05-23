<script lang="ts">
  import {
    focusNext
  } from '../helper/index.js'

  import {
    noop,
  } from 'svelte/internal'

  import {
    TYPE_IN__DAY,
    TYPE_IN__HOUR_12,
    TYPE_IN__HOUR_24,
    TYPE_IN__MINUTE,
    TYPE_IN__MONTH_SHORT,
    TYPE_IN__SECOND,
    TYPE_IN__YEAR_FULL,
    TYPE_IN__YEAR_SHORT,
    TypeIn,
  } from './types.js'

  export let max: number = null,
    maxLength: number = 2,
    min: number = null,
    onBlur: (event: Event) => void = noop,
    onFocus: (event: Event) => void = noop,
    type: TypeIn = null,
    value: string = ''

  let instance: HTMLInputElement

  export const setValue = (newValue: string) : void => {
    value = newValue
  }

  const onKeyUp = (event: KeyboardEvent) => {
    const target = event.target as HTMLInputElement
    if (target !== instance) {
      return
    }
    switch (event.key) {
      case 'Tab': //Shift Tab will also be handled, and allowed to bubble up
        return
      case 'ArrowUp':
        value = (parseInt(value) + 1).toString()
        return
      case 'ArrowDown':
        value = (parseInt(value) - 1).toString()
        return
      case 'Enter':
        focusNext(target)
    }
    if (target.value.length >= maxLength) {
      focusNext(target)
    }
  }

  if (type) {
    switch (type) {
      case TYPE_IN__DAY:
        min = 1
        max = 31
        break;
      case TYPE_IN__HOUR_24:
        min = 1
        max = 24
        break;
      case TYPE_IN__MINUTE:
      case TYPE_IN__SECOND:
        min = 0
        max = 59
        break;
      case TYPE_IN__MONTH_SHORT:
      case TYPE_IN__HOUR_12:
        min = 1
        max = 12
        break;
      case TYPE_IN__YEAR_FULL:
        maxLength = 4
        break;
      case TYPE_IN__YEAR_SHORT:
        min = 0
        max = 99
        break;
    }
  }


</script>

<input
  class="dateTypeIn"
  class:double={maxLength > 2}
  inputmode="numeric"
  {max}
  {min}
  on:blur={onBlur}
  on:focus={onFocus}
  on:keyup={onKeyUp}
  bind:this={instance}
  {value} />
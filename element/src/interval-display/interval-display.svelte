<script lang="ts">
  import { beforeUpdate, createEventDispatcher } from 'svelte'
  import { prepareGetIntervalString } from './helper/index.js'

  export let isHighlighted: boolean = false,
    prefix: string = '',
    postfix: string = '',
    secondsDenominator: number = 1,
    value: number

  const dispatch = createEventDispatcher();
  const getIntervalString = prepareGetIntervalString(
    prefix,
    postfix,
    secondsDenominator
  )

  const onClick = (event: Event) => {
    if (event instanceof KeyboardEvent
      && event.key !== 'Enter') {
      return
    }

    dispatch('click', event.target)
  }

  let displayValue: string = ''

  beforeUpdate(() => {
    const absValue = Math.abs(value)

    displayValue = getIntervalString(absValue)
  })

</script>
{#if value !== null}
  <div on:click={onClick} on:keyup={onClick} class:highlight={isHighlighted}>{displayValue}</div>
{/if}
<script lang="ts">
  import dateFormat from 'dateformat'
  import { beforeUpdate, createEventDispatcher } from 'svelte'
  import { prepareGetDateIntervalString } from './helper/index.js'

  export let displayInterval: boolean = true,
    format: string = 'yyyy-mm-dd HH:MM',
    isHighlighted: ((currentDiff: number) => boolean) = () => false,
    prefix: ((diff: number) => string) = (diff: number) => '',
    postfix: ((diff: number) => string) = (diff: number) => '',
    refreshAt: number = 0,
    secondsDenominator: number = 1000,
    value: null | Date | string

  let currentDiff: number = 0,
    date: Date | null,
    displayValue: string = '',
    interval: number = 0

  const dispatch = createEventDispatcher();

  const dateIntervalString = prepareGetDateIntervalString(
    prefix,
    postfix,
    secondsDenominator
  )

console.log(isHighlighted)

  const updateDiff = () => {
    if (!date) {
      return
    }
    currentDiff = Date.now() - date.getTime()

    const absValue = Math.abs(currentDiff)

    displayValue = (displayInterval)
      ? dateIntervalString(absValue, currentDiff)
      : dateFormat(date, format)

    if (interval === 0
      && refreshAt > 0) {
      interval = window.setInterval(updateDiff, refreshAt)
    }
  }

  const onClick = (event: Event) => {
    if (event instanceof KeyboardEvent
      && event.key !== 'Enter') {
      return
    }

    displayInterval = !displayInterval

    updateDiff()

    dispatch('click', event.target)
  }

  beforeUpdate(() => {
    if (value === null) {
      date = null
      return
    }
    date = (value instanceof Date)
      ? value
      : new Date(value)

    updateDiff()
  })

</script>
{#if value !== null}
  <div class:highlight={isHighlighted(currentDiff)}
    on:click={onClick}
    on:keyup={onClick} >
    {displayValue}
  </div>
{/if}
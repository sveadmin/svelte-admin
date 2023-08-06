<script lang="ts">
  import dateFormat from 'dateformat'
  import { beforeUpdate, createEventDispatcher } from 'svelte'

  import {
    prepareGetDateIntervalString,
  } from './helper/index.js'
  
  import {
    DateIntervalDictionary,
    DISPLAY_INTERVAL_DATE,
    DISPLAY_INTERVAL_INTERVAL,
  } from './types.js'

  export let displayMode: string = DISPLAY_INTERVAL_INTERVAL,
    format: string = 'yyyy-mm-dd HH:MM',
    isHighlighted: ((currentDiff: number) => boolean) = () => false,
    dateIntervalDictionary: DateIntervalDictionary = null,
    refreshAt: number = 0,
    secondsDenominator: number = 1000,
    value: null | Date | string

  let currentDiff: number = 0,
    date: Date | null,
    displayValue: string = '',
    interval: number = 0

  const dispatch = createEventDispatcher();

  const dateIntervalString = prepareGetDateIntervalString(
    dateIntervalDictionary,
    secondsDenominator
  )

  const updateDiff = () => {
    if (!date) {
      return
    }
    currentDiff = date.getTime() - Date.now()

    const absValue = Math.abs(currentDiff)

    displayValue = (displayMode === DISPLAY_INTERVAL_INTERVAL)
      ? dateIntervalString(absValue, currentDiff < 0)
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

    displayMode = (displayMode === DISPLAY_INTERVAL_INTERVAL)
      ? DISPLAY_INTERVAL_DATE
      : DISPLAY_INTERVAL_INTERVAL

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
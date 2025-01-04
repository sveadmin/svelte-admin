<script lang="ts">
  import {
    DateDisplay,
  } from '$lib/date-display/index.js'
  
  import {
    DISPLAY_INTERVAL_DATE,
    DISPLAY_INTERVAL_INTERVAL,
  } from './types.js'
  
  import type {
    DateIntervalDisplayProps,
  } from './types.js'

  const {
    dateTimeFormat = 'yyyy-mm-dd HH:MM:ss',
    displayMode: string = DISPLAY_INTERVAL_INTERVAL,
    intervalFormat = 'III',
    ...passthrough
  } : DateIntervalDisplayProps = $props()

  let displayAs = $state(DISPLAY_INTERVAL_INTERVAL)

  // let date: Date | null = $derived.by(() => {
  //   if (value === null) {
  //     return null
  //   }
  //   return (value instanceof Date)
  //     ? value
  //     : new Date(value)
  // })

  // let currentDiff: number = 0,
  //   date: Date | null,
  //   displayValue: string = '',
  //   interval: number = 0

  // const dispatch = createEventDispatcher();

  // const dateIntervalString = prepareGetDateIntervalString(
  //   dateIntervalDictionary,
  //   secondsDenominator
  // )

  // const updateDiff = () => {
  //   if (!date) {
  //     return
  //   }
  //   currentDiff = date.getTime() - Date.now()

  //   if (isNaN(currentDiff)) {
  //     displayValue = ''
  //     return
  //   }

  //   const absValue = Math.abs(currentDiff)

  //   displayValue = (displayMode === DISPLAY_INTERVAL_INTERVAL)
  //     ? dateIntervalString(absValue, currentDiff < 0)
  //     : dateFormat(date, format)

  //   if (interval === 0
  //     && refreshAt > 0) {
  //     interval = window.setInterval(updateDiff, refreshAt)
  //   }
  // }

  const onClick = (event: Event) => {
    if (event instanceof KeyboardEvent
      && event.key !== 'Enter') {
      return
    }

    displayAs = (displayAs === DISPLAY_INTERVAL_INTERVAL)
      ? DISPLAY_INTERVAL_DATE
      : DISPLAY_INTERVAL_INTERVAL
  }

  // beforeUpdate(() => {
  //   if (value === null) {
  //     date = null
  //     return
  //   }
  //   date = (value instanceof Date)
  //     ? value
  //     : new Date(value)

  //   updateDiff()
  // })

console.log(intervalFormat, dateTimeFormat, displayAs, JSON.stringify(passthrough))

</script>

<span onclick={onClick} onkeyup={onClick} role="presentation">
  {#if displayAs === DISPLAY_INTERVAL_INTERVAL}
    <DateDisplay format={intervalFormat}
      {...passthrough} />
  {:else}
    <DateDisplay format={dateTimeFormat}
      {...passthrough} />
  {/if}
</span>
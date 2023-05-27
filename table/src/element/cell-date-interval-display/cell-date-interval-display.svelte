<script lang="ts">
  import {
    beforeUpdate,
  } from 'svelte'

  import {
    IntervalDisplay
  } from '@sveadmin/element'

  import dateFormat from 'dateformat'

  export let displayInterval: boolean = true,
    format: string = 'yyyy-mm-dd HH:MM',
    isHighlighted: ((currentDiff: number) => boolean) = () => false,
    prefix: string = '',
    postfix: string = '',
    secondsDenominator: number = 1000,
    updateInterval: number = 1000,
    value: string | Date
  
  let baseTime: Date,
    currentDiff = 0,
    interval = 0,
    validPrefix = '',
    validPostfix = ''

  const updateDiff = () => {
    currentDiff = Date.now() - baseTime.getTime()
    validPrefix = (currentDiff < 0) ? prefix : ''
    validPostfix = (currentDiff > 0) ? postfix : ''
  }

  beforeUpdate(() => {
    if (value === null) {
      return
    }
    baseTime = (value instanceof Date)
      ? value
      : new Date(value)
    if (interval === 0
        && updateInterval > 0) {
      interval = window.setInterval(updateDiff, updateInterval)
    } else {
      updateDiff()
    }
  })

  const showValue = () => {
    displayInterval = false
  }

  const showInterval = (event: Event) => {
    if (event instanceof KeyboardEvent
      && event.key !== 'Enter') {
      return
    }
    displayInterval = true
  }

</script>
{#if typeof value !== 'undefined'
  && value !== null}
  {#if displayInterval}
    <IntervalDisplay
      isHighlighted={isHighlighted(currentDiff)}
      prefix={validPrefix}
      postfix={validPostfix}
      {secondsDenominator}
      value={currentDiff}
      on:click={showValue} />
  {:else}
    <datacellcontent on:click={showInterval} on:keyup={showInterval} class="smallsize">
      {dateFormat(baseTime, format)}
    </datacellcontent>
  {/if}
{/if}
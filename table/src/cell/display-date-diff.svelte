<script>
  import { beforeUpdate } from 'svelte'
  import DisplayInterval from './display-interval.svelte'
  import dateFormat from 'dateformat'

  export let value, prefix = '', postfix = '', secondsDenominator = 1000,
            updateInterval = 1000, displayInterval = true, isHighlighted = () => false, format = 'yyyy-mm-dd HH:MM'
    let baseTime, currentDiff = 0, interval = 0, validPrefix = '', validPostfix = ''


  const updateDiff = () => {
    currentDiff = Date.now() - baseTime
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

  const showInterval = () => {
    displayInterval = true
  }

</script>
{#if typeof value !== 'undefined'
  && value !== null}
  {#if displayInterval}
    <DisplayInterval
      value={currentDiff}
      {secondsDenominator}
      prefix={validPrefix}
      postfix={validPostfix}
      isHighlighted={isHighlighted(currentDiff)}
      on:click={showValue} />
  {:else}
    <datacellcontent on:click={showInterval} class="smallsize">{dateFormat(baseTime, format)}</datacellcontent>
  {/if}
{/if}
<script lang="ts">
  import {
    noop,
  } from 'svelte/internal'

  import {
    DateIntervalDisplay,
  } from '@sveadmin/element'

  export let displayInterval: boolean = true,
    format: string = 'yyyy-mm-dd HH:MM',
    isHighlighted: ((currentDiff: number) => boolean) = () => false,
    onClick: (event: CustomEvent<EventTarget>) => void = noop,
    prefix: ((diff: number) => string) = (diff: number) => '',
    postfix: ((diff: number) => string) = (diff: number) => '',
    refreshAt: number = 0,
    secondsDenominator: number = 1000,
    value: string | Date
  
  let currentDiff = 0

</script>
{#if typeof value !== 'undefined'
  && value !== null}
  <DateIntervalDisplay
    {displayInterval}
    {format}
    {isHighlighted}
    {prefix}
    {postfix}
    {refreshAt}
    {secondsDenominator}
    {value}
    on:click={onClick} />
{/if}
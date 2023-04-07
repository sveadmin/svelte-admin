<script lang="ts">
  import { beforeUpdate } from 'svelte'
  import { noop } from 'svelte/internal'

  export let isHighlighted:boolean = false,
    onClicked: (event:Event) => void = noop,
    prefix:string = '',
    postfix:string = '',
    secondsDenominator:number = 1,
    value:number

  let displayValue: string = ''

  const getIntervalString = function (value: number) {
    const seconds = value / secondsDenominator
    const minutes = seconds / 60
    const hours = minutes / 60
    const days = hours / 24
    const weeks = days / 7
    const months = days / 30
    const years = months / 12

    switch (true) {
      case seconds < 2:
        return 'Now'
      case seconds < 60:
        return prefix + Math.floor(seconds) + ' seconds' + postfix
      case minutes < 2:
        return prefix + '1 minute' + postfix
      case minutes < 60:
        return prefix + Math.floor(minutes) + ' minutes' + postfix
      case hours < 2:
        return prefix + '1 hour' + postfix
      case hours < 24:
        return prefix + Math.floor(hours) + ' hours' + postfix
      case days < 2:
        return prefix + '1 day' + postfix
      case days < 7:
        return prefix + Math.floor(days) + ' days' + postfix
      case weeks < 2:
        return prefix + '1 week' + postfix
      case weeks < 4:
        return prefix + Math.floor(weeks) + ' weeks' + postfix
      case months < 2:
        return prefix + '1 month' + postfix
      case months < 12:
        return prefix + Math.floor(months) + ' months' + postfix
      case years < 2:
        return prefix + '1 year' + postfix
      default:
        return prefix + Math.floor(years) + ' years' + postfix
    }
  }

  beforeUpdate(() => {
    const absValue = Math.abs(value)

    displayValue = getIntervalString(absValue)
  })

</script>
{#if value !== null}
  <div on:click={onClicked} class:highlight={isHighlighted}>{displayValue}</div>
{/if}
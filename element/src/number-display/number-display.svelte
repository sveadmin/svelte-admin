<script lang="ts">
  import {
    beforeUpdate,
    createEventDispatcher
  } from 'svelte'

  import {
    prepareGetDecimals,
    prepareGetDigits,
  } from './helper/index.js'

  export let decimals: number = 2,
    digits: number = 7,
    thousandSeparator: number = 3,
    value: string | number = ''

  const dispatch = createEventDispatcher();
  const getDecimals = prepareGetDecimals(decimals)
  const getDigits = prepareGetDigits(digits)

  let decimalsArray: string[] = [],
    digitsArray: string[] = []

  beforeUpdate(() => {
    decimalsArray = getDecimals(value)
    digitsArray = getDigits(value)
  })

  const onClick = (event: Event) => {
    if (event instanceof KeyboardEvent
      && event.code !== 'Enter') {
      return
    }
    dispatch('click')
  }

  const onFocus = () => {
    dispatch('focus')
  }
</script>
<numbercontainer>
  {#each digitsArray as digit, index}
    <digit
      class:separator="{(digits - index) % thousandSeparator === 0}"
      on:click={onClick}
      on:keyup={onClick}
      >{digit}</digit><!--
  -->{/each}<!--
  -->{#if decimals > 0}<!--
    --><decimalseparator on:click={onClick} on:keyup={onClick}>.</decimalseparator><!--
    -->{#each decimalsArray as decimal, index}
        <decimal on:click={onClick} on:keyup={onClick}>{decimal}</decimal>
    {/each}
  {/if}
  <input class="focusCatcher" on:focus={onFocus}/>
</numbercontainer>

<style global src="./number-display.css"></style>

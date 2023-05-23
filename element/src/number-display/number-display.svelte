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
      && event.key !== 'Enter') {
      return
    }
    dispatch('click')
  }

  const onFocus = () => {
    dispatch('focus')
  }
</script>
<sveanumbercontainer>
  {#each digitsArray as digit, index}
    <sveadigit
      class:separator="{(digits - index) % thousandSeparator === 0}"
      on:click={onClick}
      on:keyup={onClick}
      >{digit}</sveadigit><!--
  -->{/each}<!--
  -->{#if decimals > 0}<!--
    --><sveadecimalseparator on:click={onClick} on:keyup={onClick}>.</sveadecimalseparator><!--
    -->{#each decimalsArray as decimal, index}
        <sveadecimal on:click={onClick} on:keyup={onClick}>{decimal}</sveadecimal>
    {/each}
  {/if}
  <input class="focusCatcher" on:focus={onFocus}/>
</sveanumbercontainer>

<style global src="./number-display.css"></style>

<script lang="ts">
  import {
    NumberDisplay
  } from '@sveadmin/element'

  export let
    digits: number = 7,
    decimals: number = 0,
    thousandSeparator: number = 3,
    value: number = null
</script>
{#if value}
  <sveadatacellcontent>
    <NumberDisplay
      {decimals}
      {digits}
      {thousandSeparator}
      {value} />
  </sveadatacellcontent>
{/if}
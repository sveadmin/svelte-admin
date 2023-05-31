<script lang="ts">
  import {
    onMount,
  } from 'svelte'

  export let getValue: {() : string} = null, 
  value: string = null;

  onMount(() => {
    if (!value
      && getValue) {
      value = getValue()
    }
  })

</script>
{#if value}
  <sveadatacellcontent>{value}</sveadatacellcontent>
{/if}
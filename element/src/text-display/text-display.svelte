<script lang="ts">
  import {
    onMount,
  } from 'svelte'

  export let getValue: {() : string} = null,
    value: string = ''

  onMount(() => {
    if (typeof getValue === 'function') {
      value = getValue()
    }
  })

</script>
{value}
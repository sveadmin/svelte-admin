<script lang="ts">
  import {
    onMount,
  } from 'svelte'

  export let classList: string = $$restProps.class || '',
    getValue: {() : string} = null,
    value: string = ''

  onMount(() => {
    if (typeof getValue === 'function') {
      value = getValue()
    }
  })

</script>
<span class={classList}>{value}</span>
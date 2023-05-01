
<script lang="ts">
  import {
    noop,
  } from 'svelte/internal'

  export let callback: (event : Event) => void = noop,
    icon: string = null,
    label: string = ''

  let style = ''

  if (icon) {
    style = `background-image: url('${icon}')`
  }
</script>

<button
  class:iconOnly={icon && label === ''}
  on:click={callback}
  on:keyup={callback}
  {style} >
  {label}
</button>


<style global src="./button.css"></style>

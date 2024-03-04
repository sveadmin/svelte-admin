
<script lang="ts">
  import {
    noop,
  } from 'svelte/internal'

  export let callback: (event : Event) => void = noop,
    classList: string = $$restProps.class || '',
    getDisabledStatus: () => boolean = () => false,
    icon: string = null,
    label: string = ''

  let style = ''
</script>

<button class="sveabutton {(icon)
    ? 'iconoir-' + icon
    : ''} {classList}"
  class:iconOnly={icon && label === ''}
  disabled={getDisabledStatus()}
  type="submit"
  on:click={callback}
  on:keyup={callback}
  {style}>
  {label}
</button>

<style global src="./button.css"></style>

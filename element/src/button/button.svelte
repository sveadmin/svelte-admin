
<script lang="ts">
  import {
    noop,
  } from '@sveadmin/common'

  export let callback: (event : Event) => void = noop,
    classList: string = $$restProps.class || '',
    isDisabled: () => boolean = () => false,
    icon: string = null,
    label: string = ''
</script>

<button class="sveabutton {(icon)
    ? 'iconoir-' + icon
    : ''} {classList}"
  class:iconOnly={icon && label === ''}
  disabled={isDisabled()}
  type="submit"
  on:click={callback}
  on:keyup={callback} >
  {label}
</button>

<style global src="./button.css"></style>

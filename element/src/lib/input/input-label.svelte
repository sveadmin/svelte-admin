<script lang="ts">
  import {
    normalizeArray,
  } from '$lib/helper/index.js'

  import type {
    InputLabelProps,
  } from './types.js'

  let {
    class: classList = $bindable([]),
    id,
    label,
    style = $bindable([]),
  } : InputLabelProps = $props()

  let classes: string[] = $state(normalizeArray(classList, ' ')),
    styles: string[] = $state(normalizeArray(style, ';'))
</script>

<label 
  class={classes.join(' ')}
  for={id}
  style={styles.join(';')} >
  {#if typeof label === 'function'}
    {@render label()}
  {:else}
    {label}
  {/if}
</label>
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
    isOptionalHintDisplayed = false,
    isRequired = false,
    isRequiredHintDisplayed = true,
    label,
    style = $bindable([]),
  } : InputLabelProps = $props()

  let classes: string[] = $derived(normalizeArray(classList, ' ')),
    styles: string[] = $derived(normalizeArray(style, ';'))
</script>

<label 
  class={classes.join(' ')}
  for={id}
  style={styles.join(';')} >
  {#if typeof label === 'function'}
    {@render label()}
  {:else}
    {label}
    {#if isRequiredHintDisplayed
      && isRequired}
      <span aria-hidden="true">*</span>
    {/if}
    {#if isOptionalHintDisplayed
      && !isRequired}
      <span aria-hidden="true">(optional)</span>
    {/if}
  {/if}
</label>
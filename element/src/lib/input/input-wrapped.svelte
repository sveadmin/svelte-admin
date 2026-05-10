<script lang="ts">
  // @ts-ignore: This is a functioning and correct import, sometimes TS does not understand svelte files
  import Input from './input.svelte'

  import {
    propertyMerger,
    normalizeArray,
  } from '$lib/helper/index.js'

  import type {
    InputWrappedProps,
  } from './types.js'

  let {
    childrenClass,
    childrenConfig,
    childrenStyle,
    class: classList = $bindable([]),
    input,
    style = $bindable([]),
    value = $bindable(''),
    ...passthrough
  } : InputWrappedProps = $props()

  let classes: string[] = $derived(normalizeArray(classList, ' ')),
    styles: string[] = $derived(normalizeArray(style, ';'))

  let configParsed = $derived(propertyMerger(
    childrenConfig?.input,
    childrenConfig?.[0],
    {
      class: childrenClass,
      style: childrenStyle,
    },
    passthrough
  ))
</script>

<inputcontainer
  class={classes.join(' ')}
  style={styles.join(';')}>
  {#if input}
    {@render input(configParsed)}
  {:else}
    <Input {...configParsed}
      bind:value />
  {/if}
</inputcontainer>

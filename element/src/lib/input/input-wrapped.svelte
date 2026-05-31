<script lang="ts">
  // @ts-ignore: This is a functioning and correct import, sometimes TS does not understand svelte files
  import Input from './input.svelte'

  import {
    mergeClasses,
    mergeProperties,
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
    isLabelVisible = $bindable(true),
    style = $bindable([]),
    value = $bindable(''),
    ...passthrough
  } : InputWrappedProps = $props()

  let localClasses : string[] = $derived.by(() => {
    return (isLabelVisible)
      ? ['withLabel']
      : []
  })

  let classes: string[] = $derived(mergeClasses(
      normalizeArray(classList, ' '),
      localClasses
    )),
    styles: string[] = $derived(normalizeArray(style, ';'))

  let configParsed = $derived(mergeProperties(
    childrenConfig?.input,
    childrenConfig?.[0],
    {
      class: childrenClass,
      isLabelVisible,
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

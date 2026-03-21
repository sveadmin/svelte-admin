<script lang="ts">
  // @ts-ignore: This is a functioning and correct import, sometimes TS does not understand svelte files
  import Cluster from './cluster.svelte'

  import {
    normalizeArray,
  } from '$lib/helper/index.js'

  import type {
    InputProps,
    InputWrappedProps,
  } from './types.js'

  let {
    childrenClass = $bindable([]),
    childrenStyle = $bindable([]),
    class: classList = $bindable([]),
    input,
    style = $bindable([]),
    value = $bindable(''),
    ...passthrough
  } : InputWrappedProps = $props()

  let classes: string[] = $derived(normalizeArray(classList, ' ')),
    styles: string[] = $derived(normalizeArray(style, ';'))

  const childrenProps: InputProps = {
    ...passthrough,
  }

</script>

<inputcontainer
  class={classes.join(' ')}
  style={styles.join(';')}>
  {#if input}
    {@render input(childrenProps)}
  {:else}
    <Cluster {...childrenProps}
      bind:class={childrenClass}
      bind:style={childrenStyle}
      bind:value={value} />
  {/if}
</inputcontainer>

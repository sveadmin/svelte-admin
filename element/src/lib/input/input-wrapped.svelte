<script lang="ts">
  // @ts-ignore: This is a functioning and correct import, sometimes TS does not understand svelte files
  import Input from './input.svelte'

  import {
    normalizeArray,
  } from '$lib/helper/index.js'

  import type {
    InputProps,
    InputWrappedProps,
  } from './types.js'

  let {
    childrenClass,
    childrenStyle,
    class: classList = $bindable([]),
    input,
    style = $bindable([]),
    value = $bindable(''),
    ...passthrough
  } : InputWrappedProps = $props()

  let classes: string[] = $state(normalizeArray(classList, ' ')),
    styles: string[] = $state(normalizeArray(style, ';'))

  const childrenProps: InputProps = {
    ...passthrough,
    class: childrenClass,
    style: childrenStyle,
    value
  }

</script>

<inputcontainer
  class={classes.join(' ')}
  style={styles.join(';')}>
  {#if input}
    {@render input(childrenProps)}
  {:else}
    <Input {...childrenProps} bind:value={value} />
  {/if}
</inputcontainer>

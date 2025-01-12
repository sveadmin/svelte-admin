<script lang="ts">
  // @ts-ignore: This is a functioning and correct import, sometimes TS does not understand svelte files
  import TextInput from './text-input.svelte'

  import {
    normalizeArray,
  } from '$lib/helper/index.js'

  import type {
    TextInputProps,
    TextInputWrappedProps,
  } from './types.js'

  let {
    childrenClass,
    childrenStyle,
    class: classList = $bindable([]),
    input,
    style = $bindable([]),
    ...passthrough
  } : TextInputWrappedProps = $props()

  let classes: string[] = $state(normalizeArray(classList, ' ')),
    styles: string[] = $state(normalizeArray(style, ';'))

  const childrenProps: TextInputProps = {
    ...passthrough,
    class: childrenClass,
    style: childrenStyle
  }

</script>

<inputcontainer
  class={classes.join(' ')}
  style={styles.join(';')}>
  {#if input}
    {@render input(childrenProps)}
  {:else}
    <TextInput {...childrenProps}/>
  {/if}
</inputcontainer>

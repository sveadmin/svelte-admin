<script lang="ts">
  // @ts-ignore: This is a functioning and correct import, sometimes TS does not understand svelte files
  import TextDisplay from './text-display.svelte'
  import {
    normalizeArray,
  } from '$lib/helper/index.js'

  import type {
    TextDisplayProps,
    TextDisplayWrappedProps,
  } from './types.js'

  import {
    prepareOnClick,
  } from './action/index.js'

  let {
    class: classList = $bindable([]),
    onClick,
    style = $bindable([]),
    value = $bindable(),
    ...passthrough
  } : TextDisplayWrappedProps = $props()


  if (!onClick) {
    onClick = prepareOnClick(() => value)
  }

  let classes: string[] = $state(normalizeArray(classList, ' ')),
    styles: string[] = $state(normalizeArray(style, ';'))

  const childrenProps: TextDisplayProps = {
    value,
    ...passthrough,
  }
</script>

<sveatextcontainer class={classes.join(' ')}
  onclick={onClick}
  role="presentation"
  style={styles.join(';')} >
  <TextDisplay {...childrenProps} bind:value={value} />
</sveatextcontainer>

<script lang="ts">
  // @ts-ignore: This is a functioning and correct import, sometimes TS does not understand svelte files
  import TextDisplay from './text-display.svelte'
  import {
    normalizeArray,
    wrapOnMouseAction,
  } from '$lib/helper/index.js'

  import type {
    TextDisplayProps,
    TextDisplayWrappedProps,
  } from './types.js'

  import {
    prepareCopyValue,
  } from './action/index.js'

  let {
    childrenClass = $bindable([]),
    childrenStyle = $bindable([]),
    class: classList = $bindable([]),
    onClick,
    style = $bindable([]),
    value = $bindable(),
    ...passthrough
  } : TextDisplayWrappedProps = $props()

  let classes: string[] = $derived(normalizeArray(classList, ' ')),
    onInputClick = wrapOnMouseAction(prepareCopyValue(() => value), onClick),
    styles: string[] = $derived(normalizeArray(style, ';'))

  const childrenProps: TextDisplayProps = {
    value,
    ...passthrough,
  }
</script>

<sveatextcontainer class={classes.join(' ')}
  onclick={onInputClick}
  role="presentation"
  style={styles.join(';')} >
  <TextDisplay {...childrenProps}
    bind:class={childrenClass}
    bind:style={childrenStyle}
    bind:value={value} />
</sveatextcontainer>

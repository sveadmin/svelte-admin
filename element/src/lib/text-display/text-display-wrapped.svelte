<script lang="ts">
  import TextDisplay from './text-display.svelte'

  import {
    normalizeArray,
  } from '$lib/helper/index.js'

  import type {
    TextDisplayProps,
    TextDisplayWrappedProps,
  } from './types.js'

  let {
    class: classList = $bindable([]),
    style = $bindable([]),
    ...passthrough
  } : TextDisplayWrappedProps = $props()

  let classes: string[] = $state(normalizeArray(classList, ' ')),
    styles: string[] = $state(normalizeArray(style, ';'))

  const childrenProps: TextDisplayProps = {
    ...passthrough,
  }
</script>

<textcontainer class={classes.join(' ')} style={styles.join(';')}>
  <TextDisplay {...childrenProps}/>
</textcontainer>

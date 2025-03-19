<script lang="ts">
  import {
    normalizeArray,
  } from '$lib/helper/index.js'

  import type {
    GridLineProps,
  } from './types.js'

  import './grid-line.css'

  const {
    children,
    class: classList = $bindable([]),
    style = $bindable([]),
  } : GridLineProps = $props()

  let classes: string[] = $derived(normalizeArray(classList, ' ')),
    styles: string[] = $derived(normalizeArray(style, ';'))
</script>

<sveagridline class={classes.join(' ')} style={styles.join(';')}>
  {@render children?.()}
</sveagridline>
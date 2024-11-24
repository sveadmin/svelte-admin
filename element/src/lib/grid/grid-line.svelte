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

  let classes: string[] = $state(normalizeArray(classList, ' ')),
    styles: string[] = $state(normalizeArray(style, ';'))
</script>

<sveagridline class={classes.join(' ')} style={styles.join(';')}>
  {@render children?.()}
</sveagridline>
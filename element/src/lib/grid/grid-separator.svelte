<script lang="ts">
  import {
    normalizeArray,
  } from '$lib/helper/index.js'

  import './grid-separator.css'

  import type {
    GridSeparatorProps,
  } from './types.js'

  let {
    class: classList = $bindable([]),
    style = $bindable([]),
  }: GridSeparatorProps = $props()

  let classes: string[] = $state(normalizeArray(classList, ' ')),
    styles: string[] = $state(normalizeArray(style, ';'))
</script>

<sveagridseparator class={classes.join(' ')} style={styles.join(';')}></sveagridseparator>
<script lang="ts">
  import {
    normalizeArray,
  } from '$lib/helper/index.js'

  import type {
    GridContainerProps,
  } from './types.js'

  // import './grid-container.css'

  const {
    children,
    class: classList = $bindable([]),
    style = $bindable([]),
    span = 1
  } : GridContainerProps = $props()

  let classes: string[] = $state(normalizeArray(classList, ' ')),
    styles: string[] = $state(normalizeArray(style, ';'))

  classes.push(`container-grid-span-${span}`)

</script>

<sveagrid class={classes.join(' ')} style={styles.join(';')}>
  {@render children?.()}
</sveagrid>

<style global src="./grid-container.css"></style>
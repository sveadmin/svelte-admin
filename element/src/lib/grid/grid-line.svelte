<script lang="ts">
  import type {
    GridLineProps,
  } from './types.js'

  import './grid-line.css'

  const {
    children,
    class: classList = $bindable([]),
  } : GridLineProps = $props()

  let classes: string[] = $state([])

  if (Array.isArray(classList)) {
    classes = classList
  } else {
    classes.push(...classList.split(' '))
  }
</script>

<sveagridline class={classes.join(' ')}>
  {@render children?.()}
</sveagridline>
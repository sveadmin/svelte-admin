<script lang="ts">
  import './grid-separator.css'

  import type {
    GridSeparatorProps,
  } from './types.js'

  let {
    class: classList = $bindable([]),
  }: GridSeparatorProps = $props()

  let classes: string[] = $state([])

  if (Array.isArray(classList)) {
    classes = classList
  } else {
    classes.push(...classList.split(' '))
  }
</script>

<gridseparator class={classes.join(' ')}></gridseparator>
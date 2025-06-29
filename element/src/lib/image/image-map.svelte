<script lang="ts">
  import type {
    ImageMapProps,
  } from './types.js'

  import Image from './image.svelte'

  let {
    map = $bindable(),
    value = $bindable(),
    ...passthrough
  } : ImageMapProps = $props()

  let src : string = $state('')

  $effect(() => {
    const currentItem = Object.keys(map).find((key: string) => {
      if (typeof map[key] === 'function') {
        return map[key](value)
      }

      return map[key] === value
    })

    if (currentItem) {
      src = currentItem
      return
    }

    src = ''
  })
</script>

<Image {src} {...passthrough} />
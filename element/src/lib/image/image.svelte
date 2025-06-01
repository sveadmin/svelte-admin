<script lang="ts">
  import {
    SIZE_DIRECTION_VERTICAL
  } from '$lib/types.js';

  import type {
    ImageProps,
  } from './types.js'

  import {
    normalizeArray,
    normalizeVisibleSize,
  } from '$lib/helper/index.js'

  import {
    parseSizeDefinition,
    parseSourceSetDefinition,
  } from './helper/index.js'

  import './image.css'

  let {
    alt = '',
    class: classList = $bindable([]),
    fetchpriority,
    loading,
    sizes,
    src,
    srcset,
    style = $bindable([]),
    visibleHeight,
    visibleWidth,
  } : ImageProps = $props()

  let classes: string[] = $derived(normalizeArray(classList, ' ')),
    styles: string[] = $derived(normalizeArray(style, ';')),
    styledProperties: string[] = $derived.by(() => {
      return styles.map(currentStlye => currentStlye.substring(0, currentStlye.indexOf(':')))
    })
    
  sizes = normalizeArray(sizes, ',').map(parseSizeDefinition)
  srcset = normalizeArray(srcset, ',').map(parseSourceSetDefinition)

  $effect(() => {
    if (visibleHeight) {
      const newStyle = normalizeVisibleSize(visibleHeight, SIZE_DIRECTION_VERTICAL)
      if (newStyle) {
        const newProperty = newStyle.substring(0, newStyle.indexOf(':'))
        if (styledProperties.indexOf(newProperty) === -1) {
          styles.push(newStyle)
        }
      }
    }
  })

  $effect(() => {
    if (visibleWidth) {
      const newStyle = normalizeVisibleSize(visibleWidth)
      if (newStyle) {
        const newProperty = newStyle.substring(0, newStyle.indexOf(':'))
        if (styledProperties.indexOf(newProperty) === -1) {
          styles.push(newStyle)
        }
      }
    }
  })

</script>
<img
  {alt}
  class={classes.join(' ')}
  {fetchpriority}
  {loading}
  {src}
  sizes={sizes.join(', ')}
  srcset={srcset.join(', ')}
  style={styles.join(';')} />


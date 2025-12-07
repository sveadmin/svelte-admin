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
    styles: string[] = $derived.by(() => {
      const styles = normalizeArray(style, ';')
      const styledProperties = styles.map(currentStlye => currentStlye.substring(0, currentStlye.indexOf(':')))
      if (visibleHeight) {
        const newStyle = normalizeVisibleSize(visibleHeight, SIZE_DIRECTION_VERTICAL)
        if (newStyle) {
          const newProperty = newStyle.substring(0, newStyle.indexOf(':'))
          if (styledProperties.indexOf(newProperty) === -1) {
            styles.push(newStyle)
          }
        }
      }
      if (visibleWidth) {
        const newStyle = normalizeVisibleSize(visibleWidth)
        if (newStyle) {
          const newProperty = newStyle.substring(0, newStyle.indexOf(':'))
          if (styledProperties.indexOf(newProperty) === -1) {
            styles.push(newStyle)
          }
        }
      }
      return styles
    })
    
  sizes = normalizeArray(sizes, ',').map(parseSizeDefinition)
  srcset = normalizeArray(srcset, ',').map(parseSourceSetDefinition)

// @ts-ignore: for some reason TS does not properly detect the values from AllowedFetchPriority type
  const parsedFetchpriority: "auto" | "high" | "low" | null | undefined = fetchpriority
// @ts-ignore: for some reason TS does not properly detect the values from AllowedLoading type
  const parsedLoading: "eager" | "lazy" | null | undefined = loading

</script>
{#if src !== ''}
  <img
    {alt}
    class={classes.join(' ')}
    fetchpriority={parsedFetchpriority}
    loading={parsedLoading}
    {src}
    sizes={sizes.join(', ')}
    srcset={srcset.join(', ')}
    style={styles.join(';')} />
{/if}


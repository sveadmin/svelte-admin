<script lang="ts">
  import {
    SIZE_DIRECTION_VERTICAL
  } from '$lib/types.js'

  import {
    normalizeArray,
    normalizeVisibleSize,
  } from '$lib/helper/index.js'

  import {
    DISPLAY_IMAGE_ICON,
    DISPLAY_IMAGE_NORMAL,
    DISPLAY_IMAGE_PREVIEW,
  } from './types.js'

  import type {
    AllowedImageDisplayModes,
    ImageWrappedProps,
  } from './types.js'

  import Image from './image.svelte'

  import './image.css'

  let {
    childrenClass = $bindable([]),
    childrenHeight,
    childrenWidth,
    childrenStyle = $bindable([]),
    class: classList = $bindable([]),
    icon,
    iconPrefix = 'iconoir-',
    isImageVisibleInWrapper,
    isPreviewEnabled,
    src,
    srcset,
    style = $bindable([]),
    visibleHeight,
    visibleWidth,
    ...passthrough
  } : ImageWrappedProps = $props()

  isImageVisibleInWrapper = isImageVisibleInWrapper || !icon

  let classes: string[] = $derived(normalizeArray(classList, ' ')),
    localClasses: string[] = $state([]),
    styles: string[] = $derived(normalizeArray(style, ';')),
    localStyles: string[] = $state([]),
    childrenStyles: string[] = $derived(normalizeArray(childrenStyle, ';')),
    childrenStyledProperties: string[] = $derived.by(() => {
      return childrenStyles.map(currentStlye => currentStlye.substring(0, currentStlye.indexOf(':')))
    }),
    displayMode: AllowedImageDisplayModes = $state(DISPLAY_IMAGE_NORMAL)

  let derivedClasses = $derived(classes.concat(localClasses)),
    derivedStyles = $derived(styles.concat(localStyles))

  let localStyledProperties: string[] = $derived.by(() => {
      return localStyles.map(currentStlye => currentStlye.substring(0, currentStlye.indexOf(':')))
    })

  if (icon
    && !isImageVisibleInWrapper) {
    localClasses.push(iconPrefix + icon)
    visibleHeight = visibleHeight ?? '1em'
    visibleWidth = visibleWidth ?? '1em'
  }

  $effect(() => {
    if (visibleHeight) {
      const newStyle = normalizeVisibleSize(visibleHeight, SIZE_DIRECTION_VERTICAL)
      if (newStyle) {
        const newProperty = newStyle.substring(0, newStyle.indexOf(':'))
        if (localStyledProperties.indexOf(newProperty) === -1) {
          localStyles.push(newStyle)
        }
      }
    }
  })
    
  $effect(() => {
    if (visibleWidth) {
      const newStyle = normalizeVisibleSize(visibleWidth)
      if (newStyle) {
        const newProperty = newStyle.substring(0, newStyle.indexOf(':'))
        if (localStyledProperties.indexOf(newProperty) === -1) {
          localStyles.push(newStyle)
        }
      }
    }
  })

  $effect(() => {
    if (childrenHeight) {
      const newStyle = normalizeVisibleSize(childrenHeight, SIZE_DIRECTION_VERTICAL)
      if (newStyle) {
        const newProperty = newStyle.substring(0, newStyle.indexOf(':'))
        if (childrenStyledProperties.indexOf(newProperty) === -1) {
          childrenStyles.push(newStyle)
        }
      }
    }
  })
    
  $effect(() => {
    if (childrenWidth) {
      const newStyle = normalizeVisibleSize(childrenWidth)
      if (newStyle) {
        const newProperty = newStyle.substring(0, newStyle.indexOf(':'))
        if (childrenStyledProperties.indexOf(newProperty) === -1) {
          childrenStyles.push(newStyle)
        }
      }
    }
  })

  const showPreview = (event: Event) => {
    if (event instanceof KeyboardEvent
      && event.key !== 'Enter') {
      return
    }

    displayMode = (displayMode === DISPLAY_IMAGE_ICON)
      ? DISPLAY_IMAGE_PREVIEW
      : DISPLAY_IMAGE_ICON
  }
</script>
<sveaimagecontainer class={derivedClasses.join(' ')}
  style={derivedStyles.join(';')}>
  {#if src || srcset}
    <Image bind:class={childrenClass}
      {src}
      {srcset}
      style={childrenStyles.join(';')}
      {...passthrough} />
  {/if}
  {#if displayMode === DISPLAY_IMAGE_PREVIEW}
    <sveaimagepreview class="visible" on:click={showPreview} on:keyup={showPreview}>
      <Image bind:class={childrenClass}
        {src}
        {srcset}
        bind:style={childrenStyle}
        {visibleHeight}
        {visibleWidth}
        {...passthrough} /> 
    </sveaimagepreview>
  {/if}
</sveaimagecontainer>
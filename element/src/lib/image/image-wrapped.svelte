<script lang="ts">
  import {
    untrack,
  } from 'svelte'

  import {
    readOnlyRune,
    rune,
  } from '@sveadmin/common'

  import {
    SIZE_DIRECTION_VERTICAL
  } from '$lib/types.js'

  import type {
  } from '$lib/types.js'

  import {
    childParser,
    dataParser,
    normalizeArray,
    normalizeVisibleSize,
  } from '$lib/helper/index.js'

  import {
    prepareHidePreview,
    prepareShowPreview,
    prepareTogglePreview,
  } from './action/index.js'

  import type {
    ImageProps,
    ImageWrappedProps,
  } from './types.js'

  import Image from './image.svelte'

  import './image.css'

  let {
    childrenConfig = $bindable({}),
    childrenClass = $bindable([]),
    childrenVisibleHeight,
    childrenVisibleWidth,
    childrenStyle = $bindable([]),
    class: classList = $bindable([]),
    data = {},
    icon = $bindable(),
    iconPrefix = 'iconoir-',
    image,
    isAttachedOnLeft = false,
    isAttachedOnRight = false,
    isBorderVisible = false,
    isImageDisplayed = $bindable(!icon),
    isInPreviewMode = false,
    isPreviewModeOnHover = true,
    onClick: onClickReceived,
    onMouseDown,
    onMouseUp,
    size,
    src = $bindable(),
    srcset,
    style = $bindable([]),
    tabIndex = -1,
    visibleHeight,
    visibleWidth,
    ...passthrough
  } : ImageWrappedProps = $props()

  const childrenPropertyOverwrite = {
    class: childrenClass,
    style: childrenStyle,
    visibleHeight: childrenVisibleHeight,
    visibleWidth: childrenVisibleWidth,
  }

  const firstChild : ImageProps = childParser(childrenConfig, 0, childrenPropertyOverwrite)

  let childrenStyles: string[] = $state(normalizeArray(firstChild.style, ';')),
    classes: string[] = $derived(normalizeArray(classList, ' ')),
    dataParsed: {[key: string] : string} = $derived(dataParser(data)),
    isPreviewVisible = $state(rune(false)),
    localClasses: string[] = $state([]),
    localStyles: string[] = $state([]),
    previewHeight = firstChild.visibleHeight,
    previewWidth = firstChild.visibleWidth,
    previewStyles: string[] = $state([...normalizeArray(firstChild.style, ';')]),
    styles: string[] = $derived(normalizeArray(style, ';'))

  let childrenStyledProperties: string[] = $derived.by(() => {
      return childrenStyles.map(currentStlye => currentStlye.substring(0, currentStlye.indexOf(':')))
    }),
    derivedClasses = $derived(classes.concat(localClasses)),
    derivedStyles = $derived(styles.concat(localStyles)),
    localClassesExport = readOnlyRune(localClasses),
    previewStyledProperties: string[] = $derived.by(() => {
      return previewStyles.map(currentStlye => currentStlye.substring(0, currentStlye.indexOf(':')))
    })

  let derivedStyledProperties: string[] = $derived.by(() => {
      return derivedStyles.map(currentStlye => currentStlye.substring(0, currentStlye.indexOf(':')))
    })

  const hidePreview = prepareHidePreview(isPreviewVisible),
    showPreview = prepareShowPreview(isPreviewVisible),
    togglePreview = prepareTogglePreview(isPreviewVisible)

  if (isBorderVisible) {
    localClasses.push('border')
  }

  if (isAttachedOnLeft) {
    localClasses.push('attachLeft')
  }
  if (isAttachedOnRight) {
    localClasses.push('attachRight')
  }

  if (isInPreviewMode) {
    visibleHeight = visibleHeight ?? '1em'
    firstChild.visibleHeight = visibleHeight
    firstChild.visibleWidth = visibleWidth
  }

  $effect(() => {
    childrenStyles = normalizeArray(firstChild.style, ';')
  })

  $effect(() => {
    untrack(() => {
      localClasses = localClasses.filter((localClass => {
        return !(localClass.substring(0, iconPrefix.length) === iconPrefix)
      }))
    })
    if (icon) {
      untrack(() => {
        localClasses.push(iconPrefix + icon)
        visibleHeight = visibleHeight ?? '1em'
        visibleWidth = visibleWidth ?? '1em'
      })
    }
  })

  $effect(() => {
    if (visibleHeight) {
      const newStyle = normalizeVisibleSize(visibleHeight, SIZE_DIRECTION_VERTICAL)
      if (newStyle) {
        const newProperty = newStyle.substring(0, newStyle.indexOf(':'))
        if (derivedStyledProperties.indexOf(newProperty) === -1) {
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
        if (derivedStyledProperties.indexOf(newProperty) === -1) {
          localStyles.push(newStyle)
        }
      }
    }
  })

  $effect(() => {
    if (firstChild.visibleHeight) {
      const newStyle = normalizeVisibleSize(firstChild.visibleHeight, SIZE_DIRECTION_VERTICAL)
      if (newStyle) {
        const newProperty = newStyle.substring(0, newStyle.indexOf(':'))
        if (childrenStyledProperties.indexOf(newProperty) === -1) {
          childrenStyles.push(newStyle)
        }
      }
    }
  })
    
  $effect(() => {
    if (firstChild.visibleWidth) {
      const newStyle = normalizeVisibleSize(firstChild.visibleWidth)
      if (newStyle) {
        const newProperty = newStyle.substring(0, newStyle.indexOf(':'))
        if (childrenStyledProperties.indexOf(newProperty) === -1) {
          childrenStyles.push(newStyle)
        }
      }
    }
  })

  $effect(() => {
    if (previewHeight) {
      const newStyle = normalizeVisibleSize(previewHeight, SIZE_DIRECTION_VERTICAL)
      if (newStyle) {
        const newProperty = newStyle.substring(0, newStyle.indexOf(':'))
        if (previewStyledProperties.indexOf(newProperty) === -1) {
          previewStyles.push(newStyle)
        }
      }
    }
  })
    
  $effect(() => {
    if (previewWidth) {
      const newStyle = normalizeVisibleSize(previewWidth)
      if (newStyle) {
        const newProperty = newStyle.substring(0, newStyle.indexOf(':'))
        if (previewStyledProperties.indexOf(newProperty) === -1) {
          previewStyles.push(newStyle)
        }
      }
    }
  })

  const onEnter = (isInPreviewMode && isPreviewModeOnHover)
    ? showPreview
    : undefined

  const onLeave = (isInPreviewMode && isPreviewModeOnHover)
    ? hidePreview
    : undefined

  const onClick = (isInPreviewMode && !isPreviewModeOnHover)
    ? togglePreview
    : onClickReceived

  const onKeyUp = (isInPreviewMode && !isPreviewModeOnHover)
    ? togglePreview
    : undefined

  export function getLocalClasses() {
    return localClassesExport
  }
</script>
<sveaimagecontainer class={derivedClasses.join(' ')}
  class:allowOverflow={isPreviewVisible.value}
  {...dataParsed}
  data-size={size}
  onclick={onClick}
  onkeyup={onKeyUp}
  onmouseDown={onMouseDown}
  onmouseup={onMouseUp}
  onmouseenter={onEnter}
  onmouseleave={onLeave}
  role="button"
  style={derivedStyles.join(';')} 
  tabindex={tabIndex} >
  {#if src || srcset}
    {#if typeof image === 'function'}
      {@render image({
        class: childrenClass,
        src,
        srcset,
        style: childrenStyles,
        ...passthrough
      })}
    {:else}
      <Image bind:class={childrenClass}
        {src}
        {srcset}
        bind:style={childrenStyles}
        {...passthrough} />
    {/if}
    {#if isPreviewVisible.value}
      <sveaimagepreview onmouseenter={onEnter}
        onmouseleave={onLeave}
        role="button"
        tabindex="0" >
        <Image bind:class={childrenClass}
          {src}
          {srcset}
          style={previewStyles.join(';')}
          {visibleHeight}
          {visibleWidth}
          {...passthrough} /> 
      </sveaimagepreview>
    {/if}
  {/if}
</sveaimagecontainer>
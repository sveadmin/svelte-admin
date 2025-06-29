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
    FirstChildrenDefinition,
  } from '$lib/types.js'

  import {
    firstChildrenParser,
    normalizeArray,
    normalizeVisibleSize,
  } from '$lib/helper/index.js'

  import {
    prepareHidePreview,
    prepareShowPreview,
    prepareTogglePreview,
  } from './action/index.js'

  import type {
    ImageWrappedProps,
  } from './types.js'

  import Image from './image.svelte'

  import './image.css'

  let {
    children = $bindable({}),
    childrenClass = $bindable([]),
    childrenVisibleHeight,
    childrenVisibleWidth,
    childrenStyle = $bindable([]),
    class: classList = $bindable([]),
    icon = $bindable(),
    iconPrefix = 'iconoir-',
    image,
    isAttachedOnLeft = false,
    isAttachedOnRight = false,
    isBorderVisible = false,
    isImageDisplayed = $bindable(!icon),
    isInPreviewMode = false,
    isPreviewModeOnHover = true,
    src = $bindable(),
    srcset,
    style = $bindable([]),
    visibleHeight,
    visibleWidth,
    ...passthrough
  } : ImageWrappedProps = $props()


  const childrenPropertyMap = {
    class: childrenClass,
    style: childrenStyle,
    visibleHeight: childrenVisibleHeight,
    visibleWidth: childrenVisibleWidth,
  }

  const firstChildren : FirstChildrenDefinition = firstChildrenParser(children, childrenPropertyMap)


  let childrenStyles: string[] = $state(normalizeArray(firstChildren[0].style, ';')),
    classes: string[] = $derived(normalizeArray(classList, ' ')),
    isPreviewVisible = $state(rune(false)),
    localClasses: string[] = $state([]),
    localStyles: string[] = $state([]),
    previewHeight = firstChildren[0].visibleHeight,
    previewWidth = firstChildren[0].visibleWidth,
    previewStyles: string[] = $state([...normalizeArray(firstChildren[0].style, ';')]),
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
    firstChildren[0].visibleHeight = visibleHeight
    firstChildren[0].visibleWidth = visibleWidth
  }

  $effect(() => {
    childrenStyles = normalizeArray(firstChildren[0].style, ';')
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
    if (firstChildren[0].visibleHeight) {
      const newStyle = normalizeVisibleSize(firstChildren[0].visibleHeight, SIZE_DIRECTION_VERTICAL)
      if (newStyle) {
        const newProperty = newStyle.substring(0, newStyle.indexOf(':'))
        if (childrenStyledProperties.indexOf(newProperty) === -1) {
          childrenStyles.push(newStyle)
        }
      }
    }
  })
    
  $effect(() => {
    if (firstChildren[0].visibleWidth) {
      const newStyle = normalizeVisibleSize(firstChildren[0].visibleWidth)
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
    : undefined

  const onKeyup = (isInPreviewMode && !isPreviewModeOnHover)
    ? togglePreview
    : undefined

  export function getLocalClasses() {
    return localClassesExport
  }
</script>
<sveaimagecontainer class={derivedClasses.join(' ')}
  class:allowOverflow={isPreviewVisible.value}
  onclick={onClick}
  onkeyup={onKeyup}
  onmouseenter={onEnter}
  onmouseleave={onLeave}
  role="button"
  style={derivedStyles.join(';')} 
  tabindex="0" >
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
<script lang="ts">
  import {
    untrack,
  } from 'svelte'

  import {
    readOnlyRune,
  } from '@sveadmin/common'

  import {
    SIZE_DIRECTION_VERTICAL
  } from '$lib/types.js'

  import {
    childrenPropertyParser,
    normalizeArray,
    normalizeVisibleSize,
  } from '$lib/helper/index.js'

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

  let parsedChildren : {0: {[key: string] : any}} = childrenPropertyParser(children, childrenPropertyMap)

  let childrenStyles: string[] = $state(normalizeArray(parsedChildren[0].style, ';')),
    classes: string[] = $derived(normalizeArray(classList, ' ')),
    isPreviewVisible = $state(false),
    localClasses: string[] = $state([]),
    localStyles: string[] = $state([]),
    previewHeight = parsedChildren[0].visibleHeight,
    previewWidth = parsedChildren[0].visibleWidth,
    previewStyles: string[] = $state([...normalizeArray(parsedChildren[0].style, ';')]),
    styles: string[] = $derived(normalizeArray(style, ';'))

  let childrenStyledProperties: string[] = $derived.by(() => {
      return childrenStyles.map(currentStlye => currentStlye.substring(0, currentStlye.indexOf(':')))
    }),
    derivedClasses = $derived(classes.concat(localClasses)),
    derivedStyles = $derived(styles.concat(localStyles)),
    localClassesExport = readOnlyRune(localClasses),
    localStyledProperties: string[] = $derived.by(() => {
      return localStyles.map(currentStlye => currentStlye.substring(0, currentStlye.indexOf(':')))
    }),
    previewStyledProperties: string[] = $derived.by(() => {
      return previewStyles.map(currentStlye => currentStlye.substring(0, currentStlye.indexOf(':')))
    })

  let derivedStyledProperties: string[] = $derived.by(() => {
      return derivedStyles.map(currentStlye => currentStlye.substring(0, currentStlye.indexOf(':')))
    })

  if (icon
    && !isImageDisplayed) {
  }

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
    parsedChildren[0].visibleHeight = visibleHeight
    parsedChildren[0].visibleWidth = visibleWidth
  }

  $effect(() => {
    childrenStyles = normalizeArray(parsedChildren[0].style, ';')
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
    if (parsedChildren[0].visibleHeight) {
      const newStyle = normalizeVisibleSize(parsedChildren[0].visibleHeight, SIZE_DIRECTION_VERTICAL)
      if (newStyle) {
        const newProperty = newStyle.substring(0, newStyle.indexOf(':'))
        if (childrenStyledProperties.indexOf(newProperty) === -1) {
          childrenStyles.push(newStyle)
        }
      }
    }
  })
    
  $effect(() => {
    if (parsedChildren[0].visibleWidth) {
      const newStyle = normalizeVisibleSize(parsedChildren[0].visibleWidth)
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

  const togglePreview = (event: Event) => {
    if (event instanceof KeyboardEvent
      && event.key !== 'Enter') {
      return
    }

    isPreviewVisible = !isPreviewVisible
    event.stopPropagation()
  }

  const showPreview = (event: Event) => {
    if (event instanceof KeyboardEvent
      && event.key !== 'Enter') {
      return
    }

    isPreviewVisible = true
    event.stopPropagation()
  }

  const hidePreview = (event: Event) => {
    if (event instanceof KeyboardEvent
      && event.key !== 'Enter') {
      return
    }

    isPreviewVisible = false
    event.stopPropagation()
  }

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
  class:allowOverflow={isPreviewVisible}
  onclick={onClick}
  onkeyup={onKeyup}
  onmouseenter={onEnter}
  onmouseleave={onLeave}
  role="button"
  style={derivedStyles.join(';')} 
  tabindex="0" >
  {#if src || srcset}
    <Image bind:class={childrenClass}
      {src}
      {srcset}
      bind:style={childrenStyles}
      {...passthrough} />
    {#if isPreviewVisible}
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
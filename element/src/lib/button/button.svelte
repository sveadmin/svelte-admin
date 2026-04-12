<script lang="ts">
  import {
    noopTrue,
  } from '@sveadmin/common'
  
  import {
    CONTROL_INPUT_TYPE_BUTTON,
    SIZE_DIRECTION_VERTICAL,
    SIZE_MEDIUM,
  } from '$lib/types.js'

  import {
    dataParser,
    normalizeArray,
    normalizeIcon,
    normalizeVisibleSize,
    propertyMerger,
  } from '$lib/helper/index.js'

  import type {
    ImageWrappedDisplayProps,
  } from '$lib/image/index.js'

  import type {
    ButtonInputProps,
  } from './types.js'

  import {
    defaultRenderIcon,
  } from './render-icon.svelte'

  import './button.css'

  let {
    childrenConfig = $bindable({}),
    class: classList = $bindable([]),
    data = {},
    instance = $bindable({ref: undefined}),
    icon = $bindable([]),
    iconClass = $bindable([]),
    iconStyle = $bindable([]),
    leftIcon = $bindable(icon),
    iconRenderer = defaultRenderIcon,
    id = 'button-' + Math.random().toString(36).substring(2, 6),
    isAttachedOnLeft = false,
    isAttachedOnRight = false,
    isDisabled = $bindable(false),
    label = '',
    name = 'button-' + Math.random().toString(36).substring(2, 6),
    onClick = noopTrue,
    onKeyDown = noopTrue,
    onKeyUp = noopTrue,
    onMouseDown = noopTrue,
    onMouseUp = noopTrue,
    rightIcon = $bindable([]),
    size = SIZE_MEDIUM,
    style = $bindable([]),
    tabIndex = 0,
    type = CONTROL_INPUT_TYPE_BUTTON,
    visibleHeight,
    visibleWidth,
  } : ButtonInputProps = $props()

  const iconPropertyOverwrite = {
    class: iconClass,
    style: iconStyle,
  }

  const leftIconConfig : ImageWrappedDisplayProps = $derived(propertyMerger(
    childrenConfig?.leftIcon,
    childrenConfig?.icon,
    childrenConfig?.[0],
    iconPropertyOverwrite,
  ))

  const rightIconConfig : ImageWrappedDisplayProps = $derived(propertyMerger(
    childrenConfig?.rightIcon,
    childrenConfig?.icon,
    childrenConfig?.[0],
    iconPropertyOverwrite,
  ))

  let classes: string[] = $derived(normalizeArray(classList, ' ')),
    dataParsed: {[key: string] : string} = $derived(dataParser(data)),
    leftIconParsed = $derived(normalizeIcon(leftIcon)),
    localClasses: string[] = $state(['sveabutton']),
    rightIconParsed = $derived(normalizeIcon(rightIcon)),
    styles: string[] = $state(normalizeArray(style, ';')),
    styledProperties: string[] = $derived.by(() => {
      return styles.map(currentStlye => currentStlye.substring(0, currentStlye.indexOf(':')))
    })

  let derivedClasses = $derived(classes.concat(localClasses))

  if (isAttachedOnLeft) {
    localClasses.push('attachLeft')
  }
  if (isAttachedOnRight) {
    localClasses.push('attachRight')
  }
  if (isAttachedOnLeft
    || isAttachedOnRight) {
    localClasses.push('inputBorder')
  }
  
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
<button class={derivedClasses.join(' ')}
  class:iconOnly={leftIconParsed && label === ''}
  data-size={size}
  {...dataParsed}
  disabled={isDisabled}
  {id}
  {name}
  onclick={onClick}
  onkeydown={onKeyDown}
  onkeyup={onKeyUp}
  onmousedown={onMouseDown}
  onmouseup={onMouseUp}
  style={styles.join(';')}
  tabindex={tabIndex}
  bind:this={instance.ref}
  {type} >
  {#if leftIconParsed}
    {@render iconRenderer(leftIconParsed, leftIconConfig)}
  {/if}
  <sveabuttonlabel>
    {label}
  </sveabuttonlabel>
  {#if rightIconParsed}
    {@render iconRenderer(rightIconParsed, rightIconConfig)}
  {/if}
</button>

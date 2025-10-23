<script lang="ts">
  import {
    noopTrue,
  } from '@sveadmin/common'
  
  import {
    CONTROL_INPUT_TYPE_SUBMIT,
    SIZE_DIRECTION_VERTICAL,
    SIZE_MEDIUM,
  } from '$lib/types.js'

  import {
    childParser,
    normalizeArray,
    normalizeIcon,
    normalizeVisibleSize,
  } from '$lib/helper/index.js'

  import type {
    ImageWrappedProps,
  } from '$lib/image/index.js'

  import type {
    ButtonProps,
  } from './types.js'

  import {
    defaultRenderIcon,
  } from './render-icon.svelte'

  import './button.css'

  let {
    childrenConfig = $bindable({}),
    childrenClass = $bindable([]),
    childrenStyle = $bindable([]),
    class: classList = $bindable([]),
    data = {},
    instance = $bindable(),
    leftIcon = $bindable([]),
    rightIcon = $bindable([]),
    iconRenderer = defaultRenderIcon,
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
    paddingOverwriteLeft = $bindable(),
    paddingOverwriteRight = $bindable(),
    size = SIZE_MEDIUM,
    style = $bindable([]),
    tabIndex,
    type = CONTROL_INPUT_TYPE_SUBMIT,
    visibleHeight,
    visibleWidth,
  } : ButtonProps = $props()

  const childrenPropertyMap = {
    class: childrenClass,
    style: childrenStyle,
  }

  const firstChild : ImageWrappedProps = childParser(childrenConfig, 0, childrenPropertyMap)

  let classes: string[] = $derived(normalizeArray(classList, ' ')),
    dataParsed: {[key: string] : string} = $derived.by(() => {
      return Object.keys(data).reduce((aggregator: {[key: string] : string}, currentKey: string) => {
        aggregator['data-' + currentKey] = data[currentKey]
        return aggregator
      }, {})
    }),
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

  // const wrapLabelOnClick = (event?:Event) : boolean => {
  //   if (!event
  //       || !onClick) {
  //     return true
  //   }
  //   const buttonEvent = new MouseEvent(event.type, {...event, target: instance})


  // }

</script>
<button class={derivedClasses.join(' ')}
  class:iconOnly={leftIconParsed && label === ''}
  data-size={size}
  {...dataParsed}
  disabled={isDisabled}
  {name}
  onclick={onClick}
  onkeydown={onKeyDown}
  onkeyup={onKeyUp}
  onmousedown={onMouseDown}
  onmouseup={onMouseUp}
  style={styles.join(';')}
  tabindex={tabIndex}
  bind:this={instance}
  {type} >
  {#if leftIconParsed}
    {@render iconRenderer(leftIconParsed, firstChild)}
  {/if}
  <sveabuttonlabel>
    {label}
  </sveabuttonlabel>
  {#if rightIconParsed}
    {@render iconRenderer(rightIconParsed, firstChild)}
  {/if}
</button>

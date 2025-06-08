<script lang="ts">
  import {
    noop,
  } from '@sveadmin/common'
  
  import {
    SIZE_DIRECTION_VERTICAL,
    SIZE_MEDIUM,
  } from '$lib/types.js'
  
  import type {
    Icon,
  } from '$lib/types.js'
  
  import {
    normalizeArray,
    normalizeIcon,
    normalizeVisibleSize,
  } from '$lib/helper/index.js'

  import type {
    ButtonProps,
  } from './types.js'

  import './button.css'
  import {
    ImageWrapped
  } from '$lib/image/index.js'

  let {
    callback = noop,
    class: classList = $bindable([]),
    data = {},
    leftIcon,
    rightIcon,
    iconRenderer = defaultIconRenderer,
    isDisabled = $bindable(false),
    label = '',
    paddingOverwriteLeft = $bindable(),
    paddingOverwriteRight = $bindable(),
    size = SIZE_MEDIUM,
    style = $bindable([]),
    tabIndex,
    visibleHeight,
    visibleWidth,
  } : ButtonProps = $props()

  let classes: string[] = $derived(normalizeArray(classList, ' ')),
    localClasses: string[] = $state([]),
    styles: string[] = $state(normalizeArray(style, ';')),
    styledProperties: string[] = $derived.by(() => {
      return styles.map(currentStlye => currentStlye.substring(0, currentStlye.indexOf(':')))
    }),
    dataParsed: {[key: string] : string} = $derived.by(() => {
      return Object.keys(data).reduce((aggregator: {[key: string] : string}, currentKey: string) => {
        aggregator['data-' + currentKey] = data[currentKey]
        return aggregator
      }, {})
    })

  let derivedClasses = $derived(classes.concat(localClasses))

  leftIcon = normalizeIcon(leftIcon)
  rightIcon = normalizeIcon(rightIcon)

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
{#snippet defaultIconRenderer(icons: Icon[])}
  {#each icons as icon}
    <ImageWrapped {...icon} style="vertical-align:bottom" />
  {/each}
{/snippet}

<sveabutton class={derivedClasses.join(' ')}
  class:iconOnly={leftIcon && label === ''}
  data-size={size}
  {...dataParsed}
  disabled={isDisabled}
  onclick={callback}
  onkeyup={callback}
  role="button"
  style={styles.join(';')}
  tabindex={tabIndex}
  type="submit" >
  {#if leftIcon}
    {@render iconRenderer(leftIcon)}
  {/if}
  <sveabuttonlabel>
    {label}
  </sveabuttonlabel>
  {#if rightIcon}
    {@render iconRenderer(rightIcon)}
  {/if}
</sveabutton>

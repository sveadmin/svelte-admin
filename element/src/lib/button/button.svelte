<script lang="ts">
  import {
    noop,
  } from '@sveadmin/common'
  
  import {
    SIZE_DIRECTION_VERTICAL,
    SIZE_MEDIUM,
  } from '$lib/types.js'

  import {
    CONTROL_INPUT_TYPE_SUBMIT,
  } from '../types.js'
  
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
    childrenClass = $bindable([]),
    childrenStyle = $bindable([]),
    class: classList = $bindable([]),
    data = {},
    leftIcon = $bindable([]),
    rightIcon = $bindable([]),
    iconRenderer = defaultIconRenderer,
    isDisabled = $bindable(false),
    label = '',
    paddingOverwriteLeft = $bindable(),
    paddingOverwriteRight = $bindable(),
    size = SIZE_MEDIUM,
    style = $bindable([]),
    tabIndex,
    type = CONTROL_INPUT_TYPE_SUBMIT,
    visibleHeight,
    visibleWidth,
  } : ButtonProps = $props()

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
    <ImageWrapped {...icon} />
  {/each}
{/snippet}
<button  class={derivedClasses.join(' ')}
  class:iconOnly={leftIconParsed && label === ''}
  data-size={size}
  {...dataParsed}
  disabled={isDisabled}
  onclick={callback}
  onkeyup={callback}
  style={styles.join(';')}
  tabindex={tabIndex}
  {type} >
  {#if leftIconParsed}
    {@render iconRenderer(leftIconParsed)}
  {/if}
  <sveabuttonlabel>
    {label}
  </sveabuttonlabel>
  {#if rightIconParsed}
    {@render iconRenderer(rightIconParsed)}
  {/if}
</button>

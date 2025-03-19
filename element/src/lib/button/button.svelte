<script lang="ts">
  import {
    noop,
  } from '@sveadmin/common'
  
  import {
    SIZE_MEDIUM,
  } from '$lib/types.js'
  
  import {
    normalizeArray,
  } from '$lib/helper/index.js'

  import type {
    ButtonProps,
  } from './types.js'

  import './button.css'

  const {
    callback = noop,
    class: classList = $bindable([]),
    data = {},
    icon,
    iconPrefix = 'iconoir-',
    isDisabled = $bindable(false),
    label = '',
    size = SIZE_MEDIUM,
    style = $bindable([]),
    tabIndex
  } : ButtonProps = $props()

  let classes: string[] = $derived(normalizeArray(classList, ' ')),
    localClasses: string[] = $state([]),
    styles: string[] = $state(normalizeArray(style, ';')),
    dataParsed: {[key: string] : string} = $derived.by(() => {
      return Object.keys(data).reduce((aggregator: {[key: string] : string}, currentKey: string) => {
        aggregator['data-' + currentKey] = data[currentKey]
        return aggregator
      }, {})
    })

  let derivedClasses = $derived(classes.concat(localClasses))

  if (icon) {
    localClasses.push(iconPrefix + icon)
  }

</script>

<sveabutton class={derivedClasses.join(' ')}
  class:iconOnly={icon && label === ''}
  data-size={size}
  {...dataParsed}
  disabled={isDisabled}
  onclick={callback}
  onkeyup={callback}
  role="button"
  style={styles.join(';')}
  tabindex={tabIndex}
  type="submit" >
  {label}
</sveabutton>

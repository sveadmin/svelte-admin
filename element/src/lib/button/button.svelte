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
    isDisabled = false,
    label = '',
    size = SIZE_MEDIUM,
    style = $bindable([]),
    tabIndex
  } : ButtonProps = $props()

  const getIsDisabled = (typeof isDisabled === 'function')
    ? isDisabled
    : () => isDisabled

  let classes: string[] = $state(normalizeArray(classList, ' ')),
    styles: string[] = $state(normalizeArray(style, ';'))

  if (icon) {
    classes.push(iconPrefix + icon)
  }

  const dataParsed: {[key: string] : string} = {}
  Object.keys(data).map(currentKey => {
    dataParsed['data-' + currentKey] = data[currentKey]
  })

</script>

<sveabutton class={classes.join(' ')}
  class:iconOnly={icon && label === ''}
  data-size={size}
  {...dataParsed}
  disabled={getIsDisabled()}
  onclick={callback}
  onkeyup={callback}
  role="button"
  style={styles.join(';')}
  tabindex={tabIndex}
  type="submit" >
  {label}
</sveabutton>

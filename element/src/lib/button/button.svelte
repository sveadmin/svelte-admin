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
    icon,
    iconPrefix = 'iconoir-',
    isDisabled = false,
    label = '',
    size = SIZE_MEDIUM,
    style = $bindable([])
  } : ButtonProps = $props()

  const getIsDisabled = (typeof isDisabled === 'function')
    ? isDisabled
    : () => isDisabled

  let classes: string[] = $state(normalizeArray(classList, ' ')),
    styles: string[] = $state(normalizeArray(style, ';'))

  classes.push('sveabutton')
  if (icon) {
    classes.push(iconPrefix + icon)
  }

</script>

<button class={classes.join(' ')}
  class:iconOnly={icon && label === ''}
  data-size={size}
  disabled={getIsDisabled()}
  onclick={callback}
  onkeyup={callback}
  style={styles.join(';')}
  type="submit" >
  {label}
</button>

<script lang="ts">
  import {
    noop,
  } from '@sveadmin/common'
  
  import type {
    ButtonProps,
  } from './types.js'

  import './button.css'

  const {
    callback = noop,
    classList = '',
    icon,
    iconPrefix = 'iconoir-',
    isDisabled = false,
    label = ''
  } : ButtonProps = $props()

  const getIsDisabled = (typeof isDisabled === 'function')
    ? isDisabled
    : () => isDisabled

</script>

<button class="sveabutton {(icon)
    ? iconPrefix + icon
    : ''} {classList}"
  class:iconOnly={icon && label === ''}
  disabled={getIsDisabled()}
  type="submit"
  onclick={callback}
  onkeyup={callback} >
  {label}
</button>

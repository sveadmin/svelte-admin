import {
  tick,
} from 'svelte'

import type {
  ValidatorStore,
} from '@sveadmin/common'

export function prepareInputOnBlur(
  validators: ValidatorStore,
  onBlur?: (event: Event) => void
) : (event: Event) => void
{
  return (event: Event) : void => {
    tick().then(() => {
      const target = event.target as HTMLInputElement
      validators.validate({value : target.value})
      if (typeof onBlur === 'function') {
        onBlur(event)
      }
    })
  }
}
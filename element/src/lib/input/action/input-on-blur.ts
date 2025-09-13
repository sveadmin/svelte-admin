import {
  tick,
} from 'svelte'

import type {
  ValidatorStore,
} from '@sveadmin/common'

export function prepareInputOnBlur(
  validators: ValidatorStore,
) : (event?:Event | undefined) => boolean
{
  return (event?:Event | undefined) : boolean => {
    tick().then(() => {
      const target = event?.target as HTMLInputElement
      validators.validate({value : target.value})
    })
    return true
  }
}
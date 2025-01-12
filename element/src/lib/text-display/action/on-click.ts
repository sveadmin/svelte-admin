import { browser } from '$app/environment'

import {
  status,
} from '@sveadmin/common'

export function prepareOnClick(getValue : () => any) : (e:Event) => void
{
  return (e: Event) : void => {
    if (!browser
      || e instanceof MouseEvent === false
      || !e.ctrlKey) {
      return
    }
    status.add('Value copied to clibboard: ' + getValue().toString())
    if (navigator.clipboard) {
      navigator.clipboard.writeText(getValue())
    }
  }
}
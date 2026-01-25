import { browser } from '$app/environment'

import {
  status,
} from '@sveadmin/common'

export function prepareCopyValue(getValue : () => any) : (e?:MouseEvent | undefined) => boolean
{
  return (e?:MouseEvent | undefined) : boolean => {
    if (!browser
      || e instanceof MouseEvent === false
      || !e.ctrlKey) {
      return true // Returning false here could prevent firing further actions. This is not considered an error
    }
    status.add('Value copied to clibboard')
    if (navigator.clipboard) {
      navigator.clipboard.writeText(getValue())
    }
    return true
  }
}
import {
  DEFAULT_LOADER_CLASS,
} from './types.js'

import {
  loader,
} from '@sveadmin/common'

export function enableLoaderOnBody (loaderClass: string = DEFAULT_LOADER_CLASS) : void {
  const bodyClasses = document.body.classList

  loader.subscribe(isLoading => {
    if (isLoading) {
        bodyClasses.add(loaderClass);
    } else {
        bodyClasses.remove(loaderClass);
    }
  })
}
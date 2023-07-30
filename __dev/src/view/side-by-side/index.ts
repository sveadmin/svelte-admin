import {
  router
} from '@sveadmin/common'

import SideBySide from './side-by-side.svelte'

const addRoutes = () => {
  router.add({
    route: '/side-by-side',
    component: SideBySide
  })
}


export {
  addRoutes,
  SideBySide
}
import {
  router
} from '@sveadmin/common'

import Index from './index.svelte'

const addRoutes = () => {
  router.add({
    route: '/',
    component: Index
  })
}


export {
  addRoutes,
  Index
}
import {
  router
} from '@sveadmin/common'

import SimpleTable from './simple-table.svelte'

const addRoutes = () => {
  router.add({
    route: '/simple-table',
    component: SimpleTable
  })
}


export {
  addRoutes,
  SimpleTable
}
<script lang="ts">
  import {
    createContext,
    Table,
  } from '@sveadmin/table'
  
  import type {
    TableContext,
    TableContextKey,
  } from '@sveadmin/table'


  const contextKey: TableContextKey = {key: 'application-role-list'}

  const context: TableContext = createContext(contextKey, {
    actions: {

    },
    data: [
      {
        attributes: {
          id:1,
          name: 'asdasd'
        },
        id:1,
      },
      {
        attributes: {
          id:3,
          name: 'hgjghj'
        },
        id:3,
      }
    ],
    settings: [
      {
        columnVisible: true,
        field: 'id'
      },
      {
        columnVisible: true,
        field: 'name'
      },
    ]
  })

</script>

<Table {contextKey} />

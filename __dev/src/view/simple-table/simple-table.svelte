<script lang="ts">
  import {
    COMPONENT_NUMBER_DISPLAY,
    COMPONENT_NUMBER_INPUT,
    COMPONENT_TEXT_INPUT,
  } from '@sveadmin/element'

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
      column: {
        id: {
          editor: {
            inline: COMPONENT_NUMBER_INPUT
          }
        },
        name: {
          editor: {
            inline: COMPONENT_TEXT_INPUT
          }
        }
      }
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
        field: 'id',
        type: COMPONENT_NUMBER_DISPLAY,
        base: 10,
      },
      {
        columnVisible: true,
        field: 'name'
      },
    ]
  })

</script>

<Table {contextKey} />

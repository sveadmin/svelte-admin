<script lang="ts">
  import {
    COMPONENT_NUMBER_DISPLAY,
    COMPONENT_NUMBER_INPUT,
    COMPONENT_DATE_INTERVAL_DISPLAY,
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
          name: 'asdasd',
          date: '2023-01-01',
        },
        id:1,
      },
      {
        attributes: {
          id:3,
          name: 'hgjghj',
          date: new Date(),
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
        field: 'name',
      },
      {
        columnVisible: true,
        field: 'date',
        type: COMPONENT_DATE_INTERVAL_DISPLAY,
        base: 10,
      },
    ]
  })

</script>

<Table {contextKey} />

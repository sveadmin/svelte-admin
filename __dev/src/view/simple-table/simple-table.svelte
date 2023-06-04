<script lang="ts">
  import {
    COMPONENT_NUMBER_DISPLAY,
    COMPONENT_NUMBER_INPUT,
    COMPONENT_DATE_INTERVAL_DISPLAY,
    COMPONENT_TEXT_INPUT,
    COMPONENT_JSON,
    COMPONENT_IMAGE,
    COMPONENT_SVG,
    COMPONENT_DROPDOWN_SEARCH,
    COMPONENT_CHECKBOX_SWITCH,
    COMPONENT_BUTTON,
  } from '@sveadmin/element'

  import {
    COMPONENT_TEXT_LOOKUP,
    createContext,
    Table,
  } from '@sveadmin/table'
  
  import type {
    RowAttributes,
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
        lookup: {
          editor: {
            inline: COMPONENT_DROPDOWN_SEARCH
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
          checkbox: true,
          id:1,
          name: 'asdasd',
          date: '2023-01-01',
          json: '{"important": "!imprortant", "notImportant": "?"}',
          lookup: 6,
        },
        id:1,
      },
      {
        attributes: {
          id:3,
          name: 'hgjghj',
          date: new Date(),
          image: 'https://thechive.com/wp-content/uploads/2019/12/person-hilariously-photoshops-animals-onto-random-things-xx-photos-18.jpg',
          lookup: 4,
        },
        id:3,
      },
      {
        attributes: {
          checkbox: false,
          id: 9,
          svg: '<?xml version="1.0" encoding="UTF-8" standalone="no"?><!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd"><svg width="100%" height="100%" viewBox="0 0 1100 1100" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve" xmlns:serif="http://www.serif.com/" style="fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:2;">    <g transform="matrix(0.997311,0,0,1.02771,1.47874,-0.025675)">        <rect x="299.326" y="0.927" width="501.348" height="97.304" style="fill:rgb(98,98,98);"/>    </g>    <g transform="matrix(1.39624,0,0,7.19394,-217.93,193.333)">        <rect x="299.326" y="0.927" width="501.348" height="97.304" style="fill:rgb(172,172,172);"/>    </g>    <g transform="matrix(0.997311,0,0,1.02771,1.47874,99.0476)">        <rect x="299.326" y="0.927" width="501.348" height="97.304" style="fill:rgb(199,199,199);"/>    </g>    <g transform="matrix(0.199462,0,0,1.02771,140.296,199.048)">        <rect x="299.326" y="0.927" width="501.348" height="97.304" style="fill:rgb(199,199,199);"/>    </g>    <g transform="matrix(0.199462,0,0,1.02771,740.296,199.048)">        <rect x="299.326" y="0.927" width="501.348" height="97.304" style="fill:rgb(152,152,152);"/>    </g>    <g transform="matrix(0.199462,0,0,1.02771,740.296,799.048)">        <rect x="299.326" y="0.927" width="501.348" height="97.304" style="fill:rgb(152,152,152);"/>    </g>    <g transform="matrix(0.997311,0,0,1.02771,1.47874,899.048)">        <rect x="299.326" y="0.927" width="501.348" height="97.304" style="fill:rgb(152,152,152);"/>    </g>    <g transform="matrix(0.199462,0,0,5.13853,840.296,295.238)">        <rect x="299.326" y="0.927" width="501.348" height="97.304" style="fill:rgb(152,152,152);"/>    </g>    <g transform="matrix(0.199462,0,0,1.02771,140.296,799.048)">        <rect x="299.326" y="0.927" width="501.348" height="97.304" style="fill:rgb(199,199,199);"/>    </g>    <g transform="matrix(0.199462,0,0,5.13853,40.2957,295.238)">        <rect x="299.326" y="0.927" width="501.348" height="97.304" style="fill:rgb(199,199,199);"/>    </g>    <g transform="matrix(0.997311,0,0,1.02771,1.47874,999.048)">        <rect x="299.326" y="0.927" width="501.348" height="97.304" style="fill:rgb(98,98,98);"/>    </g>    <g transform="matrix(0.199462,0,0,1.02771,140.296,99.0476)">        <rect x="299.326" y="0.927" width="501.348" height="97.304" style="fill:rgb(98,98,98);"/>    </g>    <g transform="matrix(0.199462,0,0,1.02771,740.296,99.0476)">        <rect x="299.326" y="0.927" width="501.348" height="97.304" style="fill:rgb(98,98,98);"/>    </g>    <g transform="matrix(0.199462,0,0,1.02771,840.296,199.048)">        <rect x="299.326" y="0.927" width="501.348" height="97.304" style="fill:rgb(98,98,98);"/>    </g>    <g transform="matrix(0.199462,0,0,1.02771,840.296,799.048)">        <rect x="299.326" y="0.927" width="501.348" height="97.304" style="fill:rgb(98,98,98);"/>    </g>    <g transform="matrix(0.199462,0,0,1.02771,740.296,899.048)">        <rect x="299.326" y="0.927" width="501.348" height="97.304" style="fill:rgb(98,98,98);"/>    </g>    <g transform="matrix(0.199462,0,0,1.02771,40.2957,199.048)">        <rect x="299.326" y="0.927" width="501.348" height="97.304" style="fill:rgb(98,98,98);"/>    </g>    <g transform="matrix(0.199462,0,0,1.02771,40.2957,799.048)">        <rect x="299.326" y="0.927" width="501.348" height="97.304" style="fill:rgb(98,98,98);"/>    </g>    <g transform="matrix(0.199462,0,0,1.02771,140.296,899.048)">        <rect x="299.326" y="0.927" width="501.348" height="97.304" style="fill:rgb(98,98,98);"/>    </g>    <g transform="matrix(0.199462,0,0,5.13853,-59.7043,295.238)">        <rect x="299.326" y="0.927" width="501.348" height="97.304" style="fill:rgb(98,98,98);"/>    </g>    <g transform="matrix(0.199462,0,0,5.13853,940.296,295.238)">        <rect x="299.326" y="0.927" width="501.348" height="97.304" style="fill:rgb(98,98,98);"/>    </g>    <g transform="matrix(0.199462,0,0,4.11082,440.296,396.19)">        <rect x="299.326" y="0.927" width="501.348" height="97.304" style="fill:rgb(98,98,98);"/>    </g>    <g transform="matrix(0.398925,0,0,1.02771,380.591,299.048)">        <rect x="299.326" y="0.927" width="501.348" height="97.304" style="fill:rgb(98,98,98);"/>    </g>    <g transform="matrix(0.598387,0,0,1.02771,220.887,499.048)">        <rect x="299.326" y="0.927" width="501.348" height="97.304" style="fill:rgb(98,98,98);"/>    </g></svg>'
        }
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
      {
        base: 8,
        columnVisible: true,
        field: 'lookup',
        type: COMPONENT_TEXT_LOOKUP,
        values: [
          {
            id: 6,
            value: 'GOOD VALUE'
          }
        ]
      },
      {
        columnVisible: true,
        field: 'checkbox',
        type: COMPONENT_CHECKBOX_SWITCH,
      },
      {
        columnVisible: true,
        field: 'image',
        type: COMPONENT_IMAGE,
      },
      {
        columnVisible: true,
        field: 'svg',
        type: COMPONENT_SVG,
      },
      {
        columnVisible: true,
        field: 'burron',
        type: COMPONENT_BUTTON,
        callback: (attributes: RowAttributes) => window.alert(`Clicked on row ${attributes.id}`)
      },
      {
        columnVisible: true,
        field: 'json',
        fields: ['important'],
        type: COMPONENT_JSON,
        base: 5,
      },
    ]
  })

</script>

<Table {contextKey} />

<script lang="ts">
  import {
    router,
  } from '@sveadmin/common'

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

  const contextKey1: TableContextKey = {key: 'side-by-side-1'}
  const contextKey2: TableContextKey = {key: 'side-by-side-1'}

  const data = {
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
        field: 'button',
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
  }

  const context1: TableContext = createContext(contextKey1, data)

  const context2: TableContext = createContext(contextKey2, data)

</script>

<h2>
  <a href="/" on:click={router.navigateFromLink}>Home</a>
</h2>
<div style="display:flex;">
  <Table contextKey={contextKey1} />
  <Table contextKey={contextKey2} />
</div>
<h3>Footer just to mess with the dimensions</h3>
<h3>SVEADMIN is great!</h3>
<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus non tortor rhoncus, venenatis nibh et, tincidunt nunc. Nam nulla ligula, euismod non elementum et, suscipit id libero. Mauris posuere enim id risus sollicitudin porttitor. Proin tincidunt metus congue consectetur dapibus. Nam volutpat nisl sit amet diam aliquet, at fermentum nibh congue. Maecenas tempor iaculis mauris in congue. Nullam varius non tortor sit amet vulputate. Vestibulum malesuada ligula ut ex dapibus, quis maximus orci malesuada. Duis vitae rhoncus est. Proin pellentesque gravida magna et bibendum. Fusce quis nulla dapibus, tincidunt ante eu, bibendum dolor. Pellentesque suscipit purus in nisi rutrum vulputate. Nullam felis justo, aliquet sed enim ac, lacinia pulvinar quam.

Morbi nisi nibh, viverra a pellentesque vel, laoreet id orci. Duis quis dolor porttitor, elementum quam ultricies, cursus eros. Donec vestibulum luctus iaculis. Vestibulum vitae est erat. Nunc at sapien in ipsum ultrices vulputate. Etiam mi mauris, venenatis eu sapien at, viverra interdum purus. Nullam venenatis aliquet est, bibendum bibendum enim mollis quis.

Pellentesque gravida est quis turpis bibendum, ac maximus leo elementum. Cras a ultrices urna, nec faucibus mi. Nunc ac urna lobortis, tincidunt ipsum ac, consectetur dolor. Curabitur sit amet vehicula libero. Donec vestibulum mattis lectus a gravida. Donec tincidunt dictum vehicula. Integer tristique risus neque, quis lobortis odio consequat sed. In pretium euismod dui nec semper. Vivamus lacinia tellus vitae enim aliquam consectetur. Sed eleifend id libero tempus consequat.

Cras tincidunt hendrerit sem, sed bibendum lacus hendrerit sit amet. Quisque non sem orci. Ut vitae vulputate justo. Pellentesque aliquet pulvinar risus faucibus scelerisque. Etiam mi nulla, iaculis vitae tristique dignissim, malesuada ac neque. Aenean scelerisque eleifend diam, quis molestie arcu lacinia vitae. Suspendisse in lacinia felis. Mauris sodales luctus felis, ut maximus justo tincidunt vitae. Vivamus elit arcu, tristique et vehicula eu, feugiat at orci. Nulla facilisi. Nullam est risus, pellentesque id erat id, mollis finibus urna.

Donec tincidunt, nibh a facilisis blandit, nulla lorem tincidunt ligula, nec bibendum neque erat et ante. Nam tincidunt vel odio at mollis. Suspendisse ut metus ornare, vestibulum lacus in, varius magna. Curabitur vel commodo neque, et ornare metus. Etiam id ipsum purus. Nunc suscipit pharetra sapien a scelerisque. Nunc ut ante diam. Proin et elit sed justo rutrum convallis a a lacus. Praesent ut lorem aliquam, dignissim lacus non, ornare enim. Nulla vitae ornare diam. Nunc mauris sem, luctus eget nibh in, mattis venenatis nisl. Mauris diam eros, finibus ac elit a, consectetur volutpat lectus. Mauris sed diam varius, eleifend augue et, tempus odio. Morbi ultricies velit vitae justo molestie, ut interdum ex commodo. Fusce mi odio, auctor ac mollis non, consequat id nunc. Vestibulum non nisi viverra, varius nisl sed, tempor urna.</p>

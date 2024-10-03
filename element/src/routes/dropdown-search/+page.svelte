<script lang="ts">
  import {
    DropdownSearch,
  } from '$lib/dropdown-search/index.js'

  import type {
    Option,
  } from '$lib/types.js'

  const numberLookup: Option[] = [
    {
      id: '1',
      value: 'one'
    },
    {
      id: '2',
      value: 'two'
    },
    {
      id: '3',
      value: 'three'
    },
    {
      id: '4',
      value: 'four'
    },
    {
      id: '5',
      value: 'five'
    },
    {
      id: '6',
      value: 'six'
    },
  ]

</script>
<h2>Dropdown for numbers</h2>
<DropdownSearch values={numberLookup} />
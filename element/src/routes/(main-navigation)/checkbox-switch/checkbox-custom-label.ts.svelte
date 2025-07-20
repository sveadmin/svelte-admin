<script lang="ts">
  import {
    CheckboxSwitch,
  } from '$lib/checkbox-switch/index.js'

  import {
    GridLine,
  } from '$lib/grid/index.js'
</script>
<GridLine>
  <span class="grid-span-6">No default value or binding with custom labels</span>
  <span class="grid-span-6">
    <CheckboxSwitch labels={{true: 'Right', false: 'Left'}}/>
  </span>
</GridLine>

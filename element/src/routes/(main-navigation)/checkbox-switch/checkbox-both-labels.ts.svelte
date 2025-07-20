<script lang="ts">
  import {
    CheckboxSwitch,
  } from '$lib/checkbox-switch/index.js'

  import {
    GridLine,
  } from '$lib/grid/index.js'
</script>
<GridLine>
  <span class="grid-span-6">Both values are visible</span>
  <span class="grid-span-6">
    <CheckboxSwitch labels={{true: 'Right', false: 'Left'}} areBothValuesVisible={true}/>
  </span>
</GridLine>

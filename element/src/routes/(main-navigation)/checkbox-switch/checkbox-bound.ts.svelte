<script lang="ts">
  import {
    CheckboxSwitch,
  } from '$lib/checkbox-switch/index.js'
  
  import {
    GridLine,
  } from '$lib/grid/index.js'

  let booleanStore = $state(false)
</script>
<GridLine>
  <span class="grid-span-6">With binding via store</span>
  <span class="grid-span-3">
    <CheckboxSwitch bind:value={booleanStore}/>
  </span>
  <span class="grid-span-3">
    local variable value is {booleanStore ? 'ON' : 'off'}
  </span>
</GridLine>
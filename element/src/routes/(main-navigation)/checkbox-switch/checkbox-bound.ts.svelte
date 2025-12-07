<script lang="ts">
  import {
    Button,
  } from '$lib/button/index.js'

  import {
    CheckboxSwitch,
  } from '$lib/checkbox-switch/index.js'
  
  import {
    GridLine,
  } from '$lib/grid/index.js'

  let booleanStore = $state(false)
</script>
<GridLine>
  <span class="grid-span-6">With binding via store => value: {booleanStore ? 'ON' : 'off'}</span>
  <span class="grid-span-2">
    <CheckboxSwitch bind:value={booleanStore}/>
  </span>
  <span class="grid-span-2">
    <Button onClick={() => booleanStore = true} label="On"/>
  </span>
  <span class="grid-span-2">
    <Button onClick={() => booleanStore = false} label="Off"/>
  </span>
</GridLine>
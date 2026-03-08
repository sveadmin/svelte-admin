<script lang="ts">
  import {
    CheckboxSwitch,
  } from '$lib/checkbox-switch/index.js'

  import {
    GridLine,
  } from '$lib/grid/index.js'

  let booleanValue = false
</script>
<GridLine>
  <span class="grid-span-6">Default value without binding</span>
  <span class="grid-span-3">
    <CheckboxSwitch value={booleanValue}/>
  </span>
  <span class="grid-span-3">
    local variable value is {booleanValue ? 'ON' : 'off'}
  </span>
</GridLine>
<GridLine>
  <span class="grid-span-12">Binding the value on this element triggers warning
`booleanValue` is updated, but is not declared with `$state(...)`. Changing its value will not correctly trigger updates</span>
</GridLine>

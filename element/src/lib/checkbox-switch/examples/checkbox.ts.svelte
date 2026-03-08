<script lang="ts">
  import {
    SIZE_EXTRA_LARGE,
    SIZE_LARGE,
    SIZE_SMALL,
  } from '$lib/types.js'

  import {
    CheckboxSwitch,
  } from '$lib/checkbox-switch/index.js'

  import {
    GridLine,
  } from '$lib/grid/index.js'
</script>

<GridLine>
  <span class="grid-span-6">No default value or binding</span>
  <span class="grid-span-6">
    <CheckboxSwitch />
  </span>
</GridLine>
<GridLine>
  <span class="grid-span-6">Small</span>
  <span class="grid-span-6">
    <CheckboxSwitch size={SIZE_SMALL}/>
  </span>
</GridLine>
<GridLine>
  <span class="grid-span-6">Large</span>
  <span class="grid-span-6">
    <CheckboxSwitch  size={SIZE_LARGE}/>
  </span>
</GridLine>
<GridLine>
  <span class="grid-span-6">Extra large</span>
  <span class="grid-span-6">
    <CheckboxSwitch  size={SIZE_EXTRA_LARGE}/>
  </span>
</GridLine>
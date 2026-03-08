<script lang="ts">
  import {
    Checkbox,
  } from '$lib/checkbox/index.js'

  import {
    GridLine,
  } from '$lib/grid/index.js'

  import {
    SIZE_SMALL,
    SIZE_LARGE,
    SIZE_EXTRA_LARGE,
  } from '$lib/types.js'
</script>

<GridLine>
  <span class="grid-span-4">Simple checkbox</span>
  <span class="grid-span-4">
    <Checkbox />
  </span>
  <span class="grid-span-4">
    <Checkbox isHintHidden={true} />
  </span>
</GridLine>
<GridLine>
  <span class="grid-span-4">Simple checkbox small</span>
  <span class="grid-span-4">
    <Checkbox size={SIZE_SMALL} />
  </span>
  <span class="grid-span-4">
    <Checkbox size={SIZE_SMALL} isHintHidden={true} />
  </span>
</GridLine>
<GridLine>
  <span class="grid-span-4">Simple checkbox large</span>
  <span class="grid-span-4">
    <Checkbox size={SIZE_LARGE} />
  </span>
  <span class="grid-span-4">
    <Checkbox size={SIZE_LARGE} isHintHidden={true} />
  </span>
</GridLine>
<GridLine>
  <span class="grid-span-4">Simple checkbox extra large</span>
  <span class="grid-span-4">
    <Checkbox size={SIZE_EXTRA_LARGE} />
  </span>
  <span class="grid-span-4">
    <Checkbox size={SIZE_EXTRA_LARGE} isHintHidden={true} />
  </span>
</GridLine>
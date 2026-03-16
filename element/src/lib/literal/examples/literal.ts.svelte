<script lang="ts">
  import {
    Literal,
  } from '$lib/literal/index.js'

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
  <span class="grid-span-4">Simple text setting width with span</span>
  <span class="grid-span-8">
    <Literal style="text-align: center;" value="This is a simple centered text" />
  </span>
</GridLine>
<GridLine>
  <span class="grid-span-4">Simple text setting width with component (sveagridline font size does not apply)</span>
  <Literal class="grid-span-8" style="text-align: center;" value="This is a simple centered text" />
</GridLine>
<GridLine>
  <span class="grid-span-4">Simple text small size</span>
  <span class="grid-span-8">
    <Literal size={SIZE_SMALL} value="This is a small text" />
  </span>
</GridLine>
<GridLine>
  <span class="grid-span-4">Simple text large size</span>
  <span class="grid-span-8">
    <Literal size={SIZE_LARGE} value="This is a large text" />
  </span>
</GridLine>
<GridLine>
  <span class="grid-span-4">Simple text extra large size</span>
  <span class="grid-span-8">
    <Literal size={SIZE_EXTRA_LARGE} value="This is an extra large text" />
  </span>
</GridLine>
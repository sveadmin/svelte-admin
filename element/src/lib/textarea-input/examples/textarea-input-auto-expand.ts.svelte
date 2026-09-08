<script lang="ts">
  import {
    TextareaInput,
  } from '$lib/textarea-input/index.js'

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
  <span class="grid-span-4">Textarea with some HTML</span>
  <span class="grid-span-8">
    <TextareaInput isHeightAutoAdjusted={true} style="text-align: center;" placeholder="Enter text here..." />
  </span>
</GridLine>
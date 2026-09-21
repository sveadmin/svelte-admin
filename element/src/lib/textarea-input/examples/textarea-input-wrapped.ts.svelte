<script lang="ts">
  import {
    TextareaInputWrapped,
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
  <span class="grid-span-4">Showing off a placeholder</span>
  <TextareaInputWrapped class="grid-span-8" placeholder="This is the placeholder" />
</GridLine>
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
  <span class="grid-span-4">Textarea with fixed size</span>
  <span class="grid-span-8">
    <TextareaInput style="text-align: center;" visibleWidth="25rem" visibleHeight="15rem">
      <h1>This textarea has a fixed size</h1>
      Editing the content does not expand the textarea
    </TextareaInput>
  </span>
</GridLine>
<GridLine>
  <span class="grid-span-4">Textarea with maxiumum height</span>
  <span class="grid-span-8">
    <TextareaInput style="text-align: center;" maxHeight="15rem">
      <h1>This textarea has a maximum height</h1>
      Editing the content does not expand the textarea
    </TextareaInput>
  </span>
</GridLine>
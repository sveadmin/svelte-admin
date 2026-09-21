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
  <span class="grid-span-8">Textarea with spellcheck (it is only done when the input has been focused at least once)</span>
  <span class="grid-span-4">
    <TextareaInput autoFocus={true} style="text-align: center;" spellcheck="true" value="<h1>This is a simple centered text without HTML parsing!</h1><p>This item is also focused on load</p>" />
  </span>
</GridLine>
<GridLine>
  <span class="grid-span-6">
    <TextareaInput style="text-align: center;" spellcheck="true" value="This is an extra large text" >
      <h1>This paragraph is using the same width as the one to the right.</h1><h2>This one is using the width definition on the parent elemment.</h2>
    </TextareaInput>
  </span>
  <TextareaInput class="grid-span-6" spellcheck="true" style="text-align: center;"  value="This is an extra large text" >
    <h1>This paragraph is using the same width as the one to the left</h1><h2>This one sizes the literal element direktly.</h2>
  </TextareaInput>
</GridLine>
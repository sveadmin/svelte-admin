<script lang="ts">
  import {
    RESIZE_BOTH,
    RESIZE_HORIZONTAL,
    RESIZE_VERTICAL,
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
  <span class="grid-span-4">Textarea with resize in both directions</span>
  <span class="grid-span-8">
    <TextareaInput style="text-align: center;" resize={RESIZE_BOTH} value="<h1>This is a simple centered text !</h1><p>With another paragralph</p>" />
  </span>
</GridLine>
<GridLine>
  <span class="grid-span-4">Simple Long text in tighter space</span>
  <span class="grid-span-4">
    <TextareaInput style="text-align: center;" spellcheck="true" value="This is an extra large text" >
      <h1>This paragraph is using the same width as the one to the right.</h1><h2>This one is using the width definition on the parent elemment.</h2>
    </TextareaInput>
  </span>
  <TextareaInput class="grid-span-4" spellcheck="true" style="text-align: center;"  value="This is an extra large text" >
    <h1>This paragraph is using the same width as the one to the left</h1><h2>This one sizes the literal element direktly.</h2>
  </TextareaInput>
</GridLine>
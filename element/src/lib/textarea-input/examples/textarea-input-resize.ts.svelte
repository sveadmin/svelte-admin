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
    <TextareaInput style="text-align: center;" resize={RESIZE_BOTH} value="This textarea can be resized in both directions" />
  </span>
</GridLine>
<GridLine>
  <span class="grid-span-4">Textarea with resized horizontally</span>
  <span class="grid-span-8">
    <TextareaInput style="text-align: center;" resize={RESIZE_HORIZONTAL} value="This textarea can be resized horizontally" />
  </span>
</GridLine>
<GridLine>
  <span class="grid-span-4">Texta reas which can be resized veritcally</span>
  <span class="grid-span-4">
    <TextareaInput style="text-align: center;" resize={RESIZE_VERTICAL} spellcheck="true" value="This is an extra large text" >
      <h1>This paragraph is using the same width as the one to the right.</h1><h2>This one is using the width definition on the parent elemment.</h2>
    </TextareaInput>
  </span>
  <TextareaInput class="grid-span-4" resize={RESIZE_VERTICAL} spellcheck="true" style="text-align: center;"  value="This is an extra large text" >
    <h1>This paragraph is using the same width as the one to the left</h1><h2>This one sizes the literal element direktly.</h2>
  </TextareaInput>
</GridLine>
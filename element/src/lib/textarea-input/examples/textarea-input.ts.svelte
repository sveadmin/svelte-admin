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
    <TextareaInput isHTML={true} style="text-align: center;" value="<h1>This is a simple centered text !</h1><p>With another paragraph</p>" />
  </span>
</GridLine>
<GridLine>
  <span class="grid-span-4">Textarea with set width with component</span>
  <TextareaInput class="grid-span-8" isHTML={true} style="text-align: center;" value="<h1>This is a simple centered text !</h1><p>With another paragraph</p>" />
</GridLine>
<GridLine>
  <span class="grid-span-4">Simple textarea small size</span>
  <span class="grid-span-8">
    <TextareaInput isHTML={true} size={SIZE_SMALL} value="<h1>This is a simple text !</h1><p>With another paragraph</p>" />
  </span>
</GridLine>
<GridLine>
  <span class="grid-span-4">Simple textarea large size</span>
  <span class="grid-span-8">
    <TextareaInput isHTML={true} size={SIZE_LARGE} value="<h1>This is a simple text !</h1><p>With another paragraph</p>" />
  </span>
</GridLine>
<GridLine>
  <span class="grid-span-4">Simple textarea extra large size</span>
  <span class="grid-span-8">
    <TextareaInput isHTML={true} size={SIZE_EXTRA_LARGE} value="<h1>This is a simple text !</h1><p>With another paragraph</p>" />
  </span>
</GridLine>
<GridLine>
  <span class="grid-span-4">Simple Long text in tighter space</span>
  <span class="grid-span-4">
    <TextareaInput style="text-align: center;" value="This is an extra large text" >
      <h1>This paragraph is using the same width as the one to the right.</h1><h2>This one is using the width definition on the parent element.</h2>
    </TextareaInput>
  </span>
  <TextareaInput class="grid-span-4" style="text-align: center;"  value="This is an extra large text" >
    <h1>This paragraph is using the same width as the one to the left</h1><h2>This one sizes the literal element directly.</h2>
  </TextareaInput>
</GridLine>
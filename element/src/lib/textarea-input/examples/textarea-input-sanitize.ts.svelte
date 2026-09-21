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
  <span class="grid-span-4">Textarea with script in the value</span>
  <span class="grid-span-8">
    <TextareaInput isHTML={true} style="text-align: center;" value="<h1>Testing XSS</h1>
      <script>alert('Script in the value + HTML');</script>
      <img src='x' onerror='console.error(`Script through image error in value`)'>
      " />
  </span>
</GridLine>
<GridLine>
  <span class="grid-span-4">Textarea with script in children</span>
  <span class="grid-span-8">
    <TextareaInput style="text-align: center;" value="This is an extra large text" >
      <h1>Testing XSS</h1>
      {"<script>"}alert('Script in the children');{"</script>"}
      <img src="x" onerror={console.error('Script through image error in children')}>
    </TextareaInput>
  </span>
</GridLine>
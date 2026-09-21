<script lang="ts">
  import {
    TextareaDisplay,
  } from '$lib/textarea-display/index.js'

  import {
    TextareaInput,
  } from '$lib/textarea-input/index.js'

  import {
    GridLine,
  } from '$lib/grid/index.js'

  let boundValueNoDefault = $state(''),
    boundValueNoDefaultChildren = $state(''),
    boundValue = $state(''),
    boundValueOnlyText = $state('')

</script>

<GridLine>
  <span class="grid-span-4">Textarea with bound value (no formatting and no default value)</span>
  <span class="grid-span-4">
    <TextareaInput style="text-align: center;" bind:value={boundValueNoDefault} />
  </span>
  <span class="grid-span-4">
    <TextareaDisplay value={boundValueNoDefault} />
  </span>
</GridLine>
<GridLine>
  <span class="grid-span-4">Textarea with bound value (no formatting empty children)</span>
  <span class="grid-span-4">
    <TextareaInput style="text-align: center;" bind:value={boundValueNoDefaultChildren}>
    </TextareaInput>
  </span>
  <span class="grid-span-4">
    <TextareaDisplay value={boundValueNoDefaultChildren} />
  </span>
</GridLine>
{#if false}
<GridLine>
  <span class="grid-span-4">Textarea with bound value (full HTML)</span>
  <span class="grid-span-4">
    <TextareaInput style="text-align: center;" bind:value={boundValue}>
       <h1>This is a simple centered text !</h1>
       <p>With another paragraph</p>
    </TextareaInput>
  </span>
  <span class="grid-span-4">
    <TextareaDisplay value={boundValue} />
  </span>
</GridLine>
<GridLine>
  <span class="grid-span-4">Textarea with bound value (only text)</span>
  <span class="grid-span-4">
    <TextareaInput style="text-align: center;" bind:value={boundValueOnlyText} isHTMLExported={false}>
       <h1>This is a simple centered text !</h1>
       <p>With another paragraph</p>
    </TextareaInput>
  </span>
  <span class="grid-span-4">
    <TextareaDisplay value={boundValueOnlyText} />
  </span>
</GridLine>
{/if}
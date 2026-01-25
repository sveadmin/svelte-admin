<script lang="ts">
  import {
    GridLine,
  } from '$lib/grid/index.js'

  import {
    SIZE_SMALL,
    SIZE_LARGE,
    SIZE_EXTRA_LARGE,
  } from '$lib/types.js'

  import {
    TextInput,
    TextInputWrapped,
  } from '$lib/text-input/index.js'

  import type {
    TextInputProps,
  } from '$lib/text-input/index.js'
</script>

{#snippet inputElement(properties: TextInputProps)}
<TextInput
  {...properties}
  style="border-style:dotted;"
  value={properties.value || "Value from the Snippet"} />
{/snippet}

<GridLine class="demopage-text-input">
  <h3 class="grid-span-6">Wrapped container with custom input</h3>
  <TextInputWrapped class="grid-span-3" input={inputElement} />
</GridLine>
<GridLine class="demopage-text-input">
  <h3 class="grid-span-6">Wrapped container with custom input but value overwrite</h3>
  <TextInputWrapped class="grid-span-3" input={inputElement} value="This is the value from the wrapper"/>
</GridLine>
<GridLine class="demopage-text-input">
  <h3 class="grid-span-6">Wrapped container with placeholder</h3>
  <TextInputWrapped class="grid-span-3" value="" placeholder="Using Sveadmin placeholder"/>
  <h3 class="grid-span-6">Small wrapped container with placeholder</h3>
  <TextInputWrapped class="grid-span-3" value="" placeholder="Using Sveadmin placeholder" size={SIZE_SMALL}/>
  <h3 class="grid-span-6">Large wrapped container with placeholder</h3>
  <TextInputWrapped class="grid-span-4" value="" placeholder="Using Sveadmin placeholder" size={SIZE_LARGE}/>
  <h3 class="grid-span-6">Etra large wrapped container with placeholder</h3>
  <TextInputWrapped class="grid-span-5" value="" placeholder="Using Sveadmin placeholder" size={SIZE_EXTRA_LARGE}/>
</GridLine>
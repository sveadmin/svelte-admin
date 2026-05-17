<script lang="ts">
  import {
    GridLine,
  } from '$lib/grid/index.js'

  import {
    Input,
    InputWrapped,
  } from '$lib/input/index.js'

  import {
    formattedLabel,
  } from './formatted-label.svelte'

  import {
    inputElement,
  } from './input-element.svelte'

</script>

<GridLine>
  <h3 class="grid-span-6">Custom format for label</h3>
  <span class="grid-span-6">
    <Input label={formattedLabel} />
  </span>
</GridLine>
<GridLine>
  <Input label="Input text using grid line and label" class="grid-span-4" labelClass="grid-span-6"/>
</GridLine>
<GridLine>
  <Input class="grid-span-4" childrenConfig={{label: {class: 'grid-span-6', label: 'Label can be passed as children property'}}}/>
</GridLine>
<GridLine class="demopage-text-input">
  <h3 class="grid-span-6">Wrapped container with custom input</h3>
  <InputWrapped class="grid-span-5" input={inputElement} />
</GridLine>
<GridLine class="demopage-text-input">
  <h3 class="grid-span-6">Wrapped container with custom input but value overwrite</h3>
  <InputWrapped class="grid-span-5" input={inputElement} value="This is the value from the wrapper"/>
</GridLine>
<GridLine class="demopage-text-input">
  <h3 class="grid-span-6">Wrapped container with simple label passthrough</h3>
  <InputWrapped class="grid-span-5" input={inputElement} label="This is passed to the custom component"/>
</GridLine>
<GridLine class="demopage-text-input">
  <h3 class="grid-span-6">Wrapped container with formatted label passthrough</h3>
  <InputWrapped class="grid-span-5" input={inputElement} label={formattedLabel}/>
</GridLine>


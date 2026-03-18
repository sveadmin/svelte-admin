<script lang="ts">
  import type {
    SveadminComponentMask,
  } from '$lib/types.js'

  import {
    GridContainer,
    GridLine,
  } from '$lib/grid/index.js'

  import {
    TEXT_DISPLAY_TYPE_NUMBER,
  } from '$lib/number/index.js'

  import {
    TextDisplay,
  } from '$lib/text-display/index.js'

  let boundValue : number = $state(123456.789)
  const mask : SveadminComponentMask = [
    'Wrapped elements copy their value to clipboard on CTRL+Click: ',
    {
      type: TEXT_DISPLAY_TYPE_NUMBER
    }
  ]
</script>

<GridContainer class="demopage-grid">
  <GridLine>
    <TextDisplay class="grid-span-8"
      isCopyingEnabledOnClick={true}
      mask={mask}
      bind:value={boundValue} />
    <span>Change: </span>
    <input class="grid-span-3" bind:value={boundValue} type="text"/>
  </GridLine>
  <GridLine>
    <p class="grid-span-9">JS can only write the clipboard if the connection is secure</p>
    <textarea class="grid-span-3"
      id="test"
      name="test"
      placeholder="Paste text here...."></textarea>
  </GridLine>
</GridContainer>
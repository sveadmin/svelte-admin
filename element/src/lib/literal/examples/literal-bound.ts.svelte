<script lang="ts">
  import {
    GridContainer,
    GridLine,
  } from '$lib/grid/index.js'

  import {
    Literal,
  } from '$lib/literal/index.js'

  import {
    TEXT_DISPLAY_TYPE_TEXT,
  } from '$lib/text-display/index.js'

  const boundValueMask = [
    'This ',
    {
      type: TEXT_DISPLAY_TYPE_TEXT,
    },
    ' is bound and masked',
  ]

  let boundValue = $state('value')
</script>

<GridContainer class="demopage-grid">
  <GridLine>
    <span class="grid-span-8">
      <Literal
        mask={boundValueMask}
        bind:value={boundValue} />
    </span>
    <span>Change: </span>
    <input class="grid-span-3" bind:value={boundValue} type="text"/>
  </GridLine>
</GridContainer>
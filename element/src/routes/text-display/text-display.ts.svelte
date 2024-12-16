<script lang="ts">
  import {
    GridContainer,
    GridLine,
  } from '$lib/grid/index.js'

  import {
    TextDisplay,
  } from '$lib/text-display/index.js'
</script>

<GridContainer class="demopage-grid">
  <GridLine>
    <span class="grid-span-12">
      <TextDisplay value="This is a simple text display" />
    </span>
  </GridLine>
</GridContainer>
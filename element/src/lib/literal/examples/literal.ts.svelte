<script lang="ts">
  import {
    GridContainer,
    GridLine,
  } from '$lib/grid/index.js'

  import {
    Literal,
  } from '$lib/literal/index.js'
</script>

<GridContainer class="demopage-grid">
  <GridLine>
    <span class="grid-span-12">
      <Literal value="This is a simple text display" />
    </span>
  </GridLine>
</GridContainer>
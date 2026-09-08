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
      <Literal isHTML={true} value="<h1>This is HTML</h1><p>Written in a really uncomfortable way</p>" />
    </span>
  </GridLine>
</GridContainer>
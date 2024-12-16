<script lang="ts">
  import {
    GridContainer,
    GridLine,
  } from '$lib/grid/index.js'
</script>
<GridContainer class="demopage-grid">
  <GridLine style="align-items: flex-start">
    <div class="grid-span-6">1</div>
    <div class="grid-span-6" style="height:5rem;">`align-items: flex-start` on the GridLine</div>
  </GridLine>
</GridContainer>
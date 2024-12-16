<script lang="ts">
  import {
    GridContainer,
    GridLine,
  } from '$lib/grid/index.js'
</script>
<GridContainer class="demopage-grid">
  <GridLine>
    <div class="grid-span-6">1</div>
    <div class="grid-span-6" style="height:5rem;">Without align-items, default is center aligned</div>
  </GridLine>
</GridContainer>
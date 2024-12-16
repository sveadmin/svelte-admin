<script lang="ts">
  import {
    GridContainer,
    GridLine,
  } from '$lib/grid/index.js'
</script>
<GridContainer class="demopage-grid">
  <GridLine>
    <div class="grid-span-6">span: 6</div>
    <div class="grid-span-3">span: 3</div>
    <div class="grid-span-2">span: 2</div>
    <div>4</div>
  </GridLine>
  <GridLine>
    <div class="grid-start-6 grid-span-2">start: 6, span: 2</div>
    <div class="grid-span-3">span: 3</div>
    <div class="grid-span-2">span: 2</div>
  </GridLine>
</GridContainer>
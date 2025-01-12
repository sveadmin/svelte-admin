<script lang="ts">
  import './grid.css'

  // @ts-ignore: This is a functioning and correct import, sometimes TS does not understand svelte files
  import SimpleGrid from './grid.ts.svelte'
  // @ts-ignore: This is a functioning and correct import, sometimes TS does not understand svelte files
  import GridStartSpan from './grid-start-span.ts.svelte'
  // @ts-ignore: This is a functioning and correct import, sometimes TS does not understand svelte files
  import GridCustomStyles from './grid-custom-styles.ts.svelte'
  // @ts-ignore: This is a functioning and correct import, sometimes TS does not understand svelte files
  import GridAlignTop from './grid-align-top.ts.svelte'
  // @ts-ignore: This is a functioning and correct import, sometimes TS does not understand svelte files
  import GridInGrid from './grid-in-grid.ts.svelte'
  // @ts-ignore: This is a functioning and correct import, sometimes TS does not understand svelte files
  import GridDynamicClasses from './grid-dynamic-classes.ts.svelte'
</script>
<h2>Grid with basic settings</h2>
<SimpleGrid />
<h2>Grid with start and span classes</h2>
<GridStartSpan />
<h2>Custom stlyes</h2>
<GridCustomStyles />
<h3>Align items top</h3>
<GridAlignTop />
<h2>Grid within Grid</h2>
<GridInGrid />
<h2>Dynamic grid sizing</h2>
<GridDynamicClasses />
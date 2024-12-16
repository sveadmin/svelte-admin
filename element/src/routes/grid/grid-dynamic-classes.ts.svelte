<script lang="ts">
  import './grid.css'

  import {
    GridContainer,
    GridLine,
  } from '$lib/grid/index.js'

  const classes = $state(['grid-span-12'])

  const changeClass = (event: Event) => {
    const target = event.target as HTMLInputElement
    classes[0] = target?.dataset?.classname ?? 'grid-span-12'
  }
</script>
<GridContainer class="demopage-grid">
  <GridLine>
    <div class={classes.join(' ')}>{classes[0]}</div>
  </GridLine>
  <GridLine>
    <input type="button" onclick={changeClass} data-classname="grid-span-1" value="1">
    <input type="button" onclick={changeClass} data-classname="grid-span-2" value="2">
    <input type="button" onclick={changeClass} data-classname="grid-span-3" value="3">
    <input type="button" onclick={changeClass} data-classname="grid-span-4" value="4">
    <input type="button" onclick={changeClass} data-classname="grid-span-5" value="5">
    <input type="button" onclick={changeClass} data-classname="grid-span-6" value="6">
    <input type="button" onclick={changeClass} data-classname="grid-span-7" value="7">
    <input type="button" onclick={changeClass} data-classname="grid-span-8" value="8">
    <input type="button" onclick={changeClass} data-classname="grid-span-9" value="9">
    <input type="button" onclick={changeClass} data-classname="grid-span-10" value="10">
    <input type="button" onclick={changeClass} data-classname="grid-span-11" value="11">
    <input type="button" onclick={changeClass} data-classname="grid-span-12" value="12">
  </GridLine>
</GridContainer>
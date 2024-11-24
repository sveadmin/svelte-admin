<script lang="ts">
  import './grid.css'

  import {
    GridContainer,
    GridLine,
    GridSeparator,
  } from '$lib/grid/index.js'

  const classes = $state(['grid-span-12'])

  const changeClass = (event: Event) => {
    const target = event.target as HTMLInputElement
    classes[0] = target?.dataset?.classname ?? 'grid-span-12'
  }

</script>
<h2>Grid with basic settings</h2>
<GridContainer class="demopage-grid">
  <GridLine>
    <div>1</div>
    <div>2</div>
    <div>3</div>
    <div>4</div>
  </GridLine>
  <GridLine>
    <div>5</div>
    <div>6</div>
    <div>7</div>
  </GridLine>
</GridContainer>
<GridSeparator />
<h2>Grid with start and span classes</h2>
<GridContainer class="demopage-grid">
  <GridLine>
    <div class="grid-span-6">1</div>
    <div class="grid-span-3">2</div>
    <div class="grid-span-2">3</div>
    <div>4</div>
  </GridLine>
  <GridLine>
    <div class="grid-start-6 grid-span-2">5</div>
    <div class="grid-span-3">6</div>
    <div class="grid-span-2">7</div>
  </GridLine>
</GridContainer>
<h2>Custom stlyes</h2>
<GridContainer class="demopage-grid">
  <GridLine>
    <div class="grid-span-6">1</div>
    <div class="grid-span-6" style="height:5rem;">Without align-items, default is center aligned</div>
  </GridLine>
</GridContainer>
<h3>Align items top</h3>
<GridContainer class="demopage-grid">
  <GridLine style="align-items: flex-start">
    <div class="grid-span-6">1</div>
    <div class="grid-span-6" style="height:5rem;">`align-items: flex-start` on the GridLine</div>
  </GridLine>
</GridContainer>
<h2>Grid within Grid</h2>
<GridContainer class="demopage-grid">
  <GridLine>
    <GridContainer class="grid-span-8 demopage-grid" style="background-color:azure;padding: .5rem">
      <GridLine>
        <div>1</div>
        <div>2</div>
        <div>3</div>
        <div>4</div>
        <div>5</div>
        <div>6</div>
        <div>7</div>
        <div>8</div>
        <div>9</div>
        <div>10</div>
        <div>11</div>
        <div>12</div>
      </GridLine>
    </GridContainer>
    <GridContainer class="grid-span-4 demopage-grid" style="background-color:cornsilk;padding: .5rem">
      <GridLine>
        <div>1</div>
        <div>2</div>
        <div>3</div>
        <div>4</div>
        <div>5</div>
        <div>6</div>
        <div>7</div>
        <div>8</div>
        <div>9</div>
        <div>10</div>
        <div>11</div>
        <div>12</div>
      </GridLine>
    </GridContainer>
  </GridLine>
</GridContainer>
<h2>Dynamic grid sizing</h2>
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
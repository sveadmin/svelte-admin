<script lang="ts">
  import {
    FETCHPRIORITY_HIGH,
    Image,
    ImageWrapped,
  } from '$lib/image/index.js'

  import {
    GridLine,
  } from '$lib/grid/index.js'

  import logoVector from './assets/logo.svg'
  import logoRasterized from './assets/logo.png'

  let width = $state(120)
</script>

<svelte:head>
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@tabler/icons-webfont@latest/tabler-icons.min.css">
</svelte:head>

<GridLine>
  <span class="grid-span-6">Simple vector image</span>
  <Image src={logoVector} visibleHeight="100px" fetchpriority={FETCHPRIORITY_HIGH}/>
  <Image src={logoVector} visibleHeight="50px" fetchpriority={FETCHPRIORITY_HIGH}/>
</GridLine>
<GridLine>
  <span class="grid-span-6">Simple raster image</span>
  <Image src={logoRasterized}/>
</GridLine>
<GridLine>
  <span class="grid-span-6">Simple vector image wrapped</span>
  <ImageWrapped src={logoVector} visibleHeight="100px" fetchpriority={FETCHPRIORITY_HIGH}/>
  <ImageWrapped src={logoVector} visibleHeight="50px" fetchpriority={FETCHPRIORITY_HIGH}/>
  <ImageWrapped childrenHeight="50px"
    fetchpriority={FETCHPRIORITY_HIGH}
    src={logoVector}
    visibleHeight="50px" />
  <ImageWrapped childrenHeight="50px"
    fetchpriority={FETCHPRIORITY_HIGH}
    src={logoVector} />
</GridLine>
<GridLine>
  <span class="grid-span-6">Simple raster image wrapped</span>
  <ImageWrapped src={logoRasterized} />
  <ImageWrapped src={logoRasterized} visibleWidth="100px"/>
  <ImageWrapped src={logoRasterized} childrenWidth="50px"/>
</GridLine>
<GridLine>
  <span class="grid-span-6">Using icon (default iconoir)</span>
  <ImageWrapped icon="orthogonal-view" />
</GridLine>
<GridLine>
  <span class="grid-span-6">Icon sizing works</span>
  <ImageWrapped icon="orthogonal-view" visibleHeight="3rem" visibleWidth="5rem" />
  <ImageWrapped icon="orthogonal-view" visibleHeight="5rem" visibleWidth="3rem" />
  <ImageWrapped icon="orthogonal-view" visibleHeight="5rem" visibleWidth="5rem" />
</GridLine>
<GridLine>
  <span class="grid-span-6">Using different icon library (Tabler icons, css loaded only on this page)</span>
  <ImageWrapped icon="grid-4x4" iconPrefix="ti-" class="ti" />
  <ImageWrapped icon="grid-4x4" iconPrefix="ti-" class="ti" style="font-size: 2rem" />
</GridLine>
<GridLine>
  <span class="grid-span-8">Image using srcset and sizes.<br />
    Size breakpoints: > 120px 100% width, > 240px 80%, rest 50%<br />
    Srcset breakpoints are around 160px, 400px (browser chooses automatically)<br />
    Once a large image is loaded, the browser does not remove it in favour of smaller size
  </span>
  <span class="grid-span-3">
    <p>Change iframe width:</p>
    <input type="button" onclick={() => width = 160} value="160px" />
    <input type="button" onclick={() => width = 240} value="240px" />
    <input type="button" onclick={() => width = 320} value="320px" />
    <input type="button" onclick={() => width = 400} value="400px" />
    <input type="button" onclick={() => width = 480} value="480px" />
    <input type="button" onclick={() => width = 600} value="600px" />

  </span>
  <input type="number" bind:value={width} />
</GridLine>
<GridLine style="max-width:800px;overflow:auto">
  <iframe src="/image/sub" title="Iframe for window sizing" style="width:{Math.max(width, 50)}px; height:{Math.min(width + 20, 640)}px"></iframe>
</GridLine>

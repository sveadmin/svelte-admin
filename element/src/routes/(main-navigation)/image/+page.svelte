<script lang="ts">
  import {
    FETCHPRIORITY_HIGH,
    Image,
    ImageMap,
    ImageWrapped,
  } from '$lib/image/index.js'

  import {
    GridLine,
  } from '$lib/grid/index.js'

  import logoVector from './assets/logo.svg'
  import logoRasterized from './assets/logo.png'
  import redDot from './assets/red.svg'
  import greenDot from './assets/green.svg'
  import blueDot from './assets/blue.svg'

  const map = {
    [blueDot] : 'blue',
    [greenDot] : 'green',
    [redDot] : (value: string) => value === 'red',
  }

  let validation = $state(),
    value = $state('blue'),
    width = $state(120)

  let validationIcon = $derived.by(() => {
    if (validation === undefined) {
      return undefined
    }
    return (validation)
      ? 'check'
      : 'xmark'
  })
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
  <ImageWrapped childrenVisibleHeight="50px"
    fetchpriority={FETCHPRIORITY_HIGH}
    src={logoVector}
    visibleHeight="50px" />
  <ImageWrapped childrenVisibleHeight="50px"
    childrenConfig={{0: {visibleHeight: "50px"}}}
    fetchpriority={FETCHPRIORITY_HIGH}
    src={logoVector} />
</GridLine>
<GridLine>
  <span class="grid-span-6">Simple raster image wrapped</span>
  <ImageWrapped src={logoRasterized} />
  <ImageWrapped src={logoRasterized} visibleWidth="100px"/>
  <ImageWrapped src={logoRasterized} childrenVisibleWidth="50px"/>
</GridLine>
<GridLine>
  <span class="grid-span-6">Image in preview mode (on hover)</span>
  <ImageWrapped childrenVisibleHeight="10rem"
    isInPreviewMode={true}
    src={logoRasterized} />
  <ImageWrapped childrenVisibleHeight="10rem"
    isInPreviewMode={true}
    src={logoVector} />
</GridLine>
<GridLine>
  <span class="grid-span-6">Image in preview mode (on click)</span>
  <ImageWrapped childrenVisibleHeight="10rem"
    isInPreviewMode={true}
    isPreviewModeOnHover={false}
    src={logoRasterized} />
  <ImageWrapped childrenVisibleHeight="10rem"
    isInPreviewMode={true}
    isPreviewModeOnHover={false}
    src={logoVector} />
</GridLine>
<GridLine>
  <span class="grid-span-6">Wrapped image with border</span>
  <ImageWrapped childrenVisibleHeight="60px"
    class="grid-span-1"
    isOutlineVisible={true}
    src={logoVector}
    style="padding: 10px"
    visibleHeight="60px"
    visibleWidth="50px" />
  <ImageWrapped childrenVisibleHeight="60px"
    class="grid-span-1"
    isOutlineVisible={true}
    src={logoRasterized}
    style="padding: 10px"
    visibleHeight="60px"
    visibleWidth="50px" />
  <span class="grid-span-2">
    <ImageWrapped childrenVisibleHeight="30px"
      isAttachedOnRight={true}
      isOutlineVisible={true}
      src={logoVector}
      style="padding: 5px"
      visibleHeight="30px"
      visibleWidth="25px"
      /><ImageWrapped childrenVisibleHeight="30px"
      isAttachedOnLeft={true}
      isAttachedOnRight={true}
      isOutlineVisible={true}
      src={logoVector}
      style="padding: 5px"
      visibleHeight="30px"
      visibleWidth="25px"
      /><ImageWrapped childrenVisibleHeight="30px"
      isAttachedOnLeft={true}
      isOutlineVisible={true}
      src={logoRasterized}
      style="padding: 5px"
      visibleHeight="30px"
      visibleWidth="25px" />
  </span>
  <span class="grid-span-2">
    <ImageWrapped icon="check-square"
      isAttachedOnRight={true}
      isOutlineVisible={true}
      style="padding: 5px"
      /><ImageWrapped icon="trash"
      isAttachedOnLeft={true}
      isAttachedOnRight={true}
      isOutlineVisible={true}
      style="padding: 5px"
      /><ImageWrapped icon="check"
      isAttachedOnLeft={true}
      isOutlineVisible={true}
      style="padding: 5px" />
  </span>
</GridLine>
<GridLine>
  <span class="grid-span-6">Dynamic source (eg.: for validation), if icon is undefined in the beginnig set the container width and height to 1em</span>
  <span class="grid-span-2">
    <ImageWrapped icon={validationIcon}
      isOutlineVisible={true}
      visibleHeight="1em"
      visibleWidth="1em"
      style="padding: 5px" />
  </span>
  <input type="button" onclick={() => validation = !validation} value="Change" />
  <input type="button" onclick={() => validation = undefined} value="Clear" />
</GridLine>
<GridLine>
  <span class="grid-span-6">Using image map</span>
  <ImageMap {map} {value} visibleHeight="3rem" visibleWidth="5rem"/>
  <input type="button" onclick={() => value = 'red'} value="Red" />
  <input type="button" onclick={() => value = 'green'} value="Green" />
  <input type="button" onclick={() => value = 'blue'} value="Blue" />
  <input type="button" onclick={() => value = 'invalid'} value="Invalid" />
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
  <span class="grid-span-6">Icon coloring works</span>
  <ImageWrapped icon="help-square" visibleHeight="3rem" visibleWidth="3rem" style="color:red" />
  <ImageWrapped icon="download-square-solid" visibleHeight="3rem" visibleWidth="3rem" style="color:blue" />
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

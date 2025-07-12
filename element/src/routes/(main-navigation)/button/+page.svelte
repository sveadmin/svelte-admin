<script lang="ts">
  import {
    Button,
  } from '$lib/button/index.js'

  import {
    GridLine,
  } from '$lib/grid/index.js'

  import {
    ImageWrapped,
  } from '$lib/image/index.js'

  import {
    SIZE_SMALL,
    SIZE_LARGE,
    SIZE_EXTRA_LARGE,
  } from '$lib/types.js'

  import type {
    Icon,
  } from '$lib/types.js'

  import logoVector from './assets/logo.svg'
  import logoRasterized from './assets/logo.png'

</script>

{#snippet imageRenderer(icons: Icon[])}
  {#each icons as icon}
    <ImageWrapped src={icon.icon} style="vertical-align:bottom" visibleHeight="1em" childrenVisibleHeight="1em"/>
  {/each}
{/snippet}

<GridLine>
  <span class="grid-span-4">Normal size button</span>
  <span class="grid-span-8">
    <Button label="This is a button" />
    <Button leftIcon="orthogonal-view" />
    <Button leftIcon="orthogonal-view" label="This is a button with icon"/>
  </span>
</GridLine>
<GridLine>
  <span class="grid-span-4">Small size button</span>
  <span class="grid-span-8">
    <Button label="This is a button" size={SIZE_SMALL}/>
    <Button leftIcon="xmark-square-solid" size={SIZE_SMALL}/>
    <Button leftIcon="xmark-square-solid" label="This is a button with icon" size={SIZE_SMALL}/>
  </span>
</GridLine>
<GridLine>
  <span class="grid-span-4">Large buttons</span>
  <span class="grid-span-8">
    <Button label="This is a button" size={SIZE_LARGE} />
    <Button leftIcon="movie" size={SIZE_LARGE}/>
    <Button leftIcon="movie" label="This is a button with icon" size={SIZE_LARGE}/>
  </span>
</GridLine>
<GridLine>
  <span class="grid-span-4">Extra large buttons</span>
  <span class="grid-span-8">
    <Button label="This is a button" size={SIZE_EXTRA_LARGE}/>
    <Button leftIcon="shop-four-tiles-window" size={SIZE_EXTRA_LARGE}/>
    <Button leftIcon="shop-four-tiles-window" label="This is a button with icon" size={SIZE_EXTRA_LARGE}/>
  </span>
</GridLine>
<GridLine>
  <span class="grid-span-4">Custom size</span>
  <Button label="Sized by grid span" class="grid-span-3"/>
  <span class="grid-span-5">
    <Button label="Harcoded width" visibleWidth="14rem" />
    <Button label="Harcoded width with modified height" visibleHeight="4rem" visibleWidth="20rem" />
    <Button leftIcon={['cloud-check']}
      style="font-size: 4rem"
      visibleHeight="8rem" />
    <Button leftIcon={['cloud-xmark']}
      style="font-size: 4rem;background-color:rgb(var(--status-color-worst))"
      visibleHeight="8rem" />
  </span>
</GridLine>
<GridLine>
  <span class="grid-span-4">Icons on both sides</span>
  <span class="grid-span-8">
    <Button label="This is a button with two icons"
      leftIcon="warning-square-solid"
      rightIcon="warning-square-solid"
      size={SIZE_LARGE} />
  </span>
</GridLine>
<GridLine>
  <span class="grid-span-4">Need more icons</span>
  <span class="grid-span-8">
    <Button label="Get more icons in!"
      leftIcon={['keyframe-plus-in', 'city', 'priority-high']}
      size={SIZE_LARGE} />
  </span>
</GridLine>
<GridLine>
  <span class="grid-span-4">Overwrite icon renderer and show images</span>
  <span class="grid-span-8">
    <Button iconRenderer={imageRenderer}
      label="Show images on button"
      leftIcon={[logoVector]}
      rightIcon={[logoRasterized]}
      size={SIZE_LARGE} />
    <Button iconRenderer={imageRenderer}
      leftIcon={[logoVector]}
      size={SIZE_LARGE} />
  </span>
</GridLine>
<GridLine>
  <span class="grid-span-4">Buttons embedded in inputs</span>
  <span class="grid-span-8">
    <Button class="inputBorder"
      label="Simple button" />
    <Button class="inputBorder attachRight"
      label="Two buttons" /><!--
    --><Button class="inputBorder attachLeft"
      label="connected" />
    <Button class="inputBorder attachRight"
      label="Three" /><!--
    --><Button class="inputBorder attachLeft attachRight"
      label="buttons" /><!--
    --><Button class="inputBorder attachLeft"
      label="connected" />
  </span>
</GridLine>
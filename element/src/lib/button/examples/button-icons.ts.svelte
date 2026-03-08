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
    SIZE_LARGE,
  } from '$lib/types.js'

  import type {
    Icon,
  } from '$lib/types.js'

  import logoVector from './assets/logo.svg'
  import logoRasterized from './assets/logo.png'

  const {
    onClick
  } = $props()
</script>

{#snippet imageRenderer(icons: Icon[])}
  {#each icons as icon}
    <ImageWrapped src={icon.icon} style="vertical-align:bottom" visibleHeight="1em" childrenVisibleHeight="1em"/>
  {/each}
{/snippet}

<GridLine>
  <span class="grid-span-4">Icons on both sides</span>
  <span class="grid-span-8">
    <Button label="This is a button with two icons"
      {onClick}
      leftIcon="warning-square-solid"
      rightIcon="warning-square-solid"
      size={SIZE_LARGE} />
  </span>
</GridLine>
<GridLine>
  <span class="grid-span-4">Need more icons</span>
  <span class="grid-span-8">
    <Button label="Get more icons in!"
      {onClick}
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
      {onClick}
      rightIcon={[logoRasterized]}
      size={SIZE_LARGE} />
    <Button iconRenderer={imageRenderer}
      leftIcon={[logoVector]}
      {onClick}
      size={SIZE_LARGE} />
  </span>
</GridLine>
<GridLine>
  <span class="grid-span-4">Use custom styles for icons</span>
  <span class="grid-span-8">
    <Button label="These icons have special style added"
      iconStyle="color: red"
      {onClick}
      leftIcon="warning-square-solid"
      rightIcon="warning-square-solid"
      size={SIZE_LARGE} />
    <Button label="These icons have special style added"
      childrenConfig={{
        0: {
          style: 'color: green'
        }
      }}
      iconStyle="color: red"
      {onClick}
      leftIcon="warning-square-solid"
      rightIcon="warning-square-solid"
      size={SIZE_LARGE} />
    <Button label="These icons have special style added"
      childrenConfig={{
        0: {
          style: 'color: green'
        },
        icon: {
          style: 'color: blue'
        }
      }}
      iconStyle="color: red"
      {onClick}
      leftIcon="warning-square-solid"
      rightIcon="warning-square-solid"
      size={SIZE_LARGE} />
  </span>
</GridLine>
<GridLine>
  <span class="grid-span-4">Icons can de independently configured</span>
  <span class="grid-span-8">
    <Button label="Using individual childrenConfig"
      childrenConfig={{
        leftIcon: {
          style: 'color: purple'
        },
        rightIcon: {
          style: 'color: teal'
        },
      }}
      iconStyle="color: green"
      {onClick}
      leftIcon="warning-square-solid"
      rightIcon="warning-square-solid"
      size={SIZE_LARGE} />
  </span>
</GridLine>
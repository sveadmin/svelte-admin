<script lang="ts">
  import {
    Button,
  } from '$lib/button/index.js'

  import {
    DateDisplay,
  } from '$lib/date-display/index.js'

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

  let clicks : Array<{name: string, time?: Date}> = $state([{name: 'NONE'},{name: 'NONE'},{name: 'NONE'},{name: 'NONE'},{name: 'NONE'}])

  const onClick : (event?: Event) => boolean = (event?: Event) => {
    if (!event) {
      return true
    }
    const currentTarget = event?.currentTarget as HTMLButtonElement
    if (currentTarget.tagName !== 'BUTTON') {
      return true
    }
    clicks.unshift({name: currentTarget.name, time: new Date()})
    clicks = clicks.slice(0, 5)
    return true
  }

</script>

{#snippet imageRenderer(icons: Icon[])}
  {#each icons as icon}
    <ImageWrapped src={icon.icon} style="vertical-align:bottom" visibleHeight="1em" childrenVisibleHeight="1em"/>
  {/each}
{/snippet}

<GridLine>
  <span class="grid-span-4">Last buttons clicked</span>
  <span class="grid-span-8">
    {#each clicks as click}
      <p>
        {click.name} @ <DateDisplay format="III" refreshInterval={1000}
            value={click.time} />
      </p>
    {/each}    
  </span>
</GridLine>
<GridLine>
  <span class="grid-span-4">Normal size button</span>
  <span class="grid-span-8">
    <Button label="This is a button" {onClick} />
    <Button leftIcon="orthogonal-view" {onClick} />
    <Button leftIcon="orthogonal-view" label="This is a button with icon" {onClick} />
  </span>
</GridLine>
<GridLine>
  <span class="grid-span-4">Small size button</span>
  <span class="grid-span-8">
    <Button label="This is a button" {onClick} size={SIZE_SMALL} />
    <Button leftIcon="xmark-square-solid" {onClick} size={SIZE_SMALL} />
    <Button leftIcon="xmark-square-solid" label="This is a button with icon" {onClick} size={SIZE_SMALL}/>
  </span>
</GridLine>
<GridLine>
  <span class="grid-span-4">Large buttons</span>
  <span class="grid-span-8">
    <Button label="This is a button" {onClick} size={SIZE_LARGE} />
    <Button leftIcon="movie" {onClick} size={SIZE_LARGE}/>
    <Button leftIcon="movie" label="This is a button with icon" {onClick} size={SIZE_LARGE}/>
  </span>
</GridLine>
<GridLine>
  <span class="grid-span-4">Extra large buttons</span>
  <span class="grid-span-8">
    <Button label="This is a button" size={SIZE_EXTRA_LARGE} {onClick} />
    <Button leftIcon="shop-four-tiles-window" {onClick} size={SIZE_EXTRA_LARGE}/>
    <Button leftIcon="shop-four-tiles-window" label="This is a button with icon" {onClick} size={SIZE_EXTRA_LARGE}/>
  </span>
</GridLine>
<GridLine>
  <span class="grid-span-4">Custom size</span>
  <Button label="Sized by grid span" class="grid-span-3" {onClick} />
  <span class="grid-span-5">
    <Button label="Harcoded width" visibleWidth="14rem" {onClick} />
    <Button label="Harcoded width with modified height" {onClick} visibleHeight="4rem" visibleWidth="20rem" />
    <Button leftIcon={['cloud-check']}
      {onClick}
      style="font-size: 4rem"
      visibleHeight="8rem" />
    <Button leftIcon={['cloud-xmark']}
      {onClick}
      style="font-size: 4rem;background-color:rgb(var(--status-color-worst))"
      visibleHeight="8rem" />
  </span>
</GridLine>
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
  <span class="grid-span-4">Buttons embedded in inputs</span>
  <span class="grid-span-8">
    <Button label="Simple button" 
      {onClick} />
    <Button isAttachedOnRight={true}
      label="Two buttons"
      {onClick} /><!--
    --><Button isAttachedOnLeft={true}
      label="connected"
      {onClick} />
    <Button isAttachedOnRight={true}
      label="Three"
      {onClick} /><!--
    --><Button isAttachedOnLeft={true}
      isAttachedOnRight={true}
      label="buttons"
      {onClick} /><!--
    --><Button isAttachedOnLeft={true}
      label="connected"
      {onClick} />
  </span>
</GridLine>
<GridLine>
  <span class="grid-span-4">Buttons embedded in inputs small</span>
  <span class="grid-span-8">
    <Button isAttachedOnRight={true}
      label="Three"
      {onClick}
      size={SIZE_SMALL} /><!--
    --><Button isAttachedOnLeft={true}
      isAttachedOnRight={true}
      label="buttons"
      {onClick}
      size={SIZE_SMALL} /><!--
    --><Button isAttachedOnLeft={true}
      label="connected"
      {onClick}
      size={SIZE_SMALL} />
  </span>
</GridLine>
<GridLine>
  <span class="grid-span-4">Buttons embedded in inputs large</span>
  <span class="grid-span-8">
    <Button isAttachedOnRight={true}
      label="Three"
      {onClick}
      size={SIZE_LARGE} /><!--
    --><Button isAttachedOnLeft={true}
      isAttachedOnRight={true}
      label="buttons"
      {onClick}
      size={SIZE_LARGE} /><!--
    --><Button isAttachedOnLeft={true}
      label="connected"
      {onClick}
      size={SIZE_LARGE} />
  </span>
</GridLine>
<GridLine>
  <span class="grid-span-4">Buttons embedded in inputs extra large</span>
  <span class="grid-span-8">
    <Button isAttachedOnRight={true}
      label="Three"
      {onClick}
      size={SIZE_EXTRA_LARGE} /><!--
    --><Button isAttachedOnLeft={true}
      isAttachedOnRight={true}
      label="buttons"
      {onClick}
      size={SIZE_EXTRA_LARGE} /><!--
    --><Button isAttachedOnLeft={true}
      label="connected"
      {onClick}
      size={SIZE_EXTRA_LARGE} />
  </span>
</GridLine>
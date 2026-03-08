<script lang="ts">
  import {
    Button,
  } from '$lib/button/index.js'

  import {
    GridLine,
  } from '$lib/grid/index.js'

  import {
    SIZE_SMALL,
    SIZE_LARGE,
    SIZE_EXTRA_LARGE,
  } from '$lib/types.js'

  const {
    onClick
  } = $props()
</script>

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
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

</script>

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
  <span class="grid-span-4">Icons on both sides</span>
  <span class="grid-span-8">
    <Button label="This is a button with two icons"
      leftIcon="warning-square-solid"
      rightIcon="warning-square-solid"
      size={SIZE_LARGE} />
  </span>
</GridLine>
<GridLine>
  <span class="grid-span-4">Need more buttons</span>
  <span class="grid-span-8">
    <Button label="Get more icons in!"
      leftIcon={['keyframe-plus-in', 'city', 'priority-high']}
       size={SIZE_LARGE} />
  </span>
</GridLine>
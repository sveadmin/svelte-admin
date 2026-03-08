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
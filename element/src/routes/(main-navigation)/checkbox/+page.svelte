<script lang="ts">
  import {
    Checkbox,
  } from '$lib/checkbox/index.js'

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

</script>

{#snippet imageRenderer(icons: Icon[])}
  {#each icons as icon}
    <ImageWrapped src={icon.icon} style="vertical-align:bottom" visibleHeight="1em" childrenVisibleHeight="1em"/>
  {/each}
{/snippet}

<GridLine>
  <span class="grid-span-4">Simple checkbox</span>
  <span class="grid-span-8">
    <Checkbox />
  </span>
</GridLine>
<GridLine>
  <span class="grid-span-4">Simple checkbox small</span>
  <span class="grid-span-8">
    <Checkbox size={SIZE_SMALL}/>
  </span>
</GridLine>
<GridLine>
  <span class="grid-span-4">Simple checkbox large</span>
  <span class="grid-span-8">
    <Checkbox size={SIZE_LARGE}/>
  </span>
</GridLine>
<GridLine>
  <span class="grid-span-4">Simple checkbox extra large</span>
  <span class="grid-span-8">
    <Checkbox size={SIZE_EXTRA_LARGE}/>
  </span>
</GridLine>
<GridLine>
  <span class="grid-span-4">Simple checkbox with no hint</span>
  <span class="grid-span-8">
    <Checkbox isHintHidden={true} />
  </span>
</GridLine>
<GridLine>
  <span class="grid-span-4">Simple checkbox with state colors</span>
  <span class="grid-span-8">
    <Checkbox isStateColorHidden={false} />
  </span>
</GridLine>
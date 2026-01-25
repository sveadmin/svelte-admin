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
    TextInput,
  } from '$lib/text-input/index.js'

  import {
    SIZE_SMALL,
    SIZE_LARGE,
    SIZE_EXTRA_LARGE,
  } from '$lib/types.js'

  import logoVector from './assets/logo.svg'
</script>

{#snippet checkmarkRenderer(value: boolean)}
  {#if value}
    <ImageWrapped class="checkboxLabelIcon" src={logoVector} style="padding-top: .375em"/>
  {/if}
{/snippet}

<GridLine>
  <span class="grid-span-4">Simple checkbox</span>
  <span class="grid-span-4">
    <Checkbox />
  </span>
  <span class="grid-span-4">
    <Checkbox isHintHidden={true} />
  </span>
</GridLine>
<GridLine>
  <span class="grid-span-4">Simple checkbox small</span>
  <span class="grid-span-4">
    <Checkbox size={SIZE_SMALL} />
  </span>
  <span class="grid-span-4">
    <Checkbox size={SIZE_SMALL} isHintHidden={true} />
  </span>
</GridLine>
<GridLine>
  <span class="grid-span-4">Simple checkbox large</span>
  <span class="grid-span-4">
    <Checkbox size={SIZE_LARGE} />
  </span>
  <span class="grid-span-4">
    <Checkbox size={SIZE_LARGE} isHintHidden={true} />
  </span>
</GridLine>
<GridLine>
  <span class="grid-span-4">Simple checkbox extra large</span>
  <span class="grid-span-4">
    <Checkbox size={SIZE_EXTRA_LARGE} />
  </span>
  <span class="grid-span-4">
    <Checkbox size={SIZE_EXTRA_LARGE} isHintHidden={true} />
  </span>
</GridLine>
<GridLine>
  <span class="grid-span-4">Checkbox with status color, and only status color</span>
  <span class="grid-span-4">
    <Checkbox isStateColorHidden={false}/>
  </span>
  <span class="grid-span-4">
    <Checkbox isStateColorHidden={false} isHintHidden={true}/>
  </span>
</GridLine>
<GridLine>
  <span class="grid-span-4">Change checkmark to special component</span>
  <span class="grid-span-4">
    <Checkbox renderLabel={checkmarkRenderer}/>
  </span>
  <span class="grid-span-4">
    <Checkbox renderLabel={checkmarkRenderer} isHintHidden={true}/>
  </span>
</GridLine>
<GridLine>
  <span class="grid-span-6">Checkbox connected</span>
  <span class="grid-span-6">
    <Checkbox isAttachedOnRight={true} isHintHidden={true} /><!--
    --><TextInput isAttachedOnLeft={true} isAttachedOnRight={true} /><!--
    --><Checkbox isAttachedOnLeft={true} isHintHidden={true} />
  </span>
</GridLine>
<GridLine>
  <span class="grid-span-6">Small checkbox connected</span>
  <span class="grid-span-6">
    <Checkbox isAttachedOnRight={true} isHintHidden={true} size={SIZE_SMALL} /><!--
    --><TextInput isAttachedOnLeft={true} isAttachedOnRight={true} size={SIZE_SMALL} /><!--
    --><Checkbox isAttachedOnLeft={true} isHintHidden={true} size={SIZE_SMALL} />
  </span>
</GridLine>
<GridLine>
  <span class="grid-span-6">Large checkbox connected</span>
  <span class="grid-span-6">
    <Checkbox isAttachedOnRight={true} isHintHidden={true} size={SIZE_LARGE} /><!--
    --><TextInput isAttachedOnLeft={true} isAttachedOnRight={true} size={SIZE_LARGE} visibleWidth="2rem"/><!--
    --><Checkbox isAttachedOnLeft={true} isHintHidden={true} size={SIZE_LARGE} />
  </span>
</GridLine>
<GridLine>
  <span class="grid-span-6">Extra large checkbox connected</span>
  <span class="grid-span-6">
    <Checkbox isAttachedOnRight={true} isHintHidden={true} size={SIZE_EXTRA_LARGE} /><!--
    --><TextInput isAttachedOnLeft={true} isAttachedOnRight={true} size={SIZE_EXTRA_LARGE} visibleWidth="2rem" /><!--
    --><Checkbox isAttachedOnLeft={true} isHintHidden={true} size={SIZE_EXTRA_LARGE} />
  </span>
</GridLine>
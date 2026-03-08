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

  import logoVector from './assets/logo.svg'
</script>

{#snippet checkmarkRenderer(value: boolean)}
  {#if value}
    <ImageWrapped class="checkboxLabelIcon" src={logoVector} style="padding-top: .375em"/>
  {/if}
{/snippet}

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
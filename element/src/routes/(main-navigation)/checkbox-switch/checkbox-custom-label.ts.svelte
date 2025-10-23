<script lang="ts">
  import {
    CheckboxSwitch,
  } from '$lib/checkbox-switch/index.js'

  import {
    GridLine,
  } from '$lib/grid/index.js'
</script>

{#snippet customLabel(value: boolean)}
  {#if value}
    <span class="inputLabel">1</span>
  {:else}
    <span class="inputLabel">0</span>
  {/if}
{/snippet}

{#snippet checkboxLike(value: boolean)}
  {#if value}
    <span class="inputLabel">X</span>
  {/if}
{/snippet}

<GridLine>
  <span class="grid-span-6">No default value or binding with custom labels</span>
  <span class="grid-span-6">
    <CheckboxSwitch trueLabel="Right" falseLabel="Left" />
  </span>
</GridLine>
<GridLine>
  <span class="grid-span-6">Checkbox with custom input label</span>
  <span class="grid-span-6">
    <CheckboxSwitch renderLabel={customLabel} />
  </span>
</GridLine>
<GridLine>
  <span class="grid-span-6">Only the slider wiht custom labels</span>
  <span class="grid-span-6">
    <CheckboxSwitch renderLabel={customLabel} isFalseLabelHidden={true} isTrueLabelHidden={true} />
  </span>
</GridLine>
<GridLine>
  <span class="grid-span-6">Checkbox like</span>
  <span class="grid-span-6">
    <CheckboxSwitch renderLabel={checkboxLike} trueLabel="Is this a checkbox?" falseLabel="Is this a checkbox?" inputStyle="padding:0"/>
  </span>
</GridLine>

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
    <span class="checkboxLabelContent">I</span>
  {:else}
    <span class="checkboxLabelContent">O</span>
  {/if}
{/snippet}

{#snippet checkboxLike(value: boolean)}
  {#if value}
    <span class="checkboxLabelContent">X</span>
  {/if}
{/snippet}

<GridLine>
  <span class="grid-span-6">No default value or binding with custom labels</span>
  <span class="grid-span-6">
    <CheckboxSwitch trueHint="On" falseHint="Off" />
  </span>
</GridLine>
<GridLine>
  <span class="grid-span-6">Checkbox with custom input label</span>
  <span class="grid-span-6">
    <CheckboxSwitch renderLabel={customLabel} />
  </span>
</GridLine>
<GridLine>
  <span class="grid-span-6">Only the slider with custom labels</span>
  <span class="grid-span-6">
    <CheckboxSwitch renderLabel={customLabel} isFalseHintHidden={true} isTrueHintHidden={true} />
  </span>
</GridLine>
<GridLine>
  <span class="grid-span-6">Checkbox like</span>
  <span class="grid-span-6">
    <CheckboxSwitch renderLabel={checkboxLike} trueHint="Is this a checkbox?" falseHint="Is this a checkbox?" labelStyle="padding:0;background-color:transparent"/>
  </span>
</GridLine>

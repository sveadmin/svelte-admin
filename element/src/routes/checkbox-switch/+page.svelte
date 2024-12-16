<script lang="ts">
  import SimpleCheckbox from './checkbox.ts.svelte'
  import CheckboxCustomLabel from './checkbox-custom-label.ts.svelte'
  import CheckboxBothLabels from './checkbox-both-labels.ts.svelte'
  import CheckboxDefaultValue from './checkbox-default-value.ts.svelte'
  import CheckboxBound from './checkbox-bound.ts.svelte'
  import CheckboxClickHandler from './checkbox-click-handler.ts.svelte'
  import CheckboxChangeHandler from './checkbox-change-handler.ts.svelte'
  import CheckboxDisabled from './checkbox-disabled.ts.svelte'
</script>
<h2>No default value or binding</h2>
<SimpleCheckbox />

<h2>No default value or binding with custom labels</h2>
<CheckboxCustomLabel />

<h2>Both values are visible</h2>
<CheckboxBothLabels />

<h2>Default value without binding</h2>
<CheckboxDefaultValue />

<h2>With binding via store</h2>
<CheckboxBound />

<h2>On click handler</h2>
<CheckboxClickHandler />

<h2>On change handler</h2>
<CheckboxChangeHandler />

<h2>Disabled</h2>
<CheckboxDisabled />

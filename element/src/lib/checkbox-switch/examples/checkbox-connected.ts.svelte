<script lang="ts">
  import {
    SIZE_EXTRA_LARGE,
    SIZE_LARGE,
    SIZE_SMALL,
  } from '$lib/types.js'

  import {
    TextInput,
  } from '$lib/text-input/index.js'

  import {
    CheckboxSwitch,
  } from '$lib/checkbox-switch/index.js'

  import {
    GridLine,
  } from '$lib/grid/index.js'
</script>

<GridLine>
  <span class="grid-span-6">Two checkbox switches connected</span>
  <span class="grid-span-6">
    <TextInput isAttachedOnRight={true}
    /><CheckboxSwitch isAttachedOnLeft={true} isAttachedOnRight={true}
    /><CheckboxSwitch isAttachedOnLeft={true} />
  </span>
</GridLine>
<GridLine>
  <span class="grid-span-6">Two small checkbox switches connected</span>
  <span class="grid-span-6">
    <CheckboxSwitch isAttachedOnRight={true} size={SIZE_SMALL}
    /><CheckboxSwitch isAttachedOnLeft={true} isAttachedOnRight={true} size={SIZE_SMALL}
    /><TextInput isAttachedOnLeft={true} size={SIZE_SMALL} />
  </span>
</GridLine>
<GridLine>
  <span class="grid-span-6">Two large checkbox switches connected</span>
  <span class="grid-span-6">
    <CheckboxSwitch isAttachedOnRight={true} size={SIZE_LARGE}
    /><TextInput isAttachedOnLeft={true} isAttachedOnRight={true} size={SIZE_LARGE} visibleWidth="2rem"
    /><CheckboxSwitch isAttachedOnLeft={true} size={SIZE_LARGE} />
  </span>
</GridLine>
<GridLine>
  <span class="grid-span-6">Two extra large checkbox switches connected</span>
</GridLine>
<GridLine>
  <span class="grid-span-10 grid-start-3">
    <CheckboxSwitch isAttachedOnRight={true} size={SIZE_EXTRA_LARGE}
    /><TextInput isAttachedOnLeft={true} isAttachedOnRight={true} size={SIZE_EXTRA_LARGE} visibleWidth="2rem"
    /><CheckboxSwitch isAttachedOnLeft={true} size={SIZE_EXTRA_LARGE} />
  </span>
</GridLine>
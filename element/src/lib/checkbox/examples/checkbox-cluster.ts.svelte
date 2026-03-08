<script lang="ts">
  import {
    Checkbox,
  } from '$lib/checkbox/index.js'

  import {
    GridLine,
  } from '$lib/grid/index.js'

  import {
    TextInput,
  } from '$lib/text-input/index.js'

  import {
    SIZE_SMALL,
    SIZE_LARGE,
    SIZE_EXTRA_LARGE,
  } from '$lib/types.js'
</script>

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
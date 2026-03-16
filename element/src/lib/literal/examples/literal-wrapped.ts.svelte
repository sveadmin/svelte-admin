<script lang="ts">
  import {
    LiteralWrapped,
  } from '$lib/literal/index.js'

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
  <span class="grid-span-4">Simple text within a wrapped literal setting width with span</span>
  <span class="grid-span-8">
    <LiteralWrapped style="text-align: center;" value="This is a simple centered text" />
  </span>
</GridLine>
<GridLine>
  <span class="grid-span-4">Simple text within a wrapped literal setting width with component</span>
  <LiteralWrapped class="grid-span-8" style="text-align: center;" value="This is a simple centered text" />
</GridLine>
<GridLine>
  <span class="grid-span-4">Disguised as input</span>
  <span class="grid-span-4">
    <LiteralWrapped isInputBorderDisplayed={true}
      style="text-align: center;"
      value="This is a simple centered text" />
  </span>
  <LiteralWrapped class="grid-span-4"
    isInputBorderDisplayed={true}
    style="text-align: center;"
    value="This is a simple centered text" />
</GridLine>
<GridLine>
  <span class="grid-span-4">Two connected to resemble a joint input</span>
  <span class="grid-span-8">
    <LiteralWrapped isAttachedOnRight={true}
      style="text-align: right;"
      value="This is the left side" /><!--
    --><LiteralWrapped isAttachedOnLeft={true}
    value="and this is the right side" />
  </span>
</GridLine>
<GridLine>
  <span class="grid-span-4">Adding a floating text in the middle of the connected inputs</span>
  <span class="grid-span-8" style="position:relative;">
    <LiteralWrapped isAttachedOnRight={true}
      style="text-align: right;"
      value="This is the left side -" /><!--
    --><LiteralWrapped isFloating={true}
      value="---" /><!--
    --><LiteralWrapped isAttachedOnLeft={true}
      value="- and this is the right side" />
  </span>
</GridLine>
<GridLine>
  <span class="grid-span-4">Adding a floating text in the middle of the connected inputs (small)</span>
  <span class="grid-span-8" style="position:relative;">
    <LiteralWrapped isAttachedOnRight={true}
      size={SIZE_SMALL}
      style="text-align: right;"
      value="This is the left side -" /><!--
    --><LiteralWrapped isFloating={true}
      size={SIZE_SMALL}
      value="---" /><!--
    --><LiteralWrapped isAttachedOnLeft={true}
      size={SIZE_SMALL}
      value="- and this is the right side" />
  </span>
</GridLine>
<GridLine>
  <span class="grid-span-4">Adding a floating text in the middle of the connected inputs (large)</span>
  <span class="grid-span-8" style="position:relative;">
    <LiteralWrapped isAttachedOnRight={true}
      size={SIZE_LARGE}
      style="text-align: right;"
      value="Left side -" /><!--
    --><LiteralWrapped isFloating={true}
      size={SIZE_LARGE}
      value="---" /><!--
    --><LiteralWrapped isAttachedOnLeft={true}
      size={SIZE_LARGE}
      value="- right side" />
  </span>
</GridLine>
<GridLine>
  <span class="grid-span-4">Adding a floating text in the middle of the connected inputs (extra large)</span>
  <span class="grid-span-8" style="position:relative;">
    <LiteralWrapped isAttachedOnRight={true}
      size={SIZE_EXTRA_LARGE}
      style="text-align: right;"
      value="Left side -" /><!--
    --><LiteralWrapped isFloating={true}
      size={SIZE_EXTRA_LARGE}
      value="---" /><!--
    --><LiteralWrapped isAttachedOnLeft={true}
      size={SIZE_EXTRA_LARGE}
      value="- right side" />
  </span>
</GridLine>
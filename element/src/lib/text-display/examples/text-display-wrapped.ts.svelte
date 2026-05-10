<script lang="ts">
  import {
    SIZE_SMALL,
    SIZE_LARGE,
    SIZE_EXTRA_LARGE,
  } from '$lib/types.js'

  import {
    GridContainer,
    GridLine,
  } from '$lib/grid/index.js'

  import {
    TextDisplayWrapped,
  } from '$lib/text-display/index.js'
</script>

<GridContainer class="demopage-grid">
  <GridLine>
    <span class="grid-span-4">Simple text within a wrapped literal setting width with span</span>
    <span class="grid-span-8">
      <TextDisplayWrapped style="text-align: center;" value="This is a simple centered text" />
    </span>
  </GridLine>
  <GridLine>
    <span class="grid-span-4">Simple text within a wrapped literal setting width with component</span>
    <TextDisplayWrapped class="grid-span-8" style="text-align: center;" value="This is a simple centered text" />
  </GridLine>
  <GridLine>
    <span class="grid-span-4">Disguised as input</span>
    <span class="grid-span-4">
      <TextDisplayWrapped isOutlineVisible={true}
        style="text-align: center;"
        value="This is a simple centered text" />
    </span>
    <TextDisplayWrapped class="grid-span-4"
      isOutlineVisible={true}
      style="text-align: center;"
      value="This is a simple centered text" />
  </GridLine>
  <GridLine>
    <span class="grid-span-4">Two connected to resemble a joint input</span>
    <span class="grid-span-8">
      <TextDisplayWrapped isAttachedOnRight={true}
        style="text-align: right;"
        value="This is the left side"
        /><TextDisplayWrapped isAttachedOnLeft={true}
      value="and this is the right side" />
    </span>
  </GridLine>
  <GridLine>
    <span class="grid-span-4">Adding a floating text in the middle of the connected inputs</span>
    <span class="grid-span-8" style="position:relative;">
      <TextDisplayWrapped isAttachedOnRight={true}
        style="text-align: right;"
        value="This is the left side -"
        /><TextDisplayWrapped isFloating={true}
        value="---"
        /><TextDisplayWrapped isAttachedOnLeft={true}
        value="- and this is the right side" />
    </span>
  </GridLine>
  <GridLine>
    <span class="grid-span-4">Adding a floating text in the middle of the connected inputs (small)</span>
    <span class="grid-span-8" style="position:relative;">
      <TextDisplayWrapped isAttachedOnRight={true}
        size={SIZE_SMALL}
        style="text-align: right;"
        value="This is the left side -"
        /><TextDisplayWrapped isFloating={true}
        size={SIZE_SMALL}
        value="---"
        /><TextDisplayWrapped isAttachedOnLeft={true}
        size={SIZE_SMALL}
        value="- and this is the right side" />
    </span>
  </GridLine>
  <GridLine>
    <span class="grid-span-4">Adding a floating text in the middle of the connected inputs (large)</span>
    <span class="grid-span-8" style="position:relative;">
      <TextDisplayWrapped isAttachedOnRight={true}
        size={SIZE_LARGE}
        style="text-align: right;"
        value="Left side -"
        /><TextDisplayWrapped isFloating={true}
        size={SIZE_LARGE}
        value="---"
        /><TextDisplayWrapped isAttachedOnLeft={true}
        size={SIZE_LARGE}
        value="- right side" />
    </span>
  </GridLine>
  <GridLine>
    <span class="grid-span-4">Adding a floating text in the middle of the connected inputs (extra large)</span>
    <span class="grid-span-8" style="position:relative;">
      <TextDisplayWrapped isAttachedOnRight={true}
        size={SIZE_EXTRA_LARGE}
        style="text-align: right;"
        value="Left side -"
        /><TextDisplayWrapped isFloating={true}
        size={SIZE_EXTRA_LARGE}
        value="---"
        /><TextDisplayWrapped isAttachedOnLeft={true}
        size={SIZE_EXTRA_LARGE}
        value="- right side" />
    </span>
  </GridLine>
</GridContainer>
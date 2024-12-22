<script lang="ts">
  import {
    GridContainer,
    GridLine,
  } from '$lib/grid/index.js'

  import {
    TextDisplay,
    TEXT_DISPLAY_TYPE_TEXT,
  } from '$lib/text-display/index.js'

  let boundMaskPrefix = $state('Mask can also ')
  let boundMaskSuffix = $state(' be bound')

  let number: number = $state(2)
  let dynamicSuffix = $derived.by(() => {
    if (number < 0) {
      return ''
    }
    switch (number % 100) {
      case 11:
      case 12:
      case 13:
        return 'th'
    }
    switch (number % 10) {
      case 1:
        return 'st'
      case 2:
        return 'nd'
      case 3:
        return 'rd'
      default:
        return 'th'
    }
  })

  let boundMask = $derived.by(() => {
    return [
      boundMaskPrefix,
      {
        type: TEXT_DISPLAY_TYPE_TEXT,
      },
      boundMaskSuffix,
    ]
  })

  let dynamicMask = $derived.by(() => {
    return [
      'Bound mask depending on the value: ',
      {
        type: TEXT_DISPLAY_TYPE_TEXT,
      },
      dynamicSuffix
    ]
  })
</script>

<GridContainer class="demopage-grid">
  <GridLine>
    <span class="grid-span-6">
      <TextDisplay
        mask={boundMask}
        value="VALUE" />
    </span>
    <span>Prefix: </span>
    <input class="grid-span-2" bind:value={boundMaskPrefix} type="text"/>
    <span>Suffix: </span>
    <input class="grid-span-2" bind:value={boundMaskSuffix} type="text"/>
  </GridLine>
</GridContainer>
<GridContainer class="demopage-grid">
  <GridLine>
    <span class="grid-span-8">
      <TextDisplay
        mask={dynamicMask}
        bind:value={number} />
    </span>
    <span>Change: </span>
    <input class="grid-span-3" bind:value={number} type="number"/>
  </GridLine>
</GridContainer>
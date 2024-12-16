<script lang="ts">
  import {
    GridContainer,
    GridLine,
  } from '$lib/grid/index.js'

  import {
    TEXT_DISPLAY_TYPE_LITERAL,
    TEXT_DISPLAY_TYPE_TEXT,
    TextDisplay,
  } from '$lib/text-display/index.js'

  const literalMask = [
    {
      type: TEXT_DISPLAY_TYPE_LITERAL,
      value: '~~~~~~ ',
    },
    {
      type: TEXT_DISPLAY_TYPE_TEXT,
    },
    ' ~~~~~~', // Literal shortcut
  ]

</script>

<GridContainer class="demopage-grid">
  <GridLine>
    <span class="grid-span-12">
      <TextDisplay
        mask={literalMask}
        value="This is a simple text display with literals around it" />
    </span>
  </GridLine>
</GridContainer>
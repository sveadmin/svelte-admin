<script lang="ts">
  import type {
    SveadminComponentMask,
  } from '$lib/types.js'

  import {
    GridContainer,
    GridLine,
  } from '$lib/grid/index.js'

  import {
    COMPONENT_LITERAL,
    Literal,
  } from '$lib/literal/index.js'

  import {
    TEXT_DISPLAY_TYPE_TEXT,
  } from '$lib/text-display/index.js'

  const literalMask: SveadminComponentMask = [
    {
      display: {
        config: {
          value: '~~~~~~ ',
        }
      },
      type: COMPONENT_LITERAL,
    },
    {
      type: TEXT_DISPLAY_TYPE_TEXT,
    },
    ' ~~~~~~', // Literal shortcut
  ]

  const onlyLiteral = 'Well, this is a really complicated way to render text, but it is possible. It uses fallback mechanisms to render this as literal.'

</script>

<GridContainer class="demopage-grid">
  <GridLine>
    <span class="grid-span-12">
      <Literal
        mask={literalMask}
        value="This is a simple text display with literals around it" />
    </span>
  </GridLine>
</GridContainer>
<GridContainer class="demopage-grid">
  <GridLine>
    <span class="grid-span-12">
      <Literal
        mask={onlyLiteral}
        value="This is not going to be displayed" />
    </span>
  </GridLine>
</GridContainer>
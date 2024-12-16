<script lang="ts">
  import {
    GridContainer,
    GridLine,
  } from '$lib/grid/index.js'

  import {
    TEXT_DISPLAY_TYPE_TEXT,
    TextDisplay,
  } from '$lib/text-display/index.js'

  const splitMask = [
    'Part1: ',
    {
      type: TEXT_DISPLAY_TYPE_TEXT,
    },
    ', Part2: ',
    {
      type: TEXT_DISPLAY_TYPE_TEXT,
    },
  ]

  const commaSplitter = (value: any) : any[] => {
    return value.toString().split(',')
  }
</script>

<GridContainer class="demopage-grid">
  <GridLine>
    <span class="grid-span-12">
      <TextDisplay
        mask={splitMask}
        splitter={commaSplitter}
        value="Use,a splitter" />
    </span>
    <span class="grid-span-12">
      <TextDisplay
        mask={splitMask}
        value={['Use', 'an array']} />
    </span>
  </GridLine>
</GridContainer>
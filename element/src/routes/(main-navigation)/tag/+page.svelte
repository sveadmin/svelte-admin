<script lang="ts">
  import {
    GridContainer,
    GridLine,
  } from '$lib/grid/index.js'

  import {
    Tag,
  } from '$lib/tag/index.js'
</script>

<GridContainer>
  <GridLine>
    <span class="grid-span-12">
      <Tag mask="Unformatted unit display: $(number)"
        unit="kilogram"
        value="123456789.987654" />
    </span>
  </GridLine>
</GridContainer>
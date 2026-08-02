<script lang="ts">

  import {
    Accordion,
    AccordionGroup,
    type AccordionStore,
  } from '$lib/accordion/index.js'

  let openStates: AccordionStore[] = $state([
      {isOpen: true},
      {isOpen: true},
      {isOpen: true},
    ])
</script>

<AccordionGroup bind:openStates={openStates} style="border-left:.25rem solid blue">
  <Accordion bind:open={openStates[0]}>
    This is the first element of the accordion group
  </Accordion>
  <Accordion bind:open={openStates[1]} title="Second">
    This is the second element of the accordion group
  </Accordion>
  <Accordion bind:open={openStates[2]} title="This is the third element">
    {#snippet content()}
      Which uses up the most space definition, but hey this is the most declarative
    {/snippet}
  </Accordion>
</AccordionGroup>
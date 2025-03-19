<script lang="ts">
  import {
    Accordion,
    AccordionGroup,
    type AccordionStore,
  } from '$lib/accordion/index.js'

  let openStates2: AccordionStore[] = $state([
      {isOpen: false},
      {isOpen: false},
    ])

</script>

<AccordionGroup bind:openStates={openStates2} style="border-left:.25rem solid green" titleStyle="display:flex;flex-direction:column">
  {#snippet title(isAllOpen: boolean, action: (e: Event) => void)}
    <div>
      This is a custom title. It does not effect the behavior but it does effect the looks
    </div>
    <div style="{(isAllOpen) ? 'color:green' : 'color:#aaa'}">Accordions are all open</div>
    <div style="{(isAllOpen) ? 'color:#aaa' : 'color:green'}">Some accordions are closed</div>
    <input type="button" onclick={action} value={(isAllOpen) ? 'Close All' : 'Show All'} />
  {/snippet}
  <Accordion bind:open={openStates2[0]}>
    This is the first element of the accordion group
  </Accordion>
  <Accordion bind:open={openStates2[1]}>
    {#snippet title()}
      Second
    {/snippet}
    This is the second element of the accordion group
  </Accordion>
</AccordionGroup>
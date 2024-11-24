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
    ]),
    openStates2: AccordionStore[] = $state([
      {isOpen: false},
      {isOpen: false},
    ])

</script>

<Accordion>
  {#snippet content()}
    This is an exmaple accordion without title
  {/snippet}
</Accordion>

<Accordion>
  {#snippet title()}
    Very creative title
  {/snippet}
  {#snippet content()}
    This is an exmaple accordion with title
  {/snippet}
</Accordion>
<Accordion>
  If no designated slot is defined the content is treated as the dropdown part ant the title is empty
</Accordion>
<Accordion>
  {#snippet title()}
    Title can still be used
  {/snippet}
  Even if the content is not tagged as a specific snippet
</Accordion>
<AccordionGroup bind:openStates={openStates} style="border-left:.25rem solid blue">
  <Accordion bind:open={openStates[0]}>
    This is the first element of the accordion group
  </Accordion>
  <Accordion bind:open={openStates[1]}>
    {#snippet title()}
      Second
    {/snippet}
    This is the second element of the accordion group
  </Accordion>
  <Accordion bind:open={openStates[2]}>
    {#snippet title()}
      This is the third element
    {/snippet}
    {#snippet content()}
      Which uses up the most space definition, but hey this is the most declarative
    {/snippet}
  </Accordion>
</AccordionGroup>
<AccordionGroup bind:openStates={openStates2} style="border-left:.25rem solid green" titleStyle="display:flex;flex-direction:column">
  {#snippet title(isAllOpen: boolean)}
    <div>
      This is a custom title. It does not effect the behavior but it does effect the looks
    </div>
    <div style="{(isAllOpen) ? 'color:green' : 'color:#aaa'}">Accordions are all open</div>
    <div style="{(isAllOpen) ? 'color:#aaa' : 'color:green'}">Some accordions are closed</div>
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
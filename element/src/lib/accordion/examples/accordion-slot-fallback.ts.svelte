<script lang="ts">
  import {
    Accordion,
  } from '$lib/accordion/index.js'
</script>

<Accordion>
  If no designated slot is defined the content is treated as the dropdown part ant the title is empty
</Accordion>

<Accordion>
  {#snippet title()}
    Title can still be used
  {/snippet}
  Even if the content is not tagged as a specific snippet
</Accordion>
<script lang="ts">
  import {
    Accordion,
  } from '$lib/accordion/index.js'

  import type {
    AccordionTitleProps,
  } from '$lib/accordion/index.js'
</script>

<Accordion>
  If no designated slot is defined the content is treated as the dropdown part and the title is empty
</Accordion>

<Accordion>
  {#snippet title(options?: AccordionTitleProps)}
    Title can still be used
  {/snippet}
  Even if the content is not tagged as a specific snippet
</Accordion>
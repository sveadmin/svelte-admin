<script lang="ts">
  import {
    Accordion,
  } from '$lib/accordion/index.js'
</script>

<Accordion>
  {#snippet title()}
    Very creative title
  {/snippet}
  {#snippet content()}
    This is an exmaple accordion with title
  {/snippet}
</Accordion>
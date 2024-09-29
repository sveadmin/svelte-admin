<script lang="ts">
  import {
    Collapsible,
  } from '$lib/collapsible/index.js'



</script>

<Collapsible>
  {#snippet content()}
    This is an exmaple collapsible without title
  {/snippet}
</Collapsible>

<Collapsible>
  {#snippet title()}
    Very creative title
  {/snippet}
  {#snippet content()}
    This is an exmaple collapsible with title
  {/snippet}
</Collapsible>
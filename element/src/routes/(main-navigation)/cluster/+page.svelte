<script lang="ts">
  import {
    Accordion,
  } from '$lib/accordion/index.js'

  import ClusterWrapped from '$lib/cluster/examples/cluster-wrapped.ts.svelte'
  import CreditCard from '$lib/cluster/examples/credit-card.ts.svelte'
  import IpAddress from '$lib/cluster/examples/ip-address.ts.svelte'
</script>

<Accordion>
  {#snippet title()}
    <h2>Credit card</h2>
  {/snippet}
  <CreditCard />
</Accordion>

<Accordion>
  {#snippet title()}
    <h2>IP address</h2>
  {/snippet}
  <IpAddress />
</Accordion>

<Accordion>
  {#snippet title()}
    <h2>Cluster wrapped</h2>
  {/snippet}
  <ClusterWrapped />
</Accordion>
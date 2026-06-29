<script lang="ts">
  import {
    Accordion,
  } from '$lib/accordion/index.js'

  import PasswordSimple from '$lib/password-input/examples/password.ts.svelte'
  import PasswordWrapped from '$lib/password-input/examples/password-wrapped.ts.svelte'
</script>

<Accordion>
  {#snippet title()}
    <h2>Simple password input</h2>
  {/snippet}
  <PasswordSimple />
</Accordion>
{#if false}
<Accordion>
  {#snippet title()}
    <h2>Password input wrapped</h2>
  {/snippet}
  <PasswordWrapped />
</Accordion>
{/if}
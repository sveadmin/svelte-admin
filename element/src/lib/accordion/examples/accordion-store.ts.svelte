<script lang="ts">
  import {
    Accordion,
  } from '$lib/accordion/index.js'

  let open = $state({isOpen: false})
</script>

<Accordion title={'The accordion is ' + ((open.isOpen) ? 'open' : 'closed')} bind:open={open}>
  Accordion open state bound to local variable
</Accordion>

<Accordion data={{id: 'test-id'}}>
  Data variable is stored on the accordionheader element, as that is where the event is finally triggered.
</Accordion>
<script lang="ts">
  import {
    Accordion,
  } from '$lib/accordion/index.js'

  import type {
    AccordionControlProps,
  } from '$lib/accordion/index.js'

  import {
    Checkbox,
  } from '$lib/checkbox/index.js'

  import {
    ImageWrapped,
  } from '$lib/image/index.js'
    import { stopPropagation } from 'svelte/legacy';

/**
 * options?.data?.open == '1' is used as SvelteKit returns the value which was set in the property.
 * Accordion sets numeric 1, while TS defintions expect data properties to be string
*/

</script>

{#snippet customControl(options?: AccordionControlProps)}
  {#if options?.data?.open == '1'}
    Expanded
  {:else}
    Collapsed
  {/if}
{/snippet}

{#snippet customControl2(options?: AccordionControlProps)}
  {#if options?.data?.open == '1'}
    <ImageWrapped {...options} icon="eye-closed" />
  {:else}
    <ImageWrapped {...options} icon="eye"/>
  {/if}
{/snippet}

{#snippet customControl3(options?: AccordionControlProps)}
  <Checkbox onClick={(e: Event) => {e.stopPropagation()}} isHintHidden={true} bind:value={options.data.open}/>
{/snippet}

<Accordion title="Changing the control element" childrenConfig={{control: {icon: 'nav-arrow-up-solid'}}}>
  This accordion uses a custom icon
</Accordion>
<Accordion title="Use custom snippet" control={customControl}>
  Fully customized control snippet
</Accordion>
<Accordion title="Use custom icons" control={customControl2} isControlRotating={false}>
  Custom icons need more setup to counteract default css rotation by 180 degrees
</Accordion>
<Accordion title="Use checkbox" control={customControl3} isControlRotating={false}>
  Event propagation has to to stopped on the checkbox, otherwise the accordion flips twice. If value is not bound, default Checkbox switch click will change value and can desync the checkbox value from the opened state.
</Accordion>
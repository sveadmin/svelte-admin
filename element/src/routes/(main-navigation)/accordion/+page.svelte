<script lang="ts">
  import SimpleAccordion from './accordion.ts.svelte'
  import AccordionWithClasses from './accordion-classes.ts.svelte'
  import AccordionWithTitle from './accordion-title.ts.svelte'
  import AccordionSlotFallback from './accordion-slot-fallback.ts.svelte'
  import SimpleAccordionGroup from './accordion-group.ts.svelte'
  import AccordionGroupCustomTitle from './accordion-group-custom-title.ts.svelte'
  import AccordionColumns from './accordion-columns.ts.svelte'
</script>

<h2>Default settings</h2>
<SimpleAccordion />
<h2>With classes and styles</h2>
<AccordionWithClasses />
<h2>With Title</h2>
<AccordionWithTitle />
<h2>Content slot is optional</h2>
<AccordionSlotFallback />
<h2>Group accordions</h2>
<SimpleAccordionGroup />
<h2>Group accordions and use custom header</h2>
<AccordionGroupCustomTitle />
<h2>Use accordion in grids</h2>
<AccordionColumns />
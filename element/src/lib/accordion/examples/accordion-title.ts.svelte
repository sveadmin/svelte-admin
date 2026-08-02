<script lang="ts">
  import {
    SIZE_EXTRA_LARGE,
    SIZE_LARGE,
  } from '$lib/types.js'

  import {
    Accordion,
  } from '$lib/accordion/index.js'

  import type {
    AccordionTitleProps,
  } from '$lib/accordion/index.js'

  import {
    ImageWrapped,
  } from '$lib/image/index.js'

  import {
    TextInput,
  } from '$lib/text-input/index.js'
</script>

<Accordion title="Simple title definition">
  This accordion has only a simple title
</Accordion>
<Accordion>
  {#snippet title(options?: AccordionTitleProps)}
    Very creative title, where options can be used
  {/snippet}
  {#snippet content()}
    This is an exmaple accordion with title. Content is also placed within the snippet definition, but it works without as well.
  {/snippet}
</Accordion>
<Accordion>
  {#snippet title(options?: AccordionTitleProps)}
    <ImageWrapped icon="cube-dots" style="font-size:2.25rem;"/>Title using other elements to show how element placement works
    <TextInput size={SIZE_EXTRA_LARGE}/>
    
  {/snippet}
  This is an exmaple accordion with title
</Accordion>
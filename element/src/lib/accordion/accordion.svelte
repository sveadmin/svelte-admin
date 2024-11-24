<script lang="ts">
  import {
    normalizeArray,
  } from '$lib/helper/index.js'

  import type {
    AccordionProps,
  } from './types.js'

  import './accordion.css'

  import {
    prepareFlipAccordion,
  } from './action/index.js'

  const {
    children,
    content = children,
    class: classList = $bindable([]),
    isOpen = true,
    open = $bindable({isOpen: !!isOpen && isOpen !== "0"}),
    style = $bindable([]),
    tabIndex = 0,
    title
  } : AccordionProps = $props()

  let classes: string[] = $state(normalizeArray(classList, ' ')),
    styles: string[] = $state(normalizeArray(style, ';'))

  const flipAccordion = prepareFlipAccordion(open)
  
</script>

<sveaaccordion class={classes.join(' ')} style={styles.join(';')}>
  <sveaaccordiontitle data-open={(open.isOpen) ? 1 : 0}
    onclick={flipAccordion}
    onkeyup={flipAccordion}
    role='button'
    tabindex={tabIndex} >
    {#if title}
      {@render title()}
    {/if}
    <spacer></spacer>
    <sveaaccordioncontrol class:closed={!open.isOpen}
      class="iconoir-arrow-up-tag">
  </sveaaccordiontitle>
  {#if open.isOpen && content}
    <sveaaccordioncontent>
      {@render content()}
    </sveaaccordioncontent>
  {/if}
</sveaaccordion>
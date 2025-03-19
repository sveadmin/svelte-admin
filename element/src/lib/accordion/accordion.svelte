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
    childrenClass = $bindable([]),
    childrenStyle = $bindable([]),
    content = children,
    class: classList = $bindable([]),
    isOpen = true,
    open = $bindable({isOpen: !!isOpen && isOpen !== "0"}),
    style = $bindable([]),
    tabIndex = 0,
    title,
    titleClass = $bindable([]),
    titleStyle = $bindable([]),
  } : AccordionProps = $props()

  let childrenClasses: string[] = $derived(normalizeArray(childrenClass, ' ')),
    childrenStyles: string[] = $derived(normalizeArray(childrenStyle, ';')),
    classes: string[] = $derived(normalizeArray(classList, ' ')),
    styles: string[] = $derived(normalizeArray(style, ';')),
    titleClasses: string[] = $derived(normalizeArray(titleClass, ' ')),
    titleStyles: string[] = $derived(normalizeArray(titleStyle, ';'))

  const flipAccordion = prepareFlipAccordion(open)
  
</script>

<sveaaccordion class={classes.join(' ')} style={styles.join(';')}>
  <sveaaccordiontitle class={titleClasses.join(' ')}
    data-open={(open.isOpen) ? 1 : 0}
    onclick={flipAccordion}
    onkeyup={flipAccordion}
    role='button'
    style={titleStyles.join(';')}
    tabindex={tabIndex} >
    {#if title}
      {@render title()}
    {/if}
    <spacer></spacer>
    <sveaaccordioncontrol class:closed={!open.isOpen}
      class="iconoir-arrow-up-tag">
  </sveaaccordiontitle>
  {#if open.isOpen && content}
    <sveaaccordioncontent class={childrenClasses.join(' ')} style={childrenStyles.join(';')}>
      {@render content()}
    </sveaaccordioncontent>
  {/if}
</sveaaccordion>
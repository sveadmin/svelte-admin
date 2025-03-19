<script lang="ts">
  import {
    i18n,
  } from '@sveadmin/common'

  import {
    normalizeArray,
  } from '$lib/helper/index.js'

  import type {
    AccordionGroupProps,
    AccordionStore,
  } from './types.js'

  import './accordion.css'

  import {
    prepareFlipAllAccordion,
  } from './action/index.js'

  import {
    allOpenReducer,
  } from './helper/index.js'

  import * as translations from './translation/index.js'

  const {
    children,
    content = children,
    class: classList = $bindable([]),
    openStates = $bindable([]),
    style = $bindable([]),
    tabIndex = 0,
    title,
    titleClass = $bindable([]),
    titleStyle = $bindable([]),
  } : AccordionGroupProps = $props()

  const isVisible = $derived(openStates.length > 0)
  const isAllOpen = $derived(openStates.reduce(allOpenReducer, true))

  const flipAllAccordion = prepareFlipAllAccordion(openStates)

  let classes: string[] = $derived(normalizeArray(classList, ' ')),
    styles: string[] = $derived(normalizeArray(style, ';')),
    titleClasses: string[] = $derived(normalizeArray(titleClass, ' ')),
    titleStyles: string[] = $derived(normalizeArray(titleStyle, ';'))

  i18n.addMultipleLocales(translations)

</script>

{#snippet defaultTitle(isAllOpen: boolean, action: (e: Event) => void = flipAllAccordion)}
  <sveaaccordiongroupspacer></sveaaccordiongroupspacer>
  <sveaaccordiongrouphideall
    onclick={action}
    onkeyup={action}
    role='button'
    tabindex={tabIndex} >
    {(isAllOpen)
      ? i18n.t('AccordionHideAll')
      : i18n.t('AccordionShowAll')
    }
  </sveaaccordiongrouphideall>
{/snippet}

<sveaaccordiongroup class={classes.join(' ')} style={styles.join(';')} >
  {#if isVisible}
    <sveaaccordiongrouptitle
      class={titleClasses.join(' ')}
      style={titleStyles.join(';')}
    >
      {#if title}
        {@render title(isAllOpen, flipAllAccordion)}
      {:else}
        {@render defaultTitle(isAllOpen, flipAllAccordion)}
      {/if}
    </sveaaccordiongrouptitle>
  {/if}
  {#if content}
    {@render content()}
  {/if}
</sveaaccordiongroup>
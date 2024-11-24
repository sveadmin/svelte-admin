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

  const filpAllAccordion = prepareFlipAllAccordion(openStates)

  let classes: string[] = $state(normalizeArray(classList, ' ')),
    styles: string[] = $state(normalizeArray(style, ';')),
    titleClasses: string[] = $state(normalizeArray(titleClass, ' ')),
    titleStyles: string[] = $state(normalizeArray(titleStyle, ';'))

  i18n.addMultipleLocales(translations)

</script>

{#snippet defaultTitle(isAllOpen: boolean)}
  <span class="defaultAccordionGroupTitle">
    {(isAllOpen)
      ? i18n.t('AccordionHideAll')
      : i18n.t('AccordionShowAll')
    }
  </span>
{/snippet}

<sveaaccordiongroup class={classes.join(' ')} style={styles.join(';')} >
  {#if isVisible}
    <sveaaccordiongrouptitle
      class={titleClasses.join(' ')}
      onclick={filpAllAccordion}
      onkeyup={filpAllAccordion}
      role='button'
      style={titleStyles.join(';')}
      tabindex={tabIndex}
    >
      {#if title}
        {@render title(isAllOpen)}
      {:else}
        {@render defaultTitle(isAllOpen)}
      {/if}
    </sveaaccordiongrouptitle>
  {/if}
  {#if content}
    {@render content()}
  {/if}
</sveaaccordiongroup>
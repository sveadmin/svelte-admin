<script lang="ts">
  import {
    dataParser,
    normalizeArray,
    mergeProperties,
  } from '$lib/helper/index.js'

  import type {
    AccordionContentProps,
    AccordionControlProps,
    AccordionProps,
    AccordionTitleProps,
  } from './types.js'

  import './accordion.css'

  import {
    prepareFlipAccordion,
  } from './action/index.js'

  import {
    renderAccordionControl
  } from './accordion-control.svelte'

  const {
    children,
    childrenConfig,
    contentClass = $bindable([]),
    contentStyle = $bindable([]),
    control = renderAccordionControl,
    controlClass = $bindable([]),
    controlStyle = $bindable([]),
    content = children,
    class: classList = $bindable([]),
    data,
    headerClass = $bindable([]),
    headerStyle = $bindable([]),
    isControlRotating = true,
    isOpen = true,
    onOpen,
    onClose,
    open = $bindable({isOpen: !!isOpen && isOpen !== "0"}),
    style = $bindable([]),
    tabIndex = 0,
    title,
    titleClass = $bindable([]),
    titleStyle = $bindable([]),
  } : AccordionProps = $props()

  let flipAccordion = $derived(prepareFlipAccordion(open, onOpen, onClose))

  let onTitleClick = $derived(flipAccordion),
    onTitleKeyUp = $derived((event?: KeyboardEvent) : boolean | Promise<boolean> => flipAccordion(event))

  const contentConfig : AccordionContentProps = $derived(mergeProperties(
      childrenConfig?.content,
      childrenConfig?.[3],
      {
        class: contentClass,
        style: contentStyle
      }
    ))
  
  const controlConfig : AccordionControlProps = $derived(mergeProperties(
      {
        class: (isControlRotating) ? 'rotateControl' : '',
        data: {
          open: (open.isOpen) ? 1 : 0
        },
      },
      childrenConfig?.control,
      childrenConfig?.[2],
      {
        class: controlClass,
        style: controlStyle
      },
      {
        class: 'accordionControl',
        icon: 'nav-arrow-up',
        onClick: flipAccordion,
      }
  ))

  const headerConfig : AccordionTitleProps = $derived(mergeProperties(
      childrenConfig?.header,
      childrenConfig?.[0],
      {
        class: headerClass,
        onClick: onTitleClick,
        onKeyup: onTitleKeyUp,
        style: headerStyle,
      }
  ))
  
  const titleConfig : AccordionTitleProps = $derived(mergeProperties(
      childrenConfig?.title,
      childrenConfig?.[1],
      {
        class: titleClass,
        onClick: onTitleClick,
        onKeyup: onTitleKeyUp,
        style: titleStyle,
      }
  ))

  let classes: string[] = $derived(normalizeArray(classList, ' ')),
    dataParsed: {[key: string] : string} = $derived(dataParser(data)),
    headerClasses: string[] = $derived(normalizeArray(headerConfig.class, ' ')),
    headerStyles: string[] = $derived(normalizeArray(headerConfig.style, ';')),
    styles: string[] = $derived(normalizeArray(style, ';')),
    titleClasses: string[] = $derived(normalizeArray(titleConfig.class, ' ')),
    titleStyles: string[] = $derived(normalizeArray(titleConfig.style, ';'))
</script>

<sveaaccordion class={classes.join(' ')} style={styles.join(';')}>
  <sveaaccordionheader
    {...dataParsed}
    data-open={(open.isOpen) ? 1 : 0}
    class={headerClasses.join(' ')}
    style={headerStyles.join(';')}
    onclick={headerConfig.onClick}
    onkeyup={headerConfig.onKeyUp}
    role='button'
    tabindex={tabIndex} >
    <sveaaccordiontitle class={titleClasses.join(' ')}
      style={titleStyles.join(';')} >
      {#if title}
        {#if typeof title === 'string'}
          {title}
        {:else}
          {@render title(titleConfig)}
        {/if}
      {/if}
    </sveaaccordiontitle>
    <spacer></spacer>
    {@render control(controlConfig)}
  </sveaaccordionheader>
  {#if open.isOpen && content}
    <sveaaccordioncontent {...contentConfig}>
      {@render content()}
    </sveaaccordioncontent>
  {/if}
</sveaaccordion>
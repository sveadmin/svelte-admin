<script lang="ts">
  import {
    normalizeArray,
    mergeProperties,
    wrapOnEvent,
    wrapOnKeyPress,
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

  const {
    children,
    childrenConfig,
    contentClass = $bindable([]),
    contentStyle = $bindable([]),
    controlClass = $bindable([]),
    controlStyle = $bindable([]),
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

  const contentConfig : AccordionContentProps = $derived(mergeProperties(
      childrenConfig?.content,
      childrenConfig?.[2],
      {
        class: contentClass,
        style: contentStyle
      }
    ))
  
  const controlConfig : AccordionControlProps = $derived(mergeProperties(
      childrenConfig?.control,
      childrenConfig?.[1],
      {
        class: controlClass,
        style: controlStyle
      },
      {
        class: 'iconoir-arrow-up-tag',
      }
  ))
  const titleConfig : AccordionTitleProps = $derived(mergeProperties(
      childrenConfig?.title,
      childrenConfig?.[0],
      {
        class: titleClass,
        style: titleStyle
      }
  ))

  let contentClasses: string[] = $derived(normalizeArray(contentConfig.class, ' ')),
    contentStyles: string[] = $derived(normalizeArray(contentConfig.style, ';')),
    controlClasses: string[] = $derived(normalizeArray(controlConfig.class, ' ')),
    controlStyles: string[] = $derived(normalizeArray(controlConfig.style, ';')),
    classes: string[] = $derived(normalizeArray(classList, ' ')),
    styles: string[] = $derived(normalizeArray(style, ';')),
    titleClasses: string[] = $derived(normalizeArray(titleConfig.class, ' ')),
    titleStyles: string[] = $derived(normalizeArray(titleConfig.style, ';'))

  const flipAccordion = prepareFlipAccordion(open)
  let onTitleClick = flipAccordion,
    onTitleKeyUp = (event?: KeyboardEvent) : boolean | Promise<boolean> => flipAccordion(event)

  if (titleConfig.onClick) {
    onTitleClick = wrapOnEvent(titleConfig.onClick, onTitleClick)
  }

  if (titleConfig.onKeyUp) {
    onTitleKeyUp = wrapOnKeyPress(titleConfig.onKeyUp, onTitleKeyUp)
  }

</script>

<sveaaccordion class={classes.join(' ')} style={styles.join(';')}>
  <sveaaccordiontitle class={titleClasses.join(' ')}
    data-open={(open.isOpen) ? 1 : 0}
    onclick={onTitleClick}
    onkeyup={onTitleKeyUp}
    role='button'
    style={titleStyles.join(';')}
    tabindex={tabIndex} >
    {#if title}
      {@render title()}
    {/if}
    <spacer></spacer>
    <sveaaccordioncontrol class={controlClasses.join(' ')}
      class:closed={!open.isOpen}
      style={controlStyles.join(';')}>
    </sveaaccordioncontrol>
  </sveaaccordiontitle>
  {#if open.isOpen && content}
    <sveaaccordioncontent class={contentClasses.join(' ')} style={contentStyles.join(';')}>
      {@render content()}
    </sveaaccordioncontent>
  {/if}
</sveaaccordion>
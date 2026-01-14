<script lang="ts">
  import {
    untrack,
  } from 'svelte'

  import {
    childParser,
    mergeClasses,
    mergeStyles,
    normalizeArray,
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

  // const classMerger = (classList: string | string[], additionalClassList?: string | string[]) => {
  //   const classes = normalizeArray(classList, ' ')
  //   normalizeArray(additionalClassList, ' ').map(newClass => {
  //     untrack(() => {
  //       if (classes.indexOf(newClass) === -1) {
  //         classes.push(newClass)
  //       }
  //     })
  //   })

  //   return classes
  // }

  // const styleMerger = (styleList: string | string[], additionalStyleList?: string | string[]) => {
  //   const styles = normalizeArray(styleList, ';')
  //   normalizeArray(additionalStyleList, ';').map(newStyle => {
  //     untrack(() => {
  //       if (styles.indexOf(newStyle) === -1) {
  //       //TODO: do the proper match of comparing only the style definitions not the entire value
  //         styles.push(newStyle)
  //       }
  //     })
  //   })

  //   return styles
  // }

  const contentConfig : AccordionContentProps = childParser(childrenConfig, 2),
    controlConfig : AccordionControlProps = childParser(childrenConfig, 1),
    titleConfig : AccordionTitleProps = childParser(childrenConfig)

  let contentClasses: string[] = $derived.by(() => mergeClasses(contentClass, contentConfig.class)),
    contentStyles: string[] = $derived.by(() => mergeStyles(contentStyle, contentConfig.style)),
    controlClasses: string[] = $derived.by(() => {
      let classes = mergeClasses(controlClass, controlConfig.class)
      untrack(() => {
        classes.push('iconoir-arrow-up-tag')
      })
      return classes
    }),
    controlStyles: string[] = $derived.by(() => mergeStyles(controlStyle, controlConfig.style)),
    classes: string[] = $derived(normalizeArray(classList, ' ')),
    styles: string[] = $derived(normalizeArray(style, ';')),
    titleClasses: string[] = $derived.by(() => mergeClasses(titleClass, titleConfig.class)),
    titleStyles: string[] = $derived.by(() => mergeStyles(titleStyle, titleConfig.style))

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
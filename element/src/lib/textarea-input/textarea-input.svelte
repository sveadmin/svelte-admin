<script lang="ts">
import { browser, dev } from '$app/environment'

  import {
    onMount,
    onDestroy,
    untrack,
  } from 'svelte'

  import DOMPurify from 'dompurify'

  import {
    SIZE_MEDIUM,
  } from '$lib/types.js'

  import type {
    KeyMap,
    ValueHelperStore,
  } from '$lib/types.js'

  import {
    ariaParser,
    dataParser,
    normalizeArray,
    normalizeVisibleSizeExactKey,
    normalizeVisibleSizeValue,
    mergeClasses,
    mergeProperties,
    wrapOnMouseAction,
    wrapOnInit,
  } from '$lib/helper/index.js'

  import {
    prepareInputOnInit,
  } from '$lib/input/index.js'

  import {
    Literal,
  } from '$lib/literal/index.js'

  import type {
    LiteralDisplayProps,
    ComponentLiteral,
  } from '$lib/literal/index.js'

  import {
    prepareCopyValue,
  } from '$lib/text-display/index.js'

  import type {
    TextareaInputProps,
  } from './types.js'

  import './textarea-input.css'

  let {
    allowedAttributes = [],
    allowedEntities = ['gt', 'lt', 'nbsp'],
    allowedTags= ['b', 'i', 'u', 'a', 'p', 'br', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
    aria = {},
    autoFocus = false,
    children,
    childrenConfig,
    class: classList = $bindable([]),
    componentConfig,
    contentInstance = $bindable({ref: undefined}),
    data = {},
    id = $bindable('textarea-' + Math.random().toString(36).substring(2, 6)),
    instance = $bindable({ref: undefined}),
    isCopyingEnabledOnClick = false,
    isHTML = false,
    isHTMLExported,
    literalClass = $bindable([]),
    literalStyle = $bindable([]),
    maxHeight,
    onClick,
    onInit,
    resize,
    size = SIZE_MEDIUM,
    spellcheck = false,
    style = $bindable([]),
    value = $bindable(),
    visibleHeight,
    visibleWidth,
    ...passthrough
  } : TextareaInputProps = $props()

  const Component = componentConfig?.literal?.component
    || componentConfig?.[0]?.component
    || Literal

  let ariaParsed: {[key: string] : string} = $derived(ariaParser(aria)),
    classes: string[] = $derived(normalizeArray(classList, ' ')),
    dataParsed: {[key: string] : string} = $derived(dataParser(data)),
    hiddenContainer: HTMLElement,
    localStyles: string[] = $derived.by(() => {
      const styles = []
      if (resize) {
        styles.push(`resize:${resize}`, 'overflow:auto')
      }
      
      const sizeStyles = mergeProperties(
        normalizeVisibleSizeExactKey(visibleHeight, 'height'),
        normalizeVisibleSizeExactKey(visibleWidth, 'width'),
        normalizeVisibleSizeExactKey(maxHeight, 'max-height'),
      )

      for (const property in sizeStyles) {
        styles.push(`${property}:${sizeStyles[property]}`)
      }
      return styles
    }),
    onElementClick = (isCopyingEnabledOnClick)
      ? wrapOnMouseAction(prepareCopyValue(() => value), onClick)
      : onClick,
    styles: string[] = $derived(normalizeArray(style, ';')),
    valueGuard: string | number | null = $state(null)

  let derivedStyles = $derived(mergeClasses(styles, localStyles))

  // Add sanitization logic (does not work for children property)
  let valueSanitized = (browser) ? clearInput(value) : value

  let valueHelper: ValueHelperStore = $state({
      display: valueSanitized,
      value: valueSanitized,
    })

  isHTMLExported = isHTMLExported ?? (isHTML || typeof children === 'function')

  function clearInput(text: string) {
    const config = {
      ALLOWED_ATTR: allowedAttributes,
      ALLOWED_ENTITIES: allowedEntities,
      ALLOWED_TAGS: allowedTags,
    }

console.log('sanitizing input', text, DOMPurify.sanitize(text ?? '', config)
      .replace(/<!--[\s\S]*?-->/g, '')
      .replace(/\\x3C!--[\s\S]*?-->/g, '')
      .replace(/&lt;!--[\s\S]*?--&gt;/g, ''))

    if (!dev) {
      return DOMPurify.sanitize(text, config)
    }

    return DOMPurify.sanitize(text ?? '', config)
      .replace(/<!--[\s\S]*?-->/g, '')
      .replace(/\\x3C!--[\s\S]*?-->/g, '')
      .replace(/&lt;!--[\s\S]*?--&gt;/g, '')
  }

  const literalConfig : LiteralDisplayProps = $derived(mergeProperties(
    passthrough,
    childrenConfig?.literal,
    childrenConfig?.[0],
    componentConfig?.literal?.display?.config,
    componentConfig?.[0]?.display?.config,
    {
      class: literalClass,
      isHTML,
      style: literalStyle
    },
    (maxHeight)
      ? {
        style: `max-height=${normalizeVisibleSizeValue(maxHeight)}`
      }
      : {}
  ))

  const onInputInit = wrapOnInit(onInit, prepareInputOnInit(autoFocus))
  let observer: MutationObserver


  $effect(() => {
    if (contentInstance.ref) {
      if (browser) {
        observer = observer ?? new MutationObserver(callback)
        observer.observe(contentInstance.ref, mutationConfig)
      }
      onInputInit(contentInstance.ref)
      if (autoFocus) {
        const range = document.createRange()
        range.selectNodeContents(contentInstance.ref)
        range.collapse(false)
        const selection = window.getSelection()
        selection?.removeAllRanges()
        selection?.addRange(range)
      }
      if (children) {
        valueHelper.display = clearInput(contentInstance.ref?.innerHTML ?? '')
        valueHelper.value = contentInstance.ref?.textContent ?? null
      }
    }
  })

  // $effect(() => {
  //   if (valueGuard !== contentInstance.ref?.innerHTML) {
  //     valueHelper.display = contentInstance.ref?.innerHTML
  //     valueGuard = contentInstance.ref?.innerHTML
  //   }
  //   console.log('c2', contentInstance.ref?.textContent)
  // })
  let timeout = 0
  clearTimeout(timeout)

  const dobouncedHandler = () => {
    const currentValue = clearInput(contentInstance.ref?.innerHTML ?? '')
    if (!valueHelper.display) {
      untrack(() => {
        // This is needed as with empty innerHTML the {@html ...} in literal will create a DOM node duplicating the change and causing an infinitne loop
        contentInstance.ref.innerHTML = currentValue
      })
    }
    valueHelper.display = currentValue
    valueHelper.value = contentInstance.ref?.textContent ?? null
    valueGuard = currentValue
    // iteration = 0
  }

  const callback = (mutationsList, observer) => {
      // for (const mutation of mutationsList) {
      //   if (mutation.type === 'childList') {
      //     console.log('Child nodes changed:', mutation)
      //   } else if (mutation.type === 'characterData') {
      //     console.log('Text changed:', mutation.target.textContent, mutation.target.innerHTML)
      //   }
      // }
      const currentValue = clearInput(contentInstance.ref?.innerHTML ?? '')
    // console.log('CV', valueGuard, currentValue)
      if (valueGuard !== currentValue) {
        clearTimeout(timeout)
        timeout = setTimeout(dobouncedHandler, 101)
      }
  }

  $effect(() => {
    value = (isHTMLExported)
     ? valueHelper.display
     : valueHelper.value
  })

  const mutationConfig = {
    // childList: true,       // Observe direct children
    subtree: true,         // Observe all descendants
    characterData: true,   // Observe text changes
    // attributes: true,      // Observe attribute changes (e.g., style, class)
    // attributeFilter: ['style', 'class'] // Optional: Filter specific attributes
  }

  onDestroy(() => {
    observer?.disconnect()
  })

$inspect('VHJVHV', valueHelper)
// $inspect('VHGGGGGG', valueGuard)
// $inspect('V', value, valueSanitized)
// $inspect('INSTST', instance)

</script>

<sveatextarea {...ariaParsed}
  class={classes.join(' ')}
  contenteditable="true"
  {...dataParsed}
  data-size={size}
  onclick={onElementClick}
  {spellcheck}
  style={derivedStyles.join(';')}
  bind:this={contentInstance.ref} >
  {#if children}
    {@render children()}
  {:else}
    <Component {...literalConfig} value={valueHelper.display} />
  {/if}
</sveatextarea>
<input {...dataParsed}
  {id}
  name={id}
  bind:this={instance.ref}
  type="hidden"
  {value} />
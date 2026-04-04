<script lang="ts">
  import {
    untrack,
  } from 'svelte'

  import type {
    Component,
    Snippet,
  } from 'svelte'

  import {
    createFieldValidator,
    i18n,
  } from '@sveadmin/common'

  import type {
    IsValid,
    ValidatorStore,
  } from '@sveadmin/common'
  
  import {
    TEXT_INPUT_TYPE_NUMBER,
    TEXT_INPUT_TYPE_PASSWORD,
    TEXT_INPUT_TYPE_TEL,
    TEXT_INPUT_TYPE_TEXT,
  } from '$lib/types.js'
  
  import type {
    ChildrenDefinition,
    SveadminComponent,
    SveadminComponentMask,
    SveadminElementConfig,
  } from '$lib/types.js'

  import {
    mergeClasses,
    mergeStyles,
    wrapOnBlur,
    wrapOnEvent,
    wrapOnFocus,
    wrapOnInput,
  } from '$lib/helper/index.js'

  import {
    COMPONENT_BUTTON,
    renderButton,
  } from '$lib/button/index.js'

  import type {
    ComponentButton
  } from '$lib/button/index.js'

  import {
    createComponentStore,
  } from '$lib/component/index.js'

  import type {
    ComponentSnippet,
  } from '$lib/component/index.js'

  import {
    COMPONENT_DROPDOWN_SEARCH,
    DropdownSearch,
  } from '$lib/dropdown-search/index.js'

  import {
    COMPONENT_IMAGE,
  } from '$lib/image/index.js'

  import {
    InputError,
    prepareOnBlur,
    prepareOnFocus,
  } from '$lib/input/index.js'

  import {
    COMPONENT_LITERAL,
    prepareMaskPartReducer,
  } from '$lib/literal/index.js'

  import {
    renderImage,
  } from '$lib/image/index.js'

  import type {
    ImageWrappedDisplayProps,
    ComponentImageWrapped,
  } from '$lib/image/index.js'

  import {
    COMPONENT_TEXT_DISPLAY,
    COMPONENT_TEXT_DISPLAY_WRAPPED,
    // prepareMaskPartReducer as pmpp2,
    renderTextDisplayWrapped,
    TextDisplay,
    TextDisplayWrapped,
  } from '$lib/text-display/index.js'

  import type {
    TextDisplayPart,
    TextDisplayPartObjects,
  } from '$lib/text-display/index.js'

  import {
    TextInput,
  } from '$lib/text-input/index.js'

  import type {
    InputMask,
    TextInputPartObjects,
  } from '$lib/text-input/index.js'

  import {
    createValueHelperStore,
  } from '$lib/value-helper/index.js'

  import type {
    ClusterDisplayProps,
  } from './types.js'

  import {
    prepareClear,
    prepareCopy,
  } from './action/index.js'

  import {
    clearButton,
    defaultComponents,
    copyButton,
  } from './config/index.js'

  import {
    attachComponents,
    defaultJoiner,
    defaultSplitter,
    dynamicPartsReducer,
    prepareExpandChildrenConfig,
    prepareValueParser,
    // prepareMaskPartReducer,
  } from './helper/index.js'

  import {
    renderLiteral,
  } from './render-literal.svelte'

  import './cluster.css'

  import * as translations from './translation/index.js'

  i18n.addMultipleLocales(translations)

  let {
    areErrorsVisible = true,
    childrenConfig = {},
    components = $bindable(createComponentStore(defaultComponents)),
    data = {},
    error,
    id = $bindable('cluster-' + Math.random().toString(36).substring(2, 6)),
    isClearButtonEnabled = false,
    isCopyButtonEnabled = false,
    isValidationPerformedOnLoad = false,
    joiner = defaultJoiner,
    keyMap,
    mask = $bindable(),
    onBlur: onBlurReceived,
    onChange,
    onFocus: onFocusReceived,
    onInit,
    onInput,
    onError,
    onKeyDown,
    onKeyUp,
    onMouseDown,
    onMouseUp,
    size,
    splitter = defaultSplitter,
    validators = createFieldValidator([]),
    value = $bindable([])
  } : ClusterDisplayProps = $props()

  if (!Array.isArray(mask)) {
    mask = [mask ?? '']
  }

  let dynamicPartMap: {[key: number] : number} = $state({}),
    dynamicParts: TextInputPartObjects[] = $state([]),
    lastError: IsValid = $state({valid: true}),
    localClasses: string[] = $state([]),
    nestedValidators: {[key: number] : ValidatorStore} = $state({}),
    inFocus = $state({value: false}),
    initialized: boolean = $state(false),
    valueHelper = createValueHelperStore(value)

  const valueParser = prepareValueParser(valueHelper)

  let nestedErrors: ValidatorStore[] = $derived.by(() => {
      return Object.values(nestedValidators).filter((validator: ValidatorStore) => !validator.result.valid)
    }),
    valueGuard : any = $state()

  const onBlur = wrapOnEvent(onBlurReceived, prepareOnBlur(inFocus))
  const onFocus = wrapOnFocus(onFocusReceived, prepareOnFocus(inFocus))

  const clearButtonConfig = clearButton({
    onClick: prepareClear(valueHelper),
    size
  })
  const copyButtonConfig = copyButton({
    onClick: prepareCopy(valueHelper),
    size
  })

  const baseConfig = {}
  let expandChildrenConfig = prepareExpandChildrenConfig(childrenConfig),
    maskParsed : SveadminComponent<any>[] = $state([]),
    maskPartReducer : (
      aggregator: SveadminComponent<any>[],
      currentPart: SveadminComponent<any> | string
    ) => SveadminComponent<any>[] = $state(() => [])

  async function loadMaskPartReducer() {
    maskPartReducer = await prepareMaskPartReducer()
  }

  $effect(() => {
    maskParsed = mask.reduce(maskPartReducer, [])
      .map(expandChildrenConfig)
      .map(attachComponents)
    untrack(() => {
      // This is only needed when the component is initialized to make sure there are no undefined references for bind
      if (!valueHelper.display
          || !valueHelper.display.length
          || valueHelper.display.length !== maskParsed.length) {
        valueHelper.display = new Array(maskParsed.length).fill('')
      }
    })
  })

$inspect('mp', maskParsed)
$inspect('comps', components)

console.log('111111', components.get('image').name)
console.log('222222', components.get('image-wrapped').name)

  // const maskPartReducer = prepareMaskPartReducer({
  //   data,
  //   id,
  //   keyMap,
  //   nestedValidators,
  //   onBlur,
  //   onInit,
  //   onChange,
  //   onError,
  //   onFocus,
  //   onInput,
  //   onKeyDown,
  //   onKeyUp,
  //   onMouseDown,
  //   onMouseUp,
  //   size,
  // })

  const mpp2 : (
    aggregator: TextDisplayPartObjects[],
    currentPart: TextDisplayPart
  ) => TextDisplayPartObjects[] = (
    aggregator: TextDisplayPartObjects[],
    currentPart: TextDisplayPart
  ) => Object.keys(childrenConfig).map(key => key)

  // console.log(mpp2(mask))

  let expandedMask : InputMask = $state([])
  
  if (!Array.isArray(valueHelper.display)) {
    valueHelper.display = []
  }

  // $effect(() => {
  //   expandedMask = mask.reduce(maskPartReducer, [])
  //   untrack(() => {
  //     dynamicPartMap = expandedMask.reduce(dynamicPartsReducer, {})
  //     dynamicParts = Object.keys(dynamicPartMap).map((realIndex: string) => {
  //       const dynamicPart = expandedMask[parseInt(realIndex)] as TextInputPartObjects
  //       return dynamicPart
  //     })
  //     if (dynamicParts.length > (valueHelper.display?.length ?? 0)) {
  //       if (!Array.isArray(valueHelper.display)) {
  //         valueHelper.display = []
  //       }
  //       for (let i = valueHelper.display.length; i < dynamicParts.length; i += 1) {
  //         valueHelper.display.push('')
  //       }
  //     }

  //     if (isCopyButtonEnabled) {
  //       expandedMask.push(copyButtonConfig)
  //     }
  //     if (isClearButtonEnabled) {
  //       expandedMask.push(clearButtonConfig)
  //     }
  //   })

  // })

  $effect(() => {
    const index = localClasses.indexOf('focus')
    if (!inFocus.value) {
      if (index !== -1) {
        localClasses.splice(index, 1)
      }
      return
    }
    if (index === -1) {
      localClasses.push('focus')
    }
  })

  $effect(() => {
    initialized = initialized || inFocus.value
  })

  $effect(() => {
    //This only needs to run when the value is changed from outside, through the bound data
    if (JSON.stringify(value) !== JSON.stringify(valueGuard)) {
      valueHelper.value = value
      valueHelper.current = splitter(valueHelper.value)
      dynamicPartMap = maskParsed.reduce(valueParser, [])
      valueGuard = value
    }
  })
  // $effect(() => {
  //   if (JSON.stringify(value) !== JSON.stringify(valueGuard)) {
  //     valueHelper.display = splitter(value)
  //     valueGuard = value
  //   }
  // })

  // let dynamicCount : number = 0

  // const valueParser = (
  //   aggregator: {[key: number] : number},
  //   currentPiece: SveadminComponent<any>,
  //   index: number
  // ) => {
  //   if (index === 0) {
  //     dynamicCount = 0
  //     valueHelper.display = []
  //   }
  //   const isEditable = currentPiece.isInputVisible || !!currentPiece?.input
  //   const isDisplayBeingUsed = !currentPiece.isInputVisible && !!currentPiece?.display?.config
  //   const config = ((!currentPiece.isInputVisible && currentPiece?.display?.config) || currentPiece?.input?.config) ?? {}
    
  //   untrack(() => {
  //     if (!valueHelper?.display
  //       || typeof valueHelper?.display === 'string') {
  //       return
  //     }
  //     if (config.value) {
  //       valueHelper.display.push(config.value)
  //     } else {
  //       // This filters out static components which can not have the value changed
  //       if (!isEditable) {
  //         valueHelper.display.push('')
  //       } else {
  //         aggregator[index] = dynamicCount++
  //         const current: string[] = valueHelper?.current as string[] //This type casting is guaranteed by running the splitter to get the vlaueHelper.current
  //         valueHelper.display.push(current[dynamicCount])
  //       }
  //     }
  //   })

  //   return aggregator
  // }

  $effect(() => {
    dynamicPartMap = maskParsed.reduce(valueParser, [])
  })

  $effect(() => {
    const display = valueHelper.display
    if (!display
      || typeof display === 'string') {
      return
    }

    display.map((currentValue, index) => {
      if (dynamicPartMap[index] >= 0) {
        valueHelper.current = valueHelper.current as any[] ?? []
        valueHelper.current[dynamicPartMap[index]] = currentValue
      }
    })
    // This part only needs to run if the display value is changed from the inputs
    untrack(() => {
      valueHelper.value = joiner(valueHelper.current, dynamicParts)
      value = valueHelper.value
    })
  })

  // $effect(() => {
  //   const display = valueHelper.display
  //   let valid = true
    
  //   if (!display
  //     || typeof display === 'string') {
  //     return
  //   }
  //   valueHelper.value = joiner(display, dynamicParts)
  //   value = valueHelper.value

  //   untrack(() => {
  //     if (!isValidationPerformedOnLoad
  //       && !initialized
  //     ) {
  //       return
  //     }
  //   console.log('GOOO falidate')
  //     valueHelper.value = joiner(display, dynamicParts)
  //     validators.validate(valueHelper.value)
  //     valid = validators.result.valid
  //   })
  //   // valueHelper.original = value
  //   const index = localClasses.indexOf('error')

  //   if (valid) {
  //     if (index !== -1) {
  //       localClasses.splice(index, 1)
  //     }
  //     return
  //   }
  //   if (index === -1) {
  //     localClasses.push('error')
  //   }
  // })

  $effect(() => {
    if (nestedErrors.length > 0) {
      lastError = nestedErrors[0].result
      return
    } else {
      lastError = validators.result
    }
  })

  loadMaskPartReducer()
// $inspect('MASK', mask)
// $inspect(mask, 'EXTENDED MASK', expandedMask)
// $inspect('NIPIUT LENGTH', inputLength)
$inspect('PPPPVVVVV', valueHelper)
$inspect('DPM', dynamicPartMap)
$inspect('DAREALVALUE', value)
// $inspect('DAPROTECTRROAOORA', valueGuard)
// $inspect('VVVVVVVVVVALSI', validators)
// $inspect('NJESZTED', nestedValidators, 'nested',  nestedErrors)
// $inspect('LSATERRERO', lastError)
// $inspect('overall', validators)
</script>

{#each maskParsed as maskPiece, index}
  {@const componentType = maskPiece?.type}
  {@const Component = components.get(componentType)}
  {@const snippet = components.get(componentType) as ComponentSnippet}
  {#if Component || snippet}
    {@const config = maskPiece?.display?.config ?? maskPiece?.input?.config}
    {#if Component?.name === 'wrapper'}
      <Component class={mergeClasses(config?.class, localClasses)}
        {...config}
        bind:value={valueHelper.display![index]} />
    {:else}
      {@render snippet?.(config, localClasses)}
    {/if}
  {:else}
    Component type not mapped: {componentType}
  {/if}
{/each}
<input {id} type="hidden" {value} />
{#if areErrorsVisible}
  {#if typeof error === 'function'}
    {@render error(lastError)}
  {:else}
    <InputError isValid={lastError} {size} />
    {#if (nestedErrors.length > 1)}
      <InputError isValid={{valid: false, message: i18n.t('additionalErrors', {count: nestedErrors.length - 1}) ?? 'additionalErrors'}} {size} />
    {/if}
  {/if}
{/if}
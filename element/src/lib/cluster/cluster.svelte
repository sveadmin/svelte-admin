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
  } from '$lib/button/index.js'

  import type {
    ComponentButton
  } from '$lib/button/index.js'

  import {
    createComponentStore,
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

  import type {
    SveaComponentLiteral,
  } from '$lib/literal/index.js'

  import type {
    ImageWrappedDisplayProps,
    ComponentImageWrapped,
  } from '$lib/image/index.js'

  import {
    COMPONENT_TEXT_DISPLAY,
    COMPONENT_TEXT_DISPLAY_WRAPPED,
    // prepareMaskPartReducer as pmpp2,
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
    // prepareMaskPartReducer,
  } from './helper/index.js'

  import {
    renderButton,
  } from './render-button.svelte'

  import {
    renderLiteral,
  } from './render-literal.svelte'

  import {
    renderTextDisplayWrapped,
  } from './render-text-display-wrapped.svelte'

  import {
    renderImage,
  } from './render-image.svelte'

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
    valueHelper = createValueHelperStore()

  let nestedErrors: ValidatorStore[] = $derived.by(() => {
      return Object.values(nestedValidators).filter((validator: ValidatorStore) => !validator.result.valid)
    }),
    valueGuard : any = $state()

  const onBlur = wrapOnEvent(onBlurReceived, prepareOnBlur(inFocus))
  const onFocus = wrapOnFocus(onFocusReceived, prepareOnFocus(inFocus))

  const clearButtonConfig = clearButton({
    onClick: prepareClear(valueHelper, () => dynamicParts.length),
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
    if (JSON.stringify(value) !== JSON.stringify(valueGuard)) {
      valueHelper.display = splitter(value)
      valueGuard = value
    }
  })

  $effect(() => {
    initialized = initialized || inFocus.value
  })

  $effect(() => {
    const display = valueHelper.display
    let valid = true
    
    if (!display
      || typeof display === 'string') {
      return
    }
    valueHelper.value = joiner(display, dynamicParts)
    value = valueHelper.value

    untrack(() => {
      if (!isValidationPerformedOnLoad
        && !initialized
      ) {
        return
      }
    console.log('GOOO falidate')
      valueHelper.value = joiner(display, dynamicParts)
      validators.validate(valueHelper.value)
      valid = validators.result.valid
    })
    // valueHelper.original = value
    const index = localClasses.indexOf('error')

    if (valid) {
      if (index !== -1) {
        localClasses.splice(index, 1)
      }
      return
    }
    if (index === -1) {
      localClasses.push('error')
    }
  })

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
// $inspect('PPPPVVVVV', valueParts, valueHelper)
// $inspect('DAREALVALUE', value)
// $inspect('DAPROTECTRROAOORA', valueGuard)
// $inspect('PPPPVVVVV', valueHelper)
// $inspect('VVVVVVVVVVALSI', validators)
// $inspect('NJESZTED', nestedValidators, 'nested',  nestedErrors)
// $inspect('LSATERRERO', lastError)
// $inspect('overall', validators)
</script>

{#each maskParsed as maskPiece, index}
  {@const componentType = maskPiece?.type}
  {@const Component = components.get(componentType)}
  {@const config = maskPiece?.display?.config ?? maskPiece?.input?.config}
  {#if Component?.name === 'wrapper'}
    <Component ...config value={config?.value}/>
  {:else}
    {@render Component(config)}
  {/if}
  {JSON.stringify(config)}
{/each}

{#each expandedMask as maskPiece, index}
  {#if typeof maskPiece === 'string'}
    {@render renderLiteral({
      value: maskPiece
    })}
  {:else if maskPiece.type === COMPONENT_LITERAL}
    {@render renderLiteral(maskPiece?.display)}
  {:else if maskPiece.type === COMPONENT_TEXT_DISPLAY_WRAPPED}
    {@render renderTextDisplayWrapped(maskPiece?.display)}
  {:else if maskPiece.type === COMPONENT_BUTTON}
    {@render renderButton(maskPiece as ComponentButton, localClasses)}
  {:else if maskPiece.type === COMPONENT_DROPDOWN_SEARCH}
    <DropdownSearch {...maskPiece}
      {...maskPiece.editor}
      childrenStyle="background-color:transparent"
      class={mergeClasses(localClasses, maskPiece.class)}
      bind:instance={maskPiece.instance}
      isBorderVisible={true}
      validators={nestedValidators[index]}
      bind:value={valueHelper.display![dynamicPartMap[index]]} />
  {:else if maskPiece.type === COMPONENT_IMAGE}
    {@render renderImage(maskPiece?.display, localClasses)}
  {:else if maskPiece.type === TEXT_INPUT_TYPE_NUMBER
    || maskPiece.type === TEXT_INPUT_TYPE_PASSWORD
    || maskPiece.type === TEXT_INPUT_TYPE_TEL 
    || maskPiece.type === TEXT_INPUT_TYPE_TEXT}
    {#key maskPiece.style}
      <TextInput {...maskPiece?.input?.config}
        class={mergeClasses(localClasses, maskPiece.class)}
        bind:instance={maskPiece.instance}
        type={maskPiece.type}
        validators={nestedValidators[index]}
        bind:value={valueHelper.display![dynamicPartMap[index]]} />
    {/key}
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
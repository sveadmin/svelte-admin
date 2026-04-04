<script lang="ts">
  import {
    untrack,
  } from 'svelte'

  import {
    createFieldValidator,
    i18n,
  } from '@sveadmin/common'

  import type {
    IsValid,
    ValidatorStore,
  } from '@sveadmin/common'
  
  import type {
    SveadminComponent,
  } from '$lib/types.js'

  import {
    mergeClasses,
    wrapOnEvent,
    wrapOnFocus,
  } from '$lib/helper/index.js'

  import {
    createComponentStore,
  } from '$lib/component/index.js'

  import type {
    ComponentSnippet,
  } from '$lib/component/index.js'

  import {
    InputError,
    prepareOnBlur,
    prepareOnFocus,
  } from '$lib/input/index.js'

  import {
    prepareMaskPartReducer,
  } from '$lib/literal/index.js'

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
    prepareExpandChildrenConfig,
    prepareValueParser,
  } from './helper/index.js'

  import './cluster.css'

  import * as translations from './translation/index.js'

  i18n.addMultipleLocales(translations)

  let {
    areErrorsVisible = true,
    childrenConfig = {},
    components = $bindable(createComponentStore(defaultComponents)),
    error,
    id = $bindable('cluster-' + Math.random().toString(36).substring(2, 6)),
    isClearButtonEnabled = false,
    isCopyButtonEnabled = false,
    isValidationPerformedOnLoad = false,
    joiner = defaultJoiner,
    mask = $bindable(),
    onBlur: onBlurReceived,
    onFocus: onFocusReceived,
    size,
    splitter = defaultSplitter,
    validators = createFieldValidator([]),
    value = $bindable([]),
    ...passthrough
  } : ClusterDisplayProps = $props()

  if (!Array.isArray(mask)) {
    mask = [mask ?? '']
  }

  let dynamicPartMap: {[key: number] : number} = $state({}),
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

  let expandChildrenConfig = prepareExpandChildrenConfig(
    childrenConfig,
    {
      ...passthrough,
      id,
      onBlur,
      onFocus,
      size
    }
  )
  
  let maskParsed : SveadminComponent<any>[] = $state([]),
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

  if (!Array.isArray(valueHelper.display)) {
    valueHelper.display = []
  }

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
    let valid = true
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
      valueHelper.value = joiner(valueHelper?.current, maskParsed)
      value = valueHelper.value

      if (!isValidationPerformedOnLoad
        && !initialized
      ) {
        return
      }
    console.log('GOOO falidate')
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
// $inspect('NIPIUT LENGTH', inputLength)
// $inspect('mp', maskParsed)
// $inspect('comps', components)
// $inspect('PPPPVVVVV', valueHelper)
// $inspect('DPM', dynamicPartMap)
// $inspect('DAREALVALUE', value)
// $inspect('SHIZE', size)
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
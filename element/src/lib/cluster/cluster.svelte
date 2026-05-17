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
    ElementInstance,
    SveadminComponent,
  } from '$lib/types.js'

  import {
    dataParser,
    mergeProperties,
    wrapOnEvent,
    wrapOnFocus,
  } from '$lib/helper/index.js'

  import {
    createComponentStore,
    defaultComponents,
  } from '$lib/component/index.js'

  import type {
    ComponentButton,
  } from '$lib/button/index.js'

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
    copyButton,
  } from './config/index.js'

  import {
    attachComponents,
    defaultJoiner,
    defaultSplitter,
    prepareExpandChildrenConfig,
    prepareValidatorParser,
    prepareValueParser,
  } from './helper/index.js'

  import './cluster.css'

  import * as translations from './translation/index.js'

  i18n.addMultipleLocales(translations)

  let {
    areErrorsVisible = true,
    childrenConfig = {},
    componentConfig = {},
    components = $bindable(defaultComponents),
    data,
    error,
    id = $bindable('cluster-' + Math.random().toString(36).substring(2, 6)),
    instance = $bindable({ref: undefined}),
    isClearButtonEnabled = false,
    isCopyButtonEnabled = false,
    isValidationPerformedOnLoad = false,
    joiner = defaultJoiner,
    mask = $bindable(),
    maskPartReducer: maskPartReducerReceived,
    onBlur: onBlurReceived,
    onFocus: onFocusReceived,
    size,
    splitter = defaultSplitter,
    validators = createFieldValidator([]),
    value = $bindable([]),
    ...passthrough
  } : ClusterDisplayProps = $props()

  export const validate : () => IsValid = () => {
    return validators.validate(valueHelper.value)
  }

  $effect(() => {
    if (!Array.isArray(mask)) {
      mask = [mask ?? '']
    }
  })

  let dynamicPartMap: {[key: number] : number} = $state({}),
    lastError: IsValid = $state({valid: true}),
    localClasses: string[] = $state([]),
    nestedValidators: {[key: number] : ValidatorStore} = $state({}),
    inFocus = $state({value: false}),
    initialized: boolean = $state(false),
    valueHelper = createValueHelperStore(value)

  const validatorParser = prepareValidatorParser(nestedValidators),
    valueParser = prepareValueParser(valueHelper),
    clear = prepareClear(valueHelper, dynamicPartMap),
    copy = prepareCopy(valueHelper)

  let nestedErrors: ValidatorStore[] = $derived.by(() => {
      return Object.values(nestedValidators).filter((validator: ValidatorStore) => !validator.result.valid)
    }),
    valueGuard : any = $state()

  const onBlur = wrapOnEvent(onBlurReceived, prepareOnBlur(inFocus))
  const onFocus = wrapOnFocus(onFocusReceived, prepareOnFocus(inFocus))

  const clearButtonComponent : ComponentButton = clearButton(
    mergeProperties(
      {
        onClick: clear,
        size
      },
      childrenConfig?.clear
    )
  )
  const copyButtonComponent : ComponentButton = copyButton(
    mergeProperties(
      {
        onClick: copy,
        size
      },
      childrenConfig?.copy
    )
  )

  let expandChildrenConfig = $derived(prepareExpandChildrenConfig(
    childrenConfig,
    componentConfig,
    {
      ...passthrough,
      id,
      onBlur,
      onFocus,
      size
    }
  ))

  let instances : ElementInstance[] = $state([])

  let dataParsed: {[key: string] : string} = $derived(dataParser(data)),
    maskParsed : SveadminComponent<any>[] = $state([]),
    maskPartReducer : ((
      aggregator: SveadminComponent<any>[],
      currentPart: SveadminComponent<any> | string
    ) => SveadminComponent<any>[]) | undefined = $state(maskPartReducerReceived)

  async function loadMaskPartReducer() {
    maskPartReducer = await prepareMaskPartReducer()
  }

  $effect(() => {
    if (!maskPartReducer
      || !Array.isArray(mask)
    ) {
      return
    }
    const newMask = mask.reduce(maskPartReducer, [])
      .map(expandChildrenConfig)
      .map(validatorParser)
      .map(attachComponents)
    if (isClearButtonEnabled) {
      newMask.push(clearButtonComponent)
    }

    if (isCopyButtonEnabled) {
      newMask.push(copyButtonComponent)
    }
    

    if (JSON.stringify(maskParsed) !== JSON.stringify(newMask)) {
      maskParsed = newMask
    }
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
    maskParsed.map((currentConfig, index) => {
        instances[index] = instances[index]
          ?? currentConfig?.input?.config?.instance
          ?? {ref: undefined}
        return currentConfig
      })
  })

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
      dynamicPartMap = maskParsed.reduce(valueParser, dynamicPartMap)
      valueGuard = value
    }
  })

  $effect(() => {
    dynamicPartMap = maskParsed.reduce(valueParser, dynamicPartMap)
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

  $effect(() => {
    const inputMapped = instance.ref as HTMLInputElement | undefined
    if (inputMapped
      && !inputMapped.form) {
      console.warn(`Cluster '${inputMapped.id}' is not wrapped in a form. Focus changes default handlers require the cluster to be in a form.`)
    }
  })

  if (!maskPartReducerReceived) {
    loadMaskPartReducer()
  }

// $inspect('MASK', mask)
// $inspect('NIPIUT LENGTH', inputLength)
// $inspect('mp', maskParsed)
// $inspect('comps', components)
// $inspect('CC', componentConfig, components.get('input'))
// $inspect('INSTA', instance, instances[0])
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
  {@const componentDefaultConfig = components.getConfig(componentType)}
  {#if Component}
    {@const config = maskPiece?.display?.config ?? maskPiece?.input?.config /* This may not be enough to pick the right config */}
    {#if instances[index]}
      <Component {...mergeProperties(
          config,
          {
            class: localClasses
          },
          componentDefaultConfig,
        )}
        bind:instance={instances[index]}
        validators={nestedValidators[index]}
        bind:value={valueHelper.display![index]} />
    {/if}
  {:else}
    Component type not mapped: {componentType}
  {/if}
{/each}
<input {...dataParsed} {id} bind:this={instance.ref} type="hidden" {value} />
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
<script lang="ts">
  import {
    createFieldValidator,
  } from '@sveadmin/common'

  import {
    BUTTON_LEVEL_OUTLINE,
    SIZE_MEDIUM,
  } from '$lib/types.js'

  import {
    focusPrevious,
    mergeStyles,
    normalizeArray,
    mergeProperties,
  } from '$lib/helper/index.js'

  import type {
    ComponentButton,
  } from '$lib/button/index.js';

  import {
    ImageWrapped,
  } from '$lib/image/index.js';

  import {
    TextDisplay,
  } from '$lib/text-display/index.js';

  import {
    type TextInputPartText,
  } from '$lib/text-input/index.js'

  import type {
    PasswordHelper,
    PasswordInputProps,
  } from './types.js'

  import {
    Cluster,
  } from '$lib/cluster/index.js';

  import './password.css'

  import {
    passwordHidden,
    passwordVisible,
    revealButton,
  } from './config/index.js'

  import {
    lowercaseHelper,
    maximumLengthHelper,
    minimumLengthHelper,
    numberHelper,
    specialCharacterHelper,
    uppercaseHelper,
  } from './helper/index.js'

  let {
    areErrorsVisible,
    childrenConfig = $bindable({}),
    class: classList = $bindable([]),
    cluster = Cluster,
    componentConfig,
    helper = $bindable([]),
    id = $bindable('password-' + Math.random().toString(36).substring(2, 6)),
    isLowercaseRequired = $bindable(false),
    isNumberRequired = $bindable(false),
    isPasswordHelperVisible = $bindable(true),
    isRevealed = $bindable(false),
    isSpecialCharacterRequired = $bindable(false),
    isUppercaseRequired = $bindable(false),
    maximumLength = $bindable(),
    minimumLength = $bindable(),
    value = $bindable(''),
    validators = $bindable(createFieldValidator()),
    size = SIZE_MEDIUM,
    style = $bindable([]),
    ...passthrough
  } : PasswordInputProps = $props()

  const ClusterComponent = cluster

  let localButtonClasses: string[] = $state([])

  let revealIcon = $derived.by(() => {
    return (isRevealed)
      ? 'eye-closed'
      : 'eye'
  })
  if (typeof areErrorsVisible !== 'boolean') {
    areErrorsVisible = !isPasswordHelperVisible
  }

  const addHelper = (currentHelper: PasswordHelper) => {
    helper.unshift(currentHelper)
    validators.prependValidator(currentHelper.validator)
  }

  if (minimumLength) {
    addHelper(minimumLengthHelper(minimumLength))
  }
  if (maximumLength) {
    addHelper(maximumLengthHelper(maximumLength))
  }
  if (isSpecialCharacterRequired) {
    addHelper(specialCharacterHelper())
  }
  if (isNumberRequired) {
    addHelper(numberHelper())
  }
  if (isUppercaseRequired) {
    addHelper(uppercaseHelper())
  }
  if (isLowercaseRequired) {
    addHelper(lowercaseHelper())
  }

  const reveal = (e?: Event) : boolean => {
    if (!e) {
      return false
    }
    if (e instanceof KeyboardEvent
      && e.key !== 'Enter') {
      return true
    }
    const target = e.target as HTMLInputElement
    isRevealed = !isRevealed
    focusPrevious(target)
    return true
  }

  let buttonConfig : ComponentButton = $derived(
    revealButton(
      mergeProperties(
        childrenConfig?.button,
        childrenConfig?.[1],
        componentConfig?.button?.input?.config,
        componentConfig?.[1]?.input?.config,
        {
          class: localButtonClasses,
          leftIcon: revealIcon,
          onClick: reveal
        },
      )
    )
  )

  let hiddenConfig : TextInputPartText = $derived(
    passwordHidden(
      mergeProperties(
        {
          ...passthrough,
          class: classList,
          validators
        },
        childrenConfig?.input,
        childrenConfig?.[0],
        componentConfig?.input?.input?.config,
        componentConfig?.[0]?.input?.config,
        {
          style: 'flex: 1'
        },
      )
    )
  )

  let visibleConfig : TextInputPartText = $derived(
    passwordVisible(
      mergeProperties(
        {
          ...passthrough,
          class: classList,
          validators
        },
        childrenConfig?.input,
        childrenConfig?.[0],
        componentConfig?.input?.input?.config,
        componentConfig?.[0]?.input?.config,
        {
          style: 'flex: 1'
        },
      )
    )
  )

  let passwordConfig = $derived.by(() => {
    return {
      input: (isRevealed)
        ? visibleConfig
        : hiddenConfig,
      button: buttonConfig,
    }
  })

  let mask = '$(input)$(button)'

  $effect(() => {
    const index = localButtonClasses.indexOf('error')

    if (validators.result.valid) {
      if (index !== -1) {
        localButtonClasses.splice(index, 1)
      }
      return
    }
    if (index === -1) {
      localButtonClasses.push('error')
    }
  })

  $effect(() => {
    helper.map(requirement => {
      requirement.result = requirement.validator(value)
    })
  })

// $inspect(helper.map(h => h.result), value, validators)
$inspect('PW CC', passwordConfig, childrenConfig)
// $inspect('PW valid', validators)

</script>

<ClusterComponent {areErrorsVisible}
  {childrenConfig}
  componentConfig={passwordConfig}
  {id}
  {mask}
  {size}
  bind:value={value} />
{#if isPasswordHelperVisible}
  <passwordhelper>
    {#each helper as requirement}
      <TextDisplay {size}
        style={mergeStyles(
          style,
          (requirement?.result?.valid) ? '' : 'color: rgb(var(--error-color))'
        )} >
        <ImageWrapped icon={(requirement?.result?.valid) ? 'check' : 'xmark'} {size} /> {requirement.tooltip}
      </TextDisplay>
    {/each}
  </passwordhelper>
{/if}
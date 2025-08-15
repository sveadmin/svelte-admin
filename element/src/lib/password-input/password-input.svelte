<script lang="ts">
  import {
    createFieldValidator,
    hasLowercaseValidator,
    hasUppercaseValidator,
    i18n,
    longerThanOrEqualValidator,
    regexValidator,
    shorterThanOrEqualValidator,
  } from '@sveadmin/common'

  import type {
    IsValid,
    ValidatorFunction,
  } from '@sveadmin/common'

  import {
    SIZE_MEDIUM,
  } from '$lib/types.js'

  import {
    normalizeArray,
    focusPrevious,
  } from '$lib/helper/index.js'

  import type {
    ButtonInputProps,
  } from '$lib/button/index.js';

  import {
     ImageWrapped,
  } from '$lib/image/index.js';

  import {
    type TextInputPartText,
  } from '$lib/text-input/index.js'

  import type {
    PasswordInputProps,
  } from './types.js'

  import {
    InputCluster,
  } from '$lib/input-cluster/index.js';

  import './password.css'

  import * as translations from './translation/index.js'

  i18n.addMultipleLocales(translations)

  let {
    class: classList = $bindable([]),
    isLowercaseRequired = $bindable(true),
    isNumberRequired = $bindable(true),
    isPasswordHelperVisible = $bindable(true),
    isRevealed = $bindable(false),
    isSpecialCharacterRequired = $bindable(true),
    isUppercaseRequired = $bindable(true),
    maximumLength = $bindable(),
    minimumLength = $bindable(8),
    value = $bindable(''),
    validators = $bindable(createFieldValidator()),
    size = SIZE_MEDIUM,
    ...passthrough
  } : PasswordInputProps = $props()

  let classes: string[] = $derived(normalizeArray(classList, ' ')),
    derivedButtonClasses: string[] = $state([]),
    localButtonClasses: string[] = $state(['inputBorder']),
    helper: Array<{tooltip: string; validator: ValidatorFunction; result?: IsValid}> = $state([])

  $effect(() => {
    derivedButtonClasses = classes.concat(localButtonClasses)
  })

  let revealIcon = $derived.by(() => {
    return (isRevealed)
      ? 'eye-closed'
      : 'eye'
  })

  if (minimumLength) {
    const minimumLengthHelper = {
      tooltip: i18n.t('minimumLengthHelper', {length: minimumLength}),
      validator: longerThanOrEqualValidator({base: minimumLength}),
    }
    helper.unshift(minimumLengthHelper)
    validators.prependValidator(minimumLengthHelper.validator)
  }
  if (maximumLength) {
    const maximumLengthHelper = {
      tooltip: i18n.t('maximumLengthHelper', {length: maximumLength}),
      validator: shorterThanOrEqualValidator({base: maximumLength}),
    }
    helper.unshift(maximumLengthHelper)
    validators.prependValidator(maximumLengthHelper.validator)
  }
  if (isSpecialCharacterRequired) {
    const specialCharacterHelper = {
      tooltip: i18n.t('specialCharacterHelper'),
      validator: regexValidator({pattern: /[\!\"\#\$\%\&\'\(\)\*\+\,-\.\/\:\;\<\=\>\?\@\[\\\]\^\_\`\{\|\}\~]+/}),
    }
    helper.unshift(specialCharacterHelper)
    validators.prependValidator(specialCharacterHelper.validator)
  }
  if (isNumberRequired) {
    const numberHelper = {
      tooltip: i18n.t('numberHelper'),
      validator: regexValidator({pattern: /[0-9]+/}),
    }
    helper.unshift(numberHelper)
    validators.prependValidator(numberHelper.validator)
  }
  if (isUppercaseRequired) {
    const uppercaseHelper = {
      tooltip: i18n.t('uppercaseHelper'),
      validator: hasUppercaseValidator(),
    }
    helper.unshift(uppercaseHelper)
    validators.prependValidator(uppercaseHelper.validator)
  }
  if (isLowercaseRequired) {
    const lowercaseHelper = {
      tooltip: i18n.t('lowercaseHelper'),
      validator: hasLowercaseValidator(),
    }
    helper.unshift(lowercaseHelper)
    validators.prependValidator(lowercaseHelper.validator)
  }

  const reveal = (e: Event) => {
    if (e instanceof KeyboardEvent
      && e.key !== 'Enter') {
      return
    }
    const target = e.target as HTMLInputElement
    isRevealed = !isRevealed
    focusPrevious(target)
  }

  let buttonConfig : ButtonInputProps = $derived({
      childrenStyle: ((!size || size === SIZE_MEDIUM) ? 'font-size:1.125em' : 'font-size:1.15em'),
      class: derivedButtonClasses,
      isAttachedOnLeft: true,
      leftIcon: revealIcon,
      onClick: reveal,
      type: 'button',
    }
  )

  let hiddenConfig : TextInputPartText = $derived({
      ...passthrough,
      isAttachedOnRight: true,
      class: classes,
      type: 'password',
      validators
    }
  )

  let reveleadConfig : TextInputPartText = $derived({
      ...passthrough,
      isAttachedOnRight: true,
      class: classes,
      type: 'text',
      validators
    }
  )

  let mask = $derived.by(() => {
    const mask = []
    mask.push((isRevealed)
      ? reveleadConfig
      : hiddenConfig)
    mask.push(buttonConfig)
    return mask
  })

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
</script>

<InputCluster areErrorsVisible={!isPasswordHelperVisible}
  {mask}
  {size}
  bind:value={value} />
{#if isPasswordHelperVisible}
  <passwordhelper>
    {#each helper as requirement}
      <svealiteral data-size={size} style={(requirement?.result?.valid) ? '' : 'color: rgb(var(--error-color))'} >
        <ImageWrapped icon={(requirement?.result?.valid) ? 'check' : 'xmark'} {size} /> {requirement.tooltip}
      </svealiteral>
    {/each}
  </passwordhelper>
{/if}
<script lang="ts">
  import {
    createFieldValidator,
    validDateValidator,
    greaterThanValidator,
    lessThanValidator,
  } from '@sveadmin/common'

  import {
    TEXT_INPUT_TYPE_NUMBER,
  } from '$lib/types.js'

  import {
    TEXT_DISPLAY_TYPE_LITERAL,
  } from '$lib/literal/types.js'

  import {
    InputCluster,
  } from '$lib/input-cluster/index.js'

  import type {
    InputClusterParts,
  } from '$lib/input-cluster/index.js'

  import CreditCard from './credit-card.ts.svelte'

  const mask1: InputClusterParts[] = [
    'test',
    {
      editor: {
        validators: createFieldValidator([greaterThanValidator({base: 2000})]),
        visibleWidth: '3rem',
      },
      type: TEXT_INPUT_TYPE_NUMBER,
    },
    {
      editor: {
        borderless: true
      },
      type: TEXT_DISPLAY_TYPE_LITERAL,
      value: '-'
    },
    {
      editor: {
        validators: createFieldValidator([greaterThanValidator({base: 0}), lessThanValidator({base: 13})]),
        visibleWidth: '2rem',
      },
      type: TEXT_INPUT_TYPE_NUMBER,
    },
    {
      editor: {
        borderless: true
      },
      type: TEXT_DISPLAY_TYPE_LITERAL,
      value: '-'
    },
    {
      editor: {
        validators: createFieldValidator([greaterThanValidator({base: 0}), lessThanValidator({base: 32})]),
        visibleWidth: '2rem',
      },
      type: TEXT_INPUT_TYPE_NUMBER,
    }
  ]

  let boundValue = $state([2020, 1])
  let validatorValues = $derived.by(() => {
    return {
      year: boundValue[0],
      month: boundValue[1],
      day: boundValue[2],
    }
  })
  let valueFallback = $derived.by(() => {
    if (!Number.isInteger(boundValue[0])
      || !Number.isInteger(boundValue[1])
      || !Number.isInteger(boundValue[2])) {
      return null
    }
    const constructedDate: Date = new Date(boundValue[0], boundValue[1] - 1, boundValue[2])

    return constructedDate
  })


  const dateValidator = createFieldValidator([validDateValidator({get datePartValidator () {return validatorValues}, get valueFallback () {return valueFallback}})])
  const validationJoiner = () => {
    if (!Number.isInteger(boundValue[0])
      || !Number.isInteger(boundValue[1])
      || !Number.isInteger(boundValue[2])) {
      return null
    }
    const constructedDate: Date = new Date(boundValue[0], boundValue[1] - 1, boundValue[2])

    return constructedDate
  }

</script>

<CreditCard />

<InputCluster
  mask={mask1}
  validators={dateValidator}
  bind:value={boundValue} />
{JSON.stringify(boundValue)}
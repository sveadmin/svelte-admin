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

  const mask1: InputClusterParts[] = [
    'test',
    {
      editor: {
        validators: createFieldValidator([greaterThanValidator(2000)]),
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
        validators: createFieldValidator([greaterThanValidator(0), lessThanValidator(13)]),
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
        validators: createFieldValidator([greaterThanValidator(0), lessThanValidator(32)]),
        visibleWidth: '2rem',
      },
      type: TEXT_INPUT_TYPE_NUMBER,
    }
  ]

  let boundValue = $state([2020, 1])
  const dateValidator = createFieldValidator([validDateValidator()])
  const validationJoiner = () => {
    if (!Number.isInteger(boundValue[0])
      || !Number.isInteger(boundValue[1])
      || !Number.isInteger(boundValue[2])) {
      return null
    }
    const constructedDate: Date = new Date(boundValue[0], boundValue[1] - 1, boundValue[2] - 1)

console.log(constructedDate, constructedDate.getUTCDay())

    if (!(constructedDate instanceof Date)
      || constructedDate.getDay() !== boundValue[2]) {
      return null
    }

    return constructedDate
  }

</script>

<InputCluster
  mask={mask1}
  {validationJoiner}
  validators={dateValidator}
  bind:value={boundValue} />
{JSON.stringify(boundValue)}
<script lang="ts">
  import {
    onMount,
  } from 'svelte'

  import {
    createFieldValidator,
    ValidatorStore,
  } from '@sveadmin/common'

  import {
    DropdownSearch,
    NumberInput
  } from '../main.js'

  import {
    Option
  } from '../dropdown-search/types.js'

  export let currencies: Array<Option>,
    currencyId: string,
    decimals: number = 2,
    digits: number = 7,
    getValue: {() : string | number} = null,
    id: string = 'currency-input',
    thousandSeparator: number = 3,
    validators: ValidatorStore = createFieldValidator([]), //To be able to read the errros supply an empty validator
    value: string | number

  const updateCurrency = (event: CustomEvent<string | null>) => {
    currencyId = event.detail
  }

  onMount(() => {
    if (typeof getValue === 'function') {
      value = getValue()
    }
  })
</script>
<currencyinput>
  <NumberInput
    {id}
    bind:value={value}
    {digits}
    {decimals}
    {thousandSeparator}
    {validators} />
  <DropdownSearch
    bind:value={currencyId}
    values={currencies}
    on:valueChanged={updateCurrency}
    displayMode="label" />
</currencyinput>

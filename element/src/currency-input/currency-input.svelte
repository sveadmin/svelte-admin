<script lang="ts">
  import {
    createFieldValidator,
    ValidatorStore,
  } from '@sveadmin/common'

  import {
    DropdownSearch,
    NumberInput
  } from '../main'

  import {
    Option
  } from '../dropdown-search/types'

  export let currencies: Array<Option>,
    currencyId: string,
    decimals: number = 2,
    digits: number = 7,
    id: string = 'currency-input',
    thousandSeparator: number = 3,
    validators: ValidatorStore = createFieldValidator([]), //To be able to read the errros supply an empty validator
    value: string | number

  const updateCurrency = (event: CustomEvent<string | null>) => {
    currencyId = event.detail
  }
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

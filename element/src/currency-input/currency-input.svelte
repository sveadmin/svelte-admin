<script lang="ts">
  import {
    DropDownSearch,
    NumberInput
  } from '../'

  export let id, value = '', digits = 7, decimals = 2, thousandSeparator = 3,
        currencyId, currencies, validators = {}

  const updateCurrency = event => {
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
  <DropDownSearch
    bind:value={currencyId}
    values={currencies}
    on:valueChanged={updateCurrency}
    displayMode="label" />
</currencyinput>

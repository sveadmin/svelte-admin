<script lang="ts">
  import {
    Button,
  } from '$lib/button/index.js'

  import {
    GridLine,
  } from '$lib/grid/index.js'

  let isButtonDisabled = $state(false)

  let icon = $derived((isButtonDisabled) ? 'plus-circle-solid' : 'minus-circle')

  const {
    onClick
  } = $props()
</script>

<GridLine>
  <span class="grid-span-4">Control button disabled state</span>
  <span class="grid-span-4">
    <Button label="This is a button which can be disables" {onClick} bind:isDisabled={isButtonDisabled} />
  </span>
  <span class="grid-span-4">
    <Button leftIcon={icon} onClick={() => isButtonDisabled = !isButtonDisabled} />
  </span>
</GridLine>
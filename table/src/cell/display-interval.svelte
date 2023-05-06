<script>
  import { createEventDispatcher } from 'svelte'
  import { DisplayInterval } from '../../block'
  const dispatch = createEventDispatcher();

  export let value = '', prefix = '', postfix = '', secondsDenominator = 1, isHighlighted = false

  const onClicked = (event) => {
    dispatch('click', event)
  }
</script>
<datacellcontent>
  <DisplayInterval
    {isHighlighted}
    {onClicked}
    {prefix}
    {postfix}
    {secondsDenominator}
    {value}
     />
</datacellcontent>
<script lang="ts">
  import { createEventDispatcher } from 'svelte'
  import { IntervalDisplay } from '@sveadmin/element'
  const dispatch = createEventDispatcher();

  export let isHighlighted: boolean = false,
    prefix: string = '',
    postfix: string = '',
    secondsDenominator: number = 1,
    value: string = ''

  const onClick = (event: CustomEvent<EventTarget>) => {
    dispatch('click', event.detail)
  }
</script>
<sveadatacellcontent>
  <IntervalDisplay
    {isHighlighted}
    {prefix}
    {postfix}
    {secondsDenominator}
    {value}
    on:click={onClick} />
</sveadatacellcontent>
<script lang="ts">
  import {
    createEventDispatcher,
    onMount,
  } from 'svelte'

  import {
    prepareTouch,
  } from './event/index.js'

  import {
    FlexDefinition,
  } from '@sveadmin/common'

  import {
    prepareSetLower,
    prepareSetUpper,
  } from './action/index.js'

  import {
    getBoundaryStore,
  } from './store.js'

  import {
    BoundaryStore,
    BOUNDARY_LOWER,
    BOUNDARY_UPPER,
    RangeInputOrientation,
    RANGE_INPUT_EVENT_SET_LOWER,
    RANGE_INPUT_EVENT_SET_UPPER,
    RANGE_INPUT_ORIENTATION_HORIZONTAL,
  } from './types.js'


  export let orientation: RangeInputOrientation = RANGE_INPUT_ORIENTATION_HORIZONTAL,
    steps: number,
    stepSizes: FlexDefinition[]= []

  const boundaries : BoundaryStore = getBoundaryStore({
    [BOUNDARY_LOWER]: 0,
    [BOUNDARY_UPPER]: steps - 1}
  )

  const dispatch = createEventDispatcher(),
    setLower = prepareSetLower(boundaries, dispatch),
    setUpper = prepareSetUpper(boundaries, dispatch)

  onMount(() => {
    dispatch(RANGE_INPUT_EVENT_SET_LOWER, $boundaries[BOUNDARY_LOWER])
    dispatch(RANGE_INPUT_EVENT_SET_UPPER, $boundaries[BOUNDARY_UPPER])
  })


  const {start: handleTouchStart, end: handleTouchEnd, move: handleTouchMove} = prepareTouch({boundaries, dispatch})
  const {start: handleTouchStartUpper, end: handleTouchEndUpper, move: handleTouchMoveUpper} = prepareTouch({boundaries, click: setUpper, dispatch})
  const {start: handleTouchStartLower, end: handleTouchEndLower, move: handleTouchMoveLower} = prepareTouch({boundaries, click: setLower, dispatch})

</script>

<svearangeinputcontainer class={orientation}>
  {#each Array(steps) as _, index}
    <svearangeinputblock
      class={orientation}
      class:in={index > $boundaries[BOUNDARY_LOWER] && index < $boundaries[BOUNDARY_UPPER]}
      class:minBoundary={index == $boundaries[BOUNDARY_LOWER]}
      class:maxBoundary={index == $boundaries[BOUNDARY_UPPER]}
      data-lowerboundary={index == $boundaries[BOUNDARY_LOWER]}
      data-upperboundary={index == $boundaries[BOUNDARY_UPPER]}
      data-index={index}
      on:touchend={handleTouchEnd}
      on:touchmove={handleTouchMove}
      on:touchstart={handleTouchStart}
      style={`flex-basis:${stepSizes && stepSizes[index] && stepSizes[index].base || 2}rem;flex-grow:${stepSizes && stepSizes[index] && stepSizes[index].grow || 0}rem;flex-shrink:${stepSizes && stepSizes[index] && stepSizes[index].shrink || 0}rem;`}>
      {#if index <= $boundaries[BOUNDARY_UPPER] && index != $boundaries[BOUNDARY_LOWER]}
        <sveagridinputtarget class={orientation}
          data-lowerboundary={true}
          data-index={index}
          on:click={setLower}
          on:touchend={handleTouchEndLower}
          on:touchmove={handleTouchMoveLower}
          on:touchstart={handleTouchStartLower} >
            {`>`}
          </sveagridinputtarget>
      {/if}
      {#if index >= $boundaries[BOUNDARY_LOWER] && index != $boundaries[BOUNDARY_UPPER]}
        <sveagridinputtarget class={orientation}
          data-upperboundary={true}
          data-index={index}
          on:click={setUpper}
          on:touchend={handleTouchEndUpper}
          on:touchmove={handleTouchMoveUpper}
          on:touchstart={handleTouchStartUpper} >
          {`<`}
        </sveagridinputtarget>
      {/if}
    </svearangeinputblock>
  {/each}
</svearangeinputcontainer>

<style global src="./range-input.css"></style>
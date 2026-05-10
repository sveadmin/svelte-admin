<script lang="ts">
  import {
    COMPONENT_BUTTON,
  } from '$lib/button/index.js'

  import {
    ClusterWrapped,
  } from '$lib/cluster/index.js'

  import {
    GridContainer,
    GridLine,
  } from '$lib/grid/index.js'

  import {
    COMPONENT_TEXT_INPUT,
  } from '$lib/text-input/index.js'

  const possibleClasses = ['first', 'second', 'third'],
    possibleColors = ['red', 'green', 'blue']

  let selectedColor = $state(0)

  let inputClass = $derived(possibleClasses[selectedColor]),
    inputStyle = $derived('border-color:' + possibleColors[selectedColor])

  const changeColor = () => {
    selectedColor++
    if (selectedColor >= possibleColors.length) {
      selectedColor = 0
    }
  }

  let configParsed = $derived({
    'button': {
      input: {
        config: {
          label: 'Change',
          onClick: changeColor,
        }
      },
      type: COMPONENT_BUTTON
    },
    'input': {
      input: {
        config: {
          class: inputClass,
          style: inputStyle
        }
      },
      type: COMPONENT_TEXT_INPUT
    },
  })
</script>

<GridContainer>
  <GridLine>
    <span class="grid-span-4">
      Classes and styles passed as properties and changed from local
    </span>
    <ClusterWrapped componentConfig={configParsed}
      class="grid-span-8" 
      mask="$(input)$(button)"/>
  </GridLine>
</GridContainer>

<style>
  :global(input.first) {
    background-color          : antiquewhite;
  }
  :global(input.second) {
    background-color          : beige;
  }
  :global(input.third) {
    background-color          : cornsilk;
  }
</style>
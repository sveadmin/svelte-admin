<script lang="ts">
  import {
    Accordion,
  } from '$lib/accordion/index.js'
  import {
    GridContainer,
    GridLine,
  } from '$lib/grid/index.js'
  import './accordion-classes.css'
</script>

<GridContainer>
  <GridLine style="align-items: flex-start;">
    <Accordion titleClass="accordionTestRed" class="grid-span-6">
        Red title
    </Accordion>
    <Accordion childrenConfig={{0: {class: "accordionTestRed"}}} class="grid-span-6">
        Red title via childrenConfig
    </Accordion>

  </GridLine>
</GridContainer>
<GridContainer>
  <GridLine style="align-items: flex-start;">
    <Accordion contentClass="accordionTestGreen" controlClass="accordionTestBlue" titleClass="accordionTestRed" class="grid-span-6">
        Red title, green content
    </Accordion>
    <Accordion childrenConfig={{0: {class: 'accordionTestRed'}, 1: {class: 'accordionTestBlue'}, 2: {class: 'accordionTestGreen'}}} class="grid-span-6">
        Red title, green content via childrenConfig
    </Accordion>

  </GridLine>
</GridContainer>
<Accordion childrenConfig={{0: {class: 'accordionTestRed'}, 1: {class: 'accordionTestBlue'}, 2: {class: 'accordionTestGreen'}}}
  contentClass="accordionTestLarge"
  controlClass="accordionTestLarge"
  titleClass="accordionTestLarge"
  class="grid-span-6">
  The different ways of defining classes get merged
</Accordion>

<GridContainer>
  <GridLine style="align-items: flex-start;">
    <Accordion contentStyle="background-color: rgba(0, 255, 0, .3)" controlStyle="background-color: rgba(0, 0, 255, .3)" titleStyle="background-color: rgba(255, 0, 0, .3)" class="grid-span-6">
        Red title, green content with styles
    </Accordion>
    <Accordion childrenConfig={{0: {style: 'background-color: rgba(255, 0, 0, .3)'}, 1:{style: 'background-color: rgba(0, 0, 255, .3)'}, 2: {style: 'background-color: rgba(0, 255, 0, .3)'}}} class="grid-span-6">
        Red title, green content with styles via childrenConfig
    </Accordion>

  </GridLine>
</GridContainer>
<Accordion childrenConfig={{0: {style: 'background-color: rgba(255, 0, 0, .3)'}, 1:{style: 'background-color: rgba(0, 0, 255, .3)'}, 2: {style: 'background-color: rgba(0, 255, 0, .3)'}}}
  contentStyle="background-color: rgba(0, 0, 0, .3)"
  controlStyle="background-color: rgba(0, 0, 0, .3)"
  titleStyle="background-color: rgba(0, 0, 0, .3)"
  class="grid-span-6" >
  Styles of the same property use the one defined in childrenConfig
</Accordion>
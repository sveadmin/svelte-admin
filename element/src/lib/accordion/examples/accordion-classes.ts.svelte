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
    <Accordion headerClass="accordionTestRed" class="grid-span-4">
        Red header
    </Accordion>
    <Accordion childrenConfig={{0: {class: "accordionTestRed"}}} class="grid-span-4">
        Red header via childrenConfig
    </Accordion>
    <Accordion childrenConfig={{header: {class: "accordionTestRed"}}} class="grid-span-4">
        Red header via named childrenConfig
    </Accordion>
  </GridLine>
</GridContainer>
<GridContainer>
  <GridLine style="align-items: flex-start;">
    <Accordion class="grid-span-4" title="This is yellow" titleClass="accordionTestYellow">
        Yellow title
    </Accordion>
    <Accordion childrenConfig={{1: {class: "accordionTestYellow"}}} class="grid-span-4" title="This is yellow">
        Yellow title via childrenConfig
    </Accordion>
    <Accordion childrenConfig={{title: {class: "accordionTestYellow"}}} class="grid-span-4" title="This is yellow">
        Yellow title via named childrenConfig
    </Accordion>

  </GridLine>
</GridContainer>
<GridContainer>
  <GridLine style="align-items: flex-start;">
    <Accordion class="grid-span-4"
      contentClass="accordionTestGreen"
      controlClass="accordionTestBlue"
      headerClass="accordionTestRed"
      title="This is yellow"
      titleClass="accordionTestYellow" >
        Using all possible class definitions
    </Accordion>
    <Accordion childrenConfig={{0: {class: 'accordionTestRed'}, 1: {class: 'accordionTestYellow'}, 2: {class: 'accordionTestBlue'}, 3: {class: 'accordionTestGreen'}}}
      class="grid-span-4"
      title="This is Yellow">
        Setting all the classes via childrenConfig
    </Accordion>
    <Accordion childrenConfig={{header: {class: 'accordionTestRed'}, title: {class: 'accordionTestYellow'}, control: {class: 'accordionTestBlue'}, content: {class: 'accordionTestGreen'}}}
      class="grid-span-4"
      title="This is Yellow">
        Setting all the classes via named childrenConfig
    </Accordion>

  </GridLine>
</GridContainer>
<Accordion childrenConfig={{0: {class: 'accordionTestRed'}, 1: {class: 'accordionTestYellow'}, 2: {class: 'accordionTestBlue'}, 3: {class: 'accordionTestGreen'}}}
  class="grid-span-6"
  contentClass="accordionTestLarge"
  controlClass="accordionTestLarge"
  headerClass="accordionTestLarge"
  title="This is yellow"
  titleClass="accordionTestLarge" >
  The different ways of defining classes get merged
</Accordion>

<GridContainer>
  <GridLine style="align-items: flex-start;">
    <Accordion contentStyle="background-color: rgba(0, 255, 0, .3)" controlStyle="background-color: rgba(0, 0, 255, .3)" headerStyle="background-color: rgba(255, 0, 0, .3)" class="grid-span-4">
        Red header, green content with styles
    </Accordion>
    <Accordion childrenConfig={{0: {style: 'background-color: rgba(255, 0, 0, .3)'}, 2:{style: 'background-color: rgba(0, 0, 255, .3)'}, 3: {style: 'background-color: rgba(0, 255, 0, .3)'}}} class="grid-span-4">
        Red title, green content with styles via childrenConfig (transparent colors)
    </Accordion>
    <Accordion childrenConfig={{header: {style: 'background-color: rgba(255, 0, 0, .3)'}, control:{style: 'background-color: rgba(0, 0, 255, .3)'}, content: {style: 'background-color: rgba(0, 255, 0, .3)'}}} class="grid-span-4">
        Red title, green content with styles via named childrenConfig (transparent colors)
    </Accordion>
  </GridLine>
</GridContainer>
<Accordion childrenConfig={{0: {style: 'background-color: rgba(255, 0, 0, .3)'}, 2:{style: 'background-color: rgba(0, 0, 255, .3)'}, 3: {style: 'background-color: rgba(0, 255, 0, .3)'}}}
  contentStyle="background-color: rgba(0, 0, 0, .3)"
  controlStyle="background-color: rgba(0, 0, 0, .3)"
  headerStyle="background-color: rgba(0, 0, 0, .3)"
  class="grid-span-6" >
  Styles of the same property use the one defined in childrenConfig (transparent)
</Accordion>
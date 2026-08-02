<script lang="ts">
  import {
    Accordion,
  } from '$lib/accordion/index.js'
  import {
    GridContainer,
    GridLine,
  } from '$lib/grid/index.js'
</script>

<GridContainer>
  <GridLine style="align-items: flex-start;">
    <Accordion class="grid-span-3" title="Left column">
      This a short intro on the left side.
    </Accordion>
    <Accordion class="grid-span-6" title="Middle with large text">
      Maecenas a magna tellus. In iaculis arcu eros, a venenatis velit lobortis nec. Nulla vel imperdiet tellus. Aliquam erat volutpat. Quisque malesuada pharetra ex. Donec nibh tellus, accumsan a malesuada eu, dapibus vitae quam. Vivamus pellentesque ligula id tortor egestas volutpat. Phasellus vitae pellentesque augue. Sed sollicitudin mauris nec sapien fringilla vestibulum.

      Curabitur venenatis, urna in condimentum pulvinar, orci nisi euismod urna, eu volutpat felis sapien eget nisl. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Praesent tincidunt ante tortor, eu suscipit metus iaculis vel. Duis mollis elit ut egestas luctus. Donec nisl lorem, interdum at ligula ac, pharetra pretium lectus. Mauris dictum ut leo eget imperdiet. Nullam cursus enim at neque tempus, vitae posuere dolor tempor. Duis in magna eu lectus pellentesque luctus. Phasellus et scelerisque elit, et fermentum purus. Nunc massa dui, finibus vulputate finibus eu, vehicula vel lectus. Phasellus vestibulum odio vitae turpis fermentum gravida. Curabitur vehicula maximus imperdiet. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.

      Sed non egestas elit. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. In vestibulum justo ut posuere placerat. Integer eu dolor a justo facilisis euismod. Ut quis erat non turpis scelerisque venenatis. Phasellus ut facilisis sem, nec condimentum eros. Fusce fringilla orci sit amet euismod lacinia.

      Phasellus et nisi sit amet mauris tempor sollicitudin. Proin mattis purus metus, quis elementum sem interdum id. Nullam consectetur consequat enim, vel gravida purus aliquam iaculis. Pellentesque accumsan feugiat enim, sed ultrices enim mattis vitae. Nullam accumsan mi egestas, vehicula urna quis, pellentesque mauris. In hac habitasse platea dictumst. Duis vel tincidunt magna, in molestie elit. Duis eu leo sem. Donec sollicitudin est nisi, et placerat sem pretium sed. Aliquam ut dignissim ligula, nec lobortis ex. Etiam bibendum condimentum felis vitae condimentum. Maecenas vitae nisi finibus, eleifend risus eu, pharetra est.

      Cras odio eros, tincidunt et libero quis, laoreet fermentum justo. Nam risus dolor, dapibus iaculis feugiat eget, gravida non magna. Sed eget finibus dui. Duis vel vehicula sapien. Etiam a malesuada mauris, et commodo libero. Praesent in consectetur diam. Praesent pulvinar, turpis sed scelerisque ultrices, odio nisl vulputate neque, vitae rutrum urna ligula sit amet libero. Donec accumsan vehicula nulla, interdum iaculis justo vulputate a.
    </Accordion>
    <Accordion class="grid-span-3" title="Right column">
      Something related to the content in the middle
    </Accordion>
  </GridLine>
</GridContainer>

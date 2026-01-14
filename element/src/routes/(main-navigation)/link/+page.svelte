<script lang="ts">

  import {
    GridContainer,
    GridLine,
  } from '$lib/grid/index.js'

  import {
    Image,
  } from '$lib/image/index.js'

  import {
    Link,
  } from '$lib/link/index.js'

  import {
    Tag,
  } from '$lib/tag/index.js'

  import logoVector from './assets/logo.svg'
  import logoGoogle from './assets/google.svg'
</script>

<GridContainer>
  <GridLine>
    <span class="grid-span-4">Simple links</span>
    <span class="grid-span-4">
      <Link baseUrl="https://www.google.com" style="background-color: antiquewhite;" target="_blank" value="Test"/>
    </span>
    <span class="grid-span-4">
      <Link baseUrl="/grid" style="background-color: antiquewhite;" value="Local Test"/>
    </span>
  </GridLine>
  <GridLine>
    <span class="grid-span-4">Simple links expanding to available space</span>
    <Link baseUrl="https://www.google.com" class="grid-span-4" style="background-color: antiquewhite;" target="_blank" value="Test"/>
    <Link baseUrl="/grid" class="grid-span-4" style="background-color: antiquewhite;" value="Local Test"/>
  </GridLine>
  <GridLine>
    <span class="grid-span-4">Image links</span>
    <span class="grid-span-4">
      <Link baseUrl="https://www.google.com" target="_blank" value="Test">
        <Image src={logoGoogle} visibleHeight="1em" />
      </Link>
    </span>
    <span class="grid-span-4">
      <Link baseUrl="/grid" value="Local Test">
        <Image src={logoVector} visibleHeight="1em" />
      </Link>
    </span>
  </GridLine>
  <GridLine>
    <span class="grid-span-4">Tag links</span>
    <span class="grid-span-4">
      <Link baseUrl="https://www.google.com" target="_blank" value="Test">
        <Tag value="External link" />
      </Link>
    </span>
    <span class="grid-span-4">
      <Link baseUrl="/grid" value="Local Test">
        <Tag>Internal link</Tag>
      </Link>
    </span>
  </GridLine>
</GridContainer>
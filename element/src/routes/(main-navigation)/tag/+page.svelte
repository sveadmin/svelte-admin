<script lang="ts">
  import {
    SIZE_EXTRA_LARGE,
    SIZE_LARGE,
    SIZE_SMALL,
  } from '$lib/types.js'

  import type {
    ButtonInputProps,
  } from '$lib/button/index.js'

  import {
    GridContainer,
    GridLine,
  } from '$lib/grid/index.js'

  import {
    Tag,
  } from '$lib/tag/index.js'

  const buttonConfig : ButtonInputProps = {
    icon: 'share-android-solid'

  }
  const buttonConfig2 : ButtonInputProps[] = [
    {
      icon: 'share-android-solid'
    },
    {
      icon: 'xmark'
    },
  ]
</script>

<GridContainer>
  <GridLine>
    <span class="grid-span-4">Simple list of tags</span>
    <span class="grid-span-8">
      <Tag value="123456789.987654" />
      <Tag>This is via children</Tag>
      <Tag icon="trash-solid" value="123456789.987654" />
      <Tag action={buttonConfig} value="Action button" />
    </span>
  </GridLine>
  <GridLine>
    <span class="grid-span-4">Simple list of small tags</span>
    <span class="grid-span-8">
      <Tag size={SIZE_SMALL} value="123456789.987654" />
      <Tag size={SIZE_SMALL}>This is via children</Tag>
      <Tag icon="download-circle" size={SIZE_SMALL} value="123456789.987654" />
      <Tag action={buttonConfig} size={SIZE_SMALL} value="Action button" />
    </span>
  </GridLine>
  <GridLine>
    <span class="grid-span-4">Simple list of large tags</span>
    <span class="grid-span-8">
      <Tag size={SIZE_LARGE} value="123456789.987654" />
      <Tag size={SIZE_LARGE}>This is via children</Tag>
      <Tag icon="minus-square" size={SIZE_LARGE} value="123456789.987654" />
      <Tag action={buttonConfig2} size={SIZE_LARGE} value="Action button" />
    </span>
  </GridLine>
  <GridLine>
    <span class="grid-span-4">Simple list of extra large tags</span>
    <span class="grid-span-8">
      <Tag size={SIZE_EXTRA_LARGE} value="123456789.987654" />
      <Tag size={SIZE_EXTRA_LARGE}>This is via children</Tag>
      <Tag icon="help-square-solid" size={SIZE_EXTRA_LARGE} value="123456789.987654" />
      <Tag action={buttonConfig} size={SIZE_EXTRA_LARGE} value="Action button" />
    </span>
  </GridLine>
</GridContainer>
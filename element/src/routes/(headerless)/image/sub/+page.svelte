<script lang="ts">
  import {
    Image,
  } from '$lib/image/index.js'

  import type {
    SizeDefinition,
    SourceSetDefinition,
  } from '$lib/image/index.js'

  import logoRasterized from '../assets/logo.png'
  import logoRasterized240 from '../assets/logo-240.png'
  import logoRasterized480 from '../assets/logo-480.png'

  const srcset : SourceSetDefinition[] = [
    {
      src: logoRasterized,
      size: 120,
    },
    {
      src: logoRasterized240,
      size: 240,
    },
    {
      src: logoRasterized480,
      size: 480,
    },
  ]

  const sizes : Array<string | SizeDefinition> = [
    {
      attribute: 'max-width',
      condition: '120px',
      value: '100vw'
    },
    {
      attribute: 'max-width',
      condition: '240px',
      value: '80vw'
    },
    '50vw'
  ]
</script>

<Image {sizes} {srcset} src={logoRasterized}/>
<script lang="ts">
  import {
    rune,
  } from '@sveadmin/common'

  import type {
    Rune,
  } from '@sveadmin/common'

  import {
    GridContainer,
    GridLine,
  } from '$lib/grid/index.js'

  import {
    SIZE_SMALL,
    SIZE_LARGE,
    SIZE_EXTRA_LARGE,
  } from '$lib/types.js'

  import {
    InputCluster,
  } from '$lib/input-cluster/index.js'

  import type {
    InputClusterParts,
  } from '$lib/input-cluster/index.js'

  import { ipAddressTripletDividerGenerator } from './config/ip-address-triplet-divider.js'
  import { ipAddressTripletGenerator } from './config/ip-address-triplet.js'
  
  let value : string = $state(''),
    valueExtraLarge : string = $state(''),
    valueLarge : string = $state(''),
    valueSmall : string = $state('')

  const joiner = (value: any[]) : any => value.filter(v => v).join('.'),
    splitter = (value: any): any[] => value.split('.')

  const maskIp: InputClusterParts[] = [
    ipAddressTripletGenerator(true),
    ipAddressTripletDividerGenerator(),
    ipAddressTripletGenerator(),
    ipAddressTripletDividerGenerator(),
    ipAddressTripletGenerator(),
    ipAddressTripletDividerGenerator(),
    ipAddressTripletGenerator(),
  ]

  const maskIpSmall: InputClusterParts[] = [
    ipAddressTripletGenerator(true, SIZE_SMALL),
    ipAddressTripletDividerGenerator(SIZE_SMALL),
    ipAddressTripletGenerator(false, SIZE_SMALL),
    ipAddressTripletDividerGenerator(SIZE_SMALL),
    ipAddressTripletGenerator(false, SIZE_SMALL),
    ipAddressTripletDividerGenerator(SIZE_SMALL),
    ipAddressTripletGenerator(false, SIZE_SMALL),
  ]

  const maskIpLarge: InputClusterParts[] = [
    ipAddressTripletGenerator(true),
    ipAddressTripletDividerGenerator(),
    ipAddressTripletGenerator(),
    ipAddressTripletDividerGenerator(),
    ipAddressTripletGenerator(),
    ipAddressTripletDividerGenerator(),
    ipAddressTripletGenerator(),
  ]

  const maskIpExtraLarge: InputClusterParts[] = [
    ipAddressTripletGenerator(true, SIZE_EXTRA_LARGE),
    ipAddressTripletDividerGenerator(SIZE_EXTRA_LARGE),
    ipAddressTripletGenerator(false, SIZE_EXTRA_LARGE),
    ipAddressTripletDividerGenerator(SIZE_EXTRA_LARGE),
    ipAddressTripletGenerator(false, SIZE_EXTRA_LARGE),
    ipAddressTripletDividerGenerator(SIZE_EXTRA_LARGE),
    ipAddressTripletGenerator(false, SIZE_EXTRA_LARGE),
  ]
</script>


<GridContainer class="demopage-grid">
  <GridLine>
    <span class="grid-span-3">Values to copy & paste:</span>
    <span class="grid-span-2">1.1.1.1</span>
    <span class="grid-span-2">255.34.128.2</span>
    <span class="grid-span-2">111.111.330.111</span>
    <span class="grid-span-2">255.255.255.0</span>
  </GridLine>
  <GridLine>
    <span class="grid-start-4 grid-span-2">123146167189100</span>
  </GridLine>
  <form>
    <GridLine>
      <span class="grid-span-3">IP address:</span>
      <span class="grid-span-6">
          <InputCluster isCopyButtonEnabled={true}
            {joiner}
            mask={maskIp}
            {splitter}
            bind:value={value} />
      </span>
      <span>
        Value: {value}
      </span>
    </GridLine>
  </form>
  <form>
    <GridLine>
      <span class="grid-span-3">Small IP address:</span>
      <span class="grid-span-9">
          <InputCluster isCopyButtonEnabled={true}
            {joiner}
            mask={maskIpSmall}
            {splitter}
            bind:value={valueSmall} />
      </span>
    </GridLine>
  </form>
  <form>
    <GridLine>
      <span class="grid-span-3">Large IP address:</span>
      <span class="grid-span-9">
          <InputCluster isCopyButtonEnabled={true}
            {joiner}
            mask={maskIpLarge}
            size={SIZE_LARGE}
            {splitter}
            bind:value={valueLarge} />
      </span>
    </GridLine>
  </form>
  <form>
    <GridLine>
      <span class="grid-span-3">Extra large IP address (Input cluster size overwritten):</span>
      <span class="grid-span-9">
          <InputCluster isCopyButtonEnabled={true}
            {joiner}
            mask={maskIpExtraLarge}
            size={SIZE_LARGE}
            {splitter}
            bind:value={valueExtraLarge} />
      </span>
    </GridLine>
  </form>
</GridContainer>
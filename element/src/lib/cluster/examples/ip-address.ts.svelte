<script lang="ts">
  import {
    Button,
  } from '$lib/button/index.js'

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
    Cluster,
  } from '$lib/cluster/index.js'

  import type {
    ComponentTextDisplayWrapped,
  } from '$lib/text-display/index.js'

  import type {
    ComponentTextInput,
  } from '$lib/text-input/index.js'

  import { ipAddressTripletDividerGenerator } from './config/ip-address-triplet-divider.js'
  import { ipAddressTripletGenerator } from './config/ip-address-triplet.js'
  
  let value : string = $state(''),
    valueExtraLarge : string = $state(''),
    valueLarge : string = $state(''),
    valueSmall : string = $state('')

  const joiner = (value: any[]) : any => value.filter(v => v).join('.'),
    splitter = (value: any): any[] => value.split('.')

  const ipConfig: {[key: string] : ComponentTextInput | ComponentTextDisplayWrapped} = {
    ip1: ipAddressTripletGenerator(true),
    ip2: ipAddressTripletGenerator(),
    ip3: ipAddressTripletGenerator(),
    ip4: ipAddressTripletGenerator(),
    ipDivider:ipAddressTripletDividerGenerator(),
  }

  const maskIp = '$(ip1)$(ipDivider)$(ip2)$(ipDivider)$(ip3)$(ipDivider)$(ip4)'

  // const maskIpSmall: ClusterParts[] = [
  //   ipAddressTripletGenerator(true, SIZE_SMALL),
  //   ipAddressTripletDividerGenerator(SIZE_SMALL),
  //   ipAddressTripletGenerator(false, SIZE_SMALL),
  //   ipAddressTripletDividerGenerator(SIZE_SMALL),
  //   ipAddressTripletGenerator(false, SIZE_SMALL),
  //   ipAddressTripletDividerGenerator(SIZE_SMALL),
  //   ipAddressTripletGenerator(false, SIZE_SMALL),
  // ]

  // const maskIpLarge: ClusterParts[] = [
  //   ipAddressTripletGenerator(true),
  //   ipAddressTripletDividerGenerator(),
  //   ipAddressTripletGenerator(),
  //   ipAddressTripletDividerGenerator(),
  //   ipAddressTripletGenerator(),
  //   ipAddressTripletDividerGenerator(),
  //   ipAddressTripletGenerator(),
  // ]

  // const maskIpExtraLarge: ClusterParts[] = [
  //   ipAddressTripletGenerator(true, SIZE_EXTRA_LARGE),
  //   ipAddressTripletDividerGenerator(SIZE_EXTRA_LARGE),
  //   ipAddressTripletGenerator(false, SIZE_EXTRA_LARGE),
  //   ipAddressTripletDividerGenerator(SIZE_EXTRA_LARGE),
  //   ipAddressTripletGenerator(false, SIZE_EXTRA_LARGE),
  //   ipAddressTripletDividerGenerator(SIZE_EXTRA_LARGE),
  //   ipAddressTripletGenerator(false, SIZE_EXTRA_LARGE),
  // ]
</script>


<GridContainer class="demopage-grid">
  <GridLine>
    <span class="grid-span-3">Values to copy / drag:</span>
    <span class="grid-span-2">1.1.1.1<Button onClick={() => value = '1.1.1.1'} label="Set"/></span>
    <span class="grid-span-2">255.34.128.2<Button onClick={() => value = '255.34.128.2'} label="Set"/></span>
    <span class="grid-span-2">111.111.330.111<Button onClick={() => value = '111.111.330.111'} label="Set"/></span>
    <span class="grid-span-2">255.255.255.0<Button onClick={() => value = '255.255.255.0'} label="Set"/></span>
  </GridLine>
  <GridLine>
    <span class="grid-start-4 grid-span-2">123146167189100<Button onClick={() => value = '123146167189100'} label="Set"/></span>
    <span class="grid-span-2"><Button onClick={() => value = ''} label="Clear"/></span>
  </GridLine>
</GridContainer>
<GridContainer class="demopage-grid">
  <form>
    <GridLine>
      <span class="grid-span-3">IP address:</span>
      <span class="grid-span-6">
        <Cluster componentConfig={ipConfig}
          isCopyButtonEnabled={true}
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
        <Cluster componentConfig={ipConfig}
          isCopyButtonEnabled={true}
          {joiner}
          mask={maskIp}
          size={SIZE_SMALL}
          {splitter}
          bind:value={valueSmall} />
      </span>
    </GridLine>
  </form>
  <form>
    <GridLine>
      <span class="grid-span-3">Large IP address:</span>
      <span class="grid-span-9">
        <Cluster componentConfig={ipConfig}
          isCopyButtonEnabled={true}
          {joiner}
          mask={maskIp}
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
        <Cluster componentConfig={ipConfig}
          isCopyButtonEnabled={true}
          {joiner}
          mask={maskIp}
          size={SIZE_EXTRA_LARGE}
          {splitter}
          bind:value={valueExtraLarge} />
      </span>
    </GridLine>
  </form>
</GridContainer>
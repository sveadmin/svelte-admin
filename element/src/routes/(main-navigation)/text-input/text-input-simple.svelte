<script lang="ts">
  import {
    GridLine,
  } from '$lib/grid/index.js'

  import {
    SIZE_SMALL,
    SIZE_LARGE,
    SIZE_EXTRA_LARGE,
  } from '$lib/types.js'

  import {
    TextInput,
  } from '$lib/text-input/index.js'
</script>

<h2>Text input</h2>
<GridLine>
  <h3 class="grid-span-6">Simple input</h3>
  <span class="grid-span-6">
    <TextInput />
  </span>
</GridLine>
<GridLine>
  <h3 class="grid-span-6">Simple input small</h3>
  <span class="grid-span-6">
    <TextInput size={SIZE_SMALL} />
  </span>
</GridLine>
<GridLine>
  <h3 class="grid-span-6">Simple input large</h3>
  <span class="grid-span-6">
    <TextInput size={SIZE_LARGE} />
  </span>
</GridLine>
<GridLine>
  <h3 class="grid-span-6">Simple input extra large</h3>
  <span class="grid-span-6">
    <TextInput size={SIZE_EXTRA_LARGE} />
  </span>
</GridLine>
<GridLine>
  <h3 class="grid-span-6">Disabled input</h3>
  <span class="grid-span-6">
    <TextInput isDisabled={true}/>
  </span>
</GridLine>
<GridLine>
  <h3 class="grid-span-6">Exact width</h3>
  <span class="grid-span-6">
    <TextInput visibleWidth="300px"/>
  </span>
</GridLine>
<GridLine>
  <h3 class="grid-span-6">Exact width in characters - width ratio os based on letter M, which is the widest</h3>
</GridLine>
<GridLine>
  <TextInput class="grid-span-2" visibleWidth="9ch" value="MMMM-MMMM"/>
  <TextInput class="grid-span-2" visibleWidth="9ch" value="....-...."/>
  <TextInput class="grid-span-2" visibleWidth="10ch" value="0123456789"/>
  <TextInput class="grid-span-2" visibleWidth="2ch" value="00"/>
  <TextInput class="grid-span-2" visibleWidth="1.5ch" value="11"/>
</GridLine>
<GridLine>
  <h3 class="grid-span-6">Simple input with placeholder</h3>
  <TextInput class="grid-span-3" value="" placeholder="Put here anything"/>
</GridLine>
<GridLine>
  <h3 class="grid-span-6">Simple input with classes</h3>
  <TextInput class="color1 size3 grid-span-3"/>
</GridLine>
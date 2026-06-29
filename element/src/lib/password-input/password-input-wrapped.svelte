<script lang="ts">
  // @ts-ignore: This is a functioning and correct import, sometimes TS does not understand svelte files
  import PasswordInput from './password-input.svelte'

  import type {
    PasswordWrappedInputProps,
  } from './types.js'

  import {
    ClusterWrapped,
  } from '$lib/cluster/index.js';

  let {
    childrenConfig = $bindable({}),
    class: classList = $bindable(),
    size,
    style = $bindable(),
    value = $bindable(''),
    ...passthrough
  } : PasswordWrappedInputProps = $props()

  $effect(() => {
  console.log('classList', classList)
    childrenConfig.cluster = {
      class: classList,
      size,
      style
    }
  })
</script>

<PasswordInput {...passthrough}
  {childrenConfig}
  cluster={ClusterWrapped}
  bind:value={value} />

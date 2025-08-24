<script lang="ts">
  import {
    normalizeArray,
  } from '$lib/helper/index.js'

  import './text-input-placeholder.css'

  let {
    class: classList,
    id,
    isEmpty,
    inFocus,
    isHidden = $bindable(false),
    placeholder = $bindable(''),
  } = $props()

  let classes: string[] = $state(normalizeArray(classList, ' '))
</script>

<label class={classes.join(' ')}
  class:minimize={inFocus || !isEmpty || isHidden}
  for={id}
  ondragenter={() => isHidden = true} >
  {placeholder}
</label>
<script lang="ts">
  import './text-input-placeholder.css'

  let {
    id,
    inFocus,
    isEmpty,
    placeholder = $bindable(''),
  } = $props()

  $inspect(inFocus)
  $inspect(isEmpty)
</script>

<label for={id} class="inputplaceholder" class:minimize={inFocus || !isEmpty}>
  {placeholder}
</label>
<script>
  export let rowIndex, callback = function(){}, label = 'Do'

  const makeCallback = () => {
    callback(rowIndex)
  }
</script>
<rowaction on:click="{makeCallback}">{label}</rowaction>
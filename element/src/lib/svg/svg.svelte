<script lang="ts">

  export let title: string = '',
    value: string = ''

  const showPreview = (event: Event) => {
  console.log(event, event.target)
    if (event instanceof KeyboardEvent
      && event.key !== 'Enter') {
      return
    }

  }
</script>
<sveaimagecontainer on:click={showPreview} on:keyup={showPreview}>
  <object
    data='data:image/svg+xml,{value}'
    type="image/svg+xml"
    title="{title}"
    ></object>
    <sveaimagepreview class="visible" on:click|stopPropagation={showPreview} on:keyup|stopPropagation={showPreview} >
      <object
        data="data:image/svg+xml,{value}"
        type="image/svg+xml"
        title="{title}"
        ></object>
    </sveaimagepreview>
</sveaimagecontainer>

<style global src="./svg.css"></style>

<script lang="ts">
  export let span: Number = 1

</script>

<sveagrid class={`container-grid-span-${span}`}>
  <slot></slot>
</sveagrid>

<style global src="./grid-container.css"></style>
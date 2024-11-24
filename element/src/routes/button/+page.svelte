<script lang="ts">
  import {
    Button,
  } from '$lib/button/index.js'

  import {
    SIZE_SMALL,
    SIZE_LARGE,
    SIZE_EXTRA_LARGE,
  } from '$lib/types.js'

</script>

<Button label="This is a button" />

<Button icon="orthogonal-view" />

<Button icon="orthogonal-view" label="This is a button with icon"/>

<h2>Small buttons</h2>
<Button label="This is a button" size={SIZE_SMALL}/>

<Button icon="xmark-square-solid" size={SIZE_SMALL}/>

<Button icon="xmark-square-solid" label="This is a button with icon" size={SIZE_SMALL}/>

<h2>Large buttons</h2>
<Button label="This is a button" size={SIZE_LARGE}/>

<Button icon="movie" size={SIZE_LARGE}/>

<Button icon="movie" label="This is a button with icon" size={SIZE_LARGE}/>

<h2>Extra large buttons</h2>
<Button label="This is a button" size={SIZE_EXTRA_LARGE}/>

<Button icon="shop-four-tiles-window" size={SIZE_EXTRA_LARGE}/>

<Button icon="shop-four-tiles-window" label="This is a button with icon" size={SIZE_EXTRA_LARGE}/>
<script lang="ts">
  import {
    Button,
  } from '$lib/button/index.js'

  import {
    colors
  } from './colors.svelte.js'

  import type {
    ColorsStore
  } from './types.js'

  import {
    COLOR__ALTERNATE_BACKGROUND,
    COLOR__BACKGROUND,
    COLOR__ERROR,
    COLOR__INPUT_BORDER,
    COLOR__LOADER_1,
    COLOR__LOADER_2,
    COLOR__MAIN,
    COLOR__MAIN_LIGHT,
    COLOR__SECONDARY,
    COLOR__SECONDARY_LIGHT,
    COLOR__SELECTION,
    COLOR__STATUS_BEST,
    COLOR__STATUS_BETTER,
    COLOR__STATUS_GOOD,
    COLOR__STATUS_WORSE,
    COLOR__STATUS_WORST,
    COLOR__TEXT
  } from './types.js'

  let colorsStore : ColorsStore = colors

  const onChange = (e: Event) => {
    const target = e.target as HTMLInputElement

    if (colorsStore.colors[target.id]) {
      colorsStore.colors[target.id].b = target.value.slice(5, 7)
      colorsStore.colors[target.id].g = target.value.slice(3, 5)
      colorsStore.colors[target.id].r = target.value.slice(1, 3)
    }
  }

</script>

<div>
  Text color: <input id={COLOR__TEXT}
    type="color"
    value={colorsStore.colors[COLOR__TEXT]?.hex ?? '#333'}
    onchange={onChange} />
  Input border color: <input id={COLOR__INPUT_BORDER}
    type="color"
    value={colorsStore.colors[COLOR__INPUT_BORDER]?.hex ?? '#ccc'}
    onchange={onChange} />
</div>

<div style="
  --{COLOR__ALTERNATE_BACKGROUND}: {colorsStore.colors[COLOR__ALTERNATE_BACKGROUND]?.rgb};
  --{COLOR__BACKGROUND}: {colorsStore.colors[COLOR__BACKGROUND]?.rgb};
  --{COLOR__ERROR}: {colorsStore.colors[COLOR__ERROR]?.rgb};
  --{COLOR__INPUT_BORDER}: {colorsStore.colors[COLOR__INPUT_BORDER]?.rgb};
  --{COLOR__LOADER_1}: {colorsStore.colors[COLOR__LOADER_1]?.rgb};
  --{COLOR__LOADER_2}: {colorsStore.colors[COLOR__LOADER_2]?.rgb};
  --{COLOR__MAIN}: {colorsStore.colors[COLOR__MAIN]?.rgb};
  --{COLOR__MAIN_LIGHT}: {colorsStore.colors[COLOR__MAIN_LIGHT]?.rgb};
  --{COLOR__SECONDARY}: {colorsStore.colors[COLOR__SECONDARY]?.rgb};
  --{COLOR__SECONDARY_LIGHT}: {colorsStore.colors[COLOR__SECONDARY_LIGHT]?.rgb};
  --{COLOR__SELECTION}: {colorsStore.colors[COLOR__SELECTION]?.rgb};
  --{COLOR__STATUS_BEST}: {colorsStore.colors[COLOR__STATUS_BEST]?.rgb};
  --{COLOR__STATUS_BETTER}: {colorsStore.colors[COLOR__STATUS_BETTER]?.rgb};
  --{COLOR__STATUS_GOOD}: {colorsStore.colors[COLOR__STATUS_GOOD]?.rgb};
  --{COLOR__STATUS_WORSE}: {colorsStore.colors[COLOR__STATUS_WORSE]?.rgb};
  --{COLOR__STATUS_WORST}: {colorsStore.colors[COLOR__STATUS_WORST]?.rgb};
  --{COLOR__TEXT}: {colorsStore.colors[COLOR__TEXT]?.rgb};
">
  <Button label="This is a button" />
  <Button label="Disabled button" isDisabled={true} />
</div>
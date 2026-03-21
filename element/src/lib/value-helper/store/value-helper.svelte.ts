import type{
  ValueHelperStore,
} from '$lib/types.js'

export function createValueHelperStore(value?: string | number | null, key?: string): ValueHelperStore {
  if (!value) {
    value = null
  }

  key = key || value?.toString()

  const store: ValueHelperStore = $state({
    current: value,
    display: value?.toString() ?? '',
    inputFocused: false,
    key: key,
    original: key,
    suggestionSelectionInProgress: false,
    value: value ?? null,
  })

  return store
}
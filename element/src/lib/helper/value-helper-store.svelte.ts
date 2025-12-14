import type{
  ValueHelperStore,
} from '$lib/types.js'

export function createValueHelperStore(value?: string | number | null): ValueHelperStore {
  if (!value) {
    value = null
  }
  const store: ValueHelperStore = $state({
    current: value,
    display: '',
    inputFocused: false,
    original: value,
    suggestionSelectionInProgress: false,
    value: value ?? null,
  })

  return store
}
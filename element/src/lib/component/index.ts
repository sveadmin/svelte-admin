import { createComponentStore } from './store/component.svelte.js'

export {
  createComponentStore,
}

export const defaultComponents = createComponentStore()

export * from './types.js'
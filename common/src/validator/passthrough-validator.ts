import { readable } from 'svelte/store';

export const passthroughValidator = {
  validity: readable(
    {
      valid: true
    }
  ),
  validate: () => true
}
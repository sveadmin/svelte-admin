import { Spring } from 'svelte/motion';

import type { ShakeOptions, Shaker } from './types.js';

export const shake = function(
  baseValue: number = 0,
  maxValue: number = .4,
  options: ShakeOptions = {stiffness: .5, damping: .25, delay: 30}
): Shaker {
  const springAnimation = new Spring(baseValue , {
    stiffness: options.stiffness,
    damping: options.damping
  });

  return {
    shake: (newValue = maxValue) => {
      springAnimation.target = newValue
      setTimeout(() => springAnimation.target = baseValue, options.delay)
    },
    get current() { return springAnimation.current },
    get target() { return springAnimation.target }
  }
}
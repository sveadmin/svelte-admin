import { spring } from 'svelte/motion';

import type { ShakeOptions, Shaker } from './types.js';

export const shake = function(
  baseValue: number = .4,
  maxValue: number = 0,
  options: ShakeOptions = {stiffness: .1, damping: .25, delay: 20}
): Shaker {
  const springAnimation = spring(baseValue , {
    stiffness: options.stiffness,
    damping: options.damping
  });

  return {
    shake: (new_value = maxValue, opts = {}) => {
      springAnimation.set.apply(this, [new_value, opts]);
      setTimeout(() => springAnimation.set.apply(this, [baseValue, opts]), options.delay);
    },
    ...springAnimation
  }
}

// export const shake = function(baseValue, maxValue, options = {stiffnes: .1, damping: .25, delay: 20}) {
//   const shaker = spring(baseValue , {
//     stiffness: options.stiffness,
//     damping: options.damping
//   });
//   const set = shaker.set;
//   shaker.shake = (new_value = maxValue, opts = {}) => {
//     set.apply(this, [new_value, opts]);
//     setTimeout(() => set.apply(this, [baseValue, opts]), options.delay);
//   }
//   return shaker;
// }
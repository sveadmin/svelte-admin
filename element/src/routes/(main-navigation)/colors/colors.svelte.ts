import type {
  Color,
  Colors,
  ColorStore,
  ColorsStore,
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

function colorStore(r: number, g: number, b: number) : ColorStore {
  let raw: Color = {
    b,
    g,
    r,
  }
  const store: Color = $state(raw)

  const setColor = (key: string, value: string | number) => {
    if (typeof value !== 'number') {
      value = parseInt(value, 16)
    }

    if (key === 'r'
      || key === 'g'
      || key === 'b'
    ) {
      store[key] = value
    }
  }

  const hex = () => {
    let bhex = store.b.toString(16)
    let ghex = store.g.toString(16)
    let rhex = store.r.toString(16)

    bhex = '0'.slice(0, 2 - bhex.length) + bhex
    ghex = '0'.slice(0, 2 - ghex.length) + ghex
    rhex = '0'.slice(0, 2 - rhex.length) + rhex

    return `#${rhex}${ghex}${bhex}`
  }

  return {
    get b(): number { return store.b},
    get g(): number { return store.g},
    get hex(): string { return hex()},
    get r(): number { return store.r},
    get rgb(): string { return `${store.r}, ${store.g}, ${store.b}`},
    set b(value: string | number) {setColor('b', value)},
    set g(value: string | number) {setColor('g', value)},
    set r(value: string | number) {setColor('r', value)},
  }
}

function instantiate(): ColorsStore {
  let colors: Colors = {
    [COLOR__ALTERNATE_BACKGROUND]: colorStore(238, 238, 238),
    [COLOR__BACKGROUND]: colorStore(255, 255, 255),
    [COLOR__ERROR]: colorStore(255, 0, 0),
    [COLOR__INPUT_BORDER]: colorStore(204, 204, 204),
    [COLOR__LOADER_1]: colorStore(219, 140, 40),
    [COLOR__LOADER_2]: colorStore(251, 246, 159),
    [COLOR__MAIN]: colorStore(48, 164, 220),
    [COLOR__MAIN_LIGHT]: colorStore(185, 232, 255),
    [COLOR__SECONDARY]: colorStore(253, 207, 12),
    [COLOR__SECONDARY_LIGHT]: colorStore(245, 238, 145),
    [COLOR__SELECTION]: colorStore(0, 0, 0),
    [COLOR__STATUS_BEST]: colorStore(197, 255, 185),
    [COLOR__STATUS_BETTER]: colorStore(185, 232, 255),
    [COLOR__STATUS_GOOD]: colorStore(204, 204, 204),
    [COLOR__STATUS_WORSE]: colorStore(245, 238, 145),
    [COLOR__STATUS_WORST]: colorStore(255, 0, 0),
    [COLOR__TEXT]: colorStore(51, 51, 51),
  }
  const store: {colors: Colors} = $state({colors})

  return store
}

export const colors = instantiate()
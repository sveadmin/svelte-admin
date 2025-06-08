/**
 * Check this out for inline editor: https://github.com/umaranis/svelte-code-editor/tree/main
 */

export const tutorialPages = [
  {
    id: 'accordion',
    label: 'Accordion',
    order: 0,
    route: '/accordion',
  },
  {
    id: 'button',
    label: 'Button',
    order: 3,
    route: '/button',
  },
  {
    id: 'checkbox-switch',
    label: 'Checkbox switch',
    order: 5,
    route: '/checkbox-switch',
  },
  {
    id: 'colors',
    label: 'Colors',
    order: 100,
    route: '/colors',
  },
  {
    id: 'currency-display',
    label: 'Currency Display',
    order: 12,
    parents: ['text-display'],
    route: '/currency-display',
  },
  {
    id: 'date-display',
    label: 'Date display',
    order: 14,
    parents: ['text-display'],
    route: '/date-display',
  },
  {
    id: 'date-interval-display',
    label: 'Date interval display',
    order: 15,
    parents: ['text-display'],
    route: '/date-interval-display',
  },
  {
    id: 'dropdown-search',
    label: 'Dropdown Search',
    order: 6,
    route: '/dropdown-search',
  },
  {
    id: 'grid',
    label: 'Grid',
    order: 1,
    route: '/grid',
  },
  {
    id: 'image',
    label: 'Image',
    order: 2,
    route: '/image',
  },
  {
    id: 'input',
    label: 'Input',
    order: 29,
    parents: ['text-input'],
    route: '/input',
  },
  {
    id: 'input-cluster',
    label: 'Input Cluster',
    order: 29,
    parents: ['input'],
    route: '/input-cluster',
  },
  {
    id: 'link',
    label: 'Link',
    order: 4,
    route: '/link',
  },
  {
    id: 'number-display',
    label: 'Number Display',
    order: 11,
    parents: ['text-display'],
    route: '/number-display',
  },
  {
    id: 'text-display',
    label: 'Text Display',
    order: 10,
    route: '/text-display',
  },
  {
    id: 'text-input',
    label: 'Text Input',
    order: 20,
    parents: ['text-display'],
    route: '/text-input',
  },
  {
    id: 'unit-display',
    label: 'Unit Display',
    order: 13,
    parents: ['text-display'],
    route: '/unit-display',
  },
]
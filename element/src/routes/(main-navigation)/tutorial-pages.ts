/**
 * Check this out for inline editor: https://github.com/umaranis/svelte-code-editor/tree/main
 */
// 🟢🔵🟡🟠🔴

/**
 * Current refactoring steps
 * - Update type definitions to match the new format
 * - Update childrenConfig handling
 * - Move from pages to the examples folder
 */
export const tutorialPages = [
  {
    id: 'accordion',
    label: '🟢✅ Accordion',
    order: 0,
    route: '/accordion',
  },
  {
    id: 'button',
    label: '🟢✅ Button',
    order: 3,
    route: '/button',
    todo: 'What happens when a Snippet is sent as label?'
  },
  {
    id: 'checkbox',
    label: '🟢✅ Checkbox',
    order: 5,
    parents: ['button', 'checkbox-switch', 'image'],
    route: '/checkbox',
  },
  {
    id: 'checkbox-switch',
    label: '🟢✅ Checkbox switch',
    order: 5,
    route: '/checkbox-switch',
    todo: 'Is it worth to split all possible components into wrapped and non-wrapped? In Checkboxes case Wrapped seems to be the only one needed.'
  },
  {
    id: 'colors',
    label: '🟠 Colors',
    order: 100,
    route: '/colors',
    todo: 'Build a meaningful demo page'
  },
  {
    id: 'country-selector',
    label: '🟡✅ Country selector',
    order: 32,
    route: '/country-selector',
    todo: 'Sometimes the flag only ignores isValueCleared.' +
      ' Padding issue on nested cluster' + 
      'Cluster within culster and the inline clear button has to be working properly'
  },
  {
    id: 'cluster',
    label: '🟡✅ Cluster',
    order: 29,
    parents: ['input'],
    route: '/cluster',
    todo: 'Drag and dropping and copy paste validations to correctly trigger.' +
      'Cluster wrapped nice error message' + 
      'Passing components through the component prop, not the type property' + 
      'Dropdown sizing issues' + 
      'Nested errors to properly bubble up to the main validator'
  },
  {
    id: 'currency-display',
    label: '🟢✅ Currency Display',
    order: 12,
    parents: ['text-display'],
    route: '/currency-display',
  },
  {
    id: 'currency-input',
    label: '🟠✅ Currency Input',
    order: 30,
    parents: ['text-input', 'dropdown-search', 'cluster'],
    route: '/currency-input',
    todo: 'Make it nice and handy'
  },
  {
    id: 'date-display',
    label: '🟢✅ Date display',
    order: 14,
    parents: ['text-display'],
    route: '/date-display',
  },
  {
    id: 'date-interval-display',
    label: '🔴 Date interval display',
    order: 15,
    parents: ['text-display'],
    route: '/date-interval-display',
  },
  {
    id: 'date-range',
    label: '🔴 Date range',
    order: 16,
    parents: ['text-display', 'date-display'],
    route: '/date-range',
  },
  {
    id: 'date-selector',
    label: '🔴 Date selector',
    order: 17,
    parents: ['text-display', 'date-display', 'date-range'],
    route: '/date-selector',
  },
  {
    id: 'dropdown',
    label: '🟢✅ Dropdown',
    order: 7,
    route: '/dropdown',
    todo: 'Not to scroll to the last element on init',
  },
  {
    id: 'dropdown-multi',
    label: '🔴 Dropdown Multi',
    order: 8,
    route: '/dropdown-multi',
  },
  {
    id: 'dropdown-search',
    label: '🟢✅ Dropdown Search',
    order: 6,
    route: '/dropdown-search',
    todo: 'Check if anything can be done to not replace the text-input on redraw. Causes issues with form tests' +
      'Dropdown at the bottom of the page needs to handle opening upwards (Date Dropdwon on exmaple page)' +
      'Clear button in dropdown does not inheriot focus' + 
      'Adapt visibleWidth to apply to the container, and rely on flex for the internal sizing (CC demo page with monthe selector)'
  },
  {
    id: 'editor',
    label: '🔴 Editor',
    order: 50,
    route: '/editor',
  },
  {
    id: 'form',
    label: '🟡 Form',
    order: 39,
    route: '/form',
  },
  {
    id: 'grid',
    label: '🟢✅ Grid',
    order: 1,
    route: '/grid',
  },
  {
    id: 'image',
    label: '🟢 Image',
    order: 2,
    route: '/image',
    todo: 'ImageWrapped childern prioperties are not used for preview properly -> udpated, new property layout is set in types, but not udpated in file'
  },
  {
    id: 'input',
    label: '🟢✅ Input',
    order: 29,
    parents: ['text-input'],
    route: '/input',
  },
  {
    id: 'json',
    label: '🔴 JSON',
    order: 8,
    route: '/json',
  },
  {
    id: 'link',
    label: '🟡 Link',
    order: 4,
    route: '/link',
    todo: 'There are no examples / tests for routeGenerator'
  },
  {
    id: 'literal',
    label: '🟢✅ Literal',
    order: 1,
    route: '/literal',
  },
  {
    id: 'loader',
    label: '🔴 Loader',
    order: 90,
    route: '/loader',
  },
  {
    id: 'locale-selector',
    label: '🔴 Locale selector',
    order: 33,
    route: '/locale-selector',
  },
  {
    id: 'number-display',
    label: '🟢✅ Number Display',
    order: 11,
    parents: ['text-display'],
    route: '/number-display',
  },
  {
    id: 'number-input',
    label: '🟡✅ Number Input',
    order: 11,
    parents: ['text-display'],
    route: '/number-input',
    todo: 'Number wrapped, range inputs are a bit off on attaching' +
      'Roboto mono results in one pixel higher inputs than the text input' + 
      'visibleWidth is applied to all input parts instead of only the container, bit it may by okay if not CLusterWrapped is used'
  },
  {
    id: 'phone-prefix-selector',
    label: '🟡 Phone Prefix Selector',
    order: 36,
    parents: ['coutry-selector'],
    route: '/phone-prefix-selector',
    todo: 'Seaching for 36 does not return the value with +36'
  },
  {
    id: 'password',
    label: '🟡✅ Password Input',
    order: 31,
    parents: ['input', 'cluster'],
    route: '/password',
  },
  {
    id: 'range-input',
    label: '🔴 Range Input',
    order: 34,
    parents: ['number-input', 'cluster'],
    route: '/range-input',
  },
  {
    id: 'slider',
    label: '🔴 Slider',
    order: 35,
    parents: [],
    route: '/slider',
  },
  {
    id: 'tag',
    label: '🟡 Tag',
    order: 9,
    parents: ['number-input', 'cluster'],
    route: '/tag',
  },
  {
    id: 'text-display',
    label: '🟢✅ Text Display',
    order: 10,
    route: '/text-display',
  },
  {
    id: 'text-input',
    label: '🟢✅ Text Input',
    order: 20,
    parents: ['text-display'],
    route: '/text-input',
    todo: 'Wrapped and unwrapeed text inputs are misaliogned (bound placehodler example) -> how to treat gap whenb the error is not visible'
  },
  {
    id: 'unit-display',
    label: '🟢 Unit Display',
    order: 13,
    parents: ['text-display'],
    route: '/unit-display',
  },
]
// @vitest-environment jsdom
import { describe, expect, it, test } from 'vitest'
import { render, fireEvent, screen } from '@testing-library/svelte'
import { userEvent } from '@testing-library/user-event'

import {
  prepareMaskPartReducer,
} from '$lib/literal/index.js'

import {
  CountrySelector,
} from '../index.js'

describe('Country selector componenent tests', () => {
  test.only('Simple search', async () => {
    const maskPartReducer = await prepareMaskPartReducer()
    const user = userEvent.setup()
      render(CountrySelector, {
        childrenConfig: {
          dropdown: {
            childrenConfig: {
              input: {
                childrenConfig:{
                  field: {
                    data: {
                      testid: 'input'
                    }
                  }
                },
                maskPartReducer
              }
            }
          }
        }
      })

    let input = screen.getByTestId('input') as HTMLInputElement

    await user.click(input)

    let options = screen.queryAllByRole('option')
    expect(options.length).toBe(11)
    expect(options[0].dataset.id).toBe('af') //No filtering
    expect(options[10].innerHTML).toMatch('Clear value') //Clear value added at the end, when flags are added in dev mode an empty HTML comment appears after the string

    await user.keyboard('d')
    options = screen.queryAllByRole('option')
    expect(options.length).toBe(11)
    expect(options[0].dataset.id).toBe('kp')
    expect(options[10].innerHTML).toMatch('Clear value') //Clear value added at the end, when flags are added in dev mode an empty HTML comment appears after the string
    
    await user.keyboard('e')
    options = screen.queryAllByRole('option')
    expect(options.length).toBe(11)
    expect(options[0].dataset.id).toBe('de')
    expect(options[10].innerHTML).toMatch('Clear value') //Clear value added at the end, when flags are added in dev mode an empty HTML comment appears after the string

    await user.keyboard('n')
    options = screen.queryAllByRole('option')
    expect(options.length).toBe(3)
    expect(options[0].dataset.id).toBe('dk')
    expect(options[1].dataset.id).toBe('se')
    expect(options[2].innerHTML).toMatch('Clear value') //Clear value added at the end, when flags are added in dev mode an empty HTML comment appears after the string

    await user.click(options[1]) //Select second option
    options = screen.queryAllByRole('option')
    expect(options.length).toBe(0)

    input = screen.getByTestId('input') as HTMLInputElement //Due to the change of the Dropdown value, the input element is recreated
    expect(input.value).toBe('Sweden')

    await user.click(input) //Clicking back restores the entered value
    expect(input.value).toBe('den')

    await user.keyboard('[ArrowDown][Enter]') //Triggering clear value
    input = screen.getByTestId('input') as HTMLInputElement //Due to the change of the Dropdown value, the input element is recreated
    expect(input.value).toBe('')
  });

  test('Dropdownsearch with preset value', async () => {
    const user = userEvent.setup()
    const maskPartReducer = await prepareMaskPartReducer()
    render(CountrySelector, {
      childrenConfig: {
        dropdown: {
          childrenConfig: {
            input: {
              childrenConfig:{
                field: {
                  data: {
                    testid: 'input'
                  }
                }
              },
              maskPartReducer
            }
          }
        }
      },
      value: 'DE',
    })

    let input = screen.getByTestId('input') as HTMLInputElement
    expect(input.value).toBe('Germany')
    
    await user.click(input)
    expect(input.value).toBe('DE')
    let options = screen.queryAllByRole('option')
    expect(options.length).toBe(11)
    expect(options[0].dataset.id).toBe('de') 
    expect(options[1].dataset.id).toBe('kp') 
    expect(options[10].innerHTML).toMatch('Clear value') //Clear value added at the end, when flags are added in dev mode an empty HTML comment appears after the string

  })

  test('Dropdownsearch with keyboard navigation', async () => {
    const user = userEvent.setup()
    const maskPartReducer = await prepareMaskPartReducer()
    render(CountrySelector, {
      childrenConfig: {
        dropdown: {
          childrenConfig: {
            input: {
              childrenConfig:{
                field: {
                  data: {
                    testid: 'input'
                  }
                }
              },
              maskPartReducer
            }
          }
        }
      },
    })

    let input = screen.getByTestId('input') as HTMLInputElement

    await user.click(input)
    await user.keyboard('[ArrowDown][ArrowDown][ArrowDown][ArrowDown][Enter]')
    input = screen.getByTestId('input') as HTMLInputElement //Due to the change of the Dropdown value, the input element is recreated
    expect(input.value).toBe('American Samoa')

    await user.click(input)
    let options = screen.queryAllByRole('option')
    expect(options.length).toBe(11)
    expect(options[0].dataset.id).toBe('as')
    expect(options[1].dataset.id).toBe('sh-ac')
    expect(options[10].innerHTML).toMatch('Clear value') //Clear value added at the end, when flags are added in dev mode an empty HTML comment appears after the string

    await user.keyboard('[ArrowUp][ArrowUp][Escape]')
    expect(input.value).toBe('American Samoa')

    await user.click(input)
    await user.keyboard('[ArrowUp][ArrowUp][Enter]')
    input = screen.getByTestId('input') as HTMLInputElement //Due to the change of the Dropdown value, the input element is recreated
    expect(input.value).toBe('Madagascar')

    await user.click(input)
    await user.keyboard('[ArrowUp][ArrowUp][Tab]')  //Tabbing out REVERTS value to the original, dropdown does not trigger new input element
    expect(input.value).toBe('Madagascar')

    await user.click(input)
    await user.clear(input)
    await user.keyboard('se[Tab]')  //Entering a filter and tabbing REVERTS value to the original, dropdown does not trigger new input element
    expect(input.value).toBe('Madagascar')

    await user.click(input)
    options = screen.queryAllByRole('option')
    await user.click(options[options.length - 1]) //Clear value
    input = screen.getByTestId('input') as HTMLInputElement //Due to the change of the Dropdown value, the input element is recreated
    expect(input.value).toBe('')

    await user.click(input)
    expect(input.value).toBe('') //Clear value needs to clear the current value as well
    await user.keyboard('[ArrowUp][ArrowUp][Tab]')  //Tabbing REVERTS value to empty
    expect(input.value).toBe('')

    await user.click(input)
    await user.keyboard('se[Tab]')  //Tabbing out on empty values sets the value to the top most suggestion
    input = screen.getByTestId('input') as HTMLInputElement //Due to the change of the Dropdown value, the input element is recreated
    expect(input.value).toBe('Sweden')

    await user.keyboard('{Shift>}[Tab]{/Shift}')
    expect(input.value).toBe('se') //Tabbing back in the input

    await user.keyboard('{Shift>}[Tab]{/Shift}')
    expect(input.value).toBe('Sweden') //Tabbing out to the previous element, value is unchanged
    
    await user.click(input)
    await user.clear(input)
    await user.keyboard('werwerwer[Tab]')
    expect(input.value).toBe('Sweden')

    await user.click(input)
    await user.clear(input)
    await user.keyboard('werwerwer[Enter]')  		//Using Enter forces the new value even if there was one set before
    input = screen.getByTestId('input') as HTMLInputElement //Due to the change of the Dropdown value, the input element is recreated
    expect(input.value).toBe('[werwerwer]')		  //[NEW] is missing as new value is not allowed in this dropdown

    await user.click(input)
    expect(input.value).toBe('werwerwer')
    options = screen.queryAllByRole('option')
    await user.click(options[options.length - 1]) //Clear value
    input = screen.getByTestId('input') as HTMLInputElement //Due to the change of the Dropdown value, the input element is recreated
    expect(input.value).toBe('')

    await user.click(input)
    await user.keyboard('werwerwer[Tab]')  	//Tabbing out with invalid value when there is no value already interprets it as new value
    input = screen.getByTestId('input') as HTMLInputElement //Due to the change of the Dropdown value, the input element is recreated
    expect(input.value).toBe('[werwerwer]')	//[NEW] is missing as new value is not allowed in this dropdown

    await user.click(input) 
    expect(input.value).toBe('werwerwer')
    await user.clear(input)
    await user.keyboard('asdasdasd[Tab]')  		//Tabbing out with invalid value when there is a value PRESERVES value
    expect(input.value).toBe('[werwerwer]')  	//[NEW] is missing as new value is not allowed in this dropdown

    await user.click(input) 
    await user.clear(input)
    await user.keyboard('asdasdasd[Enter]')  	//Enter forces the new value
    input = screen.getByTestId('input') as HTMLInputElement //Due to the change of the Dropdown value, the input element is recreated
    expect(input.value).toBe('[asdasdasd]')  	//[NEW] is missing as new value is not allowed in this dropdown
  });
})

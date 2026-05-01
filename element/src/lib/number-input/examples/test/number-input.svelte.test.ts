import { tick } from 'svelte'
import { describe, expect, it } from 'vitest'
import { render, fireEvent, getByRole, screen, within } from '@testing-library/svelte'
import { userEvent } from '@testing-library/user-event'

import {
  prepareMaskPartReducer,
} from '$lib/literal/index.js'

import {
  NumberInput,
} from '$lib/number-input/index.js'

import NumberWithCluster from '../number-with-cluster.ts.svelte'
import NumberValidators from '../number-validators.ts.svelte'


describe('Test value parser', () => {
  it('Basic interactions with the cluster example', async () => {
    const user = userEvent.setup()
    const maskPartReducer = await prepareMaskPartReducer()
    render(NumberWithCluster, {maskPartReducer})

    const inputContainer = screen.getByTestId('number-input') as HTMLInputElement
    const digit = inputContainer.querySelector('[data-index="0"]') as HTMLInputElement
    const fraction = inputContainer.querySelector('[data-index="2"]') as HTMLInputElement
    const valueElement = screen.getByTestId('number-value')
    const clearElement = screen.getByTestId('clear-value')

    expect(digit.value).toBe('123')
    expect(fraction.value).toBe('45')
    expect(valueElement.innerHTML).toBe('Value: 123.45')

    await user.click(clearElement)
    expect(digit.value).toBe('')
    expect(fraction.value).toBe('')
    expect(valueElement.innerHTML).toBe('Value: ')

    await user.click(digit)
    await user.keyboard('987')
    expect(digit.value).toBe('987')
    expect(valueElement.innerHTML).toBe('Value: 987')

    await user.click(fraction)
    await user.keyboard('65')
    expect(fraction.value).toBe('65')
    expect(valueElement.innerHTML).toBe('Value: 987.65')

  })
  it('Default decimal separator', async () => {
    const user = userEvent.setup()
    const maskPartReducer = await prepareMaskPartReducer()
    const form = document.createElement('form')
    document.body.appendChild(form)

    const { container } = render(
      NumberInput,
      {
        childrenConfig: {
          digit: {
            data: {testid: 'digit-input'}
          },
          fraction: {
            data: {testid: 'fraction-input'}
          }
        },
        data: {
          testid: 'number-input-cluster'
        },
        fractionDigits: 3,
        id: 'test-input',
        isIncorrectDecimalSeparatorAllowed: false,
        maskPartReducer
      },
      {
        baseElement: form // Focus changes only work if the cluster is wrapped in a form
      }
    )

    const inputContainer = screen.getByTestId('number-input-cluster') as HTMLInputElement
    const digit = screen.getByTestId('digit-input') as HTMLInputElement
    const fraction = screen.getByTestId('fraction-input') as HTMLInputElement
    const valueInput = container.querySelector('#test-input') as HTMLInputElement

    await user.click(digit)
    await user.keyboard('98,7')
    expect(digit.value).toBe('98')
    expect(fraction.value).toBe('7')
    expect(inputContainer.value).toBe('98,7')
    expect(valueInput.value).toBe('98,7')

    await user.keyboard('.65')
    expect(digit.value).toBe('98')
    expect(fraction.value).toBe('765')
    expect(inputContainer.value).toBe('98,765')
    expect(valueInput.value).toBe('98,765')

    await user.keyboard('[Backspace][Backspace][Backspace][Backspace][Backspace]') // Fourth backspace only sumps to the previous form element
    expect(digit.value).toBe('9')
    expect(fraction.value).toBe('')
    expect(inputContainer.value).toBe('9')
    expect(valueInput.value).toBe('9')
  })
  it('Decimal separator set to .', async () => {
    const user = userEvent.setup()
    const maskPartReducer = await prepareMaskPartReducer()
    const form = document.createElement('form')
    document.body.appendChild(form)

    const { container } = render(
      NumberInput,
      {
        childrenConfig: {
          digit: {
            data: {testid: 'digit-input'}
          },
          fraction: {
            data: {testid: 'fraction-input'}
          }
        },
        data: {
          testid: 'number-input-cluster'
        },
        decimalSeparator: ".",
        fractionDigits: 3,
        id: 'test-input',
        isIncorrectDecimalSeparatorAllowed: false,
        maskPartReducer
      },
      {
        baseElement: form // Focus changes only work if the cluster is wrapped in a form
      }
    )

    const inputContainer = screen.getByTestId('number-input-cluster') as HTMLInputElement
    const digit = screen.getByTestId('digit-input') as HTMLInputElement
    const fraction = screen.getByTestId('fraction-input') as HTMLInputElement
    const valueInput = container.querySelector('#test-input') as HTMLInputElement

    await user.click(digit)
    await user.keyboard('98,7')
    expect(digit.value).toBe('987')
    expect(inputContainer.value).toBe('987')
    expect(valueInput.value).toBe('987')

    await user.keyboard('.65')
    expect(digit.value).toBe('987')
    expect(fraction.value).toBe('65')
    expect(inputContainer.value).toBe('987.65')
    expect(valueInput.value).toBe('987.65')

    await user.keyboard('[Backspace][Backspace][Backspace][Backspace]') // Third backspace only sumps to the previous form element
    expect(digit.value).toBe('98')
    expect(fraction.value).toBe('')
    expect(inputContainer.value).toBe('98')
    expect(valueInput.value).toBe('98')
  })
  it('Accept both . and , as decimal separator', async () => {
    const user = userEvent.setup()
    const maskPartReducer = await prepareMaskPartReducer()
    const form = document.createElement('form')
    document.body.appendChild(form)

    const { container } = render(
      NumberInput,
      {
        childrenConfig: {
          digit: {
            data: {testid: 'digit-input'}
          },
          fraction: {
            data: {testid: 'fraction-input'}
          }
        },
        data: {
          testid: 'number-input-cluster'
        },
        fractionDigits: 3,
        id: 'test-input',
        maskPartReducer
      },
      {
        baseElement: form // Focus changes only work if the cluster is wrapped in a form
      }
    )

    const inputContainer = screen.getByTestId('number-input-cluster') as HTMLInputElement
    const digit = screen.getByTestId('digit-input') as HTMLInputElement
    const fraction = screen.getByTestId('fraction-input') as HTMLInputElement
    const valueInput = container.querySelector('#test-input') as HTMLInputElement

    await user.click(digit)
    await user.keyboard('98.7')
    expect(digit.value).toBe('98')
    expect(fraction.value).toBe('7')
    expect(inputContainer.value).toBe('98,7')
    expect(valueInput.value).toBe('98,7')

    await user.keyboard('[Backspace][Backspace][Backspace]') // Second backspace only sumps to the previous form element
    await user.keyboard('76,543')
    expect(digit.value).toBe('976')
    expect(fraction.value).toBe('543')
    expect(inputContainer.value).toBe('976,543')
    expect(valueInput.value).toBe('976,543')
  })
  it('Number validators', async () => {
    const user = userEvent.setup()
    const maskPartReducer = await prepareMaskPartReducer()
    render(NumberValidators, {maskPartReducer})

    const simpleInputContainer = screen.getByTestId('simple-container') as HTMLInputElement
    const simpleInput = simpleInputContainer.querySelector('[data-index="0"]')as HTMLInputElement
    const simpleInputValue = screen.getByTestId('number-input') as HTMLInputElement

    const inputClusterContainer = screen.getByTestId('cluster-container') as HTMLInputElement
    const digit = inputClusterContainer.querySelector('[data-index="0"]') as HTMLInputElement
    const fraction = inputClusterContainer.querySelector('[data-index="2"]') as HTMLInputElement
    const inputClusterValue = screen.getByTestId('number-input-cluster') as HTMLInputElement
    
    const lowerLimitContainer = screen.getByTestId('lower-limit-container') as HTMLInputElement
    const lowerLimit = lowerLimitContainer.querySelector('[data-index="0"]')as HTMLInputElement
    const lowerLimitValue = screen.getByTestId('lower-limit') as HTMLInputElement

    const upperLimitContainer = screen.getByTestId('upper-limit-container') as HTMLInputElement
    const upperLimit = upperLimitContainer.querySelector('[data-index="0"]')as HTMLInputElement
    const upperLimitValue = screen.getByTestId('upper-limit') as HTMLInputElement

    expect(simpleInputValue.value).toBe('0')
    expect(simpleInput.value).toBe('0')
    
    expect(inputClusterValue.value).toBe('0')
    expect(digit.value).toBe('0')
    expect(fraction.value).toBe('')

    expect(lowerLimitValue.value).toBe('0')
    expect(lowerLimit.value).toBe('0')

    expect(upperLimitValue.value).toBe('10')
    expect(upperLimit.value).toBe('10')

    await user.click(lowerLimit)
    await user.keyboard('1')
    let clusterError = inputClusterContainer.querySelector('inputerror') as HTMLElement
    let simpleError = simpleInputContainer.querySelector('inputerror') as HTMLElement
    expect(clusterError.dataset.error).toBe('VALUE_IS_NOT_BIG_ENOUGH')
    expect(simpleError).toBe(null)
    //At this point only the clusetr validation is triggered do to the onKeyup
    
    await user.click(upperLimit)
    simpleError = simpleInputContainer.querySelector('inputerror') as HTMLElement
    expect(simpleError.dataset.error).toBe('VALUE_IS_NOT_BIG_ENOUGH')
    //Clicking out of the lower limit also triggers onChange

    await user.click(simpleInput)
    await user.keyboard('1.9')
    simpleError = simpleInputContainer.querySelector('inputerror') as HTMLElement
    expect(simpleError).toBe(null)
    
    await user.click(digit)
    await user.keyboard('1.5')
    clusterError = inputClusterContainer.querySelector('inputerror') as HTMLElement
    expect(clusterError).toBe(null)

    await user.click(upperLimit)
    await user.keyboard('{Control>}A{/Control}1')
    clusterError = inputClusterContainer.querySelector('inputerror') as HTMLElement
    expect(clusterError.dataset.error).toBe('VALUE_IS_NOT_SMALL_ENOUGH')
    await user.keyboard(',7')
    clusterError = inputClusterContainer.querySelector('inputerror') as HTMLElement
    expect(clusterError).toBe(null)
    simpleError = simpleInputContainer.querySelector('inputerror') as HTMLElement
    expect(simpleError).toBe(null)

    await user.click(lowerLimit)
    simpleError = simpleInputContainer.querySelector('inputerror') as HTMLElement
    expect(simpleError.dataset.error).toBe('VALUE_IS_NOT_SMALL_ENOUGH')

    await user.click(upperLimit)
    await user.keyboard('{Control>}A{/Control}1')
    clusterError = inputClusterContainer.querySelector('inputerror') as HTMLElement
    expect(clusterError.dataset.error).toBe('VALUE_IS_NOT_SMALL_ENOUGH')
    await user.keyboard('.95')
    clusterError = inputClusterContainer.querySelector('inputerror') as HTMLElement
    expect(clusterError).toBe(null)
    simpleError = simpleInputContainer.querySelector('inputerror') as HTMLElement
    expect(simpleError.dataset.error).toBe('VALUE_IS_NOT_SMALL_ENOUGH')

    await user.click(lowerLimit)
    simpleError = simpleInputContainer.querySelector('inputerror') as HTMLElement
    expect(simpleError).toBe(null)
  })
})
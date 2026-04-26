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

    const inputContainer = screen.getAllByTestId('number-input-cluster') as HTMLInputElement[]
    const digit = inputContainer[0]
    const fraction = inputContainer[2]
    const valueInput = container.querySelector('#test-input') as HTMLInputElement

    await user.click(digit)
    await user.keyboard('98,7')
    expect(digit.value).toBe('98')
    expect(fraction.value).toBe('7')
    expect(valueInput.value).toBe('98,7')

    await user.keyboard('.65')
    expect(digit.value).toBe('98')
    expect(fraction.value).toBe('765')
    expect(valueInput.value).toBe('98,765')

    await user.keyboard('[Backspace][Backspace][Backspace][Backspace][Backspace]') // Fourth backspace only sumps to the previous form element
    expect(digit.value).toBe('9')
    expect(fraction.value).toBe('')
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

    const inputContainer = screen.getAllByTestId('number-input-cluster') as HTMLInputElement[]
    const digit = inputContainer[0]
    const fraction = inputContainer[2]
    const valueInput = container.querySelector('#test-input') as HTMLInputElement

    await user.click(digit)
    await user.keyboard('98,7')
    expect(digit.value).toBe('987')
    expect(valueInput.value).toBe('987')

    await user.keyboard('.65')
    expect(digit.value).toBe('987')
    expect(fraction.value).toBe('65')
    expect(valueInput.value).toBe('987.65')

    await user.keyboard('[Backspace][Backspace][Backspace][Backspace]') // Third backspace only sumps to the previous form element
    expect(digit.value).toBe('98')
    expect(fraction.value).toBe('')
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

    const inputContainer = screen.getAllByTestId('number-input-cluster') as HTMLInputElement[]
    const digit = inputContainer[0]
    const fraction = inputContainer[2]
    const valueInput = container.querySelector('#test-input') as HTMLInputElement

    await user.click(digit)
    await user.keyboard('98.7')
    expect(digit.value).toBe('98')
    expect(fraction.value).toBe('7')
    expect(valueInput.value).toBe('98,7')

    await user.keyboard('[Backspace][Backspace][Backspace]') // Second backspace only sumps to the previous form element
    await user.keyboard('76,543')
    expect(digit.value).toBe('976')
    expect(fraction.value).toBe('543')
    expect(valueInput.value).toBe('976,543')
  })
})
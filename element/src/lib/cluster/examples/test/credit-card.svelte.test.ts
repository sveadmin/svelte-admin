import { tick } from 'svelte'
// @vitest-environment jsdom
import { describe, expect, it } from 'vitest'
import { render, fireEvent, screen, waitFor } from '@testing-library/svelte'
import { userEvent } from '@testing-library/user-event'

import {
  prepareMaskPartReducer,
} from '$lib/literal/index.js'

import Page from '../credit-card.ts.svelte'

describe('Simple form control tests', () => {
  it('Form test making sure dropdown pasting works', async () => {
    const user = userEvent.setup()
    const maskPartReducer = await prepareMaskPartReducer()
    render(Page, {maskPartReducer})

    const firstCluster = screen.getByTestId('first-cluster') as HTMLInputElement

    const firstQuartet = screen.getByTestId('first-quartet') as HTMLInputElement
    const secondQuartet = screen.getByTestId('second-quartet') as HTMLInputElement
    const thirdQuartet = screen.getByTestId('third-quartet') as HTMLInputElement
    const fourthQuartet = screen.getByTestId('fourth-quartet') as HTMLInputElement

    const setInvalidButton = screen.getByTestId('set-invalid-button') as HTMLButtonElement
    const setValidButton = screen.getByTestId('set-valid-button') as HTMLButtonElement
    const clearButton = screen.getByTestId('clear-button') as HTMLButtonElement

    let error : HTMLElement | null = firstCluster.querySelector('inputerror')
    expect(error).toBe(null) //Without touching the field error is supposed to be empty

    await user.click(firstQuartet)
    await user.paste('Mr.')
    expect(firstQuartet.value).toBe('')
    await user.paste('123456')
    expect(firstQuartet.value).toBe('1234')
    expect(secondQuartet.value).toBe('56')
    error = firstCluster.querySelector('inputerror')
    // At this point the cursos is within the second input, the local validation  has not run yet
    expect(error?.dataset?.error).toBe('CC_INVALID_LENGTH')
    expect(error?.innerHTML).toBe('Credit card number has to be 16 characters long')
    thirdQuartet.focus()
    await tick()
    // At this point the cursos is in the third input, local validation has run on the second
    error = firstCluster.querySelector('inputerror')
    expect(error?.dataset?.error).toBe('VALUE_HAS_TO_MATCH_LENGTH')
    expect(error?.innerHTML).toBe('Please enter a value with a length of 4 characters!')

    await user.click(clearButton)
    expect(firstQuartet.value).toBe('')
    expect(secondQuartet.value).toBe('')

    await user.click(setInvalidButton)
    expect(firstQuartet.value).toBe('1234')
    expect(secondQuartet.value).toBe('5678')
    expect(thirdQuartet.value).toBe('1234')
    expect(fourthQuartet.value).toBe('5678')
    error = firstCluster.querySelector('inputerror')
    expect(error?.dataset?.error).toBe('CC_INVALID_CHECKSUM')
    expect(error?.innerHTML).toBe('Credit card number checksum failed')

    await user.click(setValidButton)
    expect(firstQuartet.value).toBe('4012')
    expect(secondQuartet.value).toBe('8888')
    expect(thirdQuartet.value).toBe('8888')
    expect(fourthQuartet.value).toBe('1881')
    error = firstCluster.querySelector('inputerror')
    expect(error).toBe(null)
  })
})
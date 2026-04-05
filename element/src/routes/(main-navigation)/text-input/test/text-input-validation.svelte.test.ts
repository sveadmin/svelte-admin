// @vitest-environment jsdom
import { describe, expect, it } from 'vitest'
import { render, fireEvent, screen } from '@testing-library/svelte'
import { userEvent } from '@testing-library/user-event'

import Page from '../text-input-validation.svelte'

describe('Text input validation tests', () => {
	it('Test input validation at different steps', async () => {
		const user = userEvent.setup()
		render(Page)
		const onTypeValidation = screen.getByTestId('on-type-validation') as HTMLInputElement
		const onTypeValidationInput = onTypeValidation.querySelector('input')
		const onTypeValidationError = onTypeValidation.querySelector('span')

		const onLoadValidation = screen.getByTestId('on-load-validation') as HTMLInputElement
		const onLoadValidationInput = onLoadValidation.querySelector('input')
		const onLoadValidationError = onLoadValidation.querySelector('span')
		
		const onLeaveValidation = screen.getByTestId('on-leave-validation') as HTMLInputElement
		const onLeaveValidationInput = onLeaveValidation.querySelector('input')
		const onLeaveValidationError = onLeaveValidation.querySelector('span')

		const failMessage = 'Please select a different value, this is not allowed! [not-allowed]'

		expect(onTypeValidationInput).not.toBe(null)
		expect(onLeaveValidationInput).not.toBe(null)

		expect(onTypeValidationInput?.value).toBe('not-allowed')
		expect(onTypeValidationError?.innerHTML).toBe('')

		expect(onLoadValidationInput?.value).toBe('not-allowed')
		expect(onLoadValidationInput?.classList.contains('error')).toBe(true)
		expect(onLoadValidationError?.innerHTML).toBe(failMessage)

		expect(onLeaveValidationInput?.value).toBe('not-allowed')
		expect(onLeaveValidationError?.innerHTML).toBe('')
		
		//This counts as value chage, the validation is triggered
		await user.click(onTypeValidationInput!)
		expect(onTypeValidationInput?.value).toBe('not-allowed')
		expect(onTypeValidationInput?.classList.contains('error')).toBe(true)
		expect(onTypeValidationError?.innerHTML).toBe(failMessage)
		await user.keyboard('{Backspace}')
		expect(onTypeValidationInput?.value).toBe('not-allowe')
		expect(onTypeValidationInput?.classList.contains('error')).toBe(false)
		expect(onTypeValidationError?.innerHTML).toBe('')

		//Error checks disabled while typing, so no validation until the focus leaves the input
		await user.click(onLeaveValidationInput!)
		expect(onLeaveValidationInput?.value).toBe('not-allowed')
		expect(onLeaveValidationError?.innerHTML).toBe('')
		await user.click(onTypeValidationInput!)
		expect(onLeaveValidationInput?.value).toBe('not-allowed')
		expect(onLeaveValidationInput?.classList.contains('error')).toBe(true)
		expect(onLeaveValidationError?.innerHTML).toBe(failMessage)
		await user.click(onLeaveValidationInput!)
		await user.keyboard('{Backspace}')
		expect(onLeaveValidationInput?.value).toBe('not-allowe')
		expect(onLeaveValidationInput?.classList.contains('error')).toBe(true)
		expect(onLeaveValidationError?.innerHTML).toBe(failMessage)
	})
})
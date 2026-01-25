// @vitest-environment jsdom
import { describe, expect, it } from 'vitest'
import { render, fireEvent, screen } from '@testing-library/svelte'
import userEvent from '@testing-library/user-event'

import Page from '../text-input-validation.svelte'

describe('Text input validation tests', () => {
	it('Form test making sure dropdown pasting works', async () => {
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

		expect(onTypeValidationInput?.value).toBe('not-allowed')
		expect(onTypeValidationError?.innerHTML).toBe('')

		expect(onLoadValidationInput?.value).toBe('not-allowed')
		expect(onLoadValidationInput?.classList.contains('error')).toBe(true)
		expect(onLoadValidationError?.innerHTML).toBe(failMessage)

		expect(onLeaveValidationInput?.value).toBe('not-allowed')
		expect(onLeaveValidationError?.innerHTML).toBe('')
		
		//This counts as value chage, the validation is triggered
		await user.click(onTypeValidationInput)
		expect(onTypeValidationInput?.value).toBe('not-allowed')
		expect(onTypeValidationInput?.classList.contains('error')).toBe(true)
		expect(onTypeValidationError?.innerHTML).toBe(failMessage)
		await user.keyboard('{Backspace}')
		expect(onTypeValidationInput?.value).toBe('not-allowe')
		expect(onTypeValidationInput?.classList.contains('error')).toBe(false)
		expect(onTypeValidationError?.innerHTML).toBe('')

		//Error checks disabled while typing, so no validation until the focus leaves the input
		await user.click(onLeaveValidationInput)
		expect(onLeaveValidationInput?.value).toBe('not-allowed')
		expect(onLeaveValidationError?.innerHTML).toBe('')
		await user.click(onTypeValidationInput)
		expect(onLeaveValidationInput?.value).toBe('not-allowed')
		expect(onLeaveValidationInput?.classList.contains('error')).toBe(true)
		expect(onLeaveValidationError?.innerHTML).toBe(failMessage)
		await user.click(onLeaveValidationInput)
		await user.keyboard('{Backspace}')
		expect(onLeaveValidationInput?.value).toBe('not-allowe')
		expect(onLeaveValidationInput?.classList.contains('error')).toBe(true)
		expect(onLeaveValidationError?.innerHTML).toBe(failMessage)

	// 	await user.paste('Mr.')
	// 	expect(firstQuartet.value).toBe('')
	// 	await user.paste('123456')
	// 	expect(secondQuartet.value).toBe('56')




	// 	await user.click(clearButton)
	// 	expect(firstQuartet.value).toBe('')
	// 	expect(secondQuartet.value).toBe('')

	// 	await user.click(setInvalidButton)
	// 	expect(firstQuartet.value).toBe('1234')
	// 	expect(secondQuartet.value).toBe('5678')
	// 	expect(thirdQuartet.value).toBe('1234')
	// 	expect(fourthQuartet.value).toBe('5678')

	// 	await user.click(setValidButton)
	// 	expect(firstQuartet.value).toBe('4012')
	// 	expect(secondQuartet.value).toBe('8888')
	// 	expect(thirdQuartet.value).toBe('8888')
	// 	expect(fourthQuartet.value).toBe('1881')
	// 	error = firstCluster.querySelector('inputerror')
	// console.log('>>>>', error)

	})
})
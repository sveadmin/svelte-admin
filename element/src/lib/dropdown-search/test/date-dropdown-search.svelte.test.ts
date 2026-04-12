// @vitest-environment jsdom
import { describe, expect, it } from 'vitest'
import { render, fireEvent, getByRole, screen, within } from '@testing-library/svelte'
import { userEvent } from '@testing-library/user-event'

import DateDropdown from '../examples/date-dropdown.ts.svelte'


describe('Date Dropdown componenent tests', () => {
	it('Month selector test', async () => {
		const user = userEvent.setup()
		render(DateDropdown)

		const input = screen.getByTestId('month-selector') as HTMLInputElement
		const container = input.parentElement as HTMLInputElement
		await user.click(input)

		let options : NodeListOf<HTMLElement> = container.querySelectorAll('sveasuggestedvalue') 
		expect(options.length).toBe(13)
		expect(options[0].dataset.id).toBe('01')
		
		await user.click(options[4])
		expect(input.value).toBe('05')

		await user.click(input)
		await user.keyboard('[ArrowDown][ArrowDown][Enter]')
		expect(input.value).toBe('07')

		await user.click(input)
		expect(input.value).toBe('')
		options = container.querySelectorAll('sveasuggestedvalue')
		expect(options.length).toBe(13)

		await user.keyboard('[Tab]')
		expect(input.value).toBe('07')

		await user.click(input)
		options = container.querySelectorAll('sveasuggestedvalue')
		expect(options.length).toBe(13)
		await user.click(options[12]) //Clear the value

		await user.click(input)
		await user.keyboard('8')
		expect(input.value).toBe('08')
		options = container.querySelectorAll('sveasuggestedvalue')
		expect(options.length).toBe(0)

		await user.click(input)
		expect(input.value).toBe('8')
		await user.keyboard('[Backspace]9')
		expect(input.value).toBe('09')

		// expect(options[10].innerHTML).toBe('Clear value') //Clear value added at the end

		// await user.keyboard('d')
		// options = container.querySelectorAll('sveasuggestedvalue')
		// expect(options.length).toBe(9)
		// expect(options[0].dataset.id).toBe('2')
		// expect(options[8].innerHTML).toBe('Clear value') //Clear value added at the end
		
		// await user.keyboard('o')
		// options = container.querySelectorAll('sveasuggestedvalue')
		// expect(options.length).toBe(3)
		// expect(options[0].dataset.id).toBe('2')
		// expect(options[2].innerHTML).toBe('Clear value') //Clear value added at the end

		// await user.click(options[1]) //Select second option
		// expect(input.value).toBe('12 - Dolphin 24:50:red')

		// await user.click(input) //Clicking back restores the entered value
		// expect(input.value).toBe('do')

		// expect(input.value).toBe('')
	});
})
// @vitest-environment jsdom
import { describe, expect, it, test } from 'vitest'
import { render, fireEvent, screen } from '@testing-library/svelte'
import userEvent from '@testing-library/user-event'

import {
	data
} from '$lib/test/mock/options.js'

import {
  DropdownSearch,
} from '../index.js'

test('Dropdownsearch simple search', async () => {
	const user = userEvent.setup()
	render(DropdownSearch, {
		data: {testid: 'input'},
		values: data
	})

	const input = screen.getByTestId('input') as HTMLInputElement
	await user.click(input)

	let options = screen.queryAllByRole('option')
	expect(options.length).toBe(11)
	expect(options[0].dataset.id).toBe('1') //No filtering
	expect(options[10].innerHTML).toBe('Clear value') //Clear value added at the end

	await user.keyboard('d')
	options = screen.queryAllByRole('option')
	expect(options.length).toBe(9)
	expect(options[0].dataset.id).toBe('2')
	expect(options[8].innerHTML).toBe('Clear value') //Clear value added at the end
	
	await user.keyboard('o')
	options = screen.queryAllByRole('option')
	expect(options.length).toBe(3)
	expect(options[0].dataset.id).toBe('2')
	expect(options[2].innerHTML).toBe('Clear value') //Clear value added at the end

	await user.click(options[1]) //Select second option
	expect(input.value).toBe('12 - Dolphin 24:50:red')

	await user.click(input) //Clicking back restores the entered value
	expect(input.value).toBe('do')

	await user.keyboard('[ArrowDown][Enter]') //Triggering clear value
	expect(input.value).toBe('')
});

test('Dropdownsearch with preset value', async () => {
	const user = userEvent.setup()
	render(DropdownSearch, {
		data: {testid: 'input'},
		value: 17,
		values: data
	})

	const input = screen.getByTestId('input') as HTMLInputElement
	expect(input.value).toBe('17 - Rabbit 20:50:orange')
	
	await user.click(input)
	expect(input.value).toBe('17')
	let options = screen.queryAllByRole('option')
	expect(options.length).toBe(3)
	expect(options[0].dataset.id).toBe('17') 
	expect(options[1].dataset.id).toBe('22') 
	expect(options[2].innerHTML).toBe('Clear value') //Clear value added at the end

})

test('Dropdownsearch with keyboard navigation', async () => {
	const user = userEvent.setup()
	render(DropdownSearch, {
		data: {testid: 'input'},
		values: data
	})

	const input = screen.getByTestId('input') as HTMLInputElement
	await user.click(input)
	await user.keyboard('[ArrowDown][ArrowDown][ArrowDown][ArrowDown][Enter]')
	expect(input.value).toBe('4 - Slug 10:66_yellow')

	await user.click(input)
	let options = screen.queryAllByRole('option')
	expect(options.length).toBe(5)
	expect(options[0].dataset.id).toBe('4')
	expect(options[4].innerHTML).toBe('Clear value') //Clear value added at the end

	await user.keyboard('[ArrowUp][ArrowUp][Escape]')
	expect(input.value).toBe('4 - Slug 10:66_yellow')

	await user.click(input)
	await user.keyboard('[ArrowUp][ArrowUp][Enter]')
	expect(input.value).toBe('20 - frog 12:49:purple')

	await user.click(input)
	await user.keyboard('[ArrowUp][ArrowUp][Tab]')  //Tabbing out REVERTS value to the original
	expect(input.value).toBe('20 - frog 12:49:purple')

	await user.click(input)
	await user.clear(input)
	await user.keyboard('10[Tab]')  //Entering a filter and tabbing REVERTS value to the original
	expect(input.value).toBe('20 - frog 12:49:purple')

	await user.click(input)
	options = screen.queryAllByRole('option')
	await user.click(options[options.length - 1]) //Clear value
	expect(input.value).toBe('')

	await user.click(input)
	expect(input.value).toBe('') //Clear value needs to clear the current value as well
	await user.keyboard('[ArrowUp][ArrowUp][Tab]')  //Tabbing REVERTS value to empty
	expect(input.value).toBe('')

	await user.click(input)
	await user.keyboard('10[Tab]')  //Tabbing out on empty values sets the value to the top most suggestion
	expect(input.value).toBe('10 - Squirrel 12:57:orange')

	await user.keyboard('{Shift>}[Tab]{/Shift}')
	expect(input.value).toBe('10') //Tabbing back in the input

	await user.keyboard('{Shift>}[Tab]{/Shift}')
	expect(input.value).toBe('10 - Squirrel 12:57:orange') //Tabbing out to the previous element, value is unchanged
	
	await user.click(input)
	await user.clear(input)
	await user.keyboard('werwerwer[Tab]')
	expect(input.value).toBe('10 - Squirrel 12:57:orange')

	await user.click(input)
	await user.clear(input)
	await user.keyboard('werwerwer[Enter]')  //Using Enter forces the new value even if there was one set before
	expect(input.value).toBe('[werwerwer] - [NEW]')

	await user.click(input)
	expect(input.value).toBe('werwerwer')
	options = screen.queryAllByRole('option')
	await user.click(options[options.length - 1]) //Clear value

	await user.click(input)
	await user.keyboard('werwerwer[Tab]')  //Tabbing out with invalid value when there is no value already interprets it as new value
	expect(input.value).toBe('[werwerwer] - [NEW]')

	await user.click(input) 
	expect(input.value).toBe('werwerwer')
	await user.clear(input)
	await user.keyboard('asdasdasd[Tab]')  //Tabbing out with invalid value when there is a value PRESERVES value
	expect(input.value).toBe('[werwerwer] - [NEW]')

	await user.click(input) 
	await user.clear(input)
	await user.keyboard('asdasdasd[Enter]')  //Enter forces the new value
	expect(input.value).toBe('[asdasdasd] - [NEW]')
});
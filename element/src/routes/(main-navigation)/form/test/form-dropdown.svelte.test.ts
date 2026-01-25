// @vitest-environment jsdom
import { describe, expect, it } from 'vitest'
import { render, fireEvent, screen } from '@testing-library/svelte'
import userEvent from '@testing-library/user-event'

import Page from '../+page.svelte'

describe('Simple form control tests', () => {
	it('Form test making sure dropdown pasting works', async () => {
		const user = userEvent.setup()
		render(Page)
		const title = screen.getByTestId('title') as HTMLInputElement
		const firstName = screen.getByTestId('first-name') as HTMLInputElement
		const city = screen.getByTestId('city') as HTMLInputElement
		const countries = screen.getAllByTestId('country') as HTMLInputElement[] //Input cluster adds data to all elements of it
		const country = countries.find(i => i.type === 'text') as HTMLInputElement
		const havePets = screen.getByTestId('havePets') as HTMLInputElement
		const challenge = screen.getAllByTestId('challenge') as HTMLInputElement[]

		const clearButton = screen.getByTestId('clear-button') as HTMLButtonElement

		await user.click(title)
		await user.paste('Mr.')
		expect(title.value).toBe('Mr.')

		await user.click(firstName) //This emulates copy paste behaviour
		expect(title.value).toBe('Mr.')
		expect(title.dataset.key).toBe('mr.')

		await user.click(title)
		let options = screen.queryAllByRole('option')
		await user.click(options[2])
		expect(title.value).toBe('Mrs.')
		expect(title.dataset.key).toBe('mrs.')

		await user.click(clearButton) //This changes the bound value
		expect(title.value).toBe('')
		expect(title.dataset.key).toBe('')
		//Test is repeated to avoid issues with values being stuck. which sometimes happen in the browser...

		await user.click(title)
		options = screen.queryAllByRole('option')
		await user.click(options[2])
		expect(title.value).toBe('Mrs.')
		expect(title.dataset.key).toBe('mrs.')

		await user.click(clearButton) //This changes the bound value
		expect(title.value).toBe('')
		expect(title.dataset.key).toBe('')

		await user.click(city)
		await user.paste('Berlin;DE;1;1,9')
		expect(city.value).toBe('Berlin')
		expect(country.value).toBe('Germany')
		expect(havePets.checked).toBe(true)
		expect(challenge[0].value).toBe('1')
		expect(challenge[1].value).toBe('9')
		

		await user.click(clearButton) //This changes the bound value
		expect(city.value).toBe('')
		expect(country.value).toBe('')
		expect(havePets.checked).toBe(false)
		expect(challenge[0].value).toBe('')
		expect(challenge[1].value).toBe('')

	})
})
// @vitest-environment jsdom
import { tick } from 'svelte'
import { describe, expect, it } from 'vitest'
import { render, fireEvent, screen } from '@testing-library/svelte'
import { userEvent } from '@testing-library/user-event'

import {
  prepareMaskPartReducer,
} from '$lib/literal/index.js'

import Page from '../form.svelte'

describe('Simple form control tests', () => {
	it('Form test making sure dropdown pasting works', async () => {
		const user = userEvent.setup()
		const maskPartReducer = await prepareMaskPartReducer()
		render(Page, { maskPartReducer })

		const title = screen.getByTestId('title') as HTMLInputElement
		const firstName = screen.getByTestId('first-name') as HTMLInputElement
		const lastName = screen.getByTestId('last-name') as HTMLInputElement
		const age = screen.getByTestId('age-digit') as HTMLInputElement
		const addressLine1 = screen.getByTestId('address-line-1') as HTMLInputElement
		const city = screen.getByTestId('city') as HTMLInputElement
		const countryContainer = screen.getByTestId('country-container') as HTMLElement
		let country = countryContainer.querySelector('[data-index="1"]') as HTMLInputElement
		let countryValue = screen.getByTestId('country') as HTMLInputElement
		const havePets = screen.getByTestId('havePets') as HTMLInputElement
		const challengeContainer = screen.getByTestId('challenge-container') as HTMLElement
		const challengeDigit = challengeContainer.querySelector('[data-index="0"]') as HTMLInputElement
		const challengeFraction = challengeContainer.querySelector('[data-index="2"]') as HTMLInputElement

		const clearButton = screen.getByTestId('clear-button') as HTMLButtonElement

		await user.click(title)
		await user.paste('Mr.')
		expect(title.value).toBe('Mr.')

		await user.click(firstName)
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

		await user.click(firstName)
		await user.paste('Test;Subject;26;345. That one at the')
		expect(firstName.value).toBe('Test')
		expect(lastName.value).toBe('Subject')
		expect(age.value).toBe('26')
		expect(addressLine1.value).toBe('345. That one at the')

		await user.click(clearButton) //This changes the bound value
		expect(firstName.value).toBe('')
		expect(lastName.value).toBe('')
		expect(age.value).toBe('')
		expect(addressLine1.value).toBe('')

		await user.click(city)
		await user.paste('Berlin;DE;1;1,9')
		expect(country.value).toBe('DE')
		country = countryContainer.querySelector('[data-index="1"]') as HTMLInputElement
		//Dropdwpnsearch replaces the text-input....
		expect(country.value).toBe('Germany')

		countryValue = screen.getByTestId('country')
		expect(city.value).toBe('Berlin')
		expect(countryValue.value).toBe('Germany')
		expect(havePets.checked).toBe(true)
		expect(challengeDigit.value).toBe('1')
		expect(challengeFraction.value).toBe('9')
		

		await user.click(clearButton) //This changes the bound value
		country = countryContainer.querySelector('[data-index="1"]') as HTMLInputElement
		countryValue = screen.getByTestId('country')
		expect(city.value).toBe('')
		expect(country.value).toBe('')
		expect(countryValue.value).toBe('')
		expect(havePets.checked).toBe(false)
		expect(challengeDigit.value).toBe('')
		expect(challengeFraction.value).toBe('')
	})
})
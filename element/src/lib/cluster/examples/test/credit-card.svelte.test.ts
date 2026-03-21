// @vitest-environment jsdom
import { describe, expect, it } from 'vitest'
import { render, fireEvent, screen } from '@testing-library/svelte'
import userEvent from '@testing-library/user-event'

import Page from '../credit-card.ts.svelte'

describe('Simple form control tests', () => {
	it('Form test making sure dropdown pasting works', async () => {
		const user = userEvent.setup()
		render(Page)
		const firstCluster = screen.getByTestId('first-cluster') as HTMLInputElement

		const firstQuartet = screen.getByTestId('first-quartet') as HTMLInputElement
		const secondQuartet = screen.getByTestId('second-quartet') as HTMLInputElement
		const thirdQuartet = screen.getByTestId('third-quartet') as HTMLInputElement
		const fourthQuartet = screen.getByTestId('fourth-quartet') as HTMLInputElement

		const setInvalidButton = screen.getByTestId('set-invalid-button') as HTMLButtonElement
		const setValidButton = screen.getByTestId('set-valid-button') as HTMLButtonElement
		const clearButton = screen.getByTestId('clear-button') as HTMLButtonElement

		let error = firstCluster.querySelector('inputerror')
		expect(error).toBe(null) //Without touching the field error is supposed to be empty

		await user.click(firstQuartet)
		await user.paste('Mr.')
		expect(firstQuartet.value).toBe('')
		await user.paste('123456')
		expect(firstQuartet.value).toBe('1234')
		expect(secondQuartet.value).toBe('56')




		await user.click(clearButton)
		expect(firstQuartet.value).toBe('')
		expect(secondQuartet.value).toBe('')

		await user.click(setInvalidButton)
		expect(firstQuartet.value).toBe('1234')
		expect(secondQuartet.value).toBe('5678')
		expect(thirdQuartet.value).toBe('1234')
		expect(fourthQuartet.value).toBe('5678')

		await user.click(setValidButton)
		expect(firstQuartet.value).toBe('4012')
		expect(secondQuartet.value).toBe('8888')
		expect(thirdQuartet.value).toBe('8888')
		expect(fourthQuartet.value).toBe('1881')
		error = firstCluster.querySelector('inputerror')
	console.log('>>>>', error)

	})
})
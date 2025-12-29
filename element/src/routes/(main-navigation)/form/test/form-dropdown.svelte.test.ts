// @vitest-environment jsdom
import { describe, expect, it, test } from 'vitest'
import { render, fireEvent, screen } from '@testing-library/svelte'
import userEvent from '@testing-library/user-event'

import Page from '../+page.svelte'

test('Form test making sure dropdown pasting works', async () => {
	const user = userEvent.setup()
	render(Page)
	const title = screen.getByTestId('title') as HTMLInputElement
	const firstName = screen.getByTestId('first-name') as HTMLInputElement

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
})
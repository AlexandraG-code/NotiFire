import { act, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { useSkinStore } from '@features/MessengerSelect'
import { ThemeSwitcher, useThemeStore } from '@features/ThemeSwitcher'

import { Skin, ThemeMode } from '@shared/theme'

import { ThemeProvider } from './ThemeProvider'

const root = document.documentElement

describe('ThemeProvider', () => {
	beforeEach(() => {
		localStorage.clear()
		useThemeStore.setState({ mode: ThemeMode.Light })
		useSkinStore.setState({ skin: Skin.Max })
	})

	it('применяет тему и скин к документу при запуске', () => {
		render(<ThemeProvider>контент</ThemeProvider>)

		expect(root).toHaveAttribute('data-theme', ThemeMode.Light)
		expect(root).toHaveAttribute('data-skin', Skin.Max)
	})

	it('меняет тему документа по кнопке переключения', async () => {
		render(
			<ThemeProvider>
				<ThemeSwitcher />
			</ThemeProvider>
		)

		await userEvent.click(screen.getByRole('button', { name: 'Включить тёмную тему' }))

		expect(root).toHaveAttribute('data-theme', ThemeMode.Dark)
		expect(screen.getByRole('button', { name: 'Включить светлую тему' })).toBeInTheDocument()
	})

	it('меняет оформление при выборе другого мессенджера', () => {
		render(<ThemeProvider>контент</ThemeProvider>)

		act(() => useSkinStore.getState().setSkin(Skin.Telegram))

		expect(root).toHaveAttribute('data-skin', Skin.Telegram)
	})
})

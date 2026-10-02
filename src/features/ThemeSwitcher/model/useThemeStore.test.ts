import { ThemeMode } from '@shared/theme'

import { THEME_STORAGE_KEY } from './constants'
import { useThemeStore } from './useThemeStore'

describe('useThemeStore', () => {
	beforeEach(() => {
		localStorage.clear()
		useThemeStore.setState({ mode: ThemeMode.Light })
	})

	it('переключает светлую тему на тёмную и обратно', () => {
		useThemeStore.getState().toggleMode()
		expect(useThemeStore.getState().mode).toBe(ThemeMode.Dark)

		useThemeStore.getState().toggleMode()
		expect(useThemeStore.getState().mode).toBe(ThemeMode.Light)
	})

	it('запоминает выбор в localStorage', () => {
		useThemeStore.getState().setMode(ThemeMode.Dark)

		const saved = JSON.parse(localStorage.getItem(THEME_STORAGE_KEY) ?? '{}')
		expect(saved.state.mode).toBe(ThemeMode.Dark)
	})
})

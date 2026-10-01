import type { ThemeMode } from '@shared/theme'

export interface ThemeState {
	mode: ThemeMode
}

export interface ThemeActions {
	setMode: (mode: ThemeMode) => void
	toggleMode: () => void
}

export type ThemeStore = ThemeState & ThemeActions

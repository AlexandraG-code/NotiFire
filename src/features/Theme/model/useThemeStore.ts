import { create } from 'zustand'
import { persist } from 'zustand/middleware'

import { ThemeMode } from '@shared/theme'

import { THEME_STORAGE_KEY } from './constants'
import { getSystemMode } from './getSystemMode'
import type { ThemeStore } from './types'

/** Стор темы; выбор пользователя хранится в localStorage, по умолчанию — тема системы. */
export const useThemeStore = create<ThemeStore>()(
	persist(
		(set) => ({
			mode: getSystemMode(),
			setMode: (mode) => set({ mode }),
			toggleMode: () =>
				set((state) => ({ mode: state.mode === ThemeMode.Dark ? ThemeMode.Light : ThemeMode.Dark }))
		}),
		{ name: THEME_STORAGE_KEY, partialize: ({ mode }) => ({ mode }) }
	)
)

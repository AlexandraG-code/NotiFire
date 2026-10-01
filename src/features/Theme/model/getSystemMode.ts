import { ThemeMode } from '@shared/theme'

import { DARK_SCHEME_QUERY } from './constants'

/**
 * Тема операционной системы; используется, пока пользователь не выбрал свою.
 * @returns {ThemeMode} Светлая или тёмная тема
 */
export const getSystemMode = (): ThemeMode =>
	window.matchMedia(DARK_SCHEME_QUERY).matches ? ThemeMode.Dark : ThemeMode.Light

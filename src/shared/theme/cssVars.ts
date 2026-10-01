import { CSS_VAR_PREFIX, THEME_ATTRIBUTE } from './constants'
import type { ThemeMode } from './enums'
import { themeTokens } from './themes'

/**
 * Превращает camelCase в kebab-case: `bgPrimary` → `bg-primary`.
 * @param {string} value - Строка в camelCase
 * @returns {string} Строка в kebab-case
 */
const toKebabCase = (value: string): string => value.replace(/[A-Z]/g, (char) => `-${char.toLowerCase()}`)

/**
 * Записывает токены режима в CSS-переменные корневого элемента, ставит атрибут темы и color-scheme.
 * @param {ThemeMode} mode - Светлая или тёмная тема
 * @returns {void}
 */
export const applyThemeVars = (mode: ThemeMode): void => {
	const root = document.documentElement

	Object.entries(themeTokens[mode]).forEach(([key, value]) => {
		root.style.setProperty(`${CSS_VAR_PREFIX}${toKebabCase(key)}`, value)
	})
	root.setAttribute(THEME_ATTRIBUTE, mode)
	root.style.colorScheme = mode
}

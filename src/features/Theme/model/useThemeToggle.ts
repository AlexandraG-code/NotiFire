import { type ThemeTransitionOrigin, runThemeTransition } from '@shared/theme'

import { useThemeStore } from './useThemeStore'

/**
 * Хук переключения темы с круговой анимацией.
 * @returns {Function} Функция `(origin) => void`: origin — точка, из которой расходится круг
 */
export const useThemeToggle = () => {
	const toggleMode = useThemeStore((state) => state.toggleMode)

	return (origin: ThemeTransitionOrigin) => runThemeTransition(origin, toggleMode)
}

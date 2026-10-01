import { flushSync } from 'react-dom'

import {
	REDUCED_MOTION_QUERY,
	THEME_TRANSITION_DURATION_MS,
	THEME_TRANSITION_EASING,
	THEME_TRANSITION_PSEUDO
} from './constants'
import type { ThemeTransitionOrigin } from './types'

/**
 * Выполняет смену темы с эффектом: новая тема «раскатывается» кругом из заданной точки.
 * Без поддержки View Transitions или при prefers-reduced-motion тема меняется мгновенно.
 * @param {ThemeTransitionOrigin} origin - Точка, из которой начинается круг
 * @param {Function} update - Синхронно меняет тему (например, действие стора)
 * @returns {void}
 */
export const runThemeTransition = (origin: ThemeTransitionOrigin, update: () => void): void => {
	const canAnimate = 'startViewTransition' in document && !window.matchMedia(REDUCED_MOTION_QUERY).matches
	if (!canAnimate) {
		update()
		return
	}

	const { x, y } = origin
	const radius = Math.hypot(Math.max(x, window.innerWidth - x), Math.max(y, window.innerHeight - y))
	const transition = document.startViewTransition(() => flushSync(update))

	transition.ready
		.then(() => {
			document.documentElement.animate(
				{ clipPath: [`circle(0 at ${x}px ${y}px)`, `circle(${radius}px at ${x}px ${y}px)`] },
				{
					duration: THEME_TRANSITION_DURATION_MS,
					easing: THEME_TRANSITION_EASING,
					pseudoElement: THEME_TRANSITION_PSEUDO
				}
			)
		})
		.catch(() => undefined) // переход пропущен (фоновая вкладка) — тема уже применена
}

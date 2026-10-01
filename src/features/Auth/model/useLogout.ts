import { useNavigate } from 'react-router-dom'

import { AppRoute } from '@shared/config'

import { useAuthStore } from './useAuthStore'

/**
 * Хук выхода: сбрасывает креды и открывает страницу входа.
 * @returns {Function} Функция выхода () => void
 */
export const useLogout = () => {
	const logout = useAuthStore((state) => state.logout)

	const navigate = useNavigate()

	return () => {
		logout()
		navigate(AppRoute.Login, { replace: true })
	}
}

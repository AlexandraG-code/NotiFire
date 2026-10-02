import { isAxiosError } from 'axios'
import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

import type { GreenApiCredentials } from '@shared/api/greenApi'
import { getErrorMessage, runAsyncAction } from '@shared/lib'

import { AuthService } from '../api/auth.service'
import { StateInstance } from '../api/enums'

import { claimChatData, wipeChatData } from './chatData'
import { AUTH_STORAGE_KEY, INVALID_CREDENTIALS_STATUSES } from './constants'

interface AuthState {
	isAuthorized: boolean
	credentials: GreenApiCredentials | null
}

interface AuthActions {
	/** Проверяет креды и сохраняет их в сторе. Ошибку показывает пользователю сам; возвращает true, если вход выполнен. */
	login: (credentials: GreenApiCredentials) => Promise<boolean>
	logout: () => void
}

const initial: AuthState = {
	isAuthorized: false,
	credentials: null
}

/**
 * Подбирает текст ошибки входа: отказ API по данным, нет связи или собственное сообщение проверки.
 * @param {unknown} error - Ошибка запроса или проверки
 * @returns {string | undefined} Текст для пользователя
 */
const describeLoginError = (error: unknown): string | undefined => {
	if (!isAxiosError(error)) {
		return getErrorMessage(error)
	}

	const status = error.response?.status
	return status !== undefined && INVALID_CREDENTIALS_STATUSES.includes(status)
		? 'Неверный idInstance или apiTokenInstance'
		: 'Не удалось связаться с GREEN-API'
}

/** Стор авторизации; креды хранятся в sessionStorage до закрытия вкладки. */
export const useAuthStore = create<AuthState & AuthActions>()(
	persist(
		(set) => ({
			...initial,
			login: (credentials) =>
				runAsyncAction(
					async () => {
						const { stateInstance } = await AuthService.getStateInstance(credentials)
						if (stateInstance !== StateInstance.Authorized) {
							throw new Error(`Инстанс не авторизован (состояние: ${stateInstance})`)
						}

						claimChatData(credentials.idInstance)
						set({ isAuthorized: true, credentials })
					},
					{ errorTitle: 'Не удалось войти', describeError: describeLoginError }
				),
			logout: () => {
				wipeChatData()
				set(initial)
			}
		}),
		{
			name: AUTH_STORAGE_KEY,
			storage: createJSONStorage(() => sessionStorage),
			partialize: ({ isAuthorized, credentials }) => ({ isAuthorized, credentials })
		}
	)
)

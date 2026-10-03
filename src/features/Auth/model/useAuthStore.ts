import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

import type { GreenApiCredentials } from '@shared/api/greenApi'
import { Namespace, i18n } from '@shared/i18n'
import { runAsyncAction } from '@shared/lib'

import { AuthService } from '../api/auth.service'
import { StateInstance } from '../api/enums'

import { claimChatData, describeLoginError, wipeChatData } from './auth.helpers'
import { AUTH_STORAGE_KEY } from './constants'

interface AuthState {
	isAuthorized: boolean
	credentials: GreenApiCredentials | null
}

/**
 * Действия стора авторизации.
 * @property {Function} login - Проверяет креды и сохраняет их в сторе; ошибку показывает пользователю сам, возвращает
 * true, если вход выполнен
 * @property {Function} logout - Выходит из аккаунта и стирает сохранённые чаты и сообщения
 */
interface AuthActions {
	login: (credentials: GreenApiCredentials) => Promise<boolean>
	logout: () => void
}

const initial: AuthState = {
	isAuthorized: false,
	credentials: null
}

/** Стор авторизации; креды хранятся в sessionStorage до закрытия вкладки. */
export const useAuthStore = create<AuthState & AuthActions>()(
	persist(
		(set) => ({
			...initial,
			login: async (credentials) => {
				const { isSuccess } = await runAsyncAction(
					async () => {
						const { stateInstance } = await AuthService.getStateInstance(credentials)
						if (stateInstance !== StateInstance.Authorized) {
							throw new Error(
								i18n.t('errors.notAuthorized', { ns: Namespace.Auth, state: stateInstance })
							)
						}
					},
					{
						errorTitle: i18n.t('errors.loginFailed', { ns: Namespace.Auth }),
						describeError: describeLoginError
					}
				)

				if (isSuccess) {
					claimChatData(credentials.idInstance)
					set({ isAuthorized: true, credentials })
				}
				return isSuccess
			},
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

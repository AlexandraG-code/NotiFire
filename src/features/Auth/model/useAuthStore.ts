import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

import type { GreenApiCredentials } from '@shared/api/greenApi'
import { runAsyncAction } from '@shared/lib'

import { verifyCredentials } from '../api/auth.service'

import { claimChatData, wipeChatData } from './chatData'
import { AUTH_STORAGE_KEY } from './constants'

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

/** Стор авторизации; креды хранятся в sessionStorage до закрытия вкладки. */
export const useAuthStore = create<AuthState & AuthActions>()(
	persist(
		(set) => ({
			...initial,
			login: (credentials) =>
				runAsyncAction(
					async () => {
						await verifyCredentials(credentials)
						claimChatData(credentials.idInstance)
						set({ isAuthorized: true, credentials })
					},
					{ errorTitle: 'Не удалось войти' }
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

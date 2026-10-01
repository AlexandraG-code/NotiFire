import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

import type { GreenApiCredentials } from '@shared/api/greenApi'

import { verifyCredentials } from '../api/auth.service'

import { claimChatData, wipeChatData } from './chatData'
import { AUTH_STORAGE_KEY } from './constants'

interface AuthState {
	isAuthorized: boolean
	credentials: GreenApiCredentials | null
}

interface AuthActions {
	/** Проверяет креды и сохраняет их в сторе; бросает Error с текстом для пользователя. */
	login: (credentials: GreenApiCredentials) => Promise<void>
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
				await verifyCredentials(credentials)
				claimChatData(credentials.idInstance)
				set({ isAuthorized: true, credentials })
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

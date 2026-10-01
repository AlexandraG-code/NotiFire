import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

import { verifyCredentials } from '../api/auth.service'

import { claimChatData, wipeChatData } from './chatData'
import { AUTH_STORAGE_KEY } from './constants'
import type { AuthState, AuthStore } from './types'

const initial: AuthState = {
	isAuthorized: false,
	credentials: null
}

/** Стор авторизации; креды хранятся в sessionStorage до закрытия вкладки. */
export const useAuthStore = create<AuthStore>()(
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

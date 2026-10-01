import type { GreenApiCredentials } from '@shared/api/greenApi'

export interface AuthState {
	isAuthorized: boolean
	credentials: GreenApiCredentials | null
}

export interface AuthActions {
	/** Проверяет креды и сохраняет их в сторе; бросает Error с текстом для пользователя. */
	login: (credentials: GreenApiCredentials) => Promise<void>
	logout: () => void
}

export type AuthStore = AuthState & AuthActions

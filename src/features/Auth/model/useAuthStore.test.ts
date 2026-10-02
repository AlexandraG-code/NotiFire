import { AxiosError, type AxiosResponse } from 'axios'

import { useNotificationStore } from '@shared/lib'

import { AuthService } from '../api/auth.service'
import { StateInstance } from '../api/enums'

import { useAuthStore } from './useAuthStore'

vi.mock('../api/auth.service', () => ({ AuthService: { getStateInstance: vi.fn() } }))

const credentials = { idInstance: '1234567890', apiTokenInstance: 'secret-token' }
const getStateInstance = vi.mocked(AuthService.getStateInstance)

/**
 * Ошибка запроса с ответом API нужного статуса.
 * @param {number} status - HTTP-статус ответа
 * @returns {AxiosError} Ошибка, как её отдаёт axios
 */
const apiError = (status: number) =>
	new AxiosError('Request failed', undefined, undefined, undefined, { status } as AxiosResponse)

describe('useAuthStore: вход', () => {
	beforeEach(() => {
		vi.clearAllMocks()
		sessionStorage.clear()
		localStorage.clear()
		useAuthStore.setState({ isAuthorized: false, credentials: null })
		useNotificationStore.setState({ items: [] })
		vi.spyOn(console, 'error').mockImplementation(() => undefined)
	})

	it('пускает в приложение, если инстанс авторизован', async () => {
		getStateInstance.mockResolvedValue({ stateInstance: StateInstance.Authorized })

		const isLoggedIn = await useAuthStore.getState().login(credentials)

		expect(isLoggedIn).toBe(true)
		expect(useAuthStore.getState()).toMatchObject({ isAuthorized: true, credentials })
		expect(useNotificationStore.getState().items).toHaveLength(0)
	})

	it('не пускает, если инстанс не авторизован в мессенджере, и показывает его состояние', async () => {
		getStateInstance.mockResolvedValue({ stateInstance: StateInstance.NotAuthorized })

		const isLoggedIn = await useAuthStore.getState().login(credentials)

		expect(isLoggedIn).toBe(false)
		expect(useAuthStore.getState().isAuthorized).toBe(false)
		expect(useNotificationStore.getState().items[0].description).toContain(StateInstance.NotAuthorized)
	})

	it('сообщает о неверных данных, когда API отвечает 401', async () => {
		getStateInstance.mockRejectedValue(apiError(401))

		const isLoggedIn = await useAuthStore.getState().login(credentials)

		expect(isLoggedIn).toBe(false)
		expect(useNotificationStore.getState().items[0].description).toBe('Неверный idInstance или apiTokenInstance')
	})

	it('сообщает об отсутствии связи, когда ответа от API нет', async () => {
		getStateInstance.mockRejectedValue(new AxiosError('Network Error'))

		await useAuthStore.getState().login(credentials)

		expect(useNotificationStore.getState().items[0].description).toContain('связ')
	})

	it('не кладёт токен в текст ошибки', async () => {
		getStateInstance.mockRejectedValue(apiError(403))

		await useAuthStore.getState().login(credentials)

		expect(JSON.stringify(useNotificationStore.getState().items)).not.toContain(credentials.apiTokenInstance)
	})

	it('при выходе стирает данные входа и чаты', async () => {
		getStateInstance.mockResolvedValue({ stateInstance: StateInstance.Authorized })
		await useAuthStore.getState().login(credentials)
		expect(localStorage.getItem('chat-data-owner')).toBe(credentials.idInstance)

		useAuthStore.getState().logout()

		expect(useAuthStore.getState()).toMatchObject({ isAuthorized: false, credentials: null })
		expect(localStorage.getItem('chat-data-owner')).toBeNull()
	})
})

import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { MemoryRouter, Route, Routes } from 'react-router-dom'

import { Skin } from '@shared/theme'

import { AuthService } from '../../api/auth.service'
import { StateInstance } from '../../api/enums'
import { useAuthStore } from '../../model/useAuthStore'

import { AuthForm } from './AuthForm'

vi.mock('../../api/auth.service', () => ({ AuthService: { getStateInstance: vi.fn() } }))
// заставка при входе держит экран около секунды: в тестах ждать её незачем
vi.mock('@shared/lib', async (importOriginal) => ({
	...(await importOriginal<object>()),
	sleep: () => Promise.resolve()
}))

const getStateInstance = vi.mocked(AuthService.getStateInstance)

/**
 * Рисует форму входа внутри роутера: после успешного входа должна открыться главная.
 * @param {Skin} messenger - Выбранный мессенджер
 * @returns {ReturnType<typeof render>} Результат render
 */
const renderForm = (messenger: Skin = Skin.Max) =>
	render(
		<MemoryRouter initialEntries={['/login']}>
			<Routes>
				<Route path="/login" element={<AuthForm messenger={messenger} />} />
				<Route path="/" element={<div>главная</div>} />
			</Routes>
		</MemoryRouter>
	)

const idInstanceField = () => screen.getByLabelText('idInstance')
const tokenField = () => screen.getByLabelText('apiTokenInstance')

describe('AuthForm', () => {
	beforeEach(() => {
		vi.clearAllMocks()
		sessionStorage.clear()
		localStorage.clear()
		useAuthStore.setState({ isAuthorized: false, credentials: null })
		vi.spyOn(console, 'error').mockImplementation(() => undefined)
	})

	it('требует заполнить оба поля и не отправляет запрос', async () => {
		renderForm()

		await userEvent.click(screen.getByRole('button', { name: 'Войти' }))

		expect(await screen.findByText('Введите idInstance')).toBeInTheDocument()
		expect(screen.getByText('Введите apiTokenInstance')).toBeInTheDocument()
		expect(getStateInstance).not.toHaveBeenCalled()
	})

	it('входит с обрезанными пробелами и открывает главную', async () => {
		getStateInstance.mockResolvedValue({ stateInstance: StateInstance.Authorized })
		renderForm()

		await userEvent.type(idInstanceField(), '  1234567890 ')
		await userEvent.type(tokenField(), ' tok ')
		await userEvent.click(screen.getByRole('button', { name: 'Войти' }))

		expect(await screen.findByText('главная')).toBeInTheDocument()
		expect(getStateInstance).toHaveBeenCalledWith({ idInstance: '1234567890', apiTokenInstance: 'tok' })
		expect(useAuthStore.getState().isAuthorized).toBe(true)
	})

	it('остаётся на форме, если инстанс не авторизован', async () => {
		getStateInstance.mockResolvedValue({ stateInstance: StateInstance.NotAuthorized })
		renderForm()

		await userEvent.type(idInstanceField(), '1234567890')
		await userEvent.type(tokenField(), 'tok')
		await userEvent.click(screen.getByRole('button', { name: 'Войти' }))

		await waitFor(() => expect(getStateInstance).toHaveBeenCalled())
		expect(screen.queryByText('главная')).not.toBeInTheDocument()
		expect(useAuthStore.getState().isAuthorized).toBe(false)
	})

	it('запоминает введённое отдельно для каждого мессенджера', async () => {
		const { rerender } = renderForm(Skin.Max)
		const wrap = (messenger: Skin) => (
			<MemoryRouter initialEntries={['/login']}>
				<Routes>
					<Route path="/login" element={<AuthForm messenger={messenger} />} />
				</Routes>
			</MemoryRouter>
		)

		await userEvent.type(idInstanceField(), '111')
		await userEvent.type(tokenField(), 'max-token')

		rerender(wrap(Skin.Telegram))
		await waitFor(() => expect(idInstanceField()).toHaveValue(''))
		await userEvent.type(idInstanceField(), '222')

		rerender(wrap(Skin.Max))
		await waitFor(() => expect(idInstanceField()).toHaveValue('111'))
		expect(tokenField()).toHaveValue('max-token')

		rerender(wrap(Skin.Telegram))
		await waitFor(() => expect(idInstanceField()).toHaveValue('222'))
	})
})

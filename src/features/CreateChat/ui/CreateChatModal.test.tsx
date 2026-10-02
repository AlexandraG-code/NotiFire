import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { MemoryRouter, Route, Routes, useParams } from 'react-router-dom'

import { useChatStore } from '@entities/Chat'

import { CreateChatModal } from './CreateChatModal'

/**
 * Страница чата: показывает идентификатор из адреса, чтобы тест мог убедиться в переходе.
 * @returns {JSX.Element} Заглушка страницы чата
 */
const ChatStub = () => <div>чат {useParams().chatId}</div>

/**
 * Рисует окно создания чата внутри роутера.
 * @param {Function} onClose - Обработчик закрытия окна
 * @returns {ReturnType<typeof render>} Результат render
 */
const renderModal = (onClose = vi.fn()) =>
	render(
		<MemoryRouter initialEntries={['/']}>
			<Routes>
				<Route path="/" element={<CreateChatModal open onClose={onClose} />} />
				<Route path="/chat/:chatId" element={<ChatStub />} />
			</Routes>
		</MemoryRouter>
	)

describe('CreateChatModal', () => {
	beforeEach(() => {
		localStorage.clear()
		useChatStore.setState({ chats: [] })
	})

	it('не даёт начать чат, пока номер некорректен', async () => {
		renderModal()

		await userEvent.type(screen.getByLabelText('Номер телефона'), '123')

		expect(screen.getByRole('button', { name: 'Начать чат' })).toBeDisabled()
	})

	it('создаёт чат по номеру и открывает его', async () => {
		const onClose = vi.fn()
		renderModal(onClose)

		await userEvent.type(screen.getByLabelText('Номер телефона'), '916 123-45-67')
		await userEvent.click(screen.getByRole('button', { name: 'Начать чат' }))

		expect(await screen.findByText('чат 79161234567')).toBeInTheDocument()
		expect(onClose).toHaveBeenCalled()
		expect(useChatStore.getState().chats).toMatchObject([
			{ id: '79161234567', apiChatId: '79161234567@c.us', title: '+79161234567' }
		])
	})

	it('повторный чат на тот же номер не создаёт дубликат', async () => {
		useChatStore.getState().addChat({ id: '79161234567', apiChatId: '79161234567@c.us', title: '+79161234567' })
		renderModal()

		await userEvent.type(screen.getByLabelText('Номер телефона'), '9161234567')
		await userEvent.click(screen.getByRole('button', { name: 'Начать чат' }))

		await screen.findByText('чат 79161234567')
		expect(useChatStore.getState().chats).toHaveLength(1)
	})
})

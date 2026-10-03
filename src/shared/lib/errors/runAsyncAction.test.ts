import { runAsyncAction } from './runAsyncAction'
import { useNotificationStore } from './useNotificationStore'

describe('runAsyncAction', () => {
	beforeEach(() => {
		useNotificationStore.setState({ items: [] })
		vi.spyOn(console, 'error').mockImplementation(() => undefined)
		vi.spyOn(console, 'warn').mockImplementation(() => undefined)
	})

	it('возвращает результат выполненного действия', async () => {
		const result = await runAsyncAction(async () => ({ id: 7 }), { errorTitle: 'Ошибка' })

		expect(result).toEqual({ isSuccess: true, data: { id: 7 } })
		expect(useNotificationStore.getState().items).toHaveLength(0)
	})

	it('при ошибке не бросает её, а кладёт в стор уведомлений', async () => {
		const result = await runAsyncAction(() => Promise.reject(new Error('сбой сети')), { errorTitle: 'Не удалось' })

		expect(result).toEqual({ isSuccess: false })
		expect(useNotificationStore.getState().items).toMatchObject([{ title: 'Не удалось', description: 'сбой сети' }])
	})

	it('берёт текст ошибки из describeError', async () => {
		await runAsyncAction(() => Promise.reject(new Error('техническая причина')), {
			errorTitle: 'Не удалось',
			describeError: () => 'Понятный текст'
		})

		expect(useNotificationStore.getState().items[0].description).toBe('Понятный текст')
	})

	it('в тихом режиме ничего не показывает пользователю', async () => {
		const result = await runAsyncAction(() => Promise.reject(new Error('429')), {
			errorTitle: 'Проверка',
			silent: true
		})

		expect(result).toEqual({ isSuccess: false })
		expect(useNotificationStore.getState().items).toHaveLength(0)
	})
})

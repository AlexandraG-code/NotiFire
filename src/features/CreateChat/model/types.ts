import type { PhoneFieldValue } from '@shared/ui'

export interface CreateChatFormValues {
	phone: PhoneFieldValue
}

/**
 * Свойства окна создания чата.
 * @property {boolean} open - Показано ли окно
 * @property {Function} onClose - Вызывается при закрытии окна и после создания чата
 */
export interface CreateChatModalProps {
	open: boolean
	onClose: () => void
}

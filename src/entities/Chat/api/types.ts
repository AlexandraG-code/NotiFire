/**
 * Ответ getContactInfo: профиль собеседника.
 * @property {string} avatar - Ссылка на аватар; пустая строка, если аватара нет
 * @property {string} name - Имя из профиля мессенджера
 * @property {string} contactName - Имя из контактов устройства; пустое, если контакт не сохранён
 * @property {string} chatId - Настоящий идентификатор личного чата (числовой), даже если запрос был по номеру
 * @property {string} chatType - Тип чата: user, group, channel или bot
 */
export interface ContactInfo {
	avatar: string
	name: string
	contactName: string
	chatId: string
	chatType: string
}

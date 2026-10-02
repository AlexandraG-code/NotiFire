import type { Namespace } from './enums'
import type auth from './locales/auth/ru/auth.json'
import type chat from './locales/chat/ru/chat.json'
import type common from './locales/common/ru/common.json'

/** Типы ключей берутся из русских файлов: опечатка в ключе или пространстве станет ошибкой компиляции. */
declare module 'i18next' {
	interface CustomTypeOptions {
		defaultNS: Namespace.Common
		resources: {
			[Namespace.Common]: typeof common
			[Namespace.Auth]: typeof auth
			[Namespace.Chat]: typeof chat
		}
	}
}

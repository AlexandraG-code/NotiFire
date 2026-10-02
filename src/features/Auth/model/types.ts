import type { GreenApiCredentials } from '@shared/api/greenApi'
import type { Skin } from '@shared/theme'

/** Введённые в форму значения по мессенджерам: при переключении вкладки они возвращаются в поля. */
export type CredentialsDrafts = Partial<Record<Skin, Partial<GreenApiCredentials>>>

/**
 * Свойства формы входа.
 * @property {Skin} messenger - Выбранный мессенджер: у каждого свои введённые idInstance и apiTokenInstance
 */
export interface AuthFormProps {
	messenger: Skin
}

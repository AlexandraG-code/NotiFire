import type { CountryCode } from 'libphonenumber-js'

/**
 * Страна в списке выбора кода.
 * @property {CountryCode} code - ISO-код страны
 * @property {string} dial - Телефонный код страны без «+»
 * @property {string} flag - Флаг-эмодзи
 * @property {string} name - Название страны на текущем языке
 */
export interface Country {
	code: CountryCode
	dial: string
	flag: string
	name: string
}

/** Значение поля: выбранная страна и цифры номера, как их ввёл пользователь. */
export interface PhoneFieldValue {
	country: CountryCode
	number: string
}

/** Управляемый компонент: значение и обработчик приходят от Form.Item antd или от родителя. */
export interface PhoneFieldProps {
	value?: PhoneFieldValue
	onChange?: (value: PhoneFieldValue) => void
}

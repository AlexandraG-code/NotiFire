import type { CountryCode } from 'libphonenumber-js'

export interface Country {
	code: CountryCode
	/** Телефонный код страны без «+». */
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

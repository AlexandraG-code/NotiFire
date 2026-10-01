import { useCallback } from 'react'

import { type CountryCode, isValidPhoneNumber, parsePhoneNumberFromString } from 'libphonenumber-js'

/** Длина знака «+» в начале международного номера. */
const PLUS_SIGN_LENGTH = 1

/**
 * Небольшие утилиты создания чата, собранные в одном хуке.
 * @returns {{ buildPhone: Function, isPhoneValid: Function }} Функции для работы с введённым номером
 */
export const useCreateChatHelpers = () => {
	/**
	 * Собирает номер в международном виде без «+» (основа chatId).
	 * @param {CountryCode} country - Выбранная страна
	 * @param {string} rawNumber - Номер в том виде, как его ввёл пользователь
	 * @returns {string} Цифры номера с кодом страны или пустая строка, если номер не разобрался
	 */
	const buildPhone = useCallback(
		(country: CountryCode, rawNumber: string): string =>
			parsePhoneNumberFromString(rawNumber, country)?.number.slice(PLUS_SIGN_LENGTH) ?? '',
		[]
	)

	/**
	 * Проверяет номер по правилам выбранной страны.
	 * @param {CountryCode} country - Выбранная страна
	 * @param {string} [rawNumber] - Номер в том виде, как его ввёл пользователь
	 * @returns {boolean} true, если номер корректен
	 */
	const isPhoneValid = useCallback(
		(country: CountryCode, rawNumber?: string): boolean => isValidPhoneNumber(rawNumber ?? '', country),
		[]
	)

	return { buildPhone, isPhoneValid }
}

import { type CountryCode, isValidPhoneNumber } from 'libphonenumber-js'

/**
 * Проверяет номер по правилам выбранной страны.
 * @param {CountryCode} country - Выбранная страна
 * @param {string} [rawNumber] - Номер в том виде, как его ввёл пользователь
 * @returns {boolean} true, если номер корректен
 */
export const isPhoneValid = (country: CountryCode, rawNumber: string | undefined): boolean =>
	isValidPhoneNumber(rawNumber ?? '', country)

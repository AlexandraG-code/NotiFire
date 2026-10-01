import { type CountryCode, parsePhoneNumberFromString } from 'libphonenumber-js'

/**
 * Собирает номер в международном виде без «+» (основа chatId).
 * @param {CountryCode} country - Выбранная страна
 * @param {string} rawNumber - Номер в том виде, как его ввёл пользователь
 * @returns {string} Цифры номера с кодом страны или пустая строка, если номер не разобрался
 */
export const buildPhone = (country: CountryCode, rawNumber: string): string =>
	parsePhoneNumberFromString(rawNumber, country)?.number.slice(1) ?? ''

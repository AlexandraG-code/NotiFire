import { type CountryCode, getCountries, getCountryCallingCode } from 'libphonenumber-js'

import type { Country } from './types'

const NAMES_LOCALE = 'ru'
const REGIONAL_INDICATOR_OFFSET = 0x1f1e6 - 'A'.charCodeAt(0)

/** Значения, которые компаратор sort возвращает для порядка «раньше» и «позже»; ноль означает «равны». */
const SORT_BEFORE = -1
const SORT_AFTER = 1

export const DEFAULT_COUNTRY: CountryCode = 'RU'

const regionNames = new Intl.DisplayNames(NAMES_LOCALE, { type: 'region' })

/**
 * Флаг-эмодзи из ISO-кода страны: каждая буква превращается в региональный индикатор.
 * @param {CountryCode} code - ISO-код страны, например `RU`
 * @returns {string} Эмодзи флага
 */
const toFlag = (code: CountryCode): string =>
	String.fromCodePoint(...[...code].map((char) => char.charCodeAt(0) + REGIONAL_INDICATOR_OFFSET))

/**
 * Порядок стран в списке: Россия первой, остальные по алфавиту названий.
 * @param {Country} a - Первая страна
 * @param {Country} b - Вторая страна
 * @returns {number} Отрицательное, если a идёт раньше b, положительное, если позже
 */
const compareCountries = (a: Country, b: Country): number => {
	if (a.code === DEFAULT_COUNTRY) return SORT_BEFORE
	if (b.code === DEFAULT_COUNTRY) return SORT_AFTER
	return a.name.localeCompare(b.name, NAMES_LOCALE)
}

/** Все страны libphonenumber: Россия первой, остальные по алфавиту. */
export const COUNTRIES: Country[] = getCountries()
	.map((code) => ({
		code,
		dial: getCountryCallingCode(code),
		flag: toFlag(code),
		name: regionNames.of(code) ?? code
	}))
	.sort(compareCountries)

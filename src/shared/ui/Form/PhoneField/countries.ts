import { type CountryCode, getCountries, getCountryCallingCode } from 'libphonenumber-js'

import type { Country } from './types'

const REGIONAL_INDICATOR_OFFSET = 0x1f1e6 - 'A'.charCodeAt(0)

/** Значения, которые компаратор sort возвращает для порядка «раньше» и «позже»; ноль означает «равны». */
const SORT_BEFORE = -1
const SORT_AFTER = 1

export const DEFAULT_COUNTRY: CountryCode = 'RU'

/** Списки стран по языкам: названия зависят от языка, поэтому список строится один раз на язык. */
const countryListCache = new Map<string, Country[]>()

/**
 * Флаг-эмодзи из ISO-кода страны: каждая буква превращается в региональный индикатор.
 * @param {CountryCode} code - ISO-код страны, например `RU`
 * @returns {string} Эмодзи флага
 */
const toFlag = (code: CountryCode): string =>
	String.fromCodePoint(...[...code].map((char) => char.charCodeAt(0) + REGIONAL_INDICATOR_OFFSET))

/**
 * Порядок стран в списке: Россия первой, остальные по алфавиту названий на выбранном языке.
 * @param {Country} a - Первая страна
 * @param {Country} b - Вторая страна
 * @param {string} language - Язык, по правилам которого сравниваются названия
 * @returns {number} Отрицательное, если a идёт раньше b, положительное, если позже
 */
const compareCountries = (a: Country, b: Country, language: string): number => {
	if (a.code === DEFAULT_COUNTRY) {
		return SORT_BEFORE
	}
	if (b.code === DEFAULT_COUNTRY) {
		return SORT_AFTER
	}
	return a.name.localeCompare(b.name, language)
}

/**
 * Все страны libphonenumber с названиями на выбранном языке: Россия первой, остальные по алфавиту.
 * @param {string} language - Код языка, например `ru` или `en`
 * @returns {Country[]} Список стран
 */
export const getCountryList = (language: string): Country[] => {
	const cached = countryListCache.get(language)
	if (cached) {
		return cached
	}

	const regionNames = new Intl.DisplayNames(language, { type: 'region' })
	const list = getCountries()
		.map((code) => ({
			code,
			dial: getCountryCallingCode(code),
			flag: toFlag(code),
			name: regionNames.of(code) ?? code
		}))
		.sort((a, b) => compareCountries(a, b, language))

	countryListCache.set(language, list)
	return list
}

import { type CountryCode, getCountries, getCountryCallingCode } from 'libphonenumber-js'

import type { Country } from './types'

const NAMES_LOCALE = 'ru'
const REGIONAL_INDICATOR_OFFSET = 0x1f1e6 - 'A'.charCodeAt(0)

export const DEFAULT_COUNTRY: CountryCode = 'RU'

const regionNames = new Intl.DisplayNames(NAMES_LOCALE, { type: 'region' })

/** Флаг-эмодзи из ISO-кода страны: каждая буква превращается в региональный индикатор. */
const toFlag = (code: CountryCode): string =>
	String.fromCodePoint(...[...code].map((char) => char.charCodeAt(0) + REGIONAL_INDICATOR_OFFSET))

/** Все страны libphonenumber по алфавиту; Россия — первой. */
export const COUNTRIES: Country[] = getCountries()
	.map((code) => ({
		code,
		dial: getCountryCallingCode(code),
		flag: toFlag(code),
		name: regionNames.of(code) ?? code
	}))
	.sort((a, b) =>
		a.code === DEFAULT_COUNTRY ? -1 : b.code === DEFAULT_COUNTRY ? 1 : a.name.localeCompare(b.name, NAMES_LOCALE)
	)

import type { CountryCode } from 'libphonenumber-js'

export interface Country {
	code: CountryCode
	/** Телефонный код страны без «+». */
	dial: string
	flag: string
	name: string
}

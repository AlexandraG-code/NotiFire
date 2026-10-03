import { DEFAULT_COUNTRY } from './countries'
import type { PhoneFieldValue } from './types'

/** Значение поля, пока пользователь ничего не ввёл: страна по умолчанию и пустой номер. */
export const EMPTY_VALUE: PhoneFieldValue = { country: DEFAULT_COUNTRY, number: '' }

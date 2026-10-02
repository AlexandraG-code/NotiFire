import { renderHook } from '@testing-library/react'

import { useCreateChatHelpers } from './useCreateChatHelpers'

const { result } = renderHook(() => useCreateChatHelpers())
const { buildPhone, isPhoneValid } = result.current

describe('useCreateChatHelpers', () => {
	it('собирает международный номер без плюса', () => {
		expect(buildPhone('RU', '916 123-45-67')).toBe('79161234567')
		expect(buildPhone('RU', '+7 (916) 123-45-67')).toBe('79161234567')
	})

	it('возвращает пустую строку, если номер не разобрался', () => {
		expect(buildPhone('RU', 'abc')).toBe('')
	})

	it('проверяет номер по правилам страны', () => {
		expect(isPhoneValid('RU', '9161234567')).toBe(true)
		expect(isPhoneValid('RU', '123')).toBe(false)
		expect(isPhoneValid('RU', undefined)).toBe(false)
	})
})

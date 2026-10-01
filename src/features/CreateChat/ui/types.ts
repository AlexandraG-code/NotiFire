import type { CountryCode } from 'libphonenumber-js'

export interface CreateChatModalProps {
	open: boolean
	onClose: () => void
}

export interface CreateChatFormValues {
	country: CountryCode
	number: string
}

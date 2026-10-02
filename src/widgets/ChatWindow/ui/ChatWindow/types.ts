import type { Chat } from '@entities/Chat'

import type { GreenApiCredentials } from '@shared/api/greenApi'

export interface ChatWindowProps {
	chat: Chat
	credentials: GreenApiCredentials
}

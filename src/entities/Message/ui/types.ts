import type { BubblePosition } from '../model/enums'
import type { Message } from '../model/types'

export interface MessageBubbleProps {
	message: Message
	position?: BubblePosition
	onRetry?: (message: Message) => void
}

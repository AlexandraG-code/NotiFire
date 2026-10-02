import type { ThemeTokens } from './types'

// Значения стандартной светлой темы Telegram Web; узор фона не используется (чужой ассет), только градиент
export const telegramLightTokens: ThemeTokens = {
	bgSurface: '#f4f4f5',
	bgPrimary: '#ffffff',
	bgSecondary: '#f4f4f5',
	bgElevated: '#ffffff',
	divider: '#0000001a',
	overlay: '#00000080',

	textPrimary: '#000000',
	textSecondary: '#707579',
	textTertiary: '#707579',
	textMute: '#a2acb4',

	accent: '#3390ec',
	positive: '#4fae4e',
	negative: '#df3f40',
	attention: '#ffcc00',

	chatBackground:
		'radial-gradient(circle at 15% 20%, #dbddbb 0%, transparent 55%), radial-gradient(circle at 85% 25%, #88b884 0%, transparent 55%), radial-gradient(circle at 60% 95%, #6ba587 0%, transparent 60%), #d5d88d',
	chatPattern: 'transparent',
	chipBg: '#00000059',
	chipText: '#ffffff',

	bubbleOwnBg: '#eeffde',
	bubbleOwnText: '#000000',
	bubbleOwnTime: '#4fae4e',
	bubbleInBg: '#ffffff',
	bubbleInText: '#000000',
	bubbleInTime: '#a2acb4'
}

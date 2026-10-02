import type { ThemeTokens } from './types'

// Значения ночной темы Telegram Web, снятые с открытой страницы (CSS-переменные .night)
export const telegramDarkTokens: ThemeTokens = {
	bgSurface: '#0f0f0f',
	bgPrimary: '#212121',
	bgSecondary: '#181818',
	bgElevated: '#2b2b2b',
	divider: '#ffffff1a',
	overlay: '#00000080',

	textPrimary: '#ffffff',
	textSecondary: '#aaaaaa',
	textTertiary: '#aaaaaa',
	textMute: '#707579',

	accent: '#8774e1',
	positive: '#5cc85e',
	negative: '#ff595a',
	attention: '#ffcc00',

	chatBackground: '#0f0f0f',
	chatPattern: 'transparent',
	chipBg: '#00000059',
	chipText: '#ffffffcc',

	bubbleOwnBg: '#8774e1',
	bubbleOwnText: '#ffffff',
	bubbleOwnTime: '#ffffff99',
	bubbleInBg: '#212121',
	bubbleInText: '#ffffff',
	bubbleInTime: '#aaaaaa'
}

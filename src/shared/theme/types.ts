/** Семантические цвета темы. Каждый ключ доступен в CSS как `--color-<kebab-case>`. */
export interface ThemeTokens {
	bgSurface: string
	bgPrimary: string
	bgSecondary: string
	bgElevated: string
	divider: string
	overlay: string

	textPrimary: string
	textSecondary: string
	textTertiary: string
	textMute: string

	accent: string
	positive: string
	negative: string
	attention: string

	chatBackground: string
	chatPattern: string
	chipBg: string
	chipText: string

	bubbleOwnBg: string
	bubbleOwnText: string
	bubbleOwnTime: string
	bubbleInBg: string
	bubbleInText: string
	bubbleInTime: string
}

/** Точка в координатах окна, из которой расходится круговая анимация смены темы. */
export interface ThemeTransitionOrigin {
	x: number
	y: number
}

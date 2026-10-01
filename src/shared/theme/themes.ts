import { darkTokens } from './darkTokens'
import { ThemeMode } from './enums'
import { lightTokens } from './lightTokens'
import type { ThemeTokens } from './types'

export const themeTokens: Record<ThemeMode, ThemeTokens> = {
	[ThemeMode.Light]: lightTokens,
	[ThemeMode.Dark]: darkTokens
}

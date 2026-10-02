import { Skin, ThemeMode } from './enums'
import { maxDarkTokens } from './maxDarkTokens'
import { maxLightTokens } from './maxLightTokens'
import { telegramDarkTokens } from './telegramDarkTokens'
import { telegramLightTokens } from './telegramLightTokens'
import type { ThemeTokens } from './types'

/** Наборы токенов по оформлению и режиму: новый цвет добавляется во все четыре набора. */
export const themeTokens: Record<Skin, Record<ThemeMode, ThemeTokens>> = {
	[Skin.Max]: { [ThemeMode.Light]: maxLightTokens, [ThemeMode.Dark]: maxDarkTokens },
	[Skin.Telegram]: { [ThemeMode.Light]: telegramLightTokens, [ThemeMode.Dark]: telegramDarkTokens }
}

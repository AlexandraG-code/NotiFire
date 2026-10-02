import { theme } from 'antd'

import { getAntdTheme } from './antdTheme'
import { applyThemeVars } from './cssVars'
import { Skin, ThemeMode } from './enums'
import { themeTokens } from './themes'

const SKINS = Object.values(Skin)
const MODES = Object.values(ThemeMode)

describe('токены тем', () => {
	it('у каждого скина и режима один и тот же набор ключей', () => {
		const reference = Object.keys(themeTokens[Skin.Max][ThemeMode.Light]).sort()

		SKINS.forEach((skin) => {
			MODES.forEach((mode) => {
				expect(Object.keys(themeTokens[skin][mode]).sort(), `${skin}/${mode}`).toEqual(reference)
			})
		})
	})

	it('скины отличаются друг от друга акцентным цветом', () => {
		expect(themeTokens[Skin.Max][ThemeMode.Light].accent).not.toBe(
			themeTokens[Skin.Telegram][ThemeMode.Light].accent
		)
	})
})

describe('applyThemeVars', () => {
	afterEach(() => {
		document.documentElement.removeAttribute('style')
		document.documentElement.removeAttribute('data-theme')
		document.documentElement.removeAttribute('data-skin')
	})

	it('ставит атрибуты темы и скина и color-scheme', () => {
		applyThemeVars(Skin.Telegram, ThemeMode.Dark)

		const root = document.documentElement
		expect(root).toHaveAttribute('data-theme', ThemeMode.Dark)
		expect(root).toHaveAttribute('data-skin', Skin.Telegram)
		expect(root.style.colorScheme).toBe(ThemeMode.Dark)
	})

	it.each(SKINS.flatMap((skin) => MODES.map((mode) => [skin, mode] as const)))(
		'записывает токены %s/%s в CSS-переменные',
		(skin, mode) => {
			applyThemeVars(skin, mode)

			const tokens = themeTokens[skin][mode]
			const style = document.documentElement.style
			expect(style.getPropertyValue('--color-accent')).toBe(tokens.accent)
			expect(style.getPropertyValue('--color-bg-primary')).toBe(tokens.bgPrimary)
			expect(style.getPropertyValue('--color-bubble-own-bg')).toBe(tokens.bubbleOwnBg)
		}
	)

	it('при смене режима переменные перезаписываются', () => {
		applyThemeVars(Skin.Max, ThemeMode.Light)
		const light = document.documentElement.style.getPropertyValue('--color-bg-primary')

		applyThemeVars(Skin.Max, ThemeMode.Dark)

		expect(document.documentElement.style.getPropertyValue('--color-bg-primary')).not.toBe(light)
	})
})

describe('getAntdTheme', () => {
	it('для тёмной темы берёт тёмный алгоритм, для светлой стандартный', () => {
		expect(getAntdTheme(Skin.Max, ThemeMode.Dark).algorithm).toBe(theme.darkAlgorithm)
		expect(getAntdTheme(Skin.Max, ThemeMode.Light).algorithm).toBe(theme.defaultAlgorithm)
	})

	it('передаёт акцент скина в основной цвет antd', () => {
		SKINS.forEach((skin) => {
			expect(getAntdTheme(skin, ThemeMode.Light).token?.colorPrimary).toBe(
				themeTokens[skin][ThemeMode.Light].accent
			)
		})
	})
})

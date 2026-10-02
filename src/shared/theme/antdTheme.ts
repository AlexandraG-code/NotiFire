import { type ThemeConfig, theme } from 'antd'

import {
	BORDER_RADIUS,
	CONTROL_HEIGHT,
	FONT_FAMILY,
	FONT_SIZE_BASE,
	MODAL_BORDER_RADIUS,
	MODAL_TITLE_FONT_SIZE
} from './constants'
import { type Skin, ThemeMode } from './enums'
import { themeTokens } from './themes'

/**
 * Конфиг antd для режима темы: токены темы маппятся на токены antd поверх базового алгоритма.
 * @param {Skin} skin - Оформление (мессенджер)
 * @param {ThemeMode} mode - Светлая или тёмная тема
 * @returns {ThemeConfig} Конфиг для ConfigProvider
 */
export const getAntdTheme = (skin: Skin, mode: ThemeMode): ThemeConfig => {
	const tokens = themeTokens[skin][mode]

	return {
		algorithm: mode === ThemeMode.Dark ? theme.darkAlgorithm : theme.defaultAlgorithm,
		token: {
			colorPrimary: tokens.accent,
			colorLink: tokens.accent,
			colorSuccess: tokens.positive,
			colorError: tokens.negative,
			colorWarning: tokens.attention,

			colorBgLayout: tokens.bgSurface,
			colorBgContainer: tokens.bgPrimary,
			colorBgElevated: tokens.bgElevated,
			colorBgMask: tokens.overlay,
			colorBorder: tokens.divider,
			colorBorderSecondary: tokens.divider,

			colorText: tokens.textPrimary,
			colorTextSecondary: tokens.textSecondary,
			colorTextTertiary: tokens.textTertiary,
			colorTextQuaternary: tokens.textMute,

			fontFamily: FONT_FAMILY,
			fontSize: FONT_SIZE_BASE,
			borderRadius: BORDER_RADIUS,
			controlHeight: CONTROL_HEIGHT
		},
		components: {
			Input: { colorBgContainer: tokens.bgSecondary, activeShadow: 'none' },
			Modal: {
				borderRadiusLG: MODAL_BORDER_RADIUS,
				titleFontSize: MODAL_TITLE_FONT_SIZE,
				titleColor: tokens.textPrimary
			},
			Button: { primaryShadow: 'none', defaultShadow: 'none' }
		}
	}
}

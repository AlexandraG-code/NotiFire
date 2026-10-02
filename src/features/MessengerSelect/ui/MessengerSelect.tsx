import { Segmented } from 'antd'
import { useTranslation } from 'react-i18next'

import { Skin } from '@shared/theme'

import { useSkinStore } from '../model/useSkinStore'

import { MaxLogo, TelegramLogo } from './MessengerLogos'
import styles from './MessengerSelect.module.scss'

/**
 * Выбор мессенджера, в котором пользователь авторизуется; от него зависит оформление приложения.
 * @returns {JSX.Element} Переключатель MAX / Telegram с поясняющей плашкой
 */
export const MessengerSelect = () => {
	const skin = useSkinStore((state) => state.skin)
	const setSkin = useSkinStore((state) => state.setSkin)

	const { t } = useTranslation()

	const options = [
		{
			value: Skin.Max,
			label: (
				<span className={styles.option}>
					<MaxLogo />
					{t('messenger.max')}
				</span>
			)
		},
		{
			value: Skin.Telegram,
			label: (
				<span className={styles.option}>
					<TelegramLogo />
					{t('messenger.telegram')}
				</span>
			)
		}
	]

	return (
		<div className={styles.root}>
			<Segmented block options={options} value={skin} onChange={setSkin} aria-label={t('messenger.label')} />
			<p className={styles.hint}>{t('messenger.hint')}</p>
		</div>
	)
}

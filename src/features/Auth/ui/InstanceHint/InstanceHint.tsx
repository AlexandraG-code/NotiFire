import { Trans } from 'react-i18next'

import { Namespace } from '@shared/i18n'

import styles from './InstanceHint.module.scss'
import { CONSOLE_URL } from './constants'

/**
 * Подсказка под формой входа: где завести инстанс и взять idInstance и apiTokenInstance (ссылка на консоль GREEN-API).
 * @returns {JSX.Element} Плашка со ссылкой
 */
export const InstanceHint = () => (
	<p className={styles.hint}>
		<Trans
			i18nKey="hint.text"
			ns={Namespace.Auth}
			components={{ consoleLink: <a href={CONSOLE_URL} target="_blank" rel="noopener noreferrer" /> }}
		/>
	</p>
)

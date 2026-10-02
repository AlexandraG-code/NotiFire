import { useTranslation } from 'react-i18next'

import { AuthForm, InstanceHint } from '@features/Auth'
import { LanguageSwitcher } from '@features/LanguageSwitcher'
import { MessengerSelect, useSkinStore } from '@features/MessengerSelect'
import { ThemeSwitcher } from '@features/ThemeSwitcher'

import { Namespace } from '@shared/i18n'
import { AppLogo, CenteredCardLayout } from '@shared/ui'

/**
 * Страница входа: логотип, карточка с формой и переключатель темы.
 * @returns {JSX.Element} Страница авторизации
 */
export const AuthPage = () => {
	const skin = useSkinStore((state) => state.skin)

	const { t } = useTranslation(Namespace.Auth)

	return (
		<CenteredCardLayout
			logo={<AppLogo />}
			title={t('page.title')}
			subtitle={t('page.subtitle')}
			controls={
				<>
					<LanguageSwitcher />
					<ThemeSwitcher />
				</>
			}
		>
			<MessengerSelect />
			<AuthForm messenger={skin} />
			<InstanceHint />
		</CenteredCardLayout>
	)
}

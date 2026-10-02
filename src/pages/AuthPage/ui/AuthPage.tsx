import { useTranslation } from 'react-i18next'

import { AuthForm } from '@features/Auth'
import { LanguageSwitcher } from '@features/LanguageSwitcher'
import { ThemeSwitcher } from '@features/ThemeSwitcher'

import { Namespace } from '@shared/i18n'
import { CenteredCardLayout } from '@shared/ui'

/**
 * Страница входа: карточка с формой и переключатель темы.
 * @returns {JSX.Element} Страница авторизации
 */
export const AuthPage = () => {
	const { t } = useTranslation(Namespace.Auth)

	return (
		<CenteredCardLayout
			title={t('page.title')}
			subtitle={t('page.subtitle')}
			controls={
				<>
					<LanguageSwitcher />
					<ThemeSwitcher />
				</>
			}
		>
			<AuthForm />
		</CenteredCardLayout>
	)
}

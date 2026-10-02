import { useCallback, useEffect, useRef, useState } from 'react'

import { Button, Form, Input } from 'antd'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

import type { GreenApiCredentials } from '@shared/api/greenApi'
import { AppRoute } from '@shared/config'
import { Namespace } from '@shared/i18n'
import { sleep } from '@shared/lib'
import { BrandSplash } from '@shared/ui'

import { SPLASH_DURATION_MS } from '../model/constants'
import type { AuthFormProps, CredentialsDrafts } from '../model/types'
import { useAuthStore } from '../model/useAuthStore'

/**
 * Форма входа по idInstance и apiTokenInstance; при успехе перенаправляет на главную.
 * Введённые значения запоминаются отдельно для каждого мессенджера и подставляются при переключении.
 * @param {Skin} messenger - Выбранный мессенджер
 * @returns {JSX.Element} Форма авторизации
 */
export const AuthForm = ({ messenger }: AuthFormProps) => {
	const login = useAuthStore((state) => state.login)

	const [loading, setLoading] = useState(false)

	const drafts = useRef<CredentialsDrafts>({})
	const [form] = Form.useForm<GreenApiCredentials>()
	const navigate = useNavigate()
	const { t } = useTranslation(Namespace.Auth)

	const restoreDraft = useCallback(() => {
		const draft = drafts.current[messenger]
		form.setFields([
			{ name: 'idInstance', value: draft?.idInstance ?? '', errors: [] },
			{ name: 'apiTokenInstance', value: draft?.apiTokenInstance ?? '', errors: [] }
		])
	}, [form, messenger])

	useEffect(() => {
		restoreDraft()
	}, [restoreDraft])

	const saveDraft = (_: Partial<GreenApiCredentials>, values: Partial<GreenApiCredentials>) => {
		drafts.current[messenger] = values
	}

	const onFinish = async (values: GreenApiCredentials) => {
		const startedAt = Date.now()
		setLoading(true)

		const isLoggedIn = await login({
			idInstance: values.idInstance.trim(),
			apiTokenInstance: values.apiTokenInstance.trim()
		})

		if (isLoggedIn) {
			// заставка доигрывает до конца, даже если вход прошёл быстро
			await sleep(SPLASH_DURATION_MS - (Date.now() - startedAt))
			navigate(AppRoute.Root, { replace: true })
			return
		}
		setLoading(false)
	}

	return (
		<>
			<BrandSplash visible={loading} />
			<Form form={form} layout="vertical" onValuesChange={saveDraft} onFinish={onFinish} requiredMark={false}>
				<Form.Item
					name="idInstance"
					label="idInstance"
					rules={[{ required: true, whitespace: true, message: t('form.enterIdInstance') }]}
				>
					<Input allowClear autoComplete="off" />
				</Form.Item>
				<Form.Item
					name="apiTokenInstance"
					label="apiTokenInstance"
					rules={[{ required: true, whitespace: true, message: t('form.enterApiToken') }]}
				>
					<Input.Password allowClear autoComplete="new-password" />
				</Form.Item>
				<Button type="primary" htmlType="submit" loading={loading} block>
					{t('form.submit')}
				</Button>
			</Form>
		</>
	)
}

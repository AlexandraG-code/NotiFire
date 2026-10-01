import { useState } from 'react'

import { Alert, Button, Form, Input } from 'antd'
import { useNavigate } from 'react-router-dom'

import type { GreenApiCredentials } from '@shared/api/greenApi'
import { AppRoute } from '@shared/config'

import { useAuthStore } from '../model/useAuthStore'

/**
 * Форма входа по idInstance и apiTokenInstance; при успехе перенаправляет на главную.
 * @returns {JSX.Element} Форма авторизации
 */
export const AuthForm = () => {
	const [form] = Form.useForm<GreenApiCredentials>()
	const login = useAuthStore((state) => state.login)
	const navigate = useNavigate()
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState<string | null>(null)

	const onFinish = async (values: GreenApiCredentials) => {
		setLoading(true)
		setError(null)
		try {
			await login({ idInstance: values.idInstance.trim(), apiTokenInstance: values.apiTokenInstance.trim() })
			navigate(AppRoute.Root, { replace: true })
		} catch (e) {
			setError(e instanceof Error ? e.message : 'Ошибка входа')
		} finally {
			setLoading(false)
		}
	}

	return (
		<Form form={form} layout="vertical" onFinish={onFinish} requiredMark={false}>
			{error && <Alert type="error" message={error} showIcon style={{ marginBottom: 16 }} />}
			<Form.Item
				name="idInstance"
				label="idInstance"
				rules={[{ required: true, whitespace: true, message: 'Введите idInstance' }]}
			>
				<Input autoComplete="off" />
			</Form.Item>
			<Form.Item
				name="apiTokenInstance"
				label="apiTokenInstance"
				rules={[{ required: true, whitespace: true, message: 'Введите apiTokenInstance' }]}
			>
				<Input.Password autoComplete="off" />
			</Form.Item>
			<Button type="primary" htmlType="submit" loading={loading} block>
				Войти
			</Button>
		</Form>
	)
}

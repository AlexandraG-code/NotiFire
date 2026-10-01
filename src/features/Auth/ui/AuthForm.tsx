import { useState } from 'react'

import { Button, Form, Input } from 'antd'
import { useNavigate } from 'react-router-dom'

import type { GreenApiCredentials } from '@shared/api/greenApi'
import { AppRoute } from '@shared/config'

import { useAuthStore } from '../model/useAuthStore'

/**
 * Форма входа по idInstance и apiTokenInstance; при успехе перенаправляет на главную.
 * @returns {JSX.Element} Форма авторизации
 */
export const AuthForm = () => {
	const login = useAuthStore((state) => state.login)

	const [loading, setLoading] = useState(false)

	const [form] = Form.useForm<GreenApiCredentials>()
	const navigate = useNavigate()

	const onFinish = async (values: GreenApiCredentials) => {
		setLoading(true)
		const isLoggedIn = await login({
			idInstance: values.idInstance.trim(),
			apiTokenInstance: values.apiTokenInstance.trim()
		})
		setLoading(false)

		if (isLoggedIn) navigate(AppRoute.Root, { replace: true })
	}

	return (
		<Form form={form} layout="vertical" onFinish={onFinish} requiredMark={false}>
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

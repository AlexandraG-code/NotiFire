import { Button, Form, Modal } from 'antd'
import { generatePath, useNavigate } from 'react-router-dom'

import { useChatStore } from '@entities/Chat'

import { toChatId } from '@shared/api/greenApi'
import { AppRoute } from '@shared/config'

import { DEFAULT_COUNTRY } from '../model/countries'
import { useCreateChatHelpers } from '../model/useCreateChatHelpers'

import styles from './CreateChatModal.module.css'
import { PhoneField } from './PhoneField'
import type { CreateChatFormValues, CreateChatModalProps } from './types'

const MODAL_WIDTH = 420
const INITIAL_VALUES: CreateChatFormValues = { country: DEFAULT_COUNTRY, number: '' }

/**
 * Модальное окно создания чата по номеру телефона; после создания открывает чат.
 * @param {boolean} open - Показано ли окно
 * @param {Function} onClose - Вызывается при закрытии окна и после создания чата
 * @returns {JSX.Element} Модальное окно
 */
export const CreateChatModal = ({ open, onClose }: CreateChatModalProps) => {
	const addChat = useChatStore((state) => state.addChat)

	const [form] = Form.useForm<CreateChatFormValues>()
	const country = Form.useWatch('country', form) ?? DEFAULT_COUNTRY
	const number = Form.useWatch('number', form)
	const navigate = useNavigate()

	const { buildPhone, isPhoneValid } = useCreateChatHelpers()

	const handleFinish = (values: CreateChatFormValues) => {
		const phone = buildPhone(values.country, values.number)
		const chat = addChat({ id: phone, apiChatId: toChatId(phone), title: `+${phone}` })
		onClose()
		navigate(generatePath(AppRoute.Chat, { chatId: chat.id }))
	}

	return (
		<Modal
			open={open}
			title="Новый чат"
			width={MODAL_WIDTH}
			footer={null}
			centered
			onCancel={onClose}
			afterClose={form.resetFields}
			destroyOnHidden
		>
			<Form form={form} initialValues={INITIAL_VALUES} onFinish={handleFinish}>
				<PhoneField />
				<Button
					className={styles.submit}
					type="primary"
					htmlType="submit"
					block
					disabled={!isPhoneValid(country, number)}
				>
					Начать чат
				</Button>
			</Form>
		</Modal>
	)
}

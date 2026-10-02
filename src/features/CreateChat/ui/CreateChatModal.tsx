import { Button, Form, Modal } from 'antd'
import { useTranslation } from 'react-i18next'
import { generatePath, useNavigate } from 'react-router-dom'

import { useChatStore } from '@entities/Chat'

import { toChatId } from '@shared/api/greenApi'
import { AppRoute } from '@shared/config'
import { Namespace } from '@shared/i18n'
import { DEFAULT_COUNTRY, PhoneField } from '@shared/ui'

import type { CreateChatFormValues, CreateChatModalProps } from '../model/types'
import { useCreateChatHelpers } from '../model/useCreateChatHelpers'

import styles from './CreateChatModal.module.scss'

const MODAL_WIDTH = 420
const INITIAL_VALUES: CreateChatFormValues = { phone: { country: DEFAULT_COUNTRY, number: '' } }

/**
 * Модальное окно создания чата по номеру телефона; после создания открывает чат.
 * @param {boolean} open - Показано ли окно
 * @param {Function} onClose - Вызывается при закрытии окна и после создания чата
 * @returns {JSX.Element} Модальное окно
 */
export const CreateChatModal = ({ open, onClose }: CreateChatModalProps) => {
	const addChat = useChatStore((state) => state.addChat)

	const [form] = Form.useForm<CreateChatFormValues>()
	const phoneValue = Form.useWatch('phone', form) ?? INITIAL_VALUES.phone
	const navigate = useNavigate()
	const { t } = useTranslation(Namespace.Chat)

	const { buildPhone, isPhoneValid } = useCreateChatHelpers()

	const handleFinish = (values: CreateChatFormValues) => {
		const phone = buildPhone(values.phone.country, values.phone.number)
		const chat = addChat({ id: phone, apiChatId: toChatId(phone), title: `+${phone}` })
		onClose()
		navigate(generatePath(AppRoute.Chat, { chatId: chat.id }))
	}

	return (
		<Modal
			open={open}
			title={t('createChat.title')}
			width={MODAL_WIDTH}
			footer={null}
			centered
			onCancel={onClose}
			afterClose={form.resetFields}
			destroyOnHidden
		>
			<Form form={form} initialValues={INITIAL_VALUES} onFinish={handleFinish}>
				<Form.Item name="phone" noStyle>
					<PhoneField />
				</Form.Item>
				<Button
					className={styles.submit}
					type="primary"
					htmlType="submit"
					block
					disabled={!isPhoneValid(phoneValue.country, phoneValue.number)}
				>
					{t('createChat.submit')}
				</Button>
			</Form>
		</Modal>
	)
}

import { Form, Input, Select } from 'antd'

import { COUNTRIES } from '../model/countries'

import styles from './PhoneField.module.css'

const COUNTRY_OPTIONS = COUNTRIES.map(({ code, flag, name, dial }) => ({
	value: code,
	label: `${flag} ${name} +${dial}`,
	short: `${flag} +${dial}`
}))

/**
 * Поле номера из двух частей: страна (флаг и код) и остальные цифры. Работает внутри antd Form с полями country и number.
 * @returns {JSX.Element} Составное поле номера
 */
export const PhoneField = () => (
	<div className={styles.field}>
		<Form.Item name="country" noStyle>
			<Select
				className={styles.select}
				options={COUNTRY_OPTIONS}
				optionLabelProp="short"
				showSearch={{ optionFilterProp: 'label' }}
				popupMatchSelectWidth={false}
				variant="borderless"
				aria-label="Страна"
			/>
		</Form.Item>
		<Form.Item name="number" noStyle>
			<Input
				className={styles.number}
				placeholder="123 456 78 90"
				inputMode="tel"
				variant="borderless"
				autoFocus
				aria-label="Номер телефона"
			/>
		</Form.Item>
	</div>
)

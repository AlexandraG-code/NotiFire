import { useMemo } from 'react'

import { Input, Select } from 'antd'
import type { CountryCode } from 'libphonenumber-js'
import { useTranslation } from 'react-i18next'

import { EMPTY_VALUE } from '../lib/constants'
import { getCountryList } from '../lib/countries'
import type { PhoneFieldProps } from '../lib/types'

import styles from './PhoneField.module.scss'

/**
 * Поле номера из двух частей: страна (флаг и код) и остальные цифры. Управляемый компонент:
 * работает с `Form.Item` antd или с обычными `value` и `onChange`.
 * @param {PhoneFieldValue} [value] - Текущая страна и введённые цифры
 * @param {Function} [onChange] - Вызывается с новым значением при смене страны или номера
 * @returns {JSX.Element} Составное поле номера
 */
export const PhoneField = ({ value = EMPTY_VALUE, onChange }: PhoneFieldProps) => {
	const { t, i18n } = useTranslation()

	const countryOptions = useMemo(
		() =>
			getCountryList(i18n.language).map(({ code, flag, name, dial }) => ({
				value: code,
				label: `${flag} ${name} +${dial}`,
				short: `${flag} +${dial}`
			})),
		[i18n.language]
	)

	return (
		<div className={styles.field}>
			<Select
				className={styles.select}
				value={value.country}
				options={countryOptions}
				optionLabelProp="short"
				showSearch={{ optionFilterProp: 'label' }}
				popupMatchSelectWidth={false}
				variant="borderless"
				aria-label={t('phoneField.country')}
				onChange={(country: CountryCode) => onChange?.({ ...value, country })}
			/>
			<Input
				className={styles.number}
				value={value.number}
				placeholder="123 456 78 90"
				inputMode="tel"
				variant="borderless"
				autoFocus
				aria-label={t('phoneField.number')}
				onChange={(event) => onChange?.({ ...value, number: event.target.value })}
			/>
		</div>
	)
}

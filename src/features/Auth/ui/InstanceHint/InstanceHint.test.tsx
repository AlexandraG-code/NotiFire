import { render, screen } from '@testing-library/react'

import { InstanceHint } from './InstanceHint'

describe('InstanceHint', () => {
	it('ведёт на консоль GREEN-API и открывает её в новой вкладке', () => {
		render(<InstanceHint />)

		const link = screen.getByRole('link', { name: 'консоли GREEN-API' })
		expect(link).toHaveAttribute('href', window._env_.GREEN_API_CONSOLE_URL)
		expect(link).toHaveAttribute('target', '_blank')
		expect(link).toHaveAttribute('rel', expect.stringContaining('noopener'))
	})
})

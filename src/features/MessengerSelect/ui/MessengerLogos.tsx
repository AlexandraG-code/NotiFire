/**
 * Логотип MAX: градиентный круг с пузырём сообщения.
 * @returns {JSX.Element} SVG-иконка
 */
export const MaxLogo = () => (
	<svg width="1em" height="1em" viewBox="0 0 24 24" aria-hidden>
		<defs>
			<linearGradient id="max-logo-gradient" x1="0" y1="0" x2="1" y2="1">
				<stop offset="0" stopColor="#44ccff" />
				<stop offset="1" stopColor="#7b4dff" />
			</linearGradient>
		</defs>
		<circle cx="12" cy="12" r="12" fill="url(#max-logo-gradient)" />
		<path d="M12 5.5a6.5 6.5 0 0 0-5.6 9.8L5.8 18l2.9-.7A6.5 6.5 0 1 0 12 5.5Z" fill="#fff" />
	</svg>
)

/**
 * Логотип Telegram: синий круг с бумажным самолётиком.
 * @returns {JSX.Element} SVG-иконка
 */
export const TelegramLogo = () => (
	<svg width="1em" height="1em" viewBox="0 0 24 24" aria-hidden>
		<circle cx="12" cy="12" r="12" fill="#2aabee" />
		<path
			d="M5.4 11.7 17.3 7c.6-.2 1 .1.9.9l-2 9.4c-.1.7-.5.8-1 .5l-3-2.2-1.5 1.4c-.2.2-.3.3-.6.3l.2-3.1 5.6-5c.2-.2 0-.3-.4-.1l-6.9 4.3-3-.9c-.6-.2-.6-.6.1-.9Z"
			fill="#fff"
		/>
	</svg>
)

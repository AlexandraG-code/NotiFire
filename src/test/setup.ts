import '@testing-library/jest-dom/vitest'

// Конфиг читается модулями при загрузке, поэтому заполняется раньше любых импортов приложения
window._env_ = {
	GREEN_API_URL_TEMPLATE: 'https://{shard}.api.green-api.com',
	API_TIMEOUT_MS: '1000',
	NOTIFICATION_RECEIVE_TIMEOUT_S: '5',
	NOTIFICATION_RETRY_DELAY_MS: '5000',
	HISTORY_MESSAGE_COUNT: '100',
	LINK_ATTEMPTS: '1',
	LINK_RETRY_DELAY_MS: '1',
	SETTINGS_CHECK_INTERVAL_MS: '15000'
}

// jsdom не умеет то, что нужно antd для адаптивности и размеров
window.matchMedia ??= ((query: string) => ({
	matches: false,
	media: query,
	onchange: null,
	addEventListener: () => undefined,
	removeEventListener: () => undefined,
	addListener: () => undefined,
	removeListener: () => undefined,
	dispatchEvent: () => false
})) as typeof window.matchMedia

// jsdom не умеет считать стили псевдоэлементов и пишет об этом в консоль; antd спрашивает их при блокировке прокрутки
const { getComputedStyle } = window
window.getComputedStyle = (element) => getComputedStyle(element)

globalThis.ResizeObserver ??= class {
	observe() {}
	unobserve() {}
	disconnect() {}
}

const { i18n, loadNamespaces, Namespace } = await import('@shared/i18n')

// Тексты в тестах русские, как у пользователя по умолчанию
await loadNamespaces(Namespace.Auth, Namespace.Chat)
await i18n.changeLanguage('ru')

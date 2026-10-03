import { useChatStore } from './useChatStore'

const anna = { id: '79161234567', apiChatId: '79161234567@c.us', title: '+79161234567' }
const boris = { id: '79267654321', apiChatId: '79267654321@c.us', title: '+79267654321' }

describe('useChatStore', () => {
	beforeEach(() => {
		localStorage.clear()
		useChatStore.setState({ chats: [] })
	})

	it('updateChat меняет только указанный чат и только переданные поля', () => {
		useChatStore.getState().addChat(anna)
		useChatStore.getState().addChat(boris)

		useChatStore.getState().updateChat(anna.id, { title: 'Анна' })

		const [first, second] = useChatStore.getState().chats
		expect(second).toMatchObject({ id: anna.id, title: 'Анна', apiChatId: anna.apiChatId })
		expect(first).toMatchObject({ id: boris.id, title: boris.title })
	})

	it('removeChat удаляет чат по id и не трогает остальные', () => {
		useChatStore.getState().addChat(anna)
		useChatStore.getState().addChat(boris)

		useChatStore.getState().removeChat(anna.id)

		expect(useChatStore.getState().chats.map((chat) => chat.id)).toEqual([boris.id])
	})

	it('addAlias добавляет псевдоним один раз', () => {
		useChatStore.getState().addChat(anna)

		useChatStore.getState().addAlias(anna.id, '123456')
		useChatStore.getState().addAlias(anna.id, '123456')

		expect(useChatStore.getState().chats[0].aliases).toEqual(['123456'])
	})

	it('addChat не создаёт второй чат с тем же id', () => {
		useChatStore.getState().addChat(anna)
		useChatStore.getState().addChat(anna)

		expect(useChatStore.getState().chats).toHaveLength(1)
	})
})

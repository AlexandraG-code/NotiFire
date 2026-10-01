/**
 * Пауза, которую можно прервать сигналом.
 * @param {number} ms - Длительность паузы в мс
 * @param {AbortSignal} [signal] - Сигнал отмены: пауза завершается сразу
 * @returns {Promise<void>} Разрешается по истечении паузы или при отмене
 */
export const sleep = (ms: number, signal?: AbortSignal): Promise<void> =>
	new Promise((resolve) => {
		const timer = setTimeout(resolve, ms)
		signal?.addEventListener(
			'abort',
			() => {
				clearTimeout(timer)
				resolve()
			},
			{ once: true }
		)
	})

import axios from 'axios'

export const AxiosInstance = axios.create({
	timeout: Number(window._env_.API_TIMEOUT_MS)
})

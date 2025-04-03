import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useAuthStore = defineStore('auth', () => {
	const token = ref(localStorage.getItem('token') || '')
	const isAuthenticated = ref(!!token.value)
	const userInfo = ref(JSON.parse(localStorage.getItem('userInfo')) || null)

	// 设置token
	const setToken = (newToken) => {
		token.value = newToken
		localStorage.setItem('token', newToken)
		isAuthenticated.value = true
	}

	// 清除token
	const clearToken = () => {
		token.value = ''
		localStorage.removeItem('token')
		localStorage.removeItem('userInfo')
		userInfo.value = null
		isAuthenticated.value = false
	}

	// 获取token
	const getToken = () => {
		return token.value
	}

	// 设置用户信息
	const setUser = (info) => {
		userInfo.value = info
		localStorage.setItem('userInfo', JSON.stringify(info))
	}

	// 获取用户信息
	const getUser = () => {
		return userInfo.value
	}

	return {
		token,
		isAuthenticated,
		userInfo,
		setToken,
		clearToken,
		getToken,
		setUser,
		getUser,
	}
})

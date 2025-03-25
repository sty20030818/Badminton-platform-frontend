/**
 * API 统一出口
 */
import adminUserApi from './modules/admin/user'
import adminEventApi from './modules/admin/event'
import adminVenueApi from './modules/admin/venue'
import adminHomeApi from './modules/admin/home'
import authApi from './modules/user/auth'
import userApi from './modules/user/user'
import eventApi from './modules/user/event'

export default {
	...adminUserApi,
	...adminEventApi,
	...adminVenueApi,
	...adminHomeApi,
	...authApi,
	...userApi,
	...eventApi,
}

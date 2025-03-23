/**
 * API 统一出口
 */
import adminUserApi from './modules/admin/user'
import adminEventApi from './modules/admin/event'
import adminVenueApi from './modules/admin/venue'
import adminHomeApi from './modules/admin/home'
import authApi from './modules/auth'
import userApi from './modules/user'

export default {
	...adminUserApi,
	...adminEventApi,
	...adminVenueApi,
	...adminHomeApi,
	...authApi,
	...userApi,
}

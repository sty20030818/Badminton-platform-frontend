/**
 * API 统一出口
 */
import userApi from './modules/admin/user'
import eventApi from './modules/admin/event'
import venueApi from './modules/admin/venue'
import homeApi from './modules/admin/home'

export default {
	...userApi,
	...eventApi,
	...venueApi,
	...homeApi,
}

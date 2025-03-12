/**
 * API 统一出口
 */
import userApi from './modules/user'
import eventApi from './modules/event'
import venueApi from './modules/venue'
import homeApi from './modules/home'

export default {
    ...userApi,
    ...eventApi,
    ...venueApi,
    ...homeApi
}

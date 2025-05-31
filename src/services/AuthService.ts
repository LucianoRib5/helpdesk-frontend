import type { AuthResponse, LoginPayload } from '../features/auth/authTypes'
import ApiService from './ApiService'

const { post } = ApiService

const AuthService = {
    login: async (payload: LoginPayload) => {
        return post<AuthResponse>('/users/login', payload)
    },
}

export default AuthService
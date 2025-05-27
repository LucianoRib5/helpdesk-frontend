import type { CreateUserPayload } from '../features/user/userTypes'
import ApiService from './ApiService'

const { post } = ApiService

const UserService = {
    createUser: async (payload: CreateUserPayload) => {
        return post<never>('/users', payload)
    },
}

export default UserService
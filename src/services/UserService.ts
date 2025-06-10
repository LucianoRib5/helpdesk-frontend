import type { CreateUserPayload, User } from '../features/user/userTypes'
import ApiService from './ApiService'

const { post, get } = ApiService

const UserService = {
    createUser: async (payload: CreateUserPayload) => {
        return post<never>('/users', payload)
    },
    getUserByUserName: async (userName: string) => {
        return get<User[]>(`/users/search?name=${userName}`)
    }
}

export default UserService

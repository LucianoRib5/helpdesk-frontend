import type { CreateUserPayload, UpdateBasicDataPayload, UserBasicInfo } from '../features/user/userTypes'
import ApiService from './ApiService'

const { post, put, get } = ApiService

const UserService = {
    createUser: async (payload: CreateUserPayload) => {
        return post<never>('/users', payload)
    },
    getUserByUserName: async (userName: string) => {
        return get<UserBasicInfo[]>(`/users/search?name=${userName}`)
    },
    updateUser: async (userId: number, payload: CreateUserPayload) => {
        return put<UserBasicInfo>(`/users/${userId}`, payload)
    },
    updateUserStatus: async (userId: number, status: string) => {
        return put<UserBasicInfo>(`/users/${userId}/status`, { status })
    },
    updateBasicData: async (payload: UpdateBasicDataPayload) => {
        return put<UserBasicInfo>(`/users/basic-data`, payload)
    }
}

export default UserService

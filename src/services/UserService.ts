import type { CreateUserPayload, UpdateBasicDataPayload, UpdateEmailPayload, UpdatePasswordPayload, UserBasicInfo } from '../features/user/userTypes'
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
    },
    updateEmail: async (payload: UpdateEmailPayload) => {
        return put<UserBasicInfo>(`/users/${payload.userId}/email`, {
            newEmail: payload.newEmail,
            password: payload.password,
        })
    },
    updatePassword: async (payload: UpdatePasswordPayload) => {
        return put<UserBasicInfo>(`/users/${payload.userId}/password`, {
            currentPassword: payload.currentPassword,
            newPassword: payload.newPassword
        })
    },
}

export default UserService

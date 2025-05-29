import type { UserBasicInfo } from "../user/userTypes";

export interface LoginPayload {
    email: string;
    password: string;
}

export interface AuthResponse {
    token: string;
    user: UserBasicInfo;
}

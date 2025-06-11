export interface CreateUserPayload {
    name: string;
    email: string;
    password: string;
    cpf: string;
    cnpj?: string | null;
    phoneNumber: string;
    typeId?: UserTypeId;
    address?: string;
    cityId?: number;
}

export const UserTypeEnum = {
  CUSTOMER: 'CUSTOMER',
  SUPPORT_OPERATOR: 'SUPPORT_OPERATOR',
  TECHNICIAN: 'TECHNICIAN',
  ADMINISTRATOR: 'ADMINISTRATOR',
} as const;

export type UserTypeEnum = (typeof UserTypeEnum)[keyof typeof UserTypeEnum];

export const UserStatusEnum = {
    ACTIVE: 'ACTIVE',
    INACTIVE: 'INACTIVE',
    SUSPENDED: 'SUSPENDED',
} as const;

export type UserStatusEnum = (typeof UserStatusEnum)[keyof typeof UserStatusEnum];

export const UserTypeId = {
    CUSTOMER: 1,
    SUPPORT_OPERATOR: 2,
    TECHNICIAN: 3,
    ADMINISTRATOR: 4
} as const;

export type UserTypeId = (typeof UserTypeId)[keyof typeof UserTypeId];

export interface UserPermission {
    canCreateTicket: boolean;
    canEditTicket: boolean;
    canAssignTicket: boolean;
    canCloseTicket: boolean;
    canManagerReports: boolean;
    canManageUsers: boolean;
}

export interface UserBasicInfo {
    userId: number;
    userName: string;
    email: string;
    cpf: string;
    cnpj?: string | null;
    phoneNumber?: string | null;
    userType: UserTypeEnum;
    userTypeId: UserTypeId;
    status: UserStatusEnum;
    userPermission: UserPermission;
    cep: string | null;
    address: string | null;
}

export interface UpdateBasicDataPayload {
    userId: number;
    name: string;
    phoneNumber?: string | null;
    address?: string | null;
    cityId?: number | null;
}

export interface UpdateEmailPayload {
    userId: number;
    newEmail: string;
    password: string;
}

export interface UpdatePasswordPayload {
    userId: number;
    currentPassword: string;
    newPassword: string;
}

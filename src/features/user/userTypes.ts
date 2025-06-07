export interface CreateUserPayload {
    name: string;
    email: string;
    password: string;
    cpf: string;
    cnpj?: string | null;
    phoneNumber: string;
    address: string;
    cityId: number;
}

export const UserTypeEnum = {
  CUSTOMER: 'CUSTOMER',
  SUPPORT_OPERATOR: 'SUPPORT_OPERATOR',
  TECHNICIAN: 'TECHNICIAN',
  ADMINISTRATOR: 'ADMINISTRATOR',
} as const;

export type UserTypeEnum = (typeof UserTypeEnum)[keyof typeof UserTypeEnum];

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
    userType: UserTypeEnum;
    userPermission: UserPermission;
}

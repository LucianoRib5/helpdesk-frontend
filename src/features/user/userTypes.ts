export interface CreateUserPayload {
    name: string;
    email: string;
    password: string;
    cpf: string;
    cnpj?: string | null;
    phoneNumber: string;
}

export const UserTypeEnum = {
  CUSTOMER: 'CUSTOMER',
  SUPPORT_OPERATOR: 'SUPPORT_OPERATOR',
  TECHNICIAN: 'TECHNICIAN',
  ADMINISTRATOR: 'ADMINISTRATOR',
} as const;

export type UserTypeEnum = (typeof UserTypeEnum)[keyof typeof UserTypeEnum];

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

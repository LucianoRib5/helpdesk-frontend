import { UserTypeEnum } from "../features/user/userTypes";

export const isAdmin = (userType: string | undefined): boolean => {
    if (!userType) return false;
    return userType === UserTypeEnum.ADMINISTRATOR;
}

export const isCustomer = (userType: string | undefined): boolean => {
    if (!userType) return false;
    return userType === UserTypeEnum.CUSTOMER;
}

export const isTechnician = (userType: string | undefined): boolean => {
    if (!userType) return false;
    return userType === UserTypeEnum.TECHNICIAN;
}

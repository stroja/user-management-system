import { UserPermission } from "./user-permission";

export interface Permission {
    id: number;
    description: string;
    code: string;
    userPermissions: UserPermission [];
}
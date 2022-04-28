import { Permission } from "./permission";
import { User } from "./user";

export interface UserPermission {
    userId: number;
    permissionId: number;
    permission: Permission;
    user?: User;
}
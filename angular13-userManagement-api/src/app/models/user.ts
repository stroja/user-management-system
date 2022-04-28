import { Permission } from "./permission";
import { UserPermission } from "./user-permission";

export interface User {
    id: number;
    firstName : string;
    lastName : string;
    emailAddress : string;
    status : boolean;
    password: string;
    userName: string;
    userPermissions: UserPermission [];
}
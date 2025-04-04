import { UserProps } from "@/types";
import { checkUserPermission } from "./checkUserPermissions";

export const canGetAllLoans = (userData: UserProps, permission: string) => {
  return checkUserPermission(userData, permission);
};

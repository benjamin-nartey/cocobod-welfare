import { UserProps } from "@/types";

export function checkUserPermission(user: UserProps, allowedPermission: string): boolean {
    // Iterate through each role of the user
    return user.roles.some(role => 
      // Check if any role has a permission matching the allowed permission
      role.permissions.some(permission => 
        permission.name === allowedPermission
      )
    );
  }
import { UserProps } from "@/types";

export function checkUserPermission(
  user: UserProps,
  allowedPermissions: string | string[]
): boolean {
  const permissionsToCheck = Array.isArray(allowedPermissions)
    ? allowedPermissions
    : [allowedPermissions];

  return user.roles.some((role) =>
    role.permissions.some((permission) =>
      permissionsToCheck.includes(permission.name)
    )
  );
}

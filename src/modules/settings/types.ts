
export type Permission = {
  id: string;

  code: string;

  permission_name: string;

  description?: string;

  created_at?: string;
};

export type Role = {
  id: string;

  role_name: string;

  is_activated: boolean;

  created_at: string;

  updated_at: string;
};

export type RolePermission = {
  id: string;
  permission_id: string;
  code: string;
  permission_name: string;
  description?: string;
};

export type AssignPermissionsDto = {
  role_id: string;

  permission_ids: string[];
};

export type RemoveRolePermissionDto = {
  roleId: string;
  permissionId: string;
};
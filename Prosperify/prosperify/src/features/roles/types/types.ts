export type RoleScope =
  | 'owner'
  | 'organization'
  | 'assistants'
  | 'roles'
  | 'members'
  | 'logs'
  | 'apiKeys'
  | 'invitations';

export type AssistantScope = 'files' | 'messages';

export interface Role {
  id: string;
  name: string;
  scopes?: RoleScope[];
  assistants?: Array<{
    id: string;
    scopes: AssistantScope[];
  }>;
  organization: string;
  createdBy: string;
  createdAt: number;
  object: 'role';
}

export interface RoleListParams {
  limit?: number;
  order?: 'asc' | 'desc';
  page?: number;
}

export interface RoleMutationPayload {
  name: string;
  scopes?: RoleScope[];
  assistants?: Array<{ id: string; scopes: AssistantScope[] }>;
}

// @deprecated Les hooks réexportaient ces types, conserver cet alias.
export type DeprecatedRoleScope = RoleScope;

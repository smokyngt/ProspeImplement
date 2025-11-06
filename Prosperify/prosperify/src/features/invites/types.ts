export interface InvitationCreatePayload {
  expiresIn?: number;
  maxUsage?: number;
  roles?: string[];
}

export interface InvitationListParams {
  limit?: number;
  order?: 'asc' | 'desc';
  page?: number;
}

// @deprecated Ces types vivaient auparavant dans les hooks.
export type DeprecatedInvitationCreatePayload = InvitationCreatePayload;

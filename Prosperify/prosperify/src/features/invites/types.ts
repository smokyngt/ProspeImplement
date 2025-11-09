/**
 * Payload pour créer une invitation
 */
export interface InvitationCreatePayload {
  expiresIn?: number;
  maxUsage?: number;
  roles?: string[];
}

/**
 * Paramètres de liste pour la pagination et le filtrage
 */
export interface InvitationListParams {
  limit?: number;
  order?: 'asc' | 'desc';
  page?: number;
}

/**
 * Entité d'invitation renvoyée par le backend
 */
export interface Invitation {
  id: string;
  organizationId: string;
  roles: string[];
  expiresIn?: number | undefined;   // ✅ ajouté
  maxUsage?: number | undefined;    // ✅ ajouté
  createdAt: number;
  object?: 'invitation';
}

/**
 * @deprecated Ces types vivaient auparavant dans les hooks.
 */
export type DeprecatedInvitationCreatePayload = InvitationCreatePayload;

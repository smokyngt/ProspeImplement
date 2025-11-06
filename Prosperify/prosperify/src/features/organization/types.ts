export interface OrganizationSummary {
  id: string;
  name: string;
  createdAt?: number;
  overage?: boolean;
  object?: 'organization';
}

export interface OrganizationUpdatePayload {
  name?: string;
  overage?: boolean;
}

export interface OrganizationCreatePayload {
  name: string;
}

// @deprecated Maintenu pour les anciens imports.
export type DeprecatedOrganizationSummary = OrganizationSummary;

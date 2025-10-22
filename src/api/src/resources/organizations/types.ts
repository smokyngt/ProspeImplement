export interface Organization {
    id: string;
    name: string;
    createdAt: number;
    updatedAt: number;
    object: 'organization';
}

export interface CreateOrganizationRequest {
    name: string;
}

export interface UpdateOrganizationRequest {
    name?: string;
}
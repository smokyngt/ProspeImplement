import { HttpClient } from '../../core/http/HttpClient';
import { Organization, CreateOrganizationRequest } from './types';

export class OrganizationsResource {
    private client: HttpClient;

    constructor(client: HttpClient) {
        this.client = client;
    }

    async createOrganization(request: CreateOrganizationRequest): Promise<Organization> {
        const response = await this.client.post<Organization>('/v1/organizations/new', request);
        return response.data;
    }

    async getOrganization(id: string): Promise<Organization> {
        const response = await this.client.get<Organization>(`/v1/organizations/${id}`);
        return response.data;
    }

    async updateOrganization(id: string, request: Partial<CreateOrganizationRequest>): Promise<Organization> {
        const response = await this.client.put<Organization>(`/v1/organizations/${id}`, request);
        return response.data;
    }

    async deleteOrganization(id: string): Promise<void> {
        await this.client.delete(`/v1/organizations/${id}`);
    }

    async listOrganizations(): Promise<Organization[]> {
        const response = await this.client.get<Organization[]>('/v1/organizations');
        return response.data;
    }
}
import { HttpClient } from '../../core/http/HttpClient';
import { CreateUserRequest, User } from './types';

export class UsersResource {
    private client: HttpClient;

    constructor(client: HttpClient) {
        this.client = client;
    }

    async createUser(request: CreateUserRequest): Promise<User> {
        const response = await this.client.post<User>('/v1/users', request);
        return response.data;
    }

    async getUserById(userId: string): Promise<User> {
        const response = await this.client.get<User>(`/v1/users/${userId}`);
        return response.data;
    }

    async updateUser(userId: string, request: Partial<CreateUserRequest>): Promise<User> {
        const response = await this.client.put<User>(`/v1/users/${userId}`, request);
        return response.data;
    }

    async deleteUser(userId: string): Promise<void> {
        await this.client.delete(`/v1/users/${userId}`);
    }

    async listUsers(): Promise<User[]> {
        const response = await this.client.get<User[]>('/v1/users');
        return response.data;
    }
}
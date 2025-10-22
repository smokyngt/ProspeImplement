export interface User {
    id: string;
    name: string;
    email: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface CreateUserRequest {
    name: string;
    email: string;
    password: string;
}

export interface UpdateUserRequest {
    name?: string;
    email?: string;
    password?: string;
}

export interface UserResponse {
    user: User;
}

export interface UsersListResponse {
    users: User[];
    total: number;
    page: number;
    pageSize: number;
}
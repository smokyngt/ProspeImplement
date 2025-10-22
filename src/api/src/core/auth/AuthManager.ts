import { TokenStore } from './TokenStore';
import { ProsperifyError } from '../errors/ProsperifyError';
import { AuthenticationError } from '../errors/AuthenticationError';

export class AuthManager {
    private tokenStore: TokenStore;

    constructor() {
        this.tokenStore = new TokenStore();
    }

    public async login(username: string, password: string): Promise<void> {
        try {
            const response = await this.authenticate(username, password);
            this.tokenStore.setToken(response.token);
        } catch (error) {
            throw new AuthenticationError('Login failed', error);
        }
    }

    public async logout(): Promise<void> {
        this.tokenStore.clearToken();
    }

    public getToken(): string | null {
        return this.tokenStore.getToken();
    }

    private async authenticate(username: string, password: string): Promise<{ token: string }> {
        // Implement the API call to authenticate the user and return the token
        // This is a placeholder implementation
        return { token: 'mock-token' };
    }
}
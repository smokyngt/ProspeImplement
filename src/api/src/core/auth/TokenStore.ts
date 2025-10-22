import { Token } from '../../types/common';

export class TokenStore {
    private static instance: TokenStore;
    private token: Token | null = null;

    private constructor() {}

    public static getInstance(): TokenStore {
        if (!TokenStore.instance) {
            TokenStore.instance = new TokenStore();
        }
        return TokenStore.instance;
    }

    public setToken(token: Token): void {
        this.token = token;
    }

    public getToken(): Token | null {
        return this.token;
    }

    public clearToken(): void {
        this.token = null;
    }
}
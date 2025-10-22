import { AxiosRequestConfig, AxiosResponse } from 'axios';
import { AuthManager } from '../core/auth/AuthManager';
import { ProsperifyError } from '../core/errors/ProsperifyError';

const authManager = new AuthManager();

export const requestInterceptor = (config: AxiosRequestConfig): AxiosRequestConfig => {
    const token = authManager.getToken();
    if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
};

export const responseInterceptor = (response: AxiosResponse): AxiosResponse => {
    return response;
};

export const errorInterceptor = (error: any): Promise<never> => {
    if (error.response) {
        const { status, data } = error.response;
        switch (status) {
            case 400:
                throw new ProsperifyError('Bad Request', data);
            case 401:
                throw new ProsperifyError('Unauthorized', data);
            case 404:
                throw new ProsperifyError('Not Found', data);
            case 500:
                throw new ProsperifyError('Internal Server Error', data);
            default:
                throw new ProsperifyError('An unexpected error occurred', data);
        }
    }
    throw new ProsperifyError('Network Error', error);
};
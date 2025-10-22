import { AxiosRequestConfig } from 'axios';

const API_BASE_URL = 'https://api.prosperify.com/v1';

const DEFAULT_HEADERS = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
};

export const config: AxiosRequestConfig = {
    baseURL: API_BASE_URL,
    headers: DEFAULT_HEADERS,
};